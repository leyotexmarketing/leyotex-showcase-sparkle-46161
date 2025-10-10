import { Card, CardContent } from '@/components/ui/card';
import { Package, CheckCircle, FileText, DollarSign } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductsStatsProps {
  products: Product[];
}

export const ProductsStats = ({ products }: ProductsStatsProps) => {
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const inactiveProducts = products.filter(p => p.status !== 'active').length;
  
  const prices = products
    .map(p => p.price || 0)
    .filter(price => price > 0);
  
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const stats = [
    {
      title: 'Total de Produtos',
      value: totalProducts,
      icon: Package,
      color: 'text-primary',
    },
    {
      title: 'Produtos Ativos',
      value: activeProducts,
      icon: CheckCircle,
      color: 'text-success',
    },
    {
      title: 'Rascunhos/Inativos',
      value: inactiveProducts,
      icon: FileText,
      color: 'text-muted-foreground',
    },
    {
      title: 'Faixa de Preços',
      value: prices.length > 0 ? `R$ ${minPrice.toFixed(2)} - R$ ${maxPrice.toFixed(2)}` : 'N/A',
      icon: DollarSign,
      color: 'text-golden',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
