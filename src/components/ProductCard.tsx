import React from 'react';
import { Package } from 'lucide-react';

interface ProductCardProps {
  name: string;
  category: string;
  imageUrl?: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, category, imageUrl }) => {
  return (
    <div className="group bg-card rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden">
      {/* Image Placeholder */}
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
        <div className="absolute top-3 right-3 bg-golden/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm text-foreground group-hover:text-golden transition-colors duration-200 line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
