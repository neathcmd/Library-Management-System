<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Books</h1>
    <button @click="showAddBook = true" class="mb-4 px-4 py-2 bg-blue-600 text-white rounded">+ Add Book</button>
    <div v-if="showAddBook" class="mb-4 bg-gray-100 p-4 rounded">
      <input v-model="newBook.title" placeholder="Title" class="mb-2 px-2 py-1 border rounded w-full" />
      <input v-model="newBook.description" placeholder="Description" class="mb-2 px-2 py-1 border rounded w-full" />
      <input v-model.number="newBook.author_id" placeholder="Author ID" class="mb-2 px-2 py-1 border rounded w-full" />
      <input v-model.number="newBook.category_id" placeholder="Category ID" class="mb-2 px-2 py-1 border rounded w-full" />
      <input v-model.number="newBook.quantity" placeholder="Quantity" class="mb-2 px-2 py-1 border rounded w-full" />
      <input v-model.number="newBook.created_by" placeholder="Created By" class="mb-2 px-2 py-1 border rounded w-full" />
      <div class="flex gap-2">
        <button @click="showAddBook = false" class="px-4 py-1 bg-gray-300 rounded">Cancel</button>
        <button @click="addBook" class="px-4 py-1 bg-blue-600 text-white rounded">Add</button>
      </div>
    </div>
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">Failed to load books.</div>
    <ul v-else>
      <li v-for="book in books" :key="book.id" class="mb-2 p-4 bg-gray-100 rounded">
        <div class="font-bold">{{ book.title }}</div>
        <div class="text-gray-600">{{ book.description }}</div>
        <div class="text-sm text-gray-500">Author ID: {{ book.author_id }}</div>
        <div class="text-sm text-gray-500">Category ID: {{ book.category_id }}</div>
        <div class="text-sm text-gray-500">Quantity: {{ book.quantity }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const books = ref([])
const loading = ref(true)
const error = ref(false)
const showAddBook = ref(false)
const newBook = ref({
  title: '',
  description: '',
  author_id: 1,
  category_id: 1,
  quantity: 1,
  created_by: 1
})

// Replace with your real token
const AUTH_TOKEN = 'YOUR_TOKEN_HERE'

async function fetchBooks() {
  loading.value = true
  error.value = false
  try {
    const response = await axios.get('http://localhost:3000/api/books')
    books.value = response.data
  } catch (e) {
    error.value = true
  }
  loading.value = false
}

async function addBook() {
  try {
    await axios.post(
      'http://localhost:3000/api/books',
      newBook.value,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      }
    )
    showAddBook.value = false
    // Reset form
    newBook.value = {
      title: '',
      description: '',
      author_id: 1,
      category_id: 1,
      quantity: 1,
      created_by: 1
    }
    fetchBooks()
  } catch (e) {
    alert('Failed to add book')
  }
}

onMounted(fetchBooks)
</script>