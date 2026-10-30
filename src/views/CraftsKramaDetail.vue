<!-- src/components/product/CraftsKramaDetail.vue
     ប្រើក្នុង ProductDetail.vue ពេល category = crafts-krama
     Props: product (object ពី store) -->
<template>
  <div>
    <!-- Breadcrumb -->
    <nav class="flex text-xs text-gray-500 mb-6 gap-2 items-center">
      <router-link to="/" class="hover:text-amber-600 transition-colors">ទំព័រដើម</router-link>
      <span>/</span>
      <router-link to="/category/crafts-krama" class="hover:text-amber-600 transition-colors">Crafts &amp; Krama</router-link>
      <span>/</span>
      <span class="text-gray-800 font-semibold truncate">{{ name }}</span>
    </nav>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">

      <!-- ===== Gallery ===== -->
      <div class="space-y-4">
        <div class="relative w-full h-80 sm:h-96 lg:h-[450px] bg-amber-50/50 rounded-2xl overflow-hidden border border-gray-100">
          <img
            v-if="selectedImage"
            :src="selectedImage"
            :alt="name"
            class="w-full h-full object-cover transition-all duration-300"
            @error="onImgError"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-6xl">🧵</div>

          <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
            ✋ Handmade
          </span>

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

        <div v-if="images.length > 1" class="flex gap-3 overflow-x-auto pb-2">
          <button
            v-for="(img, idx) in images"
            :key="idx"
            @click="selectedImage = img"
            :class="selectedImage === img ? 'border-amber-600 ring-2 ring-amber-500/20' : 'border-gray-200 hover:border-amber-300'"
            class="w-20 h-20 rounded-xl overflow-hidden border-2 bg-amber-50 shrink-0 transition-all"
          >
            <img :src="img" class="w-full h-full object-cover" @error="onImgError" />
          </button>
        </div>
      </div>

      <!-- ===== Info ===== -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span class="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full tracking-wider">
              {{ product.tag || 'Crafts & Krama' }}
            </span>
            <span v-if="product.inStock !== false" class="text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              មានក្នុងស្តុក
            </span>
            <span v-for="b in badges" :key="b" class="text-xs text-gray-600 font-medium bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
              {{ b }}
            </span>
          </div>

          <h1 class="text-2xl lg:text-3xl font-bold text-gray-800 leading-snug mb-3">{{ name }}</h1>

          <div class="flex items-baseline gap-3 mb-4">
            <span class="text-2xl lg:text-3xl font-bold text-amber-600">${{ Number(product.price || 0).toFixed(2) }}</span>
            <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">${{ Number(product.originalPrice).toFixed(2) }}</span>
            <span v-if="discount" class="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">-{{ discount }}%</span>
          </div>

          <p class="text-sm text-gray-600 leading-relaxed mb-5">{{ product.description }}</p>

          <!-- Maker card -->
          <div v-if="maker" class="flex items-center gap-3 bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3.5 mb-5">
            <div class="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">
              {{ makerInitial }}
            </div>
            <div class="min-w-0">
              <p class="text-[11px] text-amber-800/70">ផលិតដោយ</p>
              <p class="text-sm font-bold text-amber-900 truncate">{{ maker }}</p>
            </div>
            <router-link to="/community-producers" class="ml-auto text-xs text-amber-700 hover:text-amber-900 whitespace-nowrap">ស្គាល់អ្នកផលិត →</router-link>
          </div>

          <!-- Colors -->
          <div v-if="colors.length" class="mb-5">
            <label class="block text-xs font-bold text-gray-700 mb-2">
              ពណ៌៖ <span class="font-medium text-gray-500">{{ selectedColor }}</span>
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in colors"
                :key="c.name"
                @click="selectedColor = c.name"
                :class="selectedColor === c.name ? 'border-amber-600 ring-2 ring-amber-500/20 text-amber-800 bg-amber-50' : 'border-gray-200 text-gray-600 hover:border-amber-300'"
                class="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 text-xs font-medium transition-all"
              >
                <span v-if="c.hex" class="w-3.5 h-3.5 rounded-full border border-black/10" :style="{ background: c.hex }"></span>
                {{ c.name }}
              </button>
            </div>
          </div>

          <!-- Specs -->
          <dl v-if="specs.length" class="mb-5 divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden text-xs">
            <div v-for="s in specs" :key="s.label" class="flex gap-4 px-4 py-2.5 bg-white">
              <dt class="w-28 shrink-0 text-gray-500">{{ s.label }}</dt>
              <dd class="font-medium text-gray-800">{{ s.value }}</dd>
            </div>
          </dl>

          <!-- Quantity -->
          <div class="mb-6">
            <label class="block text-xs font-bold text-gray-700 mb-2">ចំនួន (Quantity)</label>
            <div class="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1 w-fit">
              <button @click="quantity > 1 && quantity--" class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all">-</button>
              <span class="w-12 text-center text-sm font-bold text-gray-800">{{ quantity }}</span>
              <button @click="quantity++" class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all">+</button>
              <span class="ml-3 mr-2 text-xs text-gray-500">សរុប៖ <b class="text-amber-600">${{ (Number(product.price || 0) * quantity).toFixed(2) }}</b></span>
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

    <!-- ===== Tabs: រឿងរ៉ាវ / ការថែរក្សា ===== -->
    <section class="mt-8 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div class="flex gap-2 border-b border-gray-100 mb-6 overflow-x-auto">
        <button
          v-for="t in tabs"
          :key="t.id"
          @click="tab = t.id"
          class="relative px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors"
          :class="tab === t.id ? 'text-amber-700' : 'text-gray-500 hover:text-amber-600'"
        >
          {{ t.label }}
          <span class="absolute left-0 -bottom-px h-[2px] bg-amber-600 transition-all duration-300" :class="tab === t.id ? 'w-full' : 'w-0'"></span>
        </button>
      </div>

      <div v-if="tab === 'story'" class="text-sm text-gray-600 leading-relaxed max-w-3xl">
        <p v-if="product.story">{{ product.story }}</p>
        <p v-else>{{ product.description || 'ផលិតផលសិប្បកម្មខ្មែរធ្វើដោយដៃ ដោយសិប្បករក្នុងស្រុក។' }}</p>
      </div>

      <ul v-else class="text-sm text-gray-600 space-y-2 list-disc list-inside max-w-3xl">
        <li v-for="(c, i) in careTips" :key="i">{{ c }}</li>
      </ul>
    </section>

    <!-- ===== ផលិតផលស្រដៀងគ្នា ===== -->
    <section v-if="related.length" class="mt-10">
      <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span class="text-amber-500 text-xs">❖</span> ផលិតផលសិប្បកម្មផ្សេងទៀត
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <router-link
          v-for="r in related"
          :key="r.id ?? r._id"
          :to="'/crafts-krama/' + (r.id ?? r._id)"
          class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-3 group block"
        >
          <div class="h-36 rounded-xl overflow-hidden bg-amber-50 mb-2.5">
            <img v-if="imgOf(r)" :src="imgOf(r)" :alt="r.name || r.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" @error="onImgError" />
          </div>
          <p class="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-amber-600 transition-colors">{{ r.name || r.title }}</p>
          <p class="text-sm font-bold text-amber-600 mt-0.5">${{ Number(r.price || 0).toFixed(2) }}</p>
        </router-link>
      </div>
    </section>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toastMessage" class="fixed bottom-5 right-5 z-50 bg-gray-900/90 text-white text-xs px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 border border-gray-700">
        <span class="text-amber-400 font-bold">✓</span> {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: { type: Object, required: true }
})

const router = useRouter()
const wishlistStore = useWishlistStore()
const productStore = useProductStore()
const cartStore = useCartStore()

const quantity = ref(1)
const selectedImage = ref('')
const selectedColor = ref('')
const tab = ref('story')
const toastMessage = ref('')
let toastTimer = null

const name = computed(() => props.product.name || props.product.title || '')

// ----- images -----
const imgOf = (p) => {
  const first = Array.isArray(p.images) ? p.images[0] : null
  return p.image || p.image_url || p.imageUrl || p.thumbnail || (typeof first === 'string' ? first : first?.url) || ''
}
const images = computed(() => {
  const p = props.product
  if (Array.isArray(p.images) && p.images.length) {
    return p.images.map((i) => (typeof i === 'string' ? i : i?.url)).filter(Boolean)
  }
  const one = imgOf(p)
  return one ? [one] : []
})

// ----- data ពី product (បង្ហាញតែពេលមាន) -----
const maker = computed(() => props.product.maker || props.product.community || '')
const makerInitial = computed(() => (Array.from(maker.value.trim())[0] || '').toUpperCase())
const badges = computed(() => (Array.isArray(props.product.badges) ? props.product.badges : []))

const colors = computed(() => {
  const c = props.product.colors
  if (!Array.isArray(c)) return []
  return c.map((x) => (typeof x === 'string' ? { name: x } : x)).filter((x) => x && x.name)
})

const specs = computed(() => {
  const p = props.product
  return [
    { label: 'សម្ភារៈ', value: p.material },
    { label: 'ប្រភពដើម', value: p.origin },
    { label: 'ទំហំ', value: p.size },
    { label: 'ទម្ងន់', value: p.weight }
  ].filter((s) => s.value)
})

const discount = computed(() => {
  const { price, originalPrice } = props.product
  if (!originalPrice || Number(originalPrice) <= Number(price)) return 0
  return Math.round((1 - Number(price) / Number(originalPrice)) * 100)
})

// ----- tabs -----
const tabs = [
  { id: 'story', label: 'រឿងរ៉ាវសិប្បកម្ម' },
  { id: 'care', label: 'ការថែរក្សា' }
]
const DEFAULT_CARE = [
  'បោកដោយដៃក្នុងទឹកត្រជាក់ ឬទឹកក្តៅបន្តិច ជាមួយសាប៊ូទន់',
  'កុំប្រើសារធាតុ bleach និងកុំច្របាច់ខ្លាំង',
  'ហាលក្នុងម្លប់ ដើម្បីរក្សាពណ៌ឲ្យយូរ',
  'អ៊ុតនៅកម្តៅមធ្យម ពេលនៅសើមបន្តិច'
]
const careTips = computed(() =>
  Array.isArray(props.product.care) && props.product.care.length ? props.product.care : DEFAULT_CARE
)

// ----- related (ប្រភេទតែមួយ) -----
const sameCategory = (p) => {
  const c = p.category
  const raw = String(typeof c === 'object' && c ? c.slug || c.name : c || '').trim().toLowerCase()
  const key = raw.replace(/[^a-z0-9]/g, '') // 'Crafts & Krama' / 'crafts-krama' -> 'craftskrama'
  return key === 'craftskrama' || raw === 'ក្រមា និងសិប្បកម្ម'
}
const related = computed(() =>
  productStore.products
    .filter((p) => sameCategory(p) && String(p.id ?? p._id) !== String(props.product.id ?? props.product._id))
    .slice(0, 4)
)

// Reset ពេលប្តូរផលិតផល
watch(
  () => props.product,
  () => {
    selectedImage.value = images.value[0] || ''
    selectedColor.value = colors.value[0]?.name || ''
    quantity.value = 1
    tab.value = 'story'
  },
  { immediate: true }
)

onBeforeUnmount(() => clearTimeout(toastTimer))

function onImgError(e) {
  e.target.style.display = 'none'
}
function showToast(message) {
  toastMessage.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastMessage.value = ''), 2500)
}

// បើមានពណ៌ ដាក់ selectedColor ជាប់ជាមួយទំនិញ
const cartItem = () => (selectedColor.value ? { ...props.product, selectedColor: selectedColor.value } : props.product)

function handleAddToCart() {
  cartStore.addToCart(cartItem(), quantity.value)
  const c = selectedColor.value ? ` · ${selectedColor.value}` : ''
  showToast(`បានបន្ថែម "${name.value}"${c} (${quantity.value}) ចូលកន្ត្រក!`)
}
function handleBuyNow() {
  cartStore.addToCart(cartItem(), quantity.value)
  router.push('/cart')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>