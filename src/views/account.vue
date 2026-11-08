<!-- src/views/Account.vue  (route: /account) -->
<template>
  <div class="min-h-screen bg-[#0D0B08] text-amber-50 font-khmer">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

      <!-- Header -->
      <header class="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 p-[1px] shadow-[0_0_20px_rgba(217,119,6,0.25)] shrink-0">
          <div class="w-full h-full rounded-[15px] bg-[#120f0a] flex items-center justify-center text-3xl font-bold text-amber-400">
            {{ initial }}
          </div>
        </div>
        <div class="min-w-0">
          <p class="text-xs text-amber-300/70 tracking-wider mb-1">❖ គណនីរបស់ខ្ញុំ</p>
          <h1 class="text-2xl sm:text-3xl font-bold text-amber-50 truncate">សួស្តី {{ user?.name }}</h1>
          <p class="text-sm text-amber-200/60 truncate">{{ user?.email }}</p>
        </div>
      </header>

      <!-- Tabs -->
      <div class="flex gap-2 mb-8 border-b border-amber-600/20 overflow-x-auto">
        <button
          v-for="t in tabs"
          :key="t.id"
          type="button"
          class="relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors"
          :class="tab === t.id ? 'text-amber-400' : 'text-amber-100/60 hover:text-amber-300'"
          @click="setTab(t.id)"
        >
          {{ t.label }}
          <span class="absolute left-0 -bottom-px h-[2px] bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300" :class="tab === t.id ? 'w-full' : 'w-0'"></span>
        </button>
      </div>

      <transition name="fade" mode="out-in">

        <!-- ================= DASHBOARD ================= -->
        <section v-if="tab === 'dashboard'" key="dashboard" class="space-y-10">

          <!-- Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <router-link
              v-for="s in stats"
              :key="s.label"
              :to="s.to"
              class="card p-6 hover:border-amber-500/60 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs text-amber-200/60">{{ s.label }}</span>
                <span class="text-amber-400 group-hover:scale-110 transition-transform">{{ s.icon }}</span>
              </div>
              <p class="text-3xl font-bold text-amber-400">{{ s.value }}</p>
            </router-link>
          </div>

          <!-- Quick links -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <router-link v-for="q in quick" :key="q.to" :to="q.to" class="quick">
              <span class="text-amber-400">{{ q.icon }}</span>
              <span>{{ q.label }}</span>
            </router-link>
          </div>

          <!-- Recent orders -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-base font-bold text-amber-50 flex items-center gap-2"><span class="text-amber-500 text-xs">❖</span> ការកុម្ម៉ង់ថ្មីៗ</h2>
              <router-link v-if="orders.length" to="/orders" class="text-xs text-amber-400 hover:text-amber-300">មើលទាំងអស់ →</router-link>
            </div>

            <div v-if="!orders.length" class="card p-10 text-center">
              <p class="text-sm text-amber-200/60 mb-5">អ្នកមិនទាន់មានការកុម្ម៉ង់ទេ។</p>
              <router-link to="/products" class="inline-block px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-sm rounded-full hover:bg-amber-400 transition">ទិញទំនិញឥឡូវនេះ</router-link>
            </div>

            <ul v-else class="card divide-y divide-amber-600/10 overflow-hidden">
              <li v-for="o in orders.slice(0, 3)" :key="o.id" class="flex items-center justify-between gap-4 px-5 py-4">
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-amber-50 truncate">#{{ o.id }}</p>
                  <p class="text-xs text-amber-200/60 mt-0.5">{{ o.date }}</p>
                </div>
                <span class="text-[11px] px-3 py-1 rounded-full border" :class="statusClass(o.status)">{{ statusLabel(o.status) }}</span>
                <span class="text-sm font-bold text-amber-400">{{ o.total }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- ================= PROFILE ================= -->
        <section v-else key="profile" class="grid lg:grid-cols-2 gap-8">

          <!-- Profile form -->
          <form class="card p-6 sm:p-8 space-y-5" @submit.prevent="saveProfile">
            <h2 class="text-base font-bold flex items-center gap-2"><span class="text-amber-500 text-xs">❖</span> ព័ត៌មានផ្ទាល់ខ្លួន</h2>

            <div>
              <label class="lbl">ឈ្មោះ</label>
              <input v-model.trim="profile.name" type="text" class="inp" placeholder="ឈ្មោះរបស់អ្នក" />
            </div>
            <div>
              <label class="lbl">អ៊ីមែល</label>
              <input :value="user?.email" type="email" class="inp opacity-60 cursor-not-allowed" disabled />
            </div>
            <div>
              <label class="lbl">លេខទូរស័ព្ទ</label>
              <input v-model.trim="profile.phone" type="tel" class="inp" placeholder="012 345 678" />
            </div>
            <div>
              <label class="lbl">អាសយដ្ឋានដឹកជញ្ជូន</label>
              <textarea v-model.trim="profile.address" rows="3" class="inp resize-none" placeholder="ផ្ទះលេខ, ផ្លូវ, ខណ្ឌ, ក្រុង/ខេត្ត"></textarea>
            </div>

            <p v-if="profileMsg.text" class="text-sm" :class="profileMsg.ok ? 'text-amber-400' : 'text-red-400'">{{ profileMsg.text }}</p>

            <button type="submit" class="btn-gold">រក្សាទុកការផ្លាស់ប្តូរ</button>
          </form>

          <!-- Password + danger -->
          <div class="space-y-8">
            <form class="card p-6 sm:p-8 space-y-5" @submit.prevent="savePassword">
              <h2 class="text-base font-bold flex items-center gap-2"><span class="text-amber-500 text-xs">❖</span> ប្តូរលេខសម្ងាត់</h2>

              <div>
                <label class="lbl">លេខសម្ងាត់បច្ចុប្បន្ន</label>
                <input v-model="pw.current" type="password" autocomplete="current-password" class="inp" />
              </div>
              <div>
                <label class="lbl">លេខសម្ងាត់ថ្មី</label>
                <input v-model="pw.next" type="password" autocomplete="new-password" class="inp" placeholder="យ៉ាងតិច ៦ តួអក្សរ" />
              </div>
              <div>
                <label class="lbl">បញ្ជាក់លេខសម្ងាត់ថ្មី</label>
                <input v-model="pw.confirm" type="password" autocomplete="new-password" class="inp" />
              </div>

              <p v-if="pwMsg.text" class="text-sm" :class="pwMsg.ok ? 'text-amber-400' : 'text-red-400'">{{ pwMsg.text }}</p>

              <button type="submit" class="btn-outline">ប្តូរលេខសម្ងាត់</button>
            </form>

            <div class="card p-6 sm:p-8 flex items-center justify-between gap-4">
              <div>
                <p class="text-sm font-semibold">ចាកចេញពីគណនី</p>
                <p class="text-xs text-amber-200/60 mt-1">អ្នកអាចចូលវិញបានគ្រប់ពេល។</p>
              </div>
              <button type="button" class="px-5 py-2.5 text-sm text-red-400 border border-red-500/40 rounded-full hover:bg-red-500/10 transition" @click="logout">ចាកចេញ</button>
            </div>
          </div>
        </section>

      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const wishlist = useWishlistStore()

// ---------- session ----------
const user = ref(null)

const readSession = () => {
  try {
    user.value = JSON.parse(localStorage.getItem('user_session')) || null
  } catch {
    user.value = null
  }
  if (!user.value) router.replace({ path: '/auth', query: { redirect: route.fullPath } })
}

const initial = computed(() => (Array.from((user.value?.name || '').trim())[0] || '👤').toUpperCase())

// ---------- tabs ----------
const tabs = [
  { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង' },
  { id: 'profile', label: 'ព័ត៌មានផ្ទាល់ខ្លួន' }
]
const tab = computed(() => (route.query.tab === 'profile' ? 'profile' : 'dashboard'))
const setTab = (id) => router.replace({ path: '/account', query: id === 'dashboard' ? {} : { tab: id } })

// ---------- counts ----------
const cartCount = computed(() => {
  if (cart.totalItems !== undefined) return typeof cart.totalItems === 'number' ? cart.totalItems : cart.totalItems.value
  return cart.items ? cart.items.reduce((s, i) => s + i.quantity, 0) : 0
})
const wishCount = computed(() => {
  if (wishlist.totalWishlistCount !== undefined)
    return typeof wishlist.totalWishlistCount === 'number' ? wishlist.totalWishlistCount : wishlist.totalWishlistCount.value
  return wishlist.items ? wishlist.items.length : 0
})

// ---------- orders (read-only preview; full list lives at /orders) ----------
// កែ key ខាងក្រោមឲ្យត្រូវនឹងកន្លែងដែលអ្នករក្សាទុកការកុម្ម៉ង់ ឬប្តូរទៅប្រើ store/API របស់អ្នក
const ORDER_KEYS = ['orders', 'user_orders', 'order_history']
import { useOrderStore } from '@/stores/order' // ត្រូវប្រាកដថាបាន import store នេះមកប្រើ
const orderStore = useOrderStore()

// ---------- orders (ទាញយកទិន្នន័យពី Backend-Ready Order Store) ----------
const orders = ref([])

const loadOrders = async () => {
  try {
    // ហៅទិន្នន័យពី Laravel API ຜ່ານ Order Store ផ្ទាល់
    await orderStore.fetchMyOrders()
    
    if (orderStore.orders && Array.isArray(orderStore.orders)) {
      orders.value = orderStore.orders.map((o, i) => ({
        id: o.id || o.order_id || i + 1,
        date: o.date || o.created_at || '',
        status: o.status || o.order_status || 'pending',
        total: formatTotal(o.total ?? o.total_amount ?? o.amount)
      }))
    }
  } catch (err) {
    console.error('Error loading orders in account:', err)
    orders.value = []
  }
}

const formatTotal = (v) => {
  if (v === undefined || v === null || v === '') return ''
  return typeof v === 'number' ? '$' + v.toFixed(2) : String(v)
}

const statusMap = {
  pending: ['កំពុងរង់ចាំ', 'text-amber-400 border-amber-500/40'],
  processing: ['កំពុងរៀបចំ', 'text-amber-400 border-amber-500/40'],
  shipping: ['កំពុងដឹកជញ្ជូន', 'text-sky-300 border-sky-400/40'],
  delivered: ['បានដឹកដល់', 'text-emerald-300 border-emerald-400/40'],
  completed: ['បានបញ្ចប់', 'text-emerald-300 border-emerald-400/40'],
  cancelled: ['បានលុបចោល', 'text-red-400 border-red-500/40']
}
const statusLabel = (s) => (statusMap[s] ? statusMap[s][0] : s)
const statusClass = (s) => (statusMap[s] ? statusMap[s][1] : 'text-amber-200 border-amber-600/40')

// ---------- stats / quick links ----------
const stats = computed(() => [
  { label: 'ការកុម្ម៉ង់សរុប', value: orders.value.length, icon: '📜', to: '/orders' },
  { label: 'បញ្ជីប្រាថ្នា', value: wishCount.value, icon: '♡', to: '/wishlist' },
  { label: 'ក្នុងកន្ត្រក', value: cartCount.value, icon: '🛍', to: '/cart' }
])
const quick = [
  { label: 'ទិញទំនិញ', icon: '❖', to: '/products' },
  { label: 'កន្ត្រកទំនិញ', icon: '🛍', to: '/cart' },
  { label: 'បញ្ជីប្រាថ្នា', icon: '♡', to: '/wishlist' },
  { label: 'ទំនាក់ទំនងយើង', icon: '✉', to: '/contact-us' }
]

// ---------- profile ----------
const profile = reactive({ name: '', phone: '', address: '' })
const profileMsg = reactive({ ok: true, text: '' })

const fillProfile = () => {
  profile.name = user.value?.name || ''
  profile.phone = user.value?.phone || ''
  profile.address = user.value?.address || ''
}

// បើអ្នកមានបញ្ជី `users` ក្នុង localStorage (សម្រាប់ login ក្លែងក្លាយ) វានឹង update ព័ត៌មានទីនោះផងដែរ
const syncUsersList = (patch) => {
  try {
    const list = JSON.parse(localStorage.getItem('users'))
    if (!Array.isArray(list)) return null
    const i = list.findIndex((u) => u.email === user.value.email)
    if (i < 0) return null
    list[i] = { ...list[i], ...patch }
    localStorage.setItem('users', JSON.stringify(list))
    return list[i]
  } catch {
    return null
  }
}

const saveProfile = () => {
  if (!profile.name) {
    profileMsg.ok = false
    profileMsg.text = 'សូមបញ្ចូលឈ្មោះរបស់អ្នក'
    return
  }
  const patch = { name: profile.name, phone: profile.phone, address: profile.address }
  const next = { ...user.value, ...patch }
  localStorage.setItem('user_session', JSON.stringify(next))
  syncUsersList(patch)
  user.value = next
  window.dispatchEvent(new Event('auth-changed')) // ឲ្យ Navbar ប្តូរឈ្មោះភ្លាមៗ
  profileMsg.ok = true
  profileMsg.text = 'បានរក្សាទុករួចរាល់'
}

// ---------- password ----------
const pw = reactive({ current: '', next: '', confirm: '' })
const pwMsg = reactive({ ok: true, text: '' })

const savePassword = () => {
  pwMsg.ok = false
  if (!pw.current || !pw.next) return (pwMsg.text = 'សូមបំពេញព័ត៌មានឲ្យគ្រប់')
  if (pw.next.length < 6) return (pwMsg.text = 'លេខសម្ងាត់ថ្មីត្រូវមានយ៉ាងតិច ៦ តួអក្សរ')
  if (pw.next !== pw.confirm) return (pwMsg.text = 'លេខសម្ងាត់ថ្មីទាំងពីរមិនដូចគ្នា')

  // ដំណើរការជាមួយ `users` ក្នុង localStorage ប៉ុណ្ណោះ។ បើមាន backend សូមហៅ API ជំនួស។
  let list
  try {
    list = JSON.parse(localStorage.getItem('users'))
  } catch {}
  const rec = Array.isArray(list) ? list.find((u) => u.email === user.value.email) : null
  if (!rec) return (pwMsg.text = 'មិនអាចប្តូរលេខសម្ងាត់នៅទីនេះបានទេ (សូមភ្ជាប់ API របស់អ្នក)')
  if (rec.password !== pw.current) return (pwMsg.text = 'លេខសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ')

  syncUsersList({ password: pw.next })
  pw.current = pw.next = pw.confirm = ''
  pwMsg.ok = true
  pwMsg.text = 'បានប្តូរលេខសម្ងាត់រួចរាល់'
}

// ---------- logout ----------
const logout = () => {
  localStorage.removeItem('user_session')
  window.dispatchEvent(new Event('auth-changed'))
  router.push('/')
}

// ---------- lifecycle ----------
const onAuthChanged = () => {
  readSession()
  fillProfile()
  loadOrders()
}

onMounted(() => {
  readSession()
  fillProfile()
  loadOrders()
  window.addEventListener('auth-changed', onAuthChanged)
  window.addEventListener('storage', onAuthChanged)
})
onBeforeUnmount(() => {
  window.removeEventListener('auth-changed', onAuthChanged)
  window.removeEventListener('storage', onAuthChanged)
})

watch(tab, () => {
  profileMsg.text = ''
  pwMsg.text = ''
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }

.card {
  display: block;
  background: #15120d;
  border: 1px solid rgba(217, 119, 6, 0.3);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.quick {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  font-size: 0.8rem;
  color: rgba(254, 243, 199, 0.85);
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(217, 119, 6, 0.25);
  border-radius: 0.85rem;
  transition: all 200ms ease;
}
.quick:hover {
  background: rgba(217, 119, 6, 0.15);
  border-color: rgba(245, 158, 11, 0.5);
  color: #fef3c7;
  transform: translateY(-2px);
}

.lbl {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: rgba(253, 230, 138, 0.65);
}
.inp {
  width: 100%;
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  color: #fef3c7;
  background: #0d0b08;
  border: 1px solid rgba(217, 119, 6, 0.3);
  border-radius: 0.75rem;
  outline: none;
  transition: border-color 200ms, box-shadow 200ms;
}
.inp::placeholder { color: rgba(254, 243, 199, 0.3); }
.inp:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
}

.btn-gold {
  padding: 0.75rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  background: #f59e0b;
  border-radius: 9999px;
  transition: background-color 200ms, transform 150ms;
}
.btn-gold:hover { background: #fbbf24; }
.btn-gold:active { transform: scale(0.97); }

.btn-outline {
  padding: 0.75rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.5);
  border-radius: 9999px;
  transition: all 200ms;
}
.btn-outline:hover { background: rgba(245, 158, 11, 0.12); border-color: #f59e0b; }

.fade-enter-active, .fade-leave-active { transition: opacity 250ms, transform 250ms; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(8px); }
</style>