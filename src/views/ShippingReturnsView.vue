<template>
  <div class="w-full min-h-screen font-khmer bg-[#0D0B08] text-amber-50 overflow-x-hidden flex flex-col items-center relative selection:bg-amber-400 selection:text-black">
    
    <!-- Background Atmospheric Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/30 via-yellow-900/10 to-transparent blur-3xl pointer-events-none -z-0 animate-pulse-slow"></div>
    <div class="absolute top-1/3 -left-48 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none -z-0 animate-float-slow"></div>
    <div class="absolute bottom-1/3 -right-48 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none -z-0 animate-float-delayed"></div>

    <!-- Hero Banner with Khmer Kbach Framing -->
    <section class="relative w-full pt-20 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 flex justify-center z-10 border-b border-amber-600/30">
      
      <!-- Top Corner Animated Kbach Motifs -->
      <div class="absolute top-5 left-8 text-amber-400/60 font-serif text-2xl select-none hidden sm:block animate-spin-slow">꧁ ✤ ꧂</div>
      <div class="absolute top-5 right-8 text-amber-400/60 font-serif text-2xl select-none hidden sm:block animate-spin-slow">꧁ ✤ ꧂</div>

      <div class="max-w-4xl w-full text-center relative flex flex-col items-center justify-center animate-khmer-hero">
        
        <!-- Royal Crest Ornament Header -->
        <div class="flex items-center gap-3 mb-4 text-amber-400">
          <span class="text-xl animate-bounce-gentle">༺</span>
          <span class="text-2xl font-bold animate-glow-pulse">❖</span>
          <span class="text-xl animate-bounce-gentle">༻</span>
        </div>

        <span class="inline-flex items-center gap-2 bg-gradient-to-r from-amber-950/90 via-amber-900/50 to-amber-950/90 border border-amber-500/60 text-amber-300 text-xs sm:text-sm font-semibold px-6 py-2 rounded-full mb-6 shadow-[0_0_25px_rgba(217,119,6,0.3)] backdrop-blur-md">
          <span class="text-amber-400 animate-spin-slow">✤</span>
          គោលការណ៍ដឹកជញ្ជូន និងប្តូរប្រាក់វិញ
          <span class="text-amber-400 animate-spin-slow">✤</span>
        </span>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          ព័ត៌មានស្តីពី <span class="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent block sm:inline filter drop-shadow-[0_2px_12px_rgba(217,119,6,0.5)] animate-shimmer">ការដឹកជញ្ជូន និងការប្តូរផលិតផល</span>
        </h1>

        <p class="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-center font-light">
          ស្វែងយល់ពីលក្ខខណ្ឌ និងពេលវេលានៃការបញ្ជូនទំនិញដល់ដៃលោកអ្នក ក៏ដូចជាគោលការណ៍ក្នុងការប្តូរប្រាក់ ឬប្តូរទំនិញវិញដោយទំនុកចិត្ត។
        </p>

        <!-- Angkor Animated Kbach Divider -->
        <div class="flex items-center justify-center gap-3 mt-8 w-full max-w-md">
          <span class="text-amber-500/60 text-xs">꧁</span>
          <div class="h-[1.5px] bg-gradient-to-r from-transparent via-amber-500 to-amber-400 flex-grow"></div>
          <span class="text-amber-400 text-xl animate-pulse">❖</span>
          <div class="h-[1.5px] bg-gradient-to-l from-transparent via-amber-500 to-amber-400 flex-grow"></div>
          <span class="text-amber-500/60 text-xs">꧂</span>
        </div>

      </div>
    </section>

    <!-- Main Content Body -->
    <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12 flex flex-col items-center z-10">
      
      <!-- Section 1: Shipping Policy -->
      <div class="w-full bg-[#15120D] rounded-2xl p-6 sm:p-10 border border-amber-600/30 hover:border-amber-400/80 shadow-2xl space-y-6 relative transition-all duration-500 group khmer-card khmer-reveal hover:-translate-y-1">
        
        <!-- Corner Kbach Motifs -->
        <div class="absolute top-2 left-2 text-amber-500/40 group-hover:text-amber-400 transition-colors text-xs select-none">꧁ ✤</div>
        <div class="absolute top-2 right-2 text-amber-500/40 group-hover:text-amber-400 transition-colors text-xs select-none">✤ ꧂</div>
        <div class="absolute bottom-2 left-2 text-amber-500/30 text-xs select-none">꧁ ✤</div>
        <div class="absolute bottom-2 right-2 text-amber-500/30 text-xs select-none">✤ ꧂</div>

        <div class="flex items-center space-x-4 border-b border-amber-600/30 pb-5">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-900 to-amber-950 border border-amber-500/60 text-amber-300 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(217,119,6,0.3)]">
            <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-amber-100 flex items-center gap-2">
              <span class="text-amber-400 text-sm">❖</span>
              គោលការណ៍ដឹកជញ្ជូន
            </h2>
            <p class="text-amber-200/60 text-sm font-light">ព័ត៌មានលម្អិតអំពីសេវាដឹកជញ្ជូនទំនិញដល់ទីកន្លែង</p>
          </div>
        </div>

        <div class="space-y-4 text-amber-100/80 text-sm sm:text-base leading-relaxed font-light">
          <p class="flex items-start gap-2">
            <span class="text-amber-400 font-bold shrink-0 mt-0.5">១.</span>
            <span><strong>រយៈពេលនៃការដឹកជញ្ជូន៖</strong> សម្រាប់ការបញ្ជាទិញក្នុងរាជធានីភ្នំពេញ គឺប្រើប្រាស់ពេលប្រហែល ១ ទៅ ២ថ្ងៃ។ ចំពោះការដឹកជញ្ជូនទៅកាន់ខេត្ត-ក្រុងនានា នឹងត្រូវចំណាយពេលប្រហែល ២ ទៅ ៤ថ្ងៃ អាស្រ័យលើទីតាំងជាក់ស្តែង។</span>
          </p>
          <p class="flex items-start gap-2">
            <span class="text-amber-400 font-bold shrink-0 mt-0.5">២.</span>
            <span><strong>តម្លៃសេវាដឹកជញ្ជូន៖</strong> តម្លៃសេវាដឹកជញ្ជូនត្រូវបានគិតគូរដោយផ្អែកលើទម្ងន់ទំនិញ និងចម្ងាយផ្លូវរបស់ក្រុមហ៊ុនដឹកជញ្ជូនដៃគូសហការរបស់យើង។ លោកអ្នកនឹងឃើញតម្លៃសេវាយ៉ាងច្បាស់លាស់មុនពេលបញ្ជាក់ការបញ្ជាទិញ។</span>
          </p>
          <p class="flex items-start gap-2">
            <span class="text-amber-400 font-bold shrink-0 mt-0.5">៣.</span>
            <span><strong>ការតាមដានការបញ្ជាទិញ៖</strong> បន្ទាប់ពីការបញ្ជាទិញត្រូវបានបញ្ជាក់ លោកអ្នកនឹងទទួលបានសារ ឬលេខកូដតាមដានការដឹកជញ្ជូន ដើម្បីអាចពិនិត្យស្ថានភាពទំនិញបានគ្រប់ពេលវេលា។</span>
          </p>
        </div>
      </div>

      <!-- Section 2: Return & Refund Policy -->
      <div class="w-full bg-[#15120D] rounded-2xl p-6 sm:p-10 border border-amber-600/30 hover:border-amber-400/80 shadow-2xl space-y-6 relative transition-all duration-500 group khmer-card khmer-reveal hover:-translate-y-1" data-delay="150">
        
        <!-- Corner Kbach Motifs -->
        <div class="absolute top-2 left-2 text-amber-500/40 group-hover:text-amber-400 transition-colors text-xs select-none">꧁ ✤</div>
        <div class="absolute top-2 right-2 text-amber-500/40 group-hover:text-amber-400 transition-colors text-xs select-none">✤ ꧂</div>
        <div class="absolute bottom-2 left-2 text-amber-500/30 text-xs select-none">꧁ ✤</div>
        <div class="absolute bottom-2 right-2 text-amber-500/30 text-xs select-none">✤ ꧂</div>

        <div class="flex items-center space-x-4 border-b border-amber-600/30 pb-5">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-900 to-amber-950 border border-amber-500/60 text-amber-300 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(217,119,6,0.3)]">
            <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-amber-100 flex items-center gap-2">
              <span class="text-amber-400 text-sm">❖</span>
              គោលការណ៍ប្តូរ និងសងប្រាក់វិញ
            </h2>
            <p class="text-amber-200/60 text-sm font-light">លក្ខខណ្ឌក្នុងការស្នើសុំប្តូរទំនិញ ឬសងប្រាក់វិញ</p>
          </div>
        </div>

        <div class="space-y-4 text-amber-100/80 text-sm sm:text-base leading-relaxed font-light">
          <p class="flex items-start gap-2">
            <span class="text-amber-400 font-bold shrink-0 mt-0.5">១.</span>
            <span><strong>លក្ខខណ្ឌនៃការប្តូរទំនិញ៖</strong> លោកអ្នកអាចស្នើសុំប្តូរទំនិញថ្មីបានក្នុងរយៈពេល ៧ថ្ងៃ បន្ទាប់ពីទទួលបានទំនិញ ប្រសិនបើទំនិញមានការខូចខាតកើតឡើងពីការដឹកជញ្ជូន ឬខុសពីម៉ូដដែលបានកុម្ម៉ង់។</span>
          </p>
          <p class="flex items-start gap-2">
            <span class="text-amber-400 font-bold shrink-0 mt-0.5">២.</span>
            <span><strong>ស្ថានភាពទំនិញ៖</strong> ទំនិញដែលស្នើសុំប្តូរត្រូវតែស្ថិតក្នុងស្ថានភាពដើម មិនទាន់ត្រូវបានប្រើប្រាស់ មានស្លាកសញ្ញា ឬកញ្ចប់វេចខ្ចប់ស្របតាមពេលទទួលបាន។</span>
          </p>
          <p class="flex items-start gap-2">
            <span class="text-amber-400 font-bold shrink-0 mt-0.5">៣.</span>
            <span><strong>គោលការណ៍សងប្រាក់វិញ៖</strong> ក្នុងករណីដែលផលិតផលអស់ស្តុក ហើយមិនអាចរកទំនិញជំនួសបាន ពួកយើងនឹងดำเนินการសងប្រាក់វិញជូនលោកអ្នកពេញលេញតាមរយៈច្រកផ្លូវទូទាត់ដើម។</span>
          </p>
        </div>
      </div>

    </div>

    <!-- Call To Action Section -->
    <section class="w-full mt-12 relative overflow-hidden flex justify-center border-t border-amber-600/40 bg-[#0B0907]">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-800/25 via-transparent to-transparent pointer-events-none animate-pulse-slow"></div>
      
      <div class="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 flex flex-col items-center justify-center space-y-6 khmer-reveal" data-delay="200">
        
        <div class="flex items-center justify-center gap-3 text-amber-400">
          <span class="text-xl animate-bounce-gentle">꧁</span>
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-900 to-amber-950 border border-amber-400/70 flex items-center justify-center text-amber-300 shadow-[0_0_25px_rgba(217,119,6,0.4)] animate-glow-pulse">
            <span class="text-2xl">✤</span>
          </div>
          <span class="text-xl animate-bounce-gentle">꧂</span>
        </div>

        <h2 class="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
          មានសំណួរពាក់ព័ន្ធនឹងការដឹកជញ្ជូនទំនិញមែនទេ?
        </h2>

        <p class="text-amber-200/70 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
          ប្រសិនបើលោកអ្នកមានចម្ងល់បន្ថែម ឬត្រូវការជំនួយបន្ទាន់ សូមទាក់ទងមកកាន់ក្រុមការងាររបស់យើងខ្ញុំផ្ទាល់។
        </p>

        <div class="pt-4">
          <router-link 
            to="/contact" 
            class="relative group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold text-sm px-9 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-600/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 border border-yellow-200/90 overflow-hidden"
          >
            <span class="relative z-10">ទំនាក់ទំនងមកយើងខ្ញុំ</span>
            <span class="text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">➔</span>
            <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          </router-link>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const els = document.querySelectorAll('.khmer-reveal')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = Number(e.target.getAttribute('data-delay') || 0)
          e.target.style.transitionDelay = `${delay}ms`
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  els.forEach((el) => io.observe(el))
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}

/* Scroll Reveal Animations */
.khmer-reveal {
  opacity: 0;
  transform: translateY(28px) scale(0.97);
  transition: opacity 800ms ease, transform 800ms cubic-bezier(.16,1,.3,1);
  will-change: transform, opacity;
}

.khmer-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.animate-khmer-hero {
  animation: khmerHeroFloat 1100ms cubic-bezier(.16,1,.3,1) both;
}

@keyframes khmerHeroFloat {
  0% {
    opacity: 0;
    transform: translateY(25px);
    filter: blur(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}

/* Custom Animations */
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes glowPulse {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.4)); }
  50% { filter: drop-shadow(0 0 18px rgba(245, 158, 11, 0.9)); }
}

@keyframes bounceGentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -20px); }
}

.animate-spin-slow {
  animation: spinSlow 25s linear infinite;
}

.animate-glow-pulse {
  animation: glowPulse 3s ease-in-out infinite;
}

.animate-bounce-gentle {
  animation: bounceGentle 2.5s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: floatSlow 10s ease-in-out infinite 2s;
}

/* Card Golden Border Gradient */
.khmer-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(135deg, rgba(245,158,11,0.6), transparent 45%, rgba(245,158,11,0.25));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.4;
  transition: opacity 300ms ease;
}

.khmer-card:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .khmer-reveal,
  .khmer-card,
  .animate-spin-slow,
  .animate-glow-pulse,
  .animate-bounce-gentle,
  .animate-pulse-slow,
  .animate-float-slow {
    animation: none !important;
    transition: none !important;
  }
}
</style>