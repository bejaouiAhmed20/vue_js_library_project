<template>
  <!-- Overlay sombre derrière le modal -->
  <!-- @click.self = ferme seulement si on clique SUR l'overlay (pas sur le modal) -->
  <div class="overlay" @click.self="$emit('close')">

    <div class="modal">
      <!-- En-tête du modal -->
      <div class="modal-header">
        <span class="modal-title">
          <!-- Si on a un book en prop = modification, sinon = ajout -->
          {{ isEditing ? 'Modifier Livre' : 'Add Book' }}
        </span>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>

      <!-- Corps du modal : formulaire -->
      <div class="modal-body">

        <div class="form-group">
          <label>Title</label>
          <!-- v-model = liaison bidirectionnelle avec form.title -->
          <input type="text" v-model="form.title" placeholder="Ex: Les Misérables" />
        </div>

        <div class="form-group">
          <label>Image (URL)</label>
          <input type="text" v-model="form.image" placeholder="https://..." />
        </div>

        <div class="form-group">
          <label>Editor</label>
          <input type="text" v-model="form.editor" placeholder="Ex: Gallimard" />
        </div>

        <div class="form-group">
          <label>Year</label>
          <input type="number" v-model="form.year" placeholder="Ex: 1960" />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="form.summary" placeholder="Résumé du livre..."></textarea>
        </div>

        <div class="form-group">
          <label>Author</label>
          <!-- v-for dans un select pour générer les options -->
          <select v-model="form.author">
            <option value="">-- Choisir un auteur --</option>
            <option v-for="a in authors" :key="a" :value="a">{{ a }}</option>
          </select>
        </div>

      </div>

      <!-- Pied du modal : bouton de soumission -->
      <div class="modal-footer">
        <button class="btn btn-primary" @click="soumettre">
          {{ isEditing ? 'Modifier Livre' : 'Ajouter Livre' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BookModal',

  // Props reçues depuis BookTable
  props: {
    book: {
      type: Object,
      default: null   // null = mode ajout
    },
    authors: {
      type: Array,
      required: true
    }
  },

  // Événements envoyés vers BookTable
  emits: ['close', 'save'],

  data() {
    return {
      // On initialise le formulaire :
      // - Si book existe (modification) → on copie ses valeurs
      // - Sinon (ajout) → formulaire vide
      form: this.book
        ? { ...this.book }
        : { id: null, title: '', image: '', editor: '', year: '', summary: '', author: '' }
    }
  },

  computed: {
    // isEditing = true si on modifie un livre existant
    isEditing() {
      return this.book !== null
    }
  },

  methods: {
    soumettre() {
      // Validation simple
      if (!this.form.title) {
        alert('Le titre est obligatoire !')
        return
      }

      // On envoie les données vers BookTable via l'événement 'save'
      this.$emit('save', { ...this.form })
    }
  }
}
</script>

<style scoped>
/* Overlay sombre qui couvre tout l'écran */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 20, 50, 0.55);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Boîte du modal */
.modal {
  background: #fff;
  border-radius: 12px;
  width: 480px;
  max-width: 95vw;
  box-shadow: 0 20px 60px rgba(13, 43, 85, 0.35);
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

/* En-tête */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--blue-dark);
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--muted);
  line-height: 1;
  transition: color 0.2s;
}
.modal-close:hover { color: var(--text); }

/* Corps */
.modal-body {
  padding: 1.4rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Champs du formulaire */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--blue-dark);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.form-group input,
.form-group textarea,
.form-group select {
  border: 1.5px solid var(--border);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  color: var(--text);
  background: #f8faff;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--blue-light);
  box-shadow: 0 0 0 3px rgba(46, 111, 202, 0.15);
  background: #fff;
}

.form-group textarea {
  resize: vertical;
  min-height: 90px;
}

/* Pied */
.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
}
</style>
