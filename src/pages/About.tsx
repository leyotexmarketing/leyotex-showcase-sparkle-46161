import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, Sparkles, Award, Target, Heart, Shield, CheckCircle, TrendingUp, Users, Globe, Lightbulb, Leaf, Quote, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    // SEO
    document.title = "Sobre a Leyotex - Missão, Visão e Valores | Referência Têxtil Brasileira";
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Conheça a Leyotex: missão, visão, valores e manifesto. Somos referência nacional em artigos de cama com qualidade superior, inovação e compromisso com a produção brasileira.');
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
              Qualidade que acolhe, confiança que permanece
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
                  Produzir com Propósito e Excelência
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Produzir e fornecer artigos de cama que unam conforto, durabilidade e sofisticação, promovendo bem-estar aos consumidores e fortalecendo a indústria nacional por meio de processos éticos, sustentáveis e inovadores.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm text-golden font-medium bg-golden/5 px-3 py-2 rounded-full">
                    <Heart className="w-4 h-4 fill-current" />
                    Bem-estar
                  </div>
                  <div className="flex items-center gap-2 text-sm text-golden font-medium bg-golden/5 px-3 py-2 rounded-full">
                    <Shield className="w-4 h-4" />
                    Ética
                  </div>
                  <div className="flex items-center gap-2 text-sm text-golden font-medium bg-golden/5 px-3 py-2 rounded-full">
                    <Leaf className="w-4 h-4" />
                    Sustentabilidade
                  </div>
                </div>
              </div>
              
              <div className="fade-in-up">
                <div className="inline-flex items-center gap-2 text-golden mb-4">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Nossa Visão</span>
                </div>
                <h2 className="text-3xl font-playfair font-bold text-primary mb-6">
                  Referência Nacional em Qualidade
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Ser reconhecida nacionalmente como referência em qualidade, design e inovação no setor têxtil de artigos de cama, consolidando a marca Leyotex como símbolo de confiança, bem-estar e orgulho da produção brasileira.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm text-golden font-medium bg-golden/5 px-3 py-2 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    Qualidade
                  </div>
                  <div className="flex items-center gap-2 text-sm text-golden font-medium bg-golden/5 px-3 py-2 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    Inovação
                  </div>
                  <div className="flex items-center gap-2 text-sm text-golden font-medium bg-golden/5 px-3 py-2 rounded-full">
                    <Globe className="w-4 h-4" />
                    Nacional
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manifesto Section */}
        <section className="py-20 bg-gradient-to-br from-golden/5 via-background to-golden/5">
          <div className="max-w-5xl mx-auto px-4">
            <div className="relative bg-white rounded-2xl p-8 md:p-16 shadow-elegant border-2 border-golden/20 fade-in-up">
              <div className="absolute top-6 left-6 text-golden/20">
                <Quote className="w-16 h-16" />
              </div>
              <div className="absolute bottom-6 right-6 text-golden/20 rotate-180">
                <Quote className="w-16 h-16" />
              </div>
              
              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 bg-golden/10 text-golden px-4 py-2 rounded-full text-sm font-medium mb-8">
                  <Heart className="w-4 h-4 fill-current" />
                  Manifesto da Marca
                </div>
                
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-8 leading-relaxed">
                  Qualidade que Acolhe, Confiança que Permanece
                </h2>
                
                <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground space-y-6">
                  <p className="text-lg leading-relaxed">
                    Acreditamos que conforto é mais do que um detalhe, é parte essencial da vida. Por isso, nascemos com o propósito de transformar o descanso em experiência, e o lar em um espaço de bem-estar genuíno.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    Cada produto Leyotex é resultado de cuidado, dedicação e do compromisso com a qualidade brasileira. Valorizamos cada fio, cada costura e cada parceria.
                  </p>
                  
                  <p className="text-lg leading-relaxed font-medium text-primary">
                    Somos movidos pela vontade de inovar sem perder a essência, de crescer sem esquecer nossas raízes, e de produzir no Brasil o que o Brasil tem de melhor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Nossos Valores
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Princípios que guiam cada decisão e cada produto
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Ética e Transparência</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conduzir todas as relações com integridade e clareza, construindo confiança em cada interação.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Qualidade e Confiabilidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Garantir produtos que superem expectativas e gerem confiança duradoura em nossos parceiros.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Sustentabilidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Adotar práticas responsáveis que respeitem o meio ambiente e a comunidade onde atuamos.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Inovação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Buscar constantemente melhorias em processos, produtos e design para evoluir continuamente.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Valorização Humana</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Promover o desenvolvimento das pessoas e o engajamento genuíno de toda nossa equipe.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Orgulho Nacional</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Produzir no Brasil, com excelência, o que é destinado ao bem-estar das famílias brasileiras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Objectives Section */}
        <section className="py-20 bg-background-soft">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Objetivos Estratégicos
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Direcionamentos claros para consolidar nossa posição no mercado
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-soft border-l-4 border-golden fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-golden/10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Consolidação de Marca</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Posicionar a Leyotex como uma das principais referências do segmento têxtil brasileiro em artigos de cama.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-soft border-l-4 border-golden fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-golden/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Crescimento Sustentável</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Expandir a presença nacional por meio de parcerias com atacadistas, lojistas e redes varejistas, mantendo excelência operacional e sustentabilidade ambiental.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-soft border-l-4 border-golden fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-golden/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Inovação Contínua</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Investir em tecnologia, pesquisa de materiais e design para desenvolver produtos cada vez mais modernos e funcionais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-soft border-l-4 border-golden fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-golden/10 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Fortalecimento da Cadeia Produtiva Nacional</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Valorizar fornecedores e mão de obra brasileira, contribuindo para o desenvolvimento da economia local.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-soft border-l-4 border-golden fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-golden/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Excelência Operacional e de Relacionamento</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Garantir processos internos eficientes e relações transparentes com clientes, colaboradores e parceiros.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Story + Market Analysis Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Nossa História e Contexto
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transformando o mercado desde a fundação
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft fade-in-up">
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  Desde a sua fundação, a Leyotex nasceu com o propósito de transformar o mercado, produzindo no Brasil artigos de cama que aliam design moderno, sofisticação e confiabilidade. Essa essência se traduz no cuidado com cada detalhe, na escolha criteriosa da matéria-prima e no rigor dos processos produtivos, resultando em produtos que se destacam pela qualidade superior.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Seu modelo de negócio é voltado ao fornecimento de soluções para atacadistas, lojistas e redes varejistas em todo o território nacional. Mais do que oferecer produtos, a Leyotex constrói parcerias estratégicas, reforçando sua credibilidade ao entregar artigos que atendem às demandas do mercado e contribuem para a competitividade dos seus clientes.
                </p>

                <div className="my-8 p-6 bg-golden/5 rounded-xl border-l-4 border-golden">
                  <h3 className="text-2xl font-bold text-primary mb-4">Cenário Atual</h3>
                  <p className="text-lg leading-relaxed mb-4">
                    O setor têxtil brasileiro vive um momento de transformação, impulsionado pela digitalização do varejo, pela busca crescente por produtos sustentáveis e pela valorização da produção nacional. Com consumidores cada vez mais exigentes quanto à origem, durabilidade e design dos produtos, marcas que conciliam tradição com inovação e responsabilidade ambiental têm se destacado.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Nesse contexto, a Leyotex encontra uma oportunidade estratégica: fortalecer sua presença como uma marca nacional premium acessível, capaz de competir tanto pela qualidade quanto pelo valor percebido. Sua atuação voltada para atacadistas e redes varejistas permite escala e penetração de mercado, enquanto a aposta em design moderno e sustentabilidade reforça seu apelo junto ao novo perfil de consumidor consciente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Positioning & Value Proposition Section */}
        <section className="py-20 bg-background-soft">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-primary mb-4">
                  Posicionamento da Marca
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Leyotex é a marca que traduz conforto, confiança e qualidade com alma brasileira. Combinando tradição industrial e tecnologia moderna, a marca se posiciona como parceira estratégica do varejo nacional, oferecendo produtos que unem sofisticação e durabilidade, pensados para o dia a dia dos consumidores que valorizam o que é feito com cuidado, propósito e excelência.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-primary mb-4">
                  Proposta de Valor
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A Leyotex entrega soluções têxteis completas para o mercado de cama, aliando design contemporâneo, conforto superior e produção 100% nacional. Mais do que fornecer produtos, a empresa fortalece o ecossistema varejista com uma cadeia de valor sólida, baseada em confiança, inovação e parcerias duradouras que impulsionam o crescimento de todos os envolvidos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Ecosystem Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Ecossistema de Produtos
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Portfólio completo pensado para atender diferentes perfis de mercado
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-golden/5 to-golden/10 rounded-2xl p-8 md:p-12 fade-in-up mb-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-golden/20 text-golden px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  100% Produzido no Brasil
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto text-lg mb-4">
                O portfólio Leyotex é pensado para atender diferentes perfis de mercado e necessidades do consumidor final, mantendo coerência com a proposta de conforto e durabilidade.
              </p>
              
              <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto font-medium">
                Todos os produtos são desenvolvidos integralmente no Brasil, refletindo o compromisso da marca com a indústria nacional e o desenvolvimento sustentável.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Jogos de Cama</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Design atualizado, toque suave e alta durabilidade para noites de descanso perfeitas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Lençóis e Fronhas</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Foco em conforto, resistência e estética refinada que eleva qualquer ambiente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Colchas e Edredons</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Equilíbrio entre leveza, aconchego e sofisticação para todas as estações.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border border-golden/10 hover:shadow-elegant transition-all duration-300 fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Coberdroms</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Tecnologia e conforto térmico com acabamento de alto padrão para máximo conforto.
                    </p>
                  </div>
                </div>
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
              <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto text-lg mb-8">
                A comunicação interna ocupa papel central na cultura da empresa. Por meio de treinamentos, integração e incentivo ao engajamento, a Leyotex garante que sua equipe esteja alinhada aos objetivos estratégicos e aos valores institucionais. Essa união de esforços reflete diretamente na excelência que chega ao mercado e reafirma o compromisso da empresa em ser referência no setor têxtil brasileiro.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-8">
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

        {/* Institutional Conclusion Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-br from-golden/10 via-white to-golden/5 rounded-2xl p-8 md:p-16 shadow-elegant border-2 border-golden/20 fade-in-up">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-golden/20 text-golden px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4 fill-current" />
                  Nosso Compromisso
                </div>
                
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6">
                  Construindo um Legado de Qualidade
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
                  A Leyotex é mais do que uma empresa têxtil, é uma marca que representa o cuidado, a inovação e o orgulho da produção brasileira. Com um posicionamento sólido, valores éticos e visão de futuro, a Leyotex reafirma seu propósito de construir um legado de qualidade, confiança e bem-estar para o mercado e para as famílias brasileiras.
                </p>
                
                <Link 
                  to="/produtos"
                  className="inline-flex items-center gap-2 bg-golden text-white px-8 py-4 rounded-full font-medium hover:bg-golden/90 transition-colors duration-300"
                >
                  Conheça Nossos Produtos
                  <Sparkles className="w-5 h-5" />
                </Link>
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