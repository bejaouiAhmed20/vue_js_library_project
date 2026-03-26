<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const token = ref(localStorage.getItem('token'))
const role  = ref(localStorage.getItem('role'))

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
<nav class="bg-gradient-to-r from-blue-900 to-blue-600 px-8 py-4 flex justify-between items-center shadow-md ">

    <!-- Logo -->
    <div @click="router.push('/home')" class="flex items-center gap-2 cursor-pointer text-gray-800">
      <span class="mdi mdi-book-open-page-variant text-xl" />
      <span class="font-semibold text-2xl text-white">Book Store</span>
    </div>

    <div class="flex-1" />

    <!-- GUEST -->
    <template v-if="!token">
      <div class="flex items-center gap-4">
        <router-link to="/home" class="flex items-center gap-1 text-sm text-white font-medium">
          <span class="mdi mdi-home" /> Home
        </router-link>
        <router-link to="/login" class="text-sm text-white font-medium">Login</router-link>
      </div>
    </template>

    <!-- USER -->
    <template v-else-if="role === 'user'">
      <div class="flex items-center gap-4">
        <router-link to="/home" class="hover:underline text-white">Accueil</router-link>
        <router-link to="/books" class="hover:underline text-white">All Books</router-link>
        <router-link to="/add" class="hover:underline text-white">Add</router-link>
        <router-link to="/favourites" class="hover:underline text-white">Favourites</router-link>
        <button @click="logout" class="hover:underline text-white">Logout</button>
      </div>
    </template>

    <!-- ADMIN -->
    <template v-else-if="role === 'admin'">
      <div class="flex items-center gap-4">
       <router-link to="/home" class="hover:underline text-white">Accueil</router-link>
        <router-link to="/books" class="hover:underline text-white">Books</router-link>
        <router-link to="/authors" class="hover:underline text-white">Authors</router-link>
        <button @click="logout" class="hover:underline text-white">Logout</button>

        
      </div>
    </template>



  </nav>
</template>
