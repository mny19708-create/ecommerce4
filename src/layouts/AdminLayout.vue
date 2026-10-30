<!-- src/layouts/AdminLayout.vue -->
<template>
  <div class="min-h-screen flex bg-[#0D0B08] text-amber-50 font-khmer">
    <SiteBar />

    <div class="flex-1 min-w-0 flex flex-col">
      <main class="flex-1 p-4 md:p-6">
        <router-view />
      </main>
      <AdminFooter />
    </div>
  </div>
</template>

<script setup>
import SiteBar from '@/views/admin/siteBar.vue'
import AdminFooter from '@/views/admin/AdminFooter.vue'
</script>