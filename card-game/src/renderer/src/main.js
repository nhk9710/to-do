//css
import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'

const pinia = createPinia();

createApp(App).use(PrimeVue).use(ToastService).use(router).use(pinia).mount('#app')
