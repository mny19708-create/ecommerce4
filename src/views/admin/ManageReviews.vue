<!-- src/views/admin/Reviews.vue -->
<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6 font-khmer bg-[#0D0B08] min-h-screen text-amber-50">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-600/20 pb-6">
      <div>
        <p class="text-xs text-amber-400 tracking-wider mb-1">❖ មាតិកា និងទីផ្សារ</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">គ្រប់គ្រងមតិយោបល់ (Manage Reviews)</h1>
      </div>
      <div class="text-xs text-amber-300/70 bg-amber-950/40 border border-amber-600/30 px-3.5 py-2 rounded-xl">
        មតិយោបល់សរុប៖ <span class="font-bold text-amber-400">{{ reviews.length }} </span>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 overflow-x-auto pb-1">
      <button 
        v-for="status in statusTabs" 
        :key="status.value"
        @click="selectedTab = status.value"
        class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition"
        :class="selectedTab === status.value ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#15120D] border border-amber-600/30 text-amber-200/70 hover:text-amber-300'"
      >
        {{ status.label }}
      </button>
    </div>

    <!-- Alert Message -->
    <div v-if="errorMsg" class="bg-red-950/60 border border-red-500/40 text-red-300 p-3.5 rounded-xl text-xs">
      {{ errorMsg }}
    </div>

    <!-- Reviews Table -->
    <div class="bg-[#15120D] border border-amber-600/30 rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-amber-950/40 border-b border-amber-600/25 text-[11px] uppercase text-amber-200/70 font-semibold">
              <th class="p-4">អតិថិជន</th>
              <th class="p-4">ផលិតផល</th>
              <th class="p-4">កម្រិតផ្កាយ</th>
              <th class="p-4">មតិយោបល់</th>
              <th class="p-4">ស្ថានភាព</th>
              <th class="p-4 text-right">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-amber-600/10 text-xs sm:text-sm text-amber-100">
            <tr v-for="rev in filteredReviews" :key="rev.id" class="hover:bg-amber-500/5 transition">
              <td class="p-4 font-bold text-white">{{ rev.customer_name || 'អតិថិជន' }}</td>
              <td class="p-4 text-amber-300/80">{{ rev.product_name || 'ផលិតផល' }}</td>
              <td class="p-4 text-amber-400 font-bold">
                {{ '★'.repeat(rev.rating) }}{{ '☆'.repeat(5 - rev.rating) }}
              </td>
              <td class="p-4 max-w-xs truncate text-amber-100/90">{{ rev.comment }}</td>
              <td class="p-4">
                <span class="px-2.5 py-1 rounded-full text-[10px] border uppercase font-medium" :class="getStatusClass(rev.status)">
                  {{ rev.status }}
                </span>
              </td>
              <td class="p-4 text-right space-x-2">
                <button v-if="rev.status !== 'published'" @click="updateStatus(rev.id, 'published')" class="text-emerald-400 font-semibold hover:underline">បញ្ជាក់ (Publish)</button>
                <button v-if="rev.status !== 'reported'" @click="updateStatus(rev.id, 'reported')" class="text-amber-400 font-semibold hover:underline">រាយការណ៍</button>
                <button @click="deleteReview(rev.id)" class="text-red-400 font-semibold hover:underline">លុប</button>
              </td>
            </tr>
            <tr v-if="filteredReviews.length === 0">
              <td colspan="6" class="text-center py-10 text-amber-200/50">មិនមានមតិយោបល់ក្នុងផ្នែកនេះទេ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import { unwrapList } from '@/services/Normalizers.js'

const reviews = ref([])
const selectedTab = ref('all')
const errorMsg = ref('')

const statusTabs = [
  { label: 'ទាំងអស់ (All)', value: 'all' },
  { label: 'បានផ្សាយ (Published)', value: 'published' },
  { label: 'រង់ចាំពិនិត្យ (Pending)', value: 'pending' },
  { label: 'បានរាយការណ៍ (Reported)', value: 'reported' }
]

const fetchReviews = async () => {
  try {
    errorMsg.value = ''
    const res = await api.get('/admin/reviews')
    reviews.value = unwrapList(res)
  } catch (err) {
    console.error('Error fetching reviews:', err)
    // Fallback Mock data សម្រាប់ការបង្ហាញបណ្តោះអាសន្ន
    reviews.value = [
      { id: 1, customer_name: 'សុខ សុភា', product_name: 'កាបូបកំប្លោកខ្មែរ', rating: 5, comment: 'កាបូបស្អាតខ្លាំងណាស់ គុណភាពល្អ និងរឹងមាំ!', status: 'published' },
      { id: 2, customer_name: 'ចាន់ ដារ៉ា', product_name: 'ក្រមាខ្មែរសូត្រ', rating: 4, comment: 'ពណ៌ស្រស់ស្អាត តែការដឹកជញ្ជូនយូរបន្តិច។', status: 'pending' },
      { id: 3, customer_name: 'កែវ ពិសី', product_name: 'ម្រេចកំពត', rating: 1, comment: 'ហាងមិនបានឆ្លើយតបសំណួរទេ។', status: 'reported' }
    ]
  }
}

onMounted(() => {
  fetchReviews()
})

const filteredReviews = computed(() => {
  if (selectedTab.value === 'all') return reviews.value
  return reviews.value.filter(r => r.status === selectedTab.value)
})

const updateStatus = async (id, newStatus) => {
  try {
    await api.put(`/admin/reviews/${id}`, { status: newStatus })
    const target = reviews.value.find(r => r.id === id)
    if (target) target.status = newStatus
  } catch (err) {
    console.error('Error updating review status:', err)
    const target = reviews.value.find(r => r.id === id)
    if (target) target.status = newStatus
  }
}

const deleteReview = async (id) => {
  if (!confirm('តើអ្នកពិតជាចង់លុបមតិយោបល់នេះមែនទេ?')) return
  try {
    await api.delete(`/admin/reviews/${id}`)
    reviews.value = reviews.value.filter(r => r.id !== id)
  } catch (err) {
    console.error('Error deleting review:', err)
    reviews.value = reviews.value.filter(r => r.id !== id)
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'published': return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
    case 'pending': return 'bg-amber-950/60 text-amber-300 border-amber-500/30'
    case 'reported': return 'bg-red-950/60 text-red-300 border-red-500/30'
    default: return 'bg-gray-950/60 text-gray-300 border-gray-500/30'
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>