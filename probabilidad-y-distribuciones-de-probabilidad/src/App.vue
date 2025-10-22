<script setup>
import { ref } from 'vue'
import DataInput from './components/DataInput.vue'
import StatsSummary from './components/StatsSummary.vue'
import FrequencyTable from './components/FrequencyTable.vue'
import HistogramChart from './components/HistogramChart.vue'
import { useStatistics } from './composables/useStatistics.js'

// ¡ESTA LÓGICA NO SE TOCA! (Es la tuya)
const rawData = ref('')
const {
  n, min, max, rango, promedio, varianza, desvStd, curtosis,
  Q1, Q2_Mediana, Q3, P10, P90,
  m_numClases, anchoClase, frequencyTable
} = useStatistics(rawData)
</script>

<template>
  <v-app theme="light">
    
    <v-app-bar :elevation="1">
      <v-app-bar-title>
        <v-icon icon="mdi-calculator-variant-outline"></v-icon>
        Calculadora de Estadística
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          
          <v-col cols="12" md="4">
            <DataInput v-model="rawData" />
          </v-col>
          
          <v-col cols="12" md="8">
            <StatsSummary
              class="mb-4"
              :n="n"
              :min="min"
              :max="max"
              :rango="rango"
              :promedio="promedio"
              :varianza="varianza"
              :desvStd="desvStd"
              :curtosis="curtosis"
              :Q1="Q1"
              :Q2_Mediana="Q2_Mediana"
              :Q3="Q3"
              :P10="P10"
              :P90="P90"
              :m_numClases="m_numClases"
              :anchoClase="anchoClase"
            />
            
            <FrequencyTable class="mb-4" :table-data="frequencyTable" />
            
            <HistogramChart :table-data="frequencyTable" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Borramos todo el CSS global. Vuetify se encarga. */
</style>