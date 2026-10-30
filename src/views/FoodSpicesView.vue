<template>
    <nav class="flex text-xs text-gray-500 mb-6 gap-2 items-center">
      <router-link to="/" class="hover:text-amber-600 transition-colors">ទំព័រដើម</router-link>
      <span>/</span>
      <span class="text-gray-800 font-semibold">Food &amp; Spices</span>
    </nav>
  <div class="max-w-7xl mx-auto px-4 py-8 font-['Kantumruy_Pro']">
    <!-- Header -->
    <div class="mb-8 border-b border-gray-100 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <span class="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full tracking-wider">
          Local Flavors
        </span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mt-2">Food &amp; Spices (អាហារ និងគ្រឿងទេស)</h1>
        <p class="text-sm text-gray-500 mt-1">
          គ្រឿងទេសធម្មជាតិ ម្រេចកំពត ទឹកឃ្មុំព្រៃ និងអាហារកែច្នៃក្នុងស្រុក
        </p>
      </div>

      <div class="text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 self-start md:self-auto">
        បង្ហាញ៖ <span class="font-bold text-amber-600">{{ foodProducts.length }}</span> ផលិតផល
      </div>
    </div>

    <!-- Loading -->
    <div v-if="productStore.loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="n in 4" :key="n" class="animate-pulse bg-white border border-gray-100 rounded-2xl p-3">
        <div class="bg-gray-200 h-52 rounded-xl mb-3"></div>
        <div class="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div class="h-8 bg-gray-200 rounded-xl"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="productStore.error" class="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
      <p class="text-red-600 font-medium text-sm">មានបញ្ហាក្នុងការទាញយកទិន្នន័យ៖ {{ productStore.error }}</p>
    </div>

    <!-- Empty -->
    <div v-else-if="foodProducts.length === 0" class="text-center py-12 bg-white rounded-2xl border border-gray-100">
      <p class="text-gray-500 text-sm">មិនទាន់មានផលិតផលនៅឡើយទេ។</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in foodProducts"
        :key="product.id"
        class="w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3 relative group flex flex-col justify-between"
      >
        <div>
          <div
            class="relative w-full h-52 rounded-xl overflow-hidden bg-amber-50 cursor-pointer"
            @click="goToDetail(product.id)"
          >
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              @error="onImgError"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-5xl">🌶️</div>

            <button
              @click.stop="wishlistStore.toggleWishlist(product)"
              class="absolute top-2.5 right-2.5 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-sm active:scale-95"
              aria-label="Add to wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="wishlistStore.isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'"
                class="w-5 h-5 transition-colors"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          <div class="mt-3 px-1">
            <span class="text-[11px] font-medium text-amber-600 tracking-wide block mb-0.5">
              {{ product.tag || 'Food & Spices' }}
            </span>
            <h3
              @click="goToDetail(product.id)"
              class="text-base font-bold text-gray-800 line-clamp-1 cursor-pointer hover:text-amber-600 transition-colors"
            >
              {{ product.name }}
            </h3>
            <p class="text-xs text-gray-400 line-clamp-2 mt-0.5 mb-3">
              {{ product.description }}
            </p>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-2.5 px-1 flex items-center justify-between mt-2">
          <span class="text-lg font-bold text-amber-600">${{ Number(product.price || 0).toFixed(2) }}</span>
          <button
            @click="handleAddToCart(product)"
            class="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow"
          >
            + កន្ត្រក
          </button>
        </div>
      </div>
    </div>

    <!-- Toast -->
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
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

const foodProducts = computed(() =>
  productStore.products.filter(p => p.category === 'food-spices')
)

function goToDetail(id) {
  router.push({ name: 'FoodSpicesDetail', params: { id } })
}

function onImgError(e) {
  e.target.style.display = 'none'
}

function handleAddToCart(product) {
  cartStore.addToCart(product, 1)
  toastMessage.value = `បានបន្ថែម "${product.name}" ចូលកន្ត្រក!`
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>