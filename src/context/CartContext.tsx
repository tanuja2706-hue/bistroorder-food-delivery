import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Dish, Coupon } from '../types';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface CartContextType {
  items: CartItem[];
  addToCart: (dish: Dish, quantity?: number, selectedOptions?: Record<string, string>) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  totalItemsCount: number;
  currentRestaurantId: string | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bistroorder_inr_cart_v2';
const COUPON_STORAGE_KEY = 'bistroorder_inr_coupon_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      return AVAILABLE_COUPONS.find((c) => c.code === parsed.code) || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [appliedCoupon]);

  const currentRestaurantId = items.length > 0 ? items[0].dish.restaurantId : null;

  const addToCart = (dish: Dish, quantity = 1, selectedOptions?: Record<string, string>) => {
    setItems((prevItems) => {
      // If adding from another restaurant, reset cart or replace
      if (prevItems.length > 0 && prevItems[0].dish.restaurantId !== dish.restaurantId) {
        return [{ dish, quantity, selectedOptions }];
      }

      const existingIndex = prevItems.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selectedOptions: selectedOptions || next[existingIndex].selectedOptions,
        };
        return next;
      }

      return [...prevItems, { dish, quantity, selectedOptions }];
    });
  };

  const removeFromCart = (dishId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = items.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);

  // Delivery fee logic: standard ₹40, free if subtotal >= ₹499 or coupon FREEDEL
  let standardDeliveryFee = subtotal > 0 ? (subtotal >= 499 ? 0 : 40) : 0;
  if (appliedCoupon?.code === 'FREEDEL') {
    standardDeliveryFee = 0;
  }
  const deliveryFee = standardDeliveryFee;

  // Taxes: standard 5% GST for restaurant orders in India
  const taxes = Math.round(subtotal * 0.05);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      discount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else if (appliedCoupon.code !== 'FREEDEL') {
      discount = appliedCoupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal + deliveryFee + taxes - discount);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const formatted = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === formatted);

    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try FEAST150, BISTRO20 or FREEDEL' };
    }

    if (subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Add ₹${found.minOrderValue - subtotal} more to apply ${found.code}`,
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        deliveryFee,
        taxes,
        discount,
        total,
        totalItemsCount,
        currentRestaurantId,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
