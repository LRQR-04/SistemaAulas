<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const correo = ref("");
const contrasenia = ref("");

const auth = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    const res = await api.post("/auth/login", {
      correo: correo.value,
      contrasenia: contrasenia.value,
    });

    auth.setAuth(res.data.usuario, res.data.token);
    router.push("/dashboard");
  } catch (error) {
    alert("Error al iniciar sesión");
  }
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px; width: 250px">
    <h2>Login</h2>
    <input v-model="correo" placeholder="Correo" />
    <input v-model="contrasenia" type="password" placeholder="Contraseña" />
    <button @click="login">Ingresar</button>

    <p>
      ¿No tienes cuenta?
      <router-link to="/registro">Regístrate</router-link>
    </p>
  </div>
</template>
