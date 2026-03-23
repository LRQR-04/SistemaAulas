<script setup>
defineProps({
  reservacion: Object,
});

const emit = defineEmits(["cancelar"]);
</script>

<template>
  <div style="border: 1px solid #aaa; padding: 10px; margin: 10px">
    <!-- <p><strong>Espacio:</strong> {{ espacio.nombre }}</p> -->
    <p><strong>Fecha:</strong> {{ reservacion.fecha }}</p>
    <p>
      <strong>Hora:</strong> {{ reservacion.horaInicio }} -
      {{ reservacion.horaFin }}
    </p>
    <p><strong>Estatus:</strong> {{ reservacion.fecha }}</p>

    <button @click="$emit('cancelar', reservacion.idAula)">Cancelar</button>
  </div>
</template>
