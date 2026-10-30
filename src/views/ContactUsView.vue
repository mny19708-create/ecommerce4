<template>
  <div class="contact-page w-full min-h-screen font-khmer bg-[#0b0f17] text-slate-100 selection:bg-amber-500 selection:text-black overflow-x-hidden flex flex-col items-center">

    <!-- Hero Banner -->
    <section class="hero-pattern relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 flex justify-center overflow-hidden border-b border-slate-800">

      <!-- Glowing Spheres -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div class="absolute top-10 left-10 w-64 h-64 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-4xl w-full text-center relative z-10 flex flex-col items-center justify-center">
        <span class="reveal reveal-down inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-glow-text" style="--delay:0ms">
          <svg class="w-4 h-4 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C58 25 75 42 100 50 C75 58 58 75 50 100 C42 75 25 58 0 50 C25 42 42 25 50 0 Z" />
          </svg>
          ទំនាក់ទំនងមកយើងខ្ញុំ
        </span>

        <h1 class="reveal font-moul text-2xl sm:text-4xl lg:text-5xl text-white leading-relaxed tracking-wide mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]" style="--delay:150ms">
          រីករាយក្នុងការ <br class="hidden sm:inline" />
          <span class="shimmer-text text-transparent bg-clip-text">ទទួលបានដំណឹងពីលោកអ្នក</span>
        </h1>

        <p class="reveal text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style="--delay:300ms">
          ប្រសិនបើលោកអ្នកមានសំណួរ មតិយោបល់ ឬចង់សហការជាមួយបណ្តាញសិប្បករសហគមន៍ សូមផ្ញើសារមកកាន់ពួកយើងខ្ញុំឥឡូវនេះ។
        </p>

        <!-- Divider -->
        <div class="khmer-divider mt-10 flex items-center justify-center gap-4 w-full max-w-md mx-auto">
          <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent flex-1"></div>
          <div class="text-amber-400 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] animate-float">
            <svg class="w-7 h-7" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C60 30 70 40 100 50 C70 60 60 70 50 100 C40 70 30 60 0 50 C30 40 40 30 50 0 Z" />
            </svg>
          </div>
          <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent flex-1"></div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

      <!-- Left: Contact Info -->
      <div class="reveal reveal-scale relative bg-slate-900/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-800 hover:border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.08)] transition-colors duration-500 space-y-8" style="--delay:0ms">
        <div class="top-4 left-4 border-t-2 border-l-2 border-amber-500/60 w-5 h-5 absolute"></div>
        <div class="top-4 right-4 border-t-2 border-r-2 border-amber-500/60 w-5 h-5 absolute"></div>

        <div>
          <h2 class="font-moul text-xl text-white mb-3">ព័ត៌មានទំនាក់ទំនង</h2>
          <p class="text-slate-400 text-sm leading-relaxed">លោកអ្នកក៏អាចទាក់ទងមកកាន់ពួកយើងតាមរយៈចំណុចខាងក្រោមនេះផងដែរ៖</p>
        </div>

        <div class="space-y-6">
          <div v-for="info in infos" :key="info.title" class="group flex items-start gap-4">
            <div class="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-black group-hover:rotate-6 group-hover:scale-110 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-for="(d, k) in info.paths" :key="k" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="d" />
              </svg>
            </div>
            <div class="text-left">
              <h3 class="text-white font-bold text-base group-hover:text-amber-400 transition-colors duration-300">{{ info.title }}</h3>
              <p class="text-slate-400 text-sm mt-1 leading-relaxed">{{ info.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Contact Form -->
      <div class="reveal reveal-scale relative bg-slate-900/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-800 hover:border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.08)] transition-colors duration-500" style="--delay:150ms">
        <div class="top-4 left-4 border-t-2 border-l-2 border-amber-500/60 w-5 h-5 absolute"></div>
        <div class="top-4 right-4 border-t-2 border-r-2 border-amber-500/60 w-5 h-5 absolute"></div>

        <h2 class="font-moul text-xl text-white mb-8">ផ្ញើសារមកកាន់ពួកយើង</h2>

        <form @submit.prevent="handleSubmit" class="space-y-5 text-left">
          <div>
            <label class="block text-sm font-semibold text-slate-300 mb-2">ឈ្មោះរបស់អ្នក</label>
            <input
              type="text"
              v-model="form.name"
              required
              placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក"
              class="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-300 mb-2">អ៊ីមែលរបស់អ្នក</label>
            <input
              type="email"
              v-model="form.email"
              required
              placeholder="example@gmail.com"
              class="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-300 mb-2">សាររបស់អ្នក</label>
            <textarea
              v-model="form.message"
              rows="4"
              required
              placeholder="តើអ្នកចង់ឱ្យពួកយើងជួយអ្វីខ្លះ?"
              class="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-shine w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] hover:-translate-y-1 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
              <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
            </svg>
            {{ loading ? 'កំពុងផ្ញើ...' : 'ផ្ញើសារឥឡូវនេះ' }}
          </button>
        </form>

        <!-- Error Message -->
        <transition name="fade-up">
          <div v-if="errorMsg" class="mt-5 p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl text-center font-medium shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            {{ errorMsg }}
          </div>
        </transition>

        <!-- Success Message -->
        <transition name="fade-up">
          <div v-if="submitted" class="mt-5 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm rounded-xl text-center font-medium shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            អរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។ ពួកយើងនឹងតបស្នងវិញឆាប់ៗនេះ។
          </div>
        </transition>
      </div>

    </div>

    <!-- Location: Shop Photo + Map -->
    <section class="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="reveal text-center mb-10" style="--delay:0ms">
        <h2 class="font-moul text-xl sm:text-2xl text-white mb-3">ទីតាំងហាងរបស់យើង</h2>
        <p class="text-slate-400 text-sm">សូមអញ្ជើញមកទស្សនាហាង និងជ្រើសរើសសិប្បកម្មខ្មែរដោយផ្ទាល់</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Shop Photo -->
        <div class="reveal reveal-scale group relative rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-colors duration-500 min-h-[300px] lg:min-h-[420px] bg-slate-900" style="--delay:0ms">
          <img
            v-if="!imgError"
            :src="shopImage"
            alt="រូបហាង"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            @error="imgError = true"
          />
          <!-- Fallback ពេលមិនទាន់មានរូប -->
          <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-amber-400/70 gap-3">
            <svg class="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9l1-5h16l1 5M3 9v11h18V9M3 9h18M9 20v-6h6v6" />
            </svg>
            <span class="text-xs text-slate-500">ដាក់រូបហាងនៅ public/shop.jpg</span>
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div class="top-4 left-4 border-t-2 border-l-2 border-amber-500/70 w-6 h-6 absolute z-10"></div>
          <div class="top-4 right-4 border-t-2 border-r-2 border-amber-500/70 w-6 h-6 absolute z-10"></div>

          <div class="absolute bottom-0 left-0 right-0 p-6 text-left z-10">
            <span class="text-[10px] text-amber-400 font-semibold tracking-wider uppercase bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">ហាងសិប្បកម្មខ្មែរ</span>
            <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 mb-1 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Khmer <span class="text-amber-400 font-semibold">Handmade</span>
            </h3>
            <p class="text-slate-300 text-xs leading-relaxed">ផ្ទះលេខ ១២៣, ផ្លូវព្រះមុនីវង្ស, រាជធានីភ្នំពេញ</p>
          </div>
        </div>

        <!-- Map -->
        <div class="reveal reveal-scale relative rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-colors duration-500 bg-slate-900 flex flex-col" style="--delay:150ms">
          <div class="map-frame relative flex-1 min-h-[300px] lg:min-h-[340px]">
            <div class="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-amber-500/40 rounded-full pl-2.5 pr-4 py-1.5 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9a2.5 2.5 0 012.5 2.5z" />
              </svg>
              <span class="text-sm font-bold text-white">Khmer <span class="text-amber-400 font-semibold">Handmade</span></span>
            </div>
            <iframe
              :src="mapEmbed"
              class="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              title="ទីតាំងហាងលើផែនទី"
            ></iframe>
          </div>

          <div class="p-4 flex flex-col sm:flex-row gap-3 bg-slate-900/90 border-t border-slate-800">
            <a :href="mapLink" target="_blank" rel="noopener" class="btn-shine flex-1 text-center px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:-translate-y-1">
              បើកក្នុង Google Maps
            </a>
            <a :href="directions" target="_blank" rel="noopener" class="btn-shine flex-1 text-center px-5 py-3 border border-amber-500/40 hover:border-amber-400 text-slate-200 hover:text-amber-300 font-semibold text-sm rounded-xl transition-all duration-300 bg-slate-900/40 hover:bg-amber-500/10 hover:-translate-y-1">
              ណែនាំផ្លូវមកហាង
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const infos = [
  {
    title: 'អាសយដ្ឋាន',
    value: 'ផ្ទះលេខ ១២៣, ផ្លូវព្រះមុនីវង្ស, រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា',
    paths: [
      'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      'M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    ]
  },
  {
    title: 'លេខទូរសព្ទ',
    value: '+855 12 345 678 / +855 10 987 654',
    paths: [
      'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    ]
  },
  {
    title: 'អ៊ីមែល',
    value: 'info@khmerhandmade.com',
    paths: [
      'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    ]
  }
]

const form = ref({ name: '', email: '', message: '' })
const submitted = ref(false)
const loading = ref(false)
const errorMsg = ref('')

// ===== Telegram config (.env) =====
const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID
const API_URL = import.meta.env.VITE_CONTACT_API_URL || 'http://localhost:3000/api/contact'

// ===== Map & Shop =====
const MAP_LAT = 10.836056
const MAP_LNG = 104.456708
const mapEmbed = `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`
const mapLink = 'https://maps.app.goo.gl/k5Z2pT5wc6Qz5JJv9'
const directions = `https://www.google.com/maps/dir/?api=1&destination=${MAP_LAT},${MAP_LNG}`
const shopImage = '/shop.jpg' // ដាក់រូបហាងក្នុង folder public/
const imgError = ref(false)

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const sendToTelegram = async ({ name, email, message }) => {
  // ជម្រើស A: ហៅ backend proxy (សុវត្ថិភាព — token មិនលេចចេញ)
  if (API_URL) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
    if (!res.ok) throw new Error('Proxy error')
    return
  }

  // ជម្រើស B: ហៅ Telegram ផ្ទាល់ (token នៅក្នុង frontend)
  if (!BOT_TOKEN || !CHAT_ID) throw new Error('Missing Telegram config')

  const text =
    `📩 <b>សារថ្មីពីគេហទំព័រ</b>\n\n` +
    `👤 <b>ឈ្មោះ៖</b> ${escapeHtml(name)}\n` +
    `📧 <b>អ៊ីមែល៖</b> ${escapeHtml(email)}\n` +
    `💬 <b>សារ៖</b>\n${escapeHtml(message)}`

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' })
  })
  const data = await res.json()
  if (!data.ok) throw new Error(data.description || 'Telegram error')
}

const handleSubmit = async () => {
  if (loading.value) return
  if (!(form.value.name && form.value.email && form.value.message)) return

  loading.value = true
  errorMsg.value = ''
  submitted.value = false

  try {
    await sendToTelegram(form.value)
    submitted.value = true
    form.value = { name: '', email: '', message: '' }
    setTimeout(() => { submitted.value = false }, 5000)
  } catch (err) {
    console.error(err)
    errorMsg.value = 'សូមអភ័យទោស! មិនអាចផ្ញើសារបានទេ សូមព្យាយាមម្តងទៀត។'
    setTimeout(() => { errorMsg.value = '' }, 5000)
  } finally {
    loading.value = false
  }
}

// ===== Scroll reveal =====
let observer = null

const cleanup = (el) => {
  const onEnd = (e) => {
    if (e.target !== el || e.propertyName !== 'opacity') return
    el.classList.remove('reveal', 'reveal-down', 'reveal-scale', 'is-visible')
    el.style.removeProperty('--delay')
    el.removeEventListener('transitionend', onEnd)
  }
  el.addEventListener('transitionend', onEnd)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          cleanup(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.contact-page .reveal').forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => observer && observer.disconnect())
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');

.font-moul { font-family: 'Moul', cursive, serif; }
.font-khmer { font-family: 'Siemreap', sans-serif; }

:global(html) { scroll-behavior: smooth; }

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

/* ===== Scroll Reveal ===== */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  filter: blur(6px);
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms),
    filter 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);
  will-change: opacity, transform;
}
.reveal-down  { transform: translateY(-30px); }
.reveal-scale { transform: translateY(40px) scale(0.92); }
.reveal.is-visible {
  opacity: 1;
  transform: none;
  filter: blur(0);
}

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
  animation: growLine 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
}
@keyframes growLine {
  from { transform: scaleX(0); opacity: 0; }
  to   { transform: scaleX(1); opacity: 1; }
}

/* ===== Success message transition ===== */
.fade-up-enter-active, .fade-up-leave-active { transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.fade-up-enter-from, .fade-up-leave-to { opacity: 0; transform: translateY(12px); }

/* ===== Map ឲ្យចូលនឹង dark theme (ដាក់ពណ៌ធម្មតាវិញពេល hover) ===== */
.map-frame iframe {
  filter: invert(92%) hue-rotate(180deg) brightness(0.95) contrast(0.9) saturate(0.8);
  transition: filter 0.6s ease;
}
.map-frame:hover iframe {
  filter: none;
}

/* ===== Autofill ឲ្យនៅងងឹត ===== */
input:-webkit-autofill {
  -webkit-text-fill-color: #f1f5f9;
  box-shadow: 0 0 0 1000px #020617 inset;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal { opacity: 1; transform: none; filter: none; }
}
</style>