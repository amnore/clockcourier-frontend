import { createApp } from 'vue'
import App from './App.vue'
import {router} from './scripts/router'

const app=createApp(App).use(router).mount("#app")
console.log(app.$router.getRoutes());