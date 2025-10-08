import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Erro ao carregar produtos",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Produto adicionado ao carrinho!",
      description: `${productName} foi adicionado com sucesso.`,
    });
  };

  const loadMore = () => {
    setDisplayCount(prev => prev + 8);
  };

  const getPlaceholderImage = (category: string) => {
    const placeholders: Record<string, string> = {
      'colcha': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop',
      'edredom': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop',
      'jogo-de-cama': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop',
      'coberdrom': 'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=400&h=400&fit=crop',
      'travesseiro': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
    };
    return placeholders[category] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop';
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-golden" />
          </div>
        </div>
      </section>
    );
  }

  const displayedProducts = products.slice(0, displayCount);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl font-bold text-primary mb-4 font-playfair">
            Produtos em Destaque
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção de {products.length} produtos premium para sua casa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image_url || getPlaceholderImage(product.category)}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product.collection && (
                  <div className="absolute top-4 right-4 bg-golden/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.collection}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-primary mb-2 group-hover:text-golden transition-colors duration-200 line-clamp-2">
                  {product.name}
                </h3>
                
                {product.size && (
                  <p className="text-sm text-muted-foreground mb-3">
                    Tamanho: {product.size}
                  </p>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product.name)}
                  className="w-full btn-golden hover:shadow-golden transform hover:scale-105 transition-all duration-200"
                >
                  Consultar Disponibilidade
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More / View All Button */}
        <div className="text-center mt-12">
          {displayCount < products.length ? (
            <button 
              onClick={loadMore}
              className="btn-outline-golden px-8 py-4 text-lg hover:shadow-golden"
            >
              Carregar Mais Produtos ({products.length - displayCount} restantes)
            </button>
          ) : products.length > 8 && (
            <p className="text-muted-foreground">
              Mostrando todos os {products.length} produtos
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;