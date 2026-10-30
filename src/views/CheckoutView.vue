<template>
  <div class="w-full min-h-screen font-khmer bg-[#0D0B08] text-amber-50 overflow-x-hidden flex flex-col items-center relative selection:bg-amber-400 selection:text-black py-12 px-4 sm:px-6 lg:px-8">
    
    <!-- Background Atmospheric Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/25 via-yellow-900/10 to-transparent blur-3xl pointer-events-none -z-0 animate-pulse-slow"></div>
    <div class="absolute top-1/3 -left-48 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

    <!-- Header Section -->
    <div class="max-w-4xl w-full text-center relative z-10 mb-10 khmer-reveal">
      <div class="flex items-center justify-center gap-3 mb-3 text-amber-400">
        <span class="text-xl animate-bounce-gentle">༺</span>
        <span class="text-2xl font-bold animate-glow-pulse">❖</span>
        <span class="text-xl animate-bounce-gentle">༻</span>
      </div>

      <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        ការទូទាត់ប្រាក់ <span class="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(217,119,6,0.5)]">& បញ្ជាទិញ</span>
      </h1>
      
      <p class="text-amber-200/70 text-xs sm:text-sm font-light mt-2">
        សូមពិនិត្យមើលព័ត៌មានដឹកជញ្ជូន និងជ្រើសរើសវិធីសាស្ត្រទូទាត់ប្រាក់ឱ្យបានត្រឹមត្រូវ
      </p>

      <!-- Khmer Kbach Divider -->
      <div class="flex items-center justify-center gap-3 mt-6 w-full max-w-xs mx-auto">
        <span class="text-amber-500/60 text-xs">꧁</span>
        <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent flex-grow"></div>
        <span class="text-amber-400 text-sm">❖</span>
        <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent flex-grow"></div>
        <span class="text-amber-500/60 text-xs">꧂</span>
      </div>
    </div>

    <!-- Main Grid Content -->
    <div class="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      
      <!-- Left Column: Address & Payment Form -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Guest Banner / Login Suggestion -->
        <div v-if="!currentUser.email" class="bg-[#18140E] border border-amber-600/40 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg khmer-reveal">
          <div class="text-center sm:text-left">
            <span class="text-amber-400 text-xs font-semibold block">💡 ទិញជាភ្ញៀវ (Guest Checkout)</span>
            <span class="text-amber-200/70 text-xs">អ្នកអាចទិញបានដោយមិនបាច់ Login ឬចូលប្រើដើម្បីទាញយកព័ត៌មានអូតូ!</span>
          </div>
          <router-link to="/auth" class="shrink-0 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-500 px-3.5 py-2 rounded-xl hover:brightness-110 transition shadow-md">
            ចូលប្រើ / ចុះឈ្មោះ
          </router-link>
        </div>

        <form @submit.prevent="handlePlaceOrder" class="bg-[#15120D] p-6 sm:p-8 rounded-2xl border border-amber-600/30 hover:border-amber-400/60 shadow-2xl space-y-6 relative transition-all duration-300 khmer-card khmer-reveal">
          
          <!-- Corner Kbach Ornaments -->
          <div class="absolute top-2 left-2 text-amber-500/40 text-xs select-none">꧁ ✤</div>
          <div class="absolute top-2 right-2 text-amber-500/40 text-xs select-none">✤ ꧂</div>

          <!-- Section 1: Shipping Address -->
          <div class="space-y-4">
            <h3 class="font-bold text-lg text-amber-100 flex items-center justify-between border-b border-amber-600/30 pb-3">
              <span class="flex items-center gap-2">
                <span class="text-amber-400 text-sm">❖</span>
                អាសយដ្ឋានដឹកជញ្ជូន
              </span>
              <span v-if="currentUser.email" class="text-xs font-normal text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                ✓ សមាជិក ({{ currentUser.name || currentUser.email }})
              </span>
            </h3>

            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-amber-200/80 mb-1">ឈ្មោះពេញ *</label>
                <input 
                  type="text" 
                  v-model="shippingForm.name"
                  placeholder="ឧ. សុខ ជា" 
                  class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900 outline-none transition-all duration-200" 
                  required 
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-amber-200/80 mb-1">លេខទូរស័ព្ទ *</label>
                <input 
                  type="tel" 
                  v-model="shippingForm.phone"
                  placeholder="ឧ. 012 345 678" 
                  class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900 outline-none transition-all duration-200" 
                  required 
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-amber-200/80 mb-1">អាសយដ្ឋានលម្អិត *</label>
                <textarea 
                  v-model="shippingForm.address"
                  placeholder="ផ្ទះលេខ, ផ្លូវ, សង្កាត់/ឃុំ, ខណ្ឌ/ស្រុក, រាជធានី/ខេត្ត" 
                  class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900 outline-none transition-all duration-200" 
                  rows="3" 
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Section 2: Payment Method -->
          <div class="space-y-4 pt-2">
            <h3 class="font-bold text-lg text-amber-100 flex items-center gap-2 border-b border-amber-600/30 pb-3">
              <span class="text-amber-400 text-sm">❖</span>
              វិធីសាស្ត្រទូទាត់ប្រាក់
            </h3>

            <div class="space-y-3">
              <!-- KHQR Option -->
              <label 
                class="flex items-center justify-between border p-4 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                :class="selectedPayment === 'khqr' ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.2)]' : 'bg-[#0D0B08] border-amber-600/20 hover:border-amber-600/50'"
              >
                <div class="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="khqr" 
                    v-model="selectedPayment"
                    class="accent-amber-500 w-4 h-4 cursor-pointer" 
                  />
                  <div>
                    <span class="font-bold text-sm text-amber-100 block">KHQR Payment</span>
                    <span class="text-xs text-amber-300/60 font-light block">ទូទាត់រហ័សតាម ABA, ACLEDA, ឬ Bakong</span>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 text-xs font-extrabold bg-red-950/80 text-red-400 border border-red-500/40 px-2.5 py-1 rounded-md">
                  KHQR
                </div>
              </label>

              <!-- COD Option -->
              <label 
                class="flex items-center justify-between border p-4 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                :class="selectedPayment === 'cod' ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.2)]' : 'bg-[#0D0B08] border-amber-600/20 hover:border-amber-600/50'"
              >
                <div class="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    v-model="selectedPayment"
                    class="accent-amber-500 w-4 h-4 cursor-pointer" 
                  />
                  <div>
                    <span class="font-bold text-sm text-amber-100 block">Cash on Delivery (COD)</span>
                    <span class="text-xs text-amber-300/60 font-light block">ទូទាត់ប្រាក់ផ្ទាល់ពេលទទួលបានទំនិញ</span>
                  </div>
                </div>
                <div class="text-amber-400 text-lg">
                  🚚
                </div>
              </label>
            </div>
          </div>

          <!-- Submit Order Button -->
          <button 
            type="submit" 
            :disabled="cartItems.length === 0"
            class="w-full relative group overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-xl shadow-amber-600/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-95 border border-yellow-200/80 mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="relative z-10">
              {{ currentUser.email ? 'បញ្ជាក់ការបញ្ជាទិញជាសមាជិក' : 'បញ្ជាក់ការបញ្ជាទិញជា Guest' }} (${{ totalAmount.toFixed(2) }})
            </span>
            <span class="text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1">➔</span>
            <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          </button>

        </form>
      </div>

      <!-- Right Column: Order Summary -->
      <div class="lg:col-span-5">
        <div class="bg-[#15120D] p-6 rounded-2xl border border-amber-600/30 shadow-2xl space-y-5 sticky top-28 khmer-card khmer-reveal" data-delay="150">
          
          <h3 class="font-bold text-lg text-amber-100 border-b border-amber-600/30 pb-3 flex items-center justify-between">
            <span class="flex items-center gap-2">
              <span class="text-amber-400 text-sm">❖</span>
              មុខទំនិញក្នុង Order
            </span>
            <span class="text-xs font-normal text-amber-300/70">({{ cartItems.length }} មុខ)</span>
          </h3>

          <!-- Items List -->
          <div class="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
            <div 
              v-for="item in cartItems" 
              :key="item.id" 
              class="flex justify-between items-center text-sm border-b border-amber-600/10 pb-3 last:border-0"
            >
              <div class="pr-2">
                <span class="text-amber-100 font-medium block">{{ item.name || item.title }}</span>
                <span class="text-xs text-amber-300/60">បរិមាណ: {{ item.qty || item.quantity || 1 }} x ${{ item.price }}</span>
              </div>
              <span class="font-bold text-amber-400 shrink-0">
                ${{ ((item.price || 0) * (item.qty || item.quantity || 1)).toFixed(2) }}
              </span>
            </div>

            <div v-if="cartItems.length === 0" class="text-center py-6 text-amber-200/50 text-xs">
              មិនមានទំនិញក្នុងកន្ត្រកឡើយ
            </div>
          </div>

          <!-- Price Calculation -->
          <div class="border-t border-amber-600/30 pt-4 space-y-2 text-xs text-amber-200/80">
            <div class="flex justify-between">
              <span>តម្លៃសរុបទំនិញ</span>
              <span class="font-medium text-amber-100">${{ subtotalAmount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>ថ្លៃដឹកជញ្ជូន</span>
              <span class="font-medium text-amber-100">$2.00</span>
            </div>
            <div class="flex justify-between text-base font-bold text-amber-300 border-t border-amber-600/30 pt-3">
              <span>សរុបចុងក្រោយ</span>
              <span class="text-amber-400 text-lg filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                ${{ totalAmount.toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Guarantee Badge -->
          <div class="bg-amber-950/40 border border-amber-600/20 p-3 rounded-xl flex items-center gap-3 text-xs text-amber-300/80">
            <span class="text-xl">🛡</span>
            <span>ការទូទាត់ប្រាក់របស់អ្នកត្រូវបានធានាដោយសុវត្ថិភាព ១០០%</span>
          </div>

        </div>
      </div>

    </div>

    <!-- INVOICE MODAL POPUP -->
    <div v-if="showInvoiceModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div class="bg-[#15120D] border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-amber-50 font-khmer overflow-hidden animate-scale-up print-area">
        
        <!-- Top Decor -->
        <div class="text-center space-y-1 mb-6 border-b border-amber-600/30 pb-4">
          <div class="text-amber-400 text-lg">༺ ❖ ༻</div>
          <h2 class="text-2xl font-bold text-amber-400">វិក្កយប័ត្របញ្ជាទិញ / INVOICE</h2>
          <p class="text-xs text-amber-200/60">អរគុណសម្រាប់ការបញ្ជាទិញរបស់អ្នក!</p>
        </div>

        <!-- Invoice Meta -->
        <div class="grid grid-cols-2 gap-4 text-xs mb-6 bg-[#0D0B08] p-3 rounded-xl border border-amber-600/20">
          <div>
            <span class="text-amber-300/60 block">លេខវិក្កយប័ត្រ:</span>
            <span class="font-bold text-amber-300">{{ completedOrder.order_number }}</span>
          </div>
          <div>
            <span class="text-amber-300/60 block">កាលបរិច្ឆេទ:</span>
            <span class="font-bold text-amber-100">{{ completedOrder.date }}</span>
          </div>
          <div>
            <span class="text-amber-300/60 block">ឈ្មោះអតិថិជន:</span>
            <span class="font-bold text-amber-100">{{ completedOrder.shipping_info?.name }}</span>
          </div>
          <div>
            <span class="text-amber-300/60 block">លេខទូរស័ព្ទ:</span>
            <span class="font-bold text-amber-100">{{ completedOrder.shipping_info?.phone }}</span>
          </div>
          <div class="col-span-2">
            <span class="text-amber-300/60 block">អាសយដ្ឋានដឹកជញ្ជូន:</span>
            <span class="font-bold text-amber-100">{{ completedOrder.shipping_info?.address }}</span>
          </div>
          <div class="col-span-2 border-t border-amber-600/20 pt-2">
            <span class="text-amber-300/60 block">វិធីសាស្ត្រទូទាត់:</span>
            <span class="font-bold text-emerald-400">{{ completedOrder.payment_method }}</span>
          </div>
        </div>

        <!-- Order Items List -->
        <div class="space-y-2 mb-6 max-h-48 overflow-y-auto custom-scrollbar pr-1">
          <div class="text-xs font-semibold text-amber-400 border-b border-amber-600/30 pb-1 flex justify-between">
            <span>មុខទំនិញ</span>
            <span>សរុប</span>
          </div>
          <div v-for="item in completedOrder.items" :key="item.id" class="flex justify-between items-center text-xs border-b border-amber-600/10 pb-1.5">
            <div>
              <span class="text-amber-100 block">{{ item.name }}</span>
              <span class="text-[10px] text-amber-300/60">{{ item.qty }} x ${{ item.price.toFixed(2) }}</span>
            </div>
            <span class="font-medium text-amber-200">${{ (item.qty * item.price).toFixed(2) }}</span>
          </div>
        </div>

        <!-- Order Totals -->
        <div class="space-y-1.5 text-xs border-t border-amber-600/30 pt-3 mb-6">
          <div class="flex justify-between text-amber-200/80">
            <span>តម្លៃទំនិញសរុប:</span>
            <span>${{ completedOrder.subtotal?.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-amber-200/80">
            <span>ថ្លៃដឹកជញ្ជូន:</span>
            <span>${{ completedOrder.shipping_cost?.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm font-bold text-amber-400 border-t border-amber-600/30 pt-2">
            <span>ប្រាក់ត្រូវទូទាត់សរុប:</span>
            <span class="text-base">${{ completedOrder.total_amount?.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Modal Actions (Hidden when printing) -->
        <div class="flex gap-3 no-print">
          <button 
            @click="printInvoice" 
            class="flex-1 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 py-2.5 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2"
          >
            🖨️ បោះពុម្ពវិក្កយប័ត្រ
          </button>
          <button 
            @click="closeInvoiceModal" 
            class="flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-stone-950 py-2.5 rounded-xl font-bold text-xs transition"
          >
            បន្តការទិញទំនិញ ➔
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const selectedPayment = ref('khqr')
const currentUser = ref({})

// Modal and Invoice State
const showInvoiceModal = ref(false)
const completedOrder = ref({})

const shippingForm = ref({
  name: '',
  phone: '',
  address: ''
})

onMounted(() => {
  // 1. Trigger reveal animations
  const elements = document.querySelectorAll('.khmer-reveal')
  elements.forEach((el) => {
    el.classList.add('is-visible')
  })

  // 2. Check and load logged-in user profile for Auto-fill
  const storedUser = localStorage.getItem('user_session')
  if (storedUser) {
    try {
      currentUser.value = JSON.parse(storedUser)
      if (currentUser.value) {
        shippingForm.value.name = currentUser.value.name || ''
        shippingForm.value.phone = currentUser.value.phone || ''
        shippingForm.value.address = currentUser.value.address || ''
      }
    } catch (e) {
      console.error('Error parsing user session', e)
    }
  }
})

const cartItems = computed(() => {
  return cart.items || []
})

const subtotalAmount = computed(() => {
  if (cart.subtotal !== undefined) {
    return typeof cart.subtotal === 'number' ? cart.subtotal : cart.subtotal.value || 0
  }
  return cartItems.value.reduce((sum, item) => sum + (item.price * (item.qty || item.quantity || 1)), 0)
})

const totalAmount = computed(() => {
  return subtotalAmount.value + 2
})

const handlePlaceOrder = () => {
  if (cartItems.value.length === 0) {
    alert('សូមបន្ថែមទំនិញទៅក្នុងកន្ត្រកជាមុនសិន!')
    return
  }

  if (!shippingForm.value.name || !shippingForm.value.phone || !shippingForm.value.address) {
    alert('សូមបំពេញព័ត៌មានដឹកជញ្ជូនឱ្យបានគ្រប់គ្រាន់!')
    return
  }

  const subtotal = subtotalAmount.value
  const shippingFee = 2.00
  const grandTotal = totalAmount.value

  const isGuest = !currentUser.value.email

  const newOrder = {
    id: Date.now(),
    order_number: 'KH-' + Math.floor(10000 + Math.random() * 90000),
    date: new Date().toISOString().split('T')[0],
    status: 'Processing',
    is_guest: isGuest,
    user_email: isGuest ? null : currentUser.value.email,
    payment_method: selectedPayment.value === 'khqr' ? 'KHQR Payment' : 'Cash on Delivery (COD)',
    shipping_info: { ...shippingForm.value },
    subtotal: subtotal,
    shipping_cost: shippingFee,
    total_amount: grandTotal,
    items: cartItems.value.map(item => ({
      id: item.id,
      name: item.title || item.name,
      price: item.price,
      qty: item.quantity || item.qty || 1,
      image: item.image
    }))
  }

  // 3. Save order to LocalStorage
  const existingOrders = JSON.parse(localStorage.getItem('user_orders') || '[]')
  existingOrders.unshift(newOrder)
  localStorage.setItem('user_orders', JSON.stringify(existingOrders))

  // 4. Set order details for Invoice display
  completedOrder.value = newOrder

  // 5. Clear cart
  if (typeof cart.clearCart === 'function') {
    cart.clearCart()
  } else if (cart.items) {
    cart.items = []
  }

  // 6. Show Invoice Modal Popup
  showInvoiceModal.value = true
}

const printInvoice = () => {
  window.print()
}

const closeInvoiceModal = () => {
  showInvoiceModal.value = false
  const isGuest = !currentUser.value.email
  if (!isGuest) {
    router.push({ name: 'order-history' })
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}

/* Animations */
.khmer-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms ease, transform 700ms cubic-bezier(.16,1,.3,1);
}

.khmer-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

@keyframes glowPulse {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.4)); }
  50% { filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.8)); }
}

@keyframes bounceGentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

.animate-glow-pulse {
  animation: glowPulse 3s ease-in-out infinite;
}

.animate-bounce-gentle {
  animation: bounceGentle 2.5s ease-in-out infinite;
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Card Golden Border Gradient */
.khmer-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(135deg, rgba(245,158,11,0.5), transparent 45%, rgba(180, 171, 154, 0.2));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.5;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(13, 11, 8, 0.5);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(217, 119, 6, 0.4);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.8);
}

/* Print Styles */
@media print {
  body * {
    visibility: hidden;
  }
  .print-area, .print-area * {
    visibility: visible;
  }
  .print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background-color: white !important;
    color: black !important;
  }
  .no-print {
    display: none !important;
  }
}
</style>