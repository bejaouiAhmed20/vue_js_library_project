<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="bg-gray-100 py-16 text-center">

    <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
      Découvrez des livres pour tous les goûts
    </h1>

    <p class="text-gray-500 text-sm md:text-base mb-6">
      Des classiques intemporels aux derniers best-sellers, trouvez votre prochaine lecture ici.
    </p>

    <button
      @click="router.push('/allbooks')"
      class="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg transition"
    >
      Explorer le catalogue
    </button>

  </section>
</template>