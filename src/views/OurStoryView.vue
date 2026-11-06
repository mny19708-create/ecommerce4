<!-- src/views/OurStoryView.vue -->
<template>
  <div class="story">
    <!-- Woven krama band: the page's one signature element -->
    <div class="krama" aria-hidden="true"></div>

    <main class="wrap">
      <!-- Header -->
      <header class="hero">
        <p class="hero-kicker">អំពីយើង</p>
        <h1 class="hero-title">
          ប្រវត្តិរឿងរ៉ាវ<br />និងបេសកកម្មរបស់យើង
        </h1>
        <div class="hero-rule" aria-hidden="true"></div>
      </header>

      <!-- Story -->
      <section class="story-body">
        <p class="lead">
          វេទិកា
          <strong>Khmer Handmade &amp; Souvenir (ខ្មែរសព្វសារពើ)</strong>
          ត្រូវបានបង្កើតឡើងក្នុងគោលបំណងលើកស្ទួយ
          និងផ្សព្វផ្សាយផលិតផលសិប្បកម្ម ក្រមា គ្រឿងទេស
          ព្រមទាំងផលិតផលសម្រស់ធម្មជាតិរបស់ប្រជាសហគមន៍ខ្មែរយើង។
        </p>
        <p class="body">
          ពួកយើងប្តេជ្ញាចិត្តក្នុងការនាំយកស្នាដៃដ៏វិសេសវិសាលពីគ្រប់តំបន់ក្នុងព្រះរាជាណាចក្រកម្ពុជា
          មកកាន់ទីផ្សារឌីជីថល ដើម្បីជួយទ្រទ្រង់ជីវភាពប្រជាសហគមន៍
          និងរក្សាទុករក្សាស្នាដៃបុរាណ។
        </p>
      </section>

      <!-- What we carry -->
      <section class="crafts" aria-label="ផលិតផលរបស់យើង">
        <div v-for="item in crafts" :key="item.name" class="craft">
          <span class="craft-name">{{ item.name }}</span>
          <span class="craft-note">{{ item.note }}</span>
        </div>
      </section>

      <!-- Back -->
      <footer class="foot">
        <router-link to="/" class="back">← ត្រឡប់ទៅទំព័រដើម</router-link>
      </footer>
    </main>

    <div class="krama krama--thin" aria-hidden="true"></div>
  </div>
</template>

<script setup>
const crafts = [
  { name: 'ក្រមា', note: 'ត្បាញដោយដៃ ពីអ្នកត្បាញតាមតំបន់' },
  { name: 'សិប្បកម្ម', note: 'ស្នាដៃបុរាណ ដែលនៅបន្តរស់រានមានជីវិត' },
  { name: 'គ្រឿងទេស', note: 'ផលិតផលធម្មជាតិ ពីកសិករខ្មែរ' },
  { name: 'សម្រស់ធម្មជាតិ', note: 'ថែរក្សាសម្រស់ ដោយគ្រឿងផ្សំក្នុងស្រុក' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.story {
  --ink: #0d0b08;
  --paper: #f3e7cf;
  --paper-dim: rgba(243, 231, 207, 0.72);
  --krama-red: #a3201b;
  --indigo: #1f2a5a;
  --gold: #d9a441;

  min-height: 100vh;
  background: var(--ink);
  color: var(--paper);
  font-family: 'Kantumruy Pro', system-ui, sans-serif;
}

/* ---------- Krama weave ---------- */
.krama {
  height: 40px;
  background-color: var(--krama-red);
  background-image:
    repeating-linear-gradient(90deg, transparent 0 14px, rgba(243, 231, 207, 0.88) 14px 18px),
    repeating-linear-gradient(0deg, transparent 0 14px, rgba(243, 231, 207, 0.88) 14px 18px),
    linear-gradient(0deg, var(--indigo) 0 4px, transparent 4px calc(100% - 4px), var(--indigo) calc(100% - 4px));
}
.krama--thin {
  height: 16px;
  background-image:
    repeating-linear-gradient(90deg, transparent 0 14px, rgba(243, 231, 207, 0.88) 14px 18px),
    repeating-linear-gradient(0deg, transparent 0 6px, rgba(243, 231, 207, 0.88) 6px 8px);
}

/* ---------- Layout ---------- */
.wrap {
  max-width: 56rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 5rem;
}

/* ---------- Hero ---------- */
.hero-kicker {
  color: var(--gold);
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0 0 1rem;
}
.hero-title {
  font-size: clamp(2.2rem, 7vw, 4.25rem);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: 0;
  margin: 0;
  color: #fff8ea;
  animation: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hero-rule {
  width: 5.5rem;
  height: 6px;
  margin-top: 2rem;
  background: var(--krama-red);
  box-shadow: 0 0 0 2px var(--ink), 0 0 0 3px var(--gold);
}

/* ---------- Story ---------- */
.story-body {
  margin-top: 3.5rem;
  display: grid;
  gap: 1.75rem;
}
.lead {
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  line-height: 2;
  color: var(--paper);
  margin: 0;
  padding-left: 1.5rem;
  border-left: 4px solid var(--krama-red);
  max-width: 44rem;
}
.lead strong {
  color: var(--gold);
  font-weight: 600;
}
.body {
  font-size: 1.05rem;
  line-height: 2;
  color: var(--paper-dim);
  margin: 0;
  max-width: 44rem;
  padding-left: 1.5rem;
}

/* ---------- Crafts ---------- */
.crafts {
  margin-top: 4rem;
  border-top: 1px solid rgba(243, 231, 207, 0.22);
}
.craft {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(243, 231, 207, 0.22);
  transition: padding-left 0.25s ease, background-color 0.25s ease;
}
.craft:hover {
  padding-left: 1rem;
  background-color: rgba(163, 32, 27, 0.14);
}
.craft-name {
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff8ea;
}
.craft-note {
  font-size: 0.95rem;
  color: var(--paper-dim);
}
@media (min-width: 640px) {
  .craft {
    grid-template-columns: 16rem 1fr;
    align-items: baseline;
    gap: 1.5rem;
  }
}

/* ---------- Back link ---------- */
.foot {
  margin-top: 3.5rem;
}
.back {
  display: inline-block;
  background: var(--paper);
  color: var(--ink);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.85rem 1.75rem;
  border-radius: 0.25rem;
  text-decoration: none;
  box-shadow: 5px 5px 0 var(--krama-red);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.back:hover {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0 var(--krama-red);
}
.back:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 4px;
}

/* ---------- Motion ---------- */
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-title {
    animation: none;
  }
  .craft,
  .back {
    transition: none;
  }
}
</style>