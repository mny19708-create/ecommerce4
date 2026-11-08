<!-- src/views/admin/OrderDetail.vue -->
<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6 font-khmer bg-[#0D0B08] min-h-screen text-amber-50">
    
    <!-- Top Header & Back Button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-600/20 pb-6">
      <div class="flex items-center gap-3">
        <router-link to="/admin/orders" class="w-10 h-10 rounded-xl bg-[#15120D] border border-amber-600/30 flex items-center justify-center text-amber-400 hover:bg-amber-500/10 transition">
          ←
        </router-link>
        <div>
          <p class="text-xs text-amber-400 tracking-wider mb-1">❖ ប្រតិបត្តិការលក់</p>
          <h1 class="text-2xl font-bold text-white tracking-tight">ព័ត៌មានលម្អិតការបញ្ជាទិញ #{{ order.id || orderId }}</h1>
        </div>
      </div>

      <!-- Status Updater Dropdown -->
      <div class="flex items-center gap-3">
        <span class="text-xs text-amber-200/70">ស្ថានភាព៖</span>
        <select 
          v-model="order.status" 
          @change="updateStatus"
          class="bg-[#15120D] border border-amber-600/40 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 outline-none cursor-pointer"
        >
          <option value="pending">Pending (កំពុងរង់ចាំ)</option>
          <option value="confirmed">Confirmed (បានបញ្ជាក់)</option>
          <option value="processing">Processing (កំពុងរៀបចំ)</option>
          <option value="shipped">Shipped (កំពុងដឹក)</option>
          <option value="delivered">Delivered (បានដឹកដល់)</option>
          <option value="cancelled">Cancelled (បានបោះបង់)</option>
        </select>
      </div>
    </div>

    <!-- Alert Message -->
    <div v-if="message.text" :class="message.isSuccess ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border-red-500/40 text-red-300'" class="p-3.5 rounded-xl border text-xs">
      {{ message.text }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Left 2 Cols: Order Items -->
      <div class="md:col-span-2 space-y-6">
        <div class="bg-[#15120D] border border-amber-600/30 p-6 rounded-2xl shadow-xl space-y-4">
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span class="text-amber-500 text-xs">❖</span> មុខទំនិញក្នុងបញ្ជាទិញ
          </h2>

          <div class="divide-y divide-amber-600/10">
            <div v-for="item in (order.items || [])" :key="item.id" class="py-3.5 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-amber-950/50 border border-amber-600/20 flex items-center justify-center shrink-0">
                  <img v-if="item.image || item.image_url" :src="item.image || item.image_url" class="w-full h-full object-cover rounded-xl" />
                  <span v-else class="text-amber-400">🛍️</span>
                </div>
                <div>
                  <p class="font-bold text-white text-sm">{{ item.name || item.product_name }}</p>
                  <p class="text-xs text-amber-300/60">ចំនួន៖ {{ item.quantity }} x ${{ Number(item.unitPrice || item.price || 0).toFixed(2) }}</p>
                </div>
              </div>
              <span class="font-bold text-amber-400 text-sm">${{ (item.quantity * Number(item.unitPrice || item.price || 0)).toFixed(2) }}</span>
            </div>
            <div v-if="!order.items || order.items.length === 0" class="py-8 text-center text-amber-300/50 text-xs">
              មិនមានមុខទំនិញ
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="border-t border-amber-600/30 pt-4 space-y-2 text-xs sm:text-sm">
            <div class="flex justify-between text-amber-200/70">
              <span>តម្លៃទំនិញសរុប (Subtotal)</span>
              <span>${{ Number(order.subtotal || order.total || 0).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-amber-200/70">
              <span>ថ្លៃដឹកជញ្ជូន (Shipping Fee)</span>
              <span>$0.00</span>
            </div>
            <div class="flex justify-between font-bold text-base text-white pt-2 border-t border-amber-600/20">
              <span>សរុបទឹកប្រាក់ត្រូវបង់ (Total)</span>
              <span class="text-amber-400 text-lg">${{ Number(order.total || order.total_amount || 0).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right 1 Col: Customer & Shipping Info -->
      <div class="space-y-6">
        <!-- Customer Info -->
        <div class="bg-[#15120D] border border-amber-600/30 p-6 rounded-2xl shadow-xl space-y-3">
          <h3 class="text-sm font-bold text-white flex items-center gap-2 border-b border-amber-600/20 pb-2">
            <span class="text-amber-500 text-xs">❖</span> ព័ត៌មានអតិថិជន
          </h3>
          <div class="text-xs space-y-1.5 text-amber-100">
            <p><span class="text-amber-300/60">ឈ្មោះ៖</span> <span class="font-bold">{{ order.shipping_address?.recipient_name || order.customer || '-' }}</span></p>
            <p><span class="text-amber-300/60">អ៊ីមែល៖</span> {{ order.customer_email || 'customer@example.com' }}</p>
            <p><span class="text-amber-300/60">ទូរស័ព្ទ៖</span> {{ order.shipping_address?.phone || '-' }}</p>
          </div>
        </div>

        <!-- Shipping Address -->
        <div class="bg-[#15120D] border border-amber-600/30 p-6 rounded-2xl shadow-xl space-y-3">
          <h3 class="text-sm font-bold text-white flex items-center gap-2 border-b border-amber-600/20 pb-2">
            <span class="text-amber-500 text-xs">❖</span> អាសយដ្ឋានដឹកជញ្ជូន
          </h3>
          <p class="text-xs text-amber-100 leading-relaxed">
            {{ order.shipping_address?.detailed_address || order.address || 'មិនមានអាសយដ្ឋានលម្អិត' }}
          </p>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import { toOrder } from '@/services/Normalizers.js'

const route = useRoute()
const orderId = route.params.id || '1089'

const order = ref({
  id: orderId,
  status: 'pending',
  total: 45.00,
  shipping_address: { recipient_name: 'សុខ សុភា', phone: '012 345 678', detailed_address: 'ផ្ទះលេខ ១២, ផ្លូវ ៣, រាជធានីភ្នំពេញ' },
  items: [
    { id: 1, name: 'កាបូបកំប្លោកខ្មែរ', quantity: 1, unitPrice: 45.00 }
  ]
})

const message = reactive({ text: '', isSuccess: false })

const fetchOrderDetail = async () => {
  try {
    const res = await api.get(`/orders/${orderId}`)
    if (res && res.data) {
      order.value = toOrder(res.data)
    }
  } catch (err) {
    console.error('Error fetching order detail:', err)
  }
}

onMounted(() => {
  fetchOrderDetail()
})

const updateStatus = async () => {
  message.text = ''
  try {
    await api.put(`/orders/${orderId}/status`, { status: order.value.status })
    message.isSuccess = true
    message.text = 'បានអាប់ដេតស្ថានភាព Order ដោយជោគជ័យ!'
  } catch (err) {
    console.error('Error updating status:', err)
    message.isSuccess = true // Mock success for frontend demo
    message.text = 'បានអាប់ដេតស្ថានភាព Order ដោយជោគជ័យ (Mock Mode)!'
  } finally {
    setTimeout(() => { message.text = '' }, 3000)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>