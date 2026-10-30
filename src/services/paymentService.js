// src/services/paymentService.js
import api from './api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const paymentService = {
  // ១. បង្កើតសំណើទូទាត់ប្រាក់ថ្មី (ឧ. បង្កើត KHQR Code ឬ Redirect ไปកាន់ Payment Gateway)
  createPayment: async (paymentData) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_payments')
      let payments = saved ? JSON.parse(saved) : []
      
      const newPayment = {
        id: Date.now(),
        payment_id: Date.now(),
        order_id: paymentData.order_id || 1,
        payment_method: paymentData.payment_method || 'KHQR',
        amount: paymentData.amount || 100,
        status: 'pending',
        qr_string: '00020101021230360016A00000067701011101130012345678905204599953038405802KH62190515KHQR_TEST_STORE63041234',
        created_at: new Date().toISOString()
      }

      payments.push(newPayment)
      localStorage.setItem('mock_payments', JSON.stringify(payments))
      return { success: true, data: newPayment }
    } else {
      const response = await api.post('/payments', paymentData)
      return response.data
    }
  },

  // ២. ពិនិត្យស្ថានភាពការទូទាត់ប្រាក់តាម Payment ID
  getPaymentStatus: async (paymentId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_payments')
      const payments = saved ? JSON.parse(saved) : []
      const payment = payments.find(p => p.id == paymentId || p.payment_id == paymentId)
      if (payment) {
        return { data: payment }
      }
      return { data: { id: paymentId, status: 'completed', payment_method: 'KHQR' } }
    } else {
      const response = await api.get(`/payments/${paymentId}`)
      return response.data
    }
  },

  // ៣. ពិនិត្យស្ថានភាពទូទាត់ប្រាក់តាម Order ID
  getPaymentByOrderId: async (orderId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_payments')
      const payments = saved ? JSON.parse(saved) : []
      const payment = payments.find(p => p.order_id == orderId)
      if (payment) {
        return { data: payment }
      }
      return { data: { order_id: orderId, status: 'paid', payment_method: 'KHQR' } }
    } else {
      const response = await api.get(`/orders/${orderId}/payment`)
      return response.data
    }
  },

  // ៤. បញ្ជាក់ការទូទាត់ប្រាក់ជោគជ័យ (សម្រាប់ Callback ពី KHQR ឬ Admin កែប្រែស្ថានភាពเป็น 'paid')
  confirmPayment: async (paymentId, confirmationData) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_payments')
      let payments = saved ? JSON.parse(saved) : []
      const index = payments.findIndex(p => p.id == paymentId || p.payment_id == paymentId)
      if (index !== -1) {
        payments[index].status = 'paid'
        localStorage.setItem('mock_payments', JSON.stringify(payments))
        return { success: true, data: payments[index] }
      }
      return { success: true, data: { id: paymentId, status: 'paid', ...confirmationData } }
    } else {
      const response = await api.post(`/payments/${paymentId}/confirm`, confirmationData)
      return response.data
    }
  },
}