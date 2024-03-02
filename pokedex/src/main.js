import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from '@/router/Router.js'
import { library } from '@fortawesome/fontawesome-svg-core' // Import library
import { fas } from '@fortawesome/free-solid-svg-icons' // Import solid icons
import App from './App.vue'

library.add(fas)
const pinia = createPinia()
pinia.use(piniaPluginPersist)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
