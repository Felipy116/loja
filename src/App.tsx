import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ProductPage from "./components/ProductPage";
import CartModal from "./components/CartModal";
import CouponBanner from "./components/CouponBanner";
import { PRODUCTS, REF_REVIEWS, FAQS, BRANDS, CATEGORIES } from "./data";
import { Product, CartItem, Category } from "./types";
import { Sparkles, Star, ChevronLeft, ChevronRight, CheckCircle2, Clock, Truck, ShieldCheck, ArrowRight, Layers, HelpCircle, ChevronDown, Award } from "lucide-react";

export default function App() {
  // Navigation states
  const [view, setView] = useState<"home" | "product">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Cart operations
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("novari_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hero carousel state
  const [heroSlide, setHeroSlide] = useState(0);
  const heroBanners = [
    {
      id: "s1",
      title: "Semana dos Eletrônicos Novari",
      subtitle: "Galaxy S24 Ultra & Muito Mais",
      desc: "Performance extrema, inteligência artificial integrada e as melhores taxas do Brasil. Em até 10x sem juros ou desconto no Pix.",
      badge: "Lançamento Exclusivo",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop",
      btnText: "Ver Oferta Especial",
      targetId: "nov-1"
    },
    {
      id: "s2",
      title: "Sinfonia em Alta Fidelidade",
      subtitle: "Headphones Pro & Isolamento ANC",
      desc: "Mergulhe no silêncio acústico absoluto. Até 40 horas de autonomia com som Hi-Res e cancelamento ativo.",
      badge: "Sucesso de Vendas",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
      btnText: "Confira Modelos",
      targetId: "nov-2"
    },
    {
      id: "s3",
      title: "Cozinha Saudável Inteligente",
      subtitle: "Fritadeiras Digitais Smart 5.5L",
      desc: "Seu preparo crocante, rápido e equilibrado sem usar uma gota de óleo convencional. Painel touch inteligente.",
      badge: "Melhor Custo Benefício",
      image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=1200&auto=format&fit=crop",
      btnText: "Garantir Desconto",
      targetId: "nov-5"
    }
  ];

  // Urgent Flash Deals ticking timer (simulates hours countdown)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 24, seconds: 12 });

  // FAQ expanded tracker index
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Sync cart variables
  useEffect(() => {
    try {
      localStorage.setItem("novari_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Storage limits or sandboxing disabled saving:", e);
    }
  }, [cartItems]);

  // Auto-rotating slide controller
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [heroBanners.length]);

  // Urgent Clock countdown calculations
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          h = 5; // Reset cycle
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCartItems((prev) => {
      const matchIndex = prev.findIndex((i) => i.product.id === product.id);
      if (matchIndex > -1) {
        const copy = [...prev];
        copy[matchIndex].quantity += qty;
        return copy;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const handleInstantBuy = (product: Product) => {
    handleAddToCart(product, 1);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleHeroBtnClick = (targetProductId: string) => {
    const match = PRODUCTS.find((p) => p.id === targetProductId);
    if (match) {
      handleProductSelect(match);
    }
  };

  const filterProducts = () => {
    let list = PRODUCTS;

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return list;
  };

  const filteredCatalog = filterProducts();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Scroll auxiliary hooks
  const navigateToFAQ = () => {
    setView("home");
    setSelectedProduct(null);
    setTimeout(() => {
      document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const navigateToCoupons = () => {
    setView("home");
    setSelectedProduct(null);
    setTimeout(() => {
      document.getElementById("coupons-hub-section")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // Static product list selections (Home views)
  const lightningDeals = PRODUCTS.filter((p) => p.isLightning);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const recommendedItems = PRODUCTS.filter((p) => p.isRecommended);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative font-sans antialiased text-slate-900" id="novari-app">
      
      {/* Dynamic Header Component */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        setView={setView}
        setSelectedProduct={handleProductSelect}
        onShowCoupons={navigateToCoupons}
        onNavigateFAQ={navigateToFAQ}
      />

      {/* Main Container */}
      <main className="flex-1" id="main-content">
        
        {view === "product" && selectedProduct ? (
          /* SINGLE PRODUCT SCREEN VIEW */
          <ProductPage
            product={selectedProduct}
            onGoBack={() => {
              setView("home");
              setSelectedProduct(null);
            }}
            onAddToCart={handleAddToCart}
            onInstantBuy={handleInstantBuy}
            onSelectProduct={handleProductSelect}
          />
        ) : (
          /* HOMEPAGE / CATALOG FILTER VIEW */
          <div className="space-y-12">
            
            {/* If user is active in search or category menu */}
            {selectedCategory || searchQuery ? (
              <div className="max-w-7xl mx-auto px-4 py-8" id="catalog-filter-panel">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs mb-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-md">Catalog Explorer</span>
                      <h2 className="font-display font-black text-xl md:text-2xl mt-1.5 text-slate-950 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-amber-500" />
                        {selectedCategory ? (
                          <span>
                            Categoria:{" "}
                            <strong className="capitalize text-slate-900">
                              {CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                            </strong>
                          </span>
                        ) : (
                          <span>Resultados para sua busca</span>
                        )}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Mostrando <strong className="text-slate-800">{filteredCatalog.length}</strong> produtos correspondentes encontrados.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery("");
                      }}
                      className="bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1 cursor-pointer transition select-none"
                    >
                      Remover Filtros X
                    </button>
                  </div>
                </div>

                {filteredCatalog.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCatalog.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={handleProductSelect}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl py-16 px-4 text-center border border-gray-100 space-y-4 max-w-md mx-auto">
                    <span className="text-slate-300 text-5xl">🔍</span>
                    <div>
                      <p className="font-display font-bold text-slate-800">Nenhum produto correspondente</p>
                      <p className="text-xs text-gray-500 mt-1">Tente conferir alternativas de grafia ou limpe os filtros para visualizar ofertas disponíveis.</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery("");
                      }}
                      className="bg-[#0F1C30] hover:bg-slate-800 text-white font-bold text-xs py-2 px-6 rounded-lg cursor-pointer"
                    >
                      Mostrar Tudo
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* STANDARD HOME VIEW SCHEME */
              <div className="space-y-16" id="home-view-container">
                
                {/* 1. Large Dynamic Promos Slider */}
                <section className="relative w-full bg-[#001d3d] overflow-hidden border-b border-blue-900" id="hero-slider">
                  <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
                      {/* Left Promo text details */}
                      <div className="lg:col-span-6 space-y-4 md:space-y-6 text-center lg:text-left z-10 text-white select-none">
                        <span className="inline-flex items-center gap-1.5 bg-accent-gold text-primary-blue rounded-full text-[10px] font-black uppercase px-3 py-1 tracking-wider shadow-md">
                          <Sparkles className="w-3 h-3 fill-primary-blue text-primary-blue" />
                          {heroBanners[heroSlide].badge}
                        </span>

                        <div className="space-y-2">
                          <h2 className="text-accent-gold font-display font-black text-xl uppercase tracking-widest text-[11px] sm:text-xs">
                            {heroBanners[heroSlide].subtitle}
                          </h2>
                          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                            {heroBanners[heroSlide].title}
                          </h1>
                        </div>

                        <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                          {heroBanners[heroSlide].desc}
                        </p>

                        <div className="pt-2">
                          <button
                            onClick={() => handleHeroBtnClick(heroBanners[heroSlide].targetId)}
                            className="bg-accent-gold hover:bg-[#ebd039] text-primary-blue font-black py-3 px-8 rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <span>{heroBanners[heroSlide].btnText}</span>
                            <ArrowRight className="w-4 h-4 text-primary-blue" />
                          </button>
                        </div>
                      </div>

                      {/* Right Promo High res product picture */}
                      <div className="lg:col-span-6 flex justify-center items-center relative h-64 sm:h-80 md:h-[350px]">
                        {/* Background glowing circle */}
                        <div className="absolute w-60 h-60 bg-accent-gold/10 rounded-full blur-3xl" />
                        <img
                          src={heroBanners[heroSlide].image}
                          alt={heroBanners[heroSlide].title}
                          className="w-full h-full object-contain max-h-[350px] rounded-2xl drop-shadow-2xl transition-all duration-700 select-none transform hover:scale-102"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Manual controls buttons loops */}
                    <div className="absolute bottom-4 right-4 md:right-8 flex items-center gap-2 z-20">
                      <button
                        onClick={() =>
                          setHeroSlide(
                            (prev) => (prev - 1 + heroBanners.length) % heroBanners.length
                          )
                        }
                        className="bg-primary-blue/85 hover:bg-primary-blue/100 text-white p-2 rounded-full cursor-pointer border border-[#002b5b]/50 transition-colors"
                        aria-label="Anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="flex gap-1.5">
                        {heroBanners.map((_, idx) => (
                          <span
                             key={idx}
                             className={`h-2 rounded-full transition-all duration-300 ${
                               heroSlide === idx ? "w-5 bg-accent-gold" : "w-2 bg-blue-900"
                             }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setHeroSlide((prev) => (prev + 1) % heroBanners.length)}
                        className="bg-primary-blue/85 hover:bg-primary-blue/100 text-white p-2 rounded-full cursor-pointer border border-[#002b5b]/50 transition-colors"
                        aria-label="Próximo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* 2. Horizontal Circle Spheres Categories Grid */}
                <section className="max-w-7xl mx-auto px-4" id="circle-categories">
                  <div className="text-center mb-8">
                    <span className="text-xs font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Navegação Expressa</span>
                    <h2 className="font-display font-black text-2xl text-slate-900 mt-2 tracking-tight">Pesquise por departamento</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
                    {CATEGORIES.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer text-center group flex flex-col items-center justify-center gap-3.5 select-none"
                      >
                        <div className={`p-4 rounded-full transition-transform duration-300 group-hover:scale-110 ${cat.color} bg-opacity-70 flex items-center justify-center shadow-xs`}>
                          {/* Rendering custom icons dynamically */}
                          {cat.slug === "eletronicos" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                          {cat.slug === "informatica" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                          {cat.slug === "eletrodomesticos" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
                          {cat.slug === "audio" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>}
                          {cat.slug === "casa" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                          {cat.slug === "games" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-800 group-hover:text-blue-900 transition-colors uppercase tracking-wider">{cat.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest font-bold">Ver ofertas</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Flash Lightning Deals (Ofertas relâmpago) with Urgent Countdown */}
                <section className="max-w-7xl mx-auto px-4" id="deals-section">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-xs">
                    {/* Header line with countdown */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#EAB308] text-slate-950 p-2 rounded-xl flex items-center justify-center font-bold">
                          <Clock className="w-5 h-5 animate-spin" />
                        </div>
                        <div>
                          <h2 className="font-display font-black text-lg md:text-xl text-slate-900 tracking-tight">Ofertas Relâmpago do Dia</h2>
                          <p className="text-xs text-slate-450 font-medium">Preços limpa estoque válidos por tempo limitado.</p>
                        </div>
                      </div>

                      {/* Ticking Clock widget */}
                      <div className="flex items-center gap-2 bg-[#FAFAF9] border border-gray-200 px-3.5 py-1.5 rounded-xl text-xs font-black select-none text-slate-800" id="deal-timer-widget">
                        <span className="text-red-500 font-extrabold flex items-center gap-1 uppercase tracking-widest text-[10px]">Termina em:</span>
                        <div className="flex gap-1">
                          <span className="bg-[#0F1C30] text-amber-400 px-2 py-0.5 rounded-md font-mono text-sm">{String(timeLeft.hours).padStart(2, "0")}h</span>
                          <span className="text-[#0F1C30] self-center font-black">:</span>
                          <span className="bg-[#0F1C30] text-amber-400 px-2 py-0.5 rounded-md font-mono text-sm">{String(timeLeft.minutes).padStart(2, "0")}m</span>
                          <span className="text-[#0F1C30] self-center font-black">:</span>
                          <span className="bg-[#0F1C30] text-amber-400 px-2 py-0.5 rounded-md font-mono text-sm animate-pulse">{String(timeLeft.seconds).padStart(2, "0")}s</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {lightningDeals.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          onSelect={handleProductSelect}
                          onAddToCart={(p) => handleAddToCart(p, 1)}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Exclusive Voucher coupon section */}
                <section className="max-w-7xl mx-auto px-4" id="coupons-hub-section">
                  <CouponBanner />
                </section>

                {/* 4. Products shelf selection: Bestsellers */}
                <section className="max-w-7xl mx-auto px-4" id="bestsellers-section">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
                    <h2 className="font-display font-black text-xl text-slate-900 tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-amber-400 rounded-xs"></span>
                      Produtos Mais Vendidos
                    </h2>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-gray-100 py-1 px-3 rounded-full">Relevância Alta</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bestSellers.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onSelect={handleProductSelect}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                      />
                    ))}
                  </div>
                </section>

                {/* Informational banners to mimic big marketplaces */}
                <section className="max-w-7xl mx-auto px-4" id="mid-promos">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-800">
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-150 rounded-2xl p-6 flex gap-4 items-start shadow-xs">
                      <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-xs">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#0F1C30]">Logística Novari Express</h4>
                        <p className="text-xs text-slate-650 mt-1 leading-relaxed">Sua mercadoria viaja segurada contra roubos por transportadoras credenciadas com rastreio imediato por e-mail.</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-150 rounded-2xl p-6 flex gap-4 items-start shadow-xs">
                      <div className="bg-amber-500 text-slate-950 p-3 rounded-xl shadow-xs">
                        <Award className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#0F1C30]">Certificação Reclame Aqui RA1000</h4>
                        <p className="text-xs text-slate-650 mt-1 leading-relaxed">Temos o maior selo de qualidade de suporte ao cliente do Brasil com respostas em menos de 10 minutos.</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-150 rounded-2xl p-6 flex gap-4 items-start shadow-xs">
                      <div className="bg-emerald-600 text-white p-3 rounded-xl shadow-xs">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#0F1C30]">Criptografia Financeira SSL</h4>
                        <p className="text-xs text-slate-650 mt-1 leading-relaxed">Dados do seu cartão de crédito nunca são salvos em nossos servidores. Transação direta com as operadoras.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 5. Personal recommendations */}
                <section className="max-w-7xl mx-auto px-4" id="recommendations-section">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
                    <h2 className="font-display font-black text-xl text-slate-900 tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-purple-500 rounded-xs"></span>
                      Recomendações Personalizadas
                    </h2>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-gray-100 py-1 px-3 rounded-full">Baseado no seu perfil</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendedItems.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onSelect={handleProductSelect}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                      />
                    ))}
                  </div>
                </section>

                {/* 6. Partner Brands Logotypes Section */}
                <section className="max-w-7xl mx-auto px-4" id="brands-section">
                  <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs text-center">
                    <span className="text-xs font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">Marcas Conveniadas</span>
                    <h2 className="font-display font-black text-xl text-slate-900 mt-2.5 mb-6">Nossos parceiros oficiais</h2>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-center items-center">
                      {BRANDS.map((brand, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 hover:bg-slate-50 border border-gray-100 rounded-xl p-4 flex items-center justify-center group transition-colors cursor-pointer select-none"
                          title={brand.name}
                        >
                          <img
                            src={brand.logo}
                            className="h-8 object-contain rounded-md filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300 contrast-125"
                            alt={brand.name}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 7. Client Reviews Section */}
                <section className="max-w-7xl mx-auto px-4" id="testimonials-section">
                  <div className="text-center mb-8">
                    <span className="text-xs font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Opinião Externa</span>
                    <h2 className="font-display font-black text-2xl text-slate-900 mt-2">Quem compra avalia e recomenda a Novari</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {REF_REVIEWS.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-display font-black text-slate-800 text-xs uppercase tracking-wide">{rev.author}</span>
                            <span className="text-[10px] text-gray-400 font-bold">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-400">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <p className="font-bold text-slate-850 text-xs leading-snug">{rev.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed font-semibold">"{rev.comment}"</p>
                        </div>
                        <div className="border-t border-gray-55 pt-4 mt-6 flex items-center justify-between text-[11px] text-emerald-700 font-extrabold bg-emerald-50/40 p-2 rounded-lg">
                          <span>✓ Compra Verificada</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 8. FAQ Section */}
                <section className="max-w-3xl mx-auto px-4" id="faq-section">
                  <div className="text-center mb-8">
                    <span className="text-xs font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Dúvidas Comuns
                    </span>
                    <h2 className="font-display font-black text-2xl text-slate-900 mt-2">Perguntas Frequentes (FAQ)</h2>
                    <p className="text-xs text-gray-500 mt-1">Precisa de esclarecimentos rápidos sobre envios, pagamentos e trocas?</p>
                  </div>

                  <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden divide-y divide-gray-100">
                    {FAQS.map((item) => (
                      <div key={item.id} className="transition-all">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                          className="w-full text-left px-6 py-4.5 hover:bg-gray-50/50 flex justify-between items-center font-bold text-xs sm:text-sm text-slate-850 cursor-pointer select-none"
                        >
                          <span>{item.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                              expandedFaq === item.id ? "rotate-185 text-amber-500" : ""
                            }`}
                          />
                        </button>
                        {expandedFaq === item.id && (
                          <div className="px-6 pb-5 text-xs text-slate-600 leading-relaxed font-semibold animate-fade-in-down">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Complete Footer Column */}
      <Footer onNavigateFAQ={navigateToFAQ} onShowCoupons={navigateToCoupons} />

      {/* Slides over accessible Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
