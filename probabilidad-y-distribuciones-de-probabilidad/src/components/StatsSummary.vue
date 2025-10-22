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
  Q1: Number,
  Q2_Mediana: Number,
  Q3: Number,
  P10: Number,
  P90: Number,
  m_numClases: Number,
  anchoClase: Number
})
</script>

<template>
  <v-card>
    <v-card-title>2. Resumen Estadístico</v-card-title>
    <v-card-text>
      
      <v-list v-if="n > 0" lines="one" density="compact">
        
        <v-list-item title="n (conteo)">
          <template v-slot:append>
            <span class="stat-value">{{ n }}</span>
          </template>
        </v-list-item>
        
        <v-list-item title="Min">
          <template v-slot:append>
            <span class="stat-value">{{ min.toFixed(4) }}</span>
          </template>
        </v-list-item>

        <v-list-item title="Max">
          <template v-slot:append>
            <span class="stat-value">{{ max.toFixed(4) }}</span>
          </template>
        </v-list-item>

        <v-list-item title="Rango">
          <template v-slot:append>
            <span class="stat-value">{{ rango.toFixed(4) }}</span>
          </template>
        </v-list-item>

        <v-list-item title="Promedio (Media)">
          <template v-slot:append>
            <span class="stat-value">{{ promedio.toFixed(4) }}</span>
          </template>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item title="Varianza (muestral)">
          <template v-slot:append>
            <span class="stat-value">{{ varianza.toFixed(8) }}</span>
          </template>
        </v-list-item>

        <v-list-item title="Desv. Estándar">
          <template v-slot:append>
            <span class="stat-value">{{ desvStd.toFixed(8) }}</span>
          </template>
        </v-list-item>

        <v-list-item title="Curtosis (Exceso)">
          <template v-slot:append>
            <span class="stat-value">{{ curtosis.toFixed(8) }}</span>
          </template>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item title="Cuartil 1 (Q1 / P25)">
          <template v-slot:append>
            <span class="stat-value">{{ Q1.toFixed(4) }}</span>
          </template>
        </v-list-item>

        <v-list-item title="Cuartil 2 (Mediana)">
          <template v-slot:append>
            <span class="stat-value">{{ Q2_Mediana.toFixed(4) }}</span>
          </template>
        </v-list-item>

        <v-list-item title="Cuartil 3 (Q3 / P75)">
          <template v-slot:append>
            <span class="stat-value">{{ Q3.toFixed(4) }}</span>
          </template>
        </v-list-item>
        
        <v-list-item title="Percentil 10 (D1)">
          <template v-slot:append>
            <span class="stat-value">{{ P10.toFixed(4) }}</span>
          </template>
        </v-list-item>
        
        <v-list-item title="Percentil 90 (D9)">
          <template v-slot:append>
            <span class="stat-value">{{ P90.toFixed(4) }}</span>
          </template>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item title="m (clases Sturges)">
          <template v-slot:append>
            <span class="stat-value">{{ m_numClases.toFixed(8) }} (aprox. {{ Math.round(m_numClases) }})</span>
          </template>
        </v-list-item>

        <v-list-item title="Ancho de Clase (w)">
          <template v-slot:append>
            <span class="stat-value">{{ anchoClase.toFixed(8) }}</span>
          </template>
        </v-list-item>

      </v-list>
      
      <v-alert v-else type="info" variant="tonal" border="start">
        Ingresa datos para ver el resumen.
      </v-alert>

    </v-card-text>
  </v-card>
</template>

<style scoped>
/* Usamos este estilo para que los números sigan siendo monospace */
.stat-value {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-weight: bold;
}
</style>