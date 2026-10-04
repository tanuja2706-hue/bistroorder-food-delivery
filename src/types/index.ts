export type CategoryId =
  | 'pizza'
  | 'burgers'
  | 'biryani'
  | 'north-indian'
  | 'south-indian'
  | 'chinese'
  | 'desserts'
  | 'coffee'
  | 'healthy';

export interface Category {
  id: CategoryId;
  name: string;
  imageUrl: string;
  itemCount: number;
}

export interface DishCustomization {
  name: string;
  options: {
    label: string;
    price: number; // in INR
  }[];
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  originalPrice?: number; // in INR
  restaurantId: string;
  restaurantName: string;
  categoryId: CategoryId;
  cuisine: string;
  rating: number;
  ratingCount: number;
  isVeg: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  isRecommended?: boolean;
  isUnder399?: boolean;
  isComfortFood?: boolean;
  isWeekendSpecial?: boolean;
  calories?: number;
  prepTimeMinutes: number;
  imageUrl: string;
  ingredients?: string[];
  customizations?: DishCustomization[];
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  ratingCount: number;
  cuisines: string[];
  deliveryTimeMinutes: string;
  distanceKm: number;
  priceForTwo: number; // in INR, e.g. 650
  minimumOrder: number; // in INR, e.g. 200
  freeDeliveryThreshold: number; // in INR, e.g. 499
  discountBadge?: string;
  isFeatured?: boolean;
  isOfferNearYou?: boolean;
  isPopular?: boolean;
  imageUrl: string;
  coverImageUrl: string;
  address: string;
  menuCategories: string[];
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedOptions?: Record<string, string>;
  specialInstructions?: string;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number; // in INR
  maxDiscount?: number; // in INR
}

export interface DeliveryAddress {
  id: string;
  title: string;
  street: string;
  apartment?: string;
  city: string;
  postalCode: string;
  instructions?: string;
  isDefault?: boolean;
}

export type OrderStatus = 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  appliedCoupon?: string;
  total: number;
  restaurantId: string;
  restaurantName: string;
  deliveryAddress: DeliveryAddress;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  paymentMethod: 'upi' | 'card' | 'cod';
  status: OrderStatus;
  estimatedDeliveryMinutes: number;
  riderName?: string;
  riderPhone?: string;
}

export interface CollectionCard {
  id: string;
  title: string;
  description: string;
  dishCount: number;
  imageUrl: string;
  tag: string;
}
