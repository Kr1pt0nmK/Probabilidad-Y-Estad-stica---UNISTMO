<script setup>
// defineModel nos permite conectar este componente con v-model desde App.vue
const model = defineModel()
</script>

<template>
  <div class="input-card">
    <h2>1. Ingresa tus Datos</h2>
    <p>Pega tu conjunto de números (separados por espacio, coma o salto de línea).</p>
    
    <textarea
      v-model="model"
      rows="20"
      placeholder="15.8 16.3 15.9 ...&#10;16.1 16.2 15.9 ...&#10;16.3 16.2 16.4 ..."
    ></textarea>
  </div>
</template>

<style scoped>
/* 'scoped' significa que estos estilos SOLO se aplican a este componente */
.input-card {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-top: 0;
}

textarea {
  width: 100%;
  box-sizing: border-box; /* Asegura que el padding no desborde el ancho */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 1rem;
}
</style>