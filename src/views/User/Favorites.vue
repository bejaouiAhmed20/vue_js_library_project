<script setup lang="ts">
import Card from '../../components/Card.vue'
import { useFavorites } from '../../composables/useFavorites'

const { favorites } = useFavorites()
</script>

<template>
  <div class="bg-gray-100 p-8 min-h-screen">
    <h1 class="text-3xl font-bold text-center mb-8">My Favorites</h1>

    <p v-if="favorites.length === 0" class="text-center text-gray-400 mt-10">
      No favorites yet. Start adding books!
    </p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card
        v-for="book in favorites"
        :key="book.id"
        :book="book"
        :isFavoritePage="true"
      />
    </div>
  </div>
</template>
