<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const form = reactive({ username: '', email: '', password: '' })

const handleSignup = async () => {
  loading.value = true
  message.value = ''

  try {
    await axios.post('http://localhost:3000/auth/signup', {
      ...form,
      role: 'user', 
    })

    message.value = 'Account created successfully ✅'
    isError.value = false

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
  <div class="min-h-screen bg-gray-300 flex items-center justify-center">

    <form @submit.prevent="handleSignup" class="w-full max-w-4xl">

      <div class="mb-6">
        <label>Username</label>
        <input v-model="form.username" class="w-full border px-3 py-2 bg-gray-100" />
      </div>

      <div class="mb-6">
        <label>Email</label>
        <input v-model="form.email" class="w-full border px-3 py-2 bg-gray-100" />
      </div>

      <div class="mb-6">
        <label>Password</label>
        <input type="password" v-model="form.password" class="w-full border px-3 py-2 bg-gray-100" />
      </div>

      <div class="flex flex-col items-center gap-4">
        <button class="bg-blue-700 text-white px-6 py-2 rounded">
          {{ loading ? 'Loading...' : 'Register' }}
        </button>

        <router-link to="/login" class="bg-blue-700 text-white px-6 py-2 rounded">
          Switch to Login
        </router-link>
      </div>

      <p v-if="message" :class="isError ? 'text-red-500' : 'text-green-500'" class="text-center mt-4">
        {{ message }}
      </p>

    </form>
  </div>
</template>