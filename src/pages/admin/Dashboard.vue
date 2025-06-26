<script setup>
import { ref, onMounted } from "vue";
import BarChart from "../../components/BarChart.vue";
import axios from "axios";

const totalBooks = ref(0);
const totalStudents = ref(0);
const totalCategory = ref(0);
const totalBorrows = ref(0);
const borrowNotReturn = ref(0);
const bookReturned = ref(0);
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
    const res = await axios.get("http://localhost:3000/api/dashboard", config);
    const data = res.data;

    totalBooks.value = data.total_books || 0;
    totalStudents.value = data.total_students || 0;
    totalCategory.value = 0;
    totalBorrows.value = data.total_borrows || 0;
    borrowNotReturn.value = data.borrowed_not_returned || 0;
    bookReturned.value = data.returned || 0;

    const studentRes = await axios.get(
      "http://localhost:3000/api/students?page=1&limit=10",
      config
    );
    console.log(studentRes.data.students, "res");
  } catch (error) {
    console.error("Failed to fetch dashboard or students:", error);
  }
});
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

      <!-- total_borrows -->
      <router-link to="/borrow" class="block">
        <div
          class="p-6 bg-white text-gray-900 flex items-center justify-between rounded-lg hover:shadow-md transition"
        >
          <div>
            <h1 class="text-xl font-semibold">Total Borrow</h1>
            <p class="text-3xl font-bold mt-1">{{ totalBorrows }}</p>
          </div>
          <div
            class="bg-blue-500/20 p-4 rounded-xl flex items-center justify-center"
          >
            <i class="fa-solid fa-user-graduate text-xl text-blue-600"></i>
          </div>
        </div>
      </router-link>

      <!-- borrowed_not_returned -->
      <router-link to="/" class="block">
        <div
          class="p-6 bg-white text-gray-900 flex items-center justify-between rounded-lg hover:shadow-md transition"
        >
          <div>
            <h1 class="text-xl font-semibold">borrowed not returned</h1>
            <p class="text-3xl font-bold mt-1">{{ borrowNotReturn }}</p>
          </div>
          <div
            class="bg-blue-500/20 p-4 rounded-xl flex items-center justify-center"
          >
            <i class="fa-solid fa-user-graduate text-xl text-blue-600"></i>
          </div>
        </div>
      </router-link>

      <!-- returned -->
      <router-link to="/" class="block">
        <div
          class="p-6 bg-white text-gray-900 flex items-center justify-between rounded-lg hover:shadow-md transition"
        >
          <div>
            <h1 class="text-xl font-semibold">Returned</h1>
            <p class="text-3xl font-bold mt-1">{{ bookReturned }}</p>
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

      <!-- Student section  -->
      <div class="lg:col-span-1">
        <div class="border border-gray-300 rounded-lg p-6 mt-6 bg-white">
          <!-- header -->
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-xl font-semibold text-gray-900">
                Current Students
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
            <div v-if="students.length">
              <div
                v-for="student in studentRes.data.students"
                :key="student.id"
                class="bg-gray-200 rounded-lg p-4 hover:border hover:border-gray-700 transition-colors"
              >
                <div class="flex flex-col space-y-2">
                  <div class="font-semibold text-gray-900 text-sm">
                    {{ student.full_name }}
                  </div>
                  <div class="text-gray-800 text-xs">
                    ID: {{ student.id_card }}
                  </div>
                  <div class="flex justify-between items-center">
                    <span
                      class="text-xs bg-purple-500/20 text-gray-900 px-2 py-1 rounded"
                    >
                      {{ student.class }}
                    </span>
                    <span class="text-xs text-gray-800">
                      #{{ student.created_by }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>Loading...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
