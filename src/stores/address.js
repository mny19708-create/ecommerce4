// src/stores/address.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

// ពិនិត្យមើលថាតើបើកដំណើរការ Mock Mode ដែរឬទេ (ផ្អែកលើ .env)
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const useAddressStore = defineStore('address', () => {
  const addresses = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ១. ទាញយកអាសយដ្ឋានទាំងអស់
  const fetchAddresses = async () => {
    loading.value = true
    error.value = null

    if (USE_MOCK) {
      // ໂหมด Mock: យកទិន្នន័យពី localStorage
      const saved = localStorage.getItem('mock_addresses')
      if (saved) {
        try { addresses.value = JSON.parse(saved) } catch (e) { addresses.value = [] }
      } else {
        // Mock Data ចាប់ផ្ដើមដំបូងបើគ្មានទិន្នន័យ
        addresses.value = [
          { id: 1, name: 'ម៉ា នី', phone: '012345678', street: 'ផ្ទះលេខ ១២៣, ផ្លូវ ២០០១', city: 'ភ្នំពេញ', is_default: true }
        ]
        localStorage.setItem('mock_addresses', JSON.stringify(addresses.value))
      }
      loading.value = false
    } else {
      // ໂหมด Backend API (Laravel)
      try {
        const response = await api.get('/addresses')
        addresses.value = response.data.data || response.data
      } catch (err) {
        console.error('Error fetching addresses:', err)
        error.value = 'មិនអាចទាញយកអាសយដ្ឋានពី Server បានទេ!'
      } finally {
        loading.value = false
      }
    }
  }

  // ២. បន្ថែមអាសយដ្ឋានថ្មី
  const addAddress = async (newAddress) => {
    loading.value = true
    error.value = null

    if (USE_MOCK) {
      const createdAddress = { 
        id: Date.now(), 
        ...newAddress, 
        is_default: newAddress.is_default || addresses.value.length === 0 
      }

      if (createdAddress.is_default) {
        addresses.value.forEach(item => item.is_default = false)
      }

      addresses.value.push(createdAddress)
      localStorage.setItem('mock_addresses', JSON.stringify(addresses.value))
      loading.value = false
      return true
    } else {
      try {
        const response = await api.post('/addresses', newAddress)
        const createdAddress = response.data.data || response.data
        
        if (createdAddress.is_default) {
          addresses.value.forEach(item => item.is_default = false)
        }
        
        addresses.value.push(createdAddress)
        return true
      } catch (err) {
        console.error('Error adding address:', err)
        error.value = err.response?.data?.message || 'ការបន្ថែមអាសយដ្ឋានបានបរាជ័យ!'
        return false
      } finally {
        loading.value = false
      }
    }
  }

  // ៣. កែប្រែអាសយដ្ឋាន
  const updateAddress = async (id, updatedData) => {
    loading.value = true
    error.value = null

    if (USE_MOCK) {
      if (updatedData.is_default) {
        addresses.value.forEach(item => item.is_default = false)
      }

      const index = addresses.value.findIndex(item => item.id === id || item.address_id === id)
      if (index !== -1) {
        addresses.value[index] = { ...addresses.value[index], ...updatedData }
        localStorage.setItem('mock_addresses', JSON.stringify(addresses.value))
      }
      loading.value = false
      return true
    } else {
      try {
        const response = await api.put(`/addresses/${id}`, updatedData)
        const updatedAddress = response.data.data || response.data

        if (updatedAddress.is_default) {
          addresses.value.forEach(item => item.is_default = false)
        }

        const index = addresses.value.findIndex(item => item.address_id === id || item.id === id)
        if (index !== -1) {
          addresses.value[index] = updatedAddress
        }
        return true
      } catch (err) {
        console.error('Error updating address:', err)
        error.value = err.response?.data?.message || 'ការកែប្រែអាសយដ្ឋានបានបរាជ័យ!'
        return false
      } finally {
        loading.value = false
      }
    }
  }

  // ៤. លុបអាសយដ្ឋាន
  const removeAddress = async (id) => {
    loading.value = true
    error.value = null

    if (USE_MOCK) {
      addresses.value = addresses.value.filter(item => item.id !== id && item.address_id !== id)
      localStorage.setItem('mock_addresses', JSON.stringify(addresses.value))
      loading.value = false
      return true
    } else {
      try {
        await api.delete(`/addresses/${id}`)
        addresses.value = addresses.value.filter(item => item.address_id !== id && item.id !== id)
        return true
      } catch (err) {
        console.error('Error removing address:', err)
        error.value = 'ការលុបអាសយដ្ឋានបានបរាជ័យ!'
        return false
      } finally {
        loading.value = false
      }
    }
  }

  // ហៅទាញយកទិន្នន័យពេលចាប់ផ្តើម
  fetchAddresses()

  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    addAddress,
    updateAddress,
    removeAddress
  }
})