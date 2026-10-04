import React, { useState } from 'react';
import {
  X,
  User,
  ShoppingBag,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  Repeat,
  Heart,
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { INITIAL_ADDRESSES } from '../data/mockData';
import { Order } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: (order: Order) => void;
  onOpenWishlist: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onTrackOrder,
  onOpenWishlist,
}) => {
  const { orders } = useOrders();
  const { addToCart, setIsCartOpen } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [userName, setUserName] = useState('Aarav Mehta');
  const [userEmail, setUserEmail] = useState('aarav.mehta@example.in');
  const [userPhone, setUserPhone] = useState('+91 98201 44520');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleReorder = (order: Order) => {
    order.items.forEach(({ dish, quantity, selectedOptions }) => {
      addToCart(dish, quantity, selectedOptions);
    });
    onClose();
    setIsCartOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl z-10 my-6 max-h-[90vh] flex flex-col overflow-hidden border border-[#EAE6DF]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE6DF] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C04E26] text-white font-bold flex items-center justify-center text-base font-display">
              AM
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1C1917] font-display">{userName}</h2>
              <p className="text-xs text-[#78716C]">{userEmail}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EFE9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-[#EAE6DF] px-5 pt-3 gap-6 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#C04E26] text-[#C04E26]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Past Orders ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'addresses'
                ? 'border-[#C04E26] text-[#C04E26]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Saved Addresses
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#C04E26] text-[#C04E26]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Profile & Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#FDF4F0] text-[#C04E26] flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-[#1C1917] text-base font-display">No past orders yet</h3>
                  <p className="text-xs text-[#78716C] mt-1 max-w-xs mx-auto">
                    When you order handcrafted meals, their invoice and live tracking link will be saved here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#FAF8F5] border border-[#EAE6DF] rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between pb-3 border-b border-[#EAE6DF]">
                        <div>
                          <span className="font-bold text-[#1C1917] text-sm block font-display">
                            {order.restaurantName}
                          </span>
                          <span className="text-[11px] text-[#78716C] font-mono">
                            Order #{order.id} · {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                            order.status === 'delivered'
                              ? 'bg-[#F3F7F4] text-[#2D6A4F]'
                              : 'bg-[#FDF4F0] text-[#C04E26] animate-pulse'
                          }`}
                        >
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="text-xs text-[#57534E] space-y-1">
                        {order.items.map(({ dish, quantity }) => (
                          <div key={dish.id} className="flex justify-between">
                            <span>
                              {quantity}x {dish.name}
                            </span>
                            <span className="tabular-nums font-semibold text-[#1C1917]">
                              ₹{dish.price * quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total & Actions */}
                      <div className="pt-2 border-t border-[#EAE6DF] flex items-center justify-between text-xs">
                        <div className="font-bold text-[#1C1917]">
                          Total: <span className="text-[#C04E26] tabular-nums">₹{order.total}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onTrackOrder(order);
                            }}
                            className="px-3 py-1.5 bg-[#C04E26] hover:bg-[#9E3C1B] text-white font-bold rounded-xl transition-colors cursor-pointer"
                          >
                            Track Order
                          </button>

                          <button
                            type="button"
                            onClick={() => handleReorder(order)}
                            className="px-3 py-1.5 bg-white border border-[#D6CFC4] hover:bg-[#FAF8F5] text-[#1C1917] font-semibold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Repeat className="w-3.5 h-3.5" />
                            <span>Re-order</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <h3 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">
                Saved Locations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INITIAL_ADDRESSES.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-3.5 bg-[#FAF8F5] border border-[#EAE6DF] rounded-2xl space-y-1 text-xs"
                  >
                    <div className="flex items-center gap-2 font-bold text-[#1C1917]">
                      <MapPin className="w-4 h-4 text-[#C04E26]" />
                      <span>{addr.title}</span>
                    </div>
                    <div className="text-[#57534E]">{addr.street}</div>
                    <div className="text-[#78716C]">
                      {addr.city} · {addr.postalCode}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {savedSuccess && (
                <div className="p-3 bg-[#F3F7F4] text-[#2D6A4F] text-xs font-semibold rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div>
                <label className="text-xs text-[#57534E] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
                />
              </div>

              <div>
                <label className="text-xs text-[#57534E] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
                />
              </div>

              <div>
                <label className="text-xs text-[#57534E] block mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1C1917] hover:bg-[#C04E26] text-white font-bold text-xs rounded-2xl transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
