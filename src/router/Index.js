import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../Layouts/DashboardLayout.vue";
import AuthLayout from "../Layouts/AuthLayout.vue";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard.vue";
import Books from "../pages/book/Books.vue";
import Students from "../pages/student/Students.vue";
import Borrow from "../pages/borrow/Borrow.vue";

// Auth Page
// import Login from "../pages/auth/Login.vue";

const routes = [
  // {
  //   path: "/login",
  //   component: AuthLayout,
  //   children: [
  //     {
  //       path: "",
  //       name: "Login",
  //       component: Login,
  //     },
  //   ],
  // },
  {
    path: "/",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "books",
        name: "Books",
        component: Books,
      },
      {
        path: "students",
        name: "Students",
        component: Students,
      },
      {
        path: "borrow",
        name: "Borrow",
        component: Borrow,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });

export default router;
