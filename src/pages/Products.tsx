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

  // SEO + Canonical + Hash scroll after load
  useEffect(() => {
    // Title
    document.title = 'Produtos - Leyotex | Colchas, Edredons, Jogos de Cama, Coberdroms, Travesseiros';

    // Meta description
    const desc = 'Confira todos os produtos Leyotex: colchas, edredons, jogos de cama, coberdroms e travesseiros.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;

    // Canonical
    const canonicalHref = `${window.location.origin}/produtos`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    // Hash scroll (after products loaded)
    const tryScroll = () => {
      const hash = window.location.hash?.replace('#', '');
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (!loading) tryScroll();
  }, [loading]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
      console.log('Products loaded:', data?.length, 'products');
      console.log('Categories found:', [...new Set(data?.map(p => p.category))]);
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

  const getCollectionsByCategory = (categoryFilter: string) => {
    const categoryProducts = getProductsByCategory(categoryFilter);
    const collections = [...new Set(categoryProducts.map(p => p.collection))];
    return collections.sort((a, b) => {
      if (a === null) return 1;
      if (b === null) return -1;
      return a.localeCompare(b);
    });
  };

  const getProductsByCollection = (categoryFilter: string, collection: string | null) => {
    return products.filter(p => p.category === categoryFilter && p.collection === collection);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main role="main">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-golden transition-colors">
              Início
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Produtos</span>
          </nav>

          {/* Title */}
          <div className="text-center">
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
              const collections = getCollectionsByCategory(category.filter);
              const Icon = category.icon;

              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="space-y-12"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-golden/10 rounded-lg">
                      <Icon className="w-6 h-6 text-golden" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary font-playfair">
                        {category.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {categoryProducts.length} {categoryProducts.length === 1 ? 'produto' : 'produtos'}
                        {collections.length > 1 && ` • ${collections.length} coleções`}
                      </p>
                    </div>
                  </div>

                  {/* Collections */}
                  <div className="space-y-10">
                    {collections.map((collection) => {
                      const collectionProducts = getProductsByCollection(category.filter, collection);
                      
                      return (
                        <div key={collection || 'sem-colecao'} className="space-y-6">
                          {/* Collection Title (only if there are multiple collections) */}
                          {collections.length > 1 && (
                            <div className="border-l-4 border-golden/30 pl-4">
                              <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                                {collection ? `Coleção ${collection}` : 'Outros Produtos'}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {collectionProducts.length} {collectionProducts.length === 1 ? 'produto' : 'produtos'}
                              </p>
                            </div>
                          )}

                          {/* Products Carousel/Grid */}
                          <ProductCarousel
                            products={collectionProducts}
                            categoryTitle={collection ? `${category.title} - ${collection}` : category.title}
                          />
                        </div>
                      );
                    })}
                  </div>

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

      </main>
      <Footer />
    </div>
  );
};

export default Products;
