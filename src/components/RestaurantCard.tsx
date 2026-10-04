import React from 'react';
import { Star, Clock, Tag, ArrowRight, MapPin } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(restaurant)}
      className="group bg-white rounded-3xl border border-[#EAE6DF] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Cover Food/Restaurant Image */}
      <div className="relative h-52 w-full bg-[#E8E2D8] overflow-hidden">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/75 via-[#1C1917]/20 to-transparent" />

        {/* Offer Badge */}
        {restaurant.discountBadge && (
          <div className="absolute top-3.5 left-3.5">
            <span className="flex items-center gap-1.5 bg-[#C04E26] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
              <Tag className="w-3 h-3" />
              <span>{restaurant.discountBadge}</span>
            </span>
          </div>
        )}

        {/* Rating overlay badge */}
        <div className="absolute top-3.5 right-3.5">
          <div className="bg-white/95 backdrop-blur-xs text-[#1C1917] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 text-xs shadow-xs">
            <Star className="w-3.5 h-3.5 fill-[#C04E26] text-[#C04E26]" />
            <span>{restaurant.rating}</span>
            <span className="text-[#78716C] font-normal text-[10px]">({restaurant.ratingCount})</span>
          </div>
        </div>

        {/* Delivery Time & Distance bottom banner on photo */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg font-medium text-[11px]">
            <Clock className="w-3.5 h-3.5 text-orange-300" />
            <span>{restaurant.deliveryTimeMinutes} mins</span>
            <span className="text-white/60">·</span>
            <span>{restaurant.distanceKm} km</span>
          </div>

          <span className="text-[11px] font-semibold text-white drop-shadow-sm truncate max-w-[130px]">
            {restaurant.address.split(',')[1] || restaurant.address}
          </span>
        </div>
      </div>

      {/* Restaurant Body Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-[#1C1917] text-lg group-hover:text-[#C04E26] transition-colors line-clamp-1 font-display">
              {restaurant.name}
            </h3>
          </div>

          <p className="text-xs text-[#78716C] mt-1 line-clamp-1 leading-relaxed">
            {restaurant.tagline}
          </p>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#57534E] flex-wrap">
            {restaurant.cuisines.map((c, i) => (
              <React.Fragment key={c}>
                <span>{c}</span>
                {i < restaurant.cuisines.length - 1 && <span className="text-[#A8A29E]">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Price For Two & View Menu Action Button */}
        <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#A8A29E] uppercase font-bold block">
              Estimated Cost
            </span>
            <span className="text-sm font-bold text-[#1C1917] tabular-nums">
              ₹{restaurant.priceForTwo} for two
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(restaurant);
            }}
            className="flex items-center gap-1.5 bg-[#FAF8F5] group-hover:bg-[#C04E26] border border-[#E5E0D8] group-hover:border-[#C04E26] text-[#1C1917] group-hover:text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-2xs"
          >
            <span>View Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
