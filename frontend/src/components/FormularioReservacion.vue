<script setup>
import { ref } from "vue";

const emit = defineEmits(["crear"]);

const idEspacio = ref("");
const fecha = ref("");
const horaInicio = ref("");
const horaFin = ref("");

const submit = () => {
  emit("crear", {
    id_aula: idEspacio.value,
    fecha: fecha.value,
    hora_inicio: horaInicio.value,
    hora_fin: horaFin.value,
  });
};
</script>

<template>
  <div>
    <h3>Nueva Reserva</h3>

    <input v-model="idAula" placeholder="ID Aula" />
    <input v-model="fecha" type="date" />
    <input v-model="horaInicio" type="time" />
    <input v-model="horaFin" type="time" />

    <button @click="submit">Reservar</button>
  </div>
</template>
