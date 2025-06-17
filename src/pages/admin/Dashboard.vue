<script setup>
import { ref, computed } from "vue";
import BarChart from "../../components/BarChart.vue";

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
    category: "Development",
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
//  count total students
const totalStudents = computed(() => students.value.length);
// count total category
const totalCategory = computed(() => bookCategories.value.length);
</script>

<template>
  <div class="w-full min-h-screen">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Total Books -->
      <router-link to="/books" class="block">
        <div
          class="p-6 bg-white text-gray-900 flex items-center justify-between rounded-lg hover:shadow-md transition"
        >
          <div>
            <h1 class="text-xl font-semibold">Total Books</h1>
            <p class="text-3xl font-bold mt-1">{{ totalBooks }}</p>
          </div>
          <div
            class="bg-blue-500/20 p-4 rounded-xl flex items-center justify-center"
          >
            <i class="fa-solid fa-book text-xl text-blue-600"></i>
          </div>
        </div>
      </router-link>

      <!-- Total Category -->
      <router-link to="#categories" class="block">
        <div
          class="p-6 bg-white text-gray-900 flex items-center justify-between rounded-lg hover:shadow-md transition"
        >
          <div>
            <h1 class="text-xl font-semibold">Total Category</h1>
            <p class="text-3xl font-bold mt-1">{{ totalCategory }}</p>
          </div>
          <div
            class="bg-blue-500/20 p-4 rounded-xl flex items-center justify-center"
          >
            <i class="fa-solid fa-layer-group text-xl text-blue-600"></i>
          </div>
        </div>
      </router-link>

      <!-- Total Students -->
      <router-link to="/students" class="block">
        <div
          class="p-6 bg-white text-gray-900 flex items-center justify-between rounded-lg hover:shadow-md transition"
        >
          <div>
            <h1 class="text-xl font-semibold">Total Students</h1>
            <p class="text-3xl font-bold mt-1">{{ totalStudents }}</p>
          </div>
          <div
            class="bg-blue-500/20 p-4 rounded-xl flex items-center justify-center"
          >
            <i class="fa-solid fa-user-graduate text-xl text-blue-600"></i>
          </div>
        </div>
      </router-link>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <!-- BarChart section -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl p-6 shadow mt-6">
          <h1 class="text-xl font-semibold text-gray-900 mb-6">
            Chart Analytics
          </h1>
          <div class="w-full">
            <BarChart />
          </div>
        </div>
      </div>

      <!-- Student borrowing section  -->
      <div class="lg:col-span-1">
        <div class="border border-gray-300 rounded-lg p-6 mt-6 bg-white">
          <div>
            <h1 class="text-xl font-semibold text-gray-900 mb-6">
              Book Borrow by Students
            </h1>

            <div class="space-y-3 max-h-[25rem] overflow-y-auto">
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
