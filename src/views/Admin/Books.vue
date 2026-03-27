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
  await Promise.all([fetchBooks(), fetchAuthors()])
  loading.value = false
})

const fetchBooks = async () => {
  const res = await fetch('http://localhost:3000/books/all')
  const data = await res.json()
  books.value = data.listeBooks ?? data
}

const fetchAuthors = async () => {
  const res = await fetch('http://localhost:3000/author/all')
  authors.value = await res.json()
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
    })
  } else {
    // POST /books/new — requires admin JWT
    await fetch('http://localhost:3000/books/new', {
      method: 'POST',
      headers,
      body: JSON.stringify(form.value)
    })
  }
  showForm.value = false
  await fetchBooks()
}

// DELETE /books/delete/:id
const deleteBook = async (id: number) => {
  if (!confirm('Delete this book?')) return
  await fetch(`http://localhost:3000/books/delete/${id}`, { method: 'DELETE' })
  await fetchBooks()
}
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">📚 Manage Books</h1>
      <button @click="openCreate" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition">
        Add Book
      </button>
    </div>

    <p v-if="loading" class="text-center text-gray-500">Loading...</p>

    <!-- Books table -->
    <div v-else class="bg-white rounded-2xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-4 py-3 text-left">ID</th>
            <th class="px-4 py-3 text-left">Title</th>
            <th class="px-4 py-3 text-left">Image</th>
            <th class="px-4 py-3 text-left">Year</th>
            <th class="px-4 py-3 text-left">Editor</th>
            <th class="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id" class="border-t border-gray-100">
            <td class="px-4 py-3 text-gray-400">{{ book.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-800">{{ book.title }}</td>
            <td class="px-4 py-3 text-gray-500">
              {{ book.image }} 
            </td>
            <td class="px-4 py-3 text-gray-500">{{ book.year }}</td>
            <td class="px-4 py-3 text-gray-500">{{ book.editor }}</td>
            <td class="px-4 py-3 flex gap-2">
              <button @click="openEdit(book)" class="bg-blue-900 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-500 transition">
                Edit
              </button>
              <button @click="deleteBook(book.id)" class="bg-blue-900 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create / Edit modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 class="text-lg font-bold mb-4">{{ editingBook ? 'Edit Book' : 'Add Book' }}</h2>

        <div class="flex flex-col gap-3">
          <input v-model="form.title"    placeholder="Title"    class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none" />
          <input v-model="form.year"     placeholder="Year"     type="number" class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none" />
          <input v-model="form.editor"   placeholder="Editor"   class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none" />
          <input v-model="form.image"    placeholder="Image URL" class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none" />

          <!-- Author select (only for create) -->
          <select v-if="!editingBook" v-model="form.authorId" class="border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none">
            <option value="" disabled>Select Author</option>
            <option v-for="a in authors" :key="a.id" :value="a.id">
              {{ a.prenom }} {{ a.nom }}
            </option>
          </select>
        </div>

        <div class="flex gap-3 mt-5">
          <button @click="submitForm" class="flex-1 bg-blue-600 text-white py-2 rounded-xl text-sm hover:bg-blue-700 transition">
            {{ editingBook ? 'Save' : 'Create' }}
          </button>
          <button @click="showForm = false" class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl text-sm hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
