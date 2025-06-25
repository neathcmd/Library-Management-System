<script setup>
import { ref, computed, onMounted } from "vue";
import BarChart from "../../components/BarChart.vue";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const books = ref([]);
const categories = ref([]);
const students = ref([]);

onMounted(async () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  try {
    const [bookres, categoriesres, studentres] = await Promise.all([
      axios.get(`${BASE_URL}/api/books`, config),
      axios.get(`${BASE_URL}/api/categories`, config),
      axios.get(`${BASE_URL}/api/students`, config),
    ]);

    books.value = bookres.data;
    categories.value = categoriesres.data;
    students.value = studentres.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});

// count funtion
const totalBooks = computed(() => books.value.length);
const totalCategory = computed(() => categories.value.length);
const totalStudents = computed(() => students.value.length);

// onMounted(() => {
//   borrowData();
// });

// const borrowData = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const borrowRes = await axios.get(`${BASE_URL}/api/borrows`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(borrowRes.data);
//     return borrowRes.data;
//   } catch (error) {
//     console.log("Can't fetch data", error);
//     return null;
//   }
// };
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
      <router-link to="/books" class="block">
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

    <div class="grid grid-cols-3 gap-6 w-full">
      <!-- BarChart section -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl p-6 shadow mt-6">
          <h1 class="text-xl font-semibold text-gray-900 mb-6">
            Books Borrow Data Analytics
          </h1>
          <div class="w-full">
            <BarChart />
          </div>
        </div>
      </div>

      <!-- Student borrowing section  -->
      <div class="lg:col-span-1">
        <div class="border border-gray-300 rounded-lg p-6 mt-6 bg-white">
          <!-- header -->
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-xl font-semibold text-gray-900">
                Current Borrowers
              </h1>
            </div>
            <router-link to="/borrow" class="group">
              <div
                class="flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <span
                  class="text-xs md:text-sm font-medium text-blue-600 group-hover:text-blue-700"
                >
                  See all
                </span>
                <i
                  class="fa-solid fa-arrow-right text-xs text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all"
                ></i>
              </div>
            </router-link>
          </div>

          <!-- Search Input Field-->
          <div class="py-2">
            <div
              class="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
            >
              <i class="fa-solid fa-magnifying-glass text-gray-500"></i>
              <input
                type="text"
                placeholder="Search"
                class="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                aria-label="Search"
              />
            </div>
          </div>

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
</template>
