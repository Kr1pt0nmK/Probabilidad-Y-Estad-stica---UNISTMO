// src/composables/useStatistics.js

// 'computed' es la herramienta más poderosa de Vue.
// Es un valor que se recalcula automáticamente cuando sus dependencias cambian.
import { computed } from 'vue'

// Exportamos una función que podemos usar en cualquier componente
export function useStatistics(rawDataRef) {
  
  // 1. EL PARSER: 
  //    Creamos un 'computed' que limpia los datos CADA VEZ que el usuario escribe.
  const dataArray = computed(() => {
    // Si no hay texto, regresa un array vacío
    if (!rawDataRef.value) return []

    return rawDataRef.value
      .split(/[\n\t, ]+/)   // 1. Separar por saltos de línea, tabs, comas o espacios
      .filter(n => n.trim() !== '') // 2. Quitar entradas vacías
      .map(n => parseFloat(n))    // 3. Convertir todo a número
      .filter(n => !isNaN(n))     // 4. Quitar cualquier cosa que NO sea un número
      .sort((a, b) => a - b)      // 5. ¡Ordenar los datos de menor a mayor!
  })

  // 2. CÁLCULOS BÁSICOS:
  //    Estos 'computed' dependen de 'dataArray'. Si 'dataArray' cambia,
  //    estos se recalcularán solos.

  // n (conteo)
  const n = computed(() => dataArray.value.length)

  // min (gracias a que ordenamos, es el primero)
  const min = computed(() => {
    if (n.value === 0) return 0
    return dataArray.value[0]
  })

  // max (gracias a que ordenamos, es el último)
  const max = computed(() => {
    if (n.value === 0) return 0
    return dataArray.value[n.value - 1]
  })

  // rango
  const rango = computed(() => max.value - min.value)

  // promedio (media)
  const promedio = computed(() => {
    if (n.value === 0) return 0
    const sum = dataArray.value.reduce((acc, val) => acc + val, 0)
    return sum / n.value
  })

  // varianza (muestral, como en tu Excel que usa n-1)
  const varianza = computed(() => {
    if (n.value < 2) return 0 // Necesitas al menos 2 datos
    const mean = promedio.value
    const sumOfSquares = dataArray.value.reduce((acc, val) => {
      return acc + Math.pow(val - mean, 2)
    }, 0)
    return sumOfSquares / (n.value - 1)
  })

  // desviación estándar
  const desvStd = computed(() => Math.sqrt(varianza.value))

  // 3. EXPORTAR RESULTADOS:
  //    Regresamos todos nuestros valores 'computed' para que App.vue pueda usarlos.
  return {
    dataArray, // Lo retornamos por si lo necesitamos después
    n,
    min,
    max,
    rango,
    promedio,
    varianza,
    desvStd
  }
}