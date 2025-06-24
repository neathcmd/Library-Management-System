<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const passwordError = ref(false);

const handleSubmit = () => {
  passwordError.value = !password.value;
  if (!email.value || !password.value) return;
  alert(`Email: ${email.value}, Password: ${password.value}`);
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row w-full h-screen items-center justify-center"
  >
    <div class="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <div class="flex items-center mb-6 space-x-4">
        <img src="/src/assets/boy.png" alt="Boy" class="w-24 md:w-40" />
        <div class="font-bold text-gray-800">
          <h2 class="text-3xl md:text-4xl">LIBRARY</h2>
          <p class="text-xl md:text-2xl">Management System</p>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email address</label
          >
          <input
            type="email"
            v-model="email"
            :class="[
              'w-full border rounded px-3 py-2 focus:outline-none',
              passwordError ? 'border-red-500' : 'border-blue-400',
            ]"
            required
          />
          <p v-if="passwordError" class="text-sm text-red-600 mt-1">
            ⚠️ Please enter your email correctly.
          </p>
        </div>

        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :class="[
              'w-full border rounded px-3 py-2 focus:outline-none',
              passwordError ? 'border-red-500' : 'border-blue-400',
            ]"
            required
          />
          <p v-if="passwordError" class="text-sm text-red-600 mt-1">
            ⚠️ This field is required
          </p>
        </div>

        <div class="mb-6">
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              v-model="showPassword"
              class="form-checkbox"
            />
            <span class="ml-2 text-sm text-gray-600">Show password</span>
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  </div>
</template>
