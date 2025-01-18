import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/ss-styles',
    name: 'ss-styles',
    component: () => import('@/views/SSStylesView.vue'),
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => import('@/views/StoriesView.vue'),
  },
  {
    path: '/training-styles',
    name: 'training-styles',
    component: () => import('@/views/TrainingStylesView.vue'),
  },
  {
    path: '/training-characters',
    name: 'training-characters',
    component: () => import('@/views/TrainingCharactersView.vue'),
  },
  {
    path: '/training',
    name: 'training',
    children: [
      {
        path: '/training/limit-break',
        name: 'limit-break',
        component: () => import('@/views/LimitBreakView.vue'),
      },
      {
        path: '/training/orb',
        name: 'orb',
        component: () => import('@/views/OrbView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
