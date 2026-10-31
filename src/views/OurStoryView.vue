<!-- src/views/OurStoryView.vue -->
<template>
  <div class="min-h-screen bg-[#0A0806] text-amber-50 font-['Kantumruy_Pro'] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    
    <!-- Background Glow & Decorative Elements -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-600/15 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute -bottom-20 left-10 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto space-y-20 relative z-10">
      
      <!-- 1. Premium Header -->
      <div class="text-center space-y-4 enter-up" style="--delay: 100ms;">
        <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <span class="text-amber-400">❖</span> រឿងរ៉ាវ និងមោទនភាពជាតិ <span class="text-amber-400">❖</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          ស្វែងយល់ពី <span class="shimmer-text text-transparent bg-clip-text">ដំណើរឆ្ពោះទៅមុខ</span> របស់យើង
        </h1>
        <p class="text-amber-200/70 text-sm sm:text-base max-w-2xl mx-auto font-light">
          ពីស្នាដៃហត្ថកម្មតាមសហគមន៍មូលដ្ឋាន ឆ្ពោះមកកាន់វេទិកាឌីជីថលដ៏ប្រណិត ដើម្បីរក្សានិងលើកស្ទួយវប្បធម៌ខ្មែរ។
        </p>
      </div>

      <!-- 2. Core Values Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="value in coreValues"
          :key="value.title"
          class="bg-gradient-to-b from-[#16120D] to-[#0F0C09] border border-amber-600/30 hover:border-amber-400/60 rounded-3xl p-8 space-y-4 transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] group enter-up"
          :style="{ '--delay': value.delay }"
        >
          <div class="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300 shadow-inner">
            {{ value.icon }}
          </div>
          <h3 class="text-lg font-bold text-amber-300 tracking-wide">{{ value.title }}</h3>
          <p class="text-xs sm:text-sm text-amber-100/70 leading-relaxed font-light">
            {{ value.description }}
          </p>
        </article>
      </div>

      <!-- 3. Main Story Section -->
      <div class="bg-[#120F0A]/90 backdrop-blur-xl border border-amber-600/40 rounded-[2.5rem] p-8 sm:p-12 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative enter-up" style="--delay: 500ms;">
        <div class="absolute top-4 left-4 text-amber-500/40 text-sm">꧁ ✤</div>
        <div class="absolute top-4 right-4 text-amber-500/40 text-sm">✤ ꧂</div>
        <div class="absolute bottom-4 left-4 text-amber-500/40 text-sm">✤ ꧂</div>
        <div class="absolute bottom-4 right-4 text-amber-500/40 text-sm">꧁ ✤</div>

        <div class="max-w-3xl mx-auto space-y-6 text-amber-100/90 leading-relaxed text-sm sm:text-base font-light text-center">
          <p class="text-lg font-normal text-amber-200">
            វេទិកា <strong class="text-amber-400 font-bold">Khmer Handmade & Souvenir (ខ្មែរសព្វសារពើ)</strong> ត្រូវបានបង្កើតឡើងដោយក្តីស្រឡាញ់ដ៏ជ្រាលជ្រៅចំពោះវប្បធម៌ និងស្នាដៃសិប្បកម្មដូនតាខ្មែរ។
          </p>
          <div class="w-16 h-[1px] bg-amber-500/40 mx-auto"></div>
          <p>
            យើងមិនត្រឹមតែជាកន្លែងដាក់លក់ទំនិញនោះទេ ប៉ុន្តែយើងគឺជាស្ពានតភ្ជាប់រវាង «ញើសឈាមជាងសិប្បករ» និង «បេះដូងអ្នកគាំទ្រស្នាដៃខ្មែរ»។ រាល់ផលិតផលនីមួយៗសុទ្ធតែកើតចេញពីសមត្ថភាព ទេពកោសល្យ និងប្រពៃណីដ៏ផូរផង់ដែលបានចាក់ឬសយ៉ាងជ្រៅក្នុងសង្គមជាតិយើង។
          </p>
        </div>
      </div>

      <!-- 4. Community Impact Statistics Counter -->
      <div class="bg-[#15120D] border border-amber-600/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center enter-up" style="--delay: 600ms;">
        <div v-for="stat in impactStats" :key="stat.label" class="space-y-2">
          <p class="text-3xl md:text-4xl font-extrabold text-amber-400">{{ stat.value }}</p>
          <p class="text-xs sm:text-sm text-amber-100/70 font-medium">{{ stat.label }}</p>
        </div>
      </div>

      <!-- 5. Newsletter & VIP Offers Box -->
      <div class="bg-gradient-to-r from-amber-600/20 via-[#15120D] to-yellow-600/20 border border-amber-500/40 rounded-[2.5rem] p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl enter-up" style="--delay: 700ms;">
        <div class="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl"></div>

        <div class="space-y-2 relative z-10">
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white">ទទួលបានការបញ្ចុះតម្លៃ ១០% សម្រាប់ការបញ្ជាទិញដំបូង!</h3>
          <p class="text-xs sm:text-sm text-amber-100/70 max-w-lg mx-auto">
            ចុះឈ្មោះអ៊ីមែលរបស់អ្នកទីនេះ ដើម្បីមិនខកខានរាល់ផលិតផលសិប្បកម្មថ្មីៗ និងប្រូម៉ូសិនបញ្ចុះតម្លៃពិសេសប្រចាំខែ។
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
          <input 
            type="email" 
            placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក..." 
            class="flex-1 bg-[#0D0B08] border border-amber-600/40 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <button class="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shrink-0">
            ចុះឈ្មោះឥឡូវនេះ
          </button>
        </div>
      </div>

      <!-- 6. Back Button -->
      <div class="text-center enter-up" style="--delay: 800ms;">
        <router-link 
          to="/" 
          class="btn-shine inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm px-10 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] hover:-translate-y-1 active:scale-95"
        >
          <span>←</span> ត្រឡប់ទៅទំព័រដើមវិញ
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
const coreValues = [
  {
    icon: '🏛️',
    title: 'អត្តសញ្ញាណ និងមរតក',
    description: 'ការថែរក្សា និងចងក្រងរាល់ស្នាដៃសិប្បកម្មបុរាណ ក្រមា និងផលិតផលធម្មជាតិខ្មែរឱ្យគង់វង្សស្ថិតស្ថេរ។',
    delay: '200ms'
  },
  {
    icon: '🤝',
    title: 'សហគមន៍ និងជីវភាព',
    description: 'ការផ្ដល់តម្លៃ និងជួយទ្រទ្រង់ជីវភាពប្រជាកសិករ និងជាងសិប្បកម្មតាមបណ្តាខេត្តនានាក្នុងព្រះរាជាណាចក្រកម្ពុជា។',
    delay: '300ms'
  },
  {
    icon: '✨',
    title: 'គុណភាពកម្រិតខ្ពស់',
    description: 'ការជ្រើសរើសយ៉ាងយកចិត្តទុកដាក់នូវផលិតផលអនុស្សាវរីយ៍ប្រណិតៗសម្រាប់អតិថិជនជាតិ និងអន្តរជាតិ។',
    delay: '400ms'
  }
]

const impactStats = [
  { value: '១៥+', label: 'សហគមន៍សិប្បកម្មចូលរួម' },
  { value: '៥០០+', label: 'ផលិតផលសិប្បកម្មស្នាដៃ' },
  { value: '៣,២០០+', label: 'អតិថិជនគាំទ្រទូទាំងប្រទេស' },
  { value: '១០០%', label: 'ផលិតផលស្នាដៃកូនខ្មែរ' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.enter-up {
  animation: enterUp 1s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms) backwards;
}

@keyframes enterUp {
  from { opacity: 0; transform: translateY(40px) scale(0.96); filter: blur(6px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
}

.shimmer-text {
  background-image: linear-gradient(90deg, #fef3c7, #fbbf24, #d97706, #fbbf24, #fef3c7);
  background-size: 200% auto;
  animation: shimmer 5s linear infinite;
}

@keyframes shimmer { 
  to { background-position: 200% center; } 
}

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
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transform: skewX(-20deg);
  pointer-events: none;
}

.btn-shine:hover::after { 
  animation: shine 0.9s ease; 
}

@keyframes shine { 
  to { left: 130%; } 
}
</style>