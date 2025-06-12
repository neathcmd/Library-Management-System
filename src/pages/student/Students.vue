<template>
  <div>
    <h2 class="title">Student List</h2>
    <table class="student-table">
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Full Name</th>
          <th>Username</th>
          <th>ID_Card</th>
          <th>Class</th>
          <th>Phone No.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ student.fullName }}</td>
          <td>{{ student.username }}</td>
          <td>{{ student.idCard }}</td>
          <td>{{ student.class }}</td>
          <td>{{ student.phone }}</td>
        </tr>

        <!-- Optional: empty rows for design like screenshot -->
        <tr v-for="n in 10 - students.length" :key="'empty-' + n">
          <td colspan="6">&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Students",
  data() {
    return {
      students: [
        {
          fullName: "Try Kimhong",
          username: "trykimhong@123",
          idCard: "22217-4",
          class: "WMAD",
          phone: "09409528688",
        },
        {
          fullName: "Sok Dara",
          username: "sokdara98",
          idCard: "22456-8",
          class: "WMAD",
          phone: "093456789",
        },
        {
          fullName: "San Ma Sreymom",
          username: "sanmasreymom",
          idCard: "22345-2",
          class: "WMAD",
          phone: "092345678",
        },
        // Add more students here if needed
      ],
    };
  },
};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #18204c;
}
.student-table {
  width: 100%;
  border-collapse: collapse;
}
.student-table th {
  background-color: #18204c;
  color: white;
  padding: 10px;
  text-align: left;
  border-radius: 4px;
}
.student-table td {
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
}
.student-table tbody tr:nth-child(even) td {
  background-color: #f1f1f1;
}
</style>
