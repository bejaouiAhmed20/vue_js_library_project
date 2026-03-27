<script setup lang="ts">
import { ref } from 'vue'
import BookList from '../../components/BookList.vue'

const searchQuery = ref('')
</script>

<template>
  <div>
    <BookList :query="searchQuery" />
  </div>

</template>
