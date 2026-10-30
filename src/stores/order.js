// src/stores/order.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const MOCK_KEY = 'mock_orders'

// ----- Mock helpers (ប្រើតែពេល VITE_USE_MOCK=true) -----
const loadMockOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(MOCK_KEY) || '[]')
  } catch {
    return []
  }
}
const saveMockOrders = (list) => localStorage.setItem(MOCK_KEY, JSON.stringify(list))

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const currentOrder = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ១. ទាញយកប្រវត្តិការបញ្ជាទិញ
  const fetchMyOrders = async () => {
    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        orders.value = loadMockOrders()
        return
      }

      const response = await api.get('/orders/my-orders')
      orders.value = response.data.data || response.data
    } catch (err) {
      console.error('Error fetching orders:', err)
      error.value = 'មិនអាចទាញយកប្រវត្តិការបញ្ជាទិញពី Server បានទេ!'
    } finally {
      loading.value = false
    }
  }

  // ២. បង្កើតការបញ្ជាទិញថ្មី (Checkout)
  const createOrder = async (orderData) => {
    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        const list = loadMockOrders()
        const newOrder = {
          id: Date.now(),
          order_number: `#${1090 + list.length}`,
          status: 'pending',
          created_at: new Date().toISOString(),
          ...orderData
        }
        list.unshift(newOrder)
        saveMockOrders(list)
        currentOrder.value = newOrder
        orders.value = list
        return newOrder
      }

      const response = await api.post('/orders', orderData)
      currentOrder.value = response.data.data || response.data
      orders.value.unshift(currentOrder.value)
      return currentOrder.value
    } catch (err) {
      console.error('Error creating order:', err)
      error.value = err.response?.data?.message || 'ការបញ្ជាទិញបានបរាជ័យ!'
      throw err
    } finally {
      loading.value = false
    }
  }

  // ៣. មើលព័ត៌មានលម្អិតតាម ID
  const getOrderById = async (orderId) => {
    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        currentOrder.value =
          loadMockOrders().find((o) => String(o.id) === String(orderId)) || null
        return currentOrder.value
      }

      const response = await api.get(`/orders/${orderId}`)
      currentOrder.value = response.data.data || response.data
      return currentOrder.value
    } catch (err) {
      console.error('Error fetching order details:', err)
      error.value = 'មិនអាចទាញយកព័ត៌មានវិក្កយប័ត្របានទេ!'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchMyOrders,
    createOrder,
    getOrderById
  }
})