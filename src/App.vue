<script setup>
import SideBar from "./components/SideBar.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="h-screen flex">
    <!--  Sidebar -->
    <aside class="flex-shrink-0 h-full">
      <SideBar class="border-r border-white/20" />
    </aside>

    <div class="flex flex-col flex-1 overflow-hidden">
      <!--  Header -->
      <header>
        <Header />
      </header>

      <!-- Scrollable Main Content -->
      <main class="flex-1 overflow-auto bg-gray-800">
        <router-view />
      </main>
    </div>
  </div>
</template>
