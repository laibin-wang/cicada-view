import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import '@/assets/style/normalize.css'
import '@/assets/style/cicada-view.css'

createApp(App).use(router).mount('#app')
