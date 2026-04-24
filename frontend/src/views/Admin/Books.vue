<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const books   = ref<any[]>([])
const authors = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const editingBook = ref<any>(null)

const token = localStorage.getItem('token')
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

// Empty form state
const emptyForm = () => ({ title: '', year: '', editor: '', image: '', authorId: '' })
const form = ref(emptyForm())

// Fetch all books and authors on mount
onMounted(async () => {
  await Promise.all([getBooks(), getAuthors()])
  loading.value = false
})

const getBooks = async () => {
  const res = await axios.get('http://localhost:3000/books/all')
  books.value = res.data.listeBooks ?? res.data
}

const getAuthors = async () => {
  const res = await axios.get('http://localhost:3000/author/all')
  authors.value = res.data
}

// Open form for creating a new book
const openCreate = () => {
  editingBook.value = null
  form.value = emptyForm()
  showForm.value = true
}

// Open form pre-filled for editing
const openEdit = (book: any) => {
  editingBook.value = book
  form.value = {
    title:    book.title,
    year:     book.year,
    editor:   book.editor,
    image:    book.image,
    authorId: book.author?.id ?? book.author
  }
  showForm.value = true
}

// Submit create or edit
const submitForm = async () => {
  if (editingBook.value) {
    // PUT /books/edit/:id
    await axios.put(`http://localhost:3000/books/edit/${editingBook.value.id}`, {
      id:     editingBook.value.id,
      title:  form.value.title,
      year:   form.value.year,
      editor: form.value.editor,
      image:  form.value.image,
    }, { headers })
  } else {
    // POST /books/new — requires admin JWT
    await axios.post('http://localhost:3000/books/new', form.value, { headers })
  }
  showForm.value = false
  await getBooks()
}

// DELETE /books/delete/:id
const deleteBook = async (id: number) => {
  if (!confirm('Delete this book?')) return
  await axios.delete(`http://localhost:3000/books/delete/${id}`, { headers })
  await getBooks()
}
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Manage Books</h1>

      <button
        @click="openCreate"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
      >
        + Add Book
      </button>
    </div>

    <!-- Loading -->
    <p v-if="loading" class="text-center text-gray-500">Loading...</p>

    <!-- Table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
          <tr>
            <th class="px-4 py-3 text-left">Image</th>
            <th class="px-4 py-3 text-left">Title</th>
            <th class="px-4 py-3 text-left">Year</th>
            <th class="px-4 py-3 text-left">Editor</th>
            <th class="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="book in books"
            :key="book.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="px-3 py-2">
              <img
                :src="book.image"
                class="w-14 h-14 object-cover rounded-md border"
              />
            </td>

            <td class="px-4 py-3 font-medium text-gray-800">
              {{ book.title }}
            </td>

            <td class="px-4 py-3 text-gray-500">
              {{ book.year }}
            </td>

            <td class="px-4 py-3 text-gray-500">
              {{ book.editor }}
            </td>

            <td class="px-4 py-3 flex gap-2">

              <!-- Edit -->
              <button
                @click="openEdit(book)"
                class="px-3 py-1 text-xs font-medium rounded-md
                       bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Edit
              </button>

              <!-- Delete -->
              <button
                @click="deleteBook(book.id)"
                class="px-3 py-1 text-xs font-medium rounded-md
                       bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                Delete
              </button>

            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">

        <h2 class="text-lg font-semibold text-gray-800 mb-4">
          {{ editingBook ? 'Edit Book' : 'Add Book' }}
        </h2>

        <div class="space-y-3">

          <input v-model="form.title"
            placeholder="Title"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input v-model="form.year"
            type="number"
            placeholder="Year"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input v-model="form.editor"
            placeholder="Editor"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input v-model="form.image"
            placeholder="Image URL"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            v-if="!editingBook"
            v-model="form.authorId"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select Author</option>
            <option v-for="a in authors" :key="a.id" :value="a.id">
              {{ a.prenom }} {{ a.nom }}
            </option>
          </select>

        </div>

        <!-- Actions -->
        <div class="flex gap-3 mt-5">
          <button
            @click="submitForm"
            class="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            {{ editingBook ? 'Save' : 'Create' }}
          </button>

          <button
            @click="showForm = false"
            class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>

  </div>
</template>