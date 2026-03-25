<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const hideNavbar = ['Login', 'Signup', 'NotFound']
const showNavbar = computed(() => !hideNavbar.includes(route.name as string))
</script>

<template>
  <v-app>
    <Navbar v-if="showNavbar" />
    <div :class="showNavbar ? 'pt-16' : ''">
      <router-view />
    </div>
  </v-app>
</template>
