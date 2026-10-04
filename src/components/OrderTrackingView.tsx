import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Bike,
  ChefHat,
  ShoppingBag,
  Check,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { useOrders } from '../context/OrderContext';

interface OrderTrackingViewProps {
  orderId?: string;
  onBack: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orderId,
  onBack,
}) => {
  const { orders, activeOrder, updateOrderStatus, advanceOrderStatus } = useOrders();

  const order = orderId
    ? orders.find((o) => o.id === orderId) || activeOrder || orders[0]
    : activeOrder || orders[0];

  const [callAlert, setCallAlert] = useState(false);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FDF4F0] text-[#C04E26] flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#1C1917] font-display">No active order found</h2>
        <p className="text-xs text-[#78716C] mt-1">
          Place a culinary order to track live doorstep delivery progress!
        </p>
        <button
          onClick={onBack}
          className="mt-6 px-5 py-2.5 bg-[#C04E26] text-white font-bold rounded-2xl text-xs hover:bg-[#9E3C1B]"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  const steps: {
    status: OrderStatus;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'Kitchen has accepted your order & preparing ingredients',
      icon: CheckCircle2,
    },
    {
      status: 'preparing',
      title: 'Simmering & Tandoor',
      description: 'Master chefs are slow-simmering and fresh-baking your meal',
      icon: ChefHat,
    },
    {
      status: 'out_for_delivery',
      title: 'Rider on the Way',
      description: 'Insulated hot-bag picked up and heading to your location',
      icon: Bike,
    },
    {
      status: 'delivered',
      title: 'Delivered',
      description: 'Arrived at your door. Bon appétit!',
      icon: Check,
    },
  ];

  const statusOrder: OrderStatus[] = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
  const currentStepIndex = statusOrder.indexOf(order.status);

  const handleSimulateNextStep = () => {
    advanceOrderStatus(order.id);
  };

  const handleSetStatus = (s: OrderStatus) => {
    updateOrderStatus(order.id, s);
  };

  const handleCallRider = () => {
    setCallAlert(true);
    setTimeout(() => setCallAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#1C1917] bg-white border border-[#EAE6DF] px-4 py-2 rounded-2xl shadow-2xs hover:bg-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discovery</span>
          </button>

          <span className="text-xs font-mono font-bold text-[#78716C] bg-[#F2EFE9] px-3 py-1 rounded-full">
            #{order.id}
          </span>
        </div>

        {/* Live Delivery Status Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAE6DF] gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#C04E26] bg-[#FDF4F0] px-3 py-1 rounded-full">
                Live Kitchen Tracker
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] mt-2 tracking-tight font-display">
                {order.status === 'delivered' ? 'Your food has arrived!' : 'On its way to your table'}
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] mt-1">
                Order from <strong className="text-[#1C1917]">{order.restaurantName}</strong>
              </p>
            </div>

            <div className="sm:text-right bg-[#FDF4F0] p-4 rounded-2xl border border-[#E8D4CC]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412] block">
                Estimated Delivery
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C04E26] tabular-nums flex items-center sm:justify-end gap-1.5 mt-0.5 font-display">
                <Clock className="w-6 h-6 animate-pulse" />
                <span>
                  {order.status === 'delivered' ? 'Completed' : `~${order.estimatedDeliveryMinutes} min`}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.status} className="relative flex md:flex-col items-start gap-4 md:gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                        isPassed
                          ? 'bg-[#C04E26] text-white shadow-md shadow-[#C04E26]/20 ring-4 ring-[#C04E26]/15'
                          : 'bg-[#FAF8F5] text-[#A8A29E] border border-[#EAE6DF]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-sm font-bold font-display ${
                            isPassed ? 'text-[#1C1917]' : 'text-[#A8A29E]'
                          }`}
                        >
                          {step.title}
                        </h4>
                        {isCurrent && order.status !== 'delivered' && (
                          <span className="w-2 h-2 rounded-full bg-[#C04E26] animate-ping" />
                        )}
                      </div>
                      <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Simulation Bar */}
            <div className="mt-8 pt-6 border-t border-[#F2EFE9] bg-[#FAF8F5] p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#57534E]">
                <RefreshCw className="w-4 h-4 text-[#C04E26]" />
                <span>Simulate live delivery status changes:</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {statusOrder.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleSetStatus(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                      order.status === st
                        ? 'bg-[#1C1917] text-white shadow-2xs'
                        : 'bg-white border border-[#EAE6DF] text-[#57534E] hover:bg-[#F2EFE9]'
                    }`}
                  >
                    {st.replace(/_/g, ' ')}
                  </button>
                ))}

                {order.status !== 'delivered' && (
                  <button
                    onClick={handleSimulateNextStep}
                    className="px-3.5 py-1.5 bg-[#C04E26] hover:bg-[#9E3C1B] text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Partner Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#EAE6DF]">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE6DF] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FDF4F0] text-[#C04E26] flex items-center justify-center font-bold text-xl">
                  🛵
                </div>
                <div>
                  <span className="text-[10px] text-[#A8A29E] font-bold uppercase tracking-wider block">
                    Assigned Delivery Partner
                  </span>
                  <div className="font-bold text-[#1C1917] text-sm">{order.riderName || 'Vikram Sharma'}</div>
                  <span className="text-xs text-[#78716C]">Verified Partner · 4.9★ (1,200+ deliveries)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCallRider}
                className="flex items-center gap-1.5 bg-white border border-[#E5E0D8] text-[#1C1917] hover:bg-[#FAF8F5] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#C04E26]" />
                <span>Call Partner</span>
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE6DF] flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAE6DF] text-[#1C1917] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#C04E26]" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] text-[#A8A29E] font-bold uppercase tracking-wider block">
                  Delivery Destination
                </span>
                <div className="font-bold text-[#1C1917] mt-0.5">{order.deliveryAddress.street}</div>
                <div className="text-[#78716C]">
                  {order.deliveryAddress.city} · {order.deliveryAddress.postalCode}
                </div>
                {order.deliveryAddress.instructions && (
                  <div className="text-[#57534E] mt-1 italic">
                    "{order.deliveryAddress.instructions}"
                  </div>
                )}
              </div>
            </div>
          </div>

          {callAlert && (
            <div className="mt-4 p-3 bg-[#F3F7F4] border border-[#D3E2D8] text-[#2D6A4F] text-xs rounded-xl text-center font-semibold">
              Connecting via masked secure voice line to delivery partner...
            </div>
          )}
        </div>

        {/* Order Receipt breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs">
          <h3 className="text-base font-bold text-[#1C1917] mb-4 flex items-center gap-2 font-display">
            <ShoppingBag className="w-4 h-4 text-[#C04E26]" />
            <span>Order Summary & Tax Invoice</span>
          </h3>

          <div className="divide-y divide-[#F2EFE9]">
            {order.items.map(({ dish, quantity, selectedOptions }) => (
              <div key={dish.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-[#1C1917]">
                    {quantity}x {dish.name}
                  </div>
                  {selectedOptions && (
                    <div className="text-[#78716C] text-[10px] mt-0.5">
                      {Object.values(selectedOptions).join(', ')}
                    </div>
                  )}
                </div>
                <span className="font-semibold text-[#1C1917] tabular-nums">
                  ₹{dish.price * quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EAE6DF] space-y-1.5 text-xs text-[#57534E]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1C1917] tabular-nums">
                ₹{order.subtotal}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Partner Fee</span>
              <span className="font-semibold text-[#1C1917] tabular-nums">
                {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="font-semibold text-[#1C1917] tabular-nums">
                ₹{order.taxes}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#2D6A4F] font-bold">
                <span>Coupon Discount ({order.appliedCoupon})</span>
                <span className="tabular-nums">-₹{order.discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-[#EAE6DF] flex justify-between items-baseline text-sm font-bold text-[#1C1917]">
              <span>Total Paid</span>
              <span className="text-base text-[#C04E26] tabular-nums font-display">
                ₹{order.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
