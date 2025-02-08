// router/index.js
import { useAuthStore } from "@/store/authStore";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/",
    component: () => import("../views/TableReport.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory("/prueba-tecnica-tk-front-static/"),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  // Verificar autenticación solo si la ruta lo requiere
  if (to.meta.requiresAuth) {
    // Verificar si el token existe y es válido
    const isAuthenticated = authStore.token !== null;

    if (!isAuthenticated) {
      return "/login";
    }
  }
});

export default router;
