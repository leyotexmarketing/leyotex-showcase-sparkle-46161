import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const { toast } = useToast();
  const [selectedColors, setSelectedColors] = useState<{[key: number]: string}>({});

  const products = [
    {
      id: 1,
      name: "Toalha Premium Cotton",
      price: "R$ 89,90",
      image: "/images/toalha-premium-cotton.jpg",
      colors: ["#000000", "#FFFFFF", "#8B7355", "#E5E5E5"]
    },
    {
      id: 2,
      name: "Jogo de Lençol Luxo",
      price: "R$ 249,90",
      image: "/images/jogo-lencol-luxo.jpg",
      colors: ["#2C4F7C", "#FFFFFF", "#F5DEB3", "#E6E6FA"]
    },
    {
      id: 3,
      name: "Edredom Confort Plus",
      price: "R$ 189,90",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
      colors: ["#E6E6FA", "#FFFFFF", "#FFE4E1"]
    },
    {
      id: 4,
      name: "Almofada Decorativa",
      price: "R$ 59,90",
      image: "/images/almofada-decorativa.jpg",
      colors: ["#556B2F", "#D4A574", "#000000", "#8B0000"]
    },
    {
      id: 5,
      name: "Toalha de Mesa Elegance",
      price: "R$ 129,90",
      image: "/images/toalha-mesa-elegance.jpg",
      colors: ["#FFFFFF", "#E5E5E5", "#2C4F7C"]
    },
    {
      id: 6,
      name: "Cortina Blackout Premium",
      price: "R$ 199,90",
      image: "/images/cortina-blackout-premium.jpg",
      colors: ["#000000", "#8B7355", "#FFFFFF"]
    },
    {
      id: 7,
      name: "Travesseiro Ortopédico Luxo",
      price: "R$ 169,90",
      image: "/images/travesseiro-ortopedico-luxo.jpg",
      colors: ["#FFFFFF", "#F0F8FF"]
    },
    {
      id: 8,
      name: "Travesseiro Memory Foam Premium",
      price: "R$ 119,90",
      image: "/images/travesseiro-memory-foam-premium.jpg",
      colors: ["#FFFFFF", "#E5E5E5", "#F5F5F5"]
    }
  ];

  // Initialize selected colors with first color of each product
  React.useEffect(() => {
    const initialColors: {[key: number]: string} = {};
    products.forEach(product => {
      initialColors[product.id] = product.colors[0];
    });
    setSelectedColors(initialColors);
  }, []);

  const handleColorSelect = (productId: number, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
    console.log(`Product ${productId} - Color selected: ${color}`);
  };

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Produto adicionado ao carrinho!",
      description: `${productName} foi adicionado com sucesso.`,
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl font-bold text-primary mb-4 font-playfair">
            Produtos em Destaque
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção especial de produtos premium para sua casa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-primary mb-2 group-hover:text-golden transition-colors duration-200">
                  {product.name}
                </h3>
                
                <p className="text-2xl font-bold text-golden mb-4">
                  {product.price}
                </p>

                {/* Color Options */}
                <div className="flex space-x-2 mb-6">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(product.id, color)}
                      className={`color-dot ${
                        selectedColors[product.id] === color ? 'selected' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      title={`Selecionar cor ${color}`}
                    />
                  ))}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product.name)}
                  className="w-full btn-golden hover:shadow-golden transform hover:scale-105 transition-all duration-200"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => toast({
              title: "Ver mais produtos",
              description: "Funcionalidade em desenvolvimento",
            })}
            className="btn-outline-golden px-8 py-4 text-lg hover:shadow-golden"
          >
            Ver Todos os Produtos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;