// src/stores/wishlist.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const MOCK_KEY = 'mock_wishlist'

// ទាញ ID ពី product (គាំទ្រ id / _id / product_id)
const getId = (p) => p?.id ?? p?._id ?? p?.product_id ?? null
// ប្រៀបធៀប ID ដោយមិនខ្វល់ number ឬ string ("1" == 1)
const sameId = (a, b) => a !== null && b !== null && String(a) === String(b)

const loadMock = () => {
  try {
    return JSON.parse(localStorage.getItem(MOCK_KEY) || '[]')
  } catch {
    return []
  }
}
const saveMock = (list) => localStorage.setItem(MOCK_KEY, JSON.stringify(list))

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref(USE_MOCK ? loadMock() : [])
  const loading = ref(false)
  const error = ref(null)

  // ១. ទាញយកបញ្ជី Wishlist
  const fetchWishlist = async () => {
    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        items.value = loadMock()
        return
      }

      const response = await api.get('/wishlist')
      const payload = response.data
      items.value = Array.isArray(payload) ? payload : payload?.data ?? []
    } catch (err) {
      console.error('Error fetching wishlist:', err)
      error.value = 'មិនអាចទាញយក Wishlist បានទេ!'
    } finally {
      loading.value = false
    }
  }

  // ២. ពិនិត្យថា product មានក្នុង wishlist ឬនៅ
  const isWishlisted = (productId) => {
    if (productId === null || productId === undefined) return false
    return items.value.some((item) => sameId(getId(item), productId))
  }

  // ៣. បន្ថែម/លុប (Toggle)
  const toggleWishlist = async (product) => {
    const prodId = getId(product)
    if (prodId === null) return

    const exists = isWishlisted(prodId)
    error.value = null

    try {
      if (USE_MOCK) {
        items.value = exists
          ? items.value.filter((i) => !sameId(getId(i), prodId))
          : [...items.value, product]
        saveMock(items.value)
        return
      }

      if (!exists) {
        await api.post('/wishlist', { product_id: prodId })
        items.value.push(product)
      } else {
        await api.delete(`/wishlist/${prodId}`)
        items.value = items.value.filter((i) => !sameId(getId(i), prodId))
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err)
      error.value =
        err.response?.status === 401
          ? 'សូមចូលគណនីជាមុនសិន ដើម្បីរក្សាទុកក្នុង Wishlist'
          : 'មិនអាចធ្វើបច្ចុប្បន្នភាព Wishlist បានទេ!'
    }
  }

  // ៤. លុបតាម ID
  const removeFromWishlist = async (productId) => {
    try {
      error.value = null

      if (USE_MOCK) {
        items.value = items.value.filter((i) => !sameId(getId(i), productId))
        saveMock(items.value)
        return
      }

      await api.delete(`/wishlist/${productId}`)
      items.value = items.value.filter((i) => !sameId(getId(i), productId))
    } catch (err) {
      console.error('Error removing from wishlist:', err)
      error.value = 'មិនអាចលុបចេញពី Wishlist បានទេ!'
    }
  }

  const totalWishlistCount = computed(() => items.value.length)

  return {
    items,
    loading,
    error,
    fetchWishlist,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    totalWishlistCount
  }
})