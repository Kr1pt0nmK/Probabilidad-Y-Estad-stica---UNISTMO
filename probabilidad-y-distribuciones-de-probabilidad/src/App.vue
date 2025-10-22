<script setup>
// 'ref' es para crear variables reactivas
import { ref } from 'vue'

// 1. Importamos el componente que vamos a crear
import DataInput from './components/DataInput.vue'

// 2. Creamos la variable que guardará el texto del usuario
const rawData = ref('')
</script>

<template>
  <header>
    <h1>📊 Calculadora de Estadística</h1>
  </header>

  <main>
    <DataInput v-model="rawData" />

    <div class="results">
      <p>Datos ingresados: {{ rawData }}</p>
    </div>
  </main>
</template>

<style>
/* Estilos generales para que se vea ordenado */
body {
  font-family: sans-serif;
  background-color: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

main {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.results {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
</style>