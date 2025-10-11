import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { Product, CATEGORY_LABELS } from '@/types/product';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onUpdate: () => void;
}

export const ProductsTable = ({ products, onEdit, onUpdate }: ProductsTableProps) => {
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');
  const [tempName, setTempName] = useState<string>('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const formatPrice = (price?: number) => {
    if (!price) return 'R$ 0,00';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const handlePriceEdit = (product: Product) => {
    setEditingPrice(product.id);
    setTempPrice((product.price || 0).toString());
  };

  const handleNameEdit = (product: Product) => {
    setEditingName(product.id);
    setTempName(product.name);
  };

  const savePriceEdit = async (productId: string) => {
    const newPrice = parseFloat(tempPrice);
    
    if (isNaN(newPrice) || newPrice <= 0) {
      toast({
        title: 'Erro',
        description: 'Preço deve ser maior que zero',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .update({ price: newPrice, updated_at: new Date().toISOString() })
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: 'Preço atualizado!',
        description: 'O preço foi alterado com sucesso.',
      });

      setEditingPrice(null);
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar preço',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const saveNameEdit = async (productId: string) => {
    if (!tempName.trim() || tempName.length < 3) {
      toast({
        title: 'Erro',
        description: 'Nome deve ter no mínimo 3 caracteres',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .update({ name: tempName.trim(), updated_at: new Date().toISOString() })
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: 'Nome atualizado!',
        description: 'O nome foi alterado com sucesso.',
      });

      setEditingName(null);
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar nome',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleStatus = async (product: Product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';

    try {
      const { error } = await supabase
        .from('products')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', product.id);

      if (error) throw error;

      toast({
        title: 'Status atualizado!',
        description: `Produto ${newStatus === 'active' ? 'ativado' : 'desativado'} com sucesso.`,
      });

      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      const { error } = await supabase.from('products').delete().eq('id', deleteId);

      if (error) throw error;

      toast({
        title: 'Produto deletado!',
        description: 'O produto foi removido com sucesso.',
      });

      setDeleteId(null);
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Erro ao deletar produto',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  // Desktop view
  const DesktopTable = () => (
    <div className="hidden md:block border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Coleção</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead className="w-24">Status</TableHead>
            <TableHead className="w-32 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.images?.[0] || product.image_url ? (
                  <img
                    src={product.images?.[0] || product.image_url}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">
                    Sem imagem
                  </div>
                )}
              </TableCell>
              <TableCell>
                {editingName === product.id ? (
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={() => saveNameEdit(product.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveNameEdit(product.id);
                      if (e.key === 'Escape') setEditingName(null);
                    }}
                    className="h-8"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handleNameEdit(product)}
                    className="cursor-pointer hover:underline"
                  >
                    {product.name}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS] || product.category}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{product.collection || '-'}</TableCell>
              <TableCell className="text-muted-foreground">{product.size || '-'}</TableCell>
              <TableCell>
                {editingPrice === product.id ? (
                  <Input
                    type="number"
                    step="0.01"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    onBlur={() => savePriceEdit(product.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') savePriceEdit(product.id);
                      if (e.key === 'Escape') setEditingPrice(null);
                    }}
                    className="h-8 w-24"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handlePriceEdit(product)}
                    className="cursor-pointer hover:underline font-medium"
                  >
                    {formatPrice(product.price)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={product.status === 'active'}
                  onCheckedChange={() => toggleStatus(product)}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteId(product.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  // Mobile view
  const MobileCards = () => (
    <div className="md:hidden space-y-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              {product.images?.[0] || product.image_url ? (
                <img
                  src={product.images?.[0] || product.image_url}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              ) : (
                <div className="w-20 h-20 bg-muted rounded flex items-center justify-center text-xs flex-shrink-0">
                  Sem imagem
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS]}
                </p>
                <p className="text-lg font-bold text-golden mt-2">
                  {formatPrice(product.price)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Switch
                    checked={product.status === 'active'}
                    onCheckedChange={() => toggleStatus(product)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {product.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(product)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteId(product.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <DesktopTable />
      <MobileCards />

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Produto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deletando...
                </>
              ) : (
                'Deletar'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
