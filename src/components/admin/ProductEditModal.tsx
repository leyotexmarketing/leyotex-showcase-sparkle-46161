import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Product, CATEGORIES, CATEGORY_LABELS } from '@/types/product';

const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(200, 'Nome deve ter no máximo 200 caracteres'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  collection: z.string().optional(),
  size: z.string().optional(),
  price: z.number().min(0.01, 'Preço deve ser maior que zero').max(999999.99, 'Preço máximo: R$ 999.999,99'),
  status: z.enum(['active', 'draft', 'inactive']),
  seo_title: z.string().max(60, 'Título SEO deve ter no máximo 60 caracteres'),
  seo_description: z.string().max(160, 'Descrição SEO deve ter no máximo 160 caracteres'),
  keywords: z.string(),
  image_url: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductEditModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const ProductEditModal = ({ product, open, onOpenChange, onSuccess }: ProductEditModalProps) => {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      slug: '',
      category: '',
      collection: '',
      size: '',
      price: 100,
      status: 'draft',
      seo_title: '',
      seo_description: '',
      keywords: '',
      image_url: '',
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        slug: product.slug,
        category: product.category,
        collection: product.collection || '',
        size: product.size || '',
        price: product.price || 100,
        status: product.status as 'active' | 'draft' | 'inactive',
        seo_title: product.seo_title,
        seo_description: product.seo_description,
        keywords: product.keywords,
        image_url: product.image_url || '',
      });
    } else {
      form.reset({
        name: '',
        slug: '',
        category: '',
        collection: '',
        size: '',
        price: 100,
        status: 'draft',
        seo_title: '',
        seo_description: '',
        keywords: '',
        image_url: '',
      });
    }
  }, [product, form]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (value: string) => {
    form.setValue('name', value);
    if (!product) {
      const slug = generateSlug(value);
      form.setValue('slug', slug);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    setSaving(true);
    try {
      if (product) {
        const { error } = await supabase
          .from('products')
          .update({
            name: values.name,
            slug: values.slug,
            category: values.category,
            collection: values.collection || null,
            size: values.size || null,
            price: values.price,
            status: values.status,
            seo_title: values.seo_title,
            seo_description: values.seo_description,
            keywords: values.keywords,
            image_url: values.image_url || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: 'Produto atualizado!',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        const { error } = await supabase.from('products').insert({
          name: values.name,
          slug: values.slug,
          category: values.category,
          collection: values.collection || null,
          size: values.size || null,
          price: values.price,
          status: values.status,
          seo_title: values.seo_title,
          seo_description: values.seo_description,
          keywords: values.keywords,
          image_url: values.image_url || null,
        });

        if (error) throw error;

        toast({
          title: 'Produto criado!',
          description: 'O novo produto foi adicionado com sucesso.',
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar produto',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Editar Produto' : 'Adicionar Novo Produto'}</DialogTitle>
          <DialogDescription>
            {product
              ? 'Faça as alterações necessárias e clique em salvar.'
              : 'Preencha os dados do novo produto.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Ex: Edredom Casal Premium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="edredom-casal-premium" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="draft">Rascunho</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="collection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coleção</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: Premium, Básica" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanho</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: Casal, Solteiro" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      placeholder="100.00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="/images/produto.png" />
                  </FormControl>
                  {field.value && (
                    <div className="mt-2">
                      <img
                        src={field.value}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seo_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título SEO (máx. 60 caracteres)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Título para mecanismos de busca" />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">{field.value?.length || 0}/60</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seo_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição SEO (máx. 160 caracteres)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Descrição para mecanismos de busca" rows={3} />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">{field.value?.length || 0}/160</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palavras-chave (separadas por vírgula)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="edredom, casal, premium, luxo"
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
