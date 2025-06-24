<template>
  <div>
    <h2 class="text-4xl font-extrabold mb-10 text-[#18204c] text-center">
      Student List
    </h2>

    <div class="flex justify-start mb-4">
      <router-link to="/add-student">
        <BaseButton variant="primary" label="+ Add New Student" />
      </router-link>
    </div>

    <table class="w-full border border-collapse">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="p-2 border">#</th>
          <th class="p-2 border">ID Card</th>
          <th class="p-2 border">Full Name</th>
          <th class="p-2 border">Class</th>
          <th class="p-2 border">Created By</th>
          <th class="p-2 border">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(student, index) in students"
          :key="student.id"
          class="border-b"
        >
          <td class="p-2 border">{{ index + 1 }}</td>
          <td class="p-2 border">{{ student.id_card }}</td>
          <td class="p-2 border">{{ student.full_name }}</td>
          <td class="p-2 border">{{ student.class }}</td>
          <td class="p-2 border">{{ student.created_by ?? "N/A" }}</td>
          <td class="p-2">
            <button
              @click="deleteStudent(student.id, index)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import BaseButton from "../../components/BaseButton.vue";

const students = ref([]);

const fetchStudents = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:3000/api/students?page=1&limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = response.data;
    console.log("Fetched students:", data);

    students.value = data.students || [];
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const deleteStudent = async (studentId, index) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/api/students/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    students.value.splice(index, 1);
    alert("Student deleted successfully.");
  } catch (error) {
    console.error("Failed to delete student:", error);
    alert("Failed to delete student.");
  }
};

onMounted(() => {
  fetchStudents();
});
</script>
