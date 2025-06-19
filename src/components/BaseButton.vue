<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "primary",
  },
  customClass: {
    type: String,
    default: "",
  },
});

const computedClasses = computed(() => {
  let base =
    "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105";
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:-translate-y-1 hover:scale-105",
    secondary: "bg-gray-200 hover:bg-gray-300 text-black",
  };
  return `${base} ${styles[props.variant] || ""} ${props.customClass}`;
});
</script>

<template>
  <button :class="computedClasses" @click="$emit('click')">
    {{ props.label }}
  </button>
</template>
