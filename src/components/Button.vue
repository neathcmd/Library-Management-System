<template>
  <div class="flex gap-4 items-center bg-gray-200 p-4 rounded-lg">
    <!-- Class Button Group -->
    <div class="flex rounded-full overflow-hidden shadow">
      <button
        class="flex items-center gap-2 bg-[#18204c] text-white px-4 py-2 rounded-l-full"
      >
        <span>★</span>
        <span>Class</span>
      </button>
      <button class="bg-[#18204c] text-white px-3 py-2 rounded-r-full">
        ▼
      </button>
    </div>

    <!-- Add Button -->
    <button
      class="flex items-center gap-2 bg-[#18204c] text-white px-6 py-2 rounded-full shadow"
    >
      <span>＋</span>
      <span>Add</span>
    </button>

    <!-- Edit Button -->
    <button
      class="flex items-center gap-2 bg-white text-[#18204c] px-6 py-2 rounded-full border border-[#18204c] shadow"
    >
      <span>✎</span>
      <span>Edit</span>
    </button>
  </div>
</template>
