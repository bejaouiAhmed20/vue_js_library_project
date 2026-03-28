<script setup lang="ts">
import { ref } from 'vue'
import BookList from '../../components/BookList.vue'
import HeroSection from '../../components/HeroSection.vue';

const searchQuery = ref('')
</script>

<template>
  <div>
    <HeroSection />
    <h1 class="text-center">Livres Populaires</h1>
    <BookList :query="searchQuery" />
  </div>
</template>
