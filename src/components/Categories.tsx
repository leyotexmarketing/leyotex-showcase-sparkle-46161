import React from 'react';
import { useToast } from '@/hooks/use-toast';

const Categories = () => {
  const { toast } = useToast();

  const categories = [
    {
      name: "Banho",
      image: "/images/banho-luxury-bathroom.jpg",
      description: "Toalhas premium e acessórios",
      hoverTitle: "Envolva-se em Texturas",
      hoverDescription: "Descubra nossa linha de toalhas premium em novas cores",
      shopText: "Shop Banho"
    },
    {
      name: "Cama",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop", 
      description: "Lençóis e edredons de luxo",
      hoverTitle: "Eleve Seu Descanso",
      hoverDescription: "Onde técnicas seculares encontram o conforto moderno",
      shopText: "Shop Cama"
    },
    {
      name: "Baby & Kids",
      image: "/images/baby-kids-nursery.jpg",
      description: "Conforto e segurança infantil",
      hoverTitle: "Primeiros Sonhos",
      hoverDescription: "Conforto e segurança para os pequenos",
      shopText: "Shop Baby & Kids"
    },
    {
      name: "Linha Especial",
      image: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=400&h=300&fit=crop",
      description: "Soluções profissionais",
      hoverTitle: "Coleções Exclusivas",
      hoverDescription: "Soluções personalizadas para projetos exclusivos",
      shopText: "Shop Linha Especial"
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    toast({
      title: `Categoria ${categoryName}`,
      description: "Navegação em desenvolvimento",
    });
  };

  return (
    <section className="py-20 bg-background-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl font-bold text-primary mb-4 font-playfair">
            Nossas Categorias
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore nossa ampla gama de produtos para todos os ambientes da sua casa
          </p>
        </div>

        {/* Categories Grid - 2 rows x 3 columns */}
        <div className="frette-categories-grid">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="frette-category-card group"
              onClick={() => handleCategoryClick(category.name)}
            >
              {/* Background Image */}
              <div className="frette-image-container">
                <img
                  src={category.image}
                  alt={category.name}
                  className="frette-background-image"
                />
                
                {/* Normal State Overlay */}
                <div className="frette-normal-overlay" />
                
                {/* Hover State Overlay */}
                <div className="frette-hover-overlay" />
              </div>

              {/* Text Content */}
              <div className="frette-text-container">
                {/* Normal State Text */}
                <div className="frette-normal-text">
                  <h3 className="frette-title">{category.name}</h3>
                  <p className="frette-description">{category.description}</p>
                  <span className="frette-link">Explorar</span>
                </div>

                {/* Hover State Text */}
                <div className="frette-hover-text">
                  <h3 className="frette-title">{category.hoverTitle}</h3>
                  <p className="frette-description">{category.hoverDescription}</p>
                  <span className="frette-link">{category.shopText} →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;