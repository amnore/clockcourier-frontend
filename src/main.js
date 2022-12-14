import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from '@/App.vue';
import router from '@/scripts/router.js';
import { i18n } from '@/scripts/plugin.js';

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .mount("#app")
