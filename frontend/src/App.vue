<script setup lang="ts">
import Navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
      <router-view />
    <Footer />
  </div>
</template>
