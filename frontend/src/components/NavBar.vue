<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LogOut, BookOpen, PlusCircle, Star, LogIn, Home } from 'lucide-vue-next'
import { initFavorites } from '../composables/useFavorites'

const router = useRouter()
const route = useRoute()

const token = ref<string | null>(null)
const role = ref<string | null>(null)

const checkAuth = () => {
  token.value = localStorage.getItem('token')
  role.value = localStorage.getItem('role')
}

onMounted(() => checkAuth())

watch(route, () => checkAuth())

const logout = () => {
  localStorage.clear()
  token.value = null
  role.value = null
  initFavorites()
  router.push('/login')
}

const isActive = (path: string) => route.path === path
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200/60 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">

        <!-- Logo -->
        <div @click="router.push(token ? '/home' : '/login')"
             class="flex items-center gap-3 cursor-pointer group">
          <span class="font-bold text-2xl tracking-tight text-gray-900 group-hover:text-blue-600 transition">
            Book<span class="text-blue-600">Store</span>
          </span>
        </div>

        <!-- Links -->
        <div class="flex items-center space-x-1 sm:space-x-2">

          <!-- GUEST -->
          <template v-if="!token">
            <router-link
              to="/home"
              class="relative px-3 py-2 rounded-xl text-sm font-semibold flex items-center transition
                     text-gray-600 hover:text-blue-600 hover:bg-blue-50/80"
              :class="isActive('/home') ? 'text-blue-700 bg-blue-100/60' : ''"
            >
              <Home class="w-4 h-4 mr-1.5"
                    :class="isActive('/home') ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'" />
              Home
            </router-link>

            <div class="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

            <router-link
              to="/login"
              class="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold
                     text-gray-700 bg-white border border-gray-200
                     hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              <LogIn class="w-4 h-4 mr-2" />
              Login
            </router-link>
          </template>

          <!-- USER -->
          <template v-else-if="role === 'user'">

            <!-- Home -->
            <router-link
              to="/home"
              class="px-3 py-2 rounded-xl text-sm font-semibold flex items-center transition
                     text-gray-600 hover:text-blue-600 hover:bg-blue-50/80"
              :class="isActive('/home') ? 'text-blue-700 bg-blue-100/60' : ''"
            >
              <Home class="w-4 h-4 mr-1.5"
                    :class="isActive('/home') ? 'text-blue-600' : 'text-gray-400'" />
              Home
            </router-link>

            <!-- All Books -->
            <router-link
              to="/allbooks"
              class="px-3 py-2 rounded-xl text-sm font-semibold flex items-center transition
                     text-gray-600 hover:text-blue-600 hover:bg-blue-50/80"
              :class="isActive('/allbooks') ? 'text-blue-700 bg-blue-100/60' : ''"
            >
              <BookOpen class="w-4 h-4 mr-1.5"
                        :class="isActive('/allbooks') ? 'text-blue-600' : 'text-gray-400'" />
              All Books
            </router-link>

            <!-- Add Book -->
            <router-link
              to="/add-book"
              class="px-3 py-2 rounded-xl text-sm font-semibold flex items-center transition
                     text-gray-600 hover:text-blue-600 hover:bg-blue-50/80"
              :class="isActive('/add-book') ? 'text-blue-700 bg-blue-100/60' : ''"
            >
              <PlusCircle class="w-4 h-4 mr-1.5"
                          :class="isActive('/add-book') ? 'text-blue-600' : 'text-gray-400'" />
              Add Book
            </router-link>

            <!-- Favourites -->
            <router-link
              to="/Favourites"
              class="px-3 py-2 rounded-xl text-sm font-semibold flex items-center transition
                     text-gray-600 hover:text-blue-600 hover:bg-blue-50/80"
              :class="isActive('/Favourites') ? 'text-blue-700 bg-blue-100/60' : ''"
            >
              <Star class="w-4 h-4 mr-1.5"
                    :class="isActive('/Favourites') ? 'text-blue-600' : 'text-gray-400'" />
              Favourites
            </router-link>

            <div class="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

            <!-- Logout -->
            <button
              @click="logout"
              class="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold
                     text-red-600 bg-white border border-red-100
                     hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition"
            >
              <LogOut class="w-4 h-4 mr-1.5" />
              Sign Out
            </button>

          </template>
        </div>
      </div>
    </div>
  </nav>
</template>