import React, { useState } from "react";
import { Star, Truck, ShoppingCart, ArrowLeft, ShieldCheck, RefreshCw, Sparkles, MapPin, Check, ChevronRight } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import ProductCard from "./ProductCard";

interface ProductPageProps {
  product: Product;
  onGoBack: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onInstantBuy: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductPage({
  product,
  onGoBack,
  onAddToCart,
  onInstantBuy,
  onSelectProduct,
}: ProductPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [cep, setCep] = useState("");
  const [cepResult, setCepResult] = useState<any>(null);
  const [addedMessage, setAddedMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Filter related products in the same category (excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const rawSavingsPercent = product.originalPrice - product.price;

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, "").length >= 8) {
      // Simulate real postal response
      setCepResult({
        sedex: { cost: 15.90, days: 1, label: "Expresso Sedex" },
        normal: { cost: 0, days: 2, label: "Entrega Padrão Novari" },
      });
    } else {
      alert("Por favor, digite um CEP válido com 8 dígitos.");
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="product-detail-view">
      {/* 1. Navigation Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
        <button
          onClick={onGoBack}
          className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer text-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="cursor-pointer hover:underline" onClick={onGoBack}>Início</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-400 capitalize">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-400 truncate max-w-[120px] sm:max-w-xs">{product.title}</span>
      </div>

      {/* 2. Main Two-Column Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-white rounded-2xl border border-gray-100 p-4 md:p-8 shadow-xs mb-12">
        
        {/* Left Column: Extensive Gallery Selection */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100 flex items-center justify-center p-6" id="detail-active-image">
            <img
              src={product.images[activeImageIndex]}
              alt={`${product.title} - Visualização`}
              className="w-full h-full object-contain rounded-lg transition-all"
              referrerPolicy="no-referrer"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white font-black text-xs px-3 py-1 rounded-md tracking-wider">
                {product.discount}% DE ECONOMIA
              </span>
            )}
          </div>

          {/* Gallery Thumbnails List */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2.5" id="detail-thumbnails">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square bg-white border rounded-lg overflow-hidden p-1.5 transition-all cursor-pointer ${
                    activeImageIndex === idx ? "border-primary-blue ring-2 ring-accent-gold" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} thumb`}
                    className="w-full h-full object-cover rounded-md"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Highlight badges for trust */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs text-slate-700 font-semibold">
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-bold text-slate-850">Compra Protegida</p>
                <p className="text-[10px] text-gray-500 font-medium">Garantia total de fábrica</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-bold text-slate-850">Devolução Grátis</p>
                <p className="text-[10px] text-gray-500 font-medium">De acordo com o CDC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Buying layout */}
        <div className="lg:col-span-6 flex flex-col h-full space-y-6" id="detail-buying-block">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              <span>{product.brand}</span>
              <span>•</span>
              <span className="text-slate-700 font-medium capitalize">Ref: {product.id}</span>
            </div>

            <h1 className="font-display font-black text-2xl md:text-3xl text-slate-900 tracking-tight leading-tight mb-2">
              {product.title}
            </h1>

            {/* Quality details / stars */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
              <div className="flex items-center text-accent-gold font-bold bg-amber-50 border border-amber-100 py-1 px-2.5 rounded-full">
                <Star className="w-4 h-4 fill-accent-gold mr-1" />
                <span>{product.rating}</span>
              </div>
              <span className="text-gray-400 font-bold">|</span>
              <span className="text-slate-600 font-bold underline cursor-pointer" onClick={() => setActiveTab("reviews")}>
                {product.ratingCount} Avaliações de clientes verificadas
              </span>
              <span className="text-gray-300 font-bold">|</span>
              <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-[11px]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Estoque disponível</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-650 leading-relaxed font-medium">
            {product.tagline}
          </p>

          <hr className="border-gray-100" />

          {/* Pricing cards */}
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                {product.originalPrice > product.price && (
                  <p className="text-xs text-gray-400 font-bold line-through">
                    R$ {product.originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                )}
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-display text-3xl font-black text-primary-blue">
                    R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-xs font-black text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md">
                      Economia de R$ {rawSavingsPercent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} ({product.discount}% OFF)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 font-bold">
              ou em <span className="text-amber-700 font-extrabold">{product.installments.count}x</span> de{" "}
              <span className="text-slate-900 font-black">
                R$ {product.installments.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>{" "}
              {!product.installments.interest && "sem juros no cartão"}
            </p>

            <div className="flex items-center gap-2.5 bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-lg text-xs font-bold text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-100 animate-pulse" />
              <span>Receba mais 5% de desconto pagando via Pix! Final brasileiro imediato.</span>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">Quantidade:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-l-lg transition font-bold"
              >
                -
              </button>
              <span className="px-4 py-1 text-sm font-black text-slate-800">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-r-lg transition font-bold"
              >
                +
              </button>
            </div>
            <span className="text-[11px] text-gray-500">({product.stock} unidades em estoque)</span>
          </div>

          {/* Transactional buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onInstantBuy(product)}
              className="flex-1 bg-accent-gold hover:bg-[#ebd039] text-primary-blue font-black py-3.5 px-6 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Comprar Agora</span>
            </button>
            <button
              onClick={handleAddToCartClick}
              className="flex-1 bg-primary-blue hover:opacity-95 text-white font-black py-3.5 px-6 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <ShoppingCart className="w-4 h-4 text-accent-gold" />
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>

          {addedMessage && (
            <div className="bg-emerald-50 border border-emerald-150 p-2.5 rounded-lg text-center text-xs font-semibold text-emerald-700 animate-pulse">
              Adicionado {quantity}x com sucesso! Seu carrinho no topo foi atualizado.
            </div>
          )}

          {/* Delivery simulation widget */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-850 flex items-center gap-1.5 uppercase tracking-wide">
              <MapPin className="w-4 h-4 text-accent-gold" />
              Calcular Frete e Prazo
            </h4>
            <form onSubmit={handleCalculateShipping} className="flex gap-2">
              <input
                type="text"
                maxLength={9}
                placeholder="Ex: 01001-000"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 tracking-wider"
              />
              <button
                type="submit"
                className="bg-primary-blue hover:opacity-90 text-white font-bold text-xs px-4 py-1.5 rounded-lg transition shrink-0 cursor-pointer"
              >
                Calcular
              </button>
            </form>

            {cepResult && (
              <div className="bg-white border border-gray-100 rounded-lg p-2.5 space-y-2 text-xs font-semibold">
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-slate-800 flex items-center gap-1">🚚 {cepResult.normal.label} (Padrão)</span>
                  <span className="text-emerald-700 font-extrabold">GRÁTIS (Chega em {cepResult.normal.days} a 2 dias)</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 border-t border-gray-55 pt-2">
                  <span className="text-slate-800 flex items-center gap-1">🚀 {cepResult.sedex.label} (Expresso)</span>
                  <span className="text-slate-900 font-black">R$ 15,90 (Chega amanhã útil!)</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 3. Detailed tabs sections */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden mb-12">
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-4.5 text-xs font-extrabold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === "description"
                ? "border-primary-blue text-primary-blue bg-white"
                : "border-transparent text-gray-500 hover:text-slate-800"
            }`}
          >
            Descrição Geral
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-6 py-4.5 text-xs font-extrabold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === "specs"
                ? "border-primary-blue text-primary-blue bg-white"
                : "border-transparent text-gray-500 hover:text-slate-800"
            }`}
          >
            Especificações Técnicas
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-4.5 text-xs font-extrabold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === "reviews"
                ? "border-primary-blue text-primary-blue bg-white"
                : "border-transparent text-gray-500 hover:text-slate-800"
            }`}
          >
            Avaliações ({product.reviews.length})
          </button>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "description" && (
            <div className="prose max-w-none text-slate-750 font-medium leading-relaxed space-y-4 text-sm">
              <p>{product.description}</p>
              <p>{product.detailedDescription}</p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-6">
                <h4 className="font-display font-medium text-slate-900 text-xs uppercase tracking-wider mb-2">Por que comprar na Novari?</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <li className="flex items-center gap-2">✓ Atendimento brasileiro 24 horas inteligente.</li>
                  <li className="flex items-center gap-2">✓ Checkout criptografado padrão de bancos brasileiros.</li>
                  <li className="flex items-center gap-2">✓ Postagem flash nos correios e transportadoras em 12 horas úteis.</li>
                  <li className="flex items-center gap-2">✓ Devolução sem estresse com frete reverso gratuito.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 text-slate-700 font-black">
                    <th className="py-3 px-4 border-b border-gray-100">Parâmetro / Característica</th>
                    <th className="py-3 px-4 border-b border-gray-100">Especificação Detalhada oficial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-slate-800 font-semibold">
                  {product.specs.map((spec, index) => (
                    <tr key={index} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 text-gray-500 font-bold capitalize">{spec.label}</td>
                      <td className="py-3 px-4 text-slate-900">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                <div className="text-center md:border-r md:border-gray-200 md:pr-8 shrink-0">
                  <p className="text-4xl font-black text-slate-900 leading-none">{product.rating}</p>
                  <div className="flex items-center justify-center text-amber-500 my-1.5">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">({product.reviews.length}) Opiniões de compradores</p>
                </div>
                <div className="flex-1 space-y-1.5 w-full text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500 text-right">5 estrelas</span>
                    <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[90%] font-black" />
                    </div>
                    <span className="w-8 text-gray-400">90%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500 text-right">4 estrelas</span>
                    <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[10%] font-black" />
                    </div>
                    <span className="w-8 text-gray-400">10%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500 text-right">3 estrelas</span>
                    <div className="flex-1 bg-gray-200 h-2.5 rounded-full"></div>
                    <span className="w-8 text-gray-400">0%</span>
                  </div>
                </div>
              </div>

              {/* Individual reviews queue */}
              <div className="divide-y divide-gray-100">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="py-6 first:pt-0 last:pb-0 font-medium">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="font-display font-bold text-slate-850 text-sm">{rev.title}</p>
                        <div className="flex items-center gap-1.5 my-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-500" : "text-gray-200"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-[11px] text-gray-400 font-bold">
                        <span>{rev.author}</span>
                        <span className="mx-1.5">•</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-650 mt-2 leading-relaxed">
                      {rev.comment}
                    </p>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 py-0.5 px-2 rounded-full font-bold mt-2.5">
                        ✓ Compra confirmada pela Novari
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Shelf of related items */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6" id="related-carousel">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-display font-black text-xl text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-5 bg-amber-400 rounded-sm"></span>
              Quem comprou este produto também comprou:
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onAddToCart={(p) => onAddToCart(p, 1)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
