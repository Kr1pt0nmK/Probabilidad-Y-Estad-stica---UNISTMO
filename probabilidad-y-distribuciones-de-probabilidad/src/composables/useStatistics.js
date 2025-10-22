// src/composables/useStatistics.js
import { computed } from 'vue'

export function useStatistics(rawDataRef) {
  
  // 1. EL PARSER (Sin cambios)
  const dataArray = computed(() => {
    if (!rawDataRef.value) return []
    return rawDataRef.value
      .split(/[\n\t, ]+/)
      .filter(n => n.trim() !== '')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n))
      .sort((a, b) => a - b)
  })

  // 2. CÁLCULOS BÁSICOS (Sin cambios)
  const n = computed(() => dataArray.value.length)
  const min = computed(() => (n.value === 0 ? 0 : dataArray.value[0]))
  const max = computed(() => (n.value === 0 ? 0 : dataArray.value[n.value - 1]))
  const rango = computed(() => max.value - min.value)
  const promedio = computed(() => {
    if (n.value === 0) return 0
    const sum = dataArray.value.reduce((acc, val) => acc + val, 0)
    return sum / n.value
  })
  const varianza = computed(() => {
    if (n.value < 2) return 0
    const mean = promedio.value
    const sumOfSquares = dataArray.value.reduce((acc, val) => {
      return acc + Math.pow(val - mean, 2)
    }, 0)
    return sumOfSquares / (n.value - 1)
  })
  const desvStd = computed(() => Math.sqrt(varianza.value))

  // 3. CÁLCULOS PARA LA TABLA DE FRECUENCIAS (¡NUEVO!)

  // m (Número de clases) - Regla de Sturges
  // (Como en tu Excel: 1 + 3.3 * log10(n))
  const m_numClases = computed(() => {
    if (n.value === 0) return 0
    return 1 + 3.3 * Math.log10(n.value)
  })
  
  // Ancho de clase (w)
  const anchoClase = computed(() => {
    if (m_numClases.value === 0) return 0
    return rango.value / m_numClases.value
  })

  // La tabla de frecuencias completa
  const frequencyTable = computed(() => {
    // No calcules nada si no hay datos o si m/w es 0
    if (n.value === 0 || m_numClases.value === 0 || anchoClase.value === 0) {
      return []
    }

    const m = Math.round(m_numClases.value) // m (redondeado)
    const w = anchoClase.value // w (sin redondear, para precisión)
    const tabla = []
    let limiteInferior = min.value
    let acumulada = 0

    for (let i = 0; i < m; i++) {
      const limiteSuperior = limiteInferior + w
      
      // Contar cuántos datos caen en este rango [l_inf, l_sup)
      const frecuencia = dataArray.value.filter(val => {
        // La última clase debe incluir el límite superior
        if (i === m - 1) {
          return val >= limiteInferior && val <= limiteSuperior
        }
        // Las clases normales son [l_inf, l_sup)
        return val >= limiteInferior && val < limiteSuperior
      }).length

      acumulada += frecuencia
      const frecRelativa = frecuencia / n.value
      const frecRelAcumulada = acumulada / n.value

      tabla.push({
        clase: i + 1,
        lInf: limiteInferior,
        lSup: limiteSuperior,
        marcaClase: (limiteInferior + limiteSuperior) / 2,
        frecuencia: frecuencia,
        frecAcumulada: acumulada,
        frecRelativa: frecRelativa,
        frecRelAcumulada: frecRelAcumulada
      })

      // El siguiente límite inferior es el superior actual
      limiteInferior = limiteSuperior
    }
    
    return tabla
  })

  // 4. EXPORTAR RESULTADOS (Actualizado)
  return {
    n,
    min,
    max,
    rango,
    promedio,
    varianza,
    desvStd,
    m_numClases, // <-- NUEVO
    anchoClase,  // <-- NUEVO
    frequencyTable // <-- NUEVO
  }
}