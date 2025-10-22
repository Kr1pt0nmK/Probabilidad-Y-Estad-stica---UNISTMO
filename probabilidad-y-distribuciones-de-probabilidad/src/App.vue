<script setup>
import { ref } from 'vue'
// 1. Importar todos los componentes
import DataInput from './components/DataInput.vue'
import StatsSummary from './components/StatsSummary.vue'
import FrequencyTable from './components/FrequencyTable.vue'

// 2. Importamos nuestro "cerebro"
import { useStatistics } from './composables/useStatistics.js'

// 3. Esta es la variable donde se guarda el texto del textarea
const rawData = ref('')

// 4. ¡Aquí ocurre la magia!
//    Pasamos la variable reactiva 'rawData' a nuestro composable...
//    ...y nos regresa todos los cálculos (que también son reactivos)
//    Obtener TODOS los cálculos de nuestro composable
const {
  n,
  min,
  max,
  rango,
  promedio,
  varianza,
  desvStd,
  curtosis,
  m_numClases,
  anchoClase,
  frequencyTable // <-- La nueva tabla
} = useStatistics(rawData)

</script>

<template>
  <header>
    <h1>📊 Calculadora de Estadística</h1>
  </header>

<main>
    <DataInput v-model="rawData" />

    <div class="results-panel">
      <StatsSummary
        :n="n"
        :min="min"
        :max="max"
        :rango="rango"
        :promedio="promedio"
        :varianza="varianza"
        :desvStd="desvStd"
        :curtosis="curtosis"
        :m_numClases="m_numClases"
        :anchoClase="anchoClase"
      />
      
      <FrequencyTable :table-data="frequencyTable" />
    </div>
  </main>
</template>

<style>
/* Estilos Globales (sin cambios) */
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

/* Layout principal actualizado */
main {
  max-width: 1200px; /* Un poco más ancho para la tabla */
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr; /* Columna de input más pequeña */
  gap: 2rem;
}

/* Este es el contenedor de la columna derecha, 
  no necesita estilos especiales por ahora
*/
.results-panel {
  display: flex;
  flex-direction: column;
  gap: 0; /* Los componentes ya tienen su propio margen/padding */
}

/* Estilos para pantallas más pequeñas */
@media (max-width: 900px) {
  main {
    grid-template-columns: 1fr; /* Una sola columna */
  }
}
</style>