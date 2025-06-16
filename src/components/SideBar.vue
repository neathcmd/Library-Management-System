<script setup lang="ts">
import { ref } from "vue";
import PSELOGO from "../assets/PSELOGO.png";
import { useRoute } from "vue-router";
const navBarItems = ref([
  { label: "Dashboard", href: "/" },
  { label: "Borrow", href: "/borrow" },
  { label: "Books", href: "/books" },
  { label: "Students", href: "/students" },
]);

const Logo = {
  img: PSELOGO,
  alt: "This is the logo",
};

const route = useRoute();

const isActive = (href: string) => {
  return route.path === href;
};
</script>

<template>
  <!-- Sidebar -->
  <aside class="w-52 bg-white text-gray-900 h-full shadow-lg flex flex-col">
    <div class="px-6 py-5 border-b border-gray-400">
      <img :src="Logo.img" :alt="Logo.alt" />
    </div>
    <ul class="flex-1 p-4 space-y-3">
      <li v-for="(item, index) in navBarItems" :key="index">
        <router-link
          :to="item.href"
          :class="[
            'px-3 py-2 rounded transition-colors block',
            isActive(item.href)
              ? 'bg-gray-700 font-semibold'
              : 'hover:bg-gray-700',
          ]"
        >
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>
