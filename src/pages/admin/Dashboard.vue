<script setup>
import { ref, computed } from "vue";

const students = ref([
  {
    id: 1,
    name: "Alice Johnson",
    book: "To Kill a Mockingbird",
    borrowDate: "2024-06-01",
    category: "Fiction",
  },
  {
    id: 2,
    name: "Bob Smith",
    book: "The Great Gatsby",
    borrowDate: "2024-06-03",
    category: "Fiction",
  },
  {
    id: 3,
    name: "Carol Davis",
    book: "A Brief History of Time",
    borrowDate: "2024-06-05",
    category: "Science",
  },
  {
    id: 4,
    name: "David Wilson",
    book: "1984",
    borrowDate: "2024-06-07",
    category: "Fiction",
  },
  {
    id: 5,
    name: "Eva Brown",
    book: "The Origin of Species",
    borrowDate: "2024-06-08",
    category: "Science",
  },
  {
    id: 6,
    name: "Frank Miller",
    book: "World War II",
    borrowDate: "2024-06-09",
    category: "History",
  },
  {
    id: 7,
    name: "Grace Lee",
    book: "Pride and Prejudice",
    borrowDate: "2024-06-10",
    category: "Fiction",
  },
  {
    id: 8,
    name: "Henry Taylor",
    book: "The Art of War",
    borrowDate: "2024-06-11",
    category: "Philosophy",
  },
  {
    id: 9,
    name: "Harry Porter",
    book: "The lord of the Rings",
    borrowDate: "2024-06-13",
    category: "Philosophy",
  },
  {
    id: 10,
    name: "Kamado Tanjirou",
    book: "Demon Slayer",
    borrowDate: "2024-06-12",
    category: "Philosophy",
  },
]);
//  count total students
const totalStudents = computed(() => students.value.length);

const bookCategories = ref([
  {
    category: "Youth Novel",
    count: 30,
  },
  {
    category: "Educational",
    count: 52,
  },
  {
    category: "Theology",
    count: 90,
  },
  {
    category: "Development ",
    count: 45,
  },
  {
    category: "Science ",
    count: 45,
  },
  {
    category: "History ",
    count: 45,
  },
  {
    category: "Song Book ",
    count: 45,
  },
  {
    category: "Technology ",
    count: 45,
  },
]);

// Count total books in all categories
const totalBooks = computed(() =>
  bookCategories.value.reduce((sum, books) => sum + books.count, 0)
);
</script>

<template>
  <div class="w-full min-h-screen">
    <div class="flex items-start justify-between space-x-6">
      <!-- total books count -->
      <div
        class="p-6 bg-white text-gray-900 flex items-center justify-between flex-grow rounded-lg"
      >
        <div>
          <h1 class="text-xl font-semibold">Total Books</h1>
          <p class="text-3xl font-bold mt-1">{{ totalBooks }}</p>
        </div>
        <div
          class="bg-blue-500/20 p-4 rounded-xl flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-6 text-blue-400"
            viewBox="0 0 448 512"
          >
            <path
              d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
            />
          </svg>
        </div>
      </div>
      <!-- total students -->
      <div
        class="p-6 bg-white text-gray-900 flex items-center justify-between flex-grow rounded-lg"
      >
        <div>
          <h1 class="text-xl font-semibold">Total Students</h1>
          <p class="text-3xl font-bold mt-1">{{ totalStudents }}</p>
        </div>
        <div
          class="bg-blue-500/20 p-4 rounded-xl flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-6 text-blue-400"
            viewBox="0 0 640 512"
          >
            <path
              d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <!-- Book category -->
      <div class="lg:col-span-2 mt-6">
        <div class="bg-white rounded-xl p-6 shadow">
          <h1 class="text-xl font-semibold text-gray-900 mb-6">
            Books by Category
          </h1>
          <div class="space-y-4">
            <div
              v-for="(category, index) in bookCategories"
              :key="index"
              class="flex items-center space-x-4"
            >
              <!-- Category name -->
              <div class="w-24 text-sm text-gray-800 font-medium truncate">
                {{ category.category }}
              </div>

              <!-- Progress bar -->
              <div
                class="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden shadow-lg"
              >
                <!-- Filter ProgressBar -->
                <div
                  class="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                  :style="{
                    width:
                      totalBooks > 0
                        ? (category.count / totalBooks) * 100 + '%'
                        : '0%',
                  }"
                ></div>

                <div
                  class="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900 drop-shadow-sm"
                >
                  {{ category.count }} books
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="border border-gray-300 rounded-lg p-6 mt-6 bg-white">
          <div>
            <h1 class="text-xl font-semibold text-gray-900 mb-6">
              Book Borrow by Students
            </h1>

            <div class="space-y-3 max-h-96 overflow-y-auto">
              <div
                v-for="student in students"
                :key="student.id"
                class="bg-gray-200 rounded-lg p-4 hover:border hover:border-gray-700 transition-colors"
              >
                <div class="flex flex-col space-y-2">
                  <div class="font-semibold text-gray-900 text-sm">
                    {{ student.name }}
                  </div>
                  <div class="text-gray-800 text-xs">
                    {{ student.book }}
                  </div>
                  <div class="flex justify-between items-center">
                    <span
                      class="text-xs bg-purple-500/20 text-gray-900 px-2 py-1 rounded"
                    >
                      {{ student.category }}
                    </span>
                    <span class="text-xs text-gray-800">
                      {{ student.borrowDate }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
