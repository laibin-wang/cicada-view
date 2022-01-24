import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'survey',
    component: () => import('@/views/survey/index.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
