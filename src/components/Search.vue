<script setup lang="ts">
const emit = defineEmits(['search'])
</script>

<template>
  <div class="flex justify-center my-6 px-4">
    <div class="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm w-full max-w-md">
      <span class="mdi mdi-magnify text-gray-400 mr-2 text-lg" />
      <input
        type="text"
        placeholder="Search books..."
        @input="emit('search', ($event.target as HTMLInputElement).value)"
        class="flex-1 outline-none text-sm text-gray-700 bg-transparent"
      />
    </div>
  </div>
</template>
