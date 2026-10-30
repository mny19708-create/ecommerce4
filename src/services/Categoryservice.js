// src/services/categoryService.js
import api from './api';
import { toCategory, unwrapList } from './normalizers';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const mockRaw = [
  { category_id: 1, category_name: 'Crafts & Krama', description: 'ក្រមា សូត្រ និងសិប្បកម្មធ្វើដោយដៃ' },
  { category_id: 2, category_name: 'Food & Spices', description: 'ម្រេចកំពត ស្ករត្នោត និងគ្រឿងទេសខ្មែរ' },
  { category_id: 3, category_name: 'Health & Beauty', description: 'ផលិតផលធម្មជាតិសម្រាប់សុខភាព និងសម្រស់' },
  { category_id: 4, category_name: 'Souvenir Gift Sets', description: 'កញ្ចប់អំណោយពិសេសពីកម្ពុជា' },
];

export default {
  async getAll() {
    const res = USE_MOCK
      ? await new Promise((r) => setTimeout(() => r({ data: { data: mockRaw } }), 300))
      : await api.get('/categories');
    return unwrapList(res).map(toCategory);
  },
};