<script setup>
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div>
    <div><SideBar /></div>
    <nav>
      <router-link to="/"></router-link>
      <router-link to="/about"></router-link>
    </nav>

    <router-view />
  </div>
</template>
