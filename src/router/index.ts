import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/styles'
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
    {
      path: '/story',
      name: 'story',
      component: () => import('@/views/StoryView.vue'),
    },
  ],
})

export default router
