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
  <div
    class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-64 overflow-hidden"
  >
    <!-- Image -->
    <div class="group">
      <img
        :src="props.book.image"
        alt="cover"
        class="w-full h-64 object-cover cursor-pointer group-hover:scale-105 transition duration-300"
        @click="router.push(`/books/${props.book.id}`)"
      />
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col gap-2">
      
      <!-- Author -->
      <p class="text-xs text-orange-500 font-medium">
        {{ props.book.author?.prenom }} {{ props.book.author?.nom }}
      </p>

      <!-- Title -->
      <h2 class="text-lg font-semibold text-gray-800 line-clamp-1">
        {{ props.book.title }}
      </h2>

      <!-- Description -->
      <p class="text-sm text-gray-500 line-clamp-2">
        {{ props.book.description || 'Un résumé captivant pour ce livre incontournable.' }}
      </p>

      <!-- Actions -->
      <div class="flex items-center gap-2 mt-3">
        
        <!-- Voir plus -->
        <button
          @click="router.push(`/books/${props.book.id}`)"
          class="flex-1 bg-blue-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          Voir plus
        </button>

        <!-- Favorite -->
        <button
          @click.stop="toggleFavorite"
          class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition"
        >
          <span
            :class="isFavorite(props.book.id)
              ? 'mdi mdi-heart text-red-500'
              : 'mdi mdi-heart-outline text-gray-500'"
            class="text-xl"
          />
        </button>

      </div>
    </div>
  </div>
</template>