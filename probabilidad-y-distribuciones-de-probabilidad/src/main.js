// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify' // <-- 1. Importa Vuetify

const app = createApp(App)

app.use(router)
app.use(vuetify) // <-- 2. Usa Vuetify

app.mount('#app')