import React, { useState } from "react";
import { Sparkles, HelpCircle, Mail, Send, CheckCircle, ShieldCheck, Heart } from "lucide-react";

export default function Footer({
  onNavigateFAQ,
  onShowCoupons,
}: {
  onNavigateFAQ: () => void;
  onShowCoupons: () => void;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 4) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-primary-blue text-gray-200 pt-16 pb-8 border-t border-blue-800" id="novari-footer">
      <div className="max-w-7xl mx-auto px-4">
        {/* 1. High-Converting Newsletter Sub-section */}
        <div className="bg-[#001d3d] border border-blue-900 rounded-2xl p-6 md:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8" id="footer-newsletter">
          <div className="max-w-md">
            <h3 className="font-display font-bold text-xl md:text-2xl text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-gold fill-accent-gold animate-pulse" />
              Novele-se com as melhores ofertas!
            </h3>
            <p className="text-sm text-blue-100 mt-2 leading-relaxed">
              Inscreva-se na nossa newsletter semanal para receber descontos selecionados de até 50% de desconto antes de todo mundo.
            </p>
          </div>
          <div className="w-full lg:w-auto shrink-0">
            {submitted ? (
              <div className="bg-emerald-950/50 border border-emerald-800 py-3 px-6 rounded-lg flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Inscrição realizada! Aproveite o cupom BEMVINDO5.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm sm:max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-blue-300" />
                  <input
                    type="email"
                    required
                    placeholder="Seu melhor e-mail aqui"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#001730] border border-blue-900 hover:border-blue-850 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-gold font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-accent-gold text-primary-blue hover:bg-[#ebd039] font-bold text-sm px-6 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-md select-none"
                >
                  <Send className="w-4 h-4" />
                  <span>Participar</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. Structured Resource Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-sm" id="footer-columns">
          {/* Column 1: A Novari */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-extrabold text-base tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-4 bg-accent-gold rounded-xs"></span>
              Novari Marketplace
            </h4>
            <p className="text-xs text-blue-105 leading-relaxed max-w-[200px]">
              Inovando na forma de comprar, com transparência absoluta e entrega super rápida.
            </p>
            <div className="flex items-center gap-3 mt-4" id="social-links">
              <span className="bg-[#001d3d] hover:bg-[#002b5b] hover:text-accent-gold w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white font-bold text-xs transition-colors">F</span>
              <span className="bg-[#001d3d] hover:bg-[#002b5b] hover:text-accent-gold w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white font-bold text-xs transition-colors">I</span>
              <span className="bg-[#001d3d] hover:bg-[#002b5b] hover:text-accent-gold w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white font-bold text-xs transition-colors">Y</span>
              <span className="bg-[#001d3d] hover:bg-[#002b5b] hover:text-accent-gold w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white font-bold text-xs transition-colors">L</span>
            </div>
          </div>

          {/* Column 2: Compre com Autopromoção */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-extrabold text-base tracking-wide">
              Comprar & Economizar
            </h4>
            <ul className="space-y-2.5 text-xs text-blue-100 font-medium">
              <li><button onClick={onShowCoupons} className="hover:text-accent-gold transition-colors text-left cursor-pointer">Cupons de Desconto</button></li>
              <li><a href="#deals-section" className="hover:text-accent-gold transition-colors">Ofertas Relâmpago</a></li>
              <li><a href="#bestsellers-section" className="hover:text-accent-gold transition-colors">Mais Vendidos da Semana</a></li>
              <li><a href="#brands-section" className="hover:text-accent-gold transition-colors">Marcas Conveniadas</a></li>
            </ul>
          </div>

          {/* Column 3: Atendimento e Suporte */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-extrabold text-base tracking-wide flex items-center gap-1">
              Atendimento & Ajuda
            </h4>
            <ul className="space-y-2.5 text-xs text-blue-100 font-medium">
              <li><button onClick={onNavigateFAQ} className="hover:text-amber-200 transition-colors text-left cursor-pointer flex items-center gap-1 text-accent-gold font-semibold"><HelpCircle className="w-3.5 h-3.5" /> Central do Cliente (FAQ)</button></li>
              <li><span className="text-blue-105">Atendimento: sac@novari.com</span></li>
              <li><span className="text-blue-105">Telefone: 0800-400-NOVARI</span></li>
              <li><span className="text-blue-105">Segunda à Sexta, 8h às 18h</span></li>
            </ul>
          </div>

          {/* Column 4: Segurança Garantida */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-extrabold text-base tracking-wide">
              Segurança & Confiança
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 py-2 px-3 rounded-lg text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-white font-bold text-[11px]">Criptografia SSL</p>
                  <p className="text-[10px] text-gray-400">Transação 100% Segura</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 py-2 px-3 rounded-lg text-xs">
                <div className="bg-amber-500 text-slate-900 font-extrabold text-[9px] px-1.5 py-0.5 rounded-xs shrink-0">RA1000</div>
                <div>
                  <p className="text-white font-bold text-[11px]">Reclame Aqui Ótimo</p>
                  <p className="text-[10px] text-gray-400">Índice de solução de 98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-blue-900/50 my-8" />

        {/* 3. Payment badges row and credit certifications */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs mb-8" id="footer-badges">
          <div className="text-center md:text-left">
            <p className="text-blue-200 font-bold uppercase tracking-wider text-[10px] mb-3">Meios de pagamento aceitos</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5" id="payment-methods">
              <span className="bg-[#001d3d] text-accent-gold py-1 px-3.5 rounded-md font-extrabold text-[10px] tracking-wider border border-blue-900 uppercase">Pix (5% OFF)</span>
              <span className="bg-[#001d3d] text-white py-1 px-3 rounded-md font-bold text-[11px] border border-blue-900">Mastercard</span>
              <span className="bg-[#001d3d] text-white py-1 px-3 rounded-md font-bold text-[11px] border border-blue-900">Visa</span>
              <span className="bg-[#001d3d] text-white py-1 px-3 rounded-md font-bold text-[11px] border border-blue-900">Elo</span>
              <span className="bg-[#001d3d] text-white py-1 px-3 rounded-md font-bold text-[11px] border border-blue-900">Hipercard</span>
              <span className="bg-[#001d3d] text-gray-300 py-1 px-3 rounded-md font-bold text-[11px] border border-blue-900">Boleto</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-blue-200 font-bold uppercase tracking-wider text-[10px] mb-3">Certificações</p>
            <div className="flex justify-center md:justify-end gap-3 text-[10px] text-blue-105 font-semibold">
              <span className="border border-blue-900 px-2 py-1 rounded-sm bg-[#001d3d] flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Site Verificado</span>
              <span className="border border-blue-900 px-2 py-1 rounded-sm bg-[#001d3d] flex items-center gap-1">Ebit Bronze 2026</span>
            </div>
          </div>
        </div>

        {/* 4. Complete Law-Compliant Corporate Metadata */}
        <div className="text-center md:text-left border-t border-blue-900/40 pt-6 text-[10.5px] text-blue-200/80 space-y-2 leading-relaxed" id="corporate-legal">
          <p>
            Novari Marketplace S.A. | CNPJ: 10.456.789/0001-23 | Av. Paulista, 1000 - Bela Vista, São Paulo - SP, CEP: 01310-100.
          </p>
          <p>
            Todas as transações e condições comerciais estão sujeitas à análise cadastral e aprovação de crédito. Os preços e promoções apresentados no site são válidos apenas para pedidos fechados no momento da navegação.
          </p>
          <p className="flex items-center justify-center md:justify-start gap-1 text-[10px] text-blue-200/60">
            <span>Desenvolvido com excelência</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>focado na melhor experiência de e-commerce corporativo do Brasil. © 2026 Novari Inc.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
