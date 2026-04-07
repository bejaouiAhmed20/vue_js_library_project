<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { initFavorites } from '../composables/useFavorites'

const router = useRouter()

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const form = reactive({ identifiant: '', password: '' })

const handleLogin = async () => {
  loading.value = true
  message.value = ''

  try {
    const res = await axios.post('http://localhost:3000/auth/signin', form)

    if (res.data.role === 'admin') {
      message.value = 'Admins must login via the admin portal. Redirecting...'
      isError.value = true
      setTimeout(() => {
        router.push('/admin/login')
      }, 1500)
      return
    }

    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('username', res.data.username)
    localStorage.setItem('role', res.data.role)
    localStorage.setItem('userId', res.data.id)

    initFavorites() // Re-initialize favorites for the logged-in user

    router.push('/home')
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Login failed ❌'
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4">

    <!-- Card -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">


      <p class="text-sm text-gray-500 text-center mb-6">
        Login to your account
      </p>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">

        <!-- Username -->
        <div>
          <label class="text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="form.identifiant"
            placeholder="Enter your username"
            class="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            class="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Button -->
        <button
          :disabled="loading"
          class="mt-2 w-full bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

      </form>

      <!-- Message -->
      <div v-if="message" class="mt-4 text-center text-sm">
        <p
          :class="isError
            ? 'text-red-500 bg-red-50 border border-red-200'
            : 'text-green-500 bg-green-50 border border-green-200'"
          class="p-2 rounded-lg"
        >
          {{ message }}
        </p>
      </div>

      <!-- Divider -->
      <div class="flex items-center gap-2 my-6">
        <div class="flex-1 h-px bg-gray-200"></div>
        <span class="text-xs text-gray-400">OR</span>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <!-- Register -->
      <p class="text-sm text-center text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-blue-600 font-medium hover:underline">
          Sign up
        </router-link>
      </p>

    </div>
  </div>
</template>