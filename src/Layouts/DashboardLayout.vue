<script setup>
import SideBar from "../components/SideBar.vue";
import Header from "../components/Header.vue";
</script>

<template>
  <div class="h-screen flex">
    <aside class="flex-shrink-0 h-full">
      <SideBar class="border-r border-white/20" />
    </aside>

    <div class="flex flex-col flex-1 overflow-hidden">
      <header>
        <Header />
      </header>
      <main class="flex-1 overflow-x-scroll bg-gray-200 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>
