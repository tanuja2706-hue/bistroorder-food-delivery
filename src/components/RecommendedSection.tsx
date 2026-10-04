import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Dish } from '../types';
import { DishCard } from './DishCard';

interface RecommendedSectionProps {
  dishes: Dish[];
  onOpenDetails: (dish: Dish) => void;
  onExploreMore: () => void;
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  dishes,
  onOpenDetails,
  onExploreMore,
}) => {
  const recommended = dishes.filter((d) => d.isRecommended);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs uppercase font-extrabold tracking-wider text-[#C04E26] mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight font-display">
            Picked for your table
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            Carefully curated pairings balanced for flavor, authentic spicing and wholesome nourishment
          </p>
        </div>

        <button
          onClick={onExploreMore}
          className="text-xs sm:text-sm font-semibold text-[#C04E26] hover:text-[#9E3C1B] flex items-center gap-1 group cursor-pointer"
        >
          <span>See more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommended.slice(0, 4).map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </section>
  );
};
