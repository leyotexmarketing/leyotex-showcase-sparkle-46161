import React from 'react';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  name: string;
  category: string;
  imageUrl?: string | null;
  collection?: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, category, imageUrl, collection }) => {
  const navigate = useNavigate();

  const getProductDescription = (category: string, collection: string | null): string => {
    const descriptions: Record<string, Record<string, string>> = {
      colcha: {
        'Nina': 'Design clássico com toque macio e acabamento refinado',
        'Roma': 'Elegância atemporal com caimento perfeito',
        'Nina Cetim': 'Brilho sofisticado e maciez incomparável',
        default: 'Equilíbrio entre leveza e aconchego'
      },
      edredom: {
        'Casal': 'Conforto térmico ideal para duas pessoas',
        'Solteiro': 'Aquecimento perfeito e leveza garantida',
        default: 'Maciez e conforto para todas as estações'
      },
      'jogo-de-cama': {
        'Buzios': 'Tecido premium com alta durabilidade',
        'Ipanema': 'Design moderno e toque suave',
        'Milão': 'Sofisticação e qualidade superior',
        default: 'Conjunto completo de alto padrão'
      },
      coberdrom: {
        'Belissima': 'Tecnologia térmica e acabamento premium',
        default: 'Versatilidade e conforto em todas as estações'
      },
      travesseiro: {
        'Alvorada': 'Suporte firme e respirabilidade',
        'Bom Sono': 'Conforto equilibrado para noites tranquilas',
        'Delicata': 'Maciez delicada e suporte adequado',
        'Nuvare': 'Tecnologia de ponta para máximo conforto',
        default: 'Ergonomia e conforto para seu descanso'
      }
    };

    const categoryDescriptions = descriptions[category.toLowerCase()] || { default: 'Produto de qualidade premium' };
    return categoryDescriptions[collection || 'default'] || categoryDescriptions['default'];
  };

  const handleSolicitarClick = () => {
    navigate('/contato#vamos-conversar');
    setTimeout(() => {
      const element = document.getElementById('vamos-conversar');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="group bg-card border border-border rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <Package className="w-16 h-16 text-muted-foreground/30" strokeWidth={1} />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-golden/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium md:px-3 md:py-1 px-2 py-0.5 text-[10px] md:text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-1.5rem)]">
          {category}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Product Name */}
        <h3 className="font-semibold text-sm text-foreground group-hover:text-golden transition-colors duration-200 line-clamp-2 min-h-[2.5rem] mb-2">
          {name}
        </h3>
        
        {/* Product Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
          {getProductDescription(category, collection)}
        </p>
        
        {/* Solicitar Button */}
        <Button
          onClick={handleSolicitarClick}
          className="w-full bg-golden hover:bg-golden-dark text-white text-sm py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          size="sm"
        >
          Solicitar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
