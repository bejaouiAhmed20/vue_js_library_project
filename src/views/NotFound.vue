<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
    <span class="text-8xl mb-6">📚</span>
    <h1 class="text-6xl font-bold text-gray-800 mb-2">404</h1>
    <p class="text-gray-500 text-lg mb-8">Oops! Page not found.</p>
    <button
      @click="router.push('/home')"
      class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
    >
      Go Home
    </button>
  </div>
</template>
