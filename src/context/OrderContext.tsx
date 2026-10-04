import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderContextType {
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDeliveryMinutes' | 'riderName' | 'riderPhone'>) => Order;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  advanceOrderStatus: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'bistroorder_orders_v1';

const RIDERS = [
  { name: 'Marcus Vance', phone: '+1 (555) 234-8901' },
  { name: 'Elena Rostova', phone: '+1 (555) 872-4319' },
  { name: 'David Chen', phone: '+1 (555) 419-7620' },
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    return orders.length > 0 ? orders[0] : null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const placeOrder = (
    orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDeliveryMinutes' | 'riderName' | 'riderPhone'>
  ): Order => {
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000);
    const assignedRider = RIDERS[Math.floor(Math.random() * RIDERS.length)];
    const newOrder: Order = {
      ...orderData,
      id: `BO-${randomOrderNumber}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      estimatedDeliveryMinutes: 30,
      riderName: assignedRider.name,
      riderPhone: assignedRider.phone,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
    if (activeOrder && activeOrder.id === id) {
      setActiveOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const advanceOrderStatus = (id: string) => {
    const statusFlow: OrderStatus[] = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const current = getOrderById(id);
    if (!current) return;

    const currentIndex = statusFlow.indexOf(current.status);
    if (currentIndex < statusFlow.length - 1) {
      const nextStatus = statusFlow[currentIndex + 1];
      updateOrderStatus(id, nextStatus);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        advanceOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
