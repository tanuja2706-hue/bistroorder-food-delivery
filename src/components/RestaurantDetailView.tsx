import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Tag,
  Search,
  X,
  Share2,
  Check,
  MapPin,
} from 'lucide-react';
import { Restaurant, Dish } from '../types';
import { DishCard } from './DishCard';

interface RestaurantDetailViewProps {
  restaurant: Restaurant;
  dishes: Dish[];
  onBack: () => void;
  onOpenDishDetails: (dish: Dish) => void;
}

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurant,
  dishes,
  onBack,
  onOpenDishDetails,
}) => {
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const restaurantDishes = useMemo(() => {
    return dishes.filter((dish) => {
      if (dish.restaurantId !== restaurant.id) return false;
      if (vegOnly && !dish.isVeg) return false;
      if (menuSearchQuery.trim()) {
        const q = menuSearchQuery.toLowerCase();
        const inName = dish.name.toLowerCase().includes(q);
        const inDesc = dish.description.toLowerCase().includes(q);
        const inCuisine = dish.cuisine.toLowerCase().includes(q);
        if (!inName && !inDesc && !inCuisine) return false;
      }
      return true;
    });
  }, [dishes, restaurant.id, vegOnly, menuSearchQuery]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20">
      {/* Top Banner Cover */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#1C1917]">
        <img
          src={restaurant.coverImageUrl || restaurant.imageUrl}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-75"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/50 to-transparent" />

        {/* Back and Share */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 bg-[#1C1917]/80 hover:bg-[#1C1917] text-white backdrop-blur-xs px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discovery</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-[#1C1917]/80 hover:bg-[#1C1917] text-white backdrop-blur-xs px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer border border-white/10"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Restaurant Header Meta Info */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 text-white z-10">
          <div className="max-w-4xl space-y-2">
            {restaurant.discountBadge && (
              <span className="inline-flex items-center gap-1.5 bg-[#C04E26] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                <Tag className="w-3.5 h-3.5" />
                <span>{restaurant.discountBadge}</span>
              </span>
            )}

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              {restaurant.name}
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
              {restaurant.tagline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <div className="flex items-center gap-1 bg-white text-[#1C1917] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                <Star className="w-3.5 h-3.5 fill-[#C04E26] text-[#C04E26]" />
                <span>{restaurant.rating}</span>
                <span className="text-[#78716C] font-normal">({restaurant.ratingCount})</span>
              </div>

              <div className="flex items-center gap-1.5 text-stone-200 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-orange-300" />
                <span>{restaurant.deliveryTimeMinutes} mins delivery</span>
              </div>

              <div className="text-stone-200 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-lg">
                <span>₹{restaurant.priceForTwo} for two</span>
                <span className="mx-1.5">·</span>
                <span>Min order ₹{restaurant.minimumOrder}</span>
              </div>

              <div className="text-stone-200 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-lg hidden md:block">
                <span>{restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* In-Menu Controls & Search Header */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAE6DF] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Menu Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type="text"
              placeholder={`Search in ${restaurant.name} menu...`}
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl text-xs sm:text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
            />
            {menuSearchQuery && (
              <button
                type="button"
                onClick={() => setMenuSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1C1917]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Veg Only Toggle and Category tabs */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {/* Pure Veg Toggle */}
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                vegOnly
                  ? 'bg-[#F3F7F4] border-[#2D6A4F] text-[#2D6A4F] font-bold shadow-2xs'
                  : 'bg-white border-[#E5E0D8] text-[#57534E] hover:border-[#2D6A4F]/50'
              }`}
            >
              <div className="w-3 h-3 rounded-full border border-[#2D6A4F] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
              </div>
              <span>Veg Only</span>
            </button>

            {/* Menu Category Pills */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedMenuCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedMenuCategory === 'all'
                    ? 'bg-[#C04E26] text-white'
                    : 'bg-[#FAF8F5] text-[#57534E] hover:bg-[#F2EFE9]'
                }`}
              >
                All Dishes
              </button>
              {restaurant.menuCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedMenuCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedMenuCategory === cat
                      ? 'bg-[#C04E26] text-white'
                      : 'bg-[#FAF8F5] text-[#57534E] hover:bg-[#F2EFE9]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1C1917] font-display">
            Menu Items ({restaurantDishes.length})
          </h2>
          {vegOnly && (
            <span className="text-xs text-[#2D6A4F] font-semibold bg-[#F3F7F4] px-3 py-1 rounded-full">
              Showing Vegetarian selections only
            </span>
          )}
        </div>

        {restaurantDishes.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE6DF] max-w-md mx-auto my-8">
            <div className="text-4xl mb-3">🍲</div>
            <h3 className="font-bold text-[#1C1917] text-lg font-display">No dishes match</h3>
            <p className="text-xs text-[#78716C] mt-1">
              Try adjusting your search query or toggling off the Veg Only filter.
            </p>
            <button
              onClick={() => {
                setMenuSearchQuery('');
                setVegOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-[#C04E26] text-white text-xs font-semibold rounded-xl hover:bg-[#9E3C1B] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurantDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOpenDetails={onOpenDishDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
