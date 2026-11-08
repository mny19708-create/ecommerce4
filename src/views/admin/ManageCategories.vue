<!-- src/views/admin/ManageCategories.vue -->
<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6 font-khmer bg-[#0D0B08] min-h-screen text-amber-50">
    
    <!-- Top Header & Add Button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-600/20 pb-6">
      <div>
        <p class="text-xs text-amber-400 tracking-wider mb-1">❖ ការគ្រប់គ្រងមាតិកា</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">គ្រប់គ្រងប្រភេទផលិតផល (Categories)</h1>
      </div>
      <button 
        @click="openAddModal"
        class="bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-600/20 transition active:scale-95 flex items-center justify-center gap-2"
      >
        <span>+ បន្ថែមប្រភេទថ្មី</span>
      </button>
    </div>

    <!-- Alert / Error message -->
    <div v-if="errorMsg" class="bg-red-950/60 border border-red-500/40 text-red-300 p-3.5 rounded-xl text-xs">
      {{ errorMsg }}
    </div>

    <!-- Categories Table / Card Grid -->
    <div class="bg-[#15120D] border border-amber-600/30 rounded-2xl shadow-xl overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-amber-950/40 border-b border-amber-600/25 text-[11px] uppercase text-amber-200/70 font-semibold">
            <th class="p-4">លេខរៀង (ID)</th>
            <th class="p-4">ឈ្មោះប្រភេទ (Category Name)</th>
            <th class="p-4">ការពិពណ៌នា (Description)</th>
            <th class="p-4 text-right">សកម្មភាព (Actions)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-amber-600/10 text-xs sm:text-sm text-amber-100">
          <tr v-for="cat in categories" :key="cat.category_id || cat.id" class="hover:bg-amber-500/5 transition">
            <td class="p-4 font-mono text-amber-400 font-bold">#{{ cat.category_id || cat.id }}</td>
            <td class="p-4 font-bold text-white">{{ cat.category_name || cat.name }}</td>
            <td class="p-4 text-amber-200/70 max-w-md truncate">{{ cat.description || '-' }}</td>
            <td class="p-4 text-right space-x-3">
              <button @click="openEditModal(cat)" class="text-amber-400 font-semibold hover:underline">កែប្រែ</button>
              <button @click="deleteCategory(cat.category_id || cat.id)" class="text-red-400 font-semibold hover:underline">លុប</button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="4" class="text-center py-10 text-amber-200/50">មិនទាន់មានប្រភេទផលិតផលនៅឡើយទេ</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL POPUP FOR ADD/EDIT -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-[#15120D] border border-amber-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-amber-50 space-y-5">
        
        <div class="flex items-center justify-between border-b border-amber-600/30 pb-3">
          <h3 class="font-bold text-lg text-amber-400">
            {{ isEditing ? 'កែប្រែប្រភេទផលិតផល' : 'បន្ថែមប្រភេទផលិតផលថ្មី' }}
          </h3>
          <button @click="closeModal" class="text-amber-300/60 hover:text-white text-lg">✕</button>
        </div>

        <form @submit.prevent="saveCategory" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-amber-200/80 mb-1">ឈ្មោះប្រភេទ *</label>
            <input 
              type="text" 
              v-model.trim="form.name"
              placeholder="ឧ. Crafts & Krama" 
              class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none transition"
              required 
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-amber-200/80 mb-1">ការពិពណ៌នា</label>
            <textarea 
              v-model.trim="form.description"
              placeholder="ពិពណ៌នាអំពីប្រភេទផលិតផលនេះ..." 
              rows="3"
              class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 rounded-xl p-3 text-sm text-amber-50 outline-none transition resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              @click="closeModal" 
              class="px-4 py-2.5 rounded-xl text-xs font-semibold border border-amber-600/30 text-amber-200 hover:bg-amber-500/10 transition"
            >
              បោះបង់
            </button>
            <button 
              type="submit" 
              class="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110 transition shadow-md"
            >
              រក្សាទុក
            </button>
          </div>
        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/services/api'
import { toCategory, unwrapList } from '@/services/Normalizers.js'

const categories = ref([])
const errorMsg = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const currentId = ref(null)

const form = reactive({
  name: '',
  description: ''
})

// ទាញយកទិន្នន័យ Category ពី Backend (Laravel API / PostgreSQL)
const fetchCategories = async () => {
  try {
    errorMsg.value = ''
    const res = await api.get('/categories')
    const rawList = unwrapList(res)
    categories.value = rawList.map(toCategory)
  } catch (err) {
    console.error('Error fetching categories:', err)
    errorMsg.value = 'មិនអាចទាញយកទិន្នន័យ Category បានទេ! (កំពុងប្រើប្រាស់ទិន្នន័យបណ្តោះអាសន្ន)'
    
    // Fallback Mock data ស្របតាម Sitemap របស់អ្នកបើ Server មិនទាន់ដំណើរការ[cite: 7]
    categories.value = [
      { id: 1, name: 'Crafts & Krama', description: 'ក្រមា សូត្រ និងសិប្បកម្មធ្វើដោយដៃ' },
      { id: 2, name: 'Food & Spices', description: 'ម្រេចកំពត ស្ករត្នោត និងគ្រឿងទេសខ្មែរ' },
      { id: 3, name: 'Health & Beauty', description: 'ផលិតផលធម្មជាតិសម្រាប់សុខភាព និងសម្រស់' },
      { id: 4, name: 'Souvenir Gift Sets', description: 'កញ្ចប់អំណោយពិសេសពីកម្ពុជា' }
    ]
  }
}

onMounted(() => {
  fetchCategories()
})

const openAddModal = () => {
  isEditing.value = false
  currentId.value = null
  form.name = ''
  form.description = ''
  showModal.value = true
}

const openEditModal = (cat) => {
  isEditing.value = true
  currentId.value = cat.category_id || cat.id
  form.name = cat.category_name || cat.name
  form.description = cat.description || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveCategory = async () => {
  try {
    if (isEditing.value) {
      // ហៅ API កែប្រែ (PUT /api/categories/{id})
      await api.put(`/categories/${currentId.value}`, {
        category_name: form.name,
        description: form.description
      })
    } else {
      // ហៅ API បន្ថែមថ្មី (POST /api/categories)
      await api.post('/categories', {
        category_name: form.name,
        description: form.description
      })
    }
    closeModal()
    fetchCategories()
  } catch (err) {
    console.error('Error saving category:', err)
    // សម្រាប់ការធ្វើ Front-end Mock បណ្តោះអាសន្ន
    if (isEditing.value) {
      const index = categories.value.findIndex(c => (c.category_id || c.id) === currentId.value)
      if (index !== -1) {
        categories.value[index].name = form.name
        categories.value[index].description = form.description
      }
    } else {
      categories.value.push({
        id: Date.now(),
        name: form.name,
        description: form.description
      })
    }
    closeModal()
  }
}

const deleteCategory = async (id) => {
  if (!confirm('តើអ្នកពិតជាចង់លុបប្រភេទផលិតផលនេះមែនទេ?')) return
  try {
    await api.delete(`/categories/${id}`)
    categories.value = categories.value.filter(c => (c.category_id || c.id) !== id)
  } catch (err) {
    console.error('Error deleting category:', err)
    categories.value = categories.value.filter(c => (c.category_id || c.id) !== id)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>