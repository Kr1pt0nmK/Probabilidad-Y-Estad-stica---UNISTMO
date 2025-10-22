<script setup>
const model = defineModel()
</script>

<template>
  <v-card>
    <v-card-title>1. Ingresa tus Datos</v-card-title>
    <v-card-subtitle>
      Pega tu conjunto de números (separados por espacio, coma o salto de línea).
    </v-card-subtitle>

    <v-card-text>
      <v-textarea
        v-model="model"
        label="Datos"
        rows="20"
        variant="outlined"
        placeholder="15.8 16.3 15.9 ...&#10;16.1 16.2 15.9 ...&#10;16.3 16.2 16.4 ..."
        clearable
      ></v-textarea>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* Borramos todo el CSS 'scoped'. Vuetify se encarga. */
</style>