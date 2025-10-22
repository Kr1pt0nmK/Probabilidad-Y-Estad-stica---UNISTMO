<script setup>
import { ref } from 'vue'
import DataInput from './components/DataInput.vue'

// 1. Importamos nuestro "cerebro"
import { useStatistics } from './composables/useStatistics.js'

// 2. Esta es la variable donde se guarda el texto del textarea
const rawData = ref('')

// 3. ¡Aquí ocurre la magia!
//    Pasamos la variable reactiva 'rawData' a nuestro composable...
//    ...y nos regresa todos los cálculos (que también son reactivos)
const {
  n,
  min,
  max,
  rango,
  promedio,
  varianza,
  desvStd
} = useStatistics(rawData)

</script>

<template>
  <header>
    <h1>📊 Calculadora de Estadística</h1>
  </header>

  <main>
    <DataInput v-model="rawData" />

    <div class="results">
      <h2>2. Resumen Estadístico</h2>
      <ul>
        <li>
          <strong>n (conteo)</strong>
          <span>{{ n }}</span>
        </li>
        <li>
          <strong>Min</strong>
          <span>{{ min.toFixed(4) }}</span>
        </li>
        <li>
          <strong>Max</strong>
          <span>{{ max.toFixed(4) }}</span>
        </li>
        <li>
          <strong>Rango</strong>
          <span>{{ rango.toFixed(4) }}</span>
        </li>
        <li>
          <strong>Promedio (Media)</strong>
          <span>{{ promedio.toFixed(4) }}</span>
        </li>
        <li>
          <strong>Varianza (muestral)</strong>
          <span>{{ varianza.toFixed(8) }}</span>
        </li>
        <li>
          <strong>Desv. Estándar</strong>
          <span>{{ desvStd.toFixed(8) }}</span>
        </li>
      </ul>
    </div>
  </main>
</template>

<style>
/* ... (los estilos de 'body', 'header', 'main' que ya tenías) ... */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

main {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr; /* Le di más espacio a los resultados */
  gap: 2rem;
}

/* Estilos para la nueva tarjeta de resultados */
.results {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.results h2 {
  margin-top: 0;
}

.results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.results li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.results li:last-child {
  border-bottom: none;
}

.results li strong {
  color: #555;
}

.results li span {
  font-weight: 600;
  font-family: monospace;
  font-size: 1.1rem;
  color: #007bff; /* Un color para destacar */
}
</style>