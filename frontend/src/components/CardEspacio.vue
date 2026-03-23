<script setup>
defineProps({
  espacio: Object,
});
</script>

<template>
  <div style="border: 1px solid #ccc; padding: 10px; margin: 10px">
    <h3>{{ espacio.nombre }}</h3>
    <p>Tipo: {{ espacio.tipo }}</p>
    <p>Capacidad: {{ espacio.capacidad }}</p>
    <p>Ubicación: {{ espacio.ubicacion }}</p>
    <p>Estatus: {{ espacio.estatus }}</p>
  </div>
</template>
