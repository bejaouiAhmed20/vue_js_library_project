<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = localStorage.getItem('username')
const showMenu = ref(false)

const links = [
  { name: 'Home',    to: '/home',    icon: 'mdi-home' },
  { name: 'Authors', to: '/authors', icon: 'mdi-account-group' },
]

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/')
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

    <!-- Nav links -->
    <div class="flex items-center gap-4">
      <router-link
        v-for="link in links"
        :key="link.name"
        :to="link.to"
        class="flex items-center gap-1 text-gray-600 text-sm font-medium no-underline"
      >
        <span :class="`mdi ${link.icon}`" />
        {{ link.name }}
      </router-link>
    </div>

    <div class="flex-1" />

    <!-- User menu -->
    <div class="relative">
      <button @click="showMenu = !showMenu" class="flex items-center gap-1 text-sm text-gray-700">
        <span class="mdi mdi-account" />
        {{ username || 'User' }}
        <span class="mdi mdi-chevron-down text-xs" />
      </button>

      <!-- Dropdown -->
      <div v-if="showMenu" class="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-md w-36">
        <button @click="logout" class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500">
          <span class="mdi mdi-logout" />
          Logout
        </button>
      </div>
    </div>

  </nav>
</template>
