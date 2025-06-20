<script setup lang="ts">
import { ref, computed } from "vue";
import PSELOGO from "../assets/PSELOGO.png";
import { useRoute } from "vue-router";

// Navigation items with Font Awesome icons
interface NavItem {
  label: string;
  href: string;
  icon: string; // Font Awesome class name
  description?: string;
}

const navBarItems = ref<NavItem[]>([
  {
    label: "Dashboard",
    href: "/",
    icon: "fa-solid fa-chart-column ",
    description: "View system overview and statistics",
  },
  {
    label: "Borrow",
    href: "/borrow",
    icon: "fa-solid fa-book-open-reader",
    description: "Manage book borrowing",
  },
  {
    label: "Books",
    href: "/books",
    icon: "fa-solid fa-book",
    description: "Browse and manage books",
  },
  {
    label: "Students",
    href: "/students",
    icon: "fa-solid fa-user-graduate",
    description: "Manage student records",
  },
]);

// Logo configuration
const logoConfig = {
  src: PSELOGO,
  alt: "PSE Logo - Library Management System",
  title: "PSE Library System",
} as const;

const route = useRoute();

// Computed property for better performance
const isActive = computed(() => (href: string) => route.path === href);

// Enhanced link classes with better visual feedback using only Tailwind
const getLinkClasses = (href: string) => {
  const baseClasses =
    "group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";

  if (isActive.value(href)) {
    return `${baseClasses} bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-semibold shadow-sm`;
  }

  return `${baseClasses} text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm`;
};

const getIconClasses = (href: string) => {
  const baseClasses = "w-5 h-5 text-center transition-colors duration-200";

  if (isActive.value(href)) {
    return `${baseClasses} text-blue-600`;
  }

  return `${baseClasses} text-gray-500 group-hover:text-gray-700`;
};
</script>

<template>
  <aside
    class="w-64 bg-white text-gray-900 h-full shadow-lg flex flex-col border-r border-gray-400"
    role="navigation"
    aria-label="Main navigation"
  >
    <!-- Logo Section -->
    <header class="px-6 py-6 border-b border-gray-400">
      <router-link to="/">
        <div class="flex items-center justify-center">
          <img
            :src="logoConfig.src"
            :alt="logoConfig.alt"
            :title="logoConfig.title"
            class="max-h-12 w-auto object-contain"
            loading="lazy"
          />
        </div>
      </router-link>
    </header>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-6" aria-label="Sidebar navigation">
      <ul class="space-y-1" role="list">
        <li
          v-for="(item, index) in navBarItems"
          :key="`nav-${item.href}-${index}`"
          role="listitem"
        >
          <router-link
            :to="item.href"
            :class="getLinkClasses(item.href)"
            :aria-current="isActive(item.href) ? 'page' : undefined"
            :title="item.description"
          >
            <!-- Font Awesome Icon -->
            <i
              :class="[item.icon, getIconClasses(item.href)]"
              aria-hidden="true"
            ></i>

            <!-- Label -->
            <span class="font-medium tracking-wide">{{ item.label }}</span>

            <!-- Active indicator -->
            <div v-if="isActive(item.href)" class="ml-auto flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Theme button here -->
    <div class="px-4 py-4 border-t border-gray-200">
      <div class="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
        <p>Theme button here</p>
      </div>
    </div>
  </aside>
</template>

<style>
/* Import Font Awesome - Add this to your main CSS file or index.html */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
