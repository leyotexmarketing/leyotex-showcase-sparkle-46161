import React from 'react';
import { useToast } from '@/hooks/use-toast';

const Categories = () => {
  const { toast } = useToast();

  const categories = [
    {
      name: "Colchas",
      image: "/images/jogo-lencol-luxo.jpg",
      description: "Elegância e praticidade",
      hoverTitle: "Colchas Premium",
      hoverDescription: "18 modelos exclusivos para sua cama",
      shopText: "Ver Colchas"
    },
    {
      name: "Edredons",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop", 
      description: "Conforto e caimento perfeito",
      hoverTitle: "Edredons de Luxo",
      hoverDescription: "12 modelos em Casal e Solteiro",
      shopText: "Ver Edredons"
    },
    {
      name: "Jogos de Cama",
      image: "/images/jogo-lencol-luxo.jpg",
      description: "Conjunto confortável para o dia a dia",
      hoverTitle: "Jogos de Cama",
      hoverDescription: "66 modelos nas linhas Buzios, Ipanema e Milão",
      shopText: "Ver Jogos de Cama"
    },
    {
      name: "Coberdroms",
      image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=400&h=300&fit=crop",
      description: "Aconchego e estilo",
      hoverTitle: "Coberdroms Belissima",
      hoverDescription: "6 modelos versáteis para todas as estações",
      shopText: "Ver Coberdroms"
    },
    {
      name: "Travesseiros",
      image: "/images/travesseiro-memory-foam-premium.jpg",
      description: "Suporte e maciez",
      hoverTitle: "Travesseiros Premium",
      hoverDescription: "8 modelos para noites mais confortáveis",
      shopText: "Ver Travesseiros"
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

        {/* Categories Grid - Adjusted for 5 items: 3 on top row, 2 on bottom */}
        <div className="frette-categories-grid" style={{ 
          gridTemplateColumns: 'repeat(3, 1fr)',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {categories.slice(0, 3).map((category) => (
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

        {/* Second Row - Centered 2 items */}
        <div className="frette-categories-grid mt-6" style={{ 
          gridTemplateColumns: 'repeat(2, 1fr)',
          maxWidth: '920px',
          margin: '24px auto 0'
        }}>
          {categories.slice(3).map((category) => (
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