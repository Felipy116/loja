import React, { useState } from "react";
import { Tag, Copy, Check, Scissors, Gift } from "lucide-react";
import { COUPONS } from "../data";

export default function CouponBanner() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
  };

  return (
    <section className="py-2" id="coupon-hub-view">
      <div className="bg-[#002247] text-white rounded-2xl overflow-hidden shadow-lg border border-blue-900/50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-accent-gold/10 border border-accent-gold/30 text-accent-gold font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full">
            <Gift className="w-3 h-3 fill-accent-gold/20 mr-1" />
            Parceria de Desconto Ativo
          </div>
          <h3 className="font-display font-black text-xl md:text-2xl tracking-tight text-white leading-tight">
            Economize ainda mais hoje!
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm font-medium">
            Copie um dos vouchers oficiais abaixo e insira no carrinho para economizar instantaneamente.
          </p>
        </div>

        {/* Coupons row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto" id="coupons-grid">
          {COUPONS.map((coupon, idx) => (
            <div
              key={idx}
              className="bg-[#001d3d] border-2 border-dashed border-blue-900 hover:border-accent-gold rounded-xl p-3 flex flex-col items-center justify-between gap-2.5 text-center transition-all relative"
            >
              {/* Scissors visual effect */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#002247] border border-blue-900/50 p-1 rounded-full">
                <Scissors className="w-3 h-3 text-blue-300" />
              </div>

              <div>
                <p className="font-display font-black text-accent-gold text-base">{coupon.discountPercent}% OFF</p>
                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wide mt-0.5">Mínimo R$ {coupon.minPurchase}</p>
              </div>

              <div className="flex items-center gap-1.5 bg-[#001730] rounded-lg p-1.5 border border-blue-900/40 w-full justify-between">
                <span className="font-mono text-xs font-black tracking-widest text-slate-100 uppercase select-all ml-1.5">
                  {coupon.code}
                </span>
                <button
                  onClick={() => handleCopy(coupon.code, idx)}
                  className="bg-accent-gold hover:bg-[#ebd039] text-primary-blue p-1.5 rounded-md transition-colors cursor-pointer"
                  title="Copiar cupom"
                >
                  {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-850 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
