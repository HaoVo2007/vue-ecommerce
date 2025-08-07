import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import 'flowbite'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
  });
app.use(createPinia())
app.use(router)
app.mount('#app')
