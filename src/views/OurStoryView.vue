<!-- src/views/OurStoryView.vue -->
<template>
  <div class="story">
    <!-- Woven krama band (slowly drifting) -->
    <div class="krama" aria-hidden="true"></div>

    <main class="wrap">
      <!-- Header -->
      <header class="hero">
        <p class="hero-kicker">អំពីយើង</p>
        <h1 class="hero-title">
          <span class="line"><span class="line-in">ប្រវត្តិរឿងរ៉ាវ</span></span>
          <span class="line"><span class="line-in l2">និងបេសកកម្មរបស់យើង</span></span>
        </h1>
        <div class="hero-rule" aria-hidden="true"></div>
      </header>

      <!-- Story -->
      <section class="story-body reveal">
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
      <section class="crafts reveal" aria-label="ផលិតផលរបស់យើង">
        <div
          v-for="(item, i) in crafts"
          :key="item.name"
          class="craft"
          :style="{ '--d': i * 90 + 'ms' }"
        >
          <span class="craft-name">{{ item.name }}</span>
          <span class="craft-note">{{ item.note }}</span>
        </div>
      </section>

      <!-- Partners -->
      <section class="partners reveal" aria-labelledby="partners-title">
        <h2 id="partners-title" class="section-title">ដៃគូសហការរបស់យើង</h2>
        <p class="section-sub">
          សហគមន៍ និងអ្នកផលិតដែលធ្វើការជាមួយយើងរាល់ថ្ងៃ
        </p>
      </section>
    </main>

    <!-- Partner marquee: two rows, opposite directions -->
    <div class="marquee-block reveal" aria-label="បញ្ជីដៃគូសហការ">
      <div class="marquee">
        <div class="track">
          <span v-for="(p, i) in loop" :key="'a' + i" class="chip">
            <i class="dot" aria-hidden="true"></i>{{ p }}
          </span>
        </div>
      </div>
      <div class="marquee marquee--rev">
        <div class="track">
          <span v-for="(p, i) in loopRev" :key="'b' + i" class="chip chip--alt">
            <i class="dot" aria-hidden="true"></i>{{ p }}
          </span>
        </div>
      </div>
    </div>

    <main class="wrap wrap--end">
      <footer class="foot reveal">
        <router-link to="/" class="back">← ត្រឡប់ទៅទំព័រដើម</router-link>
      </footer>
    </main>

    <div class="krama krama--thin" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'

const crafts = [
  { name: 'ក្រមា', note: 'ត្បាញដោយដៃ ពីអ្នកត្បាញតាមតំបន់' },
  { name: 'សិប្បកម្ម', note: 'ស្នាដៃបុរាណ ដែលនៅបន្តរស់រានមានជីវិត' },
  { name: 'គ្រឿងទេស', note: 'ផលិតផលធម្មជាតិ ពីកសិករខ្មែរ' },
  { name: 'សម្រស់ធម្មជាតិ', note: 'ថែរក្សាសម្រស់ ដោយគ្រឿងផ្សំក្នុងស្រុក' }
]

// TODO: replace with your real partners
const partners = [
  'សហគមន៍ត្បាញក្រមា ខេត្តតាកែវ',
  'សហគមន៍គ្រឿងទេស ខេត្តកំពត',
  'សិប្បកម្មថ្ម និងឈើ សៀមរាប',
  'សហគមន៍សូត្រ ខេត្តកណ្តាល',
  'ផលិតផលធម្មជាតិ មណ្ឌលគិរី',
  'សហគមន៍សិប្បកម្ម កំពង់ចាម'
]
// duplicated so the loop is seamless
const loop = computed(() => [...partners, ...partners])
const loopRev = computed(() => [...partners].reverse().concat([...partners].reverse()))

let io
onMounted(() => {
  const els = document.querySelectorAll('.story .reveal')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'))
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  els.forEach((el) => io.observe(el))
})
onBeforeUnmount(() => io && io.disconnect())
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&family=Moul&display=swap');

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
  overflow-x: hidden;
}

/* ---------- Krama weave ---------- */
.krama {
  height: 40px;
  background-color: var(--krama-red);
  background-image:
    repeating-linear-gradient(90deg, transparent 0 14px, rgba(243, 231, 207, 0.88) 14px 18px),
    repeating-linear-gradient(0deg, transparent 0 14px, rgba(243, 231, 207, 0.88) 14px 18px),
    linear-gradient(0deg, var(--indigo) 0 4px, transparent 4px calc(100% - 4px), var(--indigo) calc(100% - 4px));
  background-size: 32px 32px, 32px 32px, 100% 100%;
  animation: weave 6s linear infinite;
}
.krama--thin {
  height: 16px;
  background-image:
    repeating-linear-gradient(90deg, transparent 0 14px, rgba(243, 231, 207, 0.88) 14px 18px),
    repeating-linear-gradient(0deg, transparent 0 6px, rgba(243, 231, 207, 0.88) 6px 8px);
  background-size: 32px 32px, 32px 16px;
  animation-direction: reverse;
}
@keyframes weave {
  to { background-position: 32px 0, 32px 0, 0 0; }
}

/* ---------- Layout ---------- */
.wrap {
  max-width: 56rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 0;
}
.wrap--end { padding-bottom: 5rem; }

/* ---------- Hero ---------- */
.hero-kicker {
  color: var(--gold);
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0 0 1rem;
  animation: fade 0.8s ease both;
}
/* Banner with diamond lattice, like the reference */
.hero {
  padding: 2.5rem 1.5rem 2.25rem;
  border-radius: 0.5rem;
  background-color: #17120b;
  background-image:
    repeating-linear-gradient(45deg, rgba(217, 164, 65, 0.16) 0 1px, transparent 1px 26px),
    repeating-linear-gradient(-45deg, rgba(217, 164, 65, 0.16) 0 1px, transparent 1px 26px);
  border: 1px solid rgba(217, 164, 65, 0.3);
}
.hero-title {
  font-family: 'Moul', 'Kantumruy Pro', serif;
  font-weight: 400;
  font-size: clamp(1.5rem, 5.2vw, 2.9rem);
  line-height: 2;
  margin: 0;
  color: #fff;
  text-shadow: 0 3px 0 #000, 0 0 18px rgba(0, 0, 0, 0.65);
}
.line { display: block; overflow: hidden; padding-block: 0.1em; }
.line-in {
  display: block;
  animation: lift 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.line-in.l2 { animation-delay: 0.18s; }
.hero-rule {
  height: 6px;
  margin-top: 2rem;
  background: var(--krama-red);
  box-shadow: 0 0 0 2px var(--ink), 0 0 0 3px var(--gold);
  width: 0;
  animation: grow 1.1s 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes lift { from { transform: translateY(110%); } to { transform: none; } }
@keyframes grow { to { width: 5.5rem; } }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }

/* ---------- Scroll reveal ---------- */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.reveal.in { opacity: 1; transform: none; }

/* ---------- Story ---------- */
.story-body { margin-top: 3.5rem; display: grid; gap: 1.75rem; }
.lead {
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  line-height: 2;
  margin: 0;
  padding-left: 1.5rem;
  border-left: 4px solid var(--krama-red);
  max-width: 44rem;
}
.lead strong { color: var(--gold); font-weight: 600; }
.body {
  font-size: 1.05rem;
  line-height: 2;
  color: var(--paper-dim);
  margin: 0;
  max-width: 44rem;
  padding-left: 1.5rem;
}

/* ---------- Crafts ---------- */
.crafts { margin-top: 4rem; border-top: 1px solid rgba(243, 231, 207, 0.22); }
.craft {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(243, 231, 207, 0.22);
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 0.6s ease var(--d), transform 0.6s ease var(--d),
    padding-left 0.25s ease, background-color 0.25s ease;
}
.crafts.in .craft { opacity: 1; transform: none; }
.craft:hover { padding-left: 1rem; background-color: rgba(163, 32, 27, 0.14); }
.craft-name { font-size: 1.6rem; font-weight: 600; color: #fff8ea; }
.craft-note { font-size: 0.95rem; color: var(--paper-dim); }
@media (min-width: 640px) {
  .craft { grid-template-columns: 16rem 1fr; align-items: baseline; gap: 1.5rem; }
}

/* ---------- Partners ---------- */
.partners { margin-top: 5rem; }
.section-title {
  font-size: clamp(1.7rem, 4vw, 2.5rem);
  font-weight: 700;
  margin: 0;
  color: #fff8ea;
}
.section-sub { margin: 0.75rem 0 0; color: var(--paper-dim); font-size: 1rem; }

.marquee-block { margin-top: 2rem; display: grid; gap: 0.9rem; }
.marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.track {
  display: flex;
  gap: 0.9rem;
  width: max-content;
  animation: slide 38s linear infinite;
}
.marquee--rev .track { animation-direction: reverse; animation-duration: 46s; }
.marquee:hover .track { animation-play-state: paused; }
@keyframes slide { to { transform: translateX(calc(-50% - 0.45rem)); } }

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  white-space: nowrap;
  padding: 0.85rem 1.4rem;
  border: 1px solid rgba(217, 164, 65, 0.5);
  border-radius: 999px;
  background: rgba(243, 231, 207, 0.04);
  color: var(--paper);
  font-size: 1rem;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.chip--alt { border-color: rgba(243, 231, 207, 0.28); }
.chip:hover { background: var(--krama-red); border-color: var(--krama-red); color: #fff; }
.dot {
  width: 9px;
  height: 9px;
  background: var(--gold);
  transform: rotate(45deg);
  flex: none;
}

/* ---------- Back link ---------- */
.foot { margin-top: 4rem; }
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
.back:hover { transform: translate(2px, 2px); box-shadow: 3px 3px 0 var(--krama-red); }
.back:focus-visible { outline: 3px solid var(--gold); outline-offset: 4px; }

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .krama, .track, .line-in, .hero-kicker { animation: none; }
  .hero-rule { animation: none; width: 5.5rem; }
  .reveal, .craft { opacity: 1; transform: none; transition: none; }
  .marquee { overflow-x: auto; }
  .track { width: auto; flex-wrap: wrap; }
}
</style>