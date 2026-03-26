<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Card from './Card.vue'

const props = defineProps(['query'])
const books = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/books/all')
    const data = await res.json()
    books.value = data.listeBooks
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

// Filter by title using the search query from parent
const filtered = computed(() =>
  props.query
    ? books.value.filter(b => b.title?.toLowerCase().includes(props.query.toLowerCase()))
    : books.value
)
</script>

<template>
  <div class="bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-center mb-8">📚 Book Library</h1>

    <p v-if="loading" class="text-center text-gray-500">Loading books...</p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card v-for="book in filtered" :key="book.id" :book="book" />
    </div>

    <p v-if="!loading && filtered.length === 0" class="text-center mt-10 text-gray-400">
      No books found 😢
    </p>
  </div>
</template>
