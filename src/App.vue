<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div class="pt-16 flex-1">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
