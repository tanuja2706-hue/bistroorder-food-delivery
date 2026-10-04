import React from 'react';
import { Tag, Truck, Sparkles, Check, Copy } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PromoBanner: React.FC = () => {
  const { applyCoupon, appliedCoupon } = useCart();
  const [activeCode, setActiveCode] = React.useState<string | null>(null);

  const handleApply = (code: string) => {
    applyCoupon(code);
    setActiveCode(code);
    setTimeout(() => setActiveCode(null), 2500);
  };

  const offers = [
    {
      code: 'FEAST150',
      title: 'Flat ₹150 OFF',
      subtitle: 'On grand feast orders above ₹599',
      badge: 'Chef Special',
      icon: Sparkles,
      color: 'bg-[#FDF4F0] border-[#E8D4CC] text-[#C04E26]',
    },
    {
      code: 'FREEDEL',
      title: 'Free delivery above ₹499',
      subtitle: 'Zero delivery fee to your doorstep',
      badge: 'Zero Delivery Fee',
      icon: Truck,
      color: 'bg-[#F3F7F4] border-[#D3E2D8] text-[#2D6A4F]',
    },
    {
      code: 'BISTRO20',
      title: '20% OFF on selected restaurants',
      subtitle: 'Save up to ₹120 on artisanal dining',
      badge: 'Limited Period',
      icon: Tag,
      color: 'bg-[#FAF6ED] border-[#EBDDC3] text-[#B45309]',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="text-xs uppercase font-extrabold tracking-wider text-[#C04E26] mb-1">
          Special Offers
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight font-display">
          Good food, better prices.
        </h2>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          Handcrafted food doesn’t have to cost a fortune. Apply coupons directly to your order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const Icon = offer.icon;
          const isApplied = appliedCoupon?.code === offer.code;

          return (
            <div
              key={offer.code}
              className={`rounded-3xl p-6 border transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between ${offer.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/80 border border-current shadow-2xs">
                    {offer.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1C1917] font-display">
                  {offer.title}
                </h3>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  {offer.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                <div className="font-mono text-xs font-bold text-[#1C1917] bg-white px-2.5 py-1 rounded-lg border border-black/10">
                  {offer.code}
                </div>

                <button
                  type="button"
                  onClick={() => handleApply(offer.code)}
                  className="flex items-center gap-1.5 text-xs font-bold bg-[#1C1917] text-white hover:bg-[#C04E26] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Applied</span>
                    </>
                  ) : activeCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Applied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
