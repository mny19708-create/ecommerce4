<template>
  <div class="cart-page w-full min-w-full min-h-screen font-khmer bg-[#0b0f17] text-slate-100 selection:bg-amber-500 selection:text-black overflow-x-hidden">

    <!-- Header -->
    <section class="hero-pattern relative w-full py-14 sm:py-20 px-4 overflow-hidden border-b border-slate-800 flex flex-col items-center text-center">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div class="absolute top-6 left-6 w-60 h-60 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-6 right-6 w-64 h-64 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="relative z-10 flex flex-col items-center">
        <span class="enter inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-glow-text" style="--delay:0ms">
          <svg class="w-4 h-4 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C58 25 75 42 100 50 C75 58 58 75 50 100 C42 75 25 58 0 50 C25 42 42 25 50 0 Z" />
          </svg>
          ការទិញទំនិញ
        </span>

        <h1 class="enter font-moul text-2xl sm:text-4xl text-white leading-relaxed tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]" style="--delay:120ms">
          កន្ត្រកទំនិញ<span class="shimmer-text text-transparent bg-clip-text">របស់អ្នក</span>
        </h1>

        <div class="khmer-divider mt-6 flex items-center justify-center gap-4 w-full max-w-sm mx-auto">
          <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent flex-1"></div>
          <div class="text-amber-400 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] animate-float">
            <svg class="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C60 30 70 40 100 50 C70 60 60 70 50 100 C40 70 30 60 0 50 C30 40 40 30 50 0 Z" />
            </svg>
          </div>
          <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent flex-1"></div>
        </div>
      </div>
    </section>

    <div class="cart-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Empty Cart State -->
      <div
        v-if="cartStore.items.length === 0"
        class="enter empty-card relative max-w-xl mx-auto text-center py-16 px-6 bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-800 hover:border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.08)] transition-colors duration-500"
        style="--delay:200ms"
      >
        <div class="top-4 left-4 border-t-2 border-l-2 border-amber-500/60 w-5 h-5 absolute"></div>
        <div class="top-4 right-4 border-t-2 border-r-2 border-amber-500/60 w-5 h-5 absolute"></div>

        <div class="empty-icon w-20 h-20 mx-auto mb-6 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/20 filter drop-shadow-[0_0_14px_rgba(245,158,11,0.5)] animate-float">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p class="empty-text text-slate-300 font-medium text-lg mb-6">មិនទាន់មានទំនិញនៅក្នុងកន្ត្រកនៅឡើយទេ</p>
        <router-link
          to="/products"
          class="btn-shine btn-cta inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 !text-slate-950 no-underline font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] hover:-translate-y-1"
        >
          ទៅកាន់ទំព័រទំនិញ
        </router-link>
      </div>

      <!-- Cart Items & Summary -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <!-- Items List -->
        <transition-group name="cart" tag="div" class="lg:col-span-2 space-y-4">
          <div
            v-for="(item, i) in cartStore.items"
            :key="item.id"
            class="enter group relative bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 border border-slate-800 hover:border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.06)] hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] transition-all duration-500 flex flex-col sm:flex-row items-center justify-between gap-4"
            :style="{ '--delay': i * 100 + 'ms' }"
          >
            <div class="flex items-center gap-4 w-full sm:w-auto">
              <!-- Image -->
              <div class="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400/60">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4-4 4 4 4-6 4 6M4 6h16v12H4z" />
                </svg>
                <img
                  v-if="imgOf(item)"
                  :src="imgOf(item)"
                  :alt="item.name"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  @error="(e) => (e.target.style.display = 'none')"
                />
              </div>
              <div class="text-left">
                <h3 class="font-bold text-white text-base mb-1 group-hover:text-amber-400 transition-colors duration-300">{{ item.name }}</h3>
                <p v-if="item.selectedColor" class="text-xs text-slate-400 mb-1">ពណ៌៖ {{ item.selectedColor }}</p>
                <p class="text-amber-400 font-extrabold text-sm">${{ Number(item.price).toFixed(2) }}</p>
              </div>
            </div>

            <!-- Quantity & Actions -->
            <div class="flex items-center justify-between w-full sm:w-auto gap-5">
              <div class="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-950/70">
                <button
                  type="button"
                  @click="cartStore.decrementQuantity(item.id)"
                  class="w-9 h-9 text-slate-300 hover:bg-amber-500 hover:text-black transition-colors duration-300 font-bold"
                  aria-label="បន្ថយចំនួន"
                >
                  -
                </button>
                <span class="w-10 text-center text-sm font-semibold text-white">{{ item.qty }}</span>
                <button
                  type="button"
                  @click="cartStore.incrementQuantity(item.id)"
                  class="w-9 h-9 text-slate-300 hover:bg-amber-500 hover:text-black transition-colors duration-300 font-bold"
                  aria-label="បង្កើនចំនួន"
                >
                  +
                </button>
              </div>

              <div class="text-right min-w-[70px]">
                <p class="font-extrabold text-amber-400">${{ (Number(item.price) * item.qty).toFixed(2) }}</p>
              </div>

              <button
                type="button"
                @click="cartStore.removeItem(item.id)"
                class="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-all duration-300 hover:rotate-6"
                title="លុបចេញ"
                aria-label="លុបចេញ"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
              </button>
            </div>
          </div>
        </transition-group>

        <!-- Order Summary -->
        <div class="enter lg:sticky lg:top-24 relative bg-slate-900/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.08)] transition-colors duration-500 space-y-5 text-left" style="--delay:250ms">
          <div class="top-4 left-4 border-t-2 border-l-2 border-amber-500/60 w-5 h-5 absolute"></div>
          <div class="top-4 right-4 border-t-2 border-r-2 border-amber-500/60 w-5 h-5 absolute"></div>

          <h2 class="font-moul text-lg text-white pt-2">សរុបការបញ្ជាទិញ</h2>

          <div class="space-y-3 text-sm">
            <div class="flex items-center justify-between text-slate-300">
              <span>ចំនួនទំនិញ</span>
              <span class="font-semibold text-white">{{ cartStore.totalItems }}</span>
            </div>
            <div class="flex items-center justify-between text-slate-300">
              <span>តម្លៃទំនិញ</span>
              <span class="font-semibold text-white">${{ Number(cartStore.subtotal || 0).toFixed(2) }}</span>
            </div>
            <div class="h-px bg-slate-800"></div>
            <div class="flex items-center justify-between">
              <span class="text-slate-200 font-bold">សរុប</span>
              <span class="text-amber-400 font-extrabold text-xl">${{ Number(cartStore.subtotal || 0).toFixed(2) }}</span>
            </div>
          </div>

          <button
            type="button"
            @click="cartStore.clearCart()"
            class="w-full text-xs text-slate-400 hover:text-red-400 transition-colors duration-300"
          >
            សម្អាតកន្ត្រកទាំងអស់
          </button>

          <router-link
            to="/checkout"
            class="btn-shine block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 !text-slate-950 no-underline text-center font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] hover:-translate-y-1 active:scale-95"
          >
            បន្តទៅការទូទាត់ប្រាក់ &rarr;
          </router-link>

          <router-link
            to="/products"
            class="block text-center text-xs text-slate-400 hover:text-amber-400 transition-colors duration-300"
          >
            &larr; ទិញទំនិញបន្ថែម
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const imgOf = (p) => {
  const first = Array.isArray(p.images) ? p.images[0] : null
  return p.image || p.image_url || p.imageUrl || p.thumbnail || (typeof first === 'string' ? first : first?.url) || ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');

.font-moul { font-family: 'Moul', cursive, serif; }
.font-khmer { font-family: 'Siemreap', sans-serif; }

/* ===== Full screen + dark background (កាត់ចោល style លំនាំដើមរបស់ Vite) ===== */
:global(html) {
  background: #0b0f17 !important;
  color-scheme: dark;
}
:global(body) {
  display: block !important;
  place-items: initial !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  min-width: 0 !important;
  min-height: 100vh;
  background: #0b0f17 !important;
}
:global(#app) {
  max-width: none !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: initial !important;
}
.cart-page a { text-decoration: none; }

/* ===== Layout ច្បាស់លាស់ (មិនពឹងលើ Tailwind utilities ដែលអាចត្រូវ CSS ផ្សេងសរសេរជាន់) ===== */
.cart-page { width: 100%; box-sizing: border-box; }
.cart-container {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1rem;
  box-sizing: border-box;
}
.empty-card {
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
}
.empty-icon { margin: 0 auto 1.5rem; flex-shrink: 0; }
.empty-text { margin: 0 0 1.5rem; }
.btn-cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  line-height: 1.5;
}

/* ===== Hero Pattern ===== */
.hero-pattern {
  background-color: #0b0f17;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23f59e0b' opacity='0.12'%3E%3Cpath d='M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0 Z'/%3E%3C/svg%3E"),
    radial-gradient(rgba(245, 158, 11, 0.25) 1.2px, transparent 1.2px);
  background-size: 30px 50px;
  background-position: center center, 0 0;
  background-repeat: repeat, repeat;
  animation: patternMove 40s linear infinite;
}
@keyframes patternMove {
  to { background-position: center center, 30px 50px; }
}

/* ===== Base Animations ===== */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes pulseSlow {
  0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.15); }
}
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-float { animation: float 4s ease-in-out infinite; }
.animate-pulse-slow { animation: pulseSlow 6s ease-in-out infinite; }
.animate-spin-slow { animation: spinSlow 20s linear infinite; }

/* ===== Enter animation (ដំណើរការបានគ្រប់ពេល រួមទាំង element ដែលបន្ថែមក្រោយ) ===== */
.enter {
  animation: enterUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms) backwards;
}
@keyframes enterUp {
  from { opacity: 0; transform: translateY(36px) scale(0.96); filter: blur(6px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
}

/* ===== Remove item transition ===== */
.cart-leave-active { transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.cart-leave-to { opacity: 0; transform: translateX(40px) scale(0.95); }

/* ===== Shimmer + Glow ===== */
.shimmer-text {
  background-image: linear-gradient(90deg, #fde68a, #fbbf24, #f59e0b, #fbbf24, #fde68a);
  background-size: 200% auto;
  animation: shimmer 4s linear infinite;
  filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.5));
}
@keyframes shimmer { to { background-position: 200% center; } }

.animate-glow-text { animation: glowText 3s ease-in-out infinite; }
@keyframes glowText {
  0%, 100% { text-shadow: 0 0 6px rgba(245, 158, 11, 0.3); }
  50%      { text-shadow: 0 0 18px rgba(245, 158, 11, 0.9); }
}

/* ===== Spheres drift ===== */
.hero-pattern > div.absolute:nth-of-type(2) { animation: drift1 14s ease-in-out infinite; }
.hero-pattern > div.absolute:nth-of-type(3) { animation: drift2 18s ease-in-out infinite; }
@keyframes drift1 {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(60px, 40px); }
}
@keyframes drift2 {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-70px, -30px); }
}

/* ===== Button shine ===== */
.btn-shine { position: relative; overflow: hidden; }
.btn-shine::after {
  content: '';
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  transform: skewX(-20deg);
  pointer-events: none;
}
.btn-shine:hover::after { animation: shine 0.9s ease; }
@keyframes shine { to { left: 130%; } }

/* ===== Divider ===== */
.khmer-divider > div:first-child,
.khmer-divider > div:last-child {
  transform-origin: center;
  animation: growLine 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
}
@keyframes growLine {
  from { transform: scaleX(0); opacity: 0; }
  to   { transform: scaleX(1); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>  