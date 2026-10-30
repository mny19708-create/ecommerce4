// src/services/orderService.js
import api from './api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const orderService = {
  // បង្កើតការបញ្ជាទិញថ្មី (Checkout)
  createOrder: async (orderData) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_orders');
      let orders = saved ? JSON.parse(saved) : [];
      
      const newOrder = {
        id: Date.now(),
        order_id: Date.now(),
        total_amount: orderData.total_amount || 100,
        order_status: 'pending',
        shipping_address: orderData.shipping_address || 'ភ្នំពេញ',
        items: orderData.items || [],
        created_at: new Date().toISOString()
      };

      orders.push(newOrder);
      localStorage.setItem('mock_orders', JSON.stringify(orders));
      
      // សម្អាតកន្ត្រកទំនិញក្រោយពេលបញ្ជាទិញជោគជ័យ
      localStorage.removeItem('mock_cart');

      return { success: true, data: newOrder };
    } else {
      const response = await api.post('/orders', orderData);
      return response.data;
    }
  },

  // មើលប្រវត្តិការបញ្ជាទិញរបស់ User ផ្ទាល់
  getMyOrders: async () => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_orders');
      const orders = saved ? JSON.parse(saved) : [
        {
          id: 1,
          order_id: 1,
          total_amount: 45.00,
          order_status: 'completed',
          shipping_address: 'ផ្ទះលេខ ១២៣, ភ្នំពេញ',
          items: [{ name: 'ក្រមាខេត្តសៀមរាប', quantity: 1, unit_price: 45.00 }],
          created_at: '2026-10-25T10:00:00.000000Z'
        }
      ];
      return { data: orders };
    } else {
      const response = await api.get('/orders/my-orders');
      return response.data;
    }
  },

  // មើលព័ត៌មានលម្អិតនៃការបញ្ជាទិញតាម ID
  getOrderById: async (orderId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_orders');
      const orders = saved ? JSON.parse(saved) : [];
      const order = orders.find(o => o.id == orderId || o.order_id == orderId);
      if (order) {
        return { data: order };
      }
      throw new Error('Order not found');
    } else {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    }
  },

  // បោះបង់ការបញ្ជាទិញ
  cancelOrder: async (orderId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_orders');
      let orders = saved ? JSON.parse(saved) : [];
      const index = orders.findIndex(o => o.id == orderId || o.order_id == orderId);
      if (index !== -1) {
        orders[index].order_status = 'cancelled';
        localStorage.setItem('mock_orders', JSON.stringify(orders));
        return { success: true, data: orders[index] };
      }
      throw new Error('Order not found');
    } else {
      const response = await api.put(`/orders/${orderId}/cancel`);
      return response.data;
    }
  },
};