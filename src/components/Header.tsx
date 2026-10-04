import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  X,
  Menu as MenuIcon,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onNavigateHome: () => void;
  onNavigateExplore: () => void;
}

const INDIAN_LOCATIONS = [
  { id: 'loc-1', name: 'Indiranagar, Bengaluru', area: '12th Main Road & 100ft Rd' },
  { id: 'loc-2', name: 'Bandra West, Mumbai', area: 'Pali Hill & Hill Road' },
  { id: 'loc-3', name: 'Hauz Khas, New Delhi', area: 'Hauz Khas Enclave & Village' },
  { id: 'loc-4', name: 'Koregaon Park, Pune', area: 'North Main Road & Lane 7' },
  { id: 'loc-5', name: 'Jubilee Hills, Hyderabad', area: 'Road No. 36 & 45' },
];

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  searchQuery,
  onOpenAccount,
  onOpenWishlist,
  onNavigateHome,
  onNavigateExplore,
}) => {
  const { totalItemsCount, subtotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const [selectedLocation, setSelectedLocation] = useState(INDIAN_LOCATIONS[0]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE6DF] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-6">
          {/* Brand & Location Lockup */}
          <div className="flex items-center gap-5 sm:gap-7 shrink-0">
            <button
              onClick={onNavigateHome}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#C04E26] text-white flex items-center justify-center font-bold text-xl shadow-xs group-hover:bg-[#9E3C1B] transition-colors">
                  B
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#C04E26] transition-colors font-display">
                    BistroOrder
                  </div>
                  <div className="text-[10px] font-medium text-[#78716C] tracking-wide hidden sm:block">
                    Good food. Delivered your way.
                  </div>
                </div>
              </div>
            </button>

            {/* Location Selector ("Choose your location") */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E5E0D8] bg-white/70 hover:bg-white hover:border-[#C04E26]/40 transition-colors text-left text-xs cursor-pointer shadow-2xs"
              >
                <MapPin className="w-4 h-4 text-[#C04E26] shrink-0" />
                <div className="max-w-[170px] truncate">
                  <span className="text-[10px] text-[#78716C] block leading-none">
                    Choose your location
                  </span>
                  <span className="font-semibold text-[#1C1917] block truncate mt-0.5">
                    {selectedLocation.name}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
              </button>

              {isLocationDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLocationDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#EAE6DF] py-2.5 z-20">
                    <div className="px-3.5 py-1 text-[11px] font-bold text-[#A8A29E] uppercase tracking-wider">
                      Select Delivery Area
                    </div>
                    {INDIAN_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(loc);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-start justify-between hover:bg-[#FDF4F0] transition-colors ${
                          selectedLocation.id === loc.id
                            ? 'bg-[#FDF4F0] font-semibold text-[#C04E26]'
                            : 'text-[#1C1917]'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-[#1C1917]">{loc.name}</div>
                          <div className="text-[#78716C] text-[11px] mt-0.5">{loc.area}</div>
                        </div>
                        {selectedLocation.id === loc.id && (
                          <Check className="w-4 h-4 text-[#C04E26] mt-0.5 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Large Search Bar: "Search dishes, restaurants or cuisines" */}
          <div className="flex-1 max-w-lg hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
              <input
                type="text"
                placeholder="Search dishes, restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E5E0D8] rounded-xl text-sm placeholder:text-[#A8A29E] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26] transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1C1917] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons: Wishlist, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Wishlist */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl text-[#44403C] hover:text-[#C04E26] hover:bg-white border border-transparent hover:border-[#EAE6DF] transition-all cursor-pointer"
              title="Saved Dishes"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#C04E26] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              type="button"
              onClick={onOpenAccount}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl text-[#44403C] hover:text-[#C04E26] hover:bg-white border border-transparent hover:border-[#EAE6DF] transition-all text-xs sm:text-sm font-medium cursor-pointer"
              title="Account"
            >
              <User className="w-4 h-4 text-[#78716C]" />
              <span className="hidden sm:inline font-semibold">Account</span>
            </button>

            {/* Cart with INR total */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#1C1917] text-white hover:bg-[#C04E26] px-3.5 sm:px-4 py-2.5 rounded-xl transition-all font-semibold text-xs sm:text-sm shadow-xs cursor-pointer active:scale-98"
              aria-label="Open Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C04E26] text-white text-[9px] font-bold px-1.2 py-0.1 rounded-full border border-[#1C1917]">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="tabular-nums font-bold">
                {subtotal > 0 ? `₹${subtotal}` : 'Cart'}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-xl text-[#1C1917] hover:bg-white border border-[#EAE6DF]"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar & Location bar */}
        <div className="pb-3.5 lg:hidden space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type="text"
              placeholder="Search dishes, restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-[#E5E0D8] rounded-xl text-xs placeholder:text-[#A8A29E] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A8A29E]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-[#78716C] px-1 md:hidden">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C04E26]" />
              <span className="font-medium text-[#1C1917]">{selectedLocation.name}</span>
            </div>
            <button
              onClick={onNavigateExplore}
              className="text-[#C04E26] font-semibold hover:underline"
            >
              Explore all
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
