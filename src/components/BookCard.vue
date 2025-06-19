<script setup>
defineProps({
  book: Object,
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <img
      :src="book.cover"
      alt="Book cover"
      class="w-full h-40 object-cover rounded-md"
    />
    <h2 class="text-lg font-semibold mt-2">{{ book.title }}</h2>
    <p class="text-sm text-gray-500">{{ book.author }}</p>
    <span class="text-xs text-purple-600 mt-1 inline-block">{{
      book.category
    }}</span>
  </div>
</template>
