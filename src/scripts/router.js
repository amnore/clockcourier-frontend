import { createRouter, createWebHashHistory } from "vue-router";
import SearchView from '@/views/SearchView.vue'
import DependencyGraphView from '@/views/DependencyGraphView.vue'
import RuleInfo from "@/views/RuleInfo.vue"
import JumpToOut from "@/views/JumpToOut.vue"

const routes = [
  {
    path: '/',
    name: 'Search',
    component: SearchView,
  },
  {
    path: '/dependency-graph',
    name: 'DependencyGraph',
    component: DependencyGraphView,
    props: route => route.query,
  },
  {
    path: '/rule-info/:id',
    name: 'RuleInfo',
    component: RuleInfo,
  },
  {
    path: '/jump-to-out',
    name: 'JumpToOut',
    component: JumpToOut,
  }
]

export default new createRouter({
  history: createWebHashHistory(),
  routes: routes
})
