<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";

const nombre = ref("");
const correo = ref("");
const contrasenia = ref("");
const tipo = ref("estudiante");

const router = useRouter();

const registro = async () => {
  try {
    await api.post("/auth/registro", {
      nombre: nombre.value,
      correo: correo.value,
      contrasenia: contrasenia.value,
      tipo: tipo.value,
    });

    alert("Registro exitoso");
    router.push("/");
  } catch (error) {
    alert(
      error.response?.data?.message || "Ha ocurrido un error en el registro",
    );
  }
};
</script>

<template>
  <div>
    <h2>Registro</h2>

    <input v-model="nombre" placeholder="Nombre" />
    <input v-model="correo" placeholder="Correo" />
    <input v-model="contrasenia" type="password" placeholder="Contraseña" />

    <select v-model="tipo">
      <option value="estudiante">Estudiante</option>
      <option value="profesor">Profesor</option>
    </select>

    <button type="button" @click="registro">Registrarse</button>

    <p>
      ¿Ya tienes cuenta?
      <router-link to="/">Inicia sesión</router-link>
    </p>
  </div>
</template>
