import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import SSStylesView from '@/views/SSStylesView.vue'
import TrainingStylesView from '@/views/TrainingStylesView.vue'
import TrainingCharactersView from '@/views/TrainingCharactersView.vue'
import StoriesView from '@/views/StoriesView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/ss-styles',
    name: 'ss-styles',
    component: () => SSStylesView,
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => StoriesView,
  },
  {
    path: '/training-styles',
    name: 'training-styles',
    component: () => TrainingStylesView,
  },
  {
    path: '/training-characters',
    name: 'training-characters',
    component: () => TrainingCharactersView,
  },
  {
    path: '/training',
    name: 'training',
    children: [],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
