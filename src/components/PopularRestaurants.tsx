import React from 'react';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import { Restaurant } from '../types';
import { RestaurantCard } from './RestaurantCard';

interface PopularRestaurantsProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onViewAllRestaurants: () => void;
}

export const PopularRestaurants: React.FC<PopularRestaurantsProps> = ({
  restaurants,
  onSelectRestaurant,
  onViewAllRestaurants,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs uppercase font-extrabold tracking-wider text-[#C04E26] mb-1">
            Top Kitchens
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight font-display">
            Places worth ordering from
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            Discover local favourites, hidden gems and popular dishes
          </p>
        </div>

        <button
          onClick={onViewAllRestaurants}
          className="text-xs sm:text-sm font-semibold text-[#C04E26] hover:text-[#9E3C1B] flex items-center gap-1 group cursor-pointer"
        >
          <span>View all places</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Premium 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {restaurants.map((restaurant) => (
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
