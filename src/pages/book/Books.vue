<template>
  <div class="flex gap-6">
    <!-- Main Content -->
    <div class="flex-1">
      <!-- Header -->
      <div
        class="flex items-center justify-between mb-4 bg-white p-4 rounded-lg"
      >
        <div class="flex items-center gap-3 w-full">
          <div class="relative flex-1 max-w-[54rem]">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="fa-solid fa-magnifying-glass h-5 w-5 text-gray-500"></i>
            </div>

            <input
              v-model="search"
              type="text"
              placeholder="Search books, authors, or categories..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
            />

            <div
              v-if="search"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <button
                @click="search = ''"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <BaseButton
            label="+ Add New Book"
            variant="primary"
            @click="showAddBook = true"
            class="whitespace-nowrap"
          />
        </div>
      </div>

      <!-- Add Book Modal -->
      <div
        v-if="showAddBook"
        class="fixed inset-0 bg-black/50 bg-opacity-30 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Add New Book</h2>
          <input
            v-model="newBook.title"
            placeholder="Title"
            class="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            v-model="newBook.description"
            placeholder="Description"
            class="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            v-model="newBook.author_name"
            placeholder="Author"
            class="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            v-model="newBook.category"
            placeholder="Category"
            class="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            v-model.number="newBook.quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            class="w-full mb-2 px-3 py-2 border rounded"
          />
          <div class="flex justify-end gap-2">
            <BaseButton
              label="Cancel"
              variant="secondary"
              @click="showAddBook = false"
              customClass="px-4 py-2 rounded "
            />
            <BaseButton
              label="Add"
              variant="primary"
              @click="addBook"
              customClass="px-4 py-2 rounded"
            />
          </div>
        </div>
      </div>

      <!-- Books Table -->
      <div class="bg-white rounded shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <span class="text-xl font-bold">Books</span>
            <span class="ml-2 text-gray-500"
              >({{ filteredBooks.length }} books)</span
            >
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-700">Sort by Category:</span>
            <select v-model="selectedCategory" class="border px-3 py-2 rounded">
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-auto">
          <table class="min-w-full table-auto border-collapse">
            <thead
              class="bg-gray-100 text-left text-sm font-semibold text-gray-700"
            >
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
              <tr
                v-for="(book, index) in filteredBooks"
                :key="book.id"
                class="text-sm text-gray-800 hover:bg-gray-50"
              >
                <td class="px-4 py-2 border">
                  {{ index + 1 + (currentPage - 1) * limit }}
                </td>
                <td class="px-4 py-2 border">{{ book.title }}</td>
                <td class="px-4 py-2 border">{{ book.description }}</td>
                <td class="px-4 py-2 border">{{ book.author_name }}</td>
                <td class="px-4 py-2 border">{{ book.category }}</td>
                <td class="px-4 py-2 border">{{ book.quantity }}</td>
                <td class="px-4 py-2 border">
                  <BaseButton
                    label="Borrow"
                    variant="primary"
                    :disabled="book.quantity === 0"
                    @click="borrowBook(book)"
                    customClass="px-3 py-1 rounded "
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-end mt-4 gap-2">
          <BaseButton
            label="Previous"
            variant="secondary"
            @click="prevPage"
            :disabled="currentPage === 1"
            customClass="px-4 py-2 rounded  "
          />

          <span class="px-4 py-2 text-gray-700 font-medium">
            Page {{ currentPage }} of {{ totalPages }}
          </span>

          <BaseButton
            label="Next"
            variant="primary"
            @click="nextPage"
            :disabled="currentPage === totalPages"
            customClass="px-4 py-2 rounded"
          />
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <!-- <aside class="w-80">
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
              :style="{ width: (categoryCount(cat) / totalBooks) * 100 + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </aside> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BaseButton from "../../components/BaseButton.vue";

// JWT token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImxpYmVyaWFuIiwiaWF0IjoxNzUwNzM3ODU5fQ.LNgnneFGZcBePz7V-D_EnwGRxxE2xYkydmbRHnPj-Y0";

// UI State
const search = ref("");
const selectedCategory = ref("");
const showAddBook = ref(false);

const newBook = ref({
  title: "",
  description: "",
  author_name: "",
  category: "",
  quantity: 1,
});

// Pagination State
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 5;

const books = ref([]);

// Fetch books with pagination
async function fetchBooks() {
  try {
    const res = await fetch(
      `http://localhost:3000/api/books?page=${currentPage.value}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    books.value = data.books || [];
    totalPages.value = data.totalPages || 1;
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
}

// Page controls
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchBooks();
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchBooks();
  }
}

onMounted(fetchBooks);

const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const text = search.value.toLowerCase();
    const matchSearch =
      book.title.toLowerCase().includes(text) ||
      (book.author_name?.toLowerCase() ?? "").includes(text) ||
      book.category.toLowerCase().includes(text);

    const matchCat =
      !selectedCategory.value || book.category === selectedCategory.value;
    return matchSearch && matchCat;
  });
});

const totalBooks = computed(() => books.value.length);

const categories = computed(() => {
  const all = books.value.map((book) => book.category);
  return [...new Set(all)];
});

function categoryCount(cat) {
  return books.value.filter((book) => book.category === cat).length;
}

// Just push locally for now
function addBook() {
  const { title, description, author_name, category, quantity } = newBook.value;
  if (title && author_name && category && quantity > 0) {
    books.value.push({
      id: Date.now(),
      title,
      description,
      author_name,
      category,
      quantity,
      created_by: 1,
    });
    showAddBook.value = false;
    newBook.value = {
      title: "",
      description: "",
      author_name: "",
      category: "",
      quantity: 1,
    };
  } else {
    alert("Please fill all fields correctly.");
  }
}

function borrowBook(book) {
  if (book.quantity > 0) {
    book.quantity--;
  }
}
</script>
