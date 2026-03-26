<script setup lang="ts">
import { ref } from 'vue'
import Search from '../../components/Search.vue'
import BookList from '../../components/BookList.vue'

const searchQuery = ref('')
</script>

<template>
  <div>
    <Search @search="searchQuery = $event" />
    <BookList :query="searchQuery" />
  </div>
</template>
