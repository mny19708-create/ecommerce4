<!-- src/views/admin/LoginView.vue (route: /admin/login) -->
<template>
  <div class="min-h-screen font-khmer bg-[#0D0B08] text-amber-50 flex items-center justify-center p-4 relative overflow-hidden">

    <!-- Atmospheric Background Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-md w-full bg-[#15120D] border border-amber-600/30 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">

      <!-- Kbach Crest Header -->
      <div class="text-center space-y-2">
        <div class="text-amber-400 text-xl font-bold">༺ ❖ ༻</div>
        <h2 class="text-2xl font-bold text-white tracking-wide">ចូលប្រើប្រាស់ប្រព័ន្ធ Admin</h2>
        <p class="text-xs text-amber-200/60 leading-relaxed">
          សូមបញ្ចូលអ៊ីមែល និងលេខសម្ងាត់រដ្ឋបាលរបស់អ្នក
        </p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">

        <!-- Email Input -->
        <div>
          <label class="block text-xs font-semibold text-amber-200/80 mb-1.5">អ៊ីមែលរដ្ឋបាល (Admin Email)</label>
          <input
            v-model.trim="form.email"
            type="email"
            autocomplete="username"
            placeholder="admin@khmerhandmade.com"
            class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900/60 outline-none transition-all duration-200"
            required
          />
        </div>

        <!-- Password Input -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-amber-200/80">លេខសម្ងាត់ (Password)</label>
            <router-link to="/admin/forgot-password" class="text-[11px] text-amber-400 hover:underline">
              ភ្លេចលេខសម្ងាត់?
            </router-link>
          </div>
          <input
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
            class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900/60 outline-none transition-all duration-200"
            required
          />
        </div>

        <!-- Remember Me Checkbox -->
        <div class="flex items-center gap-2 pt-1">
          <input
            v-model="form.remember"
            type="checkbox"
            id="remember"
            class="w-4 h-4 rounded accent-amber-500 bg-[#0D0B08] border-amber-600/30"
          />
          <label for="remember" class="text-xs text-amber-200/70 cursor-pointer">
            ចងចាំការចូលប្រើប្រាស់នេះ
          </label>
        </div>

        <!-- Error Alert Message -->
        <div v-if="errorMsg || authStore.error" class="bg-red-950/60 border border-red-500/40 text-red-300 p-3 rounded-xl text-xs">
          {{ errorMsg || authStore.error }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all duration-300 active:scale-95 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          </svg>
          {{ loading ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'ចូលប្រើប្រាស់ប្រព័ន្ធ' }}
        </button>

      </form>

      <!-- Security Notice -->
      <div class="text-center border-t border-amber-600/20 pt-4 text-[11px] text-amber-300/50">
        🛡️ តំបន់ដែនកំណត់សម្រាប់តែអ្នកគ្រប់គ្រងប្រព័ន្ធ (Admin Only)
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(false)
const errorMsg = ref('')

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  errorMsg.value = ''
  loading.value = true

  try {
    const success = await authStore.login({
      email: form.email,
      password: form.password,
      remember: form.remember
    })

    if (!success) {
      errorMsg.value = 'ការចូលប្រើប្រាស់បរាជ័យ! សូមពិនិត្យមើល អ៊ីមែល និងលេខសម្ងាត់។'
      return
    }

    // ការពារអតិថិជនធម្មតាមិនឱ្យចូល admin
    if (authStore.user && authStore.user.role !== 'admin') {
      authStore.logout?.()
      errorMsg.value = 'គណនីនេះគ្មានសិទ្ធិចូលប្រើ Admin ទេ។'
      return
    }

    router.push(route.query.redirect || '/admin/dashboard')
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'មានបញ្ហាក្នុងការតភ្ជាប់ទៅកាន់ Server!'
  } finally {
    loading.value = false
  }
}
</script>