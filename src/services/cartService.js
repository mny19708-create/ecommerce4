// src/services/cartService.js
import api from './api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const cartService = {
  // មើលទំនិញក្នុងកន្ត្រក
  getCart: async () => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_cart');
      const items = saved ? JSON.parse(saved) : [];
      return { items };
    } else {
      const response = await api.get('/cart');
      return response.data;
    }
  },

  // បន្ថែមទំនិញចូលកន្ត្រក
  addToCart: async (productId, quantity) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_cart');
      let items = saved ? JSON.parse(saved) : [];
      
      const existing = items.find(i => i.id === productId || i.product_id === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({ id: productId, product_id: productId, quantity, price: 100, name: 'ផលិតផលគំរូ' });
      }
      
      localStorage.setItem('mock_cart', JSON.stringify(items));
      return { items };
    } else {
      const response = await api.post('/cart', { productId, quantity });
      return response.data;
    }
  },

  // លុបទំនិញពីកន្ត្រក
  removeFromCart: async (cartItemId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_cart');
      let items = saved ? JSON.parse(saved) : [];
      
      items = items.filter(i => i.id !== cartItemId && i.product_id !== cartItemId);
      localStorage.setItem('mock_cart', JSON.stringify(items));
      return { items };
    } else {
      const response = await api.delete(`/cart/${cartItemId}`);
      return response.data;
    }
  },
};