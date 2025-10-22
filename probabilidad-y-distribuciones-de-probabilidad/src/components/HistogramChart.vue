<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Hay que registrar los componentes que usará Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  tableData: {
    type: Array,
    required: true
  }
})

// 'chartData' es el formato que Chart.js necesita
const chartData = computed(() => {
  return {
    // Las etiquetas del eje X (usaremos la Marca de Clase)
    labels: props.tableData.map(row => row.marcaClase.toFixed(3)),
    datasets: [
      {
        label: 'Frecuencia (fi)',
        backgroundColor: '#007bff',
        borderColor: '#0056b3',
        borderWidth: 1,
        // Los datos del eje Y (la Frecuencia absoluta)
        data: props.tableData.map(row => row.frecuencia)
      }
    ]
  }
})

// Opciones de configuración del gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Marca de Clase (xi)'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Frecuencia (fi)'
      },
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false // Ocultamos la leyenda, es obvio qué es
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <h2>4. Histograma de Frecuencias</h2>
    <div class="chart-wrapper">
      <Bar
        v-if="tableData.length"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 2rem; /* Separación de la tabla */
}

/* IMPORTANTE: Chart.js necesita un contenedor padre con un alto definido */
.chart-wrapper {
  position: relative;
  height: 400px;
}
</style>