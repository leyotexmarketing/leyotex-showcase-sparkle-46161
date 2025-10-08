import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Building2, Mail, Phone, MapPin, Sparkles, Users, TrendingUp, Award } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

// Validation schema
const contactSchema = z.object({
  companyName: z.string().trim().nonempty({ message: "Nome da empresa é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  cnpj: z.string().trim().nonempty({ message: "CNPJ é obrigatório" }).regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, { message: "CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX" }),
  contactName: z.string().trim().nonempty({ message: "Nome do contato é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z.string().trim().email({ message: "Email inválido" }).max(255, { message: "Email deve ter menos de 255 caracteres" }),
  phone: z.string().trim().nonempty({ message: "Telefone é obrigatório" }).regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/, { message: "Telefone deve estar no formato (XX) XXXXX-XXXX" }),
  businessType: z.string().nonempty({ message: "Tipo de negócio é obrigatório" }),
  monthlyVolume: z.string().nonempty({ message: "Volume mensal é obrigatório" }),
  message: z.string().trim().nonempty({ message: "Mensagem é obrigatória" }).max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" })
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    monthlyVolume: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // SEO
    document.title = "Contato B2B - Leyotex | Parcerias Estratégicas para Atacadistas e Varejistas";
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Entre em contato com a Leyotex para parcerias B2B. Fornecemos soluções têxteis para atacadistas, lojistas e redes varejistas em todo Brasil.');
    if (!document.head.contains(metaDescription)) {
      document.head.appendChild(metaDescription);
    }

    // Add fade-in animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      contactSchema.parse(formData);

      // Save to Supabase
      const { error } = await supabase
        .from('contact_requests')
        .insert({
          company_name: formData.companyName,
          cnpj: formData.cnpj,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          business_type: formData.businessType,
          monthly_volume: formData.monthlyVolume,
          message: formData.message
        });

      if (error) throw error;

      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Nossa equipe analisará sua solicitação e entrará em contato em breve.",
      });

      // Reset form
      setFormData({
        companyName: '',
        cnpj: '',
        contactName: '',
        email: '',
        phone: '',
        businessType: '',
        monthlyVolume: '',
        message: ''
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Erro no formulário",
          description: "Por favor, corrija os campos destacados.",
          variant: "destructive"
        });
      } else {
        console.error('Erro ao enviar solicitação:', error);
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente mais tarde.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-background-soft"></div>
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-golden/10 text-golden px-4 py-2 rounded-full text-sm font-medium mb-6 fade-in-up">
              <Building2 className="w-4 h-4" />
              Parcerias B2B
              <Building2 className="w-4 h-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-6 fade-in-up">
              Construindo <span className="text-golden">Parcerias</span> Estratégicas
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed fade-in-up">
              Fornecemos soluções têxteis completas para atacadistas, lojistas e redes varejistas em todo o Brasil
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background-soft">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center fade-in-up">
                <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-golden" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Atendimento Especializado</h3>
                <p className="text-muted-foreground">Equipe dedicada para atender às necessidades específicas do seu negócio</p>
              </div>
              <div className="text-center fade-in-up">
                <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-golden" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Crescimento Conjunto</h3>
                <p className="text-muted-foreground">Parcerias que contribuem para a competitividade e crescimento dos nossos clientes</p>
              </div>
              <div className="text-center fade-in-up">
                <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-golden" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Qualidade Garantida</h3>
                <p className="text-muted-foreground">Produtos 100% brasileiros com padrão internacional de qualidade</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="vamos-conversar" className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12 fade-in-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Vamos Conversar?
              </h2>
              <p className="text-xl text-muted-foreground">
                Preencha o formulário e nossa equipe entrará em contato para construir uma parceria de sucesso
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-medium fade-in-up">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div>
                    <Label htmlFor="companyName" className="text-primary font-medium">
                      Nome da Empresa *
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Sua empresa"
                      className={`mt-2 ${errors.companyName ? 'border-destructive' : ''}`}
                    />
                    {errors.companyName && (
                      <p className="text-destructive text-sm mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  {/* CNPJ */}
                  <div>
                    <Label htmlFor="cnpj" className="text-primary font-medium">
                      CNPJ *
                    </Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange('cnpj', formatCNPJ(e.target.value))}
                      placeholder="XX.XXX.XXX/XXXX-XX"
                      className={`mt-2 ${errors.cnpj ? 'border-destructive' : ''}`}
                    />
                    {errors.cnpj && (
                      <p className="text-destructive text-sm mt-1">{errors.cnpj}</p>
                    )}
                  </div>

                  {/* Contact Name */}
                  <div>
                    <Label htmlFor="contactName" className="text-primary font-medium">
                      Nome do Contato *
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="Seu nome"
                      className={`mt-2 ${errors.contactName ? 'border-destructive' : ''}`}
                    />
                    {errors.contactName && (
                      <p className="text-destructive text-sm mt-1">{errors.contactName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-primary font-medium">
                      Email Corporativo *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contato@empresa.com"
                      className={`mt-2 ${errors.email ? 'border-destructive' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-primary font-medium">
                      Telefone *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                      placeholder="(XX) XXXXX-XXXX"
                      className={`mt-2 ${errors.phone ? 'border-destructive' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Business Type */}
                  <div>
                    <Label className="text-primary font-medium">
                      Tipo de Negócio *
                    </Label>
                    <Select 
                      value={formData.businessType} 
                      onValueChange={(value) => handleInputChange('businessType', value)}
                    >
                      <SelectTrigger className={`mt-2 ${errors.businessType ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="atacadista">Atacadista</SelectItem>
                        <SelectItem value="lojista">Lojista</SelectItem>
                        <SelectItem value="rede-varejista">Rede Varejista</SelectItem>
                        <SelectItem value="distribuidor">Distribuidor</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessType && (
                      <p className="text-destructive text-sm mt-1">{errors.businessType}</p>
                    )}
                  </div>
                </div>

                {/* Monthly Volume */}
                <div>
                  <Label className="text-primary font-medium">
                    Volume Mensal Estimado *
                  </Label>
                  <Select 
                    value={formData.monthlyVolume} 
                    onValueChange={(value) => handleInputChange('monthlyVolume', value)}
                  >
                    <SelectTrigger className={`mt-2 ${errors.monthlyVolume ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Selecione o volume..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500-1000">R$ 500 - R$ 1.000</SelectItem>
                      <SelectItem value="1000-5000">R$ 1.000 - R$ 5.000</SelectItem>
                      <SelectItem value="5000-10000">R$ 5.000 - R$ 10.000</SelectItem>
                      <SelectItem value="10000-25000">R$ 10.000 - R$ 25.000</SelectItem>
                      <SelectItem value="25000+">R$ 25.000+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.monthlyVolume && (
                    <p className="text-destructive text-sm mt-1">{errors.monthlyVolume}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-primary font-medium">
                    Mensagem / Necessidades Específicas *
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Conte-nos sobre suas necessidades, produtos de interesse, região de atuação..."
                    className={`mt-2 resize-none ${errors.message ? 'border-destructive' : ''}`}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.message.length}/1000 caracteres
                  </p>
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="btn-golden w-full md:w-auto px-8 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Enviar Solicitação
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 bg-background-soft">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12 fade-in-up">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                Outras Formas de Contato
              </h2>
              <p className="text-muted-foreground">
                Estamos aqui para atender você da melhor forma
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white rounded-xl p-6 shadow-soft fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-golden" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Telefone</h3>
                <p className="text-muted-foreground">(11) 99999-9999</p>
              </div>

              <div className="text-center bg-white rounded-xl p-6 shadow-soft fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-golden" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Email</h3>
                <p className="text-muted-foreground">vendas@leyotex.com.br</p>
              </div>

              <div className="text-center bg-white rounded-xl p-6 shadow-soft fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-golden" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Endereço</h3>
                <p className="text-muted-foreground">São Paulo - SP, Brasil</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;