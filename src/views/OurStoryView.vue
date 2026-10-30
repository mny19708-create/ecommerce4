<!-- src/views/OurStoryView.vue -->
<template>
  <div class="min-h-screen bg-[#0D0B08] text-amber-50 font-['Kantumruy_Pro'] p-6 md:p-12">
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Header -->
      <div class="border-b border-amber-600/30 pb-6">
        <p class="text-xs text-amber-400 tracking-wider mb-2">❖ អំពីយើង</p>
        <h1 class="text-3xl font-bold text-white">ប្រវត្តិរឿងរ៉ាវ និងបេសកកម្មរបស់យើង</h1>
      </div>

      <!-- Content Body -->
      <div class="bg-[#15120D] border border-amber-600/20 rounded-3xl p-6 md:p-8 space-y-4 text-sm text-amber-100/80 leading-relaxed shadow-xl">
        <p>
          វេទិកា <strong class="text-amber-400">Khmer Handmade & Souvenir (ខ្មែរសព្វសារពើ)</strong> ត្រូវបានបង្កើតឡើងក្នុងគោលបំណងលើកស្ទួយ និងផ្សព្វផ្សាយផលិតផលសិប្បកម្ម ក្រមា គ្រឿងទេស ព្រមទាំងផលិតផលសម្រស់ធម្មជាតិរបស់ប្រជាសហគមន៍ខ្មែរយើង។
        </p>
        <p>
          ពួកយើងប្តេជ្ញាចិត្តក្នុងការនាំយកស្នាដៃដ៏វិសេសវិសាលពីគ្រប់តំបន់ក្នុងព្រះរាជាណាចក្រកម្ពុជា មកកាន់ទីផ្សារឌីជីថល ដើម្បីជួយទ្រទ្រង់ជីវភាពប្រជាសហគមន៍ និងរក្សាទុករក្សាស្នាដៃបុរាណ។
        </p>
      </div>

      <!-- Back Button -->
      <div>
        <router-link 
          to="/" 
          class="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition shadow-md"
        >
          ← ត្រឡប់ទៅទំព័រដើម
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
// OurStoryView Logic (if any)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
</style>