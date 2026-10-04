import React from 'react';
import {
  CheckCircle,
  Clock,
  MapPin,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  onTrackOrder: (order: Order) => void;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onTrackOrder,
  onClose,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 text-center my-8 border border-[#EAE6DF]">
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F3F7F4] text-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-[#F3F7F4]/60">
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <span className="text-xs uppercase font-extrabold tracking-widest text-[#2D6A4F] bg-[#F3F7F4] px-3 py-1 rounded-full">
          Order Confirmed
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] mt-2 tracking-tight font-display">
          Preparing your meal
        </h2>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          Your order has been sent to the kitchen. It will arrive hot and freshly sealed.
        </p>

        {/* Order Meta Card */}
        <div className="mt-6 bg-[#FAF8F5] rounded-2xl p-4 border border-[#EAE6DF] text-left space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-[#EAE6DF]">
            <div>
              <span className="text-[10px] text-[#A8A29E] block uppercase font-bold">Order ID</span>
              <span className="font-mono font-bold text-[#1C1917] text-sm">#{order.id}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#A8A29E] block uppercase font-bold">Estimated Delivery</span>
              <div className="flex items-center gap-1 text-[#C04E26] font-bold text-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>~{order.estimatedDeliveryMinutes} mins</span>
              </div>
            </div>
          </div>

          <div className="text-xs space-y-1.5">
            <div className="flex justify-between text-[#57534E]">
              <span>Kitchen:</span>
              <span className="font-semibold text-[#1C1917]">{order.restaurantName}</span>
            </div>

            <div className="flex justify-between text-[#57534E]">
              <span>Delivering to:</span>
              <span className="font-medium text-[#1C1917] truncate max-w-[200px]">
                {order.deliveryAddress.street}
              </span>
            </div>

            <div className="flex justify-between text-[#57534E]">
              <span>Payment Mode:</span>
              <span className="font-semibold text-[#1C1917] uppercase">{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between text-[#57534E] pt-1 border-t border-[#EAE6DF]">
              <span>Total Paid:</span>
              <span className="font-bold text-[#1C1917] text-sm tabular-nums">
                ₹{order.total}
              </span>
            </div>
          </div>

          {/* Itemized preview */}
          <div className="pt-2 border-t border-[#EAE6DF]">
            <span className="text-[10px] text-[#A8A29E] font-bold uppercase block mb-1">
              Items Ordered ({order.items.length})
            </span>
            <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
              {order.items.map(({ dish, quantity }) => (
                <div key={dish.id} className="flex justify-between text-xs text-[#57534E]">
                  <span className="truncate max-w-[240px]">
                    {quantity}x {dish.name}
                  </span>
                  <span className="tabular-nums font-semibold text-[#1C1917]">
                    ₹{dish.price * quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => onTrackOrder(order)}
            className="flex-1 flex items-center justify-center gap-2 bg-[#C04E26] hover:bg-[#9E3C1B] text-white font-bold py-3 px-5 rounded-2xl shadow-sm transition-all cursor-pointer"
          >
            <span>Track Order Live</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl border border-[#EAE6DF] text-[#57534E] font-semibold text-xs sm:text-sm hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
