import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { Restaurant } from '../types';
import { RestaurantCard } from './RestaurantCard';

interface OffersSectionProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onViewAllOffers: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  restaurants,
  onSelectRestaurant,
  onViewAllOffers,
}) => {
  const offerRestaurants = restaurants.filter((r) => r.isOfferNearYou || r.discountBadge);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-200/60">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Offers Near You
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Exclusive local discounts, free delivery deals & special bundles
            </p>
          </div>
        </div>

        <button
          onClick={onViewAllOffers}
          className="text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 group cursor-pointer"
        >
          <span>See all offers</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offerRestaurants.slice(0, 3).map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onSelect={onSelectRestaurant}
          />
        ))}
      </div>
    </section>
  );
};
