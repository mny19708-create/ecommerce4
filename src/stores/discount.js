// src/stores/discount.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// ----- Mock coupons (ប្រើតែពេល VITE_USE_MOCK=true) -----
const MOCK_DISCOUNTS = [
  { id: 1, code: 'KHMER10', type: 'percentage', value: 10, max_discount: 5, min_order: 0 },
  { id: 2, code: 'WELCOME5', type: 'fixed', value: 5, min_order: 20 }
]

export const useDiscountStore = defineStore('discount', () => {
  const discounts = ref([])
  const activeDiscount = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ១. ទាញយកបញ្ជីកូដបញ្ចុះតម្លៃ
  const fetchDiscounts = async () => {
    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        discounts.value = MOCK_DISCOUNTS
        return
      }

      const response = await api.get('/discounts')
      const payload = response.data
      discounts.value = Array.isArray(payload) ? payload : payload?.data ?? []
    } catch (err) {
      console.error('Error fetching discounts:', err)
      error.value = 'មិនអាចទាញយកទិន្នន័យបញ្ចុះតម្លៃពី Server បានទេ!'
    } finally {
      loading.value = false
    }
  }

  // ២. អនុវត្តកូដបញ្ចុះតម្លៃ (Checkout)
  const applyDiscountCode = async (code, subtotal) => {
    const cleanCode = String(code || '').trim()
    if (!cleanCode) {
      error.value = 'សូមបញ្ចូលកូដបញ្ចុះតម្លៃ'
      return false
    }

    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        const found = MOCK_DISCOUNTS.find(
          (d) => d.code.toLowerCase() === cleanCode.toLowerCase()
        )
        if (!found) {
          error.value = 'កូដបញ្ចុះតម្លៃមិនត្រឹមត្រូវ ឬផុតកំណត់!'
          return false
        }
        if (Number(subtotal) < Number(found.min_order || 0)) {
          error.value = `ត្រូវទិញយ៉ាងតិច $${found.min_order} ដើម្បីប្រើកូដនេះ`
          return false
        }
        activeDiscount.value = found
        return true
      }

      const response = await api.post('/discounts/apply', { code: cleanCode, subtotal })
      activeDiscount.value = response.data.data || response.data
      return true
    } catch (err) {
      console.error('Error applying discount:', err)
      error.value = err.response?.data?.message || 'កូដបញ្ចុះតម្លៃមិនត្រឹមត្រូវ ឬផុតកំណត់!'
      return false
    } finally {
      loading.value = false
    }
  }

  // ៣. ដកកូដចេញ
  const removeDiscount = () => {
    activeDiscount.value = null
    error.value = null
  }

  // ៤. គណនាទឹកប្រាក់ត្រូវបញ្ចុះ (មិនលើស subtotal)
  const calculateDiscountAmount = (subtotal) => {
    const d = activeDiscount.value
    const base = Number(subtotal) || 0
    if (!d || base <= 0) return 0

    const value = Number(d.value) || 0
    let amount = 0

    if (d.type === 'percentage') {
      amount = (base * value) / 100
      const max = Number(d.max_discount)
      if (max > 0 && amount > max) amount = max
    } else {
      amount = value
    }

    // មិនឱ្យបញ្ចុះលើសតម្លៃសរុប ហើយបង្គត់ 2 ខ្ទង់
    return Math.round(Math.min(amount, base) * 100) / 100
  }

  return {
    discounts,
    activeDiscount,
    loading,
    error,
    fetchDiscounts,
    applyDiscountCode,
    removeDiscount,
    calculateDiscountAmount
  }
})