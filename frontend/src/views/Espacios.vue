<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import CardAula from "../components/CardEspacio.vue";
import MainLayout from "../layouts/MainLayout.vue";

const espacios = ref([]);

onMounted(async () => {
  try {
    const res = await api.get("/espacios");
    espacios.value = res.data;
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <MainLayout>
    <h2>Espacios disponibles</h2>
    <CardAula
      v-for="espacio in espacios"
      :key="espacio.id"
      :espacio="espacio"
    />
  </MainLayout>
</template>
