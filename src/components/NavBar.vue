<template>
  <!-- Barre de navigation fixe en haut -->
  <nav class="navbar">
    <span class="navbar-brand">Book Shop</span>
    <div class="navbar-links">
      <a href="#">Accueil</a>
      <a href="#">Books</a>
      <a href="#">Authors</a>
      <a href="#">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
  // Ce composant n'a pas de data ni de methods
  // Il est 100% visuel (stateless)
}
</script>

<style scoped>
/* "scoped" = ce CSS ne s'applique QUE dans NavBar.vue */

.navbar {
  background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue-mid) 60%, var(--blue-light) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 60px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.navbar-links {
  display: flex;
  gap: 1.8rem;
}

.navbar-links a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  transition: color 0.2s;
}

.navbar-links a:hover {
  color: #fff;
}
</style>
