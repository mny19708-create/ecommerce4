// src/services/discountService.js
import api from './api';
import { toDiscount, unwrapList } from './normalizers';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const mockRaw = [
  { discount_id: 1, discount_name: 'Flash Sale សប្តាហ៍នេះ', discount_type: 'percentage', discount_value: '20', end_date: '2026-12-31' },
  { discount_id: 2, discount_name: 'ប្រូម៉ូសិនចូលឆ្នាំថ្មី', discount_type: 'percentage', discount_value: '15', end_date: '2027-01-15' },
  { discount_id: 3, discount_name: 'បញ្ចុះតម្លៃលើកញ្ចប់អំណោយ', discount_type: 'fixed', discount_value: '5', end_date: '2026-12-25' },
];

export default {
  // Laravel: ប្រូម៉ូសិនដែល is_active = true និងស្ថិតក្នុង start_date..end_date
  async getActive() {
    const res = USE_MOCK
      ? await new Promise((r) => setTimeout(() => r({ data: { data: mockRaw } }), 300))
      : await api.get('/discounts/active');
    return unwrapList(res).map(toDiscount);
  },
};