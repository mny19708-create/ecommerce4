// src/services/shipmentService.js
import api from './api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const shipmentService = {
  // ១. ទាញយកព័ត៌មានដឹកជញ្ជូនទាំងអស់ (សម្រាប់ Admin ឬ Delivery Staff)
  getAllShipments: async (params) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_shipments')
      const shipments = saved ? JSON.parse(saved) : [
        {
          id: 1,
          order_id: 101,
          tracking_number: 'KH-TRACK-2026-001',
          courier_name: 'Khmer Express',
          status: 'shipping',
          created_at: '2026-10-30T08:00:00.000000Z'
        }
      ]
      return { data: shipments }
    } else {
      const response = await api.get('/shipments', { params })
      return response.data
    }
  },

  // ២. តាមដានការដឹកជញ្ជូនតាម Order ID
  getShipmentByOrderId: async (orderId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_shipments')
      const shipments = saved ? JSON.parse(saved) : []
      const shipment = shipments.find(s => s.order_id == orderId)
      if (shipment) {
        return { data: shipment }
      }
      return { 
        data: { 
          order_id: orderId, 
          tracking_number: 'KH-TRACK-DEFAULT', 
          status: 'processing',
          courier_name: 'Standard Delivery' 
        } 
      }
    } else {
      const response = await api.get(`/orders/${orderId}/shipment`)
      return response.data
    }
  },

  // ៣. តាមដានស្ថានភាពកញ្ចប់ទំនិញតាម Tracking Number
  trackByTrackingNumber: async (trackingNumber) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_shipments')
      const shipments = saved ? JSON.parse(saved) : []
      const shipment = shipments.find(s => s.tracking_number === trackingNumber)
      if (shipment) {
        return { data: shipment }
      }
      return { 
        data: { 
          tracking_number: trackingNumber, 
          status: 'in_transit', 
          courier_name: 'Khmer Express',
          estimated_delivery: '2026-11-02' 
        } 
      }
    } else {
      const response = await api.get(`/shipments/track/${trackingNumber}`)
      return response.data
    }
  },

  // ៤. បង្កើតព័ត៌មានដឹកជញ្ជូនថ្មី (សម្រាប់ Admin ឬ Seller ពេលបញ្ជូនទំនិញចេញ)
  createShipment: async (shipmentData) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_shipments')
      let shipments = saved ? JSON.parse(saved) : []
      
      const newShipment = {
        id: Date.now(),
        ...shipmentData,
        tracking_number: shipmentData.tracking_number || `KH-TRACK-${Math.floor(Math.random() * 100000)}`,
        status: 'shipping',
        created_at: new Date().toISOString()
      }

      shipments.push(newShipment)
      localStorage.setItem('mock_shipments', JSON.stringify(shipments))
      return { success: true, data: newShipment }
    } else {
      const response = await api.post('/shipments', shipmentData)
      return response.data
    }
  },

  // ៥. កែប្រែស្ថានភាព ឬកាលបរិច្ឆេទដឹកជញ្ជូន (Update Status / Delivered)
  updateShipmentStatus: async (shipmentId, statusData) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_shipments')
      let shipments = saved ? JSON.parse(saved) : []
      const index = shipments.findIndex(s => s.id == shipmentId)
      if (index !== -1) {
        shipments[index] = { ...shipments[index], ...statusData }
        localStorage.setItem('mock_shipments', JSON.stringify(shipments))
        return { success: true, data: shipments[index] }
      }
      return { success: true, data: { id: shipmentId, ...statusData } }
    } else {
      const response = await api.put(`/shipments/${shipmentId}`, statusData)
      return response.data
    }
  },
}