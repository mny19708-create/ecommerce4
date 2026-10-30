<!-- src/views/admin/Product.vue -->
<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6 font-khmer bg-[#0D0B08] min-h-screen text-amber-50">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-600/20 pb-6">
      <div>
        <p class="text-xs text-amber-400 tracking-wider mb-1">❖ ប្រតិបត្តិការលក់</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">គ្រប់គ្រងផលិតផល (Manage Products)</h1>
      </div>
      <button 
        @click="openAddModal"
        class="bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-600/20 transition active:scale-95 flex items-center justify-center gap-2"
      >
        <span>+ បន្ថែមផលិតផលថ្មី</span>
      </button>
    </div>

    <!-- Filter & Search Bar -->
    <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div class="relative w-full sm:max-w-md">
        <input 
          v-model.trim="searchQuery" 
          type="text" 
          placeholder="ស្វែងរកឈ្មោះផលិតផល..." 
          class="w-full bg-[#15120D] border border-amber-600/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-amber-50 placeholder-amber-900/60 outline-none transition"
        />
      </div>
      <div class="text-xs text-amber-300/70 bg-amber-950/40 border border-amber-600/30 px-3.5 py-2 rounded-xl">
        ផលិតផលសរុប៖ <span class="font-bold text-amber-400">{{ filteredProducts.length }} មុខ</span>
      </div>
    </div>

    <!-- Alert Message -->
    <div v-if="errorMsg" class="bg-red-950/60 border border-red-500/40 text-red-300 p-3.5 rounded-xl text-xs">
      {{ errorMsg }}
    </div>

    <!-- Products Table -->
    <div class="bg-[#15120D] border border-amber-600/30 rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-amber-950/40 border-b border-amber-600/25 text-[11px] uppercase text-amber-200/70 font-semibold">
              <th class="p-4">រូបភាព</th>
              <th class="p-4">ឈ្មោះផលិតផល</th>
              <th class="p-4">តម្លៃ ($)</th>
              <th class="p-4">ស្តុក (Stock)</th>
              <th class="p-4 text-right">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-amber-600/10 text-xs sm:text-sm text-amber-100">
            <tr v-for="p in filteredProducts" :key="p.id" class="hover:bg-amber-500/5 transition">
              <td class="p-4">
                <div class="w-12 h-12 rounded-xl overflow-hidden bg-amber-950/50 border border-amber-600/20 flex items-center justify-center">
                  <img v-if="p.image || p.image_url" :src="p.image || p.image_url" class="w-full h-full object-cover" @error="(e) => e.target.style.display = 'none'" />
                  <span v-else class="text-amber-400 text-lg">🛍️</span>
                </div>
              </td>
              <td class="p-4 font-bold text-white">{{ p.name }}</td>
              <td class="p-4 font-bold text-amber-400">${{ Number(p.price || 0).toFixed(2) }}</td>
              <td class="p-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="(p.stock ?? p.stock_quantity ?? 10) > 0 ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : 'bg-red-950/60 text-red-300 border border-red-500/30'">
                  {{ p.stock ?? p.stock_quantity ?? 10 }} ក្នុងស្តុក
                </span>
              </td>
              <td class="p-4 text-right space-x-3">
                <button @click="openEditModal(p)" class="text-amber-400 font-semibold hover:underline">កែប្រែ</button>
                <button @click="deleteProduct(p.id)" class="text-red-400 font-semibold hover:underline">លុប</button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="5" class="text-center py-10 text-amber-200/50">មិនរកឃើញផលិតផលឡើយ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- PRODUCT ADD/EDIT MODAL -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-[#15120D] border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-amber-50 space-y-5">
        
        <div class="flex items-center justify-between border-b border-amber-600/30 pb-3">
          <h3 class="font-bold text-lg text-amber-400">
            {{ isEditing ? 'កែប្រែព័ត៌មានផលិតផល' : 'បន្ថែមផលិតផលថ្មី' }}
          </h3>
          <button @click="closeModal" class="text-amber-300/60 hover:text-white text-lg">✕</button>
        </div>

        <form @submit.prevent="saveProduct" class="space-y-4 text-xs sm:text-sm">
          <div>
            <label class="block font-medium text-amber-200/80 mb-1">ឈ្មោះផលិតផល *</label>
            <input type="text" v-model.trim="form.name" placeholder="ឧ. កាបូបកំប្លោកខ្មែរ" class="w-full bg-[#0D0B08] border border-amber-600/30 rounded-xl p-3 text-amber-50 outline-none focus:border-amber-400" required />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-medium text-amber-200/80 mb-1">តម្លៃ ($) *</label>
              <input type="number" step="0.01" v-model.number="form.price" placeholder="15.00" class="w-full bg-[#0D0B08] border border-amber-600/30 rounded-xl p-3 text-amber-50 outline-none focus:border-amber-400" required />
            </div>
            <div>
              <label class="block font-medium text-amber-200/80 mb-1">ចំនួនស្តុក *</label>
              <input type="number" v-model.number="form.stock" placeholder="50" class="w-full bg-[#0D0B08] border border-amber-600/30 rounded-xl p-3 text-amber-50 outline-none focus:border-amber-400" required />
            </div>
          </div>

          <div>
            <label class="block font-medium text-amber-200/80 mb-1">តំណភ្ជាប់រូបភាព (Image URL)</label>
            <input type="text" v-model.trim="form.image" placeholder="https://example.com/image.jpg" class="w-full bg-[#0D0B08] border border-amber-600/30 rounded-xl p-3 text-amber-50 outline-none focus:border-amber-400" />
          </div>

          <div>
            <label class="block font-medium text-amber-200/80 mb-1">ការពិពណ៌នា</label>
            <textarea v-model.trim="form.description" rows="3" placeholder="ពិពណ៌នាអំពីផលិតផល..." class="w-full bg-[#0D0B08] border border-amber-600/30 rounded-xl p-3 text-amber-50 outline-none focus:border-amber-400 resize-none"></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeModal" class="px-4 py-2.5 rounded-xl font-semibold border border-amber-600/30 text-amber-200 hover:bg-amber-500/10">បោះបង់</button>
            <button type="submit" class="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110">រក្សាទុក</button>
          </div>
        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/services/api'
import { toProduct, unwrapList } from '@/services/normalizers'

const products = ref([])
const searchQuery = ref('')
const errorMsg = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const currentId = ref(null)

const form = reactive({
  name: '',
  price: 0,
  stock: 10,
  image: '',
  description: ''
})

const fetchProducts = async () => {
  try {
    errorMsg.value = ''
    const res = await api.get('/products')
    const rawList = unwrapList(res)
    products.value = rawList.map(toProduct)
  } catch (err) {
    console.error('Error fetching products:', err)
    // Fallback Mock data សម្រាប់ការបង្ហាញបណ្តោះអាសន្ន
    products.value = [
      { id: 1, name: 'កាបូបកំប្លោកខ្មែរ', price: 15.00, stock: 25, image: '', description: 'កាបូបធ្វើពីដើមកំប្លោកធម្មជាតិ' },
      { id: 2, name: 'ក្រមាខ្មែរសូត្រប្រណីត', price: 12.50, stock: 40, image: '', description: 'ក្រមាគុណភាពខ្ពស់ ត្បាញដោយដៃ' },
      { id: 3, name: 'ម្រេចកំពតធម្មជាតិ (ថุง 250g)', price: 8.00, stock: 60, image: '', description: 'ម្រេចល្បីឈ្មោះពីខេត្តកំពត' }
    ]
  }
}

onMounted(() => {
  fetchProducts()
})

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return products.value
  return products.value.filter(p => (p.name && p.name.toLowerCase().includes(query)))
})

const openAddModal = () => {
  isEditing.value = false
  currentId.value = null
  form.name = ''
  form.price = 0
  form.stock = 10
  form.image = ''
  form.description = ''
  showModal.value = true
}

const openEditModal = (p) => {
  isEditing.value = true
  currentId.value = p.id
  form.name = p.name
  form.price = p.price
  form.stock = p.stock ?? p.stock_quantity ?? 10
  form.image = p.image || p.image_url || ''
  form.description = p.description || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveProduct = async () => {
  try {
    const payload = {
      product_name: form.name,
      price: form.price,
      stock_quantity: form.stock,
      image_url: form.image,
      description: form.description
    }

    if (isEditing.value) {
      await api.put(`/products/${currentId.value}`, payload)
    } else {
      await api.post('/products', payload)
    }
    closeModal()
    fetchProducts()
  } catch (err) {
    console.error('Error saving product:', err)
    // Front-end mock save
    if (isEditing.value) {
      const idx = products.value.findIndex(p => p.id === currentId.value)
      if (idx !== -1) {
        products.value[idx] = { ...products.value[idx], ...form }
      }
    } else {
      products.value.unshift({
        id: Date.now(),
        ...form
      })
    }
    closeModal()
  }
}

const deleteProduct = async (id) => {
  if (!confirm('តើអ្នកពិតជាចង់លុបផលិតផលនេះមែនទេ?')) return
  try {
    await api.delete(`/products/${id}`)
    products.value = products.value.filter(p => p.id !== id)
  } catch (err) {
    console.error('Error deleting product:', err)
    products.value = products.value.filter(p => p.id !== id)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>