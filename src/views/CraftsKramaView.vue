<!-- src/views/CraftsKramaView.vue
     Routes: /category/crafts-krama (បញ្ជី) និង /crafts-krama/:id (លម្អិត)
     ទាញផលិតផលពី productStore ហើយត្រងតាមប្រភេទ crafts-krama -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-8 font-['Kantumruy_Pro']">
    <!-- ===== Detail mode: /crafts-krama/:id ===== -->
    <template v-if="detailId">
      <CraftsKramaDetail v-if="detailProduct" :key="detailId" :product="detailProduct" />

      <div v-else-if="loading" class="py-24 text-center text-sm text-gray-500">កំពុងផ្ទុក...</div>

      <div v-else class="bg-white rounded-3xl border border-gray-100 shadow-sm py-16 text-center">
        <div class="text-5xl mb-3">🧵</div>
        <p class="text-sm text-gray-600 font-medium mb-4">រកមិនឃើញផលិតផលនេះទេ</p>
        <router-link to="/category/crafts-krama" class="text-xs text-amber-700 hover:text-amber-900 font-semibold">
          ← ត្រឡប់ទៅ Crafts &amp; Krama
        </router-link>
      </div>
    </template>

    <!-- ===== List mode: /category/crafts-krama ===== -->
    <template v-else>
    <!-- Breadcrumb -->
    <nav class="flex text-xs text-gray-500 mb-6 gap-2 items-center">
      <router-link to="/" class="hover:text-amber-600 transition-colors">ទំព័រដើម</router-link>
      <span>/</span>
      <span class="text-gray-800 font-semibold">Crafts &amp; Krama</span>
    </nav>

    <!-- Header -->
    <div class="mb-8 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Crafts &amp; Krama (ក្រមា និងសិប្បកម្ម)</h1>
      <p class="text-sm text-gray-500">សិប្បកម្មធ្វើដោយដៃបែបបុរាណ ក្រមាខ្មែរ និងរបស់អនុស្សាវរីយ៍កែច្នៃយ៉ាងប្រណីត</p>
    </div>

    <!-- Toolbar: search + sort -->
    <div class="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:max-w-xs">
        <input
          v-model.trim="search"
          type="text"
          placeholder="ស្វែងរកផលិតផល..."
          class="w-full text-sm bg-white border border-gray-200 rounded-xl pl-4 pr-9 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
        />
        <button
          v-if="search"
          @click="search = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          title="សម្អាត"
        >✕</button>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs text-gray-500 whitespace-nowrap">{{ filtered.length }} ផលិតផល</span>
        <select
          v-model="sortBy"
          class="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
        >
          <option value="default">តម្រៀបតាម៖ លំនាំដើម</option>
          <option value="price-asc">តម្លៃ ទាប → ខ្ពស់</option>
          <option value="price-desc">តម្លៃ ខ្ពស់ → ទាប</option>
          <option value="name">ឈ្មោះ A → Z</option>
        </select>
      </div>
    </div>

    <!-- Grid -->
    <div v-if="filtered.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <div
        v-for="p in filtered"
        :key="idOf(p)"
        @click="goDetail(p)"
        class="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-4 group flex flex-col cursor-pointer"
      >
        <!-- Image + heart -->
        <div class="relative aspect-square rounded-2xl overflow-hidden bg-amber-50 mb-3">
          <img
            v-if="imgOf(p)"
            :src="imgOf(p)"
            :alt="nameOf(p)"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            @error="onImgError"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-6xl">🧵</div>

          <span
            v-if="discountOf(p)"
            class="absolute top-3 left-3 text-[11px] font-bold text-rose-600 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm"
          >-{{ discountOf(p) }}%</span>

          <button
            @click.stop="wishlistStore.toggleWishlist(p)"
            class="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 shadow-md active:scale-95 transition-all"
            title="បន្ថែមទៅបំណងប្រាថ្នា"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="wishlistStore.isWishlisted(idOf(p)) ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'"
              class="w-5 h-5 transition-colors"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>

        <!-- Info -->
        <p class="text-xs font-medium text-amber-600 mb-1">{{ p.tag || 'Crafts & Krama' }}</p>
        <h3 class="font-bold text-gray-800 text-base leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
          {{ nameOf(p) }}
        </h3>
        <p v-if="p.description" class="text-xs text-gray-500 mt-1.5 line-clamp-2">{{ p.description }}</p>

        <!-- Price + add -->
        <div class="mt-auto pt-4 flex items-center justify-between gap-2">
          <div class="flex flex-col leading-tight">
            <span class="text-amber-600 font-bold text-lg">${{ Number(p.price || 0).toFixed(2) }}</span>
            <span v-if="p.originalPrice" class="text-xs text-gray-400 line-through">${{ Number(p.originalPrice).toFixed(2) }}</span>
          </div>
          <button
            @click.stop="addToCart(p)"
            class="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
          >
            + កន្ត្រក
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="bg-white rounded-3xl border border-gray-100 shadow-sm py-16 text-center">
      <div class="text-5xl mb-3">🧵</div>
      <p class="text-sm text-gray-600 font-medium">
        {{ search ? 'រកមិនឃើញផលិតផលដែលត្រូវនឹងការស្វែងរក' : 'មិនទាន់មានផលិតផលក្នុងប្រភេទនេះទេ' }}
      </p>
      <button
        v-if="search"
        @click="search = ''"
        class="mt-4 text-xs text-amber-700 hover:text-amber-900 font-semibold"
      >សម្អាតការស្វែងរក</button>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toastMessage"
        class="fixed bottom-5 right-5 z-50 bg-gray-900/90 text-white text-xs px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 border border-gray-700"
      >
        <span class="text-amber-400 font-bold">✓</span> {{ toastMessage }}
      </div>
    </transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import CraftsKramaDetail from './CraftsKramaDetail.vue'

const router = useRouter()
const route = useRoute()
const wishlistStore = useWishlistStore()
const productStore = useProductStore()
const cartStore = useCartStore()

const search = ref('')
const sortBy = ref('default')
const toastMessage = ref('')
let toastTimer = null
const loading = ref(!productStore.products.length)

// ----- detail mode (route /crafts-krama/:id) -----
const detailId = computed(() => (route.params.id ? String(route.params.id) : ''))
const detailProduct = computed(() =>
  detailId.value
    ? productStore.products.find((p) => String(p.id ?? p._id) === detailId.value) || null
    : null
)

// ----- helpers (ដូចក្នុង CraftsKramaDetail.vue) -----
const idOf = (p) => p.id ?? p._id
const nameOf = (p) => p.name || p.title || ''
const imgOf = (p) => {
  const first = Array.isArray(p.images) ? p.images[0] : null
  return p.image || p.image_url || p.imageUrl || p.thumbnail || (typeof first === 'string' ? first : first?.url) || ''
}
const discountOf = (p) => {
  if (!p.originalPrice || Number(p.originalPrice) <= Number(p.price)) return 0
  return Math.round((1 - Number(p.price) / Number(p.originalPrice)) * 100)
}
const sameCategory = (p) => {
  const c = p.category
  const raw = String(typeof c === 'object' && c ? c.slug || c.name : c || '').trim().toLowerCase()
  const key = raw.replace(/[^a-z0-9]/g, '') // 'Crafts & Krama' / 'crafts-krama' -> 'craftskrama'
  return key === 'craftskrama' || raw === 'ក្រមា និងសិប្បកម្ម'
}

// ----- filter + search + sort -----
const filtered = computed(() => {
  const q = search.value.toLowerCase()
  let list = productStore.products.filter(sameCategory)

  if (q) {
    list = list.filter((p) =>
      [nameOf(p), p.description, p.maker, p.community, p.tag]
        .filter(Boolean)
        .some((t) => String(t).toLowerCase().includes(q))
    )
  }

  list = [...list]
  if (sortBy.value === 'price-asc') list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
  else if (sortBy.value === 'price-desc') list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
  else if (sortBy.value === 'name') list.sort((a, b) => nameOf(a).localeCompare(nameOf(b)))

  return list
})

// ----- actions -----
function onImgError(e) {
  e.target.style.display = 'none'
}
function showToast(message) {
  toastMessage.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastMessage.value = ''), 2500)
}
function goDetail(p) {
  const id = idOf(p)
  if (id === undefined || id === null || id === '') return
  router.push('/crafts-krama/' + id)
}
function addToCart(p) {
  cartStore.addToCart(p, 1)
  showToast(`បានបន្ថែម "${nameOf(p)}" ចូលកន្ត្រក!`)
}

// បើ store មិនទាន់មានទិន្នន័យ ព្យាយាមទាញ (ប្តូរឈ្មោះ method តាម store របស់អ្នក)
onMounted(async () => {
  if (!productStore.products.length && typeof productStore.fetchProducts === 'function') {
    try {
      await productStore.fetchProducts()
    } finally {
      loading.value = false
    }
  } else {
    loading.value = false
  }
})
onBeforeUnmount(() => clearTimeout(toastTimer))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>