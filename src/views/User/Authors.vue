<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authors = ref<any[]>([])
const loading = ref(true)
const selected = ref<any>(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/author/all')
    authors.value = await res.json()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

// Click author to show their books, click again to hide
const select = (author: any) => {
  selected.value = selected.value?.id === author.id ? null : author
}
</script>

<template>
  <div class="bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-center mb-8">✍️ Authors</h1>

    <p v-if="loading" class="text-center text-gray-500">Loading authors...</p>

    <div v-else>
      <!-- Authors -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
        <div
          v-for="author in authors"
          :key="author.id"
          @click="select(author)"
          :class="selected?.id === author.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'"
          class="flex flex-col items-center p-4 rounded-2xl shadow cursor-pointer hover:shadow-md transition"
        >
          <span class="text-3xl mb-2">👤</span>
          <p class="font-semibold text-sm text-center">{{ author.prenom }} {{ author.nom }}</p>
          <p class="text-xs mt-1 opacity-60">{{ author.listeLivres.length }} book(s)</p>
        </div>
      </div>

      <!-- Selected author's books -->
      <div v-if="selected">
        <h2 class="text-xl font-bold text-gray-700 mb-4">
          Books by {{ selected.prenom }} {{ selected.nom }}
        </h2>

        <p v-if="selected.listeLivres.length === 0" class="text-gray-400">No books found.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="book in selected.listeLivres"
            :key="book.id"
            @click="router.push(`/books/${book.id}`)"
            class="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          >
            <img :src="book.image" alt="cover" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-bold text-gray-800 mb-1">{{ book.title }}</h3>
              <p class="text-xs text-gray-400">📅 {{ book.year }}</p>
              <p class="text-xs text-gray-400">🏢 {{ book.editor }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
