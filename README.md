# Probabilidad-Y-Estad-stica---UNISTMO
# 📊 Calculadora de Probabilidad y Estadística

Este proyecto es una aplicación web interactiva creada con Vue.js para realizar cálculos estadísticos básicos y generar distribuciones de frecuencia, replicando y mejorando las funcionalidades de un análisis hecho en Excel.

## 🎯 Contexto del Proyecto

Este es el proyecto para el primer parcial de la materia de **Probabilidad y Estadística**, cursada en el 7mo semestre de Ingeniería en Computación.

El objetivo es crear una herramienta web que reciba un conjunto de datos numéricos y calcule automáticamente:
* Estadísticas descriptivas (media, mediana, moda, varianza, desviación estándar, etc.).
* La tabla de distribución de frecuencias completa (clases, límites, frecuencias, etc.).
* Un histograma visual de los datos.

## 🛠️ Stack Tecnológico

* **Frontend:** [Vue.js 3](https://vuejs.org/) (Composition API)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Lenguaje:** JavaScript (ES6+)
* **Calidad de Código:** ESLint
* **Formato:** Prettier

## 🚀 Cómo Empezar

Sigue estos pasos para levantar el proyecto en tu máquina local.

### Prerrequisitos

* [Node.js](https://nodejs.org/) (versión 18+ recomendada)
* Un editor de código (recomendado: [VS Code](https://code.visualstudio.com/))

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/TU_USUARIO_DE_GITHUB/probabilidad-y-distribuciones-de-probabilidad.git](https://github.com/TU_USUARIO_DE_GITHUB/probabilidad-y-distribuciones-de-probabilidad.git)
    ```

2.  Navega a la carpeta del proyecto:
    ```bash
    cd probabilidad-y-distribuciones-de-probabilidad
    ```

3.  Instala las dependencias:
    ```bash
    npm install
    ```

### Ejecutar el Proyecto

Para iniciar el servidor de desarrollo local (generalmente en `http://localhost:5173`):

```bash
npm run dev


📚 Temas Cubiertos por el Proyecto

Este programa está diseñado para cubrir los siguientes temas del plan de estudios, correspondientes a la unidad **"1. Estadística Descriptiva con Datos Agrupados y No Agrupados"**:

* [X] **Obtención de datos:** Permite la entrada de un conjunto de datos (no agrupados).
* [X] **Distribución de frecuencias:**
    * Cálculo automático del número de clases (Regla de Sturges).
    * Cálculo del Rango y Ancho de clase.
    * Generación de la tabla de frecuencias completa (límites, marca de clase, frecuencia, frecuencia acumulada, frecuencia relativa y relativa acumulada).
* [X] **Medidas de tendencia central:**
    * Cálculo de la Media aritmética (promedio).
    * *(Opcional: puedes agregar Mediana y Moda en el futuro)*
* [X] **Medidas de dispersión:**
    * Cálculo del Rango.
    * Cálculo de la Varianza (muestral).
    * Cálculo de la Desviación estándar.
* [X] **Representaciones gráficas:**
    * Generación de un Histograma de frecuencias.

*(Nota: Los cálculos del Tema 2: Probabilidad, como el Teorema de Bayes o técnicas de conteo, están fuera del alcance de esta herramienta en particular).*
