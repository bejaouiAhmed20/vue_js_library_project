<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const authors  = ref<any[]>([])
const loading  = ref(true)
const showForm = ref(false)
const form     = ref({ prenom: '', nom: '' })

// Fetch all authors on mount
onMounted(async () => {
  await getAuthors()
  loading.value = false
})

const getAuthors = async () => {
  const res = await axios.get('http://localhost:3000/author/all')
  authors.value = res.data
}

// POST /author/add — no auth required
const submitForm = async () => {
  await axios.post('http://localhost:3000/author/add', form.value)
  form.value = { prenom: '', nom: '' }
  showForm.value = false
  await getAuthors()
}
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Manage Authors</h1>
      <button @click="showForm = true" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition">
        Add Author
      </button>
    </div>

    <p v-if="loading" class="text-center text-gray-500">Loading...</p>

    <!-- Authors table -->
    <div v-else class="bg-white rounded-2xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-4 py-3 text-left">ID</th>
            <th class="px-4 py-3 text-left">First Name</th>
            <th class="px-4 py-3 text-left">Last Name</th>
            <th class="px-4 py-3 text-left">Books</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in authors" :key="author.id" class="border-t border-gray-100">
            <td class="px-4 py-3 text-gray-400">{{ author.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-800">{{ author.prenom }}</td>
            <td class="px-4 py-3 text-gray-800">{{ author.nom }}</td>
            <td class="px-4 py-3 text-gray-500">{{ author.listeLivres?.length ?? 0 }} book(s)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Author modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 class="text-lg font-bold mb-4">Add Author</h2>

        <div class="flex flex-col gap-3">
          <input v-model="form.prenom" placeholder="First Name" class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none" />
          <input v-model="form.nom"    placeholder="Last Name"  class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none" />
        </div>

        <div class="flex gap-3 mt-5">
          <button @click="submitForm" class="flex-1 bg-blue-600 text-white py-2 rounded-xl text-sm hover:bg-blue-700 transition">
            Create
          </button>
          <button @click="showForm = false" class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl text-sm hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
