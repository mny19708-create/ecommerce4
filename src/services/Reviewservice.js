// src/services/reviewService.js
import api from './api';
import { toReview, unwrapList } from './Normalizers.js';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Laravel ត្រូវ join customer និង product មកជាមួយ (with(['customer','product']))
const mockRaw = [
  { review_id: 1, rating: 5, comment: 'ក្រមាគុណភាពល្អណាស់ ទន់ និងពណ៌មិនជ្រុះ។ ដឹកជញ្ជូនលឿន!', customer: { full_name: 'សុភា' }, product: { product_name: 'ក្រមាខ្មែរប្រពៃណី' } },
  { review_id: 2, rating: 5, comment: 'ម្រេចកំពតក្លិនឈ្ងុយខ្លាំង ទិញជាអំណោយឱ្យមិត្តបរទេស គេពេញចិត្តណាស់។', customer: { full_name: 'Dara' }, product: { product_name: 'ម្រេចកំពត' } },
  { review_id: 3, rating: 4, comment: 'កញ្ចប់អំណោយស្អាត វេចខ្ចប់ល្អ។ ចង់បានជម្រើសច្រើនជាងនេះបន្តិច។', customer: { full_name: 'Sophea' }, product: { product_name: 'កញ្ចប់អំណោយសិប្បកម្ម' } },
];

export default {
  async getFeatured(limit = 6) {
    const res = USE_MOCK
      ? await new Promise((r) => setTimeout(() => r({ data: { data: mockRaw.slice(0, limit) } }), 350))
      : await api.get('/reviews', { params: { featured: 1, limit } });
    return unwrapList(res).map(toReview);
  },
};