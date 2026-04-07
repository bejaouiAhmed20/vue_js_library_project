<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { LayoutDashboard, Users, BookOpen, LogOut } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const logout = () => {
  localStorage.clear()
  router.push('/admin/login')
}
</script>

<template>
  <aside class="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">

    <!-- Header -->
    <div class="h-16 flex items-center px-6 border-b border-gray-200">
      <h1 class="text-lg font-semibold text-gray-900 tracking-tight">
        Admin Portal
      </h1>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-6 px-3 space-y-1">

      <!-- Books -->
      <router-link
        to="/admin/books"
        class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition"
        :class="route.path.startsWith('/admin/books')
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
      >
        <BookOpen class="w-5 h-5"
          :class="route.path.startsWith('/admin/books') ? 'text-blue-600' : 'text-gray-400'" />
        Manage Books
      </router-link>

      <!-- Authors -->
      <router-link
        to="/admin/authors"
        class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition"
        :class="route.path.startsWith('/admin/authors')
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
      >
        <Users class="w-5 h-5"
          :class="route.path.startsWith('/admin/authors') ? 'text-blue-600' : 'text-gray-400'" />
        Manage Authors
      </router-link>

    </nav>

    <!-- Logout -->
    <div class="p-4 border-t border-gray-200">
      <button
        @click="logout"
        class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
               text-red-600 hover:bg-red-50 transition"
      >
        <LogOut class="w-5 h-5" />
        Logout
      </button>
    </div>

  </aside>
</template>
