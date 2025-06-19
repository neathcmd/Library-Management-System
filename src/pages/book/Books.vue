<template>
  <div>

    <h1 style="text-align:center; margin-bottom: 24px;">Library Management System</h1>
    <table class="books-table">
      <thead>
        <tr>
          <th>Books<br>ID</th>

          <th>Title</th>
          <th>Author</th>
          <th>Available</th>
          <th>Borrow</th>
          <th>Other</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>1234</b></td>
          <td>The other side of me</td>
          <td>Sidney Sheldon</td>
          <td>10</td>
          <td>5</td>
          <td></td>
        </tr>
        <tr v-for="n in 6" :key="n">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.books-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 1rem;
}

.books-table th, .books-table td {

  border: 2px solid #1a2341;
  padding: 12px 8px;
  text-align: center;
}
.books-table th {
  background: #1a2341;
  color: #fff;
  font-weight: bold;
}
.books-table td {
  background: #fff;
}
</style>


