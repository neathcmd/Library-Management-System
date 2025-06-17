<script>
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
  <div class="flex w-full h-screen items-center justify-center bg-blue-200">
    <div class="rounded-xl shadow-lg flex w-full h-screen">
      <div
        class="w-1/2 p-6 hidden md:flex flex-col justify-center items-center rounded-l-xl"
      >
        <img src="/src/assets/library.png" alt="" class="w-100 mt-30" />
      </div>
      <div class="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div class="flex mb-6">
          <img src="/src//assets/boy.png" alt="" class="w-40" />
          <div class="font-bold text-gray-800 justify-center items-center">
            <h2 class="text-4xl">LIBRARY</h2>
            <p class="mt-2 text-2xl">Management System</p>
          </div>
        </div>
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
            class="w-50 md:ml-97 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
