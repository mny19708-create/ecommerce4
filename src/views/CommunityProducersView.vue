<template>
  <div class="w-full min-h-screen font-khmer bg-[#0D0C0A] text-amber-50/90 overflow-x-hidden flex flex-col items-center relative selection:bg-amber-500 selection:text-black">
    
    <!-- background textures & Orbs -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/20 via-yellow-900/10 to-transparent blur-3xl pointer-events-none -z-0"></div>
    <div class="absolute top-1/3 -left-48 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

    <!-- Hero Banner -->
    <section class="relative w-full pt-20 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 flex justify-center z-10 border-b border-amber-900/30">
      
      <!-- Kbach Corner Elements -->
      <div class="absolute top-6 left-6 text-amber-500/30 font-serif text-2xl select-none hidden sm:block">❖</div>
      <div class="absolute top-6 right-6 text-amber-500/30 font-serif text-2xl select-none hidden sm:block">❖</div>

      <div class="max-w-4xl w-full text-center relative flex flex-col items-center justify-center animate-khmer-hero">
        
        <!-- Angkorian Badge Style -->
        <span class="inline-flex items-center gap-2 bg-gradient-to-r from-amber-950/80 via-amber-900/40 to-amber-950/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-medium px-5 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(217,119,6,0.2)] backdrop-blur-md tracking-wide">
          <span class="text-amber-400 font-bold">✤</span>
          បណ្តាញសិប្បករសហគមន៍ខ្មែរអង្គរ
          <span class="text-amber-400 font-bold">✤</span>
        </span>

        <h1 class="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          ជួបជាមួយ <span class="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent block sm:inline filter drop-shadow-[0_2px_10px_rgba(217,119,6,0.3)]">ម្ចាស់ស្នាដៃផ្ទាល់</span>
        </h1>

        <p class="text-amber-100/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-center font-light">
          ស្វែងយល់ពីជីវិត ទេពកោសល្យ និងស្នាដៃដ៏វិចិត្ររបស់អ្នកសិប្បករមកពីតាមបណ្តាយខេត្ត-ក្រុងនានា ដែលខិតខំថែរក្សា និងច្នៃប្រឌិតផលិតផលប្រពៃណីខ្មែរ។
        </p>

        <!-- Angkor Style Divider Line -->
        <div class="flex items-center justify-center gap-3 mt-8 w-full max-w-xs">
          <div class="h-[1px] bg-gradient-to-r from-transparent to-amber-500/50 flex-grow"></div>
          <span class="text-amber-500 text-sm">❖</span>
          <div class="h-[1px] bg-gradient-to-l from-transparent to-amber-500/50 flex-grow"></div>
        </div>

        <!-- Stats Bar -->
        <div class="grid grid-cols-3 gap-4 sm:gap-8 mt-8 pt-6 w-full max-w-lg">
          <div class="border-r border-amber-900/40 last:border-0">
            <div class="text-2xl sm:text-3xl font-bold text-amber-400">១៥០+</div>
            <div class="text-xs text-amber-200/60 mt-1">សិប្បករសហគមន៍</div>
          </div>
          <div class="border-r border-amber-900/40 last:border-0">
            <div class="text-2xl sm:text-3xl font-bold text-amber-400">២៥</div>
            <div class="text-xs text-amber-200/60 mt-1">រាជធានី-ខេត្ត</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-bold text-amber-400">១០០%</div>
            <div class="text-xs text-amber-200/60 mt-1">ស្នាដៃធ្វើដោយដៃ</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Area -->
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-12 flex flex-col items-center z-10">
      
      <!-- Search & Category Filters -->
      <div class="w-full max-w-4xl flex flex-col items-center gap-6 khmer-reveal" data-delay="100">
        
        <!-- Search Bar with Royal Border -->
        <div class="relative w-full max-w-2xl group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-amber-600/50 via-yellow-500/30 to-amber-600/50 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          <div class="relative flex items-center bg-[#14120E] border border-amber-600/40 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
            <svg class="w-5 h-5 text-amber-400 ml-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ស្វែងរកឈ្មោះសិប្បករ ជំនាញ ឬខេត្ត..."
              class="w-full bg-transparent border-none px-4 py-4 text-sm text-amber-50 placeholder-amber-200/40 focus:outline-none focus:ring-0"
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''"
              class="mr-4 text-amber-300/60 hover:text-amber-200 text-xs bg-amber-950/60 border border-amber-800/40 px-2.5 py-1 rounded-md transition"
            >
              សម្អាត
            </button>
          </div>
        </div>

        <!-- Category Chips -->
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 border',
              selectedCategory === cat
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 border-amber-300 text-slate-950 font-bold shadow-lg shadow-amber-600/20'
                : 'bg-[#181511] border-amber-900/40 text-amber-200/70 hover:border-amber-600/60 hover:text-amber-200'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Producers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <div
          v-for="(producer, index) in filteredProducers"
          :key="producer.id"
          class="bg-[#14120E] rounded-3xl overflow-hidden border border-amber-900/40 hover:border-amber-500/60 shadow-2xl transition-all duration-500 flex flex-col group khmer-card khmer-reveal relative"
          :data-delay="(index % 3) * 120"
        >
          <!-- Corner Kbach Accent -->
          <div class="absolute top-2 right-3 text-amber-500/20 group-hover:text-amber-400/60 transition-colors z-20 text-xs select-none">❖</div>

          <!-- Image Header -->
          <div class="relative w-full h-64 overflow-hidden bg-stone-900">
            <img
              :src="producer.image"
              :alt="producer.name"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out filter brightness-90 group-hover:brightness-100"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#14120E] via-[#14120E]/20 to-transparent"></div>
            
            <!-- Location Badge -->
            <div class="absolute bottom-3 left-3 bg-[#0D0C0A]/90 border border-amber-600/40 backdrop-blur-md text-amber-300 text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
              <span class="text-amber-400 text-xs">📍</span>
              {{ producer.location }}
            </div>

            <!-- Experience Tag -->
            <div class="absolute top-3 left-3 bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md">
              បទពិសោធន៍ {{ producer.experience }}
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-6 flex flex-col flex-grow justify-between w-full relative">
            <div>
              <div class="text-amber-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                <span class="text-[10px]">✤</span> {{ producer.specialty }}
              </div>
              <h3 class="font-bold text-white text-xl mb-3 group-hover:text-amber-300 transition-colors">
                {{ producer.name }}
              </h3>
              <p class="text-amber-100/60 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                {{ producer.description }}
              </p>
            </div>

            <button
              class="w-full bg-gradient-to-r from-amber-950/60 to-stone-900 hover:from-amber-600 hover:to-amber-500 text-amber-200 hover:text-slate-950 font-semibold text-sm py-3 rounded-2xl transition-all duration-300 border border-amber-800/40 hover:border-amber-300 flex items-center justify-center gap-2 group/btn shadow-md"
            >
              <span>មើលស្នាដៃ</span>
              <span class="transform group-hover/btn:translate-x-1 transition-transform text-xs">➔</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducers.length === 0" class="text-center py-16">
        <p class="text-amber-200/50 text-base">មិនរកឃើញសិប្បករដែលអ្នកស្វែងរកឡើយ។</p>
      </div>
    </div>

    <!-- Full-Width Call To Action -->
    <section class="w-full mt-16 relative overflow-hidden flex justify-center border-t border-amber-900/40 bg-[#0A0907]">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div class="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 flex flex-col items-center justify-center space-y-6 khmer-cta khmer-reveal" data-delay="120">
        
        <div class="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2 shadow-[0_0_15px_rgba(217,119,6,0.2)]">
          <span class="text-xl">✤</span>
        </div>

        <h2 class="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
          តើអ្នកជាសិប្បករចង់ដាក់តាំងបង្ហាញស្នាដៃមែនទេ?
        </h2>

        <p class="text-amber-200/60 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
          ចូលរួមជាមួយបណ្តាញសហគមន៍របស់យើង ដើម្បីពង្រីកទីផ្សារផលិតផលរបស់អ្នកទៅកាន់អតិថិជនទូទាំងប្រទេស។
        </p>

        <div class="pt-4">
          <router-link
            to="/contact"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-600/20 active:scale-95 border border-yellow-200/50"
          >
            <span>ទំនាក់ទំនងមកយើងខ្ញុំ</span>
            <span>➔</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const searchQuery = ref('');
const selectedCategory = ref('ទាំងអស់');

const categories = ['ទាំងអស់', 'ត្បាញក្រមា/សូត្រ', 'ឆ្លាក់ឈើ/ឫស្សី', 'ត្បាញកំប្លោក'];

const producers = ref([
  {
    id: 1,
    name: 'អ្នកស្រី ចាន់ ថាច',
    specialty: 'ជំនាញត្បាញក្រមា និងសូត្រ',
    category: 'ត្បាញក្រមា/សូត្រ',
    location: 'ខេត្តសៀមរាប',
    experience: '២០+ ឆ្នាំ',
    description: 'មានបទពិសោធន៍ជាង ២០ឆ្នាំក្នុងការត្បាញក្រមា និងខ្សែកាបូបតាមបែបបុរាណ ផ្ទេរចំណេះដឹងពីជីដូនដល់ក្មេងជំនាន់ក្រោយ។',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'លោកតា ហុង វឿន',
    specialty: 'ជំនាញឆ្លាក់ឈើ និងឫស្សី',
    category: 'ឆ្លាក់ឈើ/ឫស្សី',
    location: 'ខេត្តកំពង់ធំ',
    experience: '៣៥ ឆ្នាំ',
    description: 'ជំនាញខាងច្នៃប្រឌិតសម្ភារប្រើប្រាស់ក្នុងផ្ទះពីឈើធម្មជាតិ និងដើមឫស្សី ប្រកបដោយភាពផ្ចិតផ្ចង់ និងរឹងមាំ។',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'អ្នកស្រី គឹម សុខា',
    specialty: 'ជំនាញត្បាញកំប្លោក',
    category: 'ត្បាញកំប្លោក',
    location: 'ខេត្តកណ្តាល',
    experience: '១២ ឆ្នាំ',
    description: 'ប្រមូលផ្តុំស្ត្រីក្នុងសហគមន៍កែច្នៃដើមកំប្លោកជាកាបូប និងកន្ទេលស្អាតៗ ដែលមានការគាំទ្រយ៉ាងខ្លាំងពីអតិថិជន។',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  }
]);

const filteredProducers = computed(() => {
  return producers.value.filter((p) => {
    const matchesCategory = selectedCategory.value === 'ទាំងអស់' || p.category === selectedCategory.value;
    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch = !query || 
      p.name.toLowerCase().includes(query) || 
      p.location.toLowerCase().includes(query) || 
      p.specialty.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
});

onMounted(() => {
  const els = document.querySelectorAll('.khmer-reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = Number(e.target.getAttribute('data-delay') || 0);
          e.target.style.transitionDelay = `${delay}ms`;
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}

/* Scroll Animation */
.khmer-reveal {
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition: opacity 700ms ease, transform 700ms cubic-bezier(.16,1,.3,1);
  will-change: transform, opacity;
}

.khmer-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.animate-khmer-hero {
  animation: khmerHeroFloat 1000ms cubic-bezier(.16,1,.3,1) both;
}

@keyframes khmerHeroFloat {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}

/* Angkor Gold Subtle Border Highlight */
.khmer-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  padding: 1px;
  background: linear-gradient(135deg, rgba(217,119,6,0.5), transparent 50%, rgba(217,119,6,0.2));
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
  .animate-khmer-hero {
    animation: none !important;
    transition: none !important;
  }
}
</style>