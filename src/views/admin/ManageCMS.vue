<!-- src/views/admin/ManageCMS.vue -->
<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6 font-khmer bg-[#0D0B08] min-h-screen text-amber-50">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-600/20 pb-6">
      <div>
        <p class="text-xs text-amber-400 tracking-wider mb-1">❖ ការគ្រប់គ្រងមាតិកា</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">គ្រប់គ្រងមាតិកាគេហទំព័រ (CMS)</h1>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="saveAllChanges"
          :disabled="loading"
          class="bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-600/20 transition active:scale-95 disabled:opacity-60 flex items-center gap-2"
        >
          <span>{{ loading ? 'កំពុងរក្សាទុក...' : 'រក្សាទុកការផ្លាស់ប្តូរ' }}</span>
        </button>
      </div>
    </div>

    <!-- Alert Message -->
    <div v-if="message.text" :class="message.isSuccess ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border-red-500/40 text-red-300'" class="p-3.5 rounded-xl border text-xs">
      {{ message.text }}
    </div>

    <!-- Tabs Navigation -->
    <div class="flex gap-2 border-b border-amber-600/20 overflow-x-auto pb-px">
      <button 
        v-for="t in tabs" 
        :key="t.id"
        @click="activeTab = t.id"
        class="px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors relative"
        :class="activeTab === t.id ? 'text-amber-400 font-bold' : 'text-amber-100/60 hover:text-amber-300'"
      >
        {{ t.label }}
        <span class="absolute left-0 -bottom-px h-[2px] bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300" :class="activeTab === t.id ? 'w-full' : 'w-0'"></span>
      </button>
    </div>

    <!-- Tab 1: Hero Banner -->
    <div v-if="activeTab === 'hero'" class="bg-[#15120D] border border-amber-600/30 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
      <h2 class="text-base font-bold text-white flex items-center gap-2"><span class="text-amber-500 text-xs">❖</span> កែសម្រួល Hero Banner</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-amber-200/80 mb-1">ចំណងជើងធំ (Main Title)</label>
          <input type="text" v-model="cms.hero.title" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-amber-200/80 mb-1">អត្ថបទរង (Subtitle)</label>
          <textarea v-model="cms.hero.subtitle" rows="3" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none resize-none"></textarea>
        </div>
        <div>
          <label class="block text-xs font-medium text-amber-200/80 mb-1">តំណភ្ជាប់រូបភាព Banner (Image URL)</label>
          <input type="text" v-model="cms.hero.image" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none" />
        </div>
      </div>
    </div>

    <!-- Tab 2: Our Story -->
    <div v-if="activeTab === 'story'" class="bg-[#15120D] border border-amber-600/30 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
      <h2 class="text-base font-bold text-white flex items-center gap-2"><span class="text-amber-500 text-xs">❖</span> រឿងរ៉ាវរបស់យើង (Our Story)</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-amber-200/80 mb-1">ចំណងជើងរឿង</label>
          <input type="text" v-model="cms.story.title" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-amber-200/80 mb-1">ខ្លឹមសារលម្អិត</label>
          <textarea v-model="cms.story.content" rows="6" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none resize-none"></textarea>
        </div>
      </div>
    </div>

    <!-- Tab 3: FAQs -->
    <div v-if="activeTab === 'faqs'" class="bg-[#15120D] border border-amber-600/30 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
      <div class="flex justify-between items-center">
        <h2 class="text-base font-bold text-white flex items-center gap-2"><span class="text-amber-500 text-xs">❖</span> សំណួរដែលសួរញឹកញាប់ (FAQs)</h2>
        <button @click="addFaq" class="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl hover:bg-amber-500/20 transition">+ បន្ថែមសំណួរ</button>
      </div>

      <div class="space-y-4">
        <div v-for="(faq, index) in cms.faqs" :key="index" class="bg-[#0D0B08] border border-amber-600/20 p-4 rounded-xl space-y-3 relative">
          <button @click="removeFaq(index)" class="absolute top-3 right-3 text-red-400 hover:text-red-300 text-xs">លុប</button>
          <div>
            <label class="block text-[11px] text-amber-200/70 mb-1">សំណួរទី {{ index + 1 }}</label>
            <input type="text" v-model="faq.question" class="w-full bg-[#15120D] border border-amber-600/30 rounded-lg p-2.5 text-xs text-amber-50 outline-none" />
          </div>
          <div>
            <label class="block text-[11px] text-amber-200/70 mb-1">ចម្លើយ</label>
            <textarea v-model="faq.answer" rows="2" class="w-full bg-[#15120D] border border-amber-600/30 rounded-lg p-2.5 text-xs text-amber-50 outline-none resize-none"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 4: Policies -->
    <div v-if="activeTab === 'policy'" class="bg-[#15120D] border border-amber-600/30 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
      <h2 class="text-base font-bold text-white flex items-center gap-2"><span class="text-amber-500 text-xs">❖</span> គោលការណ៍ដឹកជញ្ជូន និងបង្វិលសង (Shipping & Returns Policy)</h2>
      
      <div>
        <label class="block text-xs font-medium text-amber-200/80 mb-1">ខ្លឹមសារគោលការណ៍</label>
        <textarea v-model="cms.policy" rows="8" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none resize-none"></textarea>
      </div>
    </div>

    <!-- Tab 5: Contact Info -->
    <div v-if="activeTab === 'contact'" class="bg-[#15120D] border border-amber-600/30 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
      <h2 class="text-base font-bold text-white flex items-center gap-2"><span class="text-amber-500 text-xs">❖</span> ព័ត៌មានទំនាក់ទំនងហាង (Contact Us Info)</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-amber-200/80 mb-1">លេខទូរស័ព្ទ</label>
          <input type="text" v-model="cms.contact.phone" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-amber-200/80 mb-1">អ៊ីមែលហាង</label>
          <input type="email" v-model="cms.contact.email" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-medium text-amber-200/80 mb-1">អាសយដ្ឋានហាង</label>
          <textarea v-model="cms.contact.address" rows="2" class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none resize-none"></textarea>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/services/api'

const activeTab = ref('hero')
const loading = ref(false)
const message = reactive({ text: '', isSuccess: false })

const tabs = [
  { id: 'hero', label: 'Hero Banner' },
  { id: 'story', label: 'Our Story' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'policy', label: 'Shipping Policy' },
  { id: 'contact', label: 'Contact Us' }
]

const cms = reactive({
  hero: {
    title: 'ផលិតផលសិប្បកម្មខ្មែរប្រណីត និងសហគមន៍',
    subtitle: 'គាំទ្រស្នាដៃធ្វើដោយដៃពីសិប្បករខ្មែរទូទាំងប្រទេស',
    image: '/hero-bg.jpg'
  },
  story: {
    title: 'ប្រវត្តិ និងបេសកកម្មរបស់យើង',
    content: 'វេទិកា Khmer Handmade ត្រូវបានបង្កើតឡើងដើម្បីលើកកម្ពស់ និងពង្រីកទីផ្សារសិប្បកម្មខ្មែរ...'
  },
  faqs: [
    { question: 'តើផលិតផលទាំងអស់ធ្វើដោយដៃពិតៗដែរឬទេ?', answer: 'បាទ/ចាស! ផលិតផលទាំងអស់គឺធ្វើដោយដៃផ្ទាល់ពីសិប្បករមូលដ្ឋាន។' }
  ],
  policy: 'ការដឹកជញ្ជូនក្នុងរាជធានីភ្នំពេញប្រើពេល ១-២ថ្ងៃ និងខេត្តក្រុង ២-៤ថ្ងៃ។',
  contact: {
    phone: '+855 12 345 678',
    email: 'info@khmerhandmade.com',
    address: 'ផ្ទះលេខ ១២៣, ផ្លូវព្រះមុនីវង្ស, រាជធានីភ្នំពេញ'
  }
})

const addFaq = () => {
  cms.faqs.push({ question: '', answer: '' })
}

const removeFaq = (index) => {
  cms.faqs.splice(index, 1)
}

const saveAllChanges = async () => {
  loading.value = true
  message.text = ''

  try {
    // ហៅ API បញ្ជូនទិន្នន័យ CMS ទៅកាន់ Laravel Backend (POST /api/admin/cms)
    await api.post('/admin/cms', cms)
    message.isSuccess = true
    message.text = 'រក្សាទុកមាតិកាគេហទំព័របានដោយជោគជ័យ!'
  } catch (err) {
    console.error('Error saving CMS content:', err)
    message.isSuccess = false
    message.text = 'មិនអាចរក្សាទុកទិន្នន័យបានទេ! (កំពុងរក្សាទុកក្នុង Local State)'
  } finally {
    loading.value = false
    setTimeout(() => { message.text = '' }, 4000)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>