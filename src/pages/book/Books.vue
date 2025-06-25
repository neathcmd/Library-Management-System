<template>
  <div class="flex gap-6">
    <!-- Main Content -->
    <div class="flex-1">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <input
            v-model="search"
            type="text"
            placeholder="Search books, authors, or categories..."
            class="w-96 px-4 py-2 border border-gray-300 rounded focus:outline-none"
          />
          <button
            class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 font-semibold"
            @click="showAddBook = true"
          >
            + Add New Book
          </button>
        </div>
      </div>

      <!-- Add Book Modal -->
      <div v-if="showAddBook" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Add New Book</h2>
          <input v-model="newBook.title" placeholder="Title" class="w-full mb-2 px-3 py-2 border rounded" />
          <input v-model="newBook.description" placeholder="Description" class="w-full mb-2 px-3 py-2 border rounded" />
          <input v-model="newBook.author_name" placeholder="Author" class="w-full mb-2 px-3 py-2 border rounded" />
          <input v-model="newBook.category" placeholder="Category" class="w-full mb-2 px-3 py-2 border rounded" />
          <input v-model.number="newBook.quantity" type="number" min="1" placeholder="Quantity" class="w-full mb-2 px-3 py-2 border rounded" />
          <div class="flex justify-end gap-2">
            <button @click="showAddBook = false" class="px-4 py-2 rounded bg-gray-300">Cancel</button>
            <button @click="addBook" class="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
          </div>
        </div>
      </div>

      <!-- Books Table -->
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

        <!-- Table -->
        <div class="overflow-auto">
          <table class="min-w-full table-auto border-collapse">
            <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th class="px-4 py-2 border">#</th>
                <th class="px-4 py-2 border">Title</th>
                <th class="px-4 py-2 border">Description</th>
                <th class="px-4 py-2 border">Author</th>
                <th class="px-4 py-2 border">Category</th>
                <th class="px-4 py-2 border">Available</th>
                <th class="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(book, index) in filteredBooks" :key="book.id" class="text-sm text-gray-800 hover:bg-gray-50">
                <td class="px-4 py-2 border">{{ index + 1 + (currentPage - 1) * limit }}</td>
                <td class="px-4 py-2 border">{{ book.title }}</td>
                <td class="px-4 py-2 border">{{ book.description }}</td>
                <td class="px-4 py-2 border">{{ book.author_name }}</td>
                <td class="px-4 py-2 border">{{ book.category }}</td>
                <td class="px-4 py-2 border">{{ book.quantity }}</td>
                <td class="px-4 py-2 border">
                  <button
                    :disabled="book.quantity === 0"
                    @click="borrowBook(book)"
                    class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Borrow
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-end mt-4 gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span class="px-4 py-2 text-gray-700 font-medium">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
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
        <div v-for="cat in categories" :key="cat" class="mb-4">
          <div class="flex justify-between mb-1">
            <span class="text-gray-700">{{ cat }}</span>
            <span class="text-gray-500">{{ categoryCount(cat) }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded h-2">
            <div
              class="bg-blue-500 h-2 rounded"
              :style="{ width: (categoryCount(cat) / totalBooks * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// JWT token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImxpYmVyaWFuIiwiaWF0IjoxNzUwNzM3ODU5fQ.LNgnneFGZcBePz7V-D_EnwGRxxE2xYkydmbRHnPj-Y0'

// UI State
const search = ref('')
const selectedCategory = ref('')
const showAddBook = ref(false)

const newBook = ref({
  title: '',
  description: '',
  author_name: '',
  category: '',
  quantity: 1
})

// Pagination State
const currentPage = ref(1)
const totalPages = ref(1)
const limit = 5

const books = ref([])

// Fetch books with pagination
async function fetchBooks() {
  try {
    const res = await fetch(`http://localhost:3000/api/books?page=${currentPage.value}&limit=${limit}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    books.value = data.books || []
    totalPages.value = data.totalPages || 1
  } catch (error) {
    console.error('Failed to fetch books:', error)
  }
}

// Page controls
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchBooks()
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchBooks()
  }
}

onMounted(fetchBooks)

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const text = search.value.toLowerCase()
    const matchSearch =
      book.title.toLowerCase().includes(text) ||
      (book.author_name?.toLowerCase() ?? '').includes(text) ||
      book.category.toLowerCase().includes(text)

    const matchCat = !selectedCategory.value || book.category === selectedCategory.value
    return matchSearch && matchCat
  })
})

const totalBooks = computed(() => books.value.length)

const categories = computed(() => {
  const all = books.value.map(book => book.category)
  return [...new Set(all)]
})

function categoryCount(cat) {
  return books.value.filter(book => book.category === cat).length
}

// Just push locally for now
function addBook() {
  const { title, description, author_name, category, quantity } = newBook.value
  if (title && author_name && category && quantity > 0) {
    books.value.push({
      id: Date.now(),
      title,
      description,
      author_name,
      category,
      quantity,
      created_by: 1
    })
    showAddBook.value = false
    newBook.value = { title: '', description: '', author_name: '', category: '', quantity: 1 }
  } else {
    alert('Please fill all fields correctly.')
  }
}

function borrowBook(book) {
  if (book.quantity > 0) {
    book.quantity--
  }
}
</script>
