import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import { router } from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap'

import "./assets/layout.scss"
// 讓手機版的鍵盤不要動到footer(Android)
import "./assets/into.js"
import VueQrcode from '@chenfengyuan/vue-qrcode';

const app = createApp(App)
app.component(VueQrcode.name, VueQrcode);
app.use(createPinia())
app.use(router)

app.mount('#app')


