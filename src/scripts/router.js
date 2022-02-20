import { createRouter,createWebHashHistory} from "vue-router";
import Login from '../views/login.vue' 
import Projects from '../views/projects.vue'


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Projects
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  //在这里添加路径
]

export const router = new  createRouter({
  history: createWebHashHistory(),
  routes: routes
})


