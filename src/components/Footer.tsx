import React from 'react';
import { CategoryId } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryId | 'all') => void;
  onNavigateHome: () => void;
  onNavigateRestaurants: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateHome,
  onNavigateRestaurants,
}) => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] border-t border-[#292524] pt-16 pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2E2A27]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#C04E26] text-white flex items-center justify-center font-bold text-xl font-display">
                B
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-display">
                BistroOrder
              </span>
            </div>

            <p className="text-[#A8A29E] text-xs sm:text-sm max-w-sm leading-relaxed">
              Good food. Delivered your way. An artisanal food discovery and doorstep dining platform connecting thoughtful diners with neighborhood culinary masters.
            </p>

            <div className="pt-2 text-xs text-[#78716C] flex items-center gap-3">
              <span>Freshly prepared</span>
              <span>·</span>
              <span>Clay-oven & hearth</span>
              <span>·</span>
              <span>Tamper-sealed delivery</span>
            </div>
          </div>

          {/* About & Discovery */}
          <div>
            <h4 className="text-xs font-bold text-[#E7E5E4] uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A8A29E]">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateRestaurants}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Curated Kitchens
                </button>
              </li>
              <li>
                <span className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Ingredient Transparency
                </span>
              </li>
              <li>
                <span className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Eco-friendly Packaging
                </span>
              </li>
            </ul>
          </div>

          {/* Restaurants & Cuisines */}
          <div>
            <h4 className="text-xs font-bold text-[#E7E5E4] uppercase tracking-wider mb-4">
              Restaurants
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A8A29E]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('biryani')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Dum Biryani & Kebabs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('north-indian')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  North Indian Curries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('south-indian')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  South Indian Tiffins
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('pizza')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Sourdough Hearth Pizzas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('healthy')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Harvest Grain Bowls
                </button>
              </li>
            </ul>
          </div>

          {/* Help, Support & Legal */}
          <div>
            <h4 className="text-xs font-bold text-[#E7E5E4] uppercase tracking-wider mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A8A29E]">
              <li>
                <span className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Customer Support
                </span>
              </li>
              <li>
                <span className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Delivery Coverage
                </span>
              </li>
              <li>
                <span className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} BistroOrder. Crafted for food lovers.</p>
          <div className="flex items-center gap-6">
            <span>Bengaluru</span>
            <span>·</span>
            <span>Mumbai</span>
            <span>·</span>
            <span>New Delhi</span>
            <span>·</span>
            <span>Pune</span>
            <span>·</span>
            <span>Hyderabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
