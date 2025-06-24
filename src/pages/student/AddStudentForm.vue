<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Router
const router = useRouter();

// Get token from localStorage
const token = localStorage.getItem("token") || "";

// Form fields
const fullName = ref("");
const idCard = ref("");
const studentClass = ref("");
const createdBy = ref("");

// API endpoint
const apiUrl = "http://localhost:3000/api/students";

// Submit form
async function handleSubmit() {
  if (
    !fullName.value ||
    !idCard.value ||
    !studentClass.value ||
    !createdBy.value
  ) {
    alert("Please fill in all fields.");
    return;
  }

  const payload = {
    full_name: fullName.value,
    id_card: idCard.value,
    class: studentClass.value,
    created_by: Number(createdBy.value),
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to create student");
    }

    alert("Student created successfully!");
    router.push("/students");
  } catch (error) {
    alert("Error: " + error.message);
  }
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="w-full p-4 mb-6 bg-white h-full">
    <div class="flex p-7 mb-4 h-full">
      <!-- Form Section -->
      <div class="ms-6 w-1/2 px-32 py-16 rounded-xl shadow-lg">
        <h1 class="text-2xl font-bold mb-4 p-4 text-center text-blue-600">
          Add New Student
        </h1>
        <form class="max-w-sm mx-auto space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="fullName" class="block text-sm font-bold mb-2"
              >Full Name</label
            >
            <input
              type="text"
              id="fullName"
              v-model="fullName"
              class="shadow border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div>
            <label for="idCard" class="block text-sm font-bold mb-2"
              >ID Card</label
            >
            <input
              type="text"
              id="idCard"
              v-model="idCard"
              class="shadow border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div>
            <label for="studentClass" class="block text-sm font-bold mb-2"
              >Class</label
            >
            <input
              type="text"
              id="studentClass"
              v-model="studentClass"
              class="shadow border rounded w-full py-2 px-3"
              required
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-full px-3 py-2 mt-4"
          >
            Add Student
          </button>
          <button
            type="button"
            @click="goBack"
            class="text-gray-700 bg-gray-200 rounded-lg text-sm w-full px-3 py-2 hover:bg-gray-300"
          >
            Back
          </button>
        </form>
      </div>

      <!-- Image Section -->
      <div class="mt-6 ms-6 w-1/2 px-32 py-16">
        <img
          class="w-full h-full object-cover"
          src="../assets/image.png"
          alt="Student Image"
        />
      </div>
    </div>
  </div>
</template>
