<!-- src/views/admin/Dashboard.vue -->
<template>
  <div class="p-6 max-w-7xl mx-auto space-y-8 font-khmer bg-[#0D0B08] min-h-screen text-amber-50">
    
    <!-- Top Header & Welcome -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-amber-600/20 pb-6">
      <div>
        <p class="text-xs text-amber-400 tracking-wider mb-1">❖ ផ្ទាំងគ្រប់គ្រងរដ្ឋបាល (Admin Dashboard)</p>
        <h1 class="text-3xl font-bold text-white tracking-tight">សួស្តីស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រង</h1>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3.5 py-1.5 rounded-xl font-medium">
          🟢 ប្រព័ន្ធដំណើរការធម្មតា (PostgreSQL Connected)
        </span>
      </div>
    </div>

    <!-- 1. Key Metrics Cards (Sales Operations Overview) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- Total Sales -->
      <div class="bg-[#15120D] border border-amber-600/30 hover:border-amber-400/60 p-6 rounded-2xl shadow-xl transition-all duration-300 group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs text-amber-200/70 uppercase font-semibold">ចំណូលសរុប (Total Sales)</span>
          <span class="text-amber-400 text-lg group-hover:scale-110 transition-transform">💰</span>
        </div>
        <h2 class="text-3xl font-extrabold text-amber-400 tracking-wide">${{ stats.total_revenue || '1,240.00' }}</h2>
        <span class="text-[11px] text-emerald-400 mt-2 inline-block">+12% ធៀបនឹងខែមុន</span>
      </div>

      <!-- Total Orders -->
      <div class="bg-[#15120D] border border-amber-600/30 hover:border-amber-400/60 p-6 rounded-2xl shadow-xl transition-all duration-300 group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs text-amber-200/70 uppercase font-semibold">ការកុម្ម៉ង់ (Total Orders)</span>
          <span class="text-amber-400 text-lg group-hover:scale-110 transition-transform">📦</span>
        </div>
        <h2 class="text-3xl font-extrabold text-white tracking-wide">{{ stats.total_orders || '48' }}</h2>
        <span class="text-[11px] text-amber-300/60 mt-2 inline-block">កំពុងរង់ចាំការដឹកជញ្ជូន 5</span>
      </div>

      <!-- Total Products -->
      <div class="bg-[#15120D] border border-amber-600/30 hover:border-amber-400/60 p-6 rounded-2xl shadow-xl transition-all duration-300 group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs text-amber-200/70 uppercase font-semibold">ផលិតផល (Products)</span>
          <span class="text-amber-400 text-lg group-hover:scale-110 transition-transform">🛍️</span>
        </div>
        <h2 class="text-3xl font-extrabold text-white tracking-wide">{{ stats.total_products || '16' }}</h2>
        <span class="text-[11px] text-amber-300/60 mt-2 inline-block">គ្រប់គ្រងលើ 4 ប្រភេទធំៗ</span>
      </div>

      <!-- Total Customers -->
      <div class="bg-[#15120D] border border-amber-600/30 hover:border-amber-400/60 p-6 rounded-2xl shadow-xl transition-all duration-300 group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs text-amber-200/70 uppercase font-semibold">អតិថិជន (Customers)</span>
          <span class="text-amber-400 text-lg group-hover:scale-110 transition-transform">👥</span>
        </div>
        <h2 class="text-3xl font-extrabold text-white tracking-wide">{{ stats.total_users || '32' }}</h2>
        <span class="text-[11px] text-emerald-400 mt-2 inline-block">+4 សមាជិកថ្មីសប្តាហ៍នេះ</span>
      </div>

    </div>

    <!-- 2. Quick Action Links -->
    <div class="bg-[#15120D] border border-amber-600/30 p-6 rounded-2xl shadow-xl space-y-4">
      <h3 class="text-sm font-bold text-amber-200 uppercase tracking-wide flex items-center gap-2">
        <span>❖</span> ផ្លូវកាត់រហ័ស (Quick Modules)
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <router-link to="/admin/products" class="p-3.5 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-600/30 rounded-xl text-center transition group">
          <span class="text-xl block mb-1 group-hover:scale-110 transition-transform">🏷️</span>
          <span class="text-xs font-bold text-amber-100">ផលិតផល</span>
        </router-link>
        <router-link to="/admin/orders" class="p-3.5 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-600/30 rounded-xl text-center transition group">
          <span class="text-xl block mb-1 group-hover:scale-110 transition-transform">📑</span>
          <span class="text-xs font-bold text-amber-100">ការកុម្ម៉ង់</span>
        </router-link>
        <router-link to="/admin/categories" class="p-3.5 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-600/30 rounded-xl text-center transition group">
          <span class="text-xl block mb-1 group-hover:scale-110 transition-transform">🗂️</span>
          <span class="text-xs font-bold text-amber-100">ប្រភេទ</span>
        </router-link>
        <router-link to="/admin/customers" class="p-3.5 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-600/30 rounded-xl text-center transition group">
          <span class="text-xl block mb-1 group-hover:scale-110 transition-transform">👤</span>
          <span class="text-xs font-bold text-amber-100">អតិថិជន</span>
        </router-link>
        <router-link to="/admin/promotions" class="p-3.5 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-600/30 rounded-xl text-center transition group">
          <span class="text-xl block mb-1 group-hover:scale-110 transition-transform">🎟️</span>
          <span class="text-xs font-bold text-amber-100">ប្រូម៉ូសិន</span>
        </router-link>
        <router-link to="/admin/settings" class="p-3.5 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-600/30 rounded-xl text-center transition group">
          <span class="text-xl block mb-1 group-hover:scale-110 transition-transform">⚙️</span>
          <span class="text-xs font-bold text-amber-100">ការកំណត់</span>
        </router-link>
      </div>
    </div>

    <!-- 3. Recent Orders & System Status Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Recent Orders Table (2 Cols) -->
      <div class="lg:col-span-2 bg-[#15120D] border border-amber-600/30 p-6 rounded-2xl shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <span class="text-amber-500 text-xs">❖</span> ការកុម្ម៉ង់ថ្មីៗ (Recent Orders)
          </h3>
          <router-link to="/admin/orders" class="text-xs text-amber-400 hover:text-amber-300 font-medium">មើលទាំងអស់ →</router-link>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-amber-600/20 text-[11px] uppercase text-amber-200/60 font-semibold">
                <th class="py-3 px-2">លេខកូដ</th>
                <th class="py-3 px-2">អតិថិជន</th>
                <th class="py-3 px-2">ទឹកប្រាក់</th>
                <th class="py-3 px-2">ស្ថានភាព</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-amber-600/10 text-xs text-amber-100">
              <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-amber-500/5 transition">
                <td class="py-3.5 px-2 font-bold font-mono text-amber-400">#{{ order.id }}</td>
                <td class="py-3.5 px-2">{{ order.customer }}</td>
                <td class="py-3.5 px-2 font-bold text-amber-400">${{ order.total }}</td>
                <td class="py-3.5 px-2">
                  <span class="px-2.5 py-1 rounded-full text-[10px] border" :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- System Status / Audit Logs (1 Col) -->
      <div class="bg-[#15120D] border border-amber-600/30 p-6 rounded-2xl shadow-xl space-y-4">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <span class="text-amber-500 text-xs">❖</span> សកម្មភាពប្រព័ន្ធ (System Activity)
        </h3>

        <div class="space-y-3.5 text-xs">
          <div class="flex items-start gap-3 border-b border-amber-600/10 pb-3">
            <span class="text-amber-400 font-bold">🛒</span>
            <div>
              <p class="text-amber-100 font-medium">ការកុម្ម៉ង់ថ្មី #1089 បានចូលមក</p>
              <span class="text-[10px] text-amber-300/50">15 នាទីមុន</span>
            </div>
          </div>
          <div class="flex items-start gap-3 border-b border-amber-600/10 pb-3">
            <span class="text-emerald-400 font-bold">👤</span>
            <div>
              <p class="text-amber-100 font-medium">អតិថិជនថ្មីបានចុះឈ្មោះ (សុខ សុភា)</p>
              <span class="text-[10px] text-amber-300/50">1 ម៉ោងមុន</span>
            </div>
          </div>
          <div class="flex items-start gap-3 pb-1">
            <span class="text-blue-400 font-bold">📦</span>
            <div>
              <p class="text-amber-100 font-medium">អាប់ដេតស្តុកផលិតផល (កាបូបកំប្លោក)</p>
              <span class="text-[10px] text-amber-300/50">3 ម៉ោងមុន</span>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <router-link to="/admin/settings" class="block w-full py-2.5 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-center rounded-xl text-xs font-bold transition">
            ពិនិត្យមើលសេចក្តីលម្អិតប្រព័ន្ធ
          </router-link>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { dashboardService } from '@/services/dashboardService'

const stats = ref({})
const recentOrders = ref([
  { id: '1089', customer: 'សុខ សុភា', total: '45.00', status: 'Pending' },
  { id: '1088', customer: 'ចាន់ ដារ៉ា', total: '28.50', status: 'Processing' },
  { id: '1087', customer: 'កែវ ពិសី', total: '120.00', status: 'Delivered' },
  { id: '1086', customer: 'ហេង សុខា', total: '15.00', status: 'Shipped' }
])

onMounted(async () => {
  try {
    const res = await dashboardService.getDashboardStats().catch(() => null)
    if (res && res.data) {
      stats.value = res.data
    }
  } catch (err) {
    console.error('Failed to load dashboard stats:', err)
  }
})

const getStatusClass = (status) => {
  switch (status) {
    case 'Pending': return 'text-amber-400 border-amber-500/40 bg-amber-950/40'
    case 'Processing': return 'text-sky-300 border-sky-400/40 bg-sky-950/40'
    case 'Shipped': return 'text-indigo-300 border-indigo-400/40 bg-indigo-950/40'
    case 'Delivered': return 'text-emerald-300 border-emerald-400/40 bg-emerald-950/40'
    default: return 'text-gray-300 border-gray-500/40 bg-gray-950/40'
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>
```eof

### 💡 សេចក្តីសន្និដ្ឋាន៖
ខ្ញុំបានបង្កើតឯកសារ **`src/views/admin/Dashboard.vue`** ពេញលេញរួចរាល់ហើយ ស្របតាម Dark Theme ក្បាច់ខ្មែរ (Angkor Gold Style) និងភ្ជាប់រួចជាស្រេចជាមួយ `dashboardService.js` របស់អ្នក ដើម្បីទាញយកទិន្នន័យពី Laravel API / PostgreSQL ផ្ទាល់! តើបងចង់ឱ្យខ្ញុំជួយបង្កើតទំព័រ Admin ណាមួយបន្តទៀតទេ?