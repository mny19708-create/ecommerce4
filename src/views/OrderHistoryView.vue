<template>
  <div class="min-h-screen bg-[#0f0d0a] text-amber-50 px-4 py-8 font-khmer">

    <!-- Centered container (spacing uses flex + gap, so it works even if a global CSS reset removes margins) -->
    <div class="page-container max-w-5xl flex flex-col gap-8">

      <!-- Header Title -->
      <header class="flex flex-col gap-1 border-b border-amber-500/20 pb-4 text-center sm:text-left">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-amber-400 flex items-center justify-center sm:justify-start gap-2">
          <span>❖</span> ប្រវត្តិបញ្ជាទិញ &amp; ការតាមដាន <span>❖</span>
        </h1>
        <p class="text-xs sm:text-sm text-amber-200/60">
          មើលរាល់ប្រវត្តិទិញទំនិញ និងទាញយកវិក្កយបត្ររបស់អ្នក
        </p>
      </header>

      <!-- No Orders State -->
      <div
        v-if="orders.length === 0"
        class="flex flex-col items-center gap-4 text-center py-16 bg-[#181511] rounded-3xl border border-amber-500/20"
      >
        <p class="text-amber-200/60 text-base">លោកអ្នកមិនទាន់មានប្រវត្តិបញ្ជាទិញនៅឡើយទេ</p>
        <router-link to="/" class="inline-block bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold px-6 py-2.5 rounded-xl transition">
          ទៅកាន់ទំព័រទិញទំនិញ
        </router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="flex flex-col gap-6">
        <div
          v-for="order in orders"
          :key="order.id"
          class="flex flex-col gap-4 bg-[#181511] p-5 sm:p-6 rounded-3xl border border-amber-500/20 shadow-xl relative overflow-hidden"
        >
          <!-- Order Header Meta -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-amber-500/10 pb-4 text-xs sm:text-sm">
            <div class="flex flex-col gap-1">
              <span class="text-amber-200/50">លេខ Order</span>
              <span class="font-bold text-amber-400">#{{ order.order_number }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-amber-200/50">កាលបរិច្ឆេទ</span>
              <span class="font-medium text-amber-100/80">{{ order.date }}</span>
            </div>
            <div class="flex flex-col gap-1 items-start">
              <span class="text-amber-200/50">ស្ថានភាព</span>
              <span :class="statusClass(order.status)" class="text-[11px] font-bold px-3 py-1 rounded-full inline-block">
                {{ translateStatus(order.status) }}
              </span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-amber-200/50">តម្លៃសរុប</span>
              <span class="font-black text-amber-400 text-base sm:text-lg">${{ money(order.total_amount) }}</span>
            </div>
          </div>

          <!-- Items in the order -->
          <div class="flex flex-col gap-3">
            <div v-for="(item, idx) in order.items" :key="item.id ?? idx" class="flex items-center gap-4 py-1">
              <!-- Image with emoji fallback (if the image link is broken, the emoji shows instead of a broken icon) -->
              <div class="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden border border-amber-500/20 bg-black/40 flex items-center justify-center text-xl">
                <span>🛍️</span>
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  loading="lazy"
                  class="absolute inset-0 w-full h-full object-cover"
                  @error="hideImage"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h5 class="font-bold text-sm text-amber-100 leading-snug">{{ item.name }}</h5>
                <span class="text-xs text-amber-200/50 font-medium">${{ item.price }} × {{ item.qty }}</span>
              </div>
              <div class="text-right font-bold text-sm text-amber-400">
                ${{ money(item.price * item.qty) }}
              </div>
            </div>
          </div>

          <!-- Order Action Button -->
          <div class="pt-4 border-t border-amber-500/10 flex justify-end">
            <button
              @click="openReceipt(order)"
              class="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 active:scale-95"
            >
              <span>🧾</span>
              <span>មើលវិក្កយបត្រ (Receipt)</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Printable Receipt Modal -->
    <div
      v-if="selectedOrder"
      class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      @click.self="selectedOrder = null"
    >
      <div class="bg-[#181511] text-amber-50 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-amber-500/30 relative max-h-[90vh] overflow-y-auto flex flex-col gap-6">
        <button
          @click="selectedOrder = null"
          class="absolute top-4 right-4 text-amber-200/50 hover:text-amber-400 font-bold text-lg w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center"
          aria-label="បិទ"
        >
          ✕
        </button>

        <!-- Printable Area (only classes listed in printReceipt()'s CSS are used for spacing) -->
        <div id="receipt-content" class="flex flex-col gap-4 font-khmer">
          <div class="flex flex-col items-center text-center gap-1 border-b pb-4">
            <div class="w-12 h-12 bg-amber-500 text-gray-950 rounded-2xl flex items-center justify-center text-xl font-bold">
              🇰🇭
            </div>
            <h2 class="text-xl font-bold text-amber-400">Khmer Handmade</h2>
            <p class="text-xs text-amber-200/60">វិក្កយបត្រទូទាត់ប្រាក់ (Official Receipt)</p>
          </div>

          <div class="flex flex-col gap-2 text-xs text-amber-200/80 border-b pb-3">
            <div class="flex justify-between">
              <span>លេខវិក្កយបត្រ:</span>
              <span class="font-bold text-amber-400">#{{ selectedOrder.order_number }}</span>
            </div>
            <div class="flex justify-between">
              <span>កាលបរិច្ឆេទ:</span>
              <span>{{ selectedOrder.date }}</span>
            </div>
            <div class="flex justify-between">
              <span>វិធីសាស្ត្រទូទាត់:</span>
              <span class="font-bold text-amber-400">{{ selectedOrder.payment_method || 'KHQR / COD' }}</span>
            </div>
          </div>

          <!-- Items List -->
          <div class="flex flex-col gap-2 border-b pb-3">
            <div v-for="(item, idx) in selectedOrder.items" :key="item.id ?? idx" class="flex justify-between text-xs">
              <div class="flex flex-col gap-1">
                <p class="font-bold text-amber-100">{{ item.name }}</p>
                <p class="text-amber-200/50">{{ item.qty }} x ${{ item.price }}</p>
              </div>
              <span class="font-bold text-amber-400">${{ money(item.price * item.qty) }}</span>
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="flex flex-col gap-2 text-xs text-amber-200/80 pt-2">
            <div class="flex justify-between">
              <span>សរុបរង:</span>
              <span>${{ money(subtotalOf(selectedOrder)) }}</span>
            </div>
            <div class="flex justify-between">
              <span>ថ្លៃដឹកជញ្ជូន:</span>
              <span class="text-amber-400 font-bold">${{ money(shippingOf(selectedOrder)) }}</span>
            </div>
            <div class="flex justify-between text-sm font-black text-amber-400 pt-2 border-t">
              <span>តម្លៃសរុបចុងក្រោយ:</span>
              <span>${{ money(selectedOrder.total_amount) }}</span>
            </div>
          </div>

          <div class="text-center pt-4 border-t">
            <p class="text-xs text-amber-200/50">សូមអរគុណសម្រាប់ការគាំទ្រផលិតផលសិប្បកម្មខ្មែរ!</p>
          </div>
        </div>

        <!-- Print Button -->
        <button
          @click="printReceipt"
          class="w-full bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold py-3 rounded-xl transition shadow-lg shadow-amber-500/10 text-xs sm:text-sm"
        >
          🖨️ បោះពុម្ពវិក្កយបត្រ (Print)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedOrder = ref(null)
const orders = ref([])

// Load real orders from localStorage
onMounted(() => {
  let saved = null
  try {
    saved = JSON.parse(localStorage.getItem('user_orders'))
  } catch (e) {
    saved = null
  }

  if (Array.isArray(saved) && saved.length) {
    orders.value = saved
  } else {
    // Demo order for testing when nothing is saved yet
    orders.value = [
      {
        id: 1,
        order_number: 'KH-88291',
        date: '2026-09-24',
        status: 'Delivered',
        payment_method: 'KHQR Payment',
        shipping_cost: 0,
        subtotal: 38,
        total_amount: 38,
        items: [
          { id: 1, name: 'ប្រេងចម្រាញ់ក្រហម (100g)', price: 8, qty: 1, image: '' }
        ]
      }
    ]
  }
})

const money = (v) => Number(v || 0).toFixed(2)

const shippingOf = (o) => (o.shipping_cost !== undefined && o.shipping_cost !== null ? Number(o.shipping_cost) : 2)
const subtotalOf = (o) => (o.subtotal !== undefined && o.subtotal !== null
  ? Number(o.subtotal)
  : Number(o.total_amount || 0) - shippingOf(o))

const hideImage = (e) => { e.target.style.display = 'none' }

const statusClass = (status) => {
  switch (status) {
    case 'Delivered': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    case 'Processing': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
    default: return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
  }
}

const translateStatus = (status) => {
  switch (status) {
    case 'Delivered': return 'ដឹកជញ្ជូនរួចរាល់'
    case 'Processing': return 'កំពុងរៀបចំ'
    default: return 'រង់ចាំពិនិត្យ'
  }
}

const openReceipt = (order) => {
  selectedOrder.value = order
}

const printReceipt = () => {
  const receiptEl = document.getElementById('receipt-content')
  if (!receiptEl || !selectedOrder.value) return

  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'

  document.body.appendChild(iframe)

  const doc = iframe.contentWindow.document
  doc.open()
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Receipt - #${selectedOrder.value.order_number}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700&display=swap">
        <style>
          body { font-family: 'Kantumruy Pro', sans-serif; margin: 0; padding: 20px; background: #fff; color: #000; }
          .receipt-box { max-width: 380px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px; }
          .text-center { text-align: center; }
          .font-bold, .font-black { font-weight: 700; }
          .text-xl { font-size: 20px; }
          .text-sm { font-size: 14px; }
          .text-xs { font-size: 12px; }
          .border-b { border-bottom: 1px solid #eee; }
          .border-t { border-top: 1px solid #eee; }
          .pb-3 { padding-bottom: 12px; }
          .pb-4 { padding-bottom: 16px; }
          .pt-2 { padding-top: 8px; }
          .pt-4 { padding-top: 16px; }
          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .items-center { align-items: center; }
          .justify-between { justify-content: space-between; }
          .gap-1 { gap: 4px; }
          .gap-2 { gap: 8px; }
          .gap-4 { gap: 16px; }
          p, h2 { margin: 0; }
          .w-12 { display: none; } /* hide the flag badge in print */
        </style>
      </head>
      <body>
        <div class="receipt-box">${receiptEl.innerHTML}</div>
      </body>
    </html>
  `)
  doc.close()

  setTimeout(() => {
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
    setTimeout(() => document.body.removeChild(iframe), 1000)
  }, 250)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}

/* Center the page. Plain scoped CSS so a global "margin: 0" reset can't cancel it. */
.page-container {
  margin-left: auto;
  margin-right: auto;
}
</style>