import React, { useState, useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data";
import { Product, Category } from "../types";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  cartCount: number;
  onCartOpen: () => void;
  setView: (v: "home" | "product") => void;
  setSelectedProduct: (p: Product | null) => void;
  onShowCoupons: () => void;
  onNavigateFAQ: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  onCartOpen,
  setView,
  setSelectedProduct,
  onShowCoupons,
  onNavigateFAQ,
}: HeaderProps) {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Auto-suggestion logic for search bar
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Handle click outside suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (product: Product) => {
    setSelectedProduct(product);
    setView("product");
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView("home");
    setSelectedProduct(null);
    setShowSuggestions(false);
  };

  // Helper to render Lucide icon dynamically
  const renderIcon = (name: string, className = "w-5 h-5") => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.HelpCircle className={className} />;
  };

  return (
    <header className="w-full bg-white shadow-xs sticky top-0 z-40" id="novari-header">
      {/* 1. Top Informational Strip */}
      <div className="w-full bg-primary-blue text-white py-2 px-4 text-xs font-semibold" id="top-promo-banner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-accent-gold animate-ping"></span>
            <span>⚡ OFERTAS EXCLUSIVAS: Frete grátis Sul/Sudeste em compras acima de R$ 199!</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onShowCoupons}
              className="hover:text-accent-gold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Icons.Tag className="w-3.5 h-3.5 text-accent-gold" />
              <span>Ver Cupons Ativos</span>
            </button>
            <span className="text-blue-200/50">|</span>
            <button
              onClick={onNavigateFAQ}
              className="hover:text-accent-gold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Icons.HelpCircle className="w-3.5 h-3.5 text-accent-gold" />
              <span>Central de Ajuda (FAQ)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Large Header Section */}
      <div className="w-full bg-white text-slate-800 py-4 px-4 border-b border-gray-200" id="main-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Mobile controls */}
          <div className="w-full md:w-auto flex items-center justify-between">
            <div
              className="flex items-center gap-2.5 cursor-pointer select-none"
              onClick={() => {
                setView("home");
                setSelectedCategory(null);
                setSelectedProduct(null);
                setSearchQuery("");
              }}
              id="novari-logo"
            >
              {/* Dynamic Modern Logo Icon */}
              <div className="bg-primary-blue text-accent-gold p-1.5 rounded-lg flex items-center justify-center font-bold tracking-wider">
                <Icons.Sparkles className="w-6 h-6 fill-accent-gold" />
              </div>
              <div className="leading-none">
                <span className="font-display text-2xl font-black text-primary-blue tracking-tight">NOVARI</span>
                <span className="text-accent-gold font-extrabold text-sm ml-0.5 font-sans tracking-widest uppercase">.com</span>
              </div>
            </div>

            {/* Mobile Nav Action Buttons */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={onCartOpen}
                className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer text-primary-blue"
                aria-label="Carrinho"
              >
                <Icons.ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-gold text-primary-blue font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-primary-blue"
              >
                {isMobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Large Visible Central Search Bar */}
          <div className="w-full md:max-w-xl relative" ref={suggestionRef} id="search-container">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Busque por produtos, marcas e muito mais..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full bg-white text-slate-900 border border-gray-300 rounded-l-lg py-3 pl-4 pr-10 focus:outline-hidden focus:ring-2 focus:ring-primary-blue placeholder:text-gray-400 text-sm font-medium shadow-xs"
                />
                {searchQuery && (
                   <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-gray-400 hover:text-slate-600 cursor-pointer"
                  >
                    <Icons.X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-accent-gold text-primary-blue hover:bg-[#ebd039] font-bold text-sm px-6 rounded-r-lg flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <Icons.Search className="w-4 h-4" />
                <span className="hidden sm:inline font-bold">Buscar</span>
              </button>
            </form>

            {/* Smart Autosuggestion Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 text-slate-900 rounded-lg shadow-xl z-50 overflow-hidden">
                <div className="bg-gray-100 px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-500 flex justify-between items-center">
                  <span>Sugestões de correspondência</span>
                  <Icons.Sparkles className="w-3 h-3 text-accent-gold" />
                </div>
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSuggestionClick(p)}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-8 h-8 rounded-md object-cover bg-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-semibold text-xs text-slate-850 line-clamp-1">{p.title}</p>
                        <p className="text-[11px] text-gray-500">{p.brand} • R$ {p.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 py-0.5 px-2 rounded-full capitalize">
                      {p.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Nav and Cart Quick Actions (Desktop only) */}
          <div className="hidden md:flex items-center gap-6 shrink-0 text-xs">
            <div className="flex items-center gap-2 cursor-pointer group hover:opacity-90">
              <div className="bg-gray-100 p-2 rounded-full border border-gray-200 text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors">
                <Icons.User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 leading-tight">Olá, bem-vindo!</p>
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <button className="font-bold text-primary-blue text-left tracking-tight cursor-pointer">Crie sua conta</button>
                </form>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200"></div>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartOpen}
              className="relative flex items-center gap-2.5 hover:bg-gray-50 px-4 py-2.5 rounded-lg cursor-pointer transition-all border border-gray-100 group"
              id="header-cart-btn"
            >
              <div className="relative">
                <Icons.ShoppingCart className="w-5 h-5 text-primary-blue group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white transition-transform animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left leading-tight hidden lg:block">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Meu Carrinho</p>
                <p className="font-bold text-primary-blue">Acessar</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Delivery Zip Code Simulation & Secondary Row */}
      <div className="w-full bg-[#001d3d] text-gray-200 py-2.5 px-4 shadow-sm text-xs border-b border-blue-900" id="delivery-bar">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-300">
            <Icons.MapPin className="w-4 h-4 text-accent-gold animate-bounce" />
            <span>Enviar para <strong className="text-white">São Paulo, SP</strong> - CEP <strong className="text-accent-gold underline">01001-000</strong> (Simulação)</span>
          </div>
          <div className="flex items-center gap-5 font-semibold tracking-wide text-[11px] uppercase">
            <button
              onClick={() => {
                setView("home");
                setSelectedCategory(null);
                setSelectedProduct(null);
                setSearchQuery("");
                setTimeout(() => {
                  document.getElementById("deals-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Icons.Clock className="w-3.5 h-3.5 text-accent-gold" />
              Ofertas do Dia
            </button>
            <button
              onClick={() => {
                setView("home");
                setSelectedCategory(null);
                setSelectedProduct(null);
                setSearchQuery("");
                setTimeout(() => {
                  document.getElementById("bestsellers-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Icons.TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Mais Vendidos
            </button>
            <button
              onClick={onShowCoupons}
              className="text-accent-gold hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Icons.Sparkles className="w-3.5 h-3.5" />
              Cupom de Hoje
            </button>
          </div>
        </div>
      </div>

      {/* 4. Horizontal Categories Category Bar */}
      <div className="w-full bg-white border-b border-gray-200 shadow-xs" id="categories-bar">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 hide-scrollbar gap-x-2 scroll-smooth">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setView("home");
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === null
                  ? "bg-primary-blue text-accent-gold border border-primary-blue"
                  : "bg-gray-100 text-slate-705 hover:bg-gray-250 border border-transparent"
              }`}
            >
              <Icons.Layers className="w-3.5 h-3.5" />
              <span>Ver Tudo</span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setView("home");
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-primary-blue text-accent-gold border border-primary-blue"
                    : "bg-gray-100 text-slate-705 hover:bg-gray-250 border border-transparent"
                }`}
              >
                {renderIcon(cat.iconName, "w-3.5 h-3.5")}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Mobile Search & Menu Drawers */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F1C30] text-white px-4 py-4 border-t border-slate-800 space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold px-1">Acesso Rápido</p>
            <button
              onClick={() => {
                setView("home");
                setSelectedCategory(null);
                setSelectedProduct(null);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg text-sm flex items-center gap-2"
            >
              <Icons.Layers className="w-4 h-4 text-amber-400" />
              <span>Página Inicial / Todos</span>
            </button>
            <button
              onClick={() => {
                onShowCoupons();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg text-sm flex items-center gap-2"
            >
              <Icons.Tag className="w-4 h-4 text-amber-400" />
              <span>Cupons Promocionais</span>
            </button>
            <button
              onClick={() => {
                onNavigateFAQ();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg text-sm flex items-center gap-2"
            >
              <Icons.HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Perguntas Frequentes (FAQ)</span>
            </button>
          </div>

          <div className="h-px bg-slate-800 my-2"></div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1.5">CEP de Entrega</p>
            <p className="text-xs text-white">Cidade: São Paulo, SP</p>
            <p className="text-xs text-gray-400 mt-1">Estimativas de frete baseadas em São Paulo</p>
          </div>
        </div>
      )}
    </header>
  );
}
