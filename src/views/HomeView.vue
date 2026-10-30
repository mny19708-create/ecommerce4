<template>
  <div class="home-page min-h-screen bg-[#0b0f17] text-slate-100 font-khmer selection:bg-amber-500 selection:text-black overflow-x-hidden text-center flex flex-col items-center justify-center">

    <!-- Hero Section -->
    <section id="home" class="hero-pattern relative w-full py-28 lg:py-36 px-4 overflow-hidden border-b border-slate-800 flex flex-col items-center justify-center text-center">

      <!-- Glowing Ambient Spheres -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div class="absolute top-10 left-10 w-72 h-72 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center text-center">

        <!-- Top Motif -->
        <div class="reveal reveal-down flex items-center justify-center gap-3 mb-6" style="--delay:0ms">
          <svg class="w-7 h-7 text-amber-500 animate-spin-slow filter drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C58 25 75 42 100 50 C75 58 58 75 50 100 C42 75 25 58 0 50 C25 42 42 25 50 0 Z" />
          </svg>
          <span class="text-xs sm:text-sm tracking-[0.25em] text-amber-400 font-semibold uppercase animate-glow-text">
            រចនាបថ & សិល្បៈវប្បធម៌ខ្មែរ
          </span>
          <svg class="w-7 h-7 text-amber-500 animate-spin-slow filter drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C58 25 75 42 100 50 C75 58 58 75 50 100 C42 75 25 58 0 50 C25 42 42 25 50 0 Z" />
          </svg>
        </div>

        <!-- Main Title -->
        <h1 class="reveal font-moul text-2xl sm:text-4xl lg:text-5xl mb-6 leading-relaxed tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] text-center" style="--delay:150ms">
          ថែរក្សាអត្តសញ្ញាណជាតិ <br class="hidden sm:inline" />
          <span class="shimmer-text text-transparent bg-clip-text">
            តាមរយៈស្នាដៃសិប្បកម្ម
          </span>
        </h1>

        <p class="reveal text-slate-300 max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed text-center" style="--delay:300ms">
          ការរួមបញ្ចូលគ្នារវាងក្បាច់ក្បូរប្រពៃណីបុរាណ និងការរចនាបែបទំនើប ផលិតឡើងយ៉ាងសម្រិតសម្រាំងដោយដៃផ្ទាល់ពីស្ថាបត្យករ និងសិប្បករជំនាញខ្មែរ។
        </p>

        <!-- CTA Buttons -->
        <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto" style="--delay:450ms">
          <a href="#products" class="btn-shine w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1.5 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.8)] text-center">
            ទស្សនាផលិតផល
          </a>
          <a href="#heritage" class="btn-shine w-full sm:w-auto px-8 py-3.5 border border-amber-500/40 hover:border-amber-400 text-slate-200 hover:text-amber-300 font-semibold rounded-lg transition-all duration-300 backdrop-blur-md bg-slate-900/40 hover:bg-amber-500/10 transform hover:-translate-y-1 text-center shadow-lg">
            ស្វែងយល់បន្ថែម
          </a>
        </div>

        <!-- Kbach Khmer Divider -->
        <div class="khmer-divider my-6 flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
          <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent flex-1"></div>
          <div class="text-amber-400 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] animate-float">
            <svg class="w-8 h-8" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C60 30 70 40 100 50 C70 60 60 70 50 100 C40 70 30 60 0 50 C30 40 40 30 50 0 Z"/>
              <circle cx="50" cy="50" r="12" class="fill-amber-300 animate-ping opacity-75" />
            </svg>
          </div>
          <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent flex-1"></div>
        </div>

      </div>
    </section>

    <!-- Categories Section -->
    <section id="categories" class="py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
      <div class="reveal mb-14 text-center max-w-2xl mx-auto">
        <h2 class="font-moul text-xl sm:text-2xl text-white mb-3">ប្រភេទសិប្បកម្មចម្បង</h2>
        <p class="text-slate-400 text-sm">រៀបចំឡើងតាមផ្នែកនីមួយៗនៃសិល្បៈប្រពៃណីខ្មែរ</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center w-full max-w-6xl mx-auto">
        <div
          v-for="(cat, i) in categories"
          :key="cat.id"
          class="reveal reveal-scale p-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl hover:border-amber-500/60 transition-all duration-500 text-center relative group hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(245,158,11,0.2)] backdrop-blur-md w-full flex flex-col items-center justify-center mx-auto"
          :style="{ '--delay': i * 120 + 'ms' }"
        >
          <div class="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-inner group-hover:rotate-6 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div class="flex flex-col items-center text-center">
            <h3 class="font-moul text-base text-white mb-3 group-hover:text-amber-400 transition-colors duration-300 text-center">{{ cat.title }}</h3>
            <p class="text-slate-400 text-xs leading-relaxed text-center">{{ cat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section id="products" class="py-20 w-full bg-slate-950/60 border-t border-slate-800/80 relative text-center flex flex-col items-center justify-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">

        <div class="reveal flex flex-col items-center justify-center mb-14 text-center max-w-2xl mx-auto">
          <h2 class="font-moul text-xl sm:text-2xl text-white mb-2">ផលិតផលឆ្នើមៗ</h2>
          <p class="text-slate-400 text-sm mb-4">ស្នាដៃចម្លាក់ ត្បាញដៃ និងគ្រឿងប្រាក់ដែលទទួលបានការពេញនិយមខ្លាំង</p>
          <a href="#" class="text-amber-400 hover:text-amber-300 text-sm font-semibold inline-flex items-center justify-center gap-1 group transition-all">
            មើលផលិតផលទាំងអស់
            <span class="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center w-full max-w-6xl mx-auto">
          <div
            v-for="(item, i) in products"
            :key="item.id"
            class="reveal reveal-scale bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden relative group hover:border-amber-500/60 transition-all duration-500 shadow-xl flex flex-col items-center text-center w-full hover:-translate-y-3 hover:shadow-[0_15px_30px_rgba(245,158,11,0.25)] mx-auto backdrop-blur-md"
            :style="{ '--delay': i * 120 + 'ms' }"
          >
            <!-- Card Corner Accents -->
            <div class="top-3 left-3 border-t-2 border-l-2 border-amber-500/60 w-3.5 h-3.5 absolute z-10 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-amber-400"></div>
            <div class="top-3 right-3 border-t-2 border-r-2 border-amber-500/60 w-3.5 h-3.5 absolute z-10 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-amber-400"></div>

            <!-- Product Image -->
            <div class="h-52 w-full bg-slate-800 relative overflow-hidden">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-70"></div>
            </div>

            <!-- Card Content -->
            <div class="p-5 w-full flex-1 flex flex-col justify-between items-center text-center relative z-20">
              <div class="flex flex-col items-center justify-center text-center">
                <span class="text-[10px] text-amber-400 font-semibold tracking-wider uppercase bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 mb-2 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">{{ item.category }}</span>
                <h3 class="font-moul text-sm text-white my-2 group-hover:text-amber-400 transition-colors leading-relaxed text-center">{{ item.title }}</h3>
                <p class="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2 text-center">{{ item.description }}</p>
              </div>

              <div class="flex flex-col items-center justify-center gap-3 w-full pt-3 border-t border-slate-800/80">
                <div class="text-center">
                  <span class="text-[10px] text-slate-500 block uppercase tracking-wider">តម្លៃ</span>
                  <span class="text-lg font-extrabold text-amber-400">${{ item.price }}</span>
                </div>
                <button class="btn-shine w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] transform active:scale-95 text-center">
                  ជាវឥឡូវនេះ
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Cultural Heritage Highlight -->
    <section id="heritage" class="py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
      <div class="reveal reveal-scale bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl p-8 lg:p-14 flex flex-col items-center justify-center text-center gap-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden group hover:border-amber-500/70 transition-all duration-500 w-full max-w-4xl mx-auto backdrop-blur-md">

        <div class="max-w-2xl relative z-10 flex flex-col items-center justify-center text-center">
          <span class="text-xs text-amber-400 font-semibold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-3 inline-block">អំពីបេសកកម្ម</span>
          <h2 class="font-moul text-xl sm:text-3xl text-white my-3 leading-relaxed text-center">លើកស្ទួយជីវភាពសិប្បករ និងរក្សាមរតកខ្មែរ</h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed text-center max-w-xl mx-auto">
            រាល់ការគាំទ្រផលិតផលពីសិប្បកម្មខ្មែរ គឺជាផ្នែកមួយយ៉ាងសំខាន់ក្នុងការបង្កើតការងារ គាំទ្រសហគមន៍សិប្បករក្នុងស្រុក និងការផ្ទេរចំណេះដឹងពីជំនាន់មួយទៅជំនាន់មួយទៀត។
          </p>
        </div>

        <div class="shrink-0 text-center relative z-10 flex flex-col items-center justify-center mx-auto">
          <svg class="w-24 h-24 text-amber-400 mx-auto mb-6 filter drop-shadow-[0_0_20px_rgba(245,158,11,0.7)] animate-float group-hover:scale-110 transition-transform duration-500" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C60 30 70 40 100 50 C70 60 60 70 50 100 C40 70 30 60 0 50 C30 40 40 30 50 0 Z" />
          </svg>
          <a href="#" class="btn-shine inline-block px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/50 hover:border-amber-400 rounded-xl text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transform hover:-translate-y-1 text-center">
            ចូលរួមគាំទ្រជាមួយយើង
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const categories = ref([
  {
    id: 1,
    title: 'ចម្លាក់ឈើ & ថ្ម',
    desc: 'ចម្លាក់ក្បាច់ភ្ញីទេស និងរូបបដិមាខ្មែរបុរាណ ឆ្លាក់ដោយដៃអំពីឈើប្រណីត និងថ្មភក់។'
  },
  {
    id: 2,
    title: 'សូត្រ & ហូលផាមួង',
    desc: 'សូត្រខ្មែរត្បាញដៃពិតៗ មានក្រមាសូត្រ និងហូលផាមួងដែលមានក្បាច់រចនាល្អិតល្អន់។'
  },
  {
    id: 3,
    title: 'គ្រឿងប្រាក់ & ស្ពាន់',
    desc: 'ផលិតផលស្វ័យសិប្បកម្មស្ទាត់ជំនាញ ធ្វើអំពីប្រាក់ និងស្ពាន់បុរាណប្រកបដោយរចនាបថ។'
  },
  {
    id: 4,
    title: 'ស្បែក & ស្មាច់បុរាណ',
    desc: 'ចម្លាក់ស្បែកតូច-ធំសម្រាប់ល្ខោនស្បែក និងសិល្បៈស្មាច់ក្បាច់ខ្មែរប្រពៃណី។'
  }
])

const products = ref([
  {
    id: 1,
    title: 'ចម្លាក់ឈើក្បាច់ភ្ញីទេស',
    category: 'ចម្លាក់ប្រពៃណី',
    description: 'ចម្លាក់ឈើប្រណីតឆ្លាក់ដោយដៃយ៉ាងល្អិតល្អន់តាមរចនាបថខ្មែរបុរាណ។',
    price: '120.00',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'រូបចម្លាក់ហនុមានប្រាក់',
    category: 'គ្រឿងប្រាក់',
    description: 'ផលិតផលស្វ័យសិប្បកម្មស្ទាត់ជំនាញធ្វើអំពីប្រាក់សុទ្ធស្អាតឥតខ្ចោះ។',
    price: '250.00',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'ក្រមាសូត្រខ្មែរត្បាញដៃ',
    category: 'សូត្រប្រពៃណី',
    description: 'ក្រមាសូត្រ និងហូលផាមួងត្បាញដោយដៃតាមវិធីបុរាណពិតៗ។',
    price: '85.00',
    image: 'https://images.unsplash.com/photo-1606744888344-49423b7413f2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'ចម្លាក់ស្បែកល្ខោនស្បែកធំ',
    category: 'សិល្បៈស្បែក',
    description: 'សិល្បៈចម្លាក់ស្បែកឆ្លាក់ជារូបតួអង្គរាមកេរ្តិ៍ សម្រាប់តាំងលម្អ ឬសម្តែង។',
    price: '160.00',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop'
  }
])

// ===== Scroll reveal =====
let observer = null

// ពេល reveal ចប់ ដកថ្នាក់ reveal ចេញ ដើម្បីឲ្យ hover របស់ Tailwind ដំណើរការធម្មតា
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

  document.querySelectorAll('.home-page .reveal').forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => observer && observer.disconnect())
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');

.font-moul {
  font-family: 'Moul', cursive, serif;
}

.font-khmer {
  font-family: 'Siemreap', sans-serif;
}

/* ===== Smooth scroll ===== */
:global(html) {
  scroll-behavior: smooth;
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
  0%, 100% { transform: translateY(0px); }
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

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spinSlow 20s linear infinite;
}

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

/* ===== Shimmer ចំណងជើង ===== */
.shimmer-text {
  background-image: linear-gradient(90deg, #fde68a, #fbbf24, #f59e0b, #fbbf24, #fde68a);
  background-size: 200% auto;
  animation: shimmer 4s linear infinite;
  filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.5));
}
@keyframes shimmer {
  to { background-position: 200% center; }
}

/* ===== Glow text ===== */
.animate-glow-text {
  animation: glowText 3s ease-in-out infinite;
}
@keyframes glowText {
  0%, 100% { text-shadow: 0 0 6px rgba(245, 158, 11, 0.3); }
  50%      { text-shadow: 0 0 18px rgba(245, 158, 11, 0.9); }
}

/* ===== Ambient spheres រសាត់ថ្មមៗ ===== */
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

/* ===== ប៊ូតុង shine ===== */
.btn-shine {
  position: relative;
  overflow: hidden;
}
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
.btn-shine:hover::after {
  animation: shine 0.9s ease;
}
@keyframes shine {
  to { left: 130%; }
}

/* ===== Divider លាតចេញពីកណ្តាល ===== */
.khmer-divider > div:first-child,
.khmer-divider > div:last-child {
  transform-origin: center;
  animation: growLine 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
}
@keyframes growLine {
  from { transform: scaleX(0); opacity: 0; }
  to   { transform: scaleX(1); opacity: 1; }
}

/* ===== គោរព user ដែលបិទ animation ===== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal { opacity: 1; transform: none; filter: none; }
}
</style>