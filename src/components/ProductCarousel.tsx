import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ProductCarouselProps {
  products: Product[];
  categoryTitle: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, categoryTitle }) => {
  return (
    <div className="w-full">
      {/* Desktop: Carousel */}
      <div className="hidden md:block">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard
                  name={product.name}
                  category={categoryTitle}
                  imageUrl={product.image_url}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {products.length > 4 && (
            <>
              <CarouselPrevious className="left-0 -translate-x-12" />
              <CarouselNext className="right-0 translate-x-12" />
            </>
          )}
        </Carousel>
      </div>

      {/* Mobile: Compact 2-column Grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            category={categoryTitle}
            imageUrl={product.image_url}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
