<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  tableData: { type: Array, required: true }
})

const chartData = computed(() => ({
  labels: props.tableData.map(row => row.marcaClase.toFixed(3)),
  datasets: [
    {
      label: 'Frecuencia (fi)',
      backgroundColor: '#007bff',
      borderColor: '#0056b3',
      borderWidth: 1,
      data: props.tableData.map(row => row.frecuencia)
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { title: { display: true, text: 'Marca de Clase (xi)' } },
    y: { title: { display: true, text: 'Frecuencia (fi)' }, beginAtZero: true }
  },
  plugins: { legend: { display: false } }
}
</script>

<template>
  <v-card>
    <v-card-title>4. Histograma de Frecuencias</v-card-title>
    <v-card-text>
      <div class="chart-wrapper">
        <Bar
          v-if="tableData.length"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.chart-wrapper {
  position: relative;
  height: 400px;
}
</style>