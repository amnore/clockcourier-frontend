import { createRouter, createWebHashHistory } from "vue-router";
import Repositories from '../views/repositories.vue'
import Projects from '../views/projects.vue'
import Project from '../views/project.vue'
import Repository from '../views/repository.vue'
import SearchView from '@/views/SearchView.vue'


const routes = [
  {
    path: '/',
    name: 'Search',
    component: SearchView,
  },
  {
    path: '/repositories',
    name: 'Repositories',
    component: Repositories,
    props: true,
  },
  //在这里添加路径
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    props: true,
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project
  },
  {
    path: '/repository/:id',
    name: 'Repository',
    component: Repository
  },
]

export const router = new createRouter({
    history: createWebHashHistory(),
    routes: routes
})
