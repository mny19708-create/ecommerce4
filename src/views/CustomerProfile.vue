<!-- src/views/admin/CustomerProfile.vue (route: /admin/customers/:id) -->
<template>
  <div class="space-y-6 font-khmer">
    <div class="flex items-center gap-3">
      <router-link
        to="/admin/customers"
        class="text-xs text-amber-400 hover:underline"
      >
        ← ត្រឡប់ទៅអតិថិជន
      </router-link>
    </div>

    <h1 class="text-2xl font-bold text-white">ប្រវត្តិរូបអតិថិជន</h1>

    <div class="bg-[#15120D] border border-amber-600/30 rounded-2xl p-6">
      <p class="text-sm text-amber-200/70">
        លេខសម្គាល់អតិថិជន (ID): <span class="text-amber-400 font-bold">{{ customerId }}</span>
      </p>
      <p class="text-xs text-amber-200/40 mt-2">
        ទំព័រនេះនៅមិនទាន់មានទិន្នន័យ។ នឹងភ្ជាប់ទៅ API ពេលក្រោយ។
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const customerId = computed(() => route.params.id)
</script>