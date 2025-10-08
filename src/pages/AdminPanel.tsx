import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, Mail } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ContactRequest {
  id: string;
  company_name: string;
  cnpj: string;
  contact_name: string;
  email: string;
  phone: string;
  business_type: string;
  monthly_volume: string;
  message: string;
  status: string;
  created_at: string;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  status: string;
}

const AdminPanel = () => {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showCredentials, setShowCredentials] = useState<{ email: string; password: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: requests } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: subs } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });

      setContactRequests(requests || []);
      setNewsletters(subs || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClick = (requestId: string) => {
    setSelectedRequest(requestId);
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;

    setApproving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `https://npwtckrpcfogeqkticse.supabase.co/functions/v1/approve-client`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ request_id: selectedRequest }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao aprovar cliente');
      }

      setShowCredentials({
        email: result.email,
        password: result.password,
      });

      toast({
        title: "Cliente aprovado!",
        description: "As credenciais foram geradas com sucesso.",
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Erro ao aprovar cliente",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setApproving(false);
      setSelectedRequest(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">
              Solicitações de Contato ({contactRequests.filter(r => r.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="newsletter">
              Newsletter ({newsletters.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <div className="grid gap-4">
              {contactRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{request.company_name}</CardTitle>
                        <CardDescription>
                          {request.contact_name} • {request.email}
                        </CardDescription>
                      </div>
                      <Badge variant={request.status === 'pending' ? 'default' : 'secondary'}>
                        {request.status === 'pending' ? 'Pendente' : 'Aprovado'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>CNPJ:</strong> {request.cnpj}</p>
                      <p><strong>Telefone:</strong> {request.phone}</p>
                      <p><strong>Tipo de negócio:</strong> {request.business_type}</p>
                      <p><strong>Volume mensal:</strong> {request.monthly_volume}</p>
                      <p><strong>Mensagem:</strong> {request.message}</p>
                      <p className="text-muted-foreground">
                        <strong>Data:</strong> {new Date(request.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>

                    {request.status === 'pending' && (
                      <Button
                        onClick={() => handleApproveClick(request.id)}
                        className="mt-4"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar Solicitação
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}

              {contactRequests.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Nenhuma solicitação encontrada
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle>Inscritos na Newsletter</CardTitle>
                <CardDescription>
                  Total de {newsletters.filter(n => n.status === 'active').length} inscritos ativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] md:h-[500px]">
                  <div className="space-y-2">
                    {newsletters.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{sub.email}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(sub.subscribed_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ))}

                    {newsletters.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Nenhum inscrito encontrado
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* Dialog de confirmação */}
      <AlertDialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aprovar Solicitação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja aprovar esta solicitação? Uma conta será criada automaticamente
              e as credenciais serão geradas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={approving}>Não</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} disabled={approving}>
              {approving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Aprovando...
                </>
              ) : (
                'Sim'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de credenciais geradas */}
      <AlertDialog open={!!showCredentials} onOpenChange={() => setShowCredentials(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Credenciais Geradas</AlertDialogTitle>
            <AlertDialogDescription>
              Cliente aprovado com sucesso! Envie estas credenciais ao cliente:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p><strong>Email:</strong> {showCredentials?.email}</p>
            <p><strong>Senha:</strong> {showCredentials?.password}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowCredentials(null)}>
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPanel;
