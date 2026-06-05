import React, { useState } from "react";
import { Star, Truck, ShoppingCart, Eye, Sparkles } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedTemp, setAddedTemp] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedTemp(true);
    setTimeout(() => {
      setAddedTemp(false);
    }, 2000);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border border-gray-100 rounded-xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer relative group"
      id={`product-card-${product.id}`}
    >
      {/* 1. Custom badge anchors (Best Seller, Lightning, Discount) */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.discount > 0 && (
          <span className="bg-red-500 text-white font-black text-[10px] uppercase px-2.5 py-0.5 rounded-md tracking-wider shadow-sm">
            {product.discount}% OFF
          </span>
        )}
        {product.isLightning && (
          <span className="bg-accent-gold text-primary-blue font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-md tracking-wider shadow-sm flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 fill-primary-blue text-primary-blue" />
            Oferta do Dia
          </span>
        )}
        {product.isBestSeller && !product.isLightning && (
          <span className="bg-emerald-600 text-white font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-md tracking-wider shadow-sm">
            Mais Vendido
          </span>
        )}
      </div>

      {/* 2. Main Product Image with Zoom Hover */}
      <div className="aspect-square w-full bg-gray-50 rounded-t-xl overflow-hidden relative flex items-center justify-center p-4 shrink-0">
        <img
          src={product.images[0]}
          alt={product.title}
          className={`w-full h-full object-cover rounded-lg transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Action Overlays */}
        <div
          className={`absolute inset-0 bg-[#0c131f]/10 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="bg-white p-2.5 rounded-full shadow-md text-slate-800 hover:text-amber-500 hover:scale-110 transition-transform">
            <Eye className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* 3. Details Content Area */}
      <div className="p-4 flex flex-col flex-1" id={`card-details-${product.id}`}>
        {/* Brand and Delivery Flag */}
        <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold uppercase tracking-wider text-gray-400">
          <span>{product.brand}</span>
          {product.shipping.free && (
            <span className="text-emerald-600 flex items-center gap-0.5 font-black text-[10px] capitalize">
              <Truck className="w-3.5 h-3.5" />
              Frete grátis
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-sm text-slate-850 line-clamp-2 leading-snug group-hover:text-primary-blue transition-colors flex-1 mb-2">
          {product.title}
        </h3>

        {/* Star evaluation segment */}
        <div className="flex items-center gap-1.5 mb-3.5">
          <div className="flex items-center text-accent-gold">
            <Star className="w-3.5 h-3.5 fill-accent-gold" />
            <span className="text-xs font-bold text-slate-800 ml-1">{product.rating}</span>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold">({product.ratingCount} avaliações)</span>
        </div>

        {/* Pricing tag stack */}
        <div className="space-y-0.5 border-t border-gray-50 pt-3">
          {product.originalPrice > product.price && (
            <p className="text-[11px] text-gray-400 font-bold line-through">
              R$ {product.originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          )}

          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-black text-primary-blue leading-none">
              R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            {product.discount > 0 && (
              <span className="text-[10px] font-black text-rose-500">
                Limpando estoque
              </span>
            )}
          </div>

          {/* Golden installment breakdown line */}
          <p className="text-xs text-amber-700 font-semibold tracking-tight">
            ou {product.installments.count}x de R${" "}
            {product.installments.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}{" "}
            {!product.installments.interest && "sem juros"}
          </p>
        </div>
      </div>

      {/* 4. Interactive Quick Add Button Footer */}
      <div className="px-4 pb-4 select-none">
        <button
          onClick={handleQuickAdd}
          className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
            addedTemp
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 hover:bg-accent-gold hover:text-primary-blue text-primary-blue"
          }`}
        >
          {addedTemp ? (
            <>
              <Star className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Adicionado!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Adicionar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
