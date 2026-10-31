<!-- src/views/ProductDetail.vue — ទំព័រលម្អិតតែមួយ សម្រាប់គ្រប់ប្រភេទ (route: /products/:id) -->
<template>
  <div class="w-full min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-['Kantumruy_Pro'] flex flex-col items-center">
    <div class="w-full max-w-6xl">

      <!-- 1. Loading -->
      <div v-if="loading" class="animate-pulse space-y-6 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-gray-200 h-96 rounded-2xl"></div>
          <div class="space-y-4">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
            <div class="h-24 bg-gray-200 rounded"></div>
            <div class="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <!-- 2. Not found -->
      <div v-else-if="!product" class="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm my-8">
        <div class="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">!</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">មិនរកឃើញផលិតផលឡើយ</h2>
        <p class="text-gray-500 text-sm mb-6 max-w-md mx-auto">
          ផលិតផលដែលអ្នកកំពុងស្វែងរក (ID: {{ route.params.id }}) មិនមាននៅក្នុងប្រព័ន្ធ ឬត្រូវបានលុបចេញ។
        </p>
        <router-link
          to="/products"
          class="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
        >
          ត្រឡប់ទៅកាន់បញ្ជីផលិតផល
        </router-link>
      </div>

      <!-- 3a. Crafts & Krama → component ពិសេស -->
      <CraftsKramaDetail v-else-if="isCraftsKrama" :product="product" />

      <!-- 3b. ប្រភេទផ្សេងទៀត → detail ទូទៅ -->
      <div v-else>
        <!-- Breadcrumb -->
        <nav class="flex text-xs text-gray-500 mb-6 gap-2 items-center">
          <router-link to="/" class="hover:text-amber-600 transition-colors">ទំព័រដើម</router-link>
          <span>/</span>
          <router-link :to="categoryLink" class="hover:text-amber-600 transition-colors">{{ categoryLabel }}</router-link>
          <span>/</span>
          <span class="text-gray-800 font-semibold truncate">{{ product.name || product.title }}</span>
        </nav>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">

          <!-- Gallery -->
          <div class="space-y-4">
            <div class="relative w-full h-80 sm:h-96 lg:h-[450px] bg-amber-50/50 rounded-2xl overflow-hidden border border-gray-100">
              <img
                v-if="selectedImage"
                :src="selectedImage"
                :alt="product.name || product.title"
                class="w-full h-full object-cover transition-all duration-300"
                @error="onImgError"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-6xl">🎁</div>

              <button
                @click="wishlistStore.toggleWishlist(product)"
                class="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-all shadow-md active:scale-95"
                title="បន្ថែមទៅបំណងប្រាថ្នា"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  :class="wishlistStore.isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'"
                  class="w-6 h-6 transition-colors"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            <div v-if="productImages.length > 1" class="flex gap-3 overflow-x-auto pb-2">
              <button
                v-for="(img, idx) in productImages"
                :key="idx"
                @click="selectedImage = img"
                :class="selectedImage === img ? 'border-amber-600 ring-2 ring-amber-500/20' : 'border-gray-200 hover:border-amber-300'"
                class="w-20 h-20 rounded-xl overflow-hidden border-2 bg-amber-50 shrink-0 transition-all"
              >
                <img :src="img" class="w-full h-full object-cover" @error="onImgError" />
              </button>
            </div>
          </div>

          <!-- Info -->
          <div class="flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span class="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                  {{ product.tag || categoryLabel }}
                </span>
                <span v-if="product.weight" class="text-xs text-gray-600 font-medium bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                  {{ product.weight }}
                </span>
                <span v-if="product.inStock !== false" class="text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  មានក្នុងស្តុក
                </span>
              </div>

              <h1 class="text-2xl lg:text-3xl font-bold text-gray-800 leading-snug mb-3">
                {{ product.name || product.title }}
              </h1>

              <div class="flex items-baseline gap-3 mb-4">
                <span class="text-2xl lg:text-3xl font-bold text-amber-600">${{ Number(product.price || 0).toFixed(2) }}</span>
                <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">
                  ${{ Number(product.originalPrice).toFixed(2) }}
                </span>
              </div>

              <p class="text-sm text-gray-600 leading-relaxed mb-6">{{ product.description }}</p>

              <div v-if="highlights.length" class="bg-amber-50/70 rounded-2xl p-4 mb-6 border border-amber-200/60">
                <h3 class="text-xs font-bold text-amber-900 tracking-wide mb-2">{{ highlightsTitle }}</h3>
                <ul class="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  <li v-for="(h, i) in highlights" :key="i">{{ h }}</li>
                </ul>
              </div>

              <dl v-if="specs.length" class="mb-6 divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden text-xs">
                <div v-for="s in specs" :key="s.label" class="flex gap-4 px-4 py-2.5 bg-white">
                  <dt class="w-32 shrink-0 text-gray-500">{{ s.label }}</dt>
                  <dd class="font-medium text-gray-800">{{ s.value }}</dd>
                </div>
              </dl>

              <div class="mb-6">
                <label class="block text-xs font-bold text-gray-700 mb-2">ចំនួន (Quantity)</label>
                <div class="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1 w-fit">
                  <button @click="quantity > 1 && quantity--" class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all">-</button>
                  <span class="w-12 text-center text-sm font-bold text-gray-800">{{ quantity }}</span>
                  <button @click="quantity++" class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all">+</button>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-100">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button @click="handleAddToCart" class="w-full bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
                  + បន្ថែមចូលកន្ត្រក
                </button>
                <button @click="handleBuyNow" class="w-full bg-gray-900 hover:bg-gray-800 active:scale-95 text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
                  ទិញឥឡូវនេះ (Buy Now)
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- CUSTOMER REVIEWS SECTION -->
        <div class="mt-8 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 class="text-lg font-bold text-gray-800">ការវាយតម្លៃ និងមតិយោបល់ (Customer Reviews)</h2>
              <p class="text-xs text-gray-500 mt-0.5">មតិយោបល់ពីអតិថិជនដែលបានទិញផលិតផលនេះ</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-bold text-amber-600">{{ averageRating }}</span>
              <div class="text-amber-400 text-sm">★★★★★</div>
              <span class="text-xs text-gray-400">({{ productReviews.length }})</span>
            </div>
          </div>

          <!-- Reviews List -->
          <div class="space-y-4">
            <div v-for="rev in productReviews" :key="rev.id" class="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <div class="flex justify-between items-center">
                <span class="font-bold text-xs sm:text-sm text-gray-800">{{ rev.customer_name || 'អតិថិជន' }}</span>
                <span class="text-amber-500 text-xs">{{ '★'.repeat(rev.rating) }}{{ '☆'.repeat(5 - rev.rating) }}</span>
              </div>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ rev.comment }}</p>
              <span class="text-[10px] text-gray-400 block">{{ rev.created_at || 'ថ្មីៗនេះ' }}</span>
            </div>
            <div v-if="productReviews.length === 0" class="text-center py-6 text-gray-400 text-xs">
              មិនទាន់មានការវាយតម្លៃសម្រាប់ផលិតផលនេះនៅឡើយទេ។ ចូរជាមនុស្សដំបូងគេក្នុងការសរសេរមតិយោបល់!
            </div>
          </div>

          <!-- Add Review Form -->
          <div class="pt-4 border-t border-gray-100 space-y-4">
            <h3 class="text-sm font-bold text-gray-800">សរសេរការវាយតម្លៃរបស់អ្នក</h3>
            <form @submit.prevent="submitReview" class="space-y-3">
              <div class="flex items-center gap-2">
                <label class="text-xs font-semibold text-gray-700">កម្រិតផ្កាយ៖</label>
                <select v-model.number="newReview.rating" class="border border-gray-200 rounded-lg p-1.5 text-xs bg-white outline-none">
                  <option :value="5">⭐⭐⭐⭐⭐ (5 - ល្អបំផុត)</option>
                  <option :value="4">⭐⭐⭐⭐ (4 - ល្អ)</option>
                  <option :value="3">⭐⭐⭐ (3 - បង្គួរ)</option>
                  <option :value="2">⭐⭐ (2 - ខ្សោយ)</option>
                  <option :value="1">⭐ (1 - អន់)</option>
                </select>
              </div>
              <div>
                <input 
                  type="text" 
                  v-model.trim="newReview.customer_name" 
                  placeholder="ឈ្មោះរបស់អ្នក..." 
                  class="w-full border border-gray-200 rounded-xl p-3 text-xs sm:text-sm outline-none focus:border-amber-500" 
                  required 
                />
              </div>
              <div>
                <textarea 
                  v-model.trim="newReview.comment" 
                  rows="3" 
                  placeholder="សរសេរមតិយោបល់របស់អ្នកនៅទីនេះ..." 
                  class="w-full border border-gray-200 rounded-xl p-3 text-xs sm:text-sm outline-none focus:border-amber-500 resize-none" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                class="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition active:scale-95"
              >
                បញ្ជូនមតិយោបល់
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toastMessage" class="fixed bottom-5 right-5 z-50 bg-gray-900/90 text-white text-xs px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 border border-gray-700">
        <span class="text-amber-400 font-bold">✓</span> {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const wishlistStore = useWishlistStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const loading = ref(true)
const quantity = ref(1)
const selectedImage = ref('')
const toastMessage = ref('')
let toastTimer = null

// Reviews State
const productReviews = ref([
  { id: 1, customer_name: 'សុខ សុភា', rating: 5, comment: 'ផលិតផលស្អាត និងមានគុណភាពខ្ពស់ខ្លាំងណាស់!', created_at: '2026-10-25' },
  { id: 2, customer_name: 'ចាន់ ដារ៉ា', rating: 4, comment: 'សមរម្យនឹងតម្លៃ ការដឹកជញ្ជូនរហ័សល្អ។', created_at: '2026-10-27' }
])

const newReview = reactive({
  customer_name: '',
  rating: 5,
  comment: ''
})

const averageRating = computed(() => {
  if (!productReviews.value.length) return '0.0'
  const sum = productReviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / productReviews.value.length).toFixed(1)
})

const submitReview = () => {
  productReviews.value.unshift({
    id: Date.now(),
    customer_name: newReview.customer_name,
    rating: newReview.rating,
    comment: newReview.comment,
    created_at: 'ទើបតែឥឡូវ'
  })
  newReview.customer_name = ''
  newReview.comment = ''
  newReview.rating = 5
  showToast('អរគុណសម្រាប់ការដាក់មតិយោបល់របស់អ្នក!')
}

const matchId = (p) => String(p.id ?? p._id) === String(route.params.id)
const product = computed(() => productStore.products.find(matchId) || null)

const productImages = computed(() => {
  const p = product.value
  if (!p) return []
  if (Array.isArray(p.images) && p.images.length) {
    return p.images.map((i) => (typeof i === 'string' ? i : i?.url)).filter(Boolean)
  }
  const one = p.image || p.image_url || p.imageUrl || p.thumbnail
  return one ? [one] : []
})

const CATEGORY_LABELS = {
  'crafts-krama': 'Crafts & Krama',
  'food-spices': 'Food & Spices',
  'health-beauty': 'Health & Beauty',
  'souvenir-gift-sets': 'Souvenir & Gift Sets'
}
const rawCategory = computed(() => {
  const c = product.value?.category
  if (!c) return ''
  return String(typeof c === 'object' ? c.slug || c.name : c).trim().toLowerCase()
})
const categoryLabel = computed(() => CATEGORY_LABELS[rawCategory.value] || product.value?.category || 'ផលិតផល')
const categoryLink = computed(() => (CATEGORY_LABELS[rawCategory.value] ? `/category/${rawCategory.value}` : '/products'))

const isCraftsKrama = computed(
  () => rawCategory.value === 'crafts-krama' || rawCategory.value === 'ក្រមា និងសិប្បកម្ម'
)

const highlights = computed(() => {
  const p = product.value
  if (!p) return []
  if (Array.isArray(p.includes) && p.includes.length) return p.includes
  if (Array.isArray(p.benefits) && p.benefits.length) return p.benefits
  return []
})
const highlightsTitle = computed(() =>
  Array.isArray(product.value?.includes) && product.value.includes.length
    ? '🎁 វត្ថុដែលមានក្នុងកញ្ចប់ (Included Items)'
    : '✨ ចំណុចពិសេសនៃផលិតផល (Highlights)'
)

const specs = computed(() => {
  const p = product.value
  if (!p) return []
  return [
    { label: 'សម្ភារៈ', value: p.material },
    { label: 'អ្នកផលិត / សហគមន៍', value: p.maker || p.community },
    { label: 'ប្រភពដើម', value: p.origin },
    { label: 'ទំហំ', value: p.size }
  ].filter((s) => s.value)
})

watch(
  product,
  () => {
    selectedImage.value = productImages.value[0] || ''
    quantity.value = 1
  },
  { immediate: true }
)

onMounted(async () => {
  try {
    if (!productStore.products.length && productStore.fetchProducts) {
      await productStore.fetchProducts()
    }
  } catch (err) {
    console.error('Fetch products error:', err)
  } finally {
    loading.value = false
  }
})
onBeforeUnmount(() => clearTimeout(toastTimer))

function onImgError(e) {
  e.target.style.display = 'none'
}
function showToast(message) {
  toastMessage.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastMessage.value = ''), 2500)
}
function handleAddToCart() {
  if (!product.value) return
  cartStore.addToCart(product.value, quantity.value)
  showToast(`បានបន្ថែម "${product.value.name || product.value.title}" (${quantity.value}) ចូលកន្ត្រក!`)
}
function handleBuyNow() {
  if (!product.value) return
  cartStore.addToCart(product.value, quantity.value)
  router.push('/cart')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>