<script setup>
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push("/");
};
</script>

<template>
  <nav
    style="
      display: flex;
      gap: 15px;
      background: #333;
      color: white;
      padding: 10px;
    "
  >
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/espacios">Espacios</router-link>
    <router-link to="/reservaciones">Reservaciones</router-link>

    <button @click="logout">Cerrar sesión</button>
  </nav>
</template>
