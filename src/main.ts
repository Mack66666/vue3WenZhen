import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  Pinia  from './stores/index';
import 'vant/lib/index.css';
import './style/main.scss'


const app = createApp(App)

app.use(Pinia)
app.use(router)

app.mount('#app')
