<script setup lang="ts">
import { ref } from "vue";
import PSELOGO from "../assets/PSELOGO.png";
import { useRoute } from "vue-router";

const navBarItems = ref([
  {
    label: "Dashboard",
    href: "/",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm16 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v2m16 0l-8.5 6a1 1 0 01-1 0L3 7",
  },
  {
    label: "Borrow",
    href: "/borrow",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    label: "Books",
    href: "/books",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    label: "Students",
    href: "/students",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
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
            'px-3 py-2 rounded transition-colors block flex items-center gap-3',
            isActive(item.href) ? 'bg-gray-200' : 'hover:bg-gray-200',
          ]"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="item.icon"
            />
          </svg>
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>
