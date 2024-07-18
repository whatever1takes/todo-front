import 'element-plus/dist/index.css'

import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
