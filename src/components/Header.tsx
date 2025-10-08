import React, { useState, useRef } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Layers, Cloud, Bed, Wind, Pilcrow, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const location = useLocation();

  const categories = [
    {
      title: "COLCHAS",
      icon: Layers,
      itemCount: 18,
      items: ["Colcha Nina", "Colcha Nina Cetim", "Colcha Roma", "Coleção Completa"]
    },
    {
      title: "EDREDONS",
      icon: Cloud,
      itemCount: 12,
      items: ["Edredom Casal", "Edredom Solteiro", "Coleção Completa", "Conjuntos"]
    },
    {
      title: "JOGOS DE CAMA",
      icon: Bed,
      itemCount: 65,
      items: ["Linha Buzios", "Linha Ipanema", "Linha Milão", "Coleção Completa"]
    },
    {
      title: "COBERDROMS",
      icon: Wind,
      itemCount: 6,
      items: ["Coberdrom Belissima", "Coleção Completa", "Kits"]
    },
    {
      title: "TRAVESSEIROS",
      icon: Pilcrow,
      itemCount: 8,
      items: ["Travesseiro Alvorada", "Travesseiro Bom Sono", "Travesseiro Delicata", "Travesseiro Nuvare", "Coleção Completa"]
    }
  ];

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 300);
  };

  const scrollToHero = () => {
    const heroElement = document.querySelector('main');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = () => {
    toast({
      title: "Busca realizada",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleIconClick = (icon: string) => {
    toast({
      title: `${icon} clicado`,
      description: "Funcionalidade em desenvolvimento",
    });
  };

  return (
    <header className="bg-white border-b border-accent shadow-soft relative z-50 font-helvetica overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/logo-leyotex.png" 
              alt="Leyotex" 
              className="h-12 w-auto"
            />
          </div>

          {/* Center Section */}
          <div className="flex items-center space-x-6">
            {/* Início Link */}
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'text-golden' 
                  : 'text-primary hover:text-golden'
              }`}
            >
              Início
            </Link>

            {/* Categories Button */}
            <div className="relative">
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex items-center space-x-2 text-primary font-medium hover:text-golden transition-colors duration-200"
              >
                <span>Categorias</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Luxury Mega Menu */}
              {showMegaMenu && (
                <div 
                  className="fixed left-1/2 transform -translate-x-1/2 top-20 z-[99999]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    width: '90vw',
                    maxWidth: '1200px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    minHeight: 'auto',
                  }}
                >
                  <div className="luxury-mega-menu">
                    {/* Seasonal Banner */}
                    <div className="luxury-seasonal-banner">
                      <div className="shimmer-effect"></div>
                      <Sparkles className="w-4 h-4 text-golden-dark animate-pulse" />
                      <span>Coleção 2025 - Conforto e Elegância</span>
                      <Sparkles className="w-4 h-4 text-golden-dark animate-pulse" />
                    </div>

                    {/* Categories Grid - 5 columns */}
                    <div className="grid grid-cols-5 gap-8 pt-8">
                      {categories.map((category, index) => (
                        <div 
                          key={category.title} 
                          className="luxury-category-column"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="luxury-category-header group">
                            <category.icon className="luxury-category-icon" />
                            <div>
                              <h3 className="luxury-category-title">
                                {category.title}
                                <span className="luxury-item-count">({category.itemCount})</span>
                              </h3>
                              <div className="luxury-hover-arrow">→</div>
                            </div>
                          </div>
                          
                          <ul className="space-y-3 mt-4">
                             {category.items.map((item, itemIndex) => (
                              <li key={item} className="luxury-category-item">
                                <div className="luxury-gold-dot"></div>
                                <Link
                                  to="/produtos"
                                  onClick={() => {
                                    setShowMegaMenu(false);
                                    if (closeTimerRef.current) {
                                      clearTimeout(closeTimerRef.current);
                                    }
                                    // Scroll to category section after navigation
                                    setTimeout(() => {
                                      const categoryId = category.title.toLowerCase().replace(/\s+/g, '-');
                                      const element = document.getElementById(categoryId);
                                      if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                      }
                                    }, 100);
                                  }}
                                  className="luxury-item-link"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Link */}
                    <div className="luxury-bottom-link">
                      <div className="luxury-bottom-line"></div>
                      <Link to="/produtos" className="luxury-explore-link">
                        Explore todas as coleções →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sobre Link */}
            <Link
              to="/sobre"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/sobre' 
                  ? 'text-golden' 
                  : 'text-primary hover:text-golden'
              }`}
            >
              Sobre
            </Link>

            {/* Produtos Link */}
            <Link
              to="/produtos"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/produtos' 
                  ? 'text-golden' 
                  : 'text-primary hover:text-golden'
              }`}
            >
              Produtos
            </Link>

            {/* Contato Link */}
            <Link
              to="/contato"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/contato' 
                  ? 'text-golden' 
                  : 'text-primary hover:text-golden'
              }`}
            >
              Contato
            </Link>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-background-soft rounded-lg px-4 py-2 w-64">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="flex-1 bg-transparent outline-none text-primary placeholder-muted-foreground"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => handleIconClick('Perfil')}
              className="text-primary hover:text-golden transition-colors duration-200"
            >
              <User className="w-6 h-6" />
            </button>
            <button 
              onClick={() => handleIconClick('Favoritos')}
              className="text-primary hover:text-golden transition-colors duration-200"
            >
              <Heart className="w-6 h-6" />
            </button>
            <button 
              onClick={() => handleIconClick('Carrinho')}
              className="relative text-primary hover:text-golden transition-colors duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-golden text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;