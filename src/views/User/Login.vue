<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const form = reactive({ identifiant: '', password: '' })

// Submit login form
const handleLogin = async () => {
  loading.value = true
  message.value = ''

  try {
    const res = await axios.post('http://localhost:3000/auth/signin', form)

    // Save session data
    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('username', res.data.username)
    localStorage.setItem('userId', res.data.id)

    message.value = 'Login successful ✅'
    isError.value = false
    router.replace('/home')
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Invalid credentials ❌'
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">

    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">

      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Welcome Back</h1>
        <p class="text-gray-500 text-sm">Login to your account</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">

        <input
          v-model="form.identifiant"
          type="text"
          placeholder="Username or Email"
          required
          class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
          class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <!-- Feedback message -->
        <p v-if="message" :class="isError ? 'text-red-500' : 'text-green-500'" class="text-center text-sm">
          {{ message }}
        </p>

      </form>

      <!-- Signup link -->
      <p class="text-center text-sm text-gray-400 mt-4">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500 hover:underline">Sign up</router-link>
      </p>

    </div>
  </div>
</template>
