import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export const CartSheet: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems, isCartOpen, setIsCartOpen } = useCart();
  const { toast } = useToast();

  const handleFinalizarPedido = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar o pedido.",
        variant: "destructive",
      });
      return;
    }

    // Formatar mensagem para WhatsApp
    let message = "Olá, gostaria de finalizar meu pedido:\n\n📦 *Itens do Pedido:*\n\n";
    
    items.forEach((item, index) => {
      const emoji = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][index] || '📌';
      message += `${emoji} ${item.name} (${item.category})\n`;
      message += `   • Quantidade: ${item.quantity} unidade${item.quantity > 1 ? 's' : ''}\n`;
      if (item.collection) {
        message += `   • Coleção: ${item.collection}\n`;
      }
      message += `\n`;
    });

    message += `💰 *Total de itens: ${getTotalItems()}*`;

    const whatsappUrl = `https://wa.me/5511996506590?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Limpar carrinho e fechar sheet
    clearCart();
    setIsCartOpen(false);
    
    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado via WhatsApp.",
    });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:w-[400px] md:w-[450px] flex flex-col p-0">
        <SheetHeader className="px-4 md:px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-golden" />
            Meu Carrinho
            {items.length > 0 && (
              <span className="ml-auto text-sm text-muted-foreground">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-4 md:px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-2">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground">
                Adicione produtos para começar seu pedido
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 border rounded-lg bg-card hover:border-golden/50 transition-colors"
                >
                  {/* Image */}
                  <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item.category}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast({
                            title: "Produto removido",
                            description: "O produto foi removido do carrinho.",
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <SheetFooter className="px-4 md:px-6 py-4 border-t mt-auto">
            <div className="w-full space-y-3">
              <Button
                onClick={handleFinalizarPedido}
                className="w-full bg-golden hover:bg-golden-dark text-white"
                size="lg"
              >
                Finalizar Pedido
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsCartOpen(false)}
                className="w-full"
              >
                Continuar Comprando
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
