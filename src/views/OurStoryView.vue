<!-- src/views/OurStoryView.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

/* ---------- ទិន្នន័យ (TODO: ជំនួសដោយទិន្នន័យពិតរបស់ហាង) ---------- */
const crafts = [
  { icon: '🧣', title: 'Crafts & Krama', kh: 'ក្រមា និងសិប្បកម្ម', text: 'ក្រមា សូត្រ និងវាយនភណ្ឌត្បាញដោយដៃ តាមបច្ចេកទេសបុរាណ។', to: '/shop/crafts-krama' },
  { icon: '🌶️', title: 'Food & Spices', kh: 'អាហារ និងគ្រឿងទេស', text: 'ម្រេចកំពត ស្ករត្នោត និងគ្រឿងទេសខ្មែរ ពីចម្ការផ្ទាល់។', to: '/shop/food-spices' },
  { icon: '🧴', title: 'Health & Beauty', kh: 'សុខភាព និងសម្រស់', text: 'ផលិតផលធម្មជាតិ ពីរុក្ខជាតិ និងប្រេងដូងក្នុងស្រុក។', to: '/shop/health-beauty' },
  { icon: '🎁', title: 'Souvenir Gift Sets', kh: 'កញ្ចប់កាដូអនុស្សាវរីយ៍', text: 'កញ្ចប់អំណោយពិសេស សម្រាប់ភ្ញៀវ និងមនុស្សជាទីស្រលាញ់។', to: '/shop/souvenir-gift-sets' },
];

const partners = [
  { icon: '🧵', name: 'សហគមន៍ត្បាញក្រមា', craft: 'ក្រមា និងសូត្រ', province: 'តាកែវ', members: 42 },
  { icon: '🌿', name: 'សហគមន៍ម្រេចកំពត', craft: 'ម្រេច និងគ្រឿងទេស', province: 'កំពត', members: 28 },
  { icon: '🍯', name: 'សហគមន៍ស្ករត្នោត', craft: 'ស្ករត្នោត', province: 'កំពង់ស្ពឺ', members: 19 },
  { icon: '🪵', name: 'សហគមន៍ចម្លាក់ឈើ', craft: 'ចម្លាក់ឈើ', province: 'សៀមរាប', members: 24 },
  { icon: '🏺', name: 'សហគមន៍ស្មូនដី', craft: 'ក្រឡដី និងស្មូន', province: 'កំពង់ឆ្នាំង', members: 16 },
  { icon: '🥥', name: 'សហគមន៍ប្រេងដូង', craft: 'សម្រស់ធម្មជាតិ', province: 'កែប', members: 21 },
];

const values = [
  { icon: '🤲', title: 'ធ្វើដោយដៃ', text: 'រាល់ផលិតផលកើតចេញពីដៃអ្នកជំនាញក្នុងសហគមន៍។' },
  { icon: '⚖️', title: 'តម្លៃយុត្តិធម៌', text: 'អ្នកផលិតទទួលបានចំណូលសមរម្យពីការខិតខំរបស់ខ្លួន។' },
  { icon: '🌱', title: 'រក្សាបេតិកភណ្ឌ', text: 'ការពារបច្ចេកទេសបុរាណមិនឱ្យបាត់បង់។' },
  { icon: '✨', title: 'គុណភាពទុកចិត្តបាន', text: 'ត្រួតពិនិត្យមុនដឹកជញ្ជូនគ្រប់កញ្ចប់។' },
];

const timeline = [
  { year: 'ដំបូង', title: 'គំនិតចាប់ផ្តើម', text: 'ឃើញសិប្បកម្មខ្មែរដ៏ស្រស់ស្អាត ប៉ុន្តែអ្នកផលិតពិបាកទៅដល់អតិថិជន។' },
  { year: 'បន្ទាប់', title: 'ភ្ជាប់សហគមន៍', text: 'ចាប់ដៃគូជាមួយក្រុមអ្នកផលិតតាមបណ្តាខេត្ត។' },
  { year: 'ឥឡូវ', title: 'ហាងអនឡាញ', text: 'នាំផលិតផលខ្មែរមកទីផ្សារឌីជីថល ដឹកជូនដល់ផ្ទះអ្នក។' },
];

/* ---------- ស្ថិតិរាប់ឡើង ---------- */
const stats = ref([
  { label: 'សហគមន៍ដៃគូ', target: 6, suffix: '+', value: 0 },
  { label: 'អ្នកផលិត', target: 150, suffix: '+', value: 0 },
  { label: 'ផលិតផល', target: 80, suffix: '+', value: 0 },
  { label: 'ខេត្តដែលចូលរួម', target: 12, suffix: '', value: 0 },
]);
let counted = false;
let raf;

const runCounters = () => {
  if (counted) return;
  counted = true;
  const start = performance.now();
  const dur = 1600;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const ease = 1 - Math.pow(1 - t, 3);
    stats.value.forEach((s) => (s.value = Math.round(s.target * ease)));
    if (t < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
};

/* ---------- Scroll reveal (លោតចូលពេលអូសមកដល់) ---------- */
const root = ref(null);
let observer;

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = root.value?.querySelectorAll('.reveal') || [];

  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    stats.value.forEach((s) => (s.value = s.target));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.dataset.counter !== undefined) runCounters();
        observer.unobserve(e.target);
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => {
  observer?.disconnect();
  cancelAnimationFrame(raf);
});
</script>

<template>
  <div ref="root" class="story">
    <!-- ពន្លឺ និងលំនាំផ្ទៃ -->
    <div class="pattern" aria-hidden="true"></div>
    <span class="glow g1" aria-hidden="true"></span>
    <span class="glow g2" aria-hidden="true"></span>

    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="floaters" aria-hidden="true">
        <span style="--x: 8%; --y: 24%; --d: 0s">🧣</span>
        <span style="--x: 88%; --y: 18%; --d: -1.2s">🌶️</span>
        <span style="--x: 14%; --y: 74%; --d: -2.4s">🏺</span>
        <span style="--x: 84%; --y: 70%; --d: -3.6s">🪵</span>
        <span style="--x: 50%; --y: 6%; --d: -4.8s">✦</span>
      </div>

      <p class="eyebrow pop" style="--i: 0">❖ អំពីយើង ❖</p>
      <h1 class="title">
        <span class="pop" style="--i: 1">ប្រវត្តិរឿងរ៉ាវ</span>
        <span class="pop gold" style="--i: 2">និងបេសកកម្មរបស់យើង</span>
      </h1>
      <p class="lead pop" style="--i: 3">
        វេទិកា <strong>Khmer Handmade &amp; Souvenir (ខ្មែរសព្វសារពើ)</strong> បង្កើតឡើងដើម្បីលើកស្ទួយ
        សិប្បកម្ម ក្រមា គ្រឿងទេស និងផលិតផលសម្រស់ធម្មជាតិរបស់សហគមន៍ខ្មែរយើង។
      </p>
      <div class="hero-cta pop" style="--i: 4">
        <router-link to="/shop" class="btn gold-btn">ចូលមើលហាង →</router-link>
        <a href="#partners" class="btn ghost-btn">ស្គាល់ដៃគូសហការ ↓</a>
      </div>
    </section>

    <!-- ============ STATS ============ -->
    <section class="wrap">
      <div class="stats reveal" data-counter>
        <div v-for="(s, i) in stats" :key="s.label" class="stat" :style="{ '--i': i }">
          <strong>{{ s.value }}<em>{{ s.suffix }}</em></strong>
          <span>{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- ============ MISSION ============ -->
    <section class="wrap block">
      <div class="mission reveal">
        <div class="mission-text">
          <p class="eyebrow">❖ បេសកកម្ម</p>
          <h2>នាំស្នាដៃខ្មែរ ទៅដល់ដៃអ្នក</h2>
          <p>
            យើងប្តេជ្ញាចិត្តនាំយកស្នាដៃដ៏វិសេសវិសាលពីគ្រប់តំបន់ក្នុងព្រះរាជាណាចក្រកម្ពុជា
            មកកាន់ទីផ្សារឌីជីថល ដើម្បីជួយទ្រទ្រង់ជីវភាពប្រជាសហគមន៍ និងរក្សាទុកស្នាដៃបុរាណ។
          </p>
          <p>
            រាល់ការទិញរបស់អ្នក មិនមែនគ្រាន់តែជាការទទួលបានផលិតផលល្អនោះទេ
            ប៉ុន្តែជាការជួយបន្តវប្បធម៌ និងក្តីសង្ឃឹមរបស់គ្រួសារអ្នកផលិត។
          </p>
        </div>
        <div class="mission-art" aria-hidden="true">
          <div class="ring r1"></div>
          <div class="ring r2"></div>
          <span class="core">✦</span>
        </div>
      </div>
    </section>

    <!-- ============ CRAFT CATEGORIES ============ -->
    <section class="wrap block">
      <header class="sec-head reveal">
        <p class="eyebrow">❖ ប្រភេទសិប្បកម្ម</p>
        <h2>ស្វែងរកតាមប្រភេទសិប្បកម្ម</h2>
      </header>

      <div class="grid crafts">
        <router-link
          v-for="(c, i) in crafts"
          :key="c.title"
          :to="c.to"
          class="craft reveal"
          :style="{ '--i': i }"
        >
          <span class="craft-ico">{{ c.icon }}</span>
          <h3>{{ c.title }}</h3>
          <small>{{ c.kh }}</small>
          <p>{{ c.text }}</p>
          <span class="go">មើលផលិតផល →</span>
        </router-link>
      </div>
    </section>

    <!-- ============ PARTNERS ============ -->
    <section id="partners" class="wrap block">
      <header class="sec-head reveal">
        <p class="eyebrow">❖ ដៃគូសហការ</p>
        <h2>សហគមន៍សិប្បកម្មដៃគូរបស់យើង</h2>
        <p class="sub">ស្គាល់មុខមាត់អ្នកដែលនៅពីក្រោយផលិតផលនីមួយៗ។ ព័ត៌មានខាងក្រោមជាគំរូ។</p>
      </header>

      <div class="grid partners">
        <article
          v-for="(p, i) in partners"
          :key="p.name"
          class="partner reveal"
          :style="{ '--i': i }"
        >
          <div class="p-ico">{{ p.icon }}</div>
          <div class="p-body">
            <h3>{{ p.name }}</h3>
            <div class="tags">
              <span>🎨 {{ p.craft }}</span>
              <span>📍 {{ p.province }}</span>
            </div>
            <p class="members">👥 សមាជិក {{ p.members }} នាក់</p>
          </div>
          <span class="ribbon">ដៃគូ</span>
        </article>
      </div>

      <div class="join reveal">
        <div>
          <h3>ចង់ក្លាយជាដៃគូសហការ?</h3>
          <p>បើអ្នកជាអ្នកផលិត ឬតំណាងសហគមន៍ សូមទាក់ទងយើងដើម្បីដាក់ផលិតផលរបស់អ្នក។</p>
        </div>
        <router-link to="/support/contact" class="btn gold-btn">ទាក់ទងយើង</router-link>
      </div>
    </section>

    <!-- ============ VALUES ============ -->
    <section class="wrap block">
      <header class="sec-head reveal">
        <p class="eyebrow">❖ តម្លៃរបស់យើង</p>
        <h2>អ្វីដែលយើងជឿជាក់</h2>
      </header>
      <div class="grid values">
        <article v-for="(v, i) in values" :key="v.title" class="value reveal" :style="{ '--i': i }">
          <span class="v-ico">{{ v.icon }}</span>
          <h3>{{ v.title }}</h3>
          <p>{{ v.text }}</p>
        </article>
      </div>
    </section>

    <!-- ============ TIMELINE ============ -->
    <section class="wrap block">
      <header class="sec-head reveal">
        <p class="eyebrow">❖ ដំណើររបស់យើង</p>
        <h2>ពីគំនិត ដល់ការពិត</h2>
      </header>
      <ol class="timeline">
        <li v-for="(t, i) in timeline" :key="t.title" class="tl reveal" :style="{ '--i': i }">
          <span class="dot"></span>
          <div class="tl-card">
            <small>{{ t.year }}</small>
            <h3>{{ t.title }}</h3>
            <p>{{ t.text }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- ============ BACK ============ -->
    <section class="wrap end">
      <router-link to="/" class="btn gold-btn">← ត្រឡប់ទៅទំព័រដើម</router-link>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.story {
  --bg: #0d0b08;
  --panel: #15120d;
  --gold: #f5a623;
  --gold-soft: #fbb31c;
  --orange: #ff9800;
  --line: rgba(245, 166, 35, 0.22);
  --cream: #f6ead0;
  --muted: rgba(246, 234, 208, 0.7);
  --bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  position: relative;
  min-height: 100vh;
  padding: calc(var(--nav-h, 78px) + 30px) 0 80px;
  overflow: hidden;
  color: var(--cream);
  font-family: 'Kantumruy Pro', system-ui, sans-serif;
  background: var(--bg);
}

/* លំនាំពេជ្រខ្មែរ */
.pattern {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
  background-image:
    linear-gradient(45deg, rgba(245, 166, 35, 0.06) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(245, 166, 35, 0.06) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(245, 166, 35, 0.06) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(245, 166, 35, 0.06) 75%);
  background-size: 56px 56px;
  background-position: 0 0, 0 28px, 28px -28px, -28px 0;
  mask-image: linear-gradient(to bottom, #000, transparent 85%);
}
.glow { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; opacity: 0.28; animation: drift 16s ease-in-out infinite; }
.g1 { width: 380px; height: 380px; background: var(--gold); top: 40px; left: -140px; }
.g2 { width: 320px; height: 320px; background: #b45309; top: 620px; right: -120px; animation-delay: -7s; }
@keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -40px); } }

.wrap { position: relative; z-index: 1; max-width: 1060px; margin: 0 auto; padding: 0 20px; }
.block { padding-top: 76px; }

/* ================= Hero ================= */
.hero {
  position: relative; z-index: 1;
  max-width: 820px; margin: 0 auto; padding: 70px 20px 40px;
  text-align: center;
}
.floaters span {
  position: absolute; left: var(--x); top: var(--y);
  font-size: 34px; opacity: 0.55;
  animation: bob 5s ease-in-out infinite; animation-delay: var(--d);
  filter: drop-shadow(0 8px 14px rgba(245, 166, 35, 0.35));
}
@keyframes bob {
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-18px) rotate(6deg); }
}

.eyebrow { margin: 0 0 12px; font-size: 13px; letter-spacing: 0.12em; color: var(--gold-soft); }
.title { margin: 0 0 18px; display: grid; gap: 4px; font-size: clamp(30px, 5.5vw, 54px); line-height: 1.3; font-weight: 700; color: #fff; }
.title .gold {
  background: linear-gradient(110deg, #ffd27a, var(--gold) 45%, #ff8a00);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.lead { margin: 0 auto 28px; max-width: 640px; font-size: 16px; line-height: 2; color: var(--muted); }
.lead strong { color: var(--gold-soft); }
.hero-cta { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }

/* លោតចូលពេលបើកទំព័រ */
.pop { opacity: 0; animation: pop 0.8s var(--bounce) forwards; animation-delay: calc(var(--i, 0) * 140ms + 100ms); }
@keyframes pop {
  0% { opacity: 0; transform: translateY(40px) scale(0.85); }
  60% { opacity: 1; transform: translateY(-8px) scale(1.03); }
  100% { opacity: 1; transform: none; }
}

/* ================= Buttons ================= */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 13px 26px; font-size: 14.5px; font-weight: 700; text-decoration: none;
  border-radius: 14px; transition: transform 0.2s var(--bounce), box-shadow 0.2s, background 0.2s;
}
.gold-btn { color: #1b1206; background: linear-gradient(135deg, #ffc247, var(--orange)); box-shadow: 0 10px 26px rgba(255, 152, 0, 0.35); }
.gold-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 16px 34px rgba(255, 152, 0, 0.5); }
.ghost-btn { color: var(--gold-soft); border: 1px solid var(--line); background: rgba(245, 166, 35, 0.07); }
.ghost-btn:hover { transform: translateY(-3px); background: rgba(245, 166, 35, 0.16); }

/* ================= Scroll reveal ================= */
.reveal { opacity: 0; transform: translateY(46px) scale(0.92); }
.reveal.in { animation: pop 0.85s var(--bounce) forwards; animation-delay: calc(var(--i, 0) * 110ms); }

/* ================= Stats ================= */
.stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; overflow: hidden;
  background: var(--line); border: 1px solid var(--line); border-radius: 22px;
}
.stat { padding: 26px 12px; text-align: center; background: var(--panel); }
.stat strong { display: block; font-size: clamp(28px, 4vw, 40px); font-weight: 700; color: var(--gold-soft); line-height: 1.2; }
.stat em { font-style: normal; color: var(--orange); }
.stat span { font-size: 13px; color: var(--muted); }

/* ================= Section heads ================= */
.sec-head { margin-bottom: 28px; }
.sec-head h2, .mission h2 { margin: 0; font-size: clamp(24px, 3.4vw, 34px); color: #fff; line-height: 1.4; }
.sub { margin: 10px 0 0; font-size: 14px; color: var(--muted); }

.grid { display: grid; gap: 18px; }

/* ================= Mission ================= */
.mission {
  display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 30px; align-items: center;
  padding: 36px; background: var(--panel); border: 1px solid var(--line); border-radius: 28px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}
.mission-text p { margin: 14px 0 0; font-size: 15px; line-height: 2; color: var(--muted); }
.mission-art { position: relative; display: grid; place-items: center; aspect-ratio: 1; max-width: 240px; margin: 0 auto; width: 100%; }
.ring { position: absolute; border-radius: 50%; border: 1px dashed rgba(245, 166, 35, 0.45); }
.r1 { inset: 0; animation: spin 30s linear infinite; }
.r2 { inset: 22%; border-style: solid; border-color: rgba(245, 166, 35, 0.3); animation: spin 20s linear infinite reverse; }
@keyframes spin { to { transform: rotate(360deg); } }
.core {
  position: relative; display: grid; place-items: center; width: 82px; height: 82px; font-size: 36px;
  color: #1b1206; border-radius: 24px; transform: rotate(45deg);
  background: linear-gradient(135deg, #ffc247, var(--orange));
  box-shadow: 0 0 40px rgba(255, 152, 0, 0.55);
  animation: pulse 3s ease-in-out infinite;
}
.core::before { content: ''; }
@keyframes pulse { 0%, 100% { transform: rotate(45deg) scale(1); } 50% { transform: rotate(45deg) scale(1.1); } }

/* ================= Crafts ================= */
.crafts { grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); }
.craft {
  position: relative; display: block; padding: 26px 22px; text-decoration: none; color: inherit; overflow: hidden;
  background: var(--panel); border: 1px solid var(--line); border-radius: 22px;
  transition: transform 0.3s var(--bounce), border-color 0.2s, box-shadow 0.3s;
}
.craft::after {
  content: ''; position: absolute; inset: auto -30% -60% -30%; height: 80%;
  background: radial-gradient(closest-side, rgba(245, 166, 35, 0.22), transparent);
  opacity: 0; transition: opacity 0.3s;
}
.craft:hover { transform: translateY(-10px) rotate(-0.6deg); border-color: rgba(245, 166, 35, 0.7); box-shadow: 0 26px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(245, 166, 35, 0.25); }
.craft:hover::after { opacity: 1; }
.craft-ico {
  display: grid; place-items: center; width: 60px; height: 60px; margin-bottom: 16px; font-size: 30px;
  border-radius: 18px; background: rgba(245, 166, 35, 0.14); border: 1px solid var(--line);
  transition: transform 0.4s var(--bounce);
}
.craft:hover .craft-ico { transform: scale(1.2) rotate(-10deg); }
.craft h3 { margin: 0; font-size: 18px; color: #fff; }
.craft small { display: block; margin: 2px 0 10px; color: var(--gold-soft); font-size: 13px; }
.craft p { margin: 0 0 16px; font-size: 13.5px; line-height: 1.85; color: var(--muted); }
.go { position: relative; z-index: 1; font-size: 13px; font-weight: 700; color: var(--gold-soft); }

/* ================= Partners ================= */
.partners { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.partner {
  position: relative; display: flex; gap: 16px; align-items: center; padding: 22px; overflow: hidden;
  background: var(--panel); border: 1px solid var(--line); border-radius: 22px;
  transition: transform 0.3s var(--bounce), border-color 0.2s, box-shadow 0.3s;
}
.partner:hover { transform: translateY(-8px) scale(1.02); border-color: rgba(245, 166, 35, 0.7); box-shadow: 0 24px 46px rgba(0, 0, 0, 0.5); }
.p-ico {
  flex-shrink: 0; display: grid; place-items: center; width: 66px; height: 66px; font-size: 32px;
  border-radius: 20px; background: linear-gradient(135deg, rgba(245, 166, 35, 0.28), rgba(180, 83, 9, 0.2));
  border: 1px solid var(--line); animation: bob 5s ease-in-out infinite;
}
.partner:nth-child(2n) .p-ico { animation-delay: -1.5s; }
.partner:nth-child(3n) .p-ico { animation-delay: -3s; }
.p-body h3 { margin: 0 0 8px; font-size: 16.5px; color: #fff; line-height: 1.5; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
.tags span { padding: 3px 10px; font-size: 12px; color: var(--cream); background: rgba(245, 166, 35, 0.1); border: 1px solid var(--line); border-radius: 99px; }
.members { margin: 0; font-size: 12.5px; color: var(--muted); }
.ribbon {
  position: absolute; top: 14px; right: -30px; width: 100px; padding: 2px 0; text-align: center;
  font-size: 11px; font-weight: 700; color: #1b1206; background: linear-gradient(135deg, #ffc247, var(--orange));
  transform: rotate(40deg);
}

.join {
  display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;
  margin-top: 28px; padding: 26px 30px;
  background: linear-gradient(135deg, rgba(245, 166, 35, 0.16), rgba(180, 83, 9, 0.12));
  border: 1px solid rgba(245, 166, 35, 0.4); border-radius: 22px;
}
.join h3 { margin: 0 0 4px; font-size: 19px; color: #fff; }
.join p { margin: 0; font-size: 14px; color: var(--muted); }

/* ================= Values ================= */
.values { grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); }
.value { padding: 24px; background: var(--panel); border: 1px solid var(--line); border-radius: 20px; transition: transform 0.3s var(--bounce), border-color 0.2s; }
.value:hover { transform: translateY(-6px); border-color: rgba(245, 166, 35, 0.6); }
.v-ico { display: inline-grid; place-items: center; width: 50px; height: 50px; margin-bottom: 12px; font-size: 24px; border-radius: 14px; background: rgba(245, 166, 35, 0.14); }
.value h3 { margin: 0 0 6px; font-size: 16.5px; color: #fff; }
.value p { margin: 0; font-size: 13.5px; line-height: 1.85; color: var(--muted); }

/* ================= Timeline ================= */
.timeline { position: relative; list-style: none; margin: 0; padding: 0 0 0 30px; display: grid; gap: 22px; }
.timeline::before { content: ''; position: absolute; left: 8px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(to bottom, var(--gold), transparent); }
.tl { position: relative; }
.dot { position: absolute; left: -30px; top: 22px; width: 18px; height: 18px; background: var(--gold); border: 3px solid var(--bg); border-radius: 4px; transform: rotate(45deg); box-shadow: 0 0 14px rgba(245, 166, 35, 0.7); }
.tl-card { padding: 20px 24px; background: var(--panel); border: 1px solid var(--line); border-radius: 18px; transition: transform 0.3s var(--bounce), border-color 0.2s; }
.tl-card:hover { transform: translateX(8px); border-color: rgba(245, 166, 35, 0.6); }
.tl-card small { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--gold-soft); }
.tl-card h3 { margin: 4px 0 6px; font-size: 17px; color: #fff; }
.tl-card p { margin: 0; font-size: 14px; line-height: 1.85; color: var(--muted); }

.end { padding-top: 70px; text-align: center; }

/* ================= Responsive ================= */
@media (max-width: 820px) {
  .mission { grid-template-columns: 1fr; padding: 26px; }
  .mission-art { max-width: 180px; order: -1; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .floaters span { font-size: 26px; }
}

/* គោរពអ្នកដែលបិទ animation */
@media (prefers-reduced-motion: reduce) {
  .pop, .reveal, .reveal.in { animation: none !important; opacity: 1 !important; transform: none !important; }
  .floaters span, .glow, .ring, .core, .p-ico { animation: none !important; }
}
</style>