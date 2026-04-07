<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import AdminSidebar from './components/AdminSidebar.vue'

const route = useRoute()

// Check if current route is an admin route
const isAdminRoute = computed(() => {
  return route?.path?.startsWith('/admin') && route?.path !== '/admin/login'
})

// Check if current route should hide the user navbar/footer
const isAuthRoute = computed(() => {
  return route?.path === '/admin/login' || route?.path?.startsWith('/admin')
})
</script>

<template>
  <div v-if="isAdminRoute" class="flex min-h-screen bg-gray-100 font-sans">
    <AdminSidebar />
    <div class="flex-1 overflow-y-auto w-full h-screen">
      <router-view />
    </div>
  </div>
  
  <div v-else class="flex flex-col min-h-screen font-sans">
    <Navbar v-if="!isAuthRoute" />
    <router-view class="flex-1" />
    <Footer/>
  </div>
</template>
