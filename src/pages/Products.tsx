import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Layers, Cloud, Bed, Wind, Pilcrow, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCarousel from '@/components/ProductCarousel';
import { Skeleton } from '@/components/ui/skeleton';

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

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

  const categories = [
    {
      id: 'colchas',
      title: 'COLCHAS',
      icon: Layers,
      filter: 'colcha',
      count: 18
    },
    {
      id: 'edredons',
      title: 'EDREDONS',
      icon: Cloud,
      filter: 'edredom',
      count: 12
    },
    {
      id: 'jogos-de-cama',
      title: 'JOGOS DE CAMA',
      icon: Bed,
      filter: 'jogo-de-cama',
      count: 65
    },
    {
      id: 'coberdroms',
      title: 'COBERDROMS',
      icon: Wind,
      filter: 'coberdrom',
      count: 6
    },
    {
      id: 'travesseiros',
      title: 'TRAVESSEIROS',
      icon: Pilcrow,
      filter: 'travesseiro',
      count: 8
    }
  ];

  const getProductsByCategory = (categoryFilter: string) => {
    return products.filter(p => p.category === categoryFilter);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 fade-in-up">
            <Link to="/" className="hover:text-golden transition-colors">
              Início
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Produtos</span>
          </nav>

          {/* Title */}
          <div className="text-center fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-playfair">
              Nossos Produtos
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore nossa coleção completa de produtos premium para sua casa
            </p>
          </div>
        </div>
      </section>

      {/* Products by Category */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
          {loading ? (
            // Loading Skeletons
            <>
              {categories.map((category) => (
                <div key={category.id} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="aspect-[3/4] w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Category Sections
            categories.map((category, index) => {
              const categoryProducts = getProductsByCategory(category.filter);
              
              if (categoryProducts.length === 0) return null;

              const Icon = category.icon;

              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-golden/10 rounded-lg">
                      <Icon className="w-6 h-6 text-golden" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary font-playfair">
                        {category.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {categoryProducts.length} {categoryProducts.length === 1 ? 'produto' : 'produtos'}
                      </p>
                    </div>
                  </div>

                  {/* Products Carousel/Grid */}
                  <ProductCarousel
                    products={categoryProducts}
                    categoryTitle={category.title}
                  />

                  {/* Separator */}
                  {index < categories.length - 1 && (
                    <div className="mt-16 md:mt-20 border-t border-border/50" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
