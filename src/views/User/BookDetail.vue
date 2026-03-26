<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const book = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:3000/books/search/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    // API returns an array, take the first item
    book.value = Array.isArray(data) ? data[0] : data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="bg-gray-100 p-8">

    <button @click="router.back()" class="mb-6 text-gray-600 hover:text-black text-sm">
      ← Back
    </button>

    <p v-if="loading" class="text-center text-gray-500">Loading book...</p>

    <div v-else-if="book" class="bg-white rounded-2xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <img :src="book.image" alt="cover" class="w-full rounded-xl object-cover" />

      <div>
        <h1 class="text-3xl font-bold mb-2 text-gray-800">{{ book.title }}</h1>

        <p class="text-gray-500 mb-4">
          {{ book.author?.prenom }} {{ book.author?.nom }}
        </p>

        <div class="flex gap-2 mb-6">
          <span class="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">📅 {{ book.year }}</span>
          <span class="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">🏢 {{ book.editor }}</span>
        </div>

        <p class="text-gray-600">{{ book.description || 'No description available.' }}</p>
      </div>
    </div>

    <p v-else class="text-center text-gray-400">Book not found 😢</p>

  </div>
</template>
