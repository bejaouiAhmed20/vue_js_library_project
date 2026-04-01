<script setup lang="ts">
import { ref, onMounted } from 'vue'

const authors = ref<any[]>([])
const loading = ref(true)
const successMessage = ref('')
const errorMessage = ref('')

const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
}

// Form state
const form = ref({
  title: '',
  year: '',
  editor: '',
  image: '',
  authorId: ''
})

// Fetch authors (same as your admin page)
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/author/all')
    authors.value = await res.json()
  } catch (err) {
    errorMessage.value = 'Failed to load authors'
  } finally {
    loading.value = false
  }
})

// Submit new book
const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const res = await fetch('http://localhost:3000/books/new', {
      method: 'POST',
      headers,
      body: JSON.stringify(form.value)
    })

    if (!res.ok) throw new Error()

    successMessage.value = 'Book added successfully '

    // Reset form
    form.value = {
      title: '',
      year: '',
      editor: '',
      image: '',
      authorId: ''
    }

  } catch (err) {
    errorMessage.value = 'Error adding book '
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
      
      <h1 class="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add New Book
      </h1>

      <p v-if="loading" class="text-center text-gray-500">Loading authors...</p>

      <div v-else class="flex flex-col gap-4">

        <!-- Title -->
        <input 
          v-model="form.title"
          placeholder="Title"
          class="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- Year -->
        <input 
          v-model="form.year"
          type="number"
          placeholder="Year"
          class="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- Editor -->
        <input 
          v-model="form.editor"
          placeholder="Editor"
          class="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- Image -->
        <input 
          v-model="form.image"
          placeholder="Image URL"
          class="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- Author -->
        <select 
          v-model="form.authorId"
          class="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Author</option>
          <option v-for="a in authors" :key="a.id" :value="a.id">
            {{ a.prenom }} {{ a.nom }}
          </option>
        </select>

        <!-- Messages -->
        <p v-if="successMessage" class="text-green-600 text-sm">
          {{ successMessage }}
        </p>

        <p v-if="errorMessage" class="text-red-600 text-sm">
          {{ errorMessage }}
        </p>

        <!-- Submit -->
        <button 
          @click="submitForm"
          class="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Add Book
        </button>

      </div>
    </div>

  </div>
</template>