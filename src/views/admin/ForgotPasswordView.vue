<!-- src/views/admin/ForgotPasswordView.vue -->
<template>
  <div class="min-h-screen font-khmer bg-[#0D0B08] text-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
    
    <!-- Atmospheric Background Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-md w-full bg-[#15120D] border border-amber-600/30 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
      
      <!-- Top Kbach Crest Header -->
      <div class="text-center space-y-2">
        <div class="text-amber-400 text-xl font-bold">༺ ❖ ༻</div>
        <h2 class="text-2xl font-bold text-white tracking-wide">ភ្លេចលេខសម្ងាត់ Admin</h2>
        <p class="text-xs text-amber-200/60 leading-relaxed">
          សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក។ ពួកយើងនឹងផ្ញើតំណភ្ជាប់ដើម្បីកំណត់លេខសម្ងាត់ថ្មី (Reset Link) ទៅកាន់អ៊ីមែលរបស់អ្នក។
        </p>
      </div>

      <!-- Forgot Password Form -->
      <form @submit.prevent="handleForgotPassword" class="space-y-5">
        
        <!-- Email Input -->
        <div>
          <label class="block text-xs font-semibold text-amber-200/80 mb-1.5">អាសយដ្ឋានអ៊ីមែលរដ្ឋបាល</label>
          <div class="relative">
            <input 
              v-model.trim="email"
              type="email" 
              placeholder="admin@khmerhandmade.com"
              class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900/60 outline-none transition-all duration-200"
              required
            />
          </div>
        </div>

        <!-- Alert Message -->
        <div v-if="message.text" :class="message.isSuccess ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border-red-500/40 text-red-300'" class="p-3.5 rounded-xl border text-xs leading-relaxed transition-all">
          {{ message.text }}
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all duration-300 active:scale-95 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          </svg>
          {{ loading ? 'កំពុងផ្ញើសំណើ...' : 'ផ្ញើតំណភ្ជាប់កំណត់លេខសម្ងាត់' }}
        </button>

      </form>

      <!-- Back to Login Link -->
      <div class="text-center border-t border-amber-600/20 pt-4 text-xs">
        <router-link to="/admin/login" class="text-amber-400 font-bold underline hover:text-amber-300 transition-colors inline-flex items-center gap-1">
          <span>←</span> ត្រឡប់ទៅកាន់ទំព័រចូលប្រើប្រាស់ (Admin Login)
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '@/services/api' // ឬហៅតាម authService របស់អ្នក

const email = ref('')
const loading = ref(false)
const message = reactive({
  text: '',
  isSuccess: false
})

const handleForgotPassword = async () => {
  if (!email.value) return

  loading.value = true
  message.text = ''

  try {
    // ហៅទៅកាន់ Backend API: POST /api/auth/forgot-password
    await api.post('/auth/forgot-password', { email: email.value })
    
    message.isSuccess = true
    message.text = 'តំណភ្ជាប់សម្រាប់កំណត់លេខសម្ងាត់ថ្មីត្រូវបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នករួចរាល់ហើយ! សូមពិនិត្យមើល Inbox ឬ Spam folder។'
    email.value = ''
  } catch (err) {
    message.isSuccess = false
    message.text = err.response?.data?.message || 'មិនអាចផ្ញើសំណើបានទេ! សូមពិនិត្យមើលអ៊ីមែលរបស់អ្នកឡើងវិញ។'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>