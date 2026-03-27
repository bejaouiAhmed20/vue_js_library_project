<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const token = ref(localStorage.getItem('token'))
const role  = ref(localStorage.getItem('role'))

// Re-read on every route change so navbar updates after login
watch(route, () => {
  token.value = localStorage.getItem('token')
  role.value  = localStorage.getItem('role')
})

const logout = () => {
  localStorage.clear()
  token.value = null
  role.value  = null
  router.push('/login')
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-6">

    <!-- Logo -->
    <div @click="router.push('/home')" class="flex items-center gap-2 cursor-pointer text-gray-800">
      <span class="mdi mdi-book-open-page-variant text-xl" />
      <span class="font-semibold text-lg">My Library</span>
    </div>

    <div class="flex-1" />

    <!-- GUEST -->
    <template v-if="!token">
      <div class="flex items-center gap-4">
        <router-link to="/home" class="flex items-center gap-1 text-sm text-gray-600 font-medium">
          <span class="mdi mdi-home" /> Home
        </router-link>
        <router-link to="/" class="text-sm text-gray-600 font-medium">Login</router-link>
        <router-link to="/signup" class="text-sm text-gray-600 font-medium">Sign Up</router-link>
      </div>
    </template>

    <!-- USER -->
    <template v-else-if="role === 'user'">
      <div class="flex items-center gap-4">
        <router-link to="/home" class="flex items-center gap-1 text-sm text-gray-600 font-medium">
          <span class="mdi mdi-home" /> Home
        </router-link>
        <router-link to="/authors" class="flex items-center gap-1 text-sm text-gray-600 font-medium">
          <span class="mdi mdi-account-group" /> Authors
        </router-link>
      </div>
    </template>

    <!-- ADMIN -->
    <template v-else-if="role === 'admin'">
      <div class="flex items-center gap-4">
        <router-link to="/home" class="flex items-center gap-1 text-sm text-gray-600 font-medium">
          <span class="mdi mdi-home" /> Home
        </router-link>
        <router-link to="/authors" class="flex items-center gap-1 text-sm text-gray-600 font-medium">
          <span class="mdi mdi-account-group" /> Authors
        </router-link>
        <router-link to="/admin" class="flex items-center gap-1 text-sm text-gray-600 font-medium">
          <span class="mdi mdi-shield-account" /> Admin
        </router-link>
      </div>
    </template>

    <div class="flex-1" />

    <!-- Logout -->
    <button v-if="token" @click="logout" class="flex items-center gap-1 text-sm text-red-500">
      <span class="mdi mdi-logout" /> Logout
    </button>

  </nav>
</template>
