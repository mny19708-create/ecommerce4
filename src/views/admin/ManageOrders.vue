<!-- src/views/admin/Orders.vue -->
<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6 font-khmer bg-[#0D0B08] min-h-screen text-amber-50">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-600/20 pb-6">
      <div>
        <p class="text-xs text-amber-400 tracking-wider mb-1">❖ ប្រតិបត្តិការលក់</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">គ្រប់គ្រងការបញ្ជាទិញ (Manage Orders)</h1>
      </div>
      <div class="text-xs text-amber-300/70 bg-amber-950/40 border border-amber-600/30 px-3.5 py-2 rounded-xl">
        ការបញ្ជាទិញសរុប៖ <span class="font-bold text-amber-400">{{ orders.length }} Orders</span>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
      <!-- Search Input -->
      <div class="relative w-full sm:max-w-md">
        <input 
          v-model.trim="searchQuery" 
          type="text" 
          placeholder="ស្វែងរកតាម Order ID ឬឈ្មោះអតិថិជន..." 
          class="w-full bg-[#15120D] border border-amber-600/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-amber-50 placeholder-amber-900/60 outline-none transition"
        />
      </div>

      <!-- Status Filter Tabs -->
      <div class="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
        <button 
          v-for="status in statusFilters" 
          :key="status.value"
          @click="selectedStatus = status.value"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition"
          :class="selectedStatus === status.value ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#15120D] border border-amber-600/30 text-amber-200/70 hover:text-amber-300'"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- Alert / Error message -->
    <div v-if="errorMsg" class="bg-red-950/60 border border-red-500/40 text-red-300 p-3.5 rounded-xl text-xs">
      {{ errorMsg }}
    </div>

    <!-- Orders Table -->
    <div class="bg-[#15120D] border border-amber-600/30 rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-amber-950/40 border-b border-amber-600/25 text-[11px] uppercase text-amber-200/70 font-semibold">
              <th class="p-4">លេខកូដ (Order ID)</th>
              <th class="p-4">អតិថិជន</th>
              <th class="p-4">កាលបរិច្ឆេទ</th>
              <th class="p-4">សរុបទឹកប្រាក់</th>
              <th class="p-4">ស្ថានភាព (Status)</th>
              <th class="p-4 text-right">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-amber-600/10 text-xs sm:text-sm text-amber-100">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-amber-500/5 transition">
              <td class="p-4 font-bold font-mono text-amber-400">#{{ order.id }}</td>
              <td class="p-4">
                <p class="font-bold text-white">{{ order.shipping_address?.recipient_name || order.customer || 'អតិថិជន' }}</p>
                <p class="text-[11px] text-amber-300/60">{{ order.shipping_address?.phone || '-' }}</p>
              </td>
              <td class="p-4 text-amber-300/70 text-xs">{{ order.date || order.created_at || '-' }}</td>
              <td class="p-4 font-bold text-amber-400">${{ Number(order.total || order.total_amount || 0).toFixed(2) }}</td>
              <td class="p-4">
                <select 
                  :value="order.status" 
                  @change="updateOrderStatus(order.id, $event.target.value)"
                  class="bg-[#0D0B08] border border-amber-600/30 rounded-lg px-2.5 py-1 text-xs font-semibold outline-none cursor-pointer"
                  :class="getStatusColorClass(order.status)"
                >
                  <option value="pending" class="bg-[#15120D] text-amber-400">Pending (កំពុងរង់ចាំ)</option>
                  <option value="confirmed" class="bg-[#15120D] text-blue-400">Confirmed (បានបញ្ជាក់)</option>
                  <option value="processing" class="bg-[#15120D] text-indigo-400">Processing (កំពុងរៀបចំ)</option>
                  <option value="shipped" class="bg-[#15120D] text-sky-400">Shipped (កំពុងដឹក)</option>
                  <option value="delivered" class="bg-[#15120D] text-emerald-400">Delivered (បានដឹកដល់)</option>
                  <option value="cancelled" class="bg-[#15120D] text-red-400">Cancelled (បានបោះបង់)</option>
                </select>
              </td>
              <td class="p-4 text-right">
                <button @click="viewOrderDetail(order)" class="text-amber-400 font-semibold hover:underline">
                  មើលលម្អិត →
                </button>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="text-center py-10 text-amber-200/50">មិនរកឃើញការបញ្ជាទិញឡើយ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ORDER DETAIL MODAL POPUP -->
    <div v-if="selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-[#15120D] border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-amber-50 space-y-5 max-h-[90vh] overflow-y-auto">
        
        <div class="flex items-center justify-between border-b border-amber-600/30 pb-3">
          <h3 class="font-bold text-lg text-amber-400">ព័ត៌មានលម្អិត Order #{{ selectedOrder.id }}</h3>
          <button @click="selectedOrder = null" class="text-amber-300/60 hover:text-white text-lg">✕</button>
        </div>

        <div class="space-y-4 text-xs sm:text-sm">
          <!-- Customer & Shipping Info -->
          <div class="bg-[#0D0B08] p-4 rounded-xl border border-amber-600/20 space-y-2">
            <h4 class="font-bold text-amber-300 border-b border-amber-600/20 pb-1">ព័ត៌មានដឹកជញ្ជូន</h4>
            <p><span class="text-amber-300/60">អ្នកទទួល៖</span> {{ selectedOrder.shipping_address?.recipient_name || selectedOrder.customer || '-' }}</p>
            <p><span class="text-amber-300/60">លេខទូរស័ព្ទ៖</span> {{ selectedOrder.shipping_address?.phone || '-' }}</p>
            <p><span class="text-amber-300/60">អាសយដ្ឋាន៖</span> {{ selectedOrder.shipping_address?.detailed_address || selectedOrder.address || '-' }}</p>
          </div>

          <!-- Items List -->
          <div class="space-y-2">
            <h4 class="font-bold text-amber-300">មុខទំនិញកុម្ម៉ង់</h4>
            <div class="bg-[#0D0B08] p-3 rounded-xl border border-amber-600/20 divide-y divide-amber-600/10">
              <div v-for="item in (selectedOrder.items || [])" :key="item.id" class="py-2 flex justify-between items-center">
                <div>
                  <p class="font-bold text-white">{{ item.name || 'ផលិតផល' }}</p>
                  <p class="text-[11px] text-amber-300/60">{{ item.quantity }} x ${{ Number(item.unitPrice || item.price || 0).toFixed(2) }}</p>
                </div>
                <span class="font-bold text-amber-400">${{ (item.quantity * Number(item.unitPrice || item.price || 0)).toFixed(2) }}</span>
              </div>
              <div v-if="!selectedOrder.items || selectedOrder.items.length === 0" class="py-2 text-center text-amber-300/50">
                មិនមានព័ត៌មានមុខទំនិញ
              </div>
            </div>
          </div>

          <!-- Total Summary -->
          <div class="flex justify-between items-center font-bold text-base border-t border-amber-600/30 pt-3">
            <span>ប្រាក់ត្រូវទូទាត់សរុប៖</span>
            <span class="text-amber-400 text-lg">${{ Number(selectedOrder.total || selectedOrder.total_amount || 0).toFixed(2) }}</span>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button @click="selectedOrder = null" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40">
            បិទ
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import { toOrder, unwrapList } from '@/services/normalizers'

const orders = ref([])
const searchQuery = ref('')
const selectedStatus = ref('all')
const errorMsg = ref('')
const selectedOrder = ref(null)

const statusFilters = [
  { label: 'ទាំងអស់', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' }
]

const fetchOrders = async () => {
  try {
    errorMsg.value = ''
    const res = await api.get('/orders')
    const rawList = unwrapList(res)
    orders.value = rawList.map(toOrder)
  } catch (err) {
    console.error('Error fetching orders:', err)
    // Fallback Mock data សម្រាប់ការបង្ហាញបណ្តោះអាសន្ន
    orders.value = [
      { 
        id: 1089, 
        customer: 'សុខ សុភា', 
        date: '2026-10-28', 
        total: 45.00, 
        status: 'pending',
        shipping_address: { recipient_name: 'សុខ សុភា', phone: '012 345 678', detailed_address: 'ផ្ទះ ១២, ផ្លូវ ៣, ភ្នំពេញ' },
        items: [{ id: 1, name: 'កាបូបកំប្លោកខ្មែរ', quantity: 1, unitPrice: 45.00 }]
      },
      { 
        id: 1088, 
        customer: 'ចាន់ ដារ៉ា', 
        date: '2026-10-27', 
        total: 28.50, 
        status: 'processing',
        shipping_address: { recipient_name: 'ចាន់ ដារ៉ា', phone: '098 765 432', detailed_address: 'សៀមរាប' },
        items: [{ id: 2, name: 'ក្រមាខ្មែរសូត្រ', quantity: 2, unitPrice: 14.25 }]
      },
      { 
        id: 1087, 
        customer: 'កែវ ពិសី', 
        date: '2026-10-25', 
        total: 120.00, 
        status: 'delivered',
        shipping_address: { recipient_name: 'កែវ ពិសី', phone: '015 111 222', detailed_address: 'បាត់ដំបង' },
        items: [{ id: 3, name: 'កញ្ចប់អំណោយខ្មែរ', quantity: 1, unitPrice: 120.00 }]
      }
    ]
  }
}

onMounted(() => {
  fetchOrders()
})

const filteredOrders = computed(() => {
  return orders.value.filter(o => {
    const matchesStatus = selectedStatus.value === 'all' || o.status === selectedStatus.value
    const query = searchQuery.value.toLowerCase().trim()
    const matchesSearch = !query || 
      String(o.id).includes(query) || 
      (o.shipping_address?.recipient_name && o.shipping_address.recipient_name.toLowerCase().includes(query)) ||
      (o.customer && o.customer.toLowerCase().includes(query))
    return matchesStatus && matchesSearch
  })
})

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await api.put(`/orders/${orderId}/status`, { status: newStatus })
    const target = orders.value.find(o => o.id === orderId)
    if (target) target.status = newStatus
  } catch (err) {
    console.error('Error updating status:', err)
    // Front-end mock update
    const target = orders.value.find(o => o.id === orderId)
    if (target) target.status = newStatus
  }
}

const getStatusColorClass = (status) => {
  switch (status) {
    case 'pending': return 'text-amber-400 border-amber-500/40'
    case 'confirmed': return 'text-blue-400 border-blue-500/40'
    case 'processing': return 'text-indigo-400 border-indigo-500/40'
    case 'shipped': return 'text-sky-400 border-sky-500/40'
    case 'delivered': return 'text-emerald-400 border-emerald-500/40'
    case 'cancelled': return 'text-red-400 border-red-500/40'
    default: return 'text-amber-200 border-amber-600/40'
  }
}

const viewOrderDetail = (order) => {
  selectedOrder.value = order
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>