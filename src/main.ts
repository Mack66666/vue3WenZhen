import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vant/lib/index.css';
import './style/main.scss'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
