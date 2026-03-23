import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Reservaciones from "../views/Reservaciones.vue";
import Espacios from "../views/Espacios.vue";
import Registro from "../views/Registro.vue";

const rutas = [
  { path: "/", component: Login },
  { path: "/registro", component: Registro },
  { path: "/dashboard", component: Dashboard },
  { path: "/reservaciones", component: Reservaciones },
  { path: "/espacios", component: Espacios },
];

const router = createRouter({
  history: createWebHistory(),
  routes: rutas,
});

router.beforeEach((to, from) => {
  const auth = useAuthStore();

  if (to.path !== "/" && to.path !== "/registro" && !auth.token) {
    return "/";
  }

  return true;
});

export default router;
