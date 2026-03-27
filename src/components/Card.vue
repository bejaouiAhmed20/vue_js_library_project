<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['book'])
</script>

<template>
  <div
    class="bg-gray-200 w-64 p-4 shadow-md rounded cursor-pointer"
  >
    <!-- Image -->
    <img
      :src="props.book.image"
      alt="cover"
      class="w-full h-64 object-cover mb-3"
    />

    <!-- Title -->
    <h3 class="font-semibold text-gray-800 text-sm">
      {{ props.book.title }}
    </h3>

    <!-- Author -->
    <p class="text-xs text-gray-600 mb-2">
      {{ props.book.author?.prenom }} {{ props.book.author?.nom }}
    </p>

    <!-- Description -->
    <p class="text-xs text-gray-700 mb-4">
      {{ props.book.description || "Un résumé captivant pour ce livre incontournable." }}
    </p>

    <!-- Button -->
    <div class="flex justify-center">
      <button
        @click="router.push(`/books/${props.book.id}`)"
        class="bg-blue-700 text-white px-4 py-1 text-sm rounded shadow hover:bg-blue-800 transition"
      >
        Voir Plus
      </button>
    </div>
  </div>
</template>