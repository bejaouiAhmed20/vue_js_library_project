<template>
  <!-- BookTable reçoit la liste des livres depuis App.vue via props -->

  <div>
    <!-- En-tête : titre + bouton Ajouter -->
    <div class="page-header">
      <h1 class="page-title">Books</h1>
      <button class="btn btn-primary" @click="ouvrirModalAjout">
        + Add Book
      </button>
    </div>

    <!-- Tableau des livres -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Editor</th>
            <th>Year</th>
            <th>Author</th>
            <th>Summary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Message si aucun livre -->
          <tr v-if="books.length === 0">
            <td colspan="7" class="empty">Aucun livre trouvé.</td>
          </tr>

          <!-- Une ligne par livre (v-for = boucle Vue) -->
          <tr v-for="book in books" :key="book.id">
            <td class="id-col">{{ book.id }}</td>
            <td><strong>{{ book.title }}</strong></td>
            <td>{{ book.editor }}</td>
            <td>{{ book.year }}</td>
            <td>{{ book.author }}</td>
            <td class="summary-cell">{{ book.summary }}</td>
            <td>
              <div class="actions-wrap">
                <!-- Supprimer : émet l'événement vers App.vue -->
                <button class="btn btn-icon" title="Supprimer" @click="supprimerLivre(book.id)">
                  ✂
                </button>
                <!-- Modifier : ouvre le modal avec les données du livre -->
                <button class="btn btn-icon" title="Modifier" @click="ouvrirModalModif(book)">
                  ✏
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- On inclut BookModal ici -->
    <!-- v-if = affiche le modal seulement si showModal est true -->
    <BookModal
      v-if="showModal"
      :book="bookSelectionne"
      :authors="authors"
      @close="fermerModal"
      @save="sauvegarderLivre"
    />
  </div>
</template>

<script>
import BookModal from './BookModal.vue'

export default {
  name: 'BookTable',

  components: {
    BookModal
  },

  // Props = données reçues depuis App.vue (le parent)
  props: {
    books: {
      type: Array,
      required: true
    }
  },

  // Emits = événements envoyés vers App.vue (le parent)
  emits: ['delete-book', 'save-book'],

  data() {
    return {
      showModal: false,
      bookSelectionne: null,  // null = ajout, sinon = modification

      // Liste des auteurs disponibles dans le select
      authors: [
        'Albert Camus',
        'Harper Lee',
        'F. Scott Fitzgerald',
        'Gabriel Garcia Marquez',
        'Herman Melville',
        'Leo Tolstoy',
        'Victor Hugo'
      ]
    }
  },

  methods: {
    // Ouvre le modal en mode AJOUT (formulaire vide)
    ouvrirModalAjout() {
      this.bookSelectionne = null
      this.showModal = true
    },

    // Ouvre le modal en mode MODIFICATION (formulaire pré-rempli)
    ouvrirModalModif(book) {
      this.bookSelectionne = { ...book }  // copie pour ne pas modifier l'original
      this.showModal = true
    },

    // Ferme le modal
    fermerModal() {
      this.showModal = false
    },

    // Reçoit les données du modal et les envoie vers App.vue
    sauvegarderLivre(formData) {
      this.$emit('save-book', formData)
      this.showModal = false
    },

    // Demande confirmation et envoie l'événement de suppression vers App.vue
    supprimerLivre(id) {
      if (confirm('Voulez-vous supprimer ce livre ?')) {
        this.$emit('delete-book', id)
      }
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--blue-dark);
}

/* Tableau */
.table-wrap {
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(13, 43, 85, 0.12);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: linear-gradient(135deg, var(--blue-dark), var(--blue-mid));
}

thead th {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 0.85rem 1rem;
  text-align: left;
}

tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}

tbody tr:last-child {
  border-bottom: none;
}

tbody tr:hover {
  background: #f0f5ff;
}

td {
  padding: 0.75rem 1rem;
  font-size: 0.88rem;
  vertical-align: middle;
}

.id-col {
  color: var(--muted);
  font-weight: 600;
  width: 50px;
}

.summary-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--muted);
}

.actions-wrap {
  display: flex;
  gap: 0.5rem;
}

.empty {
  text-align: center;
  padding: 3rem;
  color: var(--muted);
}
</style>
