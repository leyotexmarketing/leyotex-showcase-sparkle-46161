import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({ email: newsletterEmail.trim() });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Email já cadastrado",
            description: "Este email já está na nossa lista de newsletter.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        setNewsletterEmail('');
        toast({
          title: "Cadastrado com sucesso!",
          description: "Você receberá nossas novidades em breve.",
        });
        
        setTimeout(() => {
          setIsSubscribed(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      toast({
        title: "Erro ao cadastrar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    institucional: [
      { name: "Sobre a Leyotex", href: "/sobre" },
      { name: "Responsabilidade Social", href: "/sobre" },
      { name: "Política de Privacidade", href: "#" }
    ],
    atendimento: [
      { name: "Central de Ajuda", href: "#" },
      { name: "Fale Conosco", href: "/contato" },
      { name: "Trocas e Devoluções", href: "#" },
      { name: "Garantias", href: "#" }
    ],
    categorias: [
      { name: "Colchas", href: "/produtos#colchas" },
      { name: "Edredons", href: "/produtos#edredons" },
      { name: "Jogos de Cama", href: "/produtos#jogos-de-cama" },
      { name: "Coberdroms", href: "/produtos#coberdroms" },
      { name: "Travesseiros", href: "/produtos#travesseiros" }
    ]
  };

  const paymentMethods = [
    "Visa", "Mastercard", "Elo", "American Express", "PIX", "Boleto"
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-golden mb-2">Leyotex</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Há mais de 29 anos oferecendo produtos de qualidade premium para transformar sua casa em um lar aconchegante e elegante.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <p className="text-sm font-medium mb-3">Nos siga nas redes sociais</p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-golden transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: `${social.name} clicado`,
                          description: "Link em desenvolvimento",
                        });
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Institutional Links */}
          <div>
            <h3 className="font-bold text-golden mb-6">Institucional</h3>
            <ul className="space-y-3">
              {footerLinks.institucional.map((link) => (
                <li key={link.name}>
                  {link.href === "#" ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: link.name,
                          description: "Em breve disponível",
                        });
                      }}
                      className="text-gray-300 hover:text-golden transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-golden transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-golden mb-6">Atendimento</h3>
            <ul className="space-y-3">
              {footerLinks.atendimento.map((link) => (
                <li key={link.name}>
                  {link.href === "#" ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: link.name,
                          description: "Em breve disponível",
                        });
                      }}
                      className="text-gray-300 hover:text-golden transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-golden transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-golden mb-6">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Receba novidades e promoções exclusivas
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 rounded bg-secondary border border-gray-600 text-white placeholder-gray-400 focus:border-golden focus:outline-none transition-colors duration-200"
                required
              />
              <button
                type="submit"
                disabled={isSubscribed || isSubmitting}
                className={`w-full px-4 py-2 rounded font-medium transition-all duration-200 ${
                  isSubscribed
                    ? 'bg-success text-white cursor-not-allowed'
                    : 'bg-golden hover:bg-golden-dark text-white hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Cadastrando...' : isSubscribed ? 'Obrigado!' : 'Cadastrar'}
              </button>
            </form>

            {/* Categories Links */}
            <div className="mt-8">
              <h4 className="font-medium text-white mb-3">Categorias</h4>
              <div className="grid grid-cols-2 gap-2">
                {footerLinks.categorias.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-400 hover:text-golden transition-colors duration-200 text-xs"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-secondary pt-8 mb-8">
          <h4 className="font-medium text-white mb-4">Formas de Pagamento</h4>
          <div className="flex flex-wrap gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="bg-white text-primary px-3 py-1 rounded text-sm font-medium"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Leyotex. Todos os direitos reservados. | CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;