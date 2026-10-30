// src/stores/notification.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const MOCK_KEY = 'mock_notifications'

const getId = (n) => n?.id ?? n?._id ?? null
const sameId = (a, b) => a !== null && b !== null && String(a) === String(b)
const isUnread = (n) => !n.read_at && !n.is_read

// ----- Mock (ប្រើតែពេល VITE_USE_MOCK=true) -----
const defaultMock = () => [
  {
    id: 1,
    title: 'ការបញ្ជាទិញ #1089 ត្រូវបានទទួល',
    message: 'យើងកំពុងរៀបចំឥវ៉ាន់របស់អ្នក',
    created_at: new Date().toISOString(),
    is_read: false
  },
  {
    id: 2,
    title: 'ស្វាគមន៍មកកាន់ Khmer Handmade',
    message: 'អរគុណដែលចុះឈ្មោះជាមួយយើង',
    created_at: new Date().toISOString(),
    is_read: true,
    read_at: new Date().toISOString()
  }
]
const loadMock = () => {
  try {
    const raw = localStorage.getItem(MOCK_KEY)
    return raw ? JSON.parse(raw) : defaultMock()
  } catch {
    return defaultMock()
  }
}
const saveMock = (list) => localStorage.setItem(MOCK_KEY, JSON.stringify(list))

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref(USE_MOCK ? loadMock() : [])
  const loading = ref(false)
  const error = ref(null)

  // គណនាដោយស្វ័យប្រវត្តិ មិនចាំបាច់ ++ / -- ដៃ
  const unreadCount = computed(() => notifications.value.filter(isUnread).length)

  // ១. ទាញយកបញ្ជី
  const fetchNotifications = async () => {
    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        notifications.value = loadMock()
        return
      }

      const response = await api.get('/notifications')
      const payload = response.data
      notifications.value = Array.isArray(payload) ? payload : payload?.data ?? []
    } catch (err) {
      console.error('Error fetching notifications:', err)
      error.value = 'មិនអាចទាញយកសារជូនដំណឹងពី Server បានទេ!'
    } finally {
      loading.value = false
    }
  }

  // ២. Mark as read
  const markAsRead = async (notificationId) => {
    try {
      if (!USE_MOCK) {
        await api.patch(`/notifications/${notificationId}/read`)
      }

      const item = notifications.value.find((n) => sameId(getId(n), notificationId))
      if (item) {
        item.read_at = new Date().toISOString()
        item.is_read = true
      }
      if (USE_MOCK) saveMock(notifications.value)
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  // ៣. Mark all as read
  const markAllAsRead = async () => {
    try {
      if (!USE_MOCK) {
        await api.post('/notifications/mark-all-read')
      }

      const now = new Date().toISOString()
      notifications.value.forEach((n) => {
        n.read_at = n.read_at || now
        n.is_read = true
      })
      if (USE_MOCK) saveMock(notifications.value)
    } catch (err) {
      console.error('Error marking all as read:', err)
    }
  }

  // ៤. លុប
  const deleteNotification = async (notificationId) => {
    try {
      if (!USE_MOCK) {
        await api.delete(`/notifications/${notificationId}`)
      }

      notifications.value = notifications.value.filter(
        (n) => !sameId(getId(n), notificationId)
      )
      if (USE_MOCK) saveMock(notifications.value)
    } catch (err) {
      console.error('Error deleting notification:', err)
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  }
})