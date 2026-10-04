import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Tag,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreFood: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onExploreFood,
}) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    taxes,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (code: string) => {
    const res = applyCoupon(code);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onProceedToCheckout();
  };

  const freeDeliveryDelta = 499 - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EAE6DF]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#EAE6DF] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#FDF4F0] text-[#C04E26] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1C1917] font-display">
                  Your Order
                </h2>
                {items.length > 0 && (
                  <p className="text-xs text-[#78716C]">
                    From {items[0].dish.restaurantName}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery progress bar: Free delivery above ₹499 */}
          {items.length > 0 && (
            <div className="px-5 py-3 bg-[#FAF6ED] border-b border-[#EBDDC3] text-xs">
              {freeDeliveryDelta > 0 && appliedCoupon?.code !== 'FREEDEL' ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[#854D0E] font-medium">
                    <span>Add <strong>₹{freeDeliveryDelta}</strong> more for free delivery</span>
                    <span>₹{subtotal} / ₹499</span>
                  </div>
                  <div className="w-full bg-[#E5D7BE] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#C04E26] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#2D6A4F] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                  <span>You've unlocked FREE Doorstep Delivery!</span>
                </div>
              )}
            </div>
          )}

          {/* Drawer Body: Cart Items or Empty State */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-[#FDF4F0] text-[#C04E26] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-[#1C1917] font-display">Your cart is empty</h3>
                <p className="text-xs text-[#78716C] mt-1 max-w-xs leading-relaxed">
                  Discover mouthwatering tandoori starters, slow-cooked curries and fresh bakes.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreFood();
                  }}
                  className="mt-6 bg-[#C04E26] hover:bg-[#9E3C1B] text-white font-bold text-xs px-6 py-3 rounded-2xl transition-colors shadow-sm cursor-pointer"
                >
                  Explore Dishes
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {items.map(({ dish, quantity, selectedOptions }) => (
                    <div
                      key={dish.id}
                      className="flex items-start justify-between gap-3 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#EAE6DF]"
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        {/* Veg / Non-veg symbol */}
                        <div
                          className={`w-3.5 h-3.5 rounded-xs border mt-1 shrink-0 flex items-center justify-center bg-white ${
                            dish.isVeg ? 'border-[#2D6A4F]' : 'border-[#B91C1C]'
                          }`}
                        >
                          {dish.isVeg ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                          ) : (
                            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-[#B91C1C]" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1C1917] truncate font-display">
                            {dish.name}
                          </h4>
                          <span className="text-xs text-[#57534E] font-semibold tabular-nums block mt-0.5">
                            ₹{dish.price}
                          </span>

                          {selectedOptions && Object.keys(selectedOptions).length > 0 && (
                            <div className="text-[10px] text-[#78716C] mt-1 space-y-0.5">
                              {Object.entries(selectedOptions).map(([key, val]) => (
                                <div key={key}>
                                  {key}: {val}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center bg-white border border-[#EAE6DF] rounded-xl p-0.5 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(dish.id, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded text-[#57534E] hover:bg-[#FAF8F5] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#1C1917] tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(dish.id, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-[#C04E26] text-white hover:bg-[#9E3C1B] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(dish.id)}
                          className="p-1.5 text-[#A8A29E] hover:text-[#B91C1C] transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2 border-t border-[#EAE6DF] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#C04E26]" />
                      <span>Coupons & Offers</span>
                    </span>
                    {appliedCoupon && (
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-[#B91C1C] hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {appliedCoupon ? (
                    <div className="p-3 bg-[#F3F7F4] border border-[#D3E2D8] rounded-2xl flex items-center justify-between text-xs text-[#2D6A4F]">
                      <div>
                        <div className="font-bold flex items-center gap-1">
                          <span>{appliedCoupon.code} Applied</span>
                        </div>
                        <div className="text-[11px] text-[#2D6A4F]/80 mt-0.5">
                          {appliedCoupon.title}
                        </div>
                      </div>
                      <span className="font-bold text-[#2D6A4F]">
                        -₹{discount}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. FEAST150)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl text-xs uppercase placeholder:normal-case font-mono focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon(couponInput)}
                        className="px-4 py-2 bg-[#1C1917] hover:bg-[#C04E26] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {couponFeedback && (
                    <div
                      className={`text-xs p-2 rounded-xl ${
                        couponFeedback.success
                          ? 'bg-[#F3F7F4] text-[#2D6A4F] font-medium'
                          : 'bg-[#FEF2F2] text-[#B91C1C]'
                      }`}
                    >
                      {couponFeedback.message}
                    </div>
                  )}

                  {/* Available coupons list */}
                  {!appliedCoupon && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[11px] text-[#A8A29E] font-medium block">
                        Available Coupons:
                      </span>
                      <div className="space-y-1">
                        {AVAILABLE_COUPONS.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => handleApplyCoupon(c.code)}
                            className="p-2 border border-dashed border-[#D6CFC4] hover:border-[#C04E26] rounded-xl flex items-center justify-between text-xs cursor-pointer hover:bg-[#FDF4F0] transition-colors"
                          >
                            <div>
                              <span className="font-bold font-mono text-[#1C1917]">{c.code}</span>
                              <span className="text-[#78716C] text-[10px] block">{c.description}</span>
                            </div>
                            <span className="text-[#C04E26] font-bold text-[11px]">Apply</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bill Breakdown in INR */}
                <div className="pt-3 border-t border-[#EAE6DF] space-y-2 text-xs">
                  <div className="flex justify-between text-[#57534E]">
                    <span>Subtotal</span>
                    <span className="font-semibold tabular-nums text-[#1C1917]">
                      ₹{subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#57534E]">
                    <span className="flex items-center gap-1">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 && (
                        <span className="text-[10px] text-[#2D6A4F] font-bold bg-[#F3F7F4] px-1.5 py-0.2 rounded">
                          FREE
                        </span>
                      )}
                    </span>
                    <span className="font-semibold tabular-nums text-[#1C1917]">
                      {deliveryFee === 0 ? '₹0' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#57534E]">
                    <span>Taxes & Restaurant GST (5%)</span>
                    <span className="font-semibold tabular-nums text-[#1C1917]">
                      ₹{taxes}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#2D6A4F] font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-bold tabular-nums">-₹{discount}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#EAE6DF] flex justify-between items-baseline text-sm font-bold text-[#1C1917]">
                    <span>Total Amount</span>
                    <span className="text-lg text-[#C04E26] tabular-nums font-display">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EAE6DF] bg-[#FAF8F5]">
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-between bg-[#C04E26] hover:bg-[#9E3C1B] text-white font-bold p-3.5 rounded-2xl shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider block font-normal text-orange-200">
                    Proceed to Pay
                  </span>
                  <span className="text-base tabular-nums font-bold">₹{total}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
