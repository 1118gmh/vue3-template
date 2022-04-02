import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import router from '@/router/index'
import { createPinia ,PiniaPlugin} from 'pinia';

// import 'element-plus/dist/index.css';
const app = createApp(App)
const store = createPinia()
app.use(store)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})


app.mount('#app')
