<template>
  <!-- Teleported to <body>: the navbar has backdrop-blur, which would trap a fixed overlay inside it -->
  <Teleport to="body">
    <Transition name="search">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] font-khmer"
        role="dialog"
        aria-modal="true"
        aria-label="ស្វែងរកផលិតផល"
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>

        <div
          class="search-panel relative mx-auto mt-3 sm:mt-20 w-[calc(100%-1.5rem)] max-w-2xl bg-[#15120D] border border-amber-600/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <!-- Input row -->
          <div class="flex items-center gap-3 px-4 border-b border-amber-600/20">
            <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              autocomplete="off"
              placeholder="ស្វែងរកផលិតផល... (ឧ. ម្រេច, សាប៊ូ, ក្រមា)"
              class="flex-1 bg-transparent py-4 text-sm text-amber-50 placeholder-amber-200/40 focus:outline-none"
              @keydown.down.prevent="move(1)"
              @keydown.up.prevent="move(-1)"
              @keydown.enter.prevent="openActive"
            />
            <button
              v-if="query"
              type="button"
              class="text-xs text-amber-200/60 hover:text-amber-300 px-2 py-1 rounded-lg"
              @click="query = ''; inputRef && inputRef.focus()"
            >
              សម្អាត
            </button>
            <button
              type="button"
              class="text-[11px] text-amber-200/70 border border-amber-600/30 rounded-md px-2 py-1 hover:text-amber-300 hover:border-amber-500/60"
              @click="close"
            >
              Esc
            </button>
          </div>

          <div class="max-h-[65vh] overflow-y-auto">
            <!-- Results -->
            <template v-if="q">
              <ul v-if="results.length" class="p-2" role="listbox">
                <li v-for="(p, i) in results" :key="p.id" role="option" :aria-selected="i === active">
                  <button
                    type="button"
                    class="w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors"
                    :class="i === active ? 'bg-amber-600/20' : 'hover:bg-amber-600/10'"
                    @mouseenter="active = i"
                    @click="go(p)"
                  >
                    <div class="w-14 h-14 rounded-lg overflow-hidden bg-amber-950/60 border border-amber-600/20 shrink-0 flex items-center justify-center text-xl">
                      <img v-if="p.image" :src="p.image" :alt="p.name" class="w-full h-full object-cover" />
                      <span v-else>{{ CATEGORY_EMOJI[p.category] || '🛍️' }}</span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-semibold text-amber-50 truncate">{{ p.name }}</p>
                      <p class="text-[11px] text-amber-200/60 truncate">
                        {{ CATEGORY_LABEL[p.category] || p.category }}
                      </p>
                    </div>
                    <span class="text-sm font-bold text-amber-400 shrink-0">${{ Number(p.price || 0).toFixed(2) }}</span>
                  </button>
                </li>
              </ul>

              <div v-else class="px-6 py-12 text-center">
                <p class="text-3xl mb-2">🔎</p>
                <p class="text-sm text-amber-100">រកមិនឃើញ “{{ query }}”</p>
                <p class="text-xs text-amber-200/50 mt-1">សូមសាកល្បងពាក្យផ្សេង ឬមើលប្រភេទខាងក្រោម</p>
                <div class="mt-5 flex flex-wrap justify-center gap-2">
                  <router-link
                    v-for="c in QUICK_LINKS"
                    :key="c.to"
                    :to="c.to"
                    class="chip"
                    @click="close"
                  >{{ c.label }}</router-link>
                </div>
              </div>
            </template>

            <!-- Empty state: suggestions -->
            <div v-else class="p-4 space-y-5">
              <div>
                <p class="text-[11px] font-semibold text-amber-500/80 mb-2">ប្រភេទផលិតផល</p>
                <div class="flex flex-wrap gap-2">
                  <router-link
                    v-for="c in QUICK_LINKS"
                    :key="c.to"
                    :to="c.to"
                    class="chip"
                    @click="close"
                  >{{ c.label }}</router-link>
                </div>
              </div>

              <div v-if="popular.length">
                <p class="text-[11px] font-semibold text-amber-500/80 mb-2">ផលិតផលពេញនិយម</p>
                <ul>
                  <li v-for="p in popular" :key="p.id">
                    <button
                      type="button"
                      class="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left hover:bg-amber-600/10 transition-colors"
                      @click="go(p)"
                    >
                      <span class="text-sm text-amber-100 truncate">{{ p.name }}</span>
                      <span class="text-sm font-bold text-amber-400 shrink-0">${{ Number(p.price || 0).toFixed(2) }}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'

const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const productStore = useProductStore()

const query = ref('')
const active = ref(0)
const inputRef = ref(null)

const CATEGORY_LABEL = {
  'souvenir-gift-sets': 'កញ្ចប់កាដូ',
  'health-beauty': 'សុខភាព និងសម្រស់',
  'food-spices': 'អាហារ និងគ្រឿងទេស',
  'crafts-krama': 'ក្រមា និងសិប្បកម្ម'
}
const CATEGORY_EMOJI = {
  'souvenir-gift-sets': '🎁',
  'health-beauty': '🌿',
  'food-spices': '🌶️',
  'crafts-krama': '🧵'
}
// Route names from your router
const DETAIL_ROUTE = {
  'souvenir-gift-sets': 'SouvenirGiftSetDetail',
  'health-beauty': 'HealthBeautyDetail',
  'food-spices': 'FoodSpicesDetail'
}
const QUICK_LINKS = [
  { label: 'ក្រមា និងសិប្បកម្ម', to: '/category/crafts-krama' },
  { label: 'អាហារ និងគ្រឿងទេស', to: '/category/food-spices' },
  { label: 'សុខភាព និងសម្រស់', to: '/category/health-beauty' },
  { label: 'កញ្ចប់កាដូ', to: '/category/souvenir-gift-sets' }
]

const norm = (s) => String(s ?? '').toLowerCase()
const q = computed(() => norm(query.value).trim())

const results = computed(() => {
  if (!q.value) return []
  const terms = q.value.split(/\s+/).filter(Boolean)
  return productStore.products
    .filter((p) => {
      const hay = norm([p.name, p.description, p.tag, p.category, CATEGORY_LABEL[p.category]].join(' '))
      return terms.every((t) => hay.includes(t))
    })
    .slice(0, 8)
})

const popular = computed(() => productStore.products.slice(0, 4))

watch(results, () => { active.value = 0 })

function close() {
  emit('update:modelValue', false)
}

function move(step) {
  if (!results.value.length) return
  active.value = (active.value + step + results.value.length) % results.value.length
}

function go(product) {
  const name = DETAIL_ROUTE[product.category]
  router.push(name ? { name, params: { id: product.id } } : '/products')
  close()
}

function openActive() {
  const p = results.value[active.value]
  if (p) go(p)
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      query.value = ''
      active.value = 0
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
      if (!productStore.products.length && typeof productStore.fetchProducts === 'function') {
        productStore.fetchProducts()
      }
      await nextTick()
      inputRef.value && inputRef.value.focus()
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeydown)
    }
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }

.chip {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  font-size: 0.75rem;
  color: rgba(254, 243, 199, 0.85);
  border: 1px solid rgba(217, 119, 6, 0.4);
  border-radius: 999px;
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease;
}
.chip:hover { background: #f59e0b; color: #1c1408; border-color: #f59e0b; }

.search-enter-active,
.search-leave-active { transition: opacity 200ms ease; }
.search-enter-active .search-panel,
.search-leave-active .search-panel { transition: transform 250ms ease, opacity 200ms ease; }
.search-enter-from,
.search-leave-to { opacity: 0; }
.search-enter-from .search-panel,
.search-leave-to .search-panel { transform: translateY(-14px) scale(0.98); opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .search-enter-active,
  .search-leave-active,
  .search-enter-active .search-panel,
  .search-leave-active .search-panel { transition: none; }
}
</style>