import React, { useState, useRef } from 'react';
import { Search, User, Heart, ChevronDown, Layers, Cloud, Bed, Wind, Pilcrow, Sparkles, Menu, Home, FolderOpen, Info, Package, Phone, LogOut, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchTerm, setMobileSearchTerm] = useState('');
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, isClient, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema.",
    });
    navigate('/');
  };

  const categoryIdMap: Record<string, string> = {
    'COLCHAS': 'colchas',
    'EDREDONS': 'edredons',
    'JOGOS DE CAMA': 'jogos-de-cama',
    'COBERDROMS': 'coberdroms',
    'TRAVESSEIROS': 'travesseiros'
  };

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
    if (!searchTerm.trim()) {
      toast({
        title: "Digite algo para buscar",
        description: "Insira um termo de busca para encontrar produtos.",
      });
      return;
    }
    
    navigate(`/produtos?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm('');
  };

  const handleIconClick = (icon: string) => {
    toast({
      title: `${icon} clicado`,
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleCategoryClick = (categoryTitle: string, e: React.MouseEvent) => {
    e.preventDefault();
    setShowMegaMenu(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    const categoryId = categoryIdMap[categoryTitle];
    
    // Se já estiver na página /produtos, apenas scrolla
    if (location.pathname === '/produtos') {
      setTimeout(() => {
        const element = document.getElementById(categoryId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Navega para a página com hash
      navigate(`/produtos#${categoryId}`);
    }
  };

  const handleExploreAll = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMegaMenu(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    
    // Navega para o topo da página de produtos
    if (location.pathname === '/produtos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/produtos');
    }
  };

  const handleMobileSearch = () => {
    if (!mobileSearchTerm.trim()) {
      toast({
        title: "Digite algo para buscar",
        description: "Insira um termo de busca para encontrar produtos.",
      });
      return;
    }
    
    navigate(`/produtos?search=${encodeURIComponent(mobileSearchTerm.trim())}`);
    setMobileSearchTerm('');
    setMobileMenuOpen(false);
  };

  const handleMobileCategoryClick = (categoryTitle: string) => {
    setMobileMenuOpen(false);
    const categoryId = categoryIdMap[categoryTitle];
    
    if (location.pathname === '/produtos') {
      setTimeout(() => {
        const element = document.getElementById(categoryId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      navigate(`/produtos#${categoryId}`);
    }
  };

  const handleMobileNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="bg-white border-b border-accent shadow-soft relative z-50 font-helvetica overflow-visible">
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="text-primary hover:text-golden transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left text-primary">Menu</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Mobile Search */}
                <div className="relative">
                  <div className="flex items-center bg-background-soft rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-muted-foreground mr-2" />
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      value={mobileSearchTerm}
                      onChange={(e) => setMobileSearchTerm(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm text-primary placeholder-muted-foreground"
                      onKeyPress={(e) => e.key === 'Enter' && handleMobileSearch()}
                    />
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  <button
                    onClick={() => handleMobileNavClick('/')}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      location.pathname === '/' 
                        ? 'bg-golden/10 text-golden' 
                        : 'text-primary hover:bg-background-soft'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Início
                  </button>

                  {/* Categories Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="categories" className="border-none">
                      <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-background-soft rounded-lg font-medium text-primary flex items-center gap-2">
                        <FolderOpen className="w-4 h-4" />
                        Categorias
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        <div className="space-y-1 pl-4 mt-2">
                          {categories.map((category) => (
                            <button
                              key={category.title}
                              onClick={() => handleMobileCategoryClick(category.title)}
                              className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-background-soft rounded-lg transition-colors flex items-center gap-2"
                            >
                              <category.icon className="w-4 h-4 text-golden" />
                              <span>{category.title}</span>
                              <span className="text-xs text-muted-foreground ml-auto">({category.itemCount})</span>
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <button
                    onClick={() => handleMobileNavClick('/sobre')}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      location.pathname === '/sobre' 
                        ? 'bg-golden/10 text-golden' 
                        : 'text-primary hover:bg-background-soft'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    Sobre
                  </button>

                  <button
                    onClick={() => handleMobileNavClick('/produtos')}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      location.pathname === '/produtos' 
                        ? 'bg-golden/10 text-golden' 
                        : 'text-primary hover:bg-background-soft'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    Produtos
                  </button>

                  <button
                    onClick={() => handleMobileNavClick('/contato')}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      location.pathname === '/contato' 
                        ? 'bg-golden/10 text-golden' 
                        : 'text-primary hover:bg-background-soft'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Contato
                  </button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="/logo-leyotex-mobile.png" 
              alt="Leyotex" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="text-primary hover:text-golden transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {!user ? (
                  <DropdownMenuItem onClick={() => navigate('/login')}>
                    <User className="w-4 h-4 mr-2" />
                    Entrar
                  </DropdownMenuItem>
                ) : (
                  <>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <Shield className="w-4 h-4 mr-2" />
                          Painel Admin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {isClient && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/perfil')}>
                          <User className="w-4 h-4 mr-2" />
                          Meu Perfil
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block max-w-7xl mx-auto px-4">
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
                                <a
                                  href={`/produtos#${categoryIdMap[category.title]}`}
                                  onClick={(e) => handleCategoryClick(category.title, e)}
                                  className="luxury-item-link"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Link */}
                    <div className="luxury-bottom-link">
                      <div className="luxury-bottom-line"></div>
                      <a 
                        href="/produtos" 
                        onClick={handleExploreAll}
                        className="luxury-explore-link"
                      >
                        Explore todas as coleções →
                      </a>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-primary placeholder-muted-foreground"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="text-primary hover:text-golden transition-colors duration-200"
                >
                  <User className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {!user ? (
                  <DropdownMenuItem onClick={() => navigate('/login')}>
                    <User className="w-4 h-4 mr-2" />
                    Entrar
                  </DropdownMenuItem>
                ) : (
                  <>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <Shield className="w-4 h-4 mr-2" />
                          Painel Admin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {isClient && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/perfil')}>
                          <User className="w-4 h-4 mr-2" />
                          Meu Perfil
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;