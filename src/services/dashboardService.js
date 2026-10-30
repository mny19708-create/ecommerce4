// src/services/dashboardService.js
import api from './api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const dashboardService = {
  // ១. ទាញយកស្ថិតិសង្ខេបទាំងអស់សម្រាប់ Dashboard
  getDashboardStats: async () => {
    if (USE_MOCK) {
      // Mock Dashboard Stats
      return {
        success: true,
        data: {
          total_sales: 1280,
          total_revenue: 25400.00,
          total_orders: 340,
          total_users: 1250,
          recent_orders: [
            { id: 101, customer_name: 'ម៉ា នី', total: 120.00, status: 'completed' },
            { id: 102, customer_name: 'យ៉ុន សុគន្ធី', total: 85.50, status: 'pending' }
          ]
        }
      }
    } else {
      const response = await api.get('/dashboard/stats')
      return response.data
    }
  },

  // ២. ទាញយកបញ្ជីសារជូនដំណឹង (Notifications) របស់អ្នកប្រើប្រាស់
  getNotifications: async () => {
    if (USE_MOCK) {
      return {
        success: true,
        data: [
          { id: 1, title: 'ការបញ្ជាទិញថ្មី', message: 'មានការបញ្ជាទិញទំនិញថ្មីលេខ #101', read_at: null },
          { id: 2, title: 'ផលិតផលអស់ស្តុក', message: 'ក្រមាខេត្តសៀមរាបនៅសល់តិចជាង ៥', read_at: '2026-10-30T10:00:00.000000Z' }
        ]
      }
    } else {
      const response = await api.get('/notifications')
      return response.data
    }
  },

  // ៣. កត់ត្រា ឬអានស្ថានភាពការអាន Notification (Mark as read)
  markNotificationAsRead: async (notificationId) => {
    if (USE_MOCK) {
      return { success: true, message: 'Notification marked as read (Mock)' }
    } else {
      const response = await api.put(`/notifications/${notificationId}/read`)
      return response.data
    }
  },

  // ៤. ទាញយកប្រវត្តិសកម្មភាពសំខាន់ៗ (Audit Logs - សម្រាប់ Admin)
  getAuditLogs: async (params) => {
    if (USE_MOCK) {
      return {
        success: true,
        data: [
          { id: 1, user: 'Admin', action: 'Login', ip_address: '127.0.0.1', created_at: '2026-10-30 08:00:00' }
        ]
      }
    } else {
      const response = await api.get('/audit-logs', { params })
      return response.data
    }
  },
}