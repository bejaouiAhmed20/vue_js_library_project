<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const form = reactive({ username: '', email: '', password: '' })

// Submit signup form
const handleSignup = async () => {
  loading.value = true
  message.value = ''

  try {
    await axios.post('http://localhost:3000/auth/signup', {
      ...form,
      role: 'ROLE_USER',
    })

    message.value = 'Account created successfully ✅'
    isError.value = false

    // Reset form
    form.username = ''
    form.email = ''
    form.password = ''
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Signup failed ❌'
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
        <h1 class="text-2xl font-bold text-gray-800">Create Account</h1>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSignup" class="flex flex-col gap-4">

        <input
          v-model="form.username"
          type="text"
          placeholder="Username"
          required
          class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
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
          {{ loading ? 'Creating...' : 'Sign Up' }}
        </button>

        <!-- Feedback message -->
        <p v-if="message" :class="isError ? 'text-red-500' : 'text-green-500'" class="text-center text-sm">
          {{ message }}
        </p>

      </form>

      <!-- Login link -->
      <p class="text-center text-sm text-gray-400 mt-4">
        Already have an account?
        <router-link to="/" class="text-blue-500 hover:underline">Login</router-link>
      </p>

    </div>
  </div>
</template>
