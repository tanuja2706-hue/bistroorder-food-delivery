import React from 'react';
import { Star, Plus, Minus, Heart, Flame } from 'lucide-react';
import { Dish } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface DishCardProps {
  dish: Dish;
  onOpenDetails: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onOpenDetails }) => {
  const { items, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const cartItem = items.find((item) => item.dish.id === dish.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isInWishlist(dish.id);

  return (
    <div className="group bg-white rounded-3xl border border-[#EAE6DF] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Clickable Image Header */}
      <div className="relative">
        <div
          onClick={() => onOpenDetails(dish)}
          className="relative h-48 w-full bg-[#EAE6DF] overflow-hidden cursor-pointer"
        >
          <img
            src={dish.imageUrl}
            alt={dish.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            {/* Indian Vegetarian / Non-Vegetarian Food Safety Mark */}
            <div
              className={`w-4 h-4 rounded-xs border flex items-center justify-center bg-white shadow-2xs ${
                dish.isVeg ? 'border-[#2D6A4F]' : 'border-[#B91C1C]'
              }`}
              title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              {dish.isVeg ? (
                <div className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
              ) : (
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-[#B91C1C]" />
              )}
            </div>

            {dish.isBestseller && (
              <span className="bg-[#C04E26] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                Bestseller
              </span>
            )}

            {dish.isSpicy && (
              <span className="bg-amber-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-2xs flex items-center gap-0.5">
                <Flame className="w-3 h-3" />
                <span>Spicy</span>
              </span>
            )}
          </div>

          {/* Restaurant name & prep time bottom of image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="font-semibold text-white drop-shadow-sm truncate max-w-[150px]">
              {dish.restaurantName}
            </span>
            <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-medium">
              {dish.prepTimeMinutes} mins
            </span>
          </div>
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(dish);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#FDF4F0] text-[#C04E26] shadow-xs'
              : 'bg-white/80 backdrop-blur-xs text-[#57534E] hover:text-[#C04E26] hover:bg-white shadow-2xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save dish'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C04E26]' : ''}`} />
        </button>
      </div>

      {/* Dish Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Cuisine & Rating */}
          <div className="flex items-center justify-between text-xs text-[#78716C] mb-1">
            <span className="font-medium text-[#78716C]">{dish.cuisine}</span>
            <div className="flex items-center gap-1 font-bold text-[#1C1917]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{dish.rating}</span>
              <span className="text-[#A8A29E] font-normal text-[11px]">({dish.ratingCount})</span>
            </div>
          </div>

          {/* Dish Name */}
          <h3
            onClick={() => onOpenDetails(dish)}
            className="font-bold text-[#1C1917] text-base hover:text-[#C04E26] transition-colors line-clamp-1 cursor-pointer font-display"
          >
            {dish.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#78716C] mt-1 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Price & Add to Cart Stepper */}
        <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#1C1917] tabular-nums">
                ₹{dish.price}
              </span>
              {dish.originalPrice && (
                <span className="text-xs text-[#A8A29E] line-through tabular-nums">
                  ₹{dish.originalPrice}
                </span>
              )}
            </div>
            {dish.calories && (
              <span className="text-[10px] text-[#A8A29E] block">{dish.calories} kcal</span>
            )}
          </div>

          {/* Add Button or Quantity Stepper */}
          {quantity > 0 ? (
            <div className="flex items-center bg-[#FDF4F0] border border-[#C04E26]/30 rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => updateQuantity(dish.id, quantity - 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#C04E26] hover:bg-[#FDF4F0] transition-colors cursor-pointer shadow-2xs"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-7 text-center text-xs font-bold text-[#C04E26] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(dish.id, quantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#C04E26] text-white hover:bg-[#9E3C1B] transition-colors cursor-pointer shadow-2xs"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(dish, 1)}
              className="flex items-center gap-1.5 bg-[#1C1917] hover:bg-[#C04E26] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
