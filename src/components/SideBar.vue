<script setup lang="ts">
import { ref } from "vue";

const navBarItems = ref([
  { label: "Dashboard", href: "/" },
  { label: "Borrow", href: "/borrow" },
  { label: "Students", href: "/students" },
  { label: "Books", href: "/books" },
]);
</script>

<template>
  <div class="flex flex-col items-center w-52 h-screen bg-gray-900">
    <div class="border-b border-white/50">
      <h1 class="p-4">Welcome to Dashboard</h1>
    </div>
    <ul class="space-y-2">
      <li
        v-for="(item, index) in navBarItems"
        :key="index"
        class="text-white hover:underline"
      >
        <a :href="item.href">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>
