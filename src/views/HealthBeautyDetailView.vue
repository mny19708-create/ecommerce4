<template>
  <div class="max-w-7xl mx-auto px-4 py-8 font-['Kantumruy_Pro']">
    <!-- Breadcrumb Navigation -->
    <nav class="flex text-xs text-gray-500 mb-6 gap-2 items-center">
      <router-link to="/" class="hover:text-amber-600 transition-colors">Home</router-link>
      <span>/</span>
      <router-link to="/category/health-beauty" class="hover:text-amber-600 transition-colors">Health & Beauty</router-link>
      <span>/</span>
      <span class="text-gray-800 font-semibold truncate">{{ product.name }}</span>
    </nav>

    <!-- Product Detail Card -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
      
      <!-- Left Column: Image Gallery -->
      <div class="space-y-4">
        <!-- Main Image -->
        <div class="relative w-full h-80 sm:h-96 lg:h-[450px] bg-amber-50 rounded-2xl overflow-hidden border border-gray-100">
          <img 
            :src="selectedImage || product.image || 'https://via.placeholder.com/500'" 
            :alt="product.name" 
            class="w-full h-full object-cover"
          />
          <!-- Wishlist Button -->
          <button 
            @click="wishlistStore.toggleWishlist(product)" 
            class="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-all shadow-md active:scale-95"
            :aria-label="'Add to wishlist'"
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

        <!-- Image Gallery Thumbnails -->
        <div v-if="productImages.length > 1" class="flex gap-3 overflow-x-auto pb-2">
          <button 
            v-for="(img, idx) in productImages" 
            :key="idx" 
            @click="selectedImage = img"
            :class="selectedImage === img ? 'border-amber-600 ring-2 ring-amber-500/20' : 'border-gray-200'"
            class="w-20 h-20 rounded-xl overflow-hidden border-2 bg-amber-50 shrink-0 transition-all"
          >
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Right Column: Product Details & Actions -->
      <div class="flex flex-col justify-between">
        <div>
          <!-- Tag & Category -->
          <div class="flex items-center gap-2 mb-3">
            <span class="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {{ product.tag || 'Khmer Soap & Wellness' }}
            </span>
            <span v-if="product.inStock !== false" class="text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full">
              មានក្នុងស្តុក
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-2xl lg:text-3xl font-bold text-gray-800 leading-snug mb-3">
            {{ product.name }}
          </h1>

          <!-- Price -->
          <div class="flex items-baseline gap-3 mb-4">
            <span class="text-2xl lg:text-3xl font-bold text-amber-600">${{ Number(product.price).toFixed(2) }}</span>
            <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">
              ${{ Number(product.originalPrice).toFixed(2) }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-sm text-gray-600 leading-relaxed mb-6">
            {{ product.description }}
          </p>

          <!-- Highlights / Benefits Box -->
          <div class="bg-amber-50/60 rounded-2xl p-4 mb-6 border border-amber-100">
            <h3 class="text-xs font-bold text-amber-800 uppercase tracking-wide mb-2">
              🌿 គុណសម្បត្តិ និងអត្ថប្រយោជន៍ (Benefits & Highlights)
            </h3>
            <ul class="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
              <li>ផ្សំចេញពីរុក្ខជាតិឱសថ និងប្រេងធម្មជាតិ ១០០%</li>
              <li>ជួយថែរក្សាស្បែកឱ្យមានសំណើម មិនស្ងួត និងមានក្លិនក្រអូបប្រហើរ</li>
              <li>គ្មានសារធាតុគីមីប៉ះពាល់ដល់សុខភាពស្បែក</li>
            </ul>
          </div>

          <!-- Quantity Selector -->
          <div class="mb-6">
            <label class="block text-xs font-bold text-gray-700 uppercase mb-2">ចំនួន (Quantity)</label>
            <div class="flex items-center gap-3">
              <div class="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                <button 
                  @click="quantity > 1 ? quantity-- : null" 
                  class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >-</button>
                <span class="w-12 text-center text-sm font-bold text-gray-800">{{ quantity }}</span>
                <button 
                  @click="quantity++" 
                  class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >+</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3 pt-4 border-t border-gray-100">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              @click="handleAddToCart" 
              class="w-full bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>+ បន្ថែមចូលកន្ត្រក</span>
            </button>

            <button 
              @click="handleBuyNow" 
              class="w-full bg-gray-900 hover:bg-gray-800 active:scale-95 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>ទិញឥឡូវនេះ (Buy Now)</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div 
        v-if="toastMessage" 
        class="fixed bottom-5 right-5 z-50 bg-gray-900/90 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2"
      >
        <span class="text-amber-400">✓</span> {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()

const wishlistStore = useWishlistStore()
const productStore = useProductStore()
const cartStore = useCartStore()

const quantity = ref(1)
const selectedImage = ref('')
const toastMessage = ref('')

// List នៃទិន្នន័យ Health & Beauty ទាំងអស់ (ករណី API មិនទាន់ Respond)
const defaultHealthBeautyProducts = [
  {
    id: 301,
    category: 'health-beauty',
    tag: 'Khmer Soap',
    name: 'សាប៊ូធម្មជាតិក្លិនរំដួល',
    description: 'ផ្សំចេញពីប្រេងដូង និងរុក្ខជាតិឱសថ ជួយឱ្យស្បែកទន់រលោង និងមានក្លិនក្រអូបប្រហើរតាមបែបធម្មជាតិ។',
    price: 3.50,
    originalPrice: 4.50,
    image: 'https://via.placeholder.com/500?text=Rumduol+Soap'
  },
  {
    id: 302,
    category: 'health-beauty',
    tag: 'Herbal Care',
    name: 'ប្រេងរឹតរុក្ខជាតិបុរាណ',
    description: 'ស្រកាក្លិនឱសថបុរាណ ជួយសម្រួលសរសៃ និងកាត់បន្ថយការចុក រកួយ យ៉ាងមានប្រសិទ្ធភាព។',
    price: 5.00,
    originalPrice: 6.50,
    image: 'https://via.placeholder.com/500?text=Herbal+Oil'
  },
  {
    id: 303,
    category: 'health-beauty',
    tag: 'Khmer Soap',
    name: 'សាប៊ូស្លឹកគ្រៃ និងរលៀក',
    description: 'ជួយជម្រះកោសិកាចាស់ៗ ការពារបាក់តេរី និងធ្វើឱ្យស្បែកភ្លឺថ្លាធម្មជាតិ។',
    price: 3.50,
    originalPrice: 4.00,
    image: 'https://via.placeholder.com/500?text=Lemongrass+Soap'
  },
  {
    id: 304,
    category: 'health-beauty',
    tag: 'Skin Care',
    name: 'ប្រេងដូងបរិសុទ្ធស្កប់ត្រជាក់',
    description: 'ផលិតតាមវិធីសាស្ត្រធម្មជាតិ ១០០% សម្រាប់លាបសក់ និងថែរក្សាស្បែកឱ្យមានសំណើម។',
    price: 8.00,
    originalPrice: 10.00,
    image: 'https://via.placeholder.com/500?text=Virgin+Coconut+Oil'
  }
]

const currentId = computed(() => Number(route.params.id))

// Product ឆ្លាតវៃដែលទាញចេញពី Store ឬទាញពី Default List
const product = computed(() => {
  const allProducts = productStore.products && productStore.products.length > 0 
    ? productStore.products 
    : defaultHealthBeautyProducts

  const found = allProducts.find(p => Number(p.id) === currentId.value)
  
  return found || {
    id: currentId.value,
    name: 'ផលិតផល Health & Beauty',
    tag: 'Health & Beauty',
    price: 0,
    description: 'មិនមានព័ត៌មានលម្អិតសម្រាប់ផលិតផលនេះទេ។',
    image: 'https://via.placeholder.com/500'
  }
})

// រៀបចំរូបភាពសម្រាប់ Gallery
const productImages = computed(() => {
  if (product.value.images && product.value.images.length > 0) {
    return product.value.images
  }
  return [
    product.value.image || 'https://via.placeholder.com/500',
    'https://via.placeholder.com/500?text=Detail+View+1',
    'https://via.placeholder.com/500?text=Detail+View+2'
  ]
})

// ពេលដូរ ID ផលិតផល ឱ្យវា Set រូបភាពដំបូងឡើងវិញ
watch(() => product.value, (newProduct) => {
  if (newProduct && newProduct.image) {
    selectedImage.value = newProduct.image
  }
}, { immediate: true })

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
})

// Add to Cart Logic
const handleAddToCart = () => {
  cartStore.addToCart(product.value, quantity.value)
  toastMessage.value = `បានបន្ថែម "${product.value.name}" (${quantity.value}) ចូលកន្ត្រក!`
  setTimeout(() => {
    toastMessage.value = ''
  }, 2000)
}

// Buy Now Logic
const handleBuyNow = () => {
  cartStore.addToCart(product.value, quantity.value)
  router.push('/cart')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>