import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { DeliveryAddress, Order } from '../types';
import { INITIAL_ADDRESSES } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { items, subtotal, deliveryFee, taxes, discount, total, appliedCoupon, clearCart } = useCart();
  const { placeOrder } = useOrders();

  // Address state
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(INITIAL_ADDRESSES[0].id);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newApartment, setNewApartment] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  // Contact info
  const [contactName, setContactName] = useState('Aarav Mehta');
  const [contactPhone, setContactPhone] = useState('+91 98201 44520');
  const [contactEmail, setContactEmail] = useState('aarav.mehta@example.in');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardHolder, setCardHolder] = useState('AARAV MEHTA');
  const [upiId, setUpiId] = useState('aaravmehta@oksbi');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || items.length === 0) return null;

  const currentAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newCity.trim() || !newPostalCode.trim()) {
      setErrorMessage('Please fill in street address, city, and pincode.');
      return;
    }

    const newAddr: DeliveryAddress = {
      id: `addr-${Date.now()}`,
      title: 'New Address',
      street: newStreet,
      apartment: newApartment,
      city: newCity,
      postalCode: newPostalCode,
      instructions: newInstructions,
    };

    setAddresses([...addresses, newAddr]);
    setSelectedAddressId(newAddr.id);
    setIsAddingNewAddress(false);
    setNewStreet('');
    setNewApartment('');
    setNewCity('');
    setNewPostalCode('');
    setNewInstructions('');
    setErrorMessage('');
  };

  const handlePlaceOrder = () => {
    if (!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) {
      setErrorMessage('Please provide your name, phone number, and email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const order = placeOrder({
        items,
        subtotal,
        deliveryFee,
        taxes,
        discount,
        appliedCoupon: appliedCoupon?.code,
        total,
        restaurantId: items[0].dish.restaurantId,
        restaurantName: items[0].dish.restaurantName,
        deliveryAddress: currentAddress,
        contactName,
        contactPhone,
        contactEmail,
        paymentMethod,
      });

      clearCart();
      setIsSubmitting(false);
      onClose();
      onOrderSuccess(order);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl z-10 my-6 max-h-[92vh] flex flex-col overflow-hidden border border-[#EAE6DF]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE6DF] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <h2 className="text-xl font-bold text-[#1C1917] font-display">Confirm & Pay</h2>
            <p className="text-xs text-[#78716C] mt-0.5">
              Ordering from <strong className="text-[#1C1917]">{items[0]?.dish.restaurantName}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EFE9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-[#FEF2F2] text-[#B91C1C] text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Section 1: Delivery Address */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1C1917] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C04E26]" />
                <span>Delivery Address</span>
              </h3>
              {!isAddingNewAddress && (
                <button
                  type="button"
                  onClick={() => setIsAddingNewAddress(true)}
                  className="text-xs font-semibold text-[#C04E26] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              )}
            </div>

            {isAddingNewAddress ? (
              <form onSubmit={handleAddNewAddress} className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE6DF] space-y-3">
                <div className="font-semibold text-xs text-[#1C1917]">Add Delivery Location</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="House / Flat / Street *"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    className="p-2 text-xs border rounded-xl bg-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Apartment / Landmark (optional)"
                    value={newApartment}
                    onChange={(e) => setNewApartment(e.target.value)}
                    className="p-2 text-xs border rounded-xl bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Area / City (e.g. Indiranagar, Bengaluru) *"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="p-2 text-xs border rounded-xl bg-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pincode *"
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    className="p-2 text-xs border rounded-xl bg-white"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Delivery instructions (e.g. Leave at door, call on gate)"
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full p-2 text-xs border rounded-xl bg-white"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="px-3 py-1.5 text-xs text-[#57534E] hover:bg-[#F2EFE9] rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs bg-[#C04E26] text-white font-semibold rounded-xl hover:bg-[#9E3C1B]"
                  >
                    Save & Deliver Here
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C04E26] bg-[#FDF4F0] shadow-2xs'
                          : 'border-[#EAE6DF] bg-white hover:border-[#D6CFC4]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-[#1C1917]">{addr.title}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C04E26]" />}
                      </div>
                      <p className="text-xs text-[#57534E] mt-1">{addr.street}</p>
                      <p className="text-[11px] text-[#78716C]">
                        {addr.city} · {addr.postalCode}
                      </p>
                      {addr.instructions && (
                        <p className="text-[10px] text-[#A8A29E] mt-1 italic">
                          "{addr.instructions}"
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Contact Information */}
          <div>
            <h3 className="text-sm font-bold text-[#1C1917] mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#C04E26]" />
              <span>Contact Details</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-[#78716C] mb-1">Your Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#78716C] mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#78716C] mb-1">Email Invoice</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C04E26]/20 focus:border-[#C04E26]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div>
            <h3 className="text-sm font-bold text-[#1C1917] mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#C04E26]" />
              <span>Payment Option</span>
            </h3>

            {/* Payment Tabs: UPI, Card, Cash on Delivery */}
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-[#C04E26] bg-[#FDF4F0] text-[#9A3412] font-bold shadow-2xs'
                    : 'border-[#EAE6DF] hover:bg-[#FAF8F5] text-[#57534E]'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-[#C04E26]" />
                <span className="text-xs block">UPI / Instant</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#C04E26] bg-[#FDF4F0] text-[#9A3412] font-bold shadow-2xs'
                    : 'border-[#EAE6DF] hover:bg-[#FAF8F5] text-[#57534E]'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#C04E26]" />
                <span className="text-xs block">Cards / RuPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#C04E26] bg-[#FDF4F0] text-[#9A3412] font-bold shadow-2xs'
                    : 'border-[#EAE6DF] hover:bg-[#FAF8F5] text-[#57534E]'
                }`}
              >
                <Banknote className="w-5 h-5 mx-auto mb-1 text-[#2D6A4F]" />
                <span className="text-xs block">Pay on Delivery</span>
              </button>
            </div>

            {/* UPI Details */}
            {paymentMethod === 'upi' && (
              <div className="bg-[#FAF8F5] border border-[#EAE6DF] p-4 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
                  <span>Fast UPI Payment</span>
                  <span className="text-[10px] text-[#2D6A4F] bg-[#F3F7F4] px-2 py-0.5 rounded font-mono">
                    GPay / PhonePe / Paytm / BHIM
                  </span>
                </div>
                <div>
                  <label className="text-[11px] text-[#78716C] block mb-1">UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E5E0D8] rounded-xl text-xs font-mono"
                    placeholder="mobilenumber@upi"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="bg-[#1C1917] text-white p-4 rounded-2xl space-y-3 shadow-md">
                <div className="flex justify-between items-center text-xs text-stone-400">
                  <span>Debit / Credit Card</span>
                  <span className="font-mono text-orange-200">RuPay / Visa / MasterCard</span>
                </div>
                <div>
                  <label className="text-[10px] text-stone-400 block uppercase">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#292524] border border-[#44403C] rounded-xl p-2 text-sm font-mono text-white focus:outline-none focus:border-[#C04E26]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="text-[10px] text-stone-400 block uppercase">Cardholder</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-[#292524] border border-[#44403C] rounded-xl p-2 text-xs uppercase text-white focus:outline-none focus:border-[#C04E26]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-400 block uppercase">Expires</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-[#292524] border border-[#44403C] rounded-xl p-2 text-xs font-mono text-white focus:outline-none focus:border-[#C04E26]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-[#F3F7F4] border border-[#D3E2D8] p-4 rounded-2xl text-xs text-[#2D6A4F] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Pay with Cash or UPI QR on Delivery</span>
                </div>
                <p className="text-[#2D6A4F]/80 text-[11px]">
                  Keep exact change ready or scan the delivery executive’s dynamic UPI QR at your door.
                </p>
              </div>
            )}
          </div>

          {/* Section 4: Bill Summary Itemized */}
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE6DF] space-y-2 text-xs">
            <h4 className="font-bold text-[#1C1917] mb-2 font-display">Order Items ({items.length})</h4>
            {items.map(({ dish, quantity }) => (
              <div key={dish.id} className="flex justify-between text-[#57534E]">
                <span className="truncate max-w-[280px]">
                  {quantity}x {dish.name}
                </span>
                <span className="font-semibold text-[#1C1917] tabular-nums">
                  ₹{dish.price * quantity}
                </span>
              </div>
            ))}

            <div className="pt-2 border-t border-[#EAE6DF] space-y-1 text-[#57534E]">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span className="font-semibold text-[#1C1917] tabular-nums">
                  ₹{subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Partner Fee</span>
                <span className="font-semibold text-[#1C1917] tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-semibold text-[#1C1917] tabular-nums">
                  ₹{taxes}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2D6A4F] font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="tabular-nums">-₹{discount}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#EAE6DF] flex justify-between items-baseline font-bold text-sm text-[#1C1917]">
              <span>To Pay</span>
              <span className="text-base text-[#C04E26] tabular-nums font-display">
                ₹{total}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Place Order Button */}
        <div className="p-4 sm:p-5 border-t border-[#EAE6DF] bg-[#FAF8F5] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
            <span>Secure checkout</span>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-[#C04E26] hover:bg-[#9E3C1B] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm transition-all cursor-pointer active:scale-98"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Placing Order...</span>
            ) : (
              <>
                <span>Place Order · ₹{total}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
