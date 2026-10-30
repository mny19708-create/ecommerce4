// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

const env = import.meta.env

// បើក/បិទ mock តាម .env → VITE_USE_MOCK=true | false
const USE_MOCK = env.VITE_USE_MOCK === 'true'

// Endpoint (មាន default; ប្តូរបានតាម .env ពេលក្រោយ បើ backend ប្រើ path ផ្សេង)
const LOGIN_ENDPOINT = env.VITE_LOGIN_ENDPOINT || '/auth/login'
const REGISTER_ENDPOINT = env.VITE_REGISTER_ENDPOINT || '/auth/register'

// Mock admin (ប្រើតែពេល VITE_USE_MOCK=true)
const MOCK_ADMIN = {
  email: env.VITE_MOCK_ADMIN_EMAIL || 'admin@test.com',
  password: env.VITE_MOCK_ADMIN_PASSWORD || '12345678',
  user: { id: 1, name: 'Admin', email: 'admin@test.com', role: 'admin' }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  // Role: customer, seller, admin, delivery
  const userRole = computed(() => user.value?.role || 'guest')

  const saveSession = (newToken, newUser) => {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  // ១. ចូលគណនី (Login)
  const login = async (credentials) => {
    try {
      loading.value = true
      error.value = null

      // ----- MOCK (តែពេល VITE_USE_MOCK=true) -----
      if (USE_MOCK) {
        if (
          credentials.email === MOCK_ADMIN.email &&
          credentials.password === MOCK_ADMIN.password
        ) {
          saveSession('mock-admin-token', MOCK_ADMIN.user)
          return true
        }
        error.value = 'អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ (Mock mode)'
        return false
      }

      // ----- Backend ពិត -----
      const response = await api.post(LOGIN_ENDPOINT, credentials)
      saveSession(response.data.token, response.data.user)
      return true
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        (err.code === 'ERR_NETWORK'
          ? 'មិនអាចភ្ជាប់ទៅ Server បានទេ (ពិនិត្យ VITE_API_URL និងថា Backend កំពុងដំណើរការ)'
          : 'ការចូលគណនីបានបរាជ័យ សូមព្យាយាមម្តងទៀត!')
      console.error('Login error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // ២. ចុះឈ្មោះ (Register)
  const register = async (userData) => {
    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        return { message: 'Mock register' }
      }

      const response = await api.post(REGISTER_ENDPOINT, userData)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'ការចុះឈ្មោះមិនបានសម្រេច!'
      console.error('Register error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // ៣. ចាកចេញ (Logout)
  const logout = async () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    userRole,
    login,
    register,
    logout
  }
})