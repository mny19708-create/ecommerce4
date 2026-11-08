<!-- src/views/AuthView.vue -->
<template>
  <div class="min-h-screen font-khmer bg-[#0D0B08] text-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
    
    <!-- Background Glow Effect -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-md w-full bg-[#15120D] border border-amber-600/30 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="text-amber-400 text-xl font-bold">༺ ❖ ༻</div>
        <h2 class="text-2xl font-bold text-white tracking-wide">
          {{ isRegister ? 'បង្កើតគណនីថ្មី' : 'ចូលប្រើប្រាស់គណនី' }}
        </h2>
        <p class="text-xs text-amber-200/60">
          {{ isRegister ? 'សូមបំពេញព័ត៌មានខាងក្រោមដើម្បីចុះឈ្មោះ' : 'សូមបញ្ចូលអ៊ីមែល និងលេខសំងាត់របស់អ្នក' }}
        </p>
      </div>

      <!-- Form (Login / Register) -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        
        <!-- បង្ហាញ Input ឈ្មោះ លុះត្រាតែជ្រើសរើស Register -->
        <div v-if="isRegister">
          <label class="block text-xs text-amber-200/80 mb-1">ឈ្មោះពេញ</label>
          <input 
            v-model="form.name"
            type="text" 
            placeholder="ឧ. សុខ ជា"
            class="w-full bg-[#0D0B08] border border-amber-600/30 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900 focus:border-amber-400 focus:outline-none transition"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-xs text-amber-200/80 mb-1">អាសយដ្ឋានអ៊ីមែល</label>
          <input 
            v-model="form.email"
            type="email" 
            placeholder="yourname@example.com"
            class="w-full bg-[#0D0B08] border border-amber-600/30 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900 focus:border-amber-400 focus:outline-none transition"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-xs text-amber-200/80 mb-1">លេខសំងាត់</label>
          <input 
            v-model="form.password"
            type="password" 
            placeholder="••••••••"
            class="w-full bg-[#0D0B08] border border-amber-600/30 rounded-xl p-3 text-sm text-amber-50 placeholder-amber-900 focus:border-amber-400 focus:outline-none transition"
            required
          />
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all duration-300 active:scale-95 text-sm"
        >
          {{ isRegister ? 'ចុះឈ្មោះ' : 'ចូលប្រើប្រាស់' }}
        </button>
      </form>

      <!-- Toggle Switcher សម្រាប់ផ្លាស់ប្តូររវាង Login និង Register -->
      <div class="text-center border-t border-amber-600/20 pt-4 text-xs text-amber-200/70">
        <span v-if="!isRegister">
          មិនទាន់មានគណនីមែនទេ? 
          <button @click="isRegister = true" type="button" class="text-amber-400 font-bold underline hover:text-amber-300 ml-1">
            ចុះឈ្មោះនៅទីនេះ
          </button>
        </span>
        <span v-else>
          មានគណនីរួចហើយមែនទេ? 
          <button @click="isRegister = false" type="button" class="text-amber-400 font-bold underline hover:text-amber-300 ml-1">
            ចូលប្រើប្រាស់
          </button>
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isRegister = ref(false)

const form = ref({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  const userData = {
    name: form.value.name || form.value.email.split('@')[0],
    email: form.value.email
  }

  // រក្សាទុក Session
  localStorage.setItem('user_session', JSON.stringify(userData))

  alert(isRegister.value ? 'បង្កើតគណនីជោគជ័យ!' : 'ចូលប្រើប្រាស់ជោគជ័យ!')
  
  // បញ្ជូនទៅកាន់ទំព័រដើម
  router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

.font-khmer {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>