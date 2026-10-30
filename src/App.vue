<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800 w-full">
    <!-- Navbar (លាក់ក្នុងទំព័រ admin) -->
    <Navbar v-if="!isAdminRoute" />

    <!-- Main Content Dynamic Body -->
    <main class="flex-1 w-full">
      <router-view />
    </main>

    <!-- Footer (លាក់ក្នុងទំព័រ admin) -->
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>