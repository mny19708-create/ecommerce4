// src/services/wishlistService.js
import api from './api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const wishlistService = {
  // ទាញយកបញ្ជី Wishlist ទាំងអស់
  getWishlist: async () => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_wishlist');
      const items = saved ? JSON.parse(saved) : [
        { id: 1, product_id: 1, name: 'ក្រមាខេត្តសៀមរាប', price: 45.00, image_url: null }
      ];
      return { data: items };
    } else {
      const response = await api.get('/wishlist');
      return response.data;
    }
  },

  // បន្ថែមផលិតផលចូល Wishlist
  addToWishlist: async (productId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_wishlist');
      let items = saved ? JSON.parse(saved) : [];
      
      const exists = items.some(i => i.id == productId || i.product_id == productId);
      if (!exists) {
        items.push({ id: productId, product_id: productId, added_at: new Date().toISOString() });
        localStorage.setItem('mock_wishlist', JSON.stringify(items));
      }
      return { success: true, data: items };
    } else {
      const response = await api.post('/wishlist', { productId });
      return response.data;
    }
  },

  // លុបផលិតផលចេញពី Wishlist
  removeFromWishlist: async (productId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_wishlist');
      let items = saved ? JSON.parse(saved) : [];
      
      items = items.filter(i => i.id != productId && i.product_id != productId);
      localStorage.setItem('mock_wishlist', JSON.stringify(items));
      return { success: true, data: items };
    } else {
      const response = await api.delete(`/wishlist/${productId}`);
      return response.data;
    }
  },
};