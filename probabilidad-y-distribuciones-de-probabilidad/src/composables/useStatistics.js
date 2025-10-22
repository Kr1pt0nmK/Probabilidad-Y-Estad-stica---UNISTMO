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

  //Cálculo de Curtosis (Muestral, como en Excel)
  const curtosis = computed(() => {
    // Se necesita n > 3 para esta fórmula
    if (n.value < 4) return 0 
    
    const n_ = n.value
    const mean = promedio.value
    const s = desvStd.value
    
    // Suma de ((x - media) / s)^4
    const sumFourthPowerDev = dataArray.value.reduce((acc, val) => {
      return acc + Math.pow((val - mean) / s, 4)
    }, 0)

    // Fórmula de Curtosis Muestral (G2) que usa Excel
    const term1 = (n_ * (n_ + 1)) / ((n_ - 1) * (n_ - 2) * (n_ - 3))
    const term2 = (3 * Math.pow(n_ - 1, 2)) / ((n_ - 2) * (n_ - 3))
    
    const g2 = (term1 * sumFourthPowerDev) - term2
    return g2
  })

  // -------------------------------------------------
  // CÁLCULO DE CUANTILES (PERCENTILES)
  // -------------------------------------------------

  // Helper function para Percentil (Interpolación Lineal - como PERCENTIL.INC de Excel)
  const getPercentile = (p) => {
    // p es el percentil (ej. 0.25 para Q1)
    if (n.value === 0) return 0
    if (p <= 0) return min.value
    if (p >= 1) return max.value

    const data = dataArray.value // Nuestro array ya está ordenado
    
    // 1. Encontrar la posición (índice 0-based)
    const k = (n.value - 1) * p
    const i = Math.floor(k) // Parte entera del índice
    const f = k - i         // Parte fraccional
    
    // 2. Interpolar
    // Si f=0, el índice es exacto.
    // Si f>0, interpolamos entre data[i] y data[i+1]
    if (f === 0) {
      return data[i]
    } else {
      return data[i] + f * (data[i + 1] - data[i])
    }
  }

  // --- Cuartiles ---
  const Q1 = computed(() => getPercentile(0.25))
  const Q2_Mediana = computed(() => getPercentile(0.50)) // ¡Esta es la Mediana!
  const Q3 = computed(() => getPercentile(0.75))

  // --- Deciles y Percentiles (Ejemplos) ---
  // D1 es P10, D9 es P90
  const P10 = computed(() => getPercentile(0.10))
  const P90 = computed(() => getPercentile(0.90))

// -------------------------------------------------  
  // 3. CÁLCULOS PARA LA TABLA DE FRECUENCIAS

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
    curtosis,
    Q1,
    Q2_Mediana,
    Q3,
    P10,
    P90,
    m_numClases,
    anchoClase,
    frequencyTable
  }
}