// src/stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api' // Axios instance របស់អ្នក

// ពិនិត្យមើលថាតើបើកដំណើរការ Mock Mode ដែរឬទេ (ផ្អែកលើ .env)
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)

  // គណនាសរុបចំនួនទំនិញក្នុងកន្ត្រក
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
  })

  // គណនាតម្លៃសរុប (Total Price / Subtotal)
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + (Number(item.price || 0) * (item.quantity || 1)), 0)
  })

  // យកទិន្នន័យកន្ត្រកទំនិញ
  const fetchCart = async () => {
    loading.value = true
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_cart')
      if (saved) {
        try { items.value = JSON.parse(saved) } catch (e) { items.value = [] }
      }
      loading.value = false
    } else {
      try {
        const response = await api.get('/cart')
        items.value = response.data.items || []
      } catch (error) {
        console.error('Failed to fetch cart from backend:', error)
      } finally {
        loading.value = false
      }
    }
  }

  // បន្ថែមទំនិញចូលកន្ត្រក
  const addToCart = async (product, quantity = 1) => {
    const prodId = product.id || product.product_id
    if (USE_MOCK) {
      const existing = items.value.find(i => (i.id === prodId || i.product_id === prodId))
      if (existing) {
        existing.quantity = (existing.quantity || 1) + quantity
      } else {
        items.value.push({ ...product, id: prodId, product_id: prodId, quantity })
      }
      localStorage.setItem('mock_cart', JSON.stringify(items.value))
    } else {
      try {
        const response = await api.post('/cart', {
          product_id: prodId,
          quantity: quantity
        })
        items.value = response.data.items || []
      } catch (error) {
        console.error('Failed to add to cart:', error)
      }
    }
  }

  // មុខងារបូកចំនួនបន្ថែម (Increment)
  const increment = async (productId) => {
    const item = items.value.find(i => i.id === productId || i.product_id === productId)
    if (item) {
      if (USE_MOCK) {
        item.quantity = (item.quantity || 1) + 1
        localStorage.setItem('mock_cart', JSON.stringify(items.value))
      } else {
        await addToCart(item, 1)
      }
    }
  }

  // មុខងារដកចំនួនចុះ (Decrement)
  const decrement = async (productId) => {
    const item = items.value.find(i => i.id === productId || i.product_id === productId)
    if (item) {
      if ((item.quantity || 1) > 1) {
        item.quantity -= 1
        if (USE_MOCK) {
          localStorage.setItem('mock_cart', JSON.stringify(items.value))
        }
      } else {
        await removeFromCart(productId)
      }
    }
  }

  // មុខងារ Alias សម្រាប់ការពារការហៅខុសឈ្មោះពី UI Component
  const incrementQuantity = async (productId) => {
    return await increment(productId)
  }

  const decrementQuantity = async (productId) => {
    return await decrement(productId)
  }

  // លុบทំនិញចេញពីកន្ត្រក
  const removeFromCart = async (productId) => {
    if (USE_MOCK) {
      items.value = items.value.filter(i => i.id !== productId && i.product_id !== productId)
      localStorage.setItem('mock_cart', JSON.stringify(items.value))
    } else {
      try {
        const response = await api.delete(`/cart/${productId}`)
        items.value = response.data.items || []
      } catch (error) {
        console.error('Failed to remove from cart:', error)
      }
    }
  }

  const removeItem = async (productId) => {
    return await removeFromCart(productId)
  }

  // សម្អាតកន្ត្រកទំនិញទាំងមូល
  const clearCart = async () => {
    if (USE_MOCK) {
      items.value = []
      localStorage.removeItem('mock_cart')
    } else {
      try {
        await api.delete('/cart')
        items.value = []
      } catch (error) {
        console.error('Failed to clear cart:', error)
      }
    }
  }

  // ហៅទាញយកទិន្នន័យពេលចាប់ផ្តើម
  fetchCart()

  return {
    items,
    loading,
    totalItems,
    totalPrice,
    subtotal: totalPrice, // គាំទ្រទាំង totalPrice និង subtotal ក្នុង UI
    fetchCart,
    addToCart,
    removeFromCart,
    removeItem,
    increment,
    decrement,
    incrementQuantity,
    decrementQuantity,
    clearCart
  }
})