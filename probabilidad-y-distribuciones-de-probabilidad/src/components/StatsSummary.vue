<script setup>
defineProps({
  n: Number,
  min: Number,
  max: Number,
  rango: Number,
  promedio: Number,
  varianza: Number,
  desvStd: Number,
  curtosis: Number,
  m_numClases: Number,
  anchoClase: Number
})
</script>

<template>
  <div class="stats-summary">
    <h2>2. Resumen Estadístico</h2>
    <ul v-if="n > 0">
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
      <li>
        <strong>Curtosis (Exceso)</strong>
        <span>{{ curtosis.toFixed(8) }}</span>
      </li>
      <li class="divider">
        <strong>m (clases Sturges)</strong>
        <span>{{ m_numClases.toFixed(8) }} (aprox. {{ Math.round(m_numClases) }})</span>
      </li>
      <li>
        <strong>Ancho de Clase (w)</strong>
        <span>{{ anchoClase.toFixed(8) }}</span>
      </li>
    </ul>
    <p v-else>Ingresa datos para ver el resumen.</p>
  </div>
</template>

<style scoped>
.stats-summary {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap; /* Para pantallas pequeñas */
}

li:last-child {
  border-bottom: none;
}

li.divider {
  border-top: 2px dashed #007bff;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
}

li strong {
  color: #555;
  padding-right: 1rem;
}

li span {
  font-weight: 600;
  font-family: monospace;
  font-size: 1.1rem;
  color: #007bff;
  text-align: right;
}
</style>