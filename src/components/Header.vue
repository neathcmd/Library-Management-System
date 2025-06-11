<script setup>
const AdminProfile = {
  name: "Sol Monineath",
  alt: "Logo",
  img: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
};
</script>

<template>
  <header class="w-full bg-gray-900 px-6 py-4 shadow">
    <div class="flex items-center justify-between">
      <!-- Title -->
      <h1 class="text-white text-lg font-bold">Library Management System</h1>

      <!-- Admin profile section -->
      <div class="flex items-center space-x-3">
        <img
          :src="AdminProfile.img"
          :alt="AdminProfile.alt"
          class="w-10 h-10 rounded-full object-cover"
        />
        <p class="text-white font-medium">{{ AdminProfile.name }}</p>
      </div>
    </div>
  </header>
</template>
