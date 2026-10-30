<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6 font-khmer">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">គ្រប់គ្រងប្រូម៉ូសិន (Manage Promotions)</h1>
        <p class="text-xs text-gray-500 mt-1">គ្រប់គ្រង Coupon, ការបញ្ចុះតម្លៃ និងបញ្ជី Newsletter</p>
      </div>
      <button @click="openModal" class="bg-amber-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-700 transition">
        + បន្ថែម Coupon ថ្មី
      </button>
    </div>

    <!-- Stats summary -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <span class="text-xs text-gray-400 font-bold">Coupons កំពុងដំណើរការ</span>
        <h2 class="text-2xl font-black text-amber-600 mt-1">{{ promotions.length }}</h2>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <span class="text-xs text-gray-400 font-bold">អ្នកជាវ Newsletter</span>
        <h2 class="text-2xl font-black text-gray-800 mt-1">128</h2>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <span class="text-xs text-gray-400 font-bold">ការប្រើប្រាស់ Coupon សរុប</span>
        <h2 class="text-2xl font-black text-emerald-600 mt-1">342 ដង</h2>
      </div>
    </div>

    <!-- Promotions Table -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 text-gray-500 text-xs uppercase border-b">
            <th class="p-4">ឈ្មោះប្រូម៉ូសិន</th>
            <th class="p-4">កូដ (Code)</th>
            <th class="p-4">ប្រភេទ</th>
            <th class="p-4">ទំហំបញ្ចុះ</th>
            <th class="p-4">ថ្ងៃផុតកំណត់</th>
            <th class="p-4">ស្ថានភាព</th>
            <th class="p-4">សកម្មភាព</th>
          </tr>
        </thead>
        <tbody class="divide-y text-sm text-gray-700">
          <tr v-for="promo in promotions" :key="promo.id">
            <td class="p-4 font-bold">{{ promo.name }}</td>
            <td class="p-4"><span class="font-mono bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200 text-xs font-bold">{{ promo.code }}</span></td>
            <td class="p-4">{{ promo.type === 'percentage' ? 'ភាគរយ (%)' : 'ទឹកប្រាក់ ($)' }}</td>
            <td class="p-4 font-bold text-amber-600">{{ promo.type === 'percentage' ? promo.value + '%' : '$' + promo.value }}</td>
            <td class="p-4 text-xs text-gray-500">{{ promo.end_date }}</td>
            <td class="p-4">
              <span class="text-xs px-2.5 py-1 rounded-full font-medium" :class="promo.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-100 text-gray-500'">
                {{ promo.is_active ? 'សកម្ម' : 'ផុតកំណត់' }}
              </span>
            </td>
            <td class="p-4 space-x-2">
              <button @click="deletePromo(promo.id)" class="text-red-600 font-semibold hover:underline">លុប</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import discountService from '@/services/discountService'

const promotions = ref([])

onMounted(async () => {
  try {
    promotions.value = await discountService.getActive()
  } catch (err) {
    console.error('Error fetching promotions:', err)
  }
})

const deletePromo = (id) => {
  if (confirm('តើអ្នកពិតជាចង់លុប Coupon នេះមែនទេ?')) {
    promotions.value = promotions.value.filter(p => p.id !== id)
  }
}
</script>