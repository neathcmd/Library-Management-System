<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const showDropdown = ref(false);
const router = useRouter();

const Title = "PSE Library Management System";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminProfile = reactive({
  name: "",
  alt: "admin profile info",
  img: "",
  username: "",
});

onMounted(async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/authors`);
    Object.assign(AdminProfile, {
      name: data.name,
      alt: data.alt,
      img: data.img,
      username: data.username,
    });
  } catch (error) {
    console.error("No Admin user:", error);
    Object.assign(AdminProfile, {
      name: "Admin User",
      alt: "Logo",
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      username: "@admin",
    });
  }
});

// logout handler
const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>

<template>
  <header class="w-full bg-whtie px-8 py-4 shadow-2xl border-b border-gray-400">
    <div class="flex items-center justify-between relative">
      <!-- Title with Icon -->
      <div class="flex items-center space-x-3">
        <div
          class="bg-blue-500/20 p-4 rounded-xl flex items-center justify-center"
        >
          <i class="fa-solid fa-book-open text-xl text-blue-600"></i>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">
          {{ Title }}
        </h1>
      </div>

      <!-- Admin profile dropdown -->
      <div class="relative" @click="toggleDropdown">
        <div
          class="flex items-center space-x-3 cursor-pointer p-2 rounded-xl hover:bg-white/60 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <div class="relative">
            <img
              :src="AdminProfile.img"
              :alt="AdminProfile.alt"
              class="w-11 h-11 rounded-full object-cover border-3 border-blue-200 shadow-md hover:border-blue-300 transition-colors duration-200"
            />
          </div>
          <div class="flex flex-col">
            <p class="text-slate-700 font-semibold text-sm leading-tight">
              {{ AdminProfile.name }}
            </p>
            <p class="text-slate-500 text-xs">Administrator</p>
          </div>

          <i
            class="fa-solid fa-chevron-down w-4 h-4 text-slate-500 transition-transform duration-200 ease-in-out"
            :class="{ 'rotate-180': showDropdown }"
          ></i>
        </div>

        <!-- dropdown menu -->
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-slate-200 z-20 overflow-hidden"
        >
          <div class="py-2">
            <div class="px-4 py-3 border-b border-slate-100">
              <p class="text-sm font-medium text-slate-700">
                {{ AdminProfile.name }}
              </p>
              <p class="text-xs text-slate-500">{{ AdminProfile.username }}</p>
            </div>

            <div class="border-t border-slate-100 mt-1">
              <button
                @click="logout"
                class="flex items-center space-x-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-150 group"
              >
                <i
                  class="fa-solid fa-right-from-bracket w-4 h-4 text-red-500 group-hover:text-red-600"
                ></i>
                <span class="text-sm font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
