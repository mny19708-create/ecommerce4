<template>
  <div class="w-full min-h-screen font-khmer bg-[#0D0B08] text-amber-50 overflow-x-hidden flex flex-col items-center relative selection:bg-amber-400 selection:text-black">
    
    <!-- Animated Atmospheric Light Orbs -->
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
          សំណួរដែលសួរញឹកញាប់
          <span class="text-amber-400 animate-spin-slow">✤</span>
        </span>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          អ្វីដែលលោកអ្នក <span class="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent block sm:inline filter drop-shadow-[0_2px_12px_rgba(217,119,6,0.5)] animate-shimmer">ចង់ដឹងបន្ថែម</span>
        </h1>

        <p class="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-center font-light">
          ស្វែងរកចម្លើយចំពោះសំណួរទាក់ទងនឹងការបញ្ជាទិញ ការដឹកជញ្ជូន គុណភាពផលិតផល និងរបៀបនៃការគាំទ្រសិប្បករខ្មែរយើង។
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

    <!-- Main Content Area -->
    <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-12 flex flex-col items-center z-10">
      
      <!-- Interactive Search Bar -->
      <div class="relative w-full max-w-2xl group khmer-reveal" data-delay="100">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-2xl blur opacity-40 group-hover:opacity-90 transition duration-500"></div>
        <div class="relative flex items-center bg-[#15120D] border border-amber-500/60 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden focus-within:border-amber-400 transition-all duration-300">
          <span class="text-amber-400 pl-4 text-lg select-none">✤</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ស្វែងរកសំណួរដែលអ្នកចង់ដឹង..."
            class="w-full bg-transparent border-none px-4 py-4 text-sm text-amber-50 placeholder-amber-200/40 focus:outline-none focus:ring-0"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''"
            class="mr-4 text-amber-300 hover:text-amber-100 text-xs bg-amber-950/80 border border-amber-700/60 px-3 py-1 rounded-lg transition-all active:scale-95"
          >
            សម្អាត
          </button>
        </div>
      </div>

      <!-- FAQ Accordion List -->
      <div class="w-full space-y-5">
        
        <div 
          v-for="(faq, index) in filteredFaqs" 
          :key="faq.id"
          class="bg-[#15120D] rounded-2xl border border-amber-600/30 hover:border-amber-400/80 shadow-2xl overflow-hidden transition-all duration-500 relative group khmer-card khmer-reveal"
          :class="{
            '-translate-y-1.5 border-amber-400/90 shadow-[0_10px_30px_rgba(217,119,6,0.25)]': activeFaq === faq.id,
            'hover:-translate-y-1': activeFaq !== faq.id
          }"
          :data-delay="(index % 4) * 100"
        >
          <!-- Four Corner Kbach Ornaments with Hover Glow -->
          <div class="absolute top-1.5 left-2 text-amber-500/30 group-hover:text-amber-400 transition-colors duration-300 text-[10px] select-none">❖</div>
          <div class="absolute top-1.5 right-2 text-amber-500/30 group-hover:text-amber-400 transition-colors duration-300 text-[10px] select-none">❖</div>
          <div class="absolute bottom-1.5 left-2 text-amber-500/20 text-[10px] select-none">❖</div>
          <div class="absolute bottom-1.5 right-2 text-amber-500/20 text-[10px] select-none">❖</div>

          <!-- Accordion Trigger Button -->
          <button 
            @click="toggleFaq(faq.id)" 
            class="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none transition-colors duration-300 relative z-10"
            :class="{'bg-gradient-to-r from-amber-950/80 via-amber-900/40 to-transparent': activeFaq === faq.id}"
          >
            <div class="flex items-center gap-4 pr-4">
              <!-- Animated Kbach Number Emblem -->
              <div 
                class="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-900/80 to-amber-950 border border-amber-500/60 flex items-center justify-center shrink-0 shadow-inner transition-all duration-300"
                :class="{'scale-110 border-amber-400 shadow-[0_0_12px_rgba(217,119,6,0.5)]': activeFaq === faq.id}"
              >
                <span class="text-amber-300 text-xs font-bold">✤ {{ faq.num }}</span>
              </div>

              <span class="font-bold text-amber-100 text-base sm:text-lg group-hover:text-amber-300 transition-colors duration-200">
                {{ faq.question }}
              </span>
            </div>
            
            <!-- Expand Arrow with Rotation Animation -->
            <div 
              class="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center shrink-0 ml-2 transition-all duration-500"
              :class="{
                'rotate-180 bg-amber-400 text-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)]': activeFaq === faq.id, 
                'text-amber-400 group-hover:border-amber-500': activeFaq !== faq.id
              }"
            >
              <svg class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <!-- Accordion Answer with Grid Dynamic Height Animation -->
          <div 
            class="grid transition-all duration-500 ease-in-out border-t border-amber-600/0"
            :class="{
              'grid-rows-[1fr] opacity-100 border-amber-600/30 pt-1 pb-6 px-6 bg-amber-950/30': activeFaq === faq.id,
              'grid-rows-[0fr] opacity-0 px-6': activeFaq !== faq.id
            }"
          >
            <div class="overflow-hidden">
              <div class="text-amber-100/80 text-sm sm:text-base leading-relaxed pt-3 font-light relative flex items-start gap-3">
                <span class="text-amber-400 text-xs shrink-0 mt-1 animate-pulse">꧁</span>
                <p class="flex-grow">{{ faq.answer }}</p>
                <span class="text-amber-400 text-xs shrink-0 mt-1 animate-pulse">꧂</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Empty State -->
        <div v-if="filteredFaqs.length === 0" class="text-center py-12 animate-fade-in">
          <p class="text-amber-200/50 text-base">មិនរកឃើញសំណួរដែលអ្នកស្វែងរកឡើយ។</p>
        </div>

      </div>

    </div>

    <!-- Call To Action with Royal Kbach Arch -->
    <section class="w-full mt-12 relative overflow-hidden flex justify-center border-t border-amber-600/40 bg-[#0B0907]">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-800/25 via-transparent to-transparent pointer-events-none animate-pulse-slow"></div>
      
      <div class="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 flex flex-col items-center justify-center space-y-6 khmer-reveal" data-delay="120">
        
        <!-- Center Kbach Crest -->
        <div class="flex items-center justify-center gap-3 text-amber-400">
          <span class="text-xl animate-bounce-gentle">꧁</span>
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-900 to-amber-950 border border-amber-400/70 flex items-center justify-center text-amber-300 shadow-[0_0_25px_rgba(217,119,6,0.4)] animate-glow-pulse">
            <span class="text-2xl">✤</span>
          </div>
          <span class="text-xl animate-bounce-gentle">꧂</span>
        </div>

        <h2 class="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
          តើលោកអ្នកនៅមានសំណួរផ្សេងទៀតដែរឬទេ?
        </h2>

        <p class="text-amber-200/70 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
          ប្រសិនបើលោកអ្នកមានសំណួរផ្សេងទៀតដែលមិនបានរៀបរាប់ខាងលើ សូមទាក់ទងមកកាន់ពួកយើងខ្ញុំផ្ទាល់បានគ្រប់ពេលវេលា។
        </p>

        <div class="pt-4">
          <router-link 
            to="/contact" 
            class="relative group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold text-sm px-9 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-600/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 border border-yellow-200/90 overflow-hidden"
          >
            <span class="relative z-10">ទាក់ទងមកយើងខ្ញុំ</span>
            <span class="text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">➔</span>
            <!-- Button Shimmer Overlay -->
            <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const activeFaq = ref(1)
const searchQuery = ref('')

const faqs = ref([
  {
    id: 1,
    num: '១',
    question: 'តើផលិតផលទាំងអស់នៅលើ Khmer Handmade ជាផលិតផលធ្វើដោយដៃពិតៗដែរឬទេ?',
    answer: 'បាទ/ចាស! ផលិតផលទាំងអស់នៅលើវេទិការបស់យើង គឺត្រូវបានផលិតឡើងដោយផ្ទាល់ពីដៃសិប្បករសហគមន៍មូលដ្ឋាន ដោយមិនមានការប្រើប្រាស់ម៉ាស៊ីនឧស្សាហកម្មទ្រង់ទ្រាយធំឡើយ ដើម្បីធានាបាននូវភាពប្រណិត និងរក្សានូវកេរដំណែលវប្បធម៌ខ្មែរ។'
  },
  {
    id: 2,
    num: '២',
    question: 'តើការដឹកជញ្ជូនទំនិញត្រូវចំណាយពេលប៉ុន្មានថ្ងៃ និងគិតថ្លៃសេវាដូចម្ដេច?',
    answer: 'សម្រាប់ការដឹកជញ្ជូនក្នុងរាជធានីភ្នំពេញ ប្រើប្រាស់ពេលប្រហែល ១ ទៅ ២ថ្ងៃ និងតាមខេត្ត-ក្រុងនានាប្រើពេលពី ២ ទៅ ៤ថ្ងៃ។ ចំពោះតម្លៃសេវាដឹកជញ្ជូនគឺគិតតាមទីតាំងជាក់ស្តែងរបស់ក្រុមហ៊ុនដឹកជញ្ជូនដៃគូសហការរបស់យើង។'
  },
  {
    id: 3,
    num: '៣',
    question: 'តើខ្ញុំអាចកុម្ម៉ង់ធ្វើផលិតផលតាមទំហំ ឬម៉ូដពិសេសបានដែរឬទេ?',
    answer: 'បាន! លោកអ្នកអាចទំនាក់ទំនងមកកាន់ពួកយើងផ្ទាល់ ឬតាមរយៈទំព័រទំនាក់ទំនង ដើម្បីស្នើសុំឱ្យសិប្បកររបស់យើងរៀបចំផលិតផលតាមការចង់បានរបស់អ្នក (Custom Made)។'
  },
  {
    id: 4,
    num: '៤',
    question: 'តើប្រាក់ចំណូលពីការលក់ទំនិញបានទៅអ្នកណាខ្លះ?',
    answer: 'ចំណូលភាគច្រើនលើសលប់ពីការលក់ គឺត្រូវបង្វិលជូនផ្ទាល់ទៅដល់ដៃសិប្បករ និងគ្រួសារសហគមន៍មូលដ្ឋាន ដើម្បីជួយទ្រទ្រង់ជីវភាព និងលើកកម្ពស់ការអភិរក្សសិប្បកម្មបុរាណ។'
  }
])

const toggleFaq = (id) => {
  activeFaq.value = activeFaq.value === id ? null : id
}

const filteredFaqs = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return faqs.value
  return faqs.value.filter(faq => 
    faq.question.toLowerCase().includes(query) || 
    faq.answer.toLowerCase().includes(query)
  )
})

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

/* Scroll Reveal Entrance */
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

/* Custom Keyframe Animations */
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

/* Gold Gradient Border Overlay */
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