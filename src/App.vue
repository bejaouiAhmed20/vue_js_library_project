<<<<<<< HEAD
<template>
  <!-- App.vue est le composant racine -->
  <!-- Il contient NavBar + BookTable -->
  <!-- Il gère aussi l'état global (liste des livres) -->

  <NavBar />

  <main class="main-content">
    <BookTable
      :books="books"
      @delete-book="deleteBook"
      @save-book="saveBook"
    />
  </main>
</template>

<script>
// On importe nos deux composants enfants
import NavBar from './components/NavBar.vue'
import BookTable from './components/BookTable.vue'

export default {
  name: 'App',

  // Enregistrer les composants utilisés dans le template
  components: {
    NavBar,
    BookTable
  },

  data() {
    return {
      // Liste principale des livres (partagée avec BookTable)
      books: [
        { id: 12, title: 'The Outsider',           editor: 'Secker & Warburg',            year: 1942, author: 'Albert Camus',          summary: 'Ce roman existentialiste explo...' },
        { id: 13, title: 'To Kill a Mockingbird',  editor: 'J.B. Lippincott & Co.',       year: 1960, author: 'Harper Lee',             summary: 'Ce classique de la littérature...' },
        { id: 14, title: 'The Great Gatsby',       editor: "Charles Scribner's Sons",     year: 1925, author: 'F. Scott Fitzgerald',   summary: 'Dans cette fresque des années...' },
        { id: 15, title: '100 Years of Solitude',  editor: 'Harper & Row',                year: 1967, author: 'Gabriel Garcia Marquez', summary: "Ce chef-d'œuvre du réalisme ma..." },
        { id: 16, title: 'Moby Dick',              editor: 'Harper & Brothers',           year: 1851, author: 'Herman Melville',        summary: 'Ishmael embarque sur un balein...' },
        { id: 17, title: 'War and Peace',          editor: 'The Russian Messenger',       year: 1869, author: 'Leo Tolstoy',            summary: 'Un récit épique qui mêle ficti...' },
        { id: 21, title: 'Les Misérables',         editor: 'A. Lacroix, Verboeckhoven',   year: 1862, author: 'Victor Hugo',            summary: "Le chef-d'œuvre de Victor Hugo..." },
      ],
      nextId: 30
    }
  },

  methods: {
    // Reçoit l'événement "delete-book" depuis BookTable
    deleteBook(id) {
      this.books = this.books.filter(b => b.id !== id)
    },

    // Reçoit l'événement "save-book" depuis BookModal (via BookTable)
    saveBook(formData) {
      if (formData.id) {
        // Modification : on remplace le livre existant
        const index = this.books.findIndex(b => b.id === formData.id)
        if (index !== -1) {
          this.books[index] = { ...formData }
        }
      } else {
        // Ajout : on crée un nouveau livre avec un nouvel ID
        this.books.push({ ...formData, id: this.nextId++ })
      }
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 2rem 2.5rem;
}
</style>
=======
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const hideNavbar = ['Login', 'Signup', 'NotFound']
const showNavbar = computed(() => !hideNavbar.includes(route.name as string))
</script>

<template>
  <v-app>
    <Navbar v-if="showNavbar" />
    <div :class="showNavbar ? 'pt-16' : ''">
      <router-view />
    </div>
  </v-app>
</template>
>>>>>>> 87b1b1b46fdbd8b0f9b052282c8a650563784acc
