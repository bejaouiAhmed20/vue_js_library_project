<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Use refs so the template reacts to changes
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
  router.push('/')
}
</script>

<template>
<nav class="bg-gradient-to-r from-blue-900 to-blue-600 px-8 py-4 flex justify-between items-center shadow-md">
    <!-- Logo -->
    <div @click="router.push('/home')" class="flex items-center gap-2 cursor-pointer text-white">
      <span class="font-semibold text-lg">Book Store</span>
    </div>

    <div class="flex-1" />

  <!-- GUEST -->
      <template v-if="!token">
        <router-link to="/home" class="hover:underline text-white">Home</router-link>
        <router-link to="/login" class="hover:underline text-white">Login</router-link>
      </template>

      <!--  USER -->
      <template v-else-if="role === 'user'">
        <router-link to="/home" class="hover:underline text-white">Accueil</router-link>
        <router-link to="/allbooks" class="hover:underline text-white">All Books</router-link>
        <router-link to="/add" class="hover:underline text-white">Add</router-link>
        <router-link to="/Favourites" class="hover:underline text-white">Favourites</router-link>
        <button @click="logout" class="hover:underline text-white">Logout</button>
      </template>

      <!-- ADMIN -->
      <template v-else-if="role === 'admin'">
        <router-link to="/home" class="hover:underline text-white">Accueil</router-link>
        <router-link to="/books" class="hover:underline text-white">Books</router-link>
        <router-link to="/authors" class="hover:underline text-white">Authors</router-link>
        <button @click="logout" class="hover:underline text-white">Logout</button>
      </template>




  </nav>
</template>
<style scoped>
.text-white{
  margin-left: 20px;
}
</style>
