import React from 'react';
import { ArrowRight, Star, Clock, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreRestaurants: () => void;
  onBrowseDishes: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreRestaurants,
  onBrowseDishes,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
      <div className="bg-[#F5F1EB] border border-[#E8E2D8] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xs">
        {/* Subtle background ambient warmth */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#C04E26]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge: "Fresh picks for you" */}
            <div className="inline-flex items-center gap-2 bg-[#FDF4F0] border border-[#C04E26]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C04E26]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh picks for you</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1917] tracking-tight leading-[1.15] font-display">
              What’s cooking today?
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-[#57534E] max-w-xl leading-relaxed">
              Discover local favourites, hidden gems and dishes worth ordering. Handcrafted feasts from the finest kitchens, brought fresh to your table.
            </p>

            {/* Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onExploreRestaurants}
                className="flex items-center gap-2 bg-[#C04E26] hover:bg-[#9E3C1B] text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all hover:translate-x-0.5 active:scale-98 text-sm sm:text-base cursor-pointer"
              >
                <span>Explore Restaurants</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBrowseDishes}
                className="bg-white hover:bg-[#FAF8F5] text-[#1C1917] border border-[#D6CFC4] font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base cursor-pointer shadow-2xs"
              >
                Browse Dishes
              </button>
            </div>

            {/* Editorial highlights */}
            <div className="pt-6 border-t border-[#E5E0D8] flex flex-wrap items-center gap-6 text-xs text-[#78716C]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
                <span className="font-medium text-[#44403C]">Curated Kitchens</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C04E26]" />
                <span className="font-medium text-[#44403C]">Easy Ordering</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 fill-[#C04E26] text-[#C04E26]" />
                <span className="font-medium text-[#44403C]">Great Food</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large premium food image + 2 floating food cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Editorial Image */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-white/60 bg-[#E5E0D8]">
                <img
                  src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80"
                  alt="Royal Dum Biryani and Indian Feast"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-200">Chef Spotlight</span>
                  <div className="text-base font-bold">Awadhi Handi Feast</div>
                </div>
              </div>

              {/* Floating Card 1: Top-Right (or offset top) */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-[#EAE6DF] rounded-2xl p-3 shadow-xl max-w-[200px] flex items-center gap-2.5 animate-bounce-subtle">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=200&q=80"
                  alt="Dum Biryani"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#1C1917] truncate">Shahi Biryani</div>
                  <div className="text-[11px] text-[#78716C] truncate">Masala & Ember</div>
                  <div className="text-xs font-bold text-[#C04E26] mt-0.5">₹449</div>
                </div>
              </div>

              {/* Floating Card 2: Bottom-Left */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md border border-[#EAE6DF] rounded-2xl p-3 shadow-xl max-w-[210px] flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=200&q=80"
                  alt="Ghee Roast Dosa"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#1C1917] truncate">Ghee Roast Dosa</div>
                  <div className="flex items-center gap-1 text-[11px] text-[#78716C]">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>4.9</span>
                  </div>
                  <div className="text-xs font-bold text-[#C04E26] mt-0.5">₹249</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
