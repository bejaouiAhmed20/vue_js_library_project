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

  try {
    const res = await axios.post('http://localhost:3000/auth/signin', form)

    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('username', res.data.username)
    localStorage.setItem('role', res.data.role) // ✅ "user" or "admin"

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
  <div class="min-h-screen bg-gray-300 flex items-center justify-center">

    <form @submit.prevent="handleLogin" class="w-full max-w-4xl">

      <div class="mb-6">
        <label class="block font-semibold mb-2">Username</label>
        <input v-model="form.identifiant" class="w-full border px-3 py-2 bg-gray-100" />
      </div>

      <div class="mb-6">
        <label class="block font-semibold mb-2">Password</label>
        <input type="password" v-model="form.password" class="w-full border px-3 py-2 bg-gray-100" />
      </div>

      <div class="flex flex-col items-center gap-4">
        <button class="bg-blue-700 text-white px-6 py-2 rounded">
          {{ loading ? 'Loading...' : 'Login' }}
        </button>

        <router-link to="/signup" class="bg-blue-700 text-white px-6 py-2 rounded">
          Switch to Register
        </router-link>
      </div>

      <p v-if="message" :class="isError ? 'text-red-500' : 'text-green-500'" class="text-center mt-4">
        {{ message }}
      </p>

    </form>
  </div>
</template>