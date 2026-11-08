<!-- src/components/Navbar.vue -->
<template>
  <nav
    class="bg-[#0D0B08]/90 backdrop-blur-md border-b border-amber-600/30 sticky top-0 z-50 font-khmer shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

      <!-- Brand Logo Section -->
      <router-link to="/" class="flex items-center gap-3 group relative">
        <div
          class="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-800 to-amber-950 p-[1px] shadow-[0_0_15px_rgba(217,119,6,0.3)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transition-all duration-300 group-hover:scale-105">
          <div class="w-full h-full bg-[#120f0a] rounded-[11px] flex items-center justify-center text-amber-400">
            <svg class="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-12"
              viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <span
            class="absolute -top-1 -right-1 text-[10px] text-amber-300 select-none opacity-80 group-hover:opacity-100">❖</span>
        </div>

        <div class="flex flex-col">
          <span
            class="text-xl font-bold text-amber-50 tracking-wide leading-none group-hover:text-amber-400 transition-colors">
            Khmer <span
              class="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent filter drop-shadow-[0_2px_8px_rgba(217,119,6,0.4)]">Handmade</span>
          </span>
          <span class="text-[10px] text-amber-300/70 font-medium tracking-wider mt-1 flex items-center gap-1">
            <span class="text-amber-500 text-[8px]">꧁</span>
            សិប្បកម្ម និងអនុស្សាវរីយ៍
            <span class="text-amber-500 text-[8px]">꧂</span>
          </span>
        </div>
      </router-link>

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex items-center gap-7">

        <!-- Home -->
        <router-link to="/"
          class="relative py-2 text-sm font-medium text-amber-100/80 hover:text-amber-300 transition-colors duration-200 group"
          active-class="text-amber-400 font-semibold">
          <span>ទំព័រដើម</span>
          <span
            class="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 group-hover:w-full"></span>
        </router-link>

        <!-- Category Dropdown (ហាងទំនិញ + Dynamic Categories) -->
        <!-- Category Dropdown -->
        <div class="relative group py-2">
          <router-link to="/products"
            class="flex items-center gap-1.5 text-sm font-medium text-amber-100/80 hover:text-amber-300 transition-colors duration-200"
            active-class="text-amber-400 font-semibold">
            <span>ហាងទំនិញ</span>
            <svg class="w-4 h-4 text-amber-400/70 transition-transform duration-300 group-hover:rotate-180" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </router-link>

          <!-- កែប្រែ class ទីនេះ៖ បន្ថែម flex flex-col space-y-1 និងពង្រីក width ឱ្យធូបបន្តិច (ឧ. w-72) -->
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-[#15120D] border border-amber-600/40 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3 z-50 transform group-hover:translate-y-1 flex flex-col space-y-1.5">

            <div
              class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#15120D] border-t border-l border-amber-600/40 rotate-45">
            </div>

            <router-link to="/products" class="dropdown-item">
              <span class="text-amber-400 text-xs">❖</span>
              <span>ផលិតផលទាំងអស់</span>
            </router-link>

            <!-- ប្រភេទនីមួយៗនឹងចុះបន្ទាត់ដាច់ដោយឡែកពីគ្នា -->
            <router-link v-for="cat in categoryStore.categories" :key="cat.id" :to="`/category/${cat.slug}`"
              class="dropdown-item">
              <span class="text-amber-400 text-xs">❖</span>
              <span>{{ cat.name_km }}</span>
            </router-link>
          </div>
        </div>

        <!-- Our Story Dropdown -->
        <!-- Our Story Dropdown -->
<div class="relative group py-2">
  <router-link to="/our-story"
    class="flex items-center gap-1.5 text-sm font-medium text-amber-100/80 hover:text-amber-300 transition-colors duration-200"
    active-class="text-amber-400 font-semibold">
    <span>រឿងរ៉ាវរបស់យើង</span>
    <svg class="w-4 h-4 text-amber-400/70 transition-transform duration-300 group-hover:rotate-180" fill="none"
      stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </router-link>

  <!-- បន្ថែម w-64, flex flex-col space-y-1.5 -->
  <div
    class="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#15120D] border border-amber-600/40 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3 z-50 transform group-hover:translate-y-1 flex flex-col space-y-1.5">
    <div
      class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#15120D] border-t border-l border-amber-600/40 rotate-45">
    </div>

    <router-link to="/our-story" class="dropdown-item">
      <span class="text-amber-400 text-xs">❖</span>
      <span>ប្រវត្តិរបស់យើង</span>
    </router-link>
    <router-link to="/community-producers" class="dropdown-item">
      <span class="text-amber-400 text-xs">❖</span>
      <span>សហគមន៍អ្នកផលិត</span>
    </router-link>
  </div>
</div>

<!-- Support Dropdown -->
<div class="relative group py-2">
  <button
    class="flex items-center gap-1.5 text-sm font-medium text-amber-100/80 hover:text-amber-300 transition-colors duration-200">
    <span>ជំនួយ &amp; ទំនាក់ទំនង</span>
    <svg class="w-4 h-4 text-amber-400/70 transition-transform duration-300 group-hover:rotate-180" fill="none"
      stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <!-- បន្ថែម w-72, flex flex-col space-y-1.5 -->
  <div
    class="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-[#15120D] border border-amber-600/40 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3 z-50 transform group-hover:translate-y-1 flex flex-col space-y-1.5">
    <div
      class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#15120D] border-t border-l border-amber-600/40 rotate-45">
    </div>

    <router-link to="/faqs" class="dropdown-item">
      <span class="text-amber-400 text-xs">❖</span>
      <span>សំណួរញឹកញាប់ (FAQs)</span>
    </router-link>
    <router-link to="/shipping-returns" class="dropdown-item">
      <span class="text-amber-400 text-xs">❖</span>
      <span>គោលការណ៍ដឹកជញ្ជូន &amp; ផ្លាស់ប្តូរ</span>
    </router-link>
    <router-link to="/contact-us" class="dropdown-item">
      <span class="text-amber-400 text-xs">❖</span>
      <span>ទំនាក់ទំនងយើង</span>
    </router-link>
  </div>
</div>

      </div>

      <!-- User Actions Right Side -->
      <div class="flex items-center gap-2 sm:gap-3">

        <!-- Search Button -->
        <button type="button" @click="isSearchOpen = true"
          class="hidden md:block p-2.5 text-amber-100/80 hover:text-amber-300 hover:bg-amber-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-500/30 active:scale-95"
          title="ស្វែងរក" aria-label="ស្វែងរក">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <!-- Wishlist Button -->
        <router-link to="/wishlist"
          class="relative p-2.5 text-amber-100/80 hover:text-amber-300 hover:bg-amber-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-500/30 hidden sm:block active:scale-95"
          title="បញ្ជីប្រាថ្នា">
          <svg class="w-5 h-5 transition-colors duration-200"
            :class="wishlistTotalItems > 0 ? 'fill-rose-500 text-rose-500 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'fill-none stroke-current'"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span v-if="wishlistTotalItems > 0"
            class="absolute top-1 right-1 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border border-amber-950 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse">
            {{ wishlistTotalItems }}
          </span>
        </router-link>

        <!-- Cart Button -->
        <router-link to="/cart"
          class="relative p-2.5 text-amber-100/80 hover:text-amber-300 hover:bg-amber-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-500/30 active:scale-95"
          title="កន្ត្រកទំនិញ">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span v-if="cartTotalItems > 0"
            class="absolute top-1 right-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] font-extrabold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border border-amber-950 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-bounce-gentle">
            {{ cartTotalItems }}
          </span>
        </router-link>

        <!-- Account button + dropdown -->
        <div ref="accountRef" class="relative hidden md:block">
          <button type="button" @click="toggleDropdown"
            class="bg-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-full flex items-center gap-1 hover:bg-amber-400 transition max-w-[9rem]"
            aria-haspopup="menu" :aria-expanded="isDropdownOpen">
            <span class="truncate">{{ currentUser ? currentUser.name : '👤' }}</span>
          </button>

          <div v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-60 bg-[#15120D] border border-amber-600/30 rounded-2xl shadow-xl p-2 z-50 space-y-1"
            role="menu">
            <router-link v-if="!currentUser" to="/auth" @click="isDropdownOpen = false"
              class="flex items-center gap-2 p-2.5 text-xs text-amber-200 hover:bg-amber-600/20 rounded-xl transition">
              <span class="text-amber-400">❖</span>
              <span>ចូលប្រើ / ចុះឈ្មោះ</span>
            </router-link>

            <template v-else>
              <div class="px-3 py-2 border-b border-amber-600/20 mb-1">
                <p class="text-[10px] text-amber-200/60">គណនីរបស់អ្នក</p>
                <p class="text-xs font-bold text-amber-400 truncate">{{ currentUser.email }}</p>
              </div>

              <router-link to="/account" @click="isDropdownOpen = false"
                class="flex items-center gap-2 p-2.5 text-xs text-amber-200 hover:bg-amber-600/20 rounded-xl transition">
                <span class="text-amber-400">◇</span>
                <span>ផ្ទាំងគ្រប់គ្រង &amp; ព័ត៌មាន</span>
              </router-link>

              <router-link to="/orders" @click="isDropdownOpen = false"
                class="flex items-center gap-2 p-2.5 text-xs text-amber-200 hover:bg-amber-600/20 rounded-xl transition">
                <span class="text-amber-400">📜</span>
                <span>ប្រវត្តិការកុម្ម៉ង់</span>
              </router-link>

              <router-link to="/wishlist" @click="isDropdownOpen = false"
                class="flex items-center gap-2 p-2.5 text-xs text-amber-200 hover:bg-amber-600/20 rounded-xl transition">
                <span class="text-amber-400">♡</span>
                <span>បញ្ជីប្រាថ្នា</span>
                <span v-if="wishlistTotalItems > 0" class="ml-auto text-[10px] text-amber-400/80">{{ wishlistTotalItems
                  }}</span>
              </router-link>

              <button type="button" @click="handleLogout"
                class="w-full flex items-center gap-2 p-2.5 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition text-left border-t border-amber-600/10">
                <span>📤</span>
                <span>ចាកចេញ</span>
              </button>
            </template>
          </div>
        </div>

        <!-- Mobile Menu Hamburger Button -->
        <button type="button" @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2.5 text-amber-200 hover:text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors focus:outline-none border border-transparent hover:border-amber-500/30"
          aria-label="Toggle Navigation Menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
          </svg>
        </button>

      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <transition name="mobile-drawer">
      <div v-if="isMobileMenuOpen"
        class="md:hidden bg-[#120F0A] border-b border-amber-600/30 px-5 pt-4 pb-8 space-y-4 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">

        <!-- Search (mobile) -->
        <button type="button" @click="openSearchFromMenu"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-600/30 text-left text-sm text-amber-200/70 hover:border-amber-500/60 transition">
          <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>ស្វែងរកផលិតផល...</span>
        </button>

        <router-link to="/" @click="isMobileMenuOpen = false"
          class="block py-2 text-base font-medium text-amber-100 hover:text-amber-400 border-b border-amber-600/10">
          ទំព័រដើម
        </router-link>

        <!-- Mobile Category (Dynamic) -->
        <div class="space-y-1 pt-1">
          <p class="text-xs font-semibold text-amber-500/70 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <span>❖</span> ហាងទំនិញ
          </p>
          <router-link to="/products" @click="isMobileMenuOpen = false" class="mobile-item">ផលិតផលទាំងអស់</router-link>
          <router-link v-for="cat in categoryStore.categories" :key="cat.id" :to="`/category/${cat.slug}`"
            @click="isMobileMenuOpen = false" class="mobile-item">
            {{ cat.name_km }}
          </router-link>
        </div>

        <!-- Mobile About Us -->
        <div class="space-y-1 border-t border-amber-600/20 pt-3">
          <p class="text-xs font-semibold text-amber-500/70 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <span>❖</span> អំពីយើង
          </p>
          <router-link to="/our-story" @click="isMobileMenuOpen = false"
            class="mobile-item">ប្រវត្តិរបស់យើង</router-link>
          <router-link to="/community-producers" @click="isMobileMenuOpen = false"
            class="mobile-item">សហគមន៍អ្នកផលិត</router-link>
        </div>

        <!-- Mobile Help -->
        <div class="space-y-1 border-t border-amber-600/20 pt-3">
          <p class="text-xs font-semibold text-amber-500/70 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <span>❖</span> ជំនួយ &amp; ទំនាក់ទំនង
          </p>
          <router-link to="/faqs" @click="isMobileMenuOpen = false" class="mobile-item">FAQs</router-link>
          <router-link to="/shipping-returns" @click="isMobileMenuOpen = false" class="mobile-item">គោលការណ៍ដឹកជញ្ជូន
            &amp;
            ផ្លាស់ប្តូរ</router-link>
          <router-link to="/contact-us" @click="isMobileMenuOpen = false" class="mobile-item">ទំនាក់ទំនង</router-link>
        </div>

        <!-- Account (mobile) -->
        <div class="rounded-2xl border border-amber-600/30 bg-amber-500/5 p-3">
          <router-link v-if="!currentUser" to="/auth" @click="isMobileMenuOpen = false"
            class="flex items-center justify-center gap-2 w-full bg-amber-500 text-slate-950 font-bold text-sm py-2.5 rounded-xl hover:bg-amber-400 transition">
            <span>👤</span>
            <span>ចូលប្រើ / ចុះឈ្មោះ</span>
          </router-link>

          <template v-else>
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                {{ userInitial }}
              </div>
              <div class="min-w-0">
                <p class="text-sm font-bold text-amber-50 truncate">{{ currentUser.name }}</p>
                <p class="text-[11px] text-amber-200/60 truncate">{{ currentUser.email }}</p>
              </div>
            </div>

            <router-link to="/account" @click="isMobileMenuOpen = false"
              class="flex items-center gap-2 p-2.5 text-sm text-amber-200 hover:bg-amber-600/20 rounded-xl transition">
              <span>◇</span>
              <span>ផ្ទាំងគ្រប់គ្រង &amp; ព័ត៌មាន</span>
            </router-link>

            <router-link to="/orders" @click="isMobileMenuOpen = false"
              class="flex items-center gap-2 p-2.5 text-sm text-amber-200 hover:bg-amber-600/20 rounded-xl transition">
              <span>📜</span>
              <span>ប្រវត្តិការកុម្ម៉ង់</span>
            </router-link>

            <button type="button" @click="handleLogout"
              class="w-full flex items-center gap-2 p-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition text-left">
              <span>🚪</span>
              <span>ចាកចេញ (Logout)</span>
            </button>
          </template>
        </div>

      </div>
    </transition>

    <!-- Search overlay -->
    <SearchModal v-model="isSearchOpen" />
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useCategoryStore } from '@/stores/category'
import SearchModal from '@/components/common/SearchModal.vue'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const wishlist = useWishlistStore()
const categoryStore = useCategoryStore()

const isMobileMenuOpen = ref(false)
const isDropdownOpen = ref(false)
const isSearchOpen = ref(false)
const currentUser = ref(null)
const accountRef = ref(null)

const cartTotalItems = computed(() => {
  if (cart.totalItems !== undefined) {
    return typeof cart.totalItems === 'number' ? cart.totalItems : cart.totalItems.value
  }
  return cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0
})

const wishlistTotalItems = computed(() => {
  if (wishlist.totalWishlistCount !== undefined) {
    return typeof wishlist.totalWishlistCount === 'number' ? wishlist.totalWishlistCount : wishlist.totalWishlistCount.value
  }
  return wishlist.items ? wishlist.items.length : 0
})

const checkAuth = () => {
  const session = localStorage.getItem('user_session')
  if (!session) {
    currentUser.value = null
    return
  }
  try {
    currentUser.value = JSON.parse(session)
  } catch (e) {
    currentUser.value = null
  }
}

const userInitial = computed(() => {
  const name = (currentUser.value && currentUser.value.name) || ''
  return (Array.from(name.trim())[0] || '👤').toUpperCase()
})

const openSearchFromMenu = () => {
  isMobileMenuOpen.value = false
  isSearchOpen.value = true
}

const toggleDropdown = () => {
  checkAuth()
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleLogout = () => {
  localStorage.removeItem('user_session')
  currentUser.value = null
  isDropdownOpen.value = false
  isMobileMenuOpen.value = false
  window.dispatchEvent(new Event('auth-changed'))
  router.push('/')
}

const onDocumentClick = (e) => {
  if (accountRef.value && !accountRef.value.contains(e.target)) {
    isDropdownOpen.value = false
  }
}

const onStorage = (e) => {
  if (!e.key || e.key === 'user_session') checkAuth()
}

watch(
  () => route.fullPath,
  () => {
    checkAuth()
    isDropdownOpen.value = false
    isMobileMenuOpen.value = false
  }
)

onMounted(async () => {
  checkAuth()
  await categoryStore.fetchCategories()
  document.addEventListener('click', onDocumentClick)
  window.addEventListener('storage', onStorage)
  window.addEventListener('auth-changed', checkAuth)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  window.removeEventListener('storage', onStorage)
  window.removeEventListener('auth-changed', checkAuth)
})
</script>