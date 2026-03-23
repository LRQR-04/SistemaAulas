<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import CardReservacion from "../components/CardReservacion.vue";
import FormularioReservacion from "../components/FormularioReservacion.vue";

const reservaciones = ref([]);

const cargarReservaciones = async () => {
  try {
    const res = await api.get("/reservaciones");
    reservaciones.value = res.data;
  } catch (e) {
    console.error(e);
  }
};

onMounted(cargarReservaciones);

const crearReservacion = async (data) => {
  try {
    await api.post("/reservaciones", data);
    cargarReservaciones();
  } catch (e) {
    console.error(e);
  }
};

const cancelarReservacion = async (id) => {
  await api.delete(`/reservaciones/${id}`);
  cargarReservaciones();
};
</script>

<template>
  <div>
    <h2>Mis Reservas</h2>
    <FormularioReservacion @crear="crearReservacion" />

    <CardReservacion
      v-for="reservacion in reservaciones"
      :key="reservacion.id"
      :reservacion="reservacion"
      @cancelar="cancelarReservacion"
    />
  </div>
</template>
