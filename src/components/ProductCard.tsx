import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';

interface ProductCardProps {
  name: string;
  category: string;
  imageUrl?: string | null;
  collection?: string | null;
  price?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, category, imageUrl, collection, price }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isClient } = useAuth();

  const getProductDescription = (category: string, collection: string | null): string => {
    // Normalizar categoria para melhor matching
    const normalizedCategory = category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');

    const descriptions: Record<string, Record<string, string>> = {
      colcha: {
        'Nina': 'Design clássico macio',
        'Roma': 'Elegância atemporal premium',
        'Nina Cetim': 'Brilho sofisticado',
        default: 'Leveza e aconchego'
      },
      edredom: {
        'Casal': 'Conforto térmico duplo',
        'Solteiro': 'Aquecimento ideal individual',
        default: 'Maciez todas estações'
      },
      'jogo-de-cama': {
        'Buzios': 'Tecido premium durável',
        'Ipanema': 'Design moderno suave',
        'Milão': 'Sofisticação superior',
        default: 'Alto padrão completo'
      },
      coberdrom: {
        'Belissima': 'Tecnologia térmica premium',
        default: 'Versatilidade e conforto'
      },
      travesseiro: {
        'Alvorada': 'Suporte firme respirável',
        'Bom Sono': 'Conforto equilibrado',
        'Delicata': 'Maciez delicada',
        'Nuvare': 'Tecnologia máximo conforto',
        default: 'Ergonomia ideal'
      }
    };

    const categoryDesc = descriptions[normalizedCategory];
    
    if (!categoryDesc) {
      console.warn(`Categoria não encontrada: ${category} (normalizada: ${normalizedCategory})`);
      return 'Qualidade e conforto premium';
    }
    
    return categoryDesc[collection || 'default'] || categoryDesc['default'];
  };

  useEffect(() => {
    console.log('ProductCard:', { 
      category, 
      collection, 
      description: getProductDescription(category, collection) 
    });
  }, [category, collection]);

  const handleSolicitarClick = () => {
    navigate('/contato#vamos-conversar');
    setTimeout(() => {
      const element = document.getElementById('vamos-conversar');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleComprarClick = () => {
    const whatsappNumber = '5511999999999'; // Número do WhatsApp
    const message = `Olá! Tenho interesse no produto: *${name}* (${category})`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group bg-card border border-border rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {imageUrl ? (
          <>
            {!imageLoaded && (
              <Skeleton className="absolute inset-0" />
            )}
            <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
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

        {/* Price - Only visible for clients */}
        {isClient && price && (
          <div className="mb-3">
            <p className="text-lg font-bold text-golden">
              R$ {price.toFixed(2)}
            </p>
          </div>
        )}
        
        {/* Button - Changes based on client status */}
        {isClient ? (
          <Button
            onClick={handleComprarClick}
            className="w-full bg-success hover:bg-success/90 text-white text-sm py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            size="sm"
          >
            Comprar
          </Button>
        ) : (
          <Button
            onClick={handleSolicitarClick}
            className="w-full bg-golden hover:bg-golden-dark text-white text-sm py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            size="sm"
          >
            Solicitar
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
