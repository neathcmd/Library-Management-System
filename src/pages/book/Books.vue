<template>
  <div class="flex gap-6">
    <!-- Main Content -->
    <div class="flex-1">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold text-gray-900">Library Management System</h1>
        <div class="flex items-center gap-4">
          <input
            v-model="search"
            type="text"
            placeholder="Search books, authors, or categories..."
            class="w-96 px-4 py-2 border border-gray-300 rounded focus:outline-none"
          />
          <button class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 font-semibold">
            + Add New Book
          </button>
        </div>
      </div>

      <!-- Books and Filter -->
      <div class="bg-white rounded shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <span class="text-xl font-bold">Books</span>
            <span class="ml-2 text-gray-500">({{ filteredBooks.length }} books)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-700">Sort by Category:</span>
            <select v-model="selectedCategory" class="border px-3 py-2 rounded">
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>
        <!-- Book Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="book in filteredBooks"
            :key="book.id"
            class="bg-gray-100 rounded shadow p-4 flex flex-col"
          >
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="h-40 bg-gray-300 rounded mb-4"></div>
                <div class="font-bold text-lg mb-1">{{ book.title }}</div>
                <div class="text-gray-600 mb-2">{{ book.author }}</div>
                <div class="text-sm text-gray-500 mb-2">Available: {{ book.available }}</div>
                <div class="text-sm text-gray-500 mb-2">Borrowed: {{ book.borrow }}</div>
              </div>
              <button
                :disabled="book.available === 0"
                @click="borrowBook(book)"
                class="mt-4 px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Borrow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <aside class="w-80">
      <div class="bg-white rounded shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xl font-bold">Categories</span>
          <span class="text-gray-500">{{ totalBooks }} total</span>
        </div>
        <div v-for="cat in categoryStats" :key="cat.name" class="mb-4">
          <div class="flex justify-between mb-1">
            <span class="text-gray-700">{{ cat.name }}</span>
            <span class="text-gray-500">{{ cat.count }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded h-2">
            <div
              class="bg-blue-500 h-2 rounded"
              :style="{ width: (cat.count / totalBooks * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedCategory = ref('')
const categories = ref([
  'Youth Novel', 'Science', 'History', 'Technology', 'Self Development', 'Ministry of Education', 'Song books'
])

// Example books data (add more as needed)
const books = ref([
  { id: 'N001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: 5, borrow: 2, category: 'Youth Novel' },
  { id: 'N002', title: 'To Kill a Mockingbird', author: 'Harper Lee', available: 7, borrow: 3, category: 'Youth Novel' },
  { id: 'H001', title: 'Sapiens', author: 'Yuval Noah Harari', available: 4, borrow: 1, category: 'History' },
  { id: 'S001', title: 'A Brief History of Time', author: 'Stephen Hawking', available: 6, borrow: 2, category: 'Science' },
  { id: 'T001', title: 'Clean Code', author: 'Robert C. Martin', available: 3, borrow: 1, category: 'Technology' },
  { id: 'SD001', title: 'Atomic Habits', author: 'James Clear', available: 8, borrow: 4, category: 'Self Development' },
  // ...add more books for each category
])

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.value.toLowerCase()) ||
      book.author.toLowerCase().includes(search.value.toLowerCase()) ||
      book.category.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory =
      !selectedCategory.value || book.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const totalBooks = computed(() => books.value.length)

const categoryStats = computed(() => {
  return categories.value.map(cat => {
    const count = books.value.filter(book => book.category === cat).length
    return { name: cat, count }
  })
})

function borrowBook(book) {
  if (book.available > 0) {
    book.available--
    book.borrow++
    let borrowed = JSON.parse(localStorage.getItem('borrowedBooks') || '[]')
    const idx = borrowed.findIndex(b => b.id === book.id)
    const borrowDate = new Date().toLocaleString()
    if (idx !== -1) {
      borrowed[idx].borrow++
      borrowed[idx].lastBorrowed = borrowDate
    } else {
      borrowed.push({ ...book, borrow: 1, available: undefined, lastBorrowed: borrowDate })
    }
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowed))
  }
}
</script>