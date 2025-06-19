<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ref } from "vue";

// Register chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const monthlyData = ref([
  { month: "Jan", value: 150 },
  { month: "Feb", value: 180 },
  { month: "Mar", value: 120 },
  { month: "Apr", value: 90 },
  { month: "May", value: 200 },
  { month: "Jun", value: 170 },
  { month: "Jul", value: 140 },
  { month: "Aug", value: 160 },
  { month: "Sep", value: 190 },
  { month: "Oct", value: 110 },
  { month: "Nov", value: 130 },
  { month: "Dec", value: 210 },
]);

const chartData = {
  labels: monthlyData.value.map((item) => item.month),
  datasets: [
    {
      label: "Borrowed Books (per month)",
      data: monthlyData.value.map((item) => item.value),
      backgroundColor: "#4F46E5",
    },
  ],
};

const getCurrentYear = new Date().getFullYear();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    title: {
      display: true,
      text: "Monthly Borrowing Trends -" + getCurrentYear,
    },
  },
};
</script>

<template>
  <div class="w-full h-[25rem]">
    <!-- more space -->
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
