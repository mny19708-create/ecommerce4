<!-- src/views/admin/siteBar.vue -->
<template>
  <aside class="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto bg-[#15120D] border-r border-amber-600/30 font-khmer flex flex-col justify-between p-4 text-amber-50">

    <!-- Top Brand / Logo -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 px-2 py-3 border-b border-amber-600/20">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg shadow-amber-600/20">
          ❖
        </div>
        <div>
          <h1 class="font-bold text-white text-sm tracking-wide">Admin Console</h1>
          <p class="text-[10px] text-amber-400">Khmer Handmade</p>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="space-y-1.5 text-xs">
        <router-link
          v-for="item in menu"
          :key="item.to"
          :to="item.to"
          class="sidebar-item"
          active-class="sidebar-active"
        >
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
    </div>

    <!-- Footer / Logout -->
    <div class="pt-4 border-t border-amber-600/20 space-y-1">
      <router-link
        to="/"
        class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-amber-100/70 hover:bg-amber-600/10 transition"
      >
        <span>🌐 មើលគេហទំព័រ</span>
      </router-link>
      <button
        @click="handleLogout"
        class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition"
      >
        <span>🚪 ចាកចេញពីប្រព័ន្ធ</span>
      </button>
    </div>

  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const menu = [
  { to: '/admin/dashboard', label: '📊 ផ្ទាំងគ្រប់គ្រង (Dashboard)' },
  { to: '/admin/products', label: '🛍️ គ្រប់គ្រងផលិតផល' },
  { to: '/admin/categories', label: '📂 គ្រប់គ្រងប្រភេទ' },
  { to: '/admin/orders', label: '📦 ការបញ្ជាទិញ (Orders)' },
  { to: '/admin/customers', label: '👥 អតិថិជន (Customers)' },
  { to: '/admin/reviews', label: '⭐ មតិយោបល់ (Reviews)' },
  { to: '/admin/promotions', label: '🎁 បញ្ចុះតម្លៃ (Promotions)' },
  { to: '/admin/cms', label: '📝 គ្រប់គ្រងមាតិកា (CMS)' },
  { to: '/admin/settings', label: '⚙️ ការកំណត់ប្រព័ន្ធ' }
]

const handleLogout = async () => {
  if (!confirm('តើអ្នកពិតជាចង់ចាកចេញពីប្រព័ន្ធ Admin មែនទេ?')) return
  await auth.logout()
  router.push({ name: 'admin-login' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  color: rgba(254, 243, 199, 0.7);
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  background-color: rgba(217, 119, 6, 0.15);
  color: #fef3c7;
}

.sidebar-active {
  background: linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.05));
  border-left: 3px solid #fbbf24;
  color: #fff;
  font-weight: bold;
}
</style>