<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const passwordError = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  passwordError.value = !username.value || !password.value;
  if (passwordError.value) return;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.message || "Invalid credentials"}`);
      return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    router.push("/");
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again.");
  }
};
</script>
<template>
  <div
    class="flex flex-col md:flex-row w-full h-screen items-center justify-center bg-amber-50"
  >
    <div class="w-full md:w-1/2 p-8 flex flex-col justify-center shadow-2xl">
      <div class="flex items-center mb-6 space-x-4">
        <img src="/src/assets/boy.png" alt="Boy" class="w-24 md:w-40" />
        <div class="font-bold text-gray-800">
          <h2 class="text-3xl md:text-4xl">LIBRARY</h2>
          <p class="text-xl md:text-2xl">Management System</p>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model.trim="username"
            :class="[
              'w-full border rounded px-3 py-2 focus:outline-none',
              passwordError && !username ? 'border-red-500' : 'border-blue-400',
            ]"
            placeholder="your username"
            required
          />
          <p
            v-if="passwordError && !username"
            class="text-sm text-red-600 mt-1"
          >
            ⚠️ This field is required
          </p>
        </div>

        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model.trim="password"
            placeholder="password..."
            :class="[
              'w-full border rounded px-3 py-2 focus:outline-none',
              passwordError && !password ? 'border-red-500' : 'border-blue-400',
            ]"
            required
          />
          <p
            v-if="passwordError && !password"
            class="text-sm text-red-600 mt-1"
          >
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
          v-if="!passwordError"
          :disabled="!username || !password"
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  </div>
</template>
