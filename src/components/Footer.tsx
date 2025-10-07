import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      toast({
        title: "Obrigado!",
        description: "Você foi inscrito na nossa newsletter.",
      });
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const footerLinks = {
    institucional: [
      { name: "Sobre a Leyotex", href: "#" },
      { name: "Nossa História", href: "#" },
      { name: "Trabalhe Conosco", href: "#" },
      { name: "Responsabilidade Social", href: "#" },
      { name: "Política de Privacidade", href: "#" }
    ],
    atendimento: [
      { name: "Central de Ajuda", href: "#" },
      { name: "Fale Conosco", href: "#" },
      { name: "Trocas e Devoluções", href: "#" },
      { name: "Rastreamento", href: "#" },
      { name: "Garantias", href: "#" }
    ],
    categorias: [
      { name: "Cama", href: "#" },
      { name: "Banho", href: "#" },
      { name: "Mesa", href: "#" },
      { name: "Decoração", href: "#" },
      { name: "Baby & Kids", href: "#" }
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
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: link.name,
                        description: "Link em desenvolvimento",
                      });
                    }}
                    className="text-gray-300 hover:text-golden transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
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
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: link.name,
                        description: "Link em desenvolvimento",
                      });
                    }}
                    className="text-gray-300 hover:text-golden transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
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
                disabled={isSubscribed}
                className={`w-full px-4 py-2 rounded font-medium transition-all duration-200 ${
                  isSubscribed
                    ? 'bg-success text-white cursor-not-allowed'
                    : 'bg-golden hover:bg-golden-dark text-white hover:scale-105'
                }`}
              >
                {isSubscribed ? 'Obrigado!' : 'Cadastrar'}
              </button>
            </form>

            {/* Categories Links */}
            <div className="mt-8">
              <h4 className="font-medium text-white mb-3">Categorias</h4>
              <div className="grid grid-cols-2 gap-2">
                {footerLinks.categorias.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: link.name,
                        description: "Categoria em desenvolvimento",
                      });
                    }}
                    className="text-gray-400 hover:text-golden transition-colors duration-200 text-xs"
                  >
                    {link.name}
                  </a>
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