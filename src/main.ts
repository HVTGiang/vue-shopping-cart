import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/global.scss'

import 'vuetify/styles'
import vuetify from './vuetify'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import TextInput from '@/components/TextInput/index.vue'
import PasswordInput from '@/components/PasswordInput/index.vue'

import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)


app.use(router)

app.component('TextInput', TextInput).component('PasswordInput', PasswordInput)


app.use(vuetify)

app.mount('#app')
