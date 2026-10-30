<!-- src/views/ProductsView.vue — បញ្ជីផលិតផល + Breadcrumb + Price range + Color filter + Pagination (8/ទំព័រ) -->
<template>
  <!-- w-screen: ទទឹងពេញ screen ដើម្បីឱ្យខ្លឹមសារនៅចំកណ្តាល ទោះ parent តូច -->
  <div class="w-screen">
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Kantumruy_Pro']">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <router-link to="/" class="text-teal-500 font-medium hover:text-teal-600 transition-colors">
        ទំព័រដើម
      </router-link>
      <span class="text-gray-400">/</span>
      <span class="text-gray-700">ផលិតផលទាំងអស់</span>
    </nav>

    <!-- Header -->
    <div class="mb-6 border-b border-gray-100 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">ផលិតផលទាំងអស់</h1>
        <p class="text-sm text-gray-500 mt-1">ផលិតផលដៃសិប្បកម្មខ្មែរគ្រប់ប្រភេទ</p>
      </div>
      <div class="text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 self-start md:self-auto">
        បង្ហាញ៖ <span class="font-bold text-amber-600">{{ paginatedProducts.length }}</span>
        / {{ filteredProducts.length }} ផលិតផល
      </div>
    </div>

    <!-- Filter Panel -->
    <div class="mb-6 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Price Range -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-xs font-bold text-gray-700">តម្លៃ (Price)</label>
          <span class="text-xs font-semibold text-amber-600">${{ priceMin }} - ${{ priceMax }}</span>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <span class="text-[11px] text-gray-400 w-8">Min</span>
            <input type="range" v-model.number="priceMin" min="0" :max="maxPrice" step="0.5"
              class="w-full accent-amber-600 cursor-pointer" />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[11px] text-gray-400 w-8">Max</span>
            <input type="range" v-model.number="priceMax" min="0" :max="maxPrice" step="0.5"
              class="w-full accent-amber-600 cursor-pointer" />
          </div>
        </div>
      </div>

      <!-- Color Filter -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-xs font-bold text-gray-700">ពណ៌ (Color)</label>
          <button v-if="selectedColors.length" @click="selectedColors = []"
            class="text-[11px] text-gray-400 hover:text-amber-600">សម្អាត</button>
        </div>
        <div v-if="availableColors.length" class="flex flex-wrap gap-2.5">
          <button v-for="c in availableColors" :key="c" @click="toggleColor(c)" :title="c"
            :style="{ backgroundColor: COLOR_MAP[c] || c }"
            :class="selectedColors.includes(c) ? 'ring-2 ring-amber-500 ring-offset-2' : 'border-gray-200'"
            class="w-8 h-8 rounded-full border transition-all active:scale-95"></button>
        </div>
        <p v-else class="text-xs text-gray-400">មិនទាន់មានទិន្នន័យពណ៌</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="productStore.loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="n in 4" :key="n" class="animate-pulse bg-white border border-gray-100 rounded-2xl p-3">
        <div class="bg-gray-200 h-52 rounded-xl mb-3"></div>
        <div class="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-8 bg-gray-200 rounded-xl"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="productStore.error" class="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
      <p class="text-red-600 font-medium text-sm">មានបញ្ហាក្នុងการទាញយកទិន្នន័យ៖ {{ productStore.error }}</p>
    </div>

    <!-- Empty -->
    <div v-else-if="!filteredProducts.length" class="text-center text-sm text-gray-500 py-10">
      មិនមានផលិតផលត្រូវតាមការត្រងទេ
    </div>

    <!-- Grid (បង្ហាញតែ 8 ក្នុង 1 ទំព័រ) -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in paginatedProducts" :key="product.id ?? product._id"
        class="w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3 relative group flex flex-col justify-between">
        <div>
          <div class="relative w-full h-52 rounded-xl overflow-hidden bg-amber-50 cursor-pointer"
            @click="goToDetail(product)">
            <img :src="getImage(product)" :alt="product.name || product.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

            <button @click.stop="wishlistStore.toggleWishlist(product)"
              class="absolute top-2.5 right-2.5 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-sm active:scale-95"
              aria-label="Add to wishlist">
              <svg xmlns="http://www.w3.org/2000/svg"
                :class="wishlistStore.isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'"
                class="w-5 h-5 transition-colors" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          <div class="mt-3 px-1">
            <span class="text-[11px] font-medium text-amber-600 tracking-wide block mb-0.5">
              {{ product.tag || categoryOf(product) }}
            </span>
            <h3 @click="goToDetail(product)"
              class="text-base font-bold text-gray-800 line-clamp-1 cursor-pointer hover:text-amber-600 transition-colors">
              {{ product.name || product.title }}
            </h3>
            <p class="text-xs text-gray-400 line-clamp-2 mt-0.5 mb-3">{{ product.description }}</p>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-2.5 px-1 flex items-center justify-between mt-2">
          <span class="text-lg font-bold text-amber-600">${{ Number(product.price || 0).toFixed(2) }}</span>
          <button @click="handleAddToCart(product)"
            class="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow">
            + កន្ត្រក
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination: មុន / លេខទំព័រ / បន្ទាប់ -->
    <nav v-if="totalPages > 1 && !productStore.loading" class="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-3.5 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
        ‹ មុន
      </button>

      <button v-for="n in totalPages" :key="n" @click="goToPage(n)"
        :class="n === currentPage
          ? 'bg-amber-600 text-white border-amber-600'
          : 'bg-white text-gray-700 border-gray-200 hover:border-amber-400 hover:text-amber-600'"
        class="w-9 h-9 text-xs font-semibold rounded-xl border transition-all">
        {{ n }}
      </button>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-3.5 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
        បន្ទាប់ ›
      </button>
    </nav>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toastMessage"
        class="fixed bottom-5 right-5 z-50 bg-gray-900/90 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2">
        <span class="text-amber-400">✓</span> {{ toastMessage }}
      </div>
    </transition>
  </div>
  </div>

</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const wishlistStore = useWishlistStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const toastMessage = ref('')
let toastTimer = null

const COLOR_MAP = {
  red: '#ef4444', pink: '#ec4899', green: '#22c55e', blue: '#3b82f6',
  yellow: '#eab308', orange: '#f97316', purple: '#a855f7',
  white: '#ffffff', black: '#111827', brown: '#92400e', gold: '#d4a017'
}

const CATEGORY_LABELS = {
  'crafts-krama': 'Crafts & Krama',
  'food-spices': 'Food & Spices',
  'health-beauty': 'Health & Beauty',
  'souvenir-gift-sets': 'Souvenir & Gift Sets'
}

const categoryOf = (p) => {
  const c = p.category
  const key = String(typeof c === 'object' && c ? c.slug || c.name : c || '').trim().toLowerCase()
  return CATEGORY_LABELS[key] || 'ផលិតផល'
}

const getImage = (p) =>
  p.image || p.image_url || p.imageUrl || p.thumbnail ||
  (Array.isArray(p.images) && (typeof p.images[0] === 'string' ? p.images[0] : p.images[0]?.url)) ||
  'https://via.placeholder.com/300'

const getColors = (p) => (Array.isArray(p.colors) ? p.colors : p.color ? [p.color] : [])

// ផលិតផលទាំងអស់ពី store
const baseProducts = computed(() => productStore.products || [])

const maxPrice = computed(() =>
  Math.ceil(Math.max(10, ...baseProducts.value.map((p) => Number(p.price) || 0)))
)
const availableColors = computed(() => [...new Set(baseProducts.value.flatMap(getColors))])

const priceMin = ref(0)
const priceMax = ref(100)
const selectedColors = ref([])

// កំណត់ max តាមតម្លៃផលិតផលពិត
watch(maxPrice, (v) => { priceMax.value = v }, { immediate: true })
// ការពារ min លើស max
watch(priceMin, (v) => { if (v > priceMax.value) priceMax.value = v })
watch(priceMax, (v) => { if (v < priceMin.value) priceMin.value = v })

const toggleColor = (c) => {
  const i = selectedColors.value.indexOf(c)
  if (i === -1) selectedColors.value.push(c)
  else selectedColors.value.splice(i, 1)
}

const filteredProducts = computed(() =>
  baseProducts.value.filter((p) => {
    const price = Number(p.price) || 0
    const inPrice = price >= priceMin.value && price <= priceMax.value
    const inColor =
      !selectedColors.value.length || getColors(p).some((c) => selectedColors.value.includes(c))
    return inPrice && inColor
  })
)

// ----- Pagination: 8 ផលិតផលក្នុង 1 ទំព័រ -----
const perPage = 8
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / perPage)))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

const goToPage = (n) => {
  if (n < 1 || n > totalPages.value) return
  currentPage.value = n
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ប្តូរ filter → ត្រឡប់ទៅទំព័រទី 1
watch([priceMin, priceMax, selectedColors], () => { currentPage.value = 1 }, { deep: true })
// ការពារករណីចំនួនទំព័រថយ
watch(totalPages, (t) => { if (currentPage.value > t) currentPage.value = t })

// ទៅទំព័រលម្អិត៖ route /products/:id
const goToDetail = (p) => {
  router.push(`/products/${p.id ?? p._id}`)
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product, 1)
  toastMessage.value = `បានបន្ថែម "${product.name || product.title}" ចូលកន្ត្រក!`
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastMessage.value = ''), 2000)
}

onMounted(() => {
  productStore.fetchProducts()
})
onBeforeUnmount(() => clearTimeout(toastTimer))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
body { overflow-x: hidden; }
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
```[cite: 4]