import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Star,
  ArrowUpDown,
  Utensils,
  Store,
} from 'lucide-react';
import { Dish, Restaurant, CategoryId } from '../types';
import { DishCard } from './DishCard';
import { RestaurantCard } from './RestaurantCard';
import { CATEGORIES } from '../data/mockData';

interface ExploreViewProps {
  initialSearchQuery?: string;
  initialCategory?: CategoryId | 'all';
  initialCuisine?: string | 'all';
  dishes: Dish[];
  restaurants: Restaurant[];
  onOpenDishDetails: (dish: Dish) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialSearchQuery = '',
  initialCategory = 'all',
  initialCuisine = 'all',
  dishes,
  restaurants,
  onOpenDishDetails,
  onSelectRestaurant,
}) => {
  const [viewType, setViewType] = useState<'dishes' | 'restaurants'>('dishes');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(initialCategory);
  const [selectedCuisine, setSelectedCuisine] = useState<string | 'all'>(initialCuisine);
  const [minRating, setMinRating] = useState<number>(0);
  const [priceTier, setPriceTier] = useState<string>('all');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'time'>('rating');

  const cuisinesList = [
    'North Indian',
    'South Indian',
    'Biryani',
    'Italian',
    'Chinese',
    'American',
    'Healthy',
    'Coffee',
    'Desserts',
  ];

  // Filtered Dishes
  const filteredDishes = useMemo(() => {
    let result = dishes.filter((dish) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = dish.name.toLowerCase().includes(q);
        const inDesc = dish.description.toLowerCase().includes(q);
        const inRest = dish.restaurantName.toLowerCase().includes(q);
        const inCuisine = dish.cuisine.toLowerCase().includes(q);
        if (!inName && !inDesc && !inRest && !inCuisine) return false;
      }

      // Category
      if (selectedCategory !== 'all' && dish.categoryId !== selectedCategory) {
        return false;
      }

      // Cuisine
      if (selectedCuisine !== 'all' && dish.cuisine.toLowerCase() !== selectedCuisine.toLowerCase()) {
        return false;
      }

      // Rating
      if (minRating > 0 && dish.rating < minRating) {
        return false;
      }

      // Veg only
      if (vegOnly && !dish.isVeg) {
        return false;
      }

      // Price filter
      if (priceTier === 'under-250' && dish.price > 250) return false;
      if (priceTier === '250-400' && (dish.price < 250 || dish.price > 400)) return false;
      if (priceTier === 'above-400' && dish.price <= 400) return false;

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'time') return a.prepTimeMinutes - b.prepTimeMinutes;
      return 0;
    });

    return result;
  }, [dishes, searchQuery, selectedCategory, selectedCuisine, minRating, vegOnly, priceTier, sortBy]);

  // Filtered Restaurants
  const filteredRestaurants = useMemo(() => {
    let result = restaurants.filter((r) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = r.name.toLowerCase().includes(q);
        const inTag = r.tagline.toLowerCase().includes(q);
        const inCuisine = r.cuisines.some((c) => c.toLowerCase().includes(q));
        if (!inName && !inTag && !inCuisine) return false;
      }

      // Cuisine
      if (selectedCuisine !== 'all' && !r.cuisines.some((c) => c.toLowerCase() === selectedCuisine.toLowerCase())) {
        return false;
      }

      // Rating
      if (minRating > 0 && r.rating < minRating) {
        return false;
      }

      // Price for two filter
      if (priceTier === 'under-500' && r.priceForTwo > 500) return false;
      if (priceTier === '500-750' && (r.priceForTwo < 500 || r.priceForTwo > 750)) return false;
      if (priceTier === 'above-750' && r.priceForTwo <= 750) return false;

      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [restaurants, searchQuery, selectedCuisine, minRating, priceTier, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCuisine('all');
    setMinRating(0);
    setPriceTier('all');
    setVegOnly(false);
    setSortBy('rating');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'all' ||
    selectedCuisine !== 'all' ||
    minRating > 0 ||
    priceTier !== 'all' ||
    vegOnly;

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header & Search Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight font-display">
                Discover Kitchens & Delicacies
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] mt-1">
                Filter by regional craft, dietary preference, and budget
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#EAE6DF] self-start md:self-auto">
              <button
                type="button"
                onClick={() => setViewType('dishes')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  viewType === 'dishes'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <Utensils className="w-4 h-4 text-[#C04E26]" />
                <span>Dishes ({filteredDishes.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setViewType('restaurants')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  viewType === 'restaurants'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <Store className="w-4 h-4 text-[#C04E26]" />
                <span>Places ({filteredRestaurants.length})</span>
              </button>
            </div>
          </div>

          {/* Large Search input */}
          <div className="mt-6 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type="text"
              placeholder="Search by dish name, restaurant, spice, or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-2xl text-sm placeholder:text-[#A8A29E] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1C1917] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Bar Controls */}
          <div className="mt-6 pt-5 border-t border-[#F2EFE9] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* Veg Only Toggle */}
              <button
                type="button"
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  vegOnly
                    ? 'bg-[#F3F7F4] border-[#2D6A4F] text-[#2D6A4F] font-bold'
                    : 'bg-white border-[#EAE6DF] text-[#57534E] hover:border-[#2D6A4F]/50'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />
                <span>Veg Only</span>
              </button>

              {/* Rating */}
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="px-3 py-1.5 bg-white border border-[#EAE6DF] rounded-full font-medium text-[#44403C] focus:outline-none cursor-pointer"
              >
                <option value={0}>Rating: Any</option>
                <option value={4.8}>4.8★ & above</option>
                <option value={4.5}>4.5★ & above</option>
                <option value={4.0}>4.0★ & above</option>
              </select>

              {/* Cuisine */}
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="px-3 py-1.5 bg-white border border-[#EAE6DF] rounded-full font-medium text-[#44403C] focus:outline-none cursor-pointer"
              >
                <option value="all">Cuisine: All</option>
                {cuisinesList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/* Price Tier in INR */}
              {viewType === 'dishes' ? (
                <select
                  value={priceTier}
                  onChange={(e) => setPriceTier(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-[#EAE6DF] rounded-full font-medium text-[#44403C] focus:outline-none cursor-pointer"
                >
                  <option value="all">Price: All</option>
                  <option value="under-250">Under ₹250</option>
                  <option value="250-400">₹250 - ₹400</option>
                  <option value="above-400">Above ₹400</option>
                </select>
              ) : (
                <select
                  value={priceTier}
                  onChange={(e) => setPriceTier(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-[#EAE6DF] rounded-full font-medium text-[#44403C] focus:outline-none cursor-pointer"
                >
                  <option value="all">Cost for two: All</option>
                  <option value="under-500">Under ₹500</option>
                  <option value="500-750">₹500 - ₹750</option>
                  <option value="above-750">Above ₹750</option>
                </select>
              )}
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#78716C] font-semibold">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span>Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-white border border-[#EAE6DF] rounded-full font-semibold text-[#1C1917] focus:outline-none cursor-pointer"
              >
                <option value="rating">Rating (Highest)</option>
                {viewType === 'dishes' && <option value="price_asc">Price: Low to High</option>}
                {viewType === 'dishes' && <option value="price_desc">Price: High to Low</option>}
                {viewType === 'dishes' && <option value="time">Prep Time</option>}
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-[#C04E26] hover:underline px-2 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {viewType === 'dishes' ? (
          <div>
            <div className="flex justify-between items-center mb-4 px-1">
              <h2 className="text-base font-bold text-[#1C1917] font-display">
                Dishes Available ({filteredDishes.length})
              </h2>
            </div>

            {filteredDishes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE6DF] max-w-md mx-auto my-8">
                <div className="text-4xl mb-3">🍛</div>
                <h3 className="font-bold text-[#1C1917] text-lg font-display">No dishes matched</h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Try clearing some filters or searching with another keyword.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 px-4 py-2 bg-[#C04E26] text-white text-xs font-semibold rounded-xl hover:bg-[#9E3C1B]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    onOpenDetails={onOpenDishDetails}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4 px-1">
              <h2 className="text-base font-bold text-[#1C1917] font-display">
                Kitchens Available ({filteredRestaurants.length})
              </h2>
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE6DF] max-w-md mx-auto my-8">
                <div className="text-4xl mb-3">🏪</div>
                <h3 className="font-bold text-[#1C1917] text-lg font-display">No kitchens found</h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Try adjusting the rating or cuisine filter options.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 px-4 py-2 bg-[#C04E26] text-white text-xs font-semibold rounded-xl hover:bg-[#9E3C1B]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onSelect={onSelectRestaurant}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
