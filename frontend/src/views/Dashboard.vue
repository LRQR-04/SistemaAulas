<script setup>
import MainLayout from "../layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <h1>Dashboard</h1>
    <router-link to="/espacios">Ver aulas</router-link>
    <br />
    <router-link to="/reservaciones">Mis reservas</router-link>
  </MainLayout>
</template>
