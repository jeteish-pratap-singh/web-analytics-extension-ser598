<script setup>
  import { ref } from 'vue'
  const count = ref(0)
</script>

<template>
  <div class="app">
    <h2>Vue Extension Counter</h2>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increase</button>
  </div>
</template>

<style scoped></style>
