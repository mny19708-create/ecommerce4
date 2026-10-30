// src/services/productService.js
import api from './api';
import { toProduct, unwrapList } from './normalizers';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// ទិន្នន័យផលិតផលគម្រូចំនួន ១០
const mockRaw = [
  { product_id: 1, category_id: 1, product_name: 'ក្រមាខ្មែរប្រពៃណី (Krama)', price: '8.00', stock_quantity: 80, sold_count: 320, average_rating: '4.9', discount_percent: 0, image_url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500' },
  { product_id: 2, category_id: 1, product_name: 'កន្សែងសូត្រខ្មែរ (Silk Scarf)', price: '35.00', stock_quantity: 20, sold_count: 140, average_rating: '4.8', discount_percent: 10, image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' },
  { product_id: 3, category_id: 2, product_name: 'ម្រេចកំពតខ្មៅ (Kampot Black Pepper)', price: '6.50', stock_quantity: 120, sold_count: 410, average_rating: '4.9', discount_percent: 0, image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500' },
  { product_id: 4, category_id: 2, product_name: 'ស្ករត្នោតធម្មជាតិ (Palm Sugar)', price: '4.00', stock_quantity: 90, sold_count: 260, average_rating: '4.7', discount_percent: 0, image_url: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500' },
  { product_id: 5, category_id: 3, product_name: 'សាប៊ូរុក្ខជាតិក្លិនរំដួល (Herbal Soap)', price: '3.50', stock_quantity: 150, sold_count: 180, average_rating: '4.6', discount_percent: 15, image_url: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=500' },
  { product_id: 6, category_id: 3, product_name: 'ប្រេងដូងត្រជាក់បរិសុទ្ធ (Coconut Oil)', price: '7.00', stock_quantity: 60, sold_count: 210, average_rating: '4.8', discount_percent: 0, image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500' },
  { product_id: 7, category_id: 4, product_name: 'កញ្ចប់អំណោយ Khmer Premium Set', price: '25.00', stock_quantity: 30, sold_count: 95, average_rating: '5.0', discount_percent: 20, image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500' },
  { product_id: 8, category_id: 4, product_name: 'ចម្លាក់ឈើក្បាច់ខ្មែរ (Wood Carving)', price: '18.00', stock_quantity: 15, sold_count: 70, average_rating: '4.7', discount_percent: 0, image_url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500' },
  { product_id: 9, category_id: 2, product_name: 'ទឹកឃ្មុំព្រៃធម្មជាតិ (Wild Honey)', price: '12.00', stock_quantity: 45, sold_count: 190, average_rating: '4.9', discount_percent: 5, image_url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500' },
  { product_id: 10, category_id: 1, product_name: 'កាបូបត្បាញពីស្លឹកត្នោត (Palm Handbag)', price: '15.00', stock_quantity: 50, sold_count: 110, average_rating: '4.8', discount_percent: 0, image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500' },
];

const delay = (data, ms = 300) => new Promise((r) => setTimeout(() => r({ data }), ms));

const productServiceObj = {
  async getAll(params = {}) {
    const res = USE_MOCK
      ? await delay({ data: mockRaw.filter((p) => !params.category_id || p.category_id === Number(params.category_id)) })
      : await api.get('/products', { params });
    return unwrapList(res).map(toProduct);
  },

  async getAllProducts(params = {}) {
    return this.getAll(params);
  },

  async getBestSellers(limit = 8) {
    const res = USE_MOCK
      ? await delay({ data: [...mockRaw].sort((a, b) => b.sold_count - a.sold_count).slice(0, limit) })
      : await api.get('/products/best-sellers', { params: { limit } });
    return unwrapList(res).map(toProduct);
  },

  async getById(id) {
    if (USE_MOCK) {
      const raw = mockRaw.find((p) => p.product_id === Number(id));
      return raw ? toProduct(raw) : null;
    }
    const res = await api.get(`/products/${id}`);
    return toProduct(res.data.data ?? res.data);
  },

  async getProductById(id) {
    return this.getById(id);
  }
};

export const productService = productServiceObj;
export default productServiceObj;