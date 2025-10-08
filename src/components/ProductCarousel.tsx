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
  const hasProducts = products && products.length > 0;

  // Placeholder list to keep layout stable when empty
  const placeholderItems = Array.from({ length: 4 }, (_, i) => ({
    id: `placeholder-${categoryTitle}-${i}`,
    name: 'Em breve',
    image_url: null,
  })) as unknown as Product[];

  const renderList = hasProducts ? products : placeholderItems;

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
            {renderList.map((product) => (
              <CarouselItem key={(product as any).id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard
                  name={product.name}
                  category={categoryTitle}
                  imageUrl={(product as any).image_url}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {renderList.length > 4 && (
            <>
              <CarouselPrevious className="left-0 -translate-x-12" />
              <CarouselNext className="right-0 translate-x-12" />
            </>
          )}
        </Carousel>
      </div>

      {/* Mobile: Carousel with 2 items per view */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {renderList.map((product) => (
              <CarouselItem key={(product as any).id} className="pl-2 basis-1/2">
                <ProductCard
                  name={product.name}
                  category={categoryTitle}
                  imageUrl={(product as any).image_url}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {renderList.length > 2 && (
            <>
              <CarouselPrevious className="left-0 -translate-x-8 h-8 w-8" />
              <CarouselNext className="right-0 translate-x-8 h-8 w-8" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;

