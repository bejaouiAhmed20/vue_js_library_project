<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['book'])
</script>

<template>
  <div
    @click="router.push(`/books/${props.book.id}`)"
    class="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
  >
    <img :src="book.image" alt="cover" class="w-full h-48 object-cover" />

    <div class="p-4">
      <h3 class="font-bold text-gray-800 mb-1">{{ book.title }}</h3>
      <p class="text-sm text-gray-500 mb-2">
        {{ book.author?.prenom }} {{ book.author?.nom }}
      </p>
      <p class="text-xs text-gray-400">📅 {{ book.year }}</p>
      <p class="text-xs text-gray-400">🏢 {{ book.editor }}</p>
    </div>
  </div>
</template>
