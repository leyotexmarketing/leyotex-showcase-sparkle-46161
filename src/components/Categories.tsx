import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const categoryIdMap: Record<string, string> = {
    'Colchas': 'colchas',
    'Edredons': 'edredons',
    'Jogos de Cama': 'jogos-de-cama',
    'Coberdroms': 'coberdroms',
    'Travesseiros': 'travesseiros'
  };

  const categories = [
    {
      name: "Colchas",
      image: "/images/Colcha_Roma_1.png",
      description: "Equilíbrio entre leveza, aconchego e sofisticação.",
      hoverTitle: "Colchas Premium",
      hoverDescription: "18 modelos exclusivos para sua cama",
      shopText: "Ver Colchas"
    },
    {
      name: "Edredons",
      image: "/images/Edredom_casal_1.png",
      description: "Equilíbrio entre leveza, aconchego e sofisticação.",
      hoverTitle: "Edredons de Luxo",
      hoverDescription: "12 modelos em Casal e Solteiro",
      shopText: "Ver Edredons"
    },
    {
      name: "Jogos de Cama",
      image: "/images/Jogo_de_Cama_Ipanema_1.png",
      description: "Design atualizado, toque suave e alta durabilidade.",
      hoverTitle: "Jogos de Cama",
      hoverDescription: "66 modelos nas linhas Buzios, Ipanema e Milão",
      shopText: "Ver Jogos de Cama"
    },
    {
      name: "Coberdroms",
      image: "/images/Coberdrom_Belissima_1.png",
      description: "Tecnologia e conforto térmico com acabamento de alto padrão.",
      hoverTitle: "Coberdroms Belissima",
      hoverDescription: "6 modelos versáteis para todas as estações",
      shopText: "Ver Coberdroms"
    },
    {
      name: "Travesseiros",
      image: "/images/Travesseiro_Nuvare.png",
      description: "Foco em conforto, resistência e estética refinada.",
      hoverTitle: "Travesseiros Premium",
      hoverDescription: "8 modelos para noites mais confortáveis",
      shopText: "Ver Travesseiros"
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    const categoryId = categoryIdMap[categoryName];
    if (categoryId) {
      navigate(`/produtos#${categoryId}`);
    }
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

        {/* Unified Categories Grid - 5 items: 3 on top, 2 on bottom centered */}
        <div className="frette-categories-grid">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="frette-category-card group"
              onClick={() => handleCategoryClick(category.name)}
              data-index={index}
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
