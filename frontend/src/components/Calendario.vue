<script setup>
import { ref, watch } from "vue";

const fecha = ref("");
const emit = defineEmits(["editar"]);

watch(fecha, (nuevoValor) => {
  emit("editar", nuevoValor);
});
</script>

<template>
  <div>
    <label>Seleccionar fecha:</label>
    <input type="date" v-model="fecha" />
  </div>
</template>
