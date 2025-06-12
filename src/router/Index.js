import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Books from "../pages/book/Books.vue";
import Students from "../pages/student/Students.vue";
import Borrow from "../pages/borrow/Borrow.vue";

const routes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/books",
    component: Books,
  },
  {
    path: "/students",
    component: Students,
  },
  {
    path: "/borrow",
    component: Borrow,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
