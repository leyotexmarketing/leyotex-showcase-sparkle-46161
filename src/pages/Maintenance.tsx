import { Wrench } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center space-y-6 px-4">
        <div className="flex justify-center">
          <div className="relative">
            <Wrench className="w-24 h-24 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-ping" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
            Plataforma em Manutenção
          </h1>
          <p className="text-xl text-muted-foreground">
            Falar com Desenvolvedor
          </p>
        </div>

        <div className="pt-8 space-y-2">
          <p className="text-sm text-muted-foreground">
            Entre em contato:
          </p>
          <a 
            href="mailto:arkkhecorp@gmail.com" 
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            arkkhecorp@gmail.com
          </a>
          <p className="text-muted-foreground">
            (11) 99482-9276
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
