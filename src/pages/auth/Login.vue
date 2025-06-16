<script>
import pse from "../../assets/PSELOGO.png";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Email:", this.email);
      console.log("Password:", this.password);
    },
  },
};
</script>
<template>
  <div
    class="flex w-full h-screen items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 p-4"
  >
    <div class="bg-white rounded-xl shadow-lg flex w-full max-w-4xl">
      <div
        class="w-1/2 bg-blue-100 p-6 hidden md:flex flex-col justify-center items-center rounded-l-xl"
      >
        <img :src="pse" alt="" class="w-40 mb-4" />
      </div>
      <div class="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div class="flex justify-center mb-6">
          <img src="" alt="" class="w-14" />
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800">
          Library Management System
        </h2>
        <form @submit.prevent="login" class="mt-6 space-y-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              v-model="email"
              class="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              v-model="password"
              class="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
