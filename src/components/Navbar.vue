<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const token = ref(localStorage.getItem("token"));
const role = ref(localStorage.getItem("role"));

watch(route, () => {
  token.value = localStorage.getItem("token");
  role.value = localStorage.getItem("role");
});

const logout = () => {
  localStorage.clear();
  token.value = null;
  role.value = null;
  router.push("/");
};
</script>

<template>
  <nav
    class="bg-gradient-to-r from-blue-900 to-blue-600 px-8 py-4 flex justify-between items-center shadow-md"
  >
    <!-- Logo -->
    <div
      @click="router.push('/home')"
      class="flex items-center gap-2 cursor-pointer text-white"
    >
      <span class="font-semibold text-lg">Book Store</span>
    </div>

    <div class="flex-1" />

    <!-- GUEST -->
    <template v-if="!token">
      <router-link to="/home" class="nav-link" active-class="nav-link-active"
        >Home</router-link
      >
      <router-link to="/login" class="nav-link" active-class="nav-link-active"
        >Login</router-link
      >
    </template>

    <!-- USER -->
    <template v-else-if="role === 'user'">
      <router-link to="/home" class="nav-link" active-class="nav-link-active"
        >Accueil</router-link
      >
      <router-link
        to="/allbooks"
        class="nav-link"
        active-class="nav-link-active"
        >All Books</router-link
      >
      <router-link to="/add" class="nav-link" active-class="nav-link-active"
        >Add</router-link
      >
      <router-link
        to="/Favourites"
        class="nav-link"
        active-class="nav-link-active"
        >Favourites</router-link
      >
      <button @click="logout" class="nav-link">Logout</button>
    </template>

    <!-- ADMIN -->
    <template v-else-if="role === 'admin'">
      <router-link to="/home" class="nav-link" active-class="nav-link-active"
        >Accueil</router-link
      >
      <router-link to="/books" class="nav-link" active-class="nav-link-active"
        >Books</router-link
      >
      <router-link to="/authors" class="nav-link" active-class="nav-link-active"
        >Authors</router-link
      >
      <button @click="logout" class="nav-link">Logout</button>
    </template>
  </nav>
</template>

<style scoped>
/* Tous les liens */
.nav-link {
  margin-left: 20px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding-bottom: 3px;
  opacity: 0.8;
  transition: opacity 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.nav-link:hover {
  opacity: 1;
}

/* Lien actif : souligné + blanc + border en dessous */
.nav-link-active {
  opacity: 1;
  font-weight: 700;
  border-bottom: 2px solid white;
}
</style>
