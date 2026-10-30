<template>
  <div class="w-full min-h-[60vh] flex items-center justify-center px-4 font-['Kantumruy_Pro']">
    <div class="text-center bg-white rounded-3xl border border-gray-100 shadow-sm py-16 px-8 max-w-md w-full">
      <div class="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
        404
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">រកមិនឃើញទំព័រនេះឡើយ</h1>
      <p class="text-gray-500 text-sm mb-6">ទំព័រដែលអ្នកស្វែងរកមិនមាន ឬត្រូវបានផ្លាស់ប្តូរទីតាំង។</p>
      <router-link
        to="/"
        class="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
      >
        ត្រឡប់ទៅទំព័រដើម
      </router-link>
    </div>
  </div>
</template>