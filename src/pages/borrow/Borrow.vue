<template>
  <div>
    <h1 class="text-center mb-6 text-2xl font-bold text-gray-900">Borrowed Books</h1>
    <table class="w-full border-collapse mx-auto text-base">
      <thead>
        <tr>
          <th class="border-2 border-blue-900 px-3 py-2 bg-blue-900 text-white font-bold">Book ID</th>
          <th class="border-2 border-blue-900 px-3 py-2 bg-blue-900 text-white font-bold">Title</th>
          <th class="border-2 border-blue-900 px-3 py-2 bg-blue-900 text-white font-bold">Author</th>
          <th class="border-2 border-blue-900 px-3 py-2 bg-blue-900 text-white font-bold">Borrowed</th>
          <th class="border-2 border-blue-900 px-3 py-2 bg-blue-900 text-white font-bold">Last Borrowed Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in borrowedBooks" :key="book.id">
          <td class="border-2 border-blue-900 px-3 py-2"><b>{{ book.id }}</b></td>
          <td class="border-2 border-blue-900 px-3 py-2">{{ book.title }}</td>
          <td class="border-2 border-blue-900 px-3 py-2">{{ book.author }}</td>
          <td class="border-2 border-blue-900 px-3 py-2">{{ book.borrow }}</td>
          <td class="border-2 border-blue-900 px-3 py-2">{{ book.lastBorrowed }}</td>
        </tr>
        <tr v-if="borrowedBooks.length === 0">
          <td colspan="5" class="text-center py-4">No borrowed books.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from 'vue'

const borrowedBooks = ref([])

function loadBorrowedBooks() {
  borrowedBooks.value = JSON.parse(localStorage.getItem('borrowedBooks') || '[]')
}

onMounted(loadBorrowedBooks)
onActivated && onActivated(loadBorrowedBooks)
</script>