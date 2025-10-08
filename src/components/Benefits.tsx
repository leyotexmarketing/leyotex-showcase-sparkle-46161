import React from 'react';
import { Truck, CreditCard, Factory, RotateCcw } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Frete Grátis",
      subtitle: "acima de R$ 299",
      description: "Entrega gratuita para todo o Brasil"
    },
    {
      icon: <CreditCard className="w-6 h-6 md:w-8 md:h-8" />,
      title: "12x sem juros",
      subtitle: "no cartão de crédito",
      description: "Parcele suas compras sem pagar mais"
    },
    {
      icon: <Factory className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Direto da Fábrica",
      subtitle: "melhor preço",
      description: "Qualidade premium sem intermediários"
    },
    {
      icon: <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />,
      title: "30 dias",
      subtitle: "para troca",
      description: "Não gostou? Trocamos sem complicação"
    }
  ];

  return (
    <section className="py-8 md:py-16 bg-white border-t border-accent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 md:space-x-4 p-4 md:p-6 rounded-lg hover:bg-background-soft transition-colors duration-200 fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 text-golden">
                {benefit.icon}
              </div>
              <div>
                <div className="font-bold text-primary text-sm md:text-base">
                  {benefit.title}
                </div>
                <div className="text-golden text-xs md:text-sm font-medium">
                  {benefit.subtitle}
                </div>
                <div className="text-muted-foreground text-xs md:text-sm">
                  {benefit.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;