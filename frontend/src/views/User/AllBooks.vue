<script setup lang="ts">
import { ref } from 'vue'
import BookList from '../../components/BookList.vue'

const searchQuery = ref('')
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="flex justify-center pt-8 px-4">
      <div class="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm w-full max-w-md">
        <span class="mdi mdi-magnify text-gray-400 mr-2 text-lg" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search books..."
          class="flex-1 outline-none text-sm text-gray-700 bg-transparent"
        />
      </div>
    </div>
    <BookList :query="searchQuery" />
  </div>
</template>
