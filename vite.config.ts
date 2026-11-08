import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/ecommerce4/', // 👈 ដាក់បញ្ជាក់ថេរតែកន្លែងនេះ ដើម្បីឱ្យត្រូវជាមួយ GitHub Repository របស់អ្នក
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})