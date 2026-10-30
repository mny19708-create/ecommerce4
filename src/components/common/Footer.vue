<template>
  <footer class="w-full bg-[#0D0B08] text-amber-50/80 pt-12 pb-8 mt-20 font-khmer relative overflow-hidden border-t-4 border-amber-600/70 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">

    <!-- Top Ornamental Border Ribbon -->
    <div class="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700 opacity-90 shadow-sm"></div>
    <div class="w-full h-6 bg-[#1A140B] border-b border-amber-600/40 flex items-center justify-center overflow-hidden relative opacity-85 select-none">
      <div class="flex items-center gap-6 text-amber-400/80 text-xs tracking-widest whitespace-nowrap animate-shimmer">
        <span>❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤ ❖ ✤</span>
      </div>
    </div>

    <!-- Background Atmospheric Glow -->
    <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-600/10 blur-3xl pointer-events-none"></div>

    <div class="footer-container max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 relative z-10">

      <!-- Framing Box with Corner Ornaments -->
      <div class="relative bg-[#14100B]/90 border border-amber-600/40 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">

        <!-- Four Corner Khmer Motifs -->
        <div class="absolute top-2 left-2 text-amber-400/70 text-sm select-none">꧁ ✤</div>
        <div class="absolute top-2 right-2 text-amber-400/70 text-sm select-none">✤ ꧂</div>
        <div class="absolute bottom-2 left-2 text-amber-400/50 text-sm select-none">꧁ ✤</div>
        <div class="absolute bottom-2 right-2 text-amber-400/50 text-sm select-none">✤ ꧂</div>

        <!-- All columns are centered -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          <!-- Column 1: Brand Header -->
          <div class="flex flex-col items-center space-y-4">
            <div class="flex items-center justify-center gap-2">
              <span class="text-amber-400 text-2xl">❖</span>
              <h3 class="text-2xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Khmer Handmade
              </h3>
            </div>

            <div class="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

            <p class="text-sm text-amber-100/70 leading-relaxed font-light max-w-xs">
              ប្រព័ន្ធពាណិជ្ជកម្មអេឡិចត្រូនិចសម្រាប់លក់ផលិតផលសិប្បកម្ម និងវត្ថុអនុស្សាវរីយ៍ខ្មែរ ដោយស្នាដៃកូនខ្មែរពិតៗ។
            </p>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="flex flex-col items-center">
            <div class="flex items-center justify-center gap-2 mb-4">
              <span class="text-amber-500 text-xs">✤</span>
              <h4 class="font-bold text-amber-200 text-base">តំណភ្ជាប់រហ័ស</h4>
            </div>

            <ul class="flex flex-col items-center space-y-2.5 text-sm">
              <li>
                <router-link to="/products" class="text-amber-100/70 hover:text-amber-400 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2 group">
                  <span class="text-amber-500/50 group-hover:text-amber-400 text-xs">➔</span>
                  ផលិតផលទាំងអស់
                </router-link>
              </li>
              <li>
                <router-link to="/community-producers" class="text-amber-100/70 hover:text-amber-400 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2 group">
                  <span class="text-amber-500/50 group-hover:text-amber-400 text-xs">➔</span>
                  សិប្បករសហគមន៍
                </router-link>
              </li>
              <li>
                <router-link to="/faqs" class="text-amber-100/70 hover:text-amber-400 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2 group">
                  <span class="text-amber-500/50 group-hover:text-amber-400 text-xs">➔</span>
                  សំណួរដែលសួរញឹកញាប់
                </router-link>
              </li>
              <li>
                <router-link to="/shipping-returns" class="text-amber-100/70 hover:text-amber-400 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2 group">
                  <span class="text-amber-500/50 group-hover:text-amber-400 text-xs">➔</span>
                  គោលការណ៍ដឹកជញ្ជូន
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Column 3: Contact Info -->
          <div class="flex flex-col items-center">
            <div class="flex items-center justify-center gap-2 mb-4">
              <span class="text-amber-500 text-xs">✤</span>
              <h4 class="font-bold text-amber-200 text-base">ទំនាក់ទំនង</h4>
            </div>

            <div class="space-y-3 text-sm text-amber-100/70 font-light">
              <p class="flex items-center justify-center gap-2 hover:text-amber-300 transition">
                <span class="text-amber-500">✉</span>
                <span>អ៊ីមែល៖ info@khmerhandmade.com</span>
              </p>
              <p class="flex items-center justify-center gap-2 hover:text-amber-300 transition">
                <span class="text-amber-500">☎</span>
                <span>ទូរសព្ទ៖ +855 12 345 678</span>
              </p>
            </div>
          </div>

        </div>

      </div>

      <!-- Kbach Divider -->
      <div class="flex items-center justify-center gap-3 mt-8 opacity-60">
        <span class="text-amber-500 text-xs">꧁</span>
        <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent w-24 sm:w-48"></div>
        <span class="text-amber-400 text-sm">❖</span>
        <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent w-24 sm:w-48"></div>
        <span class="text-amber-500 text-xs">꧂</span>
      </div>

      <!-- Copyright Bottom Bar -->
      <div class="text-center text-xs text-amber-200/50 pt-4">
        © 2026 Khmer Handmade &amp; Souvenir. រក្សាសិទ្ធិគ្រប់យ៉ាង។
      </div>

    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}

/* Center the footer content on the page.
   Written as plain scoped CSS so a global "margin: 0" reset cannot cancel it (which is what breaks Tailwind's mx-auto). */
.footer-container {
  margin-left: auto;
  margin-right: auto;
}

@keyframes shimmer {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.animate-shimmer {
  animation: shimmer 4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-shimmer { animation: none; }
}
</style>