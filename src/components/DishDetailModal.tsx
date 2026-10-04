import React, { useState } from 'react';
import { X, Star, Heart, Clock, Flame, Plus, Minus, Check } from 'lucide-react';
import { Dish } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [addedNotice, setAddedNotice] = useState(false);

  if (!dish) return null;

  const isWishlisted = isInWishlist(dish.id);

  let additionalCost = 0;
  if (dish.customizations) {
    dish.customizations.forEach((group) => {
      const selectedLabel = selectedOptions[group.name];
      if (selectedLabel) {
        const option = group.options.find((opt) => opt.label === selectedLabel);
        if (option) additionalCost += option.price;
      }
    });
  }

  const unitPrice = dish.price + additionalCost;
  const totalPrice = unitPrice * quantity;

  const handleOptionSelect = (groupName: string, optionLabel: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupName]: optionLabel,
    }));
  };

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedOptions);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col border border-[#EAE6DF]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1C1917]/70 hover:bg-[#1C1917] text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Header */}
        <div className="relative h-60 sm:h-72 w-full bg-[#EAE6DF] shrink-0">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-xs border flex items-center justify-center bg-white shadow-2xs ${
                dish.isVeg ? 'border-[#2D6A4F]' : 'border-[#B91C1C]'
              }`}
            >
              {dish.isVeg ? (
                <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />
              ) : (
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-[#B91C1C]" />
              )}
            </div>

            <span className="bg-black/50 backdrop-blur-xs text-white text-xs px-2.5 py-0.5 rounded-full font-medium">
              {dish.cuisine}
            </span>
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs text-orange-200 font-semibold uppercase tracking-wider block">
              {dish.restaurantName}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm leading-tight font-display">
              {dish.name}
            </h2>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Rating, Calories, Prep time bar */}
          <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
            <div className="flex items-center gap-1 font-bold text-[#1C1917]">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{dish.rating}</span>
              <span className="text-[#78716C] font-normal">({dish.ratingCount} reviews)</span>
            </div>

            <div className="flex items-center gap-1 text-[#57534E]">
              <Clock className="w-4 h-4 text-[#C04E26]" />
              <span>{dish.prepTimeMinutes} mins prep</span>
            </div>

            {dish.calories && (
              <div className="flex items-center gap-1 text-[#57534E]">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>{dish.calories} kcal</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-[#A8A29E] uppercase tracking-wider mb-1">
              About this preparation
            </h4>
            <p className="text-sm text-[#44403C] leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#A8A29E] uppercase tracking-wider mb-2">
                Ingredients & Sourcing
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs bg-[#FAF8F5] text-[#57534E] px-2.5 py-1 rounded-lg border border-[#EAE6DF]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customizations */}
          {dish.customizations && dish.customizations.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-[#F2EFE9]">
              <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                Accompaniments & Options
              </h4>
              {dish.customizations.map((group) => (
                <div key={group.name} className="space-y-2">
                  <div className="text-xs font-semibold text-[#57534E]">
                    {group.name}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.options.map((opt) => {
                      const isSelected = selectedOptions[group.name] === opt.label;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleOptionSelect(group.name, opt.label)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C04E26] bg-[#FDF4F0] text-[#9A3412] font-semibold shadow-2xs'
                              : 'border-[#EAE6DF] hover:border-[#D6CFC4] text-[#57534E] bg-white'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className="font-mono text-[#78716C]">
                            {opt.price > 0 ? `+₹${opt.price}` : 'Included'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-5 border-t border-[#EAE6DF] bg-[#FAF8F5] flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={() => toggleWishlist(dish)}
            className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
              isWishlisted
                ? 'bg-[#FDF4F0] border-[#E8D4CC] text-[#C04E26]'
                : 'bg-white border-[#EAE6DF] text-[#57534E] hover:text-[#C04E26]'
            }`}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C04E26]' : ''}`} />
          </button>

          {/* Quantity Stepper */}
          <div className="flex items-center bg-white border border-[#EAE6DF] rounded-2xl p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-[#57534E] hover:bg-[#FAF8F5] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-[#1C1917] tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-[#57534E] hover:bg-[#FAF8F5] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-between bg-[#C04E26] hover:bg-[#9E3C1B] text-white font-bold px-5 py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer active:scale-98"
          >
            {addedNotice ? (
              <span className="flex items-center justify-center w-full gap-2">
                <Check className="w-5 h-5" /> Added to Order!
              </span>
            ) : (
              <>
                <span>Add to Cart</span>
                <span className="tabular-nums">₹{totalPrice}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
