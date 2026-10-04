import React from 'react';
import { ArrowLeft, Heart, ShoppingBag, Trash2, Plus, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Dish } from '../types';

interface WishlistViewProps {
  onBack: () => void;
  onOpenDishDetails: (dish: Dish) => void;
  onExploreFood: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  onBack,
  onOpenDishDetails,
  onExploreFood,
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 bg-white rounded-2xl border border-[#EAE6DF] text-[#1C1917] hover:bg-[#FAF8F5] shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1917] flex items-center gap-2.5 font-display">
                <span>My Wishlist</span>
                <span className="text-xs font-bold bg-[#FDF4F0] text-[#C04E26] px-2.5 py-0.5 rounded-full border border-[#E8D4CC]">
                  {wishlist.length}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] mt-0.5">
                Your saved artisanal delicacies ready for your next table order
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid or Empty State */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE6DF] max-w-md mx-auto my-12 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#FDF4F0] text-[#C04E26] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#1C1917] font-display">Your wishlist is empty</h2>
            <p className="text-xs text-[#78716C] mt-1 max-w-xs mx-auto leading-relaxed">
              Save dishes you love by clicking the heart icon on any chef special or restaurant card.
            </p>
            <button
              onClick={onExploreFood}
              className="mt-6 px-6 py-3 bg-[#C04E26] text-white font-bold rounded-2xl text-xs sm:text-sm hover:bg-[#9E3C1B] transition-colors shadow-sm"
            >
              Discover Dishes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl border border-[#EAE6DF] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div
                  className="relative h-44 bg-[#EAE6DF] cursor-pointer"
                  onClick={() => onOpenDishDetails(dish)}
                >
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(dish);
                    }}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-[#B91C1C] hover:bg-white shadow-2xs cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-semibold truncate">
                    {dish.restaurantName}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#78716C] mb-1">
                      <span className="capitalize">{dish.cuisine}</span>
                      <div className="flex items-center gap-1 font-bold text-[#1C1917]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{dish.rating}</span>
                      </div>
                    </div>
                    <h3
                      onClick={() => onOpenDishDetails(dish)}
                      className="font-bold text-[#1C1917] text-sm hover:text-[#C04E26] cursor-pointer line-clamp-1 font-display"
                    >
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#78716C] mt-1 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between">
                    <span className="font-bold text-[#1C1917] tabular-nums text-base">
                      ₹{dish.price}
                    </span>

                    <button
                      type="button"
                      onClick={() => addToCart(dish, 1)}
                      className="flex items-center gap-1.5 bg-[#C04E26] hover:bg-[#9E3C1B] text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
