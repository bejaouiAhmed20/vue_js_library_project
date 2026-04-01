<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFavorites } from '../composables/useFavorites'

const router = useRouter()
const props = defineProps(['book', 'isFavoritePage'])
const { isFavorite, addFavorite, removeFavorite } = useFavorites()

const toggleFavorite = () => {
  if (isFavorite(props.book.id)) removeFavorite(props.book.id)
  else addFavorite(props.book)
}
</script>

<template>
  <div class="bg-white border border-gray-300 shadow-md overflow-hidden w-64 hover:shadow-xl transition duration-300">

    <!-- Image + Heart -->
    <div class="relative">
      <button
        @click.stop="toggleFavorite"
        class="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-md z-10"
      >
        <span
          :class="isFavorite(props.book.id) ? 'mdi mdi-heart text-red-500' : 'mdi mdi-heart-outline text-gray-400'"
          class="text-xl"
        />
      </button>

      <img
        :src="props.book.image"
        alt="cover"
        class="w-full h-64 object-cover cursor-pointer"
        @click="router.push(`/books/${props.book.id}`)"
      />
    </div>

    <!-- Content -->
    <div class="p-4 text-center">
      <h3 class="text-orange-600 font-semibold text-sm">
        {{ props.book.author?.prenom }} {{ props.book.author?.nom }}
      </h3>
      <h2 class="text-lg font-bold text-gray-800 mb-2">{{ props.book.title }}</h2>
      <p class="text-xs text-gray-500 mb-4 line-clamp-2">
        {{ props.book.description || 'Un résumé captivant pour ce livre incontournable.' }}
      </p>
      <button
        @click="router.push(`/books/${props.book.id}`)"
        class="bg-blue-900 text-white px-4 py-2 text-sm hover:bg-blue-700 transition"
      >
        Voir plus
      </button>
    </div>
  </div>
</template>
