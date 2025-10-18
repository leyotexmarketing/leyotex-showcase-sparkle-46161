import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin, Clock, Database, Cookie, UserCheck, RefreshCw } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    // SEO
    document.title = "Política de Privacidade - Leyotex | Proteção de Dados e LGPD";
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Política de Privacidade da Leyotex. Saiba como protegemos seus dados pessoais em conformidade com a LGPD. Transparência e segurança no tratamento de informações.');
    if (!document.head.contains(metaDescription)) {
      document.head.appendChild(metaDescription);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add fade-in animation
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
              <Shield className="w-4 h-4" />
              Proteção de Dados
              <Shield className="w-4 h-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-6 fade-in-up">
              Política de <span className="text-golden">Privacidade</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed fade-in-up">
              Transparência e segurança no tratamento das suas informações
            </p>
            <p className="text-sm text-muted-foreground mt-4 fade-in-up">
              Última atualização: Janeiro de 2025
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-golden" />
                </div>
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Introdução</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    A <strong className="text-primary">Leyotex</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº <strong>49.289.865/0001-09</strong>, está comprometida com a proteção da privacidade e dos dados pessoais de seus clientes, parceiros e visitantes do site.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) e demais normas aplicáveis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dados Coletados */}
        <section className="py-16 bg-background-soft">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-golden" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Dados Coletados</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Coletamos as seguintes informações quando você interage conosco:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-golden pl-4">
                      <h3 className="font-semibold text-primary mb-2">Formulário de Contato B2B</h3>
                      <ul className="text-muted-foreground space-y-1 text-sm">
                        <li>• Nome da empresa e CNPJ</li>
                        <li>• Nome do contato responsável</li>
                        <li>• Email corporativo</li>
                        <li>• Telefone</li>
                        <li>• Tipo de negócio</li>
                        <li>• Volume mensal estimado</li>
                        <li>• Mensagem e necessidades específicas</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-golden pl-4">
                      <h3 className="font-semibold text-primary mb-2">Newsletter</h3>
                      <ul className="text-muted-foreground space-y-1 text-sm">
                        <li>• Endereço de email</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-golden pl-4">
                      <h3 className="font-semibold text-primary mb-2">Dados de Navegação</h3>
                      <ul className="text-muted-foreground space-y-1 text-sm">
                        <li>• Endereço IP</li>
                        <li>• Tipo de navegador</li>
                        <li>• Páginas visitadas</li>
                        <li>• Duração da visita</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Uso dos Dados */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-golden" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Uso dos Dados</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Utilizamos suas informações para as seguintes finalidades:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Gestão de Parcerias B2B:</strong> Análise de solicitações, estabelecimento de relações comerciais e comunicação sobre oportunidades de negócio.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Newsletter:</strong> Envio de novidades, promoções, lançamentos e conteúdos relevantes sobre nossos produtos.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Atendimento ao Cliente:</strong> Resposta a dúvidas, solicitações e suporte comercial.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Melhoria do Site:</strong> Análise de navegação para aprimorar a experiência do usuário e otimizar funcionalidades.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Cumprimento de Obrigações Legais:</strong> Atendimento a requisitos fiscais, tributários e regulatórios.</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-golden/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-primary">Base Legal:</strong> O tratamento de dados é realizado com base em (i) legítimo interesse para gestão de parcerias comerciais B2B e (ii) consentimento expresso para envio de newsletter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compartilhamento */}
        <section className="py-16 bg-background-soft">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-golden" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Compartilhamento de Dados</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A Leyotex não vende, aluga ou comercializa seus dados pessoais. Podemos compartilhar informações apenas nas seguintes situações:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Fornecedores de Serviços:</strong> Empresas que prestam serviços essenciais (hospedagem, infraestrutura de TI, análise de dados) sob rigorosos acordos de confidencialidade.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Obrigações Legais:</strong> Quando exigido por lei ou ordem judicial.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Proteção de Direitos:</strong> Para proteger nossos direitos, segurança ou propriedade, assim como de nossos clientes e parceiros.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Segurança */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-golden" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Segurança dos Dados</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Implementamos medidas técnicas e administrativas de segurança para proteger seus dados contra acesso não autorizado, perda, alteração ou divulgação:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-golden/5 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Criptografia SSL/TLS</h4>
                      <p className="text-sm text-muted-foreground">Todas as comunicações são protegidas por certificados de segurança.</p>
                    </div>
                    <div className="p-4 bg-golden/5 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Infraestrutura Supabase</h4>
                      <p className="text-sm text-muted-foreground">Armazenamento seguro com backup automático e alta disponibilidade.</p>
                    </div>
                    <div className="p-4 bg-golden/5 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Controle de Acesso</h4>
                      <p className="text-sm text-muted-foreground">Acesso restrito aos dados apenas por colaboradores autorizados.</p>
                    </div>
                    <div className="p-4 bg-golden/5 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Monitoramento</h4>
                      <p className="text-sm text-muted-foreground">Auditoria contínua de sistemas para detectar atividades suspeitas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section className="py-16 bg-background-soft">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-golden" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Uso de Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Nosso site utiliza cookies para melhorar sua experiência de navegação. Cookies são pequenos arquivos de texto armazenados em seu dispositivo.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-golden pl-4">
                      <h3 className="font-semibold text-primary mb-2">Cookies Essenciais</h3>
                      <p className="text-sm text-muted-foreground">Necessários para o funcionamento básico do site (navegação, carrinho de compras).</p>
                    </div>
                    <div className="border-l-4 border-golden pl-4">
                      <h3 className="font-semibold text-primary mb-2">Cookies de Desempenho</h3>
                      <p className="text-sm text-muted-foreground">Coletam informações sobre como os visitantes usam o site para melhorar o desempenho.</p>
                    </div>
                    <div className="border-l-4 border-golden pl-4">
                      <h3 className="font-semibold text-primary mb-2">Cookies de Funcionalidade</h3>
                      <p className="text-sm text-muted-foreground">Permitem personalizar sua experiência (idioma, preferências).</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-6">
                    Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Direitos do Titular */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-golden" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Seus Direitos (LGPD)</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    De acordo com a LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Confirmação e Acesso:</strong> Saber se processamos seus dados e acessá-los.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Anonimização ou Exclusão:</strong> Solicitar a anonimização ou exclusão de dados desnecessários ou tratados em desconformidade.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Portabilidade:</strong> Solicitar a transferência de dados a outro fornecedor (quando aplicável).</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Revogação do Consentimento:</strong> Retirar o consentimento para newsletter a qualquer momento.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Oposição:</strong> Opor-se a tratamentos realizados sem consentimento.</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-golden/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Para exercer qualquer um desses direitos, entre em contato através dos canais indicados abaixo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Retenção de Dados */}
        <section className="py-16 bg-background-soft">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-golden" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Retenção de Dados</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Solicitações B2B:</strong> Mantidos enquanto durar a relação comercial e por até 5 anos após o término, para fins legais e contratuais.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Newsletter:</strong> Até que você solicite o descadastramento ou a exclusão dos dados.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-golden rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-primary">Dados de Navegação:</strong> Por até 12 meses para análise estatística.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-golden/10 to-golden/5 rounded-xl p-8 shadow-soft fade-in-up border-2 border-golden/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-playfair font-bold text-primary mb-4">Entre em Contato</h2>
                <p className="text-muted-foreground">
                  Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos sobre dados pessoais:
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-golden" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Email</h3>
                  <a href="mailto:leyotex.marketing@gmail.com" className="text-sm text-muted-foreground hover:text-golden transition-colors">
                    leyotex.marketing@gmail.com
                  </a>
                </div>

                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-golden" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Telefone</h3>
                  <p className="text-sm text-muted-foreground">(11) 96064-5095</p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-golden" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">CNPJ</h3>
                  <p className="text-sm text-muted-foreground">49.289.865/0001-09</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atualizações */}
        <section className="py-16 bg-background-soft">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-soft fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-golden" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-playfair font-bold text-primary mb-4">Atualizações da Política</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou na legislação aplicável.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Recomendamos que você revise esta página regularmente. Alterações significativas serão comunicadas através do nosso site ou por email, quando aplicável.
                  </p>
                  <div className="mt-6 p-4 bg-golden/5 rounded-lg">
                    <p className="text-sm text-primary font-medium">
                      Data da última atualização: <strong>Janeiro de 2025</strong>
                    </p>
                  </div>
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

export default PrivacyPolicy;
