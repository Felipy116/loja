import React, { useState } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, Truck, CreditCard, Sparkles, Check, Copy } from "lucide-react";
import { CartItem, Coupon } from "../types";
import { COUPONS } from "../data";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartModalProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"review" | "success">("review");
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Check if eligible for free shipping
  const freeShippingThreshold = 199;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const deliveryCost = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 19.90;
  const remainderToFreeShipping = freeShippingThreshold - subtotal;

  // Apply coupon discount
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minPurchase) {
    couponDiscount = (subtotal * appliedCoupon.discountPercent) / 100;
  }

  const finalTotal = Math.max(0, subtotal + deliveryCost - couponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const code = couponCode.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === code);

    if (!found) {
      setCouponError("Cupom inválido ou expirado.");
      setAppliedCoupon(null);
      return;
    }

    if (subtotal < found.minPurchase) {
      setCouponError(`Compra mínima para este cupom é R$ ${found.minPurchase.toLocaleString("pt-BR")}`);
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(found);
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
    setCheckoutStep("review");
  };

  const handleFinishCheckout = () => {
    setCheckoutStep("success");
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136novaripay-9ad1f812-a0c7-4297-85a9-f520400005303986540410.005802BR5915NovariStoreSA6009SaoPaulo62070503nov");
    setCopiedPix(true);
    setTimeout(() => {
      setCopiedPix(false);
    }, 3000);
  };

  const handleCloseAndReset = () => {
    onClearCart();
    setIsCheckingOut(false);
    setCheckoutStep("review");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-[#0c131f]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full" id="cart-drawer">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#0F1C30] text-white flex items-center justify-between border-b border-gray-800">
            <h2 className="text-lg font-display font-extrabold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span>Meu Carrinho</span>
              <span className="text-xs bg-slate-800 text-amber-400 font-extrabold px-2 py-0.5 rounded-full ring-1 ring-slate-700">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {isCheckingOut && checkoutStep === "success" ? (
            <div className="flex-1 overflow-y-auto p-6 text-center flex flex-col justify-center items-center space-y-6" id="checkout-success-view">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-slate-900 tracking-tight">Pedido Recebido!</h3>
                <p className="text-slate-500 text-xs mt-1">Código do pedido: <strong className="text-slate-800">#NOV-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full text-left space-y-3">
                <p className="text-xs text-slate-500 font-medium">Seu pagamento está pendente via PIX. Pague agora para acelerar a postagem:</p>
                
                {/* Simulated PIX QR Code representation */}
                <div className="flex justify-center py-2">
                  <div className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col items-center">
                    {/* Generates a nice visual representation using styled divs */}
                    <div className="grid grid-cols-5 gap-1.5 w-24 h-24 bg-gray-55 shadow-xs">
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                      <div className="bg-slate-900 rounded-xs"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">QR Code de Teste</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
                  <p className="text-[11px] font-mono font-medium text-slate-600 line-clamp-1 flex-1 mr-2">
                    00020126580014br.gov.bcb.pix0136novaripay-9ad...
                  </p>
                  <button
                    onClick={handleCopyPix}
                    className="bg-[#0F1C30] hover:bg-slate-800 text-white font-bold text-[10px] py-1.5 px-3 rounded-md flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-bold">Valor Total a Pagar:</span>
                    <span className="text-slate-900 font-black text-sm">R$ {finalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-medium space-y-1">
                <p>✓ Um e-mail de confirmação foi enviado para o seu endereço.</p>
                <p>✓ Envio estimado de frete em até 2 dias após aprovação.</p>
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full bg-amber-400 text-[#0F1C30] hover:bg-amber-500 font-bold py-3 px-4 rounded-lg text-sm transition-all shadow-md select-none cursor-pointer"
              >
                Voltar para a Loja
              </button>
            </div>
          ) : isCheckingOut && checkoutStep === "review" ? (
            /* Checkout Detail View */
            <div className="flex-1 overflow-y-auto p-6 space-y-6" id="checkout-review-view">
              <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">Informações de Envio</h3>
              
              <div className="space-y-4 text-xs font-semibold">
                <div className="grid grid-cols-1 gap-2.5">
                  <div>
                    <label className="text-slate-500 block mb-1">Nome Completo</label>
                    <input type="text" defaultValue="Felipe de Aguiar" className="w-full border border-gray-300 rounded-lg p-2 bg-gray-55" readOnly />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">E-mail para Notificações</label>
                    <input type="email" defaultValue="felipe@gmail.com" className="w-full border border-gray-300 rounded-lg p-2 bg-gray-55" readOnly />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Endereço de Entrega</label>
                    <textarea rows={2} className="w-full border border-gray-300 rounded-lg p-2 bg-gray-55 resize-none" readOnly defaultValue="Avenida Paulista, 1000, Apto 42B. Bela Vista - São Paulo / SP" />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2">
                <h4 className="font-display font-bold text-xs text-[#0F1C30] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  Forma de Pagamento
                </h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Para esta demonstração, o checkout gerará uma chave de pagamento **Pix ativa simulada**. É o meio mais rápido de compensação de saldos no e-commerce nacional.
                </p>
              </div>

              <div className="border-t border-slate-150 pt-5 space-y-3">
                <h4 className="font-display font-bold text-xs text-slate-900">Resumo Final</h4>
                <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-slate-900">R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Cupom ({appliedCoupon.code}):</span>
                      <span>- R$ {couponDiscount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Taxa de Entrega:</span>
                    <span className="text-slate-900">{deliveryCost === 0 ? "Gratuito" : `R$ ${deliveryCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}</span>
                  </div>
                  <hr className="border-slate-100 my-2" />
                  <div className="flex justify-between text-sm font-black text-slate-900">
                    <span>Total final:</span>
                    <span>R$ {finalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 bg-white hover:bg-slate-50 font-bold text-xs py-3 border border-slate-300 rounded-lg text-slate-700 transition"
                >
                  Voltar
                </button>
                <button
                  onClick={handleFinishCheckout}
                  className="flex-2 bg-[#0F1C30] hover:bg-slate-800 text-amber-400 font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition select-none"
                >
                  <Sparkles className="w-4 h-4 fill-amber-400 animate-pulse" />
                  Gerar QR Code Pix
                </button>
              </div>
            </div>
          ) : (
            /* Items List drawer view */
            <>
              {/* Product list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4" id="cart-drawer-items">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4" id="empty-cart-state">
                    <div className="bg-slate-100 p-4 rounded-full text-slate-400">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-slate-800">Seu carrinho está vazio</p>
                      <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto">Navegue pelas ofertas do dia e adicione itens para começar.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Frete Grátis Progress Hook */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs" id="shipping-tracker">
                      <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-800">
                        <Truck className="w-4 h-4 text-[#F3C242]" />
                        {isFreeShipping ? (
                          <span className="text-emerald-700">Parabéns! Você ganhou <strong className="uppercase">Frete Grátis</strong> 🚚</span>
                        ) : (
                          <span>Faltam apenas <strong className="text-slate-900">R$ {remainderToFreeShipping.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong> para ganhar <strong className="uppercase">Frete Grátis</strong></span>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isFreeShipping ? "bg-emerald-500" : "bg-amber-400"}`}
                          style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Array list */}
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex gap-3 border-b border-gray-100 pb-4 last:border-0" id={`cart-item-${item.product.id}`}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-md object-cover bg-gray-50 border border-gray-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-slate-900 truncate">{item.product.title}</p>
                          <p className="text-[10px] text-gray-500 font-medium">Marca: {item.product.brand}</p>
                          <div className="flex justify-between items-center mt-2.5">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-150 rounded-l-md text-gray-500"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-black text-slate-850">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-150 rounded-r-md text-gray-500"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-black text-slate-900">
                                R$ {(item.product.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </span>
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-red-500 hover:text-red-700 p-1 rounded-sm"
                                aria-label="Remover item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Checkout Calculation Area */}
              {cartItems.length > 0 && (
                <div className="bg-slate-50 border-t border-gray-100 p-6 space-y-4" id="cart-drawer-summary">
                  
                  {/* Coupon section widget */}
                  {appliedCoupon ? (
                    <div className="bg-emerald-50 border border-emerald-150 rounded-lg p-2.5 flex justify-between items-center text-xs text-emerald-800 font-semibold mb-2">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        <span>Cupom <strong className="text-emerald-950 font-black">{appliedCoupon.code}</strong> ativo ({appliedCoupon.discountPercent}% desc)</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-500 hover:text-red-700 font-bold ml-2 underline text-[11px]"
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="CUPOM (Ex: BEMVINDO5)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-bold uppercase focus:outline-hidden focus:ring-2 focus:ring-accent-gold placeholder:text-gray-400"
                      />
                      <button
                        type="submit"
                        className="bg-primary-blue hover:opacity-95 text-accent-gold font-extrabold text-xs px-4 py-1.5 rounded-lg select-none cursor-pointer transition-colors"
                      >
                        Aplicar
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-[10px] text-red-650 font-semibold">{couponError}</p>}

                  {/* Pricing lines breakdown */}
                  <div className="space-y-1.5 text-xs font-medium text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal de produtos:</span>
                      <span className="text-slate-900 font-bold">R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Desconto de Cupom:</span>
                        <span>- R$ {couponDiscount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Valor de Entrega (CEP simulado):</span>
                      <span className="text-slate-900 font-bold">{deliveryCost === 0 ? "Gratis" : `R$ ${deliveryCost.toLocaleString("pt-BR")}`}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-2 pt-2.5 flex justify-between items-end text-slate-900">
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Valor Final</p>
                        <p className="text-[10px] text-primary-blue font-bold">Ou até 10x de R$ {(finalTotal / 10).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} sem juros</p>
                      </div>
                      <span className="font-display font-black text-xl text-slate-950">R$ {finalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleStartCheckout}
                    className="w-full bg-accent-gold text-primary-blue hover:bg-[#ebd039] font-bold py-3 px-4 rounded-lg text-sm transition-all shadow-md select-none flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Ir para o Passaporte / Pagamento</span>
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
