<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../../components/BaseButton.vue";

const router = useRouter();
const token = localStorage.getItem("token") || "";
console.log("Token:", token);
const fullName = ref("");
const idCard = ref("");
const studentClass = ref("");

const classOptions = ["wmad", "sales"];

const apiUrl = "http://localhost:3000/api/students";

async function handleSubmit() {
  if (!fullName.value || !idCard.value || !studentClass.value) {
    alert("Please fill in all fields.");
    return;
  }

  const payload = {
    full_name: fullName.value,
    id_card: idCard.value,
    student_class: studentClass.value,
  };

  console.log("Submitting student:", payload);

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const err = await res.json();
      console.error("Error response:", err);
      throw new Error(err.message || "Failed to create student");
    }

    alert("Student created successfully!");

    router.push("/students").then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error("Submit error:", error);
    alert("Error: " + error.message);
  }
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="w-full p-4 mb-6 bg-white h-full">
    <div class="flex flex-col items-center p-7">
      <h1 class="text-2xl font-bold mb-6 text-blue-600">Add New Student</h1>
      <form class="w-full max-w-md space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-bold mb-2" for="fullName"
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
          <label class="block text-sm font-bold mb-2" for="idCard"
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
          <label class="block text-sm font-bold mb-2" for="studentClass"
            >Class</label
          >
          <select
            id="studentClass"
            v-model="studentClass"
            class="shadow border rounded w-full py-2 px-3"
            required
          >
            <option disabled value="">Select class</option>
            <option v-for="cls in classOptions" :key="cls" :value="cls">
              {{ cls }}
            </option>
          </select>
        </div>

        <BaseButton
          label="Add Student"
          variant="primary"
          @click="goBack"
          customClass="px-3 py-2 w-full"
        />

        <BaseButton
          label="Back"
          variant="secondary"
          @click="goBack"
          customClass="bg-gray-300 border border-gray-300 text-gray-700 rounded-lg text-sm w-full px-3 py-2"
        />
      </form>
    </div>
  </div>
</template>
