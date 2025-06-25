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
    "font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer";
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer",
    secondary:
      "border-blue-600 text-blue-600 border hover:bg-blue-600 hover:text-white cursor-pointer",
  };
  return `${base} ${styles[props.variant] || ""} ${props.customClass}`;
});
</script>

<template>
  <button :class="computedClasses" @click="$emit('click')">
    {{ props.label }}
  </button>
</template>
