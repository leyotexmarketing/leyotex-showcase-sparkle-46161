import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, Sparkles, Award, Target, Heart, Shield } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // SEO
    document.title = "Sobre a Leyotex - Referência em Artigos de Cama | Qualidade e Conforto";
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Conheça a Leyotex, empresa têxtil dedicada à produção de artigos de cama de alta qualidade. Missão, visão e valores que consolidam nossa referência no mercado brasileiro.');
    if (!document.head.contains(metaDescription)) {
      document.head.appendChild(metaDescription);
    }

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in-up elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-background-soft"></div>
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-golden/10 text-golden px-4 py-2 rounded-full text-sm font-medium mb-6 fade-in-up">
              <Sparkles className="w-4 h-4" />
              Tradição & Inovação
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-6 fade-in-up">
              Sobre a <span className="text-golden">Leyotex</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed fade-in-up">
              Transformando o mercado têxtil brasileiro com artigos de cama que unem qualidade, conforto e durabilidade
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="fade-in-up">
                <div className="inline-flex items-center gap-2 text-golden mb-4">
                  <Target className="w-5 h-5" />
                  <span className="font-medium">Nossa Missão</span>
                </div>
                <h2 className="text-3xl font-playfair font-bold text-primary mb-6">
                  Qualidade que Gera Bem-estar
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A Leyotex é uma empresa do setor têxtil dedicada à produção de artigos de cama que unem qualidade, conforto e durabilidade. Nossa missão é entregar produtos capazes de gerar bem-estar e confiança, sempre com o compromisso de fortalecer a indústria nacional.
                </p>
                <div className="flex items-center gap-4 text-sm text-golden font-medium">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Qualidade Superior
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-current" />
                    Bem-estar
                  </div>
                </div>
              </div>
              
              <div className="fade-in-up">
                <div className="inline-flex items-center gap-2 text-golden mb-4">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Nossa Visão</span>
                </div>
                <h2 className="text-3xl font-playfair font-bold text-primary mb-6">
                  Referência no Mercado Brasileiro
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Com visão voltada para a consolidação como referência no mercado brasileiro, a empresa atua com base em valores que privilegiam a ética, a transparência, a sustentabilidade e a busca constante por inovação.
                </p>
                <div className="flex items-center gap-4 text-sm text-golden font-medium">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Ética & Transparência
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Inovação
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="py-20 bg-background-soft">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Nossa História
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transformando o mercado desde a fundação
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft fade-in-up">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-6">
                  Desde a sua fundação, a Leyotex nasceu com o propósito de transformar o mercado, produzindo no Brasil artigos de cama que aliam design moderno, sofisticação e confiabilidade. Essa essência se traduz no cuidado com cada detalhe, na escolha criteriosa da matéria-prima e no rigor dos processos produtivos, resultando em produtos que se destacam pela qualidade superior.
                </p>
                
                <p className="leading-relaxed mb-6">
                  Seu modelo de negócio é voltado ao fornecimento de soluções para atacadistas, lojistas e redes varejistas em todo o território nacional. Mais do que oferecer produtos, a Leyotex constrói parcerias estratégicas, reforçando sua credibilidade ao entregar artigos que atendem às demandas do mercado e contribuem para a competitividade dos seus clientes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Nosso Portfólio
              </h2>
              <p className="text-xl text-muted-foreground">
                100% fabricado no Brasil com qualidade internacional
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-golden/5 to-golden/10 rounded-2xl p-8 md:p-12 fade-in-up">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-golden/20 text-golden px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  Produzido no Brasil
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto mb-8">
                O portfólio inclui jogos de cama, lençóis, fronhas, colchas, edredons e cobertores, todos fabricados integralmente no Brasil. O diferencial está na capacidade de combinar tradição industrial e tecnologia para desenvolver produtos que unem durabilidade, conforto e design atualizado, consolidando-se como uma marca que valoriza o que é produzido no país.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                {[
                  'Jogos de Cama',
                  'Lençóis Premium', 
                  'Fronhas Luxo',
                  'Colchas Elegantes',
                  'Edredons Confort',
                  'Cobertores Térmicos'
                ].map((product, index) => (
                  <div key={product} className="bg-white/50 rounded-lg p-4 border border-golden/20">
                    <div className="w-2 h-2 bg-golden rounded-full mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-primary">{product}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Culture Section */}
        <section className="py-20 bg-background-soft">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Nossa Cultura
              </h2>
              <p className="text-xl text-muted-foreground">
                Comunicação interna e engajamento como pilares do sucesso
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft fade-in-up">
              <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto text-lg">
                A comunicação interna ocupa papel central na cultura da empresa. Por meio de treinamentos, integração e incentivo ao engajamento, a Leyotex garante que sua equipe esteja alinhada aos objetivos estratégicos e aos valores institucionais. Essa união de esforços reflete diretamente na excelência que chega ao mercado e reafirma o compromisso da empresa em ser referência no setor têxtil brasileiro.
              </p>
              
              <div className="flex justify-center items-center gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-golden" />
                  </div>
                  <span className="text-sm font-medium text-primary">Excelência</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-golden" />
                  </div>
                  <span className="text-sm font-medium text-primary">Engajamento</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-golden" />
                  </div>
                  <span className="text-sm font-medium text-primary">Compromisso</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;