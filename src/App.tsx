import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryBar } from './components/CategoryBar';
import { FeaturedCollections } from './components/FeaturedCollections';
import { PopularRestaurants } from './components/PopularRestaurants';
import { TrendingDishes } from './components/TrendingDishes';
import { PromoBanner } from './components/PromoBanner';
import { RecommendedSection } from './components/RecommendedSection';
import { RestaurantDetailView } from './components/RestaurantDetailView';
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { WishlistView } from './components/WishlistView';
import { ExploreView } from './components/ExploreView';
import { Footer } from './components/Footer';
import { AccountModal } from './components/AccountModal';

import { RESTAURANTS, DISHES } from './data/mockData';
import { Restaurant, Dish, CategoryId, Order } from './types';

function MainApp() {
  const [currentView, setCurrentView] = useState<'home' | 'restaurant_detail' | 'order_tracking' | 'wishlist' | 'explore'>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedDishForModal, setSelectedDishForModal] = useState<Dish | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedCuisine, setSelectedCuisine] = useState<string | 'all'>('all');

  // Modals
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>(undefined);

  const { setIsCartOpen } = useCart();

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedRestaurant(null);
    setSearchQuery('');
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && currentView !== 'explore') {
      setCurrentView('explore');
    }
  };

  const handleSelectCategory = (cat: CategoryId | 'all') => {
    setSelectedCategory(cat);
    if (cat !== 'all') {
      setCurrentView('explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (colId: string) => {
    setCurrentView('explore');
    if (colId === 'under-399') {
      // Directs to explore view
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('restaurant_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDishDetails = (dish: Dish) => {
    setSelectedDishForModal(dish);
  };

  const handleProceedToCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setConfirmedOrder(order);
  };

  const handleTrackOrder = (order: Order) => {
    setConfirmedOrder(null);
    setTrackingOrderId(order.id);
    setCurrentView('order_tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWishlist = () => {
    setCurrentView('wishlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans text-[#1C1917] selection:bg-[#FDF4F0] selection:text-[#C04E26]">
      {/* 1. TOP HEADER (Clean single row header) */}
      <Header
        onSearchChange={handleSearchChange}
        searchQuery={searchQuery}
        onOpenAccount={() => setIsAccountModalOpen(true)}
        onOpenWishlist={handleOpenWishlist}
        onNavigateHome={handleNavigateHome}
        onNavigateExplore={() => setCurrentView('explore')}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 2. HERO SECTION ("What's cooking today?", large image, 2 floating cards) */}
            <HeroBanner
              onExploreRestaurants={() => {
                const el = document.getElementById('places-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onBrowseDishes={() => {
                const el = document.getElementById('trending-dishes-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 3. CUISINE DISCOVERY ("Pick your craving" with circular food images) */}
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* 4. FEATURED COLLECTIONS (3 large editorial cards: Comfort Food, Weekend Favourites, Under ₹399) */}
            <FeaturedCollections
              onSelectCollection={handleSelectCollection}
            />

            {/* 5. RESTAURANTS SECTION ("Places worth ordering from" in 3-column grid) */}
            <div id="places-section">
              <PopularRestaurants
                restaurants={RESTAURANTS}
                onSelectRestaurant={handleSelectRestaurant}
                onViewAllRestaurants={() => {
                  setCurrentView('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* 6. DISH DISCOVERY ("Trending dishes" with INR prices) */}
            <div id="trending-dishes-section">
              <TrendingDishes
                dishes={DISHES}
                onOpenDetails={handleOpenDishDetails}
                onExploreMore={() => {
                  setCurrentView('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* 7. SPECIAL OFFERS ("Good food, better prices." with 3 offers) */}
            <PromoBanner />

            {/* 8. PERSONALIZED SECTION ("Picked for your table" with 4 dishes) */}
            <RecommendedSection
              dishes={DISHES}
              onOpenDetails={handleOpenDishDetails}
              onExploreMore={() => {
                setCurrentView('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {currentView === 'restaurant_detail' && selectedRestaurant && (
          <RestaurantDetailView
            restaurant={selectedRestaurant}
            dishes={DISHES}
            onBack={handleNavigateHome}
            onOpenDishDetails={handleOpenDishDetails}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            initialSearchQuery={searchQuery}
            initialCategory={selectedCategory}
            initialCuisine={selectedCuisine}
            dishes={DISHES}
            restaurants={RESTAURANTS}
            onOpenDishDetails={handleOpenDishDetails}
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}

        {currentView === 'wishlist' && (
          <WishlistView
            onBack={handleNavigateHome}
            onOpenDishDetails={handleOpenDishDetails}
            onExploreFood={() => {
              setCurrentView('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'order_tracking' && (
          <OrderTrackingView
            orderId={trackingOrderId}
            onBack={handleNavigateHome}
          />
        )}
      </main>

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={handleProceedToCheckout}
        onExploreFood={() => {
          setCurrentView('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
      />

      {/* Checkout Flow Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onTrackOrder={handleTrackOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Account & Orders Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onTrackOrder={handleTrackOrder}
        onOpenWishlist={() => {
          setIsAccountModalOpen(false);
          handleOpenWishlist();
        }}
      />

      {/* 9. ORIGINAL PROFESSIONAL FOOTER */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onNavigateHome={handleNavigateHome}
        onNavigateRestaurants={() => {
          setCurrentView('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <OrderProvider>
          <MainApp />
        </OrderProvider>
      </CartProvider>
    </WishlistProvider>
  );
}
