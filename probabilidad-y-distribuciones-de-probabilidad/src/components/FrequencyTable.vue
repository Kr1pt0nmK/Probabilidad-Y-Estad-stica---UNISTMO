<script setup>
defineProps({
  tableData: {
    type: Array,
    required: true
  }
})

// Función para formatear porcentajes
const toPercent = (val) => {
  return (val * 100).toFixed(2) + '%'
}
</script>

<template>
  <div class="table-container">
    <h2>3. Tabla de Distribución de Frecuencias</h2>
    <div v-if="tableData.length > 0" class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Clase</th>
            <th>L. Inf.</th>
            <th>L. Sup.</th>
            <th>Marca (xi)</th>
            <th>Frec. (fi)</th>
            <th>Frec. Acum. (Fi)</th>
            <th>Frec. Rel. (hi)</th>
            <th>Frec. Rel. Acum. (Hi)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tableData" :key="row.clase">
            <td>{{ row.clase }}</td>
            <td>{{ row.lInf.toFixed(4) }}</td>
            <td>{{ row.lSup.toFixed(4) }}</td>
            <td>{{ row.marcaClase.toFixed(4) }}</td>
            <td>{{ row.frecuencia }}</td>
            <td>{{ row.frecAcumulada }}</td>
            <td>{{ toPercent(row.frecRelativa) }}</td>
            <td>{{ toPercent(row.frecRelAcumulada) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Ingresa datos para generar la tabla.</p>
  </div>
</template>

<style scoped>
.table-container {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 2rem; /* Separación del resumen */
}

/* Hacemos que la tabla tenga scroll horizontal en pantallas pequeñas */
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.6rem 0.8rem;
  text-align: right;
  font-size: 0.9rem;
  white-space: nowrap; /* Evita que los números se partan */
}

th {
  background-color: #f9f9f9;
  font-weight: 600;
  color: #333;
}

tbody tr:nth-child(even) {
  background-color: #fdfdfd;
}

td:first-child, th:first-child {
  text-align: center;
  font-weight: bold;
}
</style>