<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />
    <main style="padding: 20px">
      <slot />
    </main>
  </div>
</template>
