<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6 font-khmer bg-[#0f172a] min-h-screen text-slate-100">
    <!-- Header -->
    <div class="border-b border-slate-800 pb-4">
      <h1 class="text-2xl font-black tracking-wide text-amber-400 flex items-center gap-2">
        <span>⚙️</span> ការកំណត់ប្រព័ន្ធ (Settings)
      </h1>
      <p class="text-xs text-slate-400 mt-1">កំណត់ព័ត៌មានហាង, គណនី Admin, Payment, និង Shipping Gateway ឱ្យបានត្រឹមត្រូវ</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Settings Menu -->
      <div class="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl space-y-2 h-fit">
        <button 
          v-for="s in settingsMenu" 
          :key="s.id"
          @click="activeMenu = s.id"
          class="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-3"
          :class="activeMenu === s.id 
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/5 font-bold' 
            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'"
        >
          <span class="text-base">{{ s.icon }}</span>
          <span>{{ s.label }}</span>
        </button>
      </div>

      <!-- Settings Content -->
      <div class="md:col-span-2 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
        
        <!-- Store Info Section -->
        <div v-if="activeMenu === 'store'" class="space-y-4">
          <h2 class="text-lg font-bold text-amber-400 border-b border-slate-800 pb-3 flex items-center gap-2">
            🏪 ព័ត៌មានហាង (Store Info)
          </h2>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">ឈ្មោះហាង</label>
            <input 
              type="text" 
              value="ខ្មែរសព្វសារពើ (Khmer Handmade & Souvenir)" 
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition" 
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">លេខទូរស័ព្ទទំនាក់ទំនង</label>
            <input 
              type="text" 
              value="+855 12 345 678" 
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition" 
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">អាសយដ្ឋាន</label>
            <textarea 
              rows="2" 
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition"
            >រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា</textarea>
          </div>
          <div class="pt-2">
            <button class="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm hover:from-amber-400 hover:to-amber-500 transition shadow-lg shadow-amber-500/20">
              រក្សាទុកការផ្លាស់ប្តូរ
            </button>
          </div>
        </div>

        <!-- Admin Profile Section -->
        <div v-else-if="activeMenu === 'profile'" class="space-y-4">
          <h2 class="text-lg font-bold text-amber-400 border-b border-slate-800 pb-3">
            👤 ប្រវត្តិរូប Admin
          </h2>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">ឈ្មោះអ្នកប្រើប្រាស់</label>
            <input type="text" value="Ma Ny (Lead PM)" class="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">អ៊ីមែល</label>
            <input type="email" value="admin@khmerhandmade.com" class="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
          <button class="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm hover:from-amber-400 transition shadow-lg shadow-amber-500/20">
            អាប់ដេតប្រវត្តិរូប
          </button>
        </div>

        <!-- Roles & Permissions Section -->
        <div v-else-if="activeMenu === 'roles'" class="space-y-4">
          <h2 class="text-lg font-bold text-amber-400 border-b border-slate-800 pb-3">
            🔑 គ្រប់គ្រងសិទ្ធិប្រើប្រាស់ (Users & Roles)
          </h2>
          <p class="text-xs text-slate-400">កំណត់សិទ្ធិប្រព័ន្ធសម្រាប់ Owner, Manager, Content Editor, និង Fulfillment Staff។</p>
          <div class="p-4 bg-slate-950/40 rounded-xl border border-slate-800 text-sm text-slate-300">
            <span class="text-amber-400 font-bold">កម្រិតសិទ្ធិបច្ចុប្បន្ន:</span> Super Administrator (Full Access)
          </div>
        </div>

        <!-- Payment Gateway Section -->
        <div v-else-if="activeMenu === 'payment'" class="space-y-4">
          <h2 class="text-lg font-bold text-amber-400 border-b border-slate-800 pb-3">
            💳 ការកំណត់ទូទាត់ប្រាក់ (Payment Gateway)
          </h2>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">KHQR Merchant ID</label>
            <input type="text" value="KH123456789ABC" class="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
          <div class="flex items-center gap-2 pt-2">
            <input type="checkbox" checked class="rounded border-slate-800 text-amber-500 focus:ring-amber-500 bg-slate-950" />
            <span class="text-xs text-slate-300">បើកដំណើរការ KHQR Auto-Verification</span>
          </div>
          <button class="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm hover:from-amber-400 transition shadow-lg shadow-amber-500/20">
            រក្សាទុកការកំណត់
          </button>
        </div>

        <!-- Shipping Gateway Section -->
        <div v-else-if="activeMenu === 'shipping'" class="space-y-4">
          <h2 class="text-lg font-bold text-amber-400 border-b border-slate-800 pb-3">
            🚚 ការកំណត់ដឹកជញ្ជូន (Shipping Gateway)
          </h2>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">ថ្លៃសេវាដឹកជញ្ជូនស្តង់ដារ ($)</label>
            <input type="number" value="1.50" class="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
          <button class="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm hover:from-amber-400 transition shadow-lg shadow-amber-500/20">
            រក្សាទុក
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeMenu = ref('store')
const settingsMenu = [
  { id: 'store', label: 'ព័ត៌មានហាង (Store Info)', icon: '🏪' },
  { id: 'profile', label: 'ប្រវត្តិរូប Admin', icon: '👤' },
  { id: 'roles', label: 'សិទ្ធិប្រើប្រាស់ (Roles)', icon: '🔑' },
  { id: 'payment', label: 'ការកំណត់ទូទាត់ប្រាក់', icon: '💳' },
  { id: 'shipping', label: 'ការកំណត់ដឹកជញ្ជូន', icon: '🚚' }
]
</script>