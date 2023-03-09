import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'BasicScene',
    component: () => import('@/views/BasicScene.vue'),
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})