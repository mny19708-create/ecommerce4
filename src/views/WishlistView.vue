<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-khmer">
    <!-- Header Section -->
    <div class="mb-8 border-b border-gray-100 pb-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">បញ្ជីប្រាថ្នា (Wishlist)</h1>
      <p class="text-gray-500 text-sm">ផលិតផលដែលអ្នកបានរក្សាទុកសម្រាប់ទិញពេលក្រោយ</p>
    </div>

    <!-- Empty State -->
    <div v-if="wishlistStore.items.length === 0" class="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
      <div class="w-16 h-16 mx-auto mb-4 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-800 mb-1">មិនទាន់មានផលិតផលក្នុងបញ្ជីប្រាថ្នានៅឡើយទេ</h3>
      <p class="text-gray-500 text-sm mb-6">ស្វែងរកផលិតផលដែលអ្នកចូលចិត្ត ហើយចុចរូបបេះដូងដើម្បីរក្សាទុក</p>
      <router-link 
        to="/products" 
        class="inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-sm"
      >
        ទៅកាន់ទំព័រផលិតផល
      </router-link>
    </div>

    <!-- Wishlist Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="product in wishlistStore.items" 
        :key="product.id" 
        class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between group relative"
      >
        <div>
          <!-- Image and Remove Button -->
          <div class="relative overflow-hidden rounded-xl mb-4">
            <img 
              :src="product.image || 'https://via.placeholder.com/300'" 
              :alt="product.name" 
              class="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
            />
            
            <!-- Button Remove from Wishlist -->
            <button 
              @click="wishlistStore.removeFromWishlist(product.id)"
              class="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md text-rose-500 hover:bg-rose-50 shadow-sm transition"
              title="លុបចេញពីបញ្ជី"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <!-- Product Details -->
          <span class="text-[11px] text-amber-600 font-semibold tracking-wider uppercase">{{ product.category || 'ទូទៅ' }}</span>
          <h3 class="font-bold text-gray-800 text-base mt-1 mb-2 line-clamp-1 leading-relaxed">{{ product.name }}</h3>
          <p class="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">{{ product.description }}</p>
        </div>

        <!-- Price and Action Button -->
        <div class="mt-2 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span class="text-amber-600 font-extrabold text-lg">${{ product.price }}</span>
          <button 
            @click="moveToCart(product)" 
            class="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1 shadow-sm active:scale-95"
          >
            <span>+ កន្ត្រក</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const moveToCart = (product) => {
  cartStore.addToCart(product)
  wishlistStore.removeFromWishlist(product.id)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>