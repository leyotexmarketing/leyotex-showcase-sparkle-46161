import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [statsRef, isStatsVisible] = useIntersectionObserver();
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    rating: 0,
    years: 0,
    recommendation: 0
  });

  const testimonials = [
    {
      id: 1,
      text: "A qualidade dos produtos Leyotex é excepcional! Minha casa nunca ficou tão aconchegante e elegante.",
      author: "Maria Silva",
      location: "São Paulo, SP",
      initials: "MS"
    },
    {
      id: 2, 
      text: "Atendimento impecável e produtos de primeira linha. Recomendo para todos que buscam qualidade.",
      author: "João Santos",
      location: "Rio de Janeiro, RJ", 
      initials: "JS"
    },
    {
      id: 3,
      text: "Compro há anos na Leyotex. A durabilidade e o conforto dos produtos são inigualáveis.",
      author: "Ana Costa",
      location: "Belo Horizonte, MG",
      initials: "AC"
    },
    {
      id: 4,
      text: "O melhor custo-benefício do mercado. Produtos premium com preços justos.",
      author: "Carlos Lima",
      location: "Brasília, DF",
      initials: "CL"
    },
    {
      id: 5,
      text: "Minha família toda usa produtos Leyotex. Qualidade que passa de geração em geração.",
      author: "Patricia Oliveira", 
      location: "Porto Alegre, RS",
      initials: "PO"
    }
  ];

  const stats = [
    { label: "Clientes Satisfeitos", value: 5000, suffix: "K+", key: "clients" },
    { label: "Avaliação Média", value: 4.8, suffix: "", key: "rating" }, 
    { label: "Anos de Experiência", value: 29, suffix: "", key: "years" },
    { label: "Recomendação", value: 98, suffix: "%", key: "recommendation" }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, testimonials.length]);

  // Animate stats when visible
  useEffect(() => {
    if (isStatsVisible) {
      stats.forEach((stat, index) => {
        setTimeout(() => {
          let startValue = 0;
          const endValue = stat.value;
          const duration = 2000;
          const increment = endValue / (duration / 16);
          
          const animate = () => {
            startValue += increment;
            if (startValue < endValue) {
              setAnimatedStats(prev => ({
                ...prev,
                [stat.key]: startValue
              }));
              requestAnimationFrame(animate);
            } else {
              setAnimatedStats(prev => ({
                ...prev,
                [stat.key]: endValue
              }));
            }
          };
          animate();
        }, index * 200);
      });
    }
  }, [isStatsVisible]);

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-background-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl font-bold text-primary mb-4 font-playfair">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais de 50.000 clientes satisfeitos confiam na qualidade Leyotex
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div 
          className="relative max-w-4xl mx-auto mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-white rounded-xl shadow-medium p-8 md:p-12 relative overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 ${
                  index === currentTestimonial 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 absolute inset-0 p-8 md:p-12 transform translate-x-full'
                }`}
              >
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-center text-primary italic mb-8 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-golden rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-primary">
                      {testimonial.author}
                    </p>
                    <p className="text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-golden hover:bg-golden-dark text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-golden hover:bg-golden-dark text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentTestimonial ? 'bg-golden w-8' : 'bg-accent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className="text-center fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-golden mb-2">
                {stat.key === 'rating' 
                  ? animatedStats[stat.key].toFixed(1)
                  : stat.key === 'clients' 
                    ? `5000`
                    : Math.floor(animatedStats[stat.key])
                }{stat.suffix}
              </div>
              <p className="text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;