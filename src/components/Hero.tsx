import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Transforme sua Casa em um Lar",
      subtitle: "Descubra a qualidade e o conforto dos nossos produtos premium",
      cta: "Ver Coleção",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Coleção Premium 2024",
      subtitle: "Novidades exclusivas com a qualidade Leyotex que você já conhece",
      cta: "Explorar Novidades",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Até 40% OFF - Linha Profissional", 
      subtitle: "Produtos para hotelaria e hospitalar com desconto especial",
      cta: "Aproveitar Oferta",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&h=600&fit=crop&crop=center"
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section 
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image - NO OVERLAY */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                  <span style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                    {slide.title}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white">
                  <span style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                    {slide.subtitle}
                  </span>
                </p>
                <button className="btn-golden text-lg px-8 py-4 font-semibold shadow-golden hover:scale-105 transform transition-all duration-300">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-golden scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;