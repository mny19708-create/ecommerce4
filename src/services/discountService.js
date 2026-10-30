// src/services/discountService.js
import api from './api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export default {
  async getAll() {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_promotions')
      const promotions = saved ? JSON.parse(saved) : [
        { id: 1, code: 'ANGKOR2026', discount_percent: 15, status: 'active' },
        { id: 2, code: 'KHMERSALE', discount_percent: 10, status: 'active' }
      ]
      return { data: { data: promotions } }
    } else {
      return await api.get('/admin/promotions')
    }
  },

  async create(data) {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_promotions')
      let promotions = saved ? JSON.parse(saved) : []
      const newPromo = { id: Date.now(), ...data }
      promotions.push(newPromo)
      localStorage.setItem('mock_promotions', JSON.stringify(promotions))
      return { data: { data: newPromo } }
    } else {
      return await api.post('/admin/promotions', data)
    }
  },

  async update(id, data) {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_promotions')
      let promotions = saved ? JSON.parse(saved) : []
      const index = promotions.findIndex(p => p.id === id)
      if (index !== -1) {
        promotions[index] = { ...promotions[index], ...data }
        localStorage.setItem('mock_promotions', JSON.stringify(promotions))
        return { data: { data: promotions[index] } }
      }
      throw new Error('Promotion not found')
    } else {
      return await api.put(`/admin/promotions/${id}`, data)
    }
  },

  async delete(id) {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_promotions')
      let promotions = saved ? JSON.parse(saved) : []
      promotions = promotions.filter(p => p.id !== id)
      localStorage.setItem('mock_promotions', JSON.stringify(promotions))
      return { data: { success: true } }
    } else {
      return await api.delete(`/admin/promotions/${id}`)
    }
  }
}