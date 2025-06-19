<script setup>
import { useRoute } from 'vue-router'
import SideBar from "./components/SideBar.vue";
import Header from "./components/Header.vue";

const route = useRoute()
</script>

<template>
  <div class="h-screen flex">
    <!-- Sidebar (hide on login page) -->
    <aside v-if="route.path !== '/login'" class="flex-shrink-0 h-full">
      <SideBar class="border-r border-white/20" />
    </aside>

    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Header (hide on login page) -->
      <header v-if="route.path !== '/login'">
        <Header />
      </header>

      <!-- Scrollable Main Content -->
      <main class="flex-1 overflow-auto bg-gray-200 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>