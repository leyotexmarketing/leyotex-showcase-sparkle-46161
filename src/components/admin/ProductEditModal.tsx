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
import { Loader2, X, Upload, Image as ImageIcon } from 'lucide-react';
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
  images: z.array(z.string()).max(3, 'Máximo de 3 imagens').optional(),
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
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
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
      images: [],
    },
  });

  useEffect(() => {
    if (product) {
      const productImages = product.images || (product.image_url ? [product.image_url] : []);
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
        images: productImages,
      });
      setPreviewUrls(productImages);
      setImageFiles([]);
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
        images: [],
      });
      setPreviewUrls([]);
      setImageFiles([]);
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

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const currentImagesCount = previewUrls.length;
    const newFilesArray = Array.from(files);
    const totalImages = currentImagesCount + newFilesArray.length;

    if (totalImages > 3) {
      toast({
        title: 'Limite excedido',
        description: 'Você pode adicionar no máximo 3 imagens',
        variant: 'destructive',
      });
      return;
    }

    // Create preview URLs for new files
    const newPreviews = newFilesArray.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviews]);
    setImageFiles([...imageFiles, ...newFilesArray]);
  };

  const removeImage = (index: number) => {
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setPreviewUrls(newPreviews);
    setImageFiles(newFiles);
  };

  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) {
      return previewUrls;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      // Combine uploaded URLs with existing URLs (those that weren't File objects)
      const existingUrls = previewUrls.filter(url => url.startsWith('http'));
      return [...existingUrls, ...uploadedUrls];
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer upload das imagens',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    setSaving(true);
    try {
      // Upload images first
      const imageUrls = await uploadImages();

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
            images: imageUrls,
            image_url: imageUrls[0] || null,
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
          images: imageUrls,
          image_url: imageUrls[0] || null,
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagens do Produto (máx. 3)</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor="image-upload"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
                            previewUrls.length >= 3
                              ? 'border-muted bg-muted/50 cursor-not-allowed opacity-50'
                              : 'border-primary/50 hover:border-primary hover:bg-primary/5'
                          }`}
                        >
                          <Upload className="w-5 h-5" />
                          <span className="font-medium">
                            {previewUrls.length >= 3 ? 'Limite atingido' : 'Escolher arquivos'}
                          </span>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          multiple
                          disabled={previewUrls.length >= 3}
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="hidden"
                        />
                        <span className="text-sm text-muted-foreground">
                          {previewUrls.length}/3 imagens
                        </span>
                      </div>

                      {previewUrls.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                          {previewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-border"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder.svg';
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                title="Remover imagem"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Nenhuma imagem adicionada
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Formatos aceitos: JPEG, JPG, PNG, WEBP
                          </p>
                        </div>
                      )}
                    </div>
                  </FormControl>
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
              <Button type="submit" disabled={saving || uploading}>
                {(saving || uploading) ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {uploading ? 'Enviando imagens...' : 'Salvando...'}
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
