<!-- src/views/admin/TwoFactorView.vue -->
<template>
  <div class="min-h-screen font-khmer bg-[#0D0B08] text-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
    
    <!-- Atmospheric Background Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-md w-full bg-[#15120D] border border-amber-600/30 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
      
      <!-- Kbach Crest Header -->
      <div class="text-center space-y-2">
        <div class="text-amber-400 text-xl font-bold">༺ ❖ ༻</div>
        <h2 class="text-2xl font-bold text-white tracking-wide">ការផ្ទៀងផ្ទាត់ ២ ដំណាក់កាល</h2>
        <p class="text-xs text-amber-200/60 leading-relaxed">
          សូមបញ្ចូលកូដផ្ទៀងផ្ទាត់ ៦ ខ្ទង់ដែលបានបញ្ជូនទៅកាន់កម្មវិធី Authenticator ឬអ៊ីមែលរបស់អ្នក។
        </p>
      </div>

      <!-- 2FA Verification Form -->
      <form @submit.prevent="handleVerify2FA" class="space-y-5">
        
        <!-- OTP Input -->
        <div>
          <label class="block text-xs font-semibold text-amber-200/80 mb-2 text-center">កូដផ្ទៀងផ្ទាត់ (6-Digit OTP Code)</label>
          <input 
            v-model.trim="code"
            type="text" 
            maxlength="6"
            placeholder="123456"
            class="w-full bg-[#0D0B08] border border-amber-600/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3.5 text-center text-2xl tracking-widest font-mono text-amber-50 placeholder-amber-900/40 outline-none transition-all duration-200"
            required
          />
        </div>

        <!-- Error/Success Message -->
        <div v-if="message.text" :class="message.isSuccess ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border-red-500/40 text-red-300'" class="p-3.5 rounded-xl border text-xs text-center transition-all">
          {{ message.text }}
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          :disabled="loading || code.length < 6"
          class="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all duration-300 active:scale-95 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          </svg>
          {{ loading ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'ផ្ទៀងផ្ទាត់ និងចូលប្រព័ន្ធ' }}
        </button>

      </form>

      <!-- Resend Code Link -->
      <div class="text-center border-t border-amber-600/20 pt-4 text-xs space-y-2">
        <p class="text-amber-200/60">មិនទាន់ទទួលបានកូដ?</p>
        <button @click="resendCode" class="text-amber-400 font-bold hover:underline transition-colors">
          ផ្ញើកូដថ្មី (Resend Code)
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const code = ref('')
const loading = ref(false)
const message = reactive({ text: '', isSuccess: false })

const handleVerify2FA = async () => {
  if (code.value.length < 6) return

  loading.value = true
  message.text = ''

  try {
    // ហៅទៅកាន់ Backend API: POST /api/admin/2fa/verify
    await api.post('/admin/2fa/verify', { code: code.value })
    
    message.isSuccess = true
    message.text = 'ការផ្ទៀងផ្ទាត់ជោគជ័យ! កំពុងនាំចូលទៅកាន់ផ្ទាំងគ្រប់គ្រង...'
    
    setTimeout(() => {
      router.push('/admin/dashboard')
    }, 1500)
  } catch (err) {
    message.isSuccess = false
    message.text = err.response?.data?.message || 'កូដផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ ឬបានផុតកំណត់!'
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  try {
    await api.post('/admin/2fa/resend')
    message.isSuccess = true
    message.text = 'កូដថ្មីត្រូវបានផ្ញើជូនរួចរាល់ហើយ!'
  } catch (err) {
    message.isSuccess = false
    message.text = 'មិនអាចផ្ញើកូដថ្មីបានទេ សូមព្យាយាមម្តងទៀត។'
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>