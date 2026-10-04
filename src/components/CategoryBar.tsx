import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { CategoryId } from '../types';

interface CategoryBarProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (categoryId: CategoryId | 'all') => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight font-display">
            Pick your craving
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-0.5">
            Explore authentic flavors, artisanal classics and regional specialties
          </p>
        </div>

        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-[#C04E26] hover:underline cursor-pointer"
          >
            Show All
          </button>
        )}
      </div>

      {/* Horizontal visual category row */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
        {/* All option */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
        >
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 border ${
              selectedCategory === 'all'
                ? 'bg-[#C04E26] text-white border-[#C04E26] shadow-md ring-4 ring-[#C04E26]/15'
                : 'bg-white text-[#44403C] border-[#E5E0D8] group-hover:border-[#C04E26]/50 shadow-2xs'
            }`}
          >
            <span>All</span>
          </div>
          <span
            className={`text-xs font-semibold ${
              selectedCategory === 'all' ? 'text-[#C04E26]' : 'text-[#44403C] group-hover:text-[#C04E26]'
            }`}
          >
            All Dishes
          </span>
        </button>

        {/* Individual Category circular visual items */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
            >
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden transition-all duration-200 border ${
                  isSelected
                    ? 'ring-4 ring-[#C04E26] border-white shadow-md scale-105'
                    : 'border-[#EAE6DF] group-hover:border-[#C04E26] group-hover:shadow-sm'
                }`}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
              </div>

              <span
                className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected ? 'text-[#C04E26] font-bold' : 'text-[#44403C] group-hover:text-[#C04E26]'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
