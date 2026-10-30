<!-- src/views/admin/Customer.vue -->
<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6 font-khmer bg-[#0D0B08] min-h-screen text-amber-50">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-600/20 pb-6">
      <div>
        <p class="text-xs text-amber-400 tracking-wider mb-1">❖ ប្រតិបត្តិការលក់</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">គ្រប់គ្រងអតិថិជន (Manage Customers)</h1>
      </div>
      <div class="text-xs text-amber-300/70 bg-amber-950/40 border border-amber-600/30 px-3.5 py-2 rounded-xl">
        អតិថិជនសរុប៖ <span class="font-bold text-amber-400">{{ customers.length }} នាក់</span>
      </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div class="relative w-full sm:max-w-md">
        <input 
          v-model.trim="searchQuery" 
          type="text" 
          placeholder="ស្វែងរកតាមឈ្មោះ អ៊ីមែល ឬលេខទូរស័ព្ទ..." 
          class="w-full bg-[#15120D] border border-amber-600/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-amber-50 placeholder-amber-900/60 outline-none transition"
        />
      </div>
    </div>

    <!-- Alert / Error message -->
    <div v-if="errorMsg" class="bg-red-950/60 border border-red-500/40 text-red-300 p-3.5 rounded-xl text-xs">
      {{ errorMsg }}
    </div>

    <!-- Customers Table -->
    <div class="bg-[#15120D] border border-amber-600/30 rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-amber-950/40 border-b border-amber-600/25 text-[11px] uppercase text-amber-200/70 font-semibold">
              <th class="p-4">អតិថិជន</th>
              <th class="p-4">ព័ត៌មានទំនាក់ទំនង</th>
              <th class="p-4">ការកុម្ម៉ង់សរុប</th>
              <th class="p-4">ថ្ងៃចុះឈ្មោះ</th>
              <th class="p-4 text-right">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-amber-600/10 text-xs sm:text-sm text-amber-100">
            <tr v-for="c in filteredCustomers" :key="c.id" class="hover:bg-amber-500/5 transition">
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    {{ getInitial(c.name) }}
                  </div>
                  <div>
                    <p class="font-bold text-white">{{ c.name }}</p>
                    <p class="text-[11px] text-amber-300/60">ID: #{{ c.id }}</p>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <p class="text-amber-100">{{ c.email }}</p>
                <p class="text-xs text-amber-300/60">{{ c.phone || 'គ្មានលេខទូរស័ព្ទ' }}</p>
              </td>
              <td class="p-4">
                <span class="font-bold text-amber-400">{{ c.total_orders || 0 }} Orders</span>
              </td>
              <td class="p-4 text-amber-300/70 text-xs">
                {{ c.created_at || '10 Oct 2026' }}
              </td>
              <td class="p-4 text-right">
                <button @click="viewCustomerDetail(c)" class="text-amber-400 font-semibold hover:underline">
                  មើលប្រវត្តិរូប →
                </button>
              </td>
            </tr>
            <tr v-if="filteredCustomers.length === 0">
              <td colspan="5" class="text-center py-10 text-amber-200/50">មិនរកឃើញអតិថិជនឡើយ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- CUSTOMER DETAIL MODAL POPUP -->
    <div v-if="selectedCustomer" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-[#15120D] border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-amber-50 space-y-5">
        
        <div class="flex items-center justify-between border-b border-amber-600/30 pb-3">
          <h3 class="font-bold text-lg text-amber-400">ប្រវត្តិរូបអតិថិជន</h3>
          <button @click="selectedCustomer = null" class="text-amber-300/60 hover:text-white text-lg">✕</button>
        </div>

        <div class="space-y-4 text-xs sm:text-sm">
          <div class="flex items-center gap-4 bg-[#0D0B08] p-4 rounded-xl border border-amber-600/20">
            <div class="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-bold text-xl flex items-center justify-center">
              {{ getInitial(selectedCustomer.name) }}
            </div>
            <div>
              <h4 class="font-bold text-base text-white">{{ selectedCustomer.name }}</h4>
              <p class="text-amber-300/70">{{ selectedCustomer.email }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 bg-[#0D0B08] p-4 rounded-xl border border-amber-600/20">
            <div>
              <span class="text-amber-300/60 block text-[11px]">លេខទូរស័ព្ទ៖</span>
              <span class="font-semibold text-amber-100">{{ selectedCustomer.phone || '-' }}</span>
            </div>
            <div>
              <span class="text-amber-300/60 block text-[11px]">ការកុម្ម៉ង់សរុប៖</span>
              <span class="font-semibold text-amber-400">{{ selectedCustomer.total_orders || 0 }} ដង</span>
            </div>
            <div class="col-span-2">
              <span class="text-amber-300/60 block text-[11px]">អាសយដ្ឋានដឹកជញ្ជូន៖</span>
              <span class="font-semibold text-amber-100">{{ selectedCustomer.address || 'មិនទាន់មានអាសយដ្ឋាន' }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button @click="selectedCustomer = null" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40">
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
import { toUser, unwrapList } from '@/services/normalizers'

const customers = ref([])
const searchQuery = ref('')
const errorMsg = ref('')
const selectedCustomer = ref(null)

const fetchCustomers = async () => {
  try {
    errorMsg.value = ''
    const res = await api.get('/admin/customers')
    const rawList = unwrapList(res)
    customers.value = rawList.map(toUser)
  } catch (err) {
    console.error('Error fetching customers:', err)
    // Fallback Mock data សម្រាប់ការបង្ហាញបណ្តោះអាសន្ន
    customers.value = [
      { id: 1, name: 'សុខ សុភា', email: 'sophea@example.com', phone: '012 345 678', total_orders: 5, address: 'ភ្នំពេញ', created_at: '2026-09-12' },
      { id: 2, name: 'ចាន់ ដារ៉ា', email: 'dara@example.com', phone: '098 765 432', total_orders: 2, address: 'សៀមរាប', created_at: '2026-10-01' },
      { id: 3, name: 'កែវ ពិសី', email: 'pisei@example.com', phone: '015 111 222', total_orders: 8, address: 'បាត់ដំបង', created_at: '2026-08-20' }
    ]
  }
}

onMounted(() => {
  fetchCustomers()
})

const filteredCustomers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return customers.value
  return customers.value.filter(c => 
    (c.name && c.name.toLowerCase().includes(query)) ||
    (c.email && c.email.toLowerCase().includes(query)) ||
    (c.phone && c.phone.includes(query))
  )
})

const getInitial = (name) => {
  return (Array.from((name || '').trim())[0] || '👤').toUpperCase()
}

const viewCustomerDetail = (customer) => {
  selectedCustomer.value = customer
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>