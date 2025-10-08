import React, { useState } from 'react';
import { Mail, Check, Bell, Tag, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({ email: email.trim() });

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
        setEmail('');
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

  const benefits = [
    {
      icon: Bell,
      title: "Novidades em Primeira Mão",
      description: "Seja o primeiro a conhecer nossos lançamentos"
    },
    {
      icon: Tag,
      title: "Promoções Exclusivas", 
      description: "Descontos especiais só para assinantes"
    },
    {
      icon: Lightbulb,
      title: "Dicas de Decoração",
      description: "Conteúdo exclusivo para sua casa"
    }
  ];

  return (
    <section className="py-20 bg-gradient-newsletter">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-golden/20 rounded-full mb-6">
              <Mail className="w-8 h-8 text-golden" />
            </div>
            
            <h2 className="text-4xl font-bold text-primary mb-4 font-playfair">
              Fique Por Dentro das Novidades
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seja o primeiro a saber sobre novos produtos, promoções exclusivas e dicas
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="mb-12 fade-in-up" style={{ animationDelay: '200ms' }}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="w-full px-6 py-4 rounded-lg border border-accent focus:border-golden focus:ring-2 focus:ring-golden/20 outline-none transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribed || isSubmitting}
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                  isSubscribed
                    ? 'bg-success text-white cursor-not-allowed'
                    : 'btn-golden hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Cadastrando...</span>
                  </div>
                ) : isSubscribed ? (
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5" />
                    <span>Cadastrado!</span>
                  </div>
                ) : (
                  'Cadastrar'
                )}
              </button>
            </form>
            
            <p className="text-sm text-muted-foreground mt-4">
              Não enviamos spam. Seus dados estão seguros conosco.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-up justify-items-center" style={{ animationDelay: '400ms' }}>
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center group max-w-sm"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-golden/20 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-golden" />
                  </div>
                  <h3 className="font-bold text-primary mb-2 group-hover:text-golden transition-colors duration-200">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;