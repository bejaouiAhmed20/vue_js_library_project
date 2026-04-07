<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const form = reactive({ identifiant: '', password: '' })

const handleLogin = async () => {
  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const res = await axios.post('http://localhost:3000/auth/signin', form)

    if (res.data.role !== 'admin') {
      message.value = 'Access denied: Administrators only'
      isError.value = true
      return
    }

    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('username', res.data.username)
    localStorage.setItem('role', res.data.role)
    localStorage.setItem('userId', res.data.id)

    router.push('/admin/books')
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Admin login failed '
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Admin Portal</h1>
        <p class="text-gray-500 text-sm mt-1">
          Sign in to your account
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">

        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            v-model="form.identifiant"
            type="text"
            placeholder="admin123"
            class="w-full px-4 py-2.5 rounded-lg 
                   border border-gray-300 
                   text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2.5 rounded-lg 
                   border border-gray-300 
                   text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition"
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 rounded-lg font-semibold text-white
                 bg-blue-600 hover:bg-blue-700
                 transition
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Authenticating...' : 'Sign In' }}
        </button>

        <!-- Message -->
        <p
          v-if="message"
          :class="isError 
            ? 'bg-red-50 text-red-600 border border-red-200' 
            : 'bg-green-50 text-green-600 border border-green-200'"
          class="text-center text-sm p-2.5 rounded-md"
        >
          {{ message }}
        </p>

        <!-- Footer -->
        <div class="text-center pt-5 border-t border-gray-200">
          <router-link
            to="/login"
            class="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            ← Return to User Portal
          </router-link>
        </div>

      </form>
    </div>
  </div>
</template>