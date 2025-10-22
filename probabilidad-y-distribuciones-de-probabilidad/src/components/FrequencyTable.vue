<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tableData: {
    type: Array,
    required: true
  }
})

// 1. Definimos las cabeceras para la v-data-table
const headers = ref([
  { title: 'Clase', key: 'clase', align: 'center' },
  { title: 'L. Inf.', key: 'lInf', align: 'end' },
  { title: 'L. Sup.', key: 'lSup', align: 'end' },
  { title: 'Marca (xi)', key: 'marcaClase', align: 'end' },
  { title: 'Frec. (fi)', key: 'frecuencia', align: 'center' },
  { title: 'Frec. Acum. (Fi)', key: 'frecAcumulada', align: 'center' },
  { title: 'Frec. Rel. (hi)', key: 'frecRelativa', align: 'end' },
  { title: 'Frec. Rel. Acum. (Hi)', key: 'frecRelAcumulada', align: 'end' },
])

// 2. Formateamos los datos para la tabla
const formattedItems = computed(() => {
  return props.tableData.map(row => ({
    ...row,
    lInf: row.lInf.toFixed(4),
    lSup: row.lSup.toFixed(4),
    marcaClase: row.marcaClase.toFixed(4),
    frecRelativa: (row.frecRelativa * 100).toFixed(2) + '%',
    frecRelAcumulada: (row.frecRelAcumulada * 100).toFixed(2) + '%',
  }))
})
</script>

<template>
  <v-card>
    <v-card-title>3. Tabla de Distribución de Frecuencias</v-card-title>
    
    <v-data-table
      v-if="tableData.length > 0"
      :headers="headers"
      :items="formattedItems"
      density="compact"
      class="elevation-1"
    >
      <template v-slot:bottom></template>
    </v-data-table>
    
    <v-card-text v-else>
      <v-alert type="info" variant="tonal" border="start">
        Ingresa datos para generar la tabla.
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* v-data-table ya es responsivo, no se necesita CSS */
</style>