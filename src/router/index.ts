import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/styles',
      name: 'styles',
      component: () => import('@/views/StylesView.vue'),
    },
    {
      path: '/owner-styles',
      name: 'owner-styles',
      component: () => import('@/views/OwnerStylesView.vue'),
    },
  ],
})

export default router
