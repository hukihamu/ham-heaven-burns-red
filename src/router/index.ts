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
        component: () => import('@/views/training/LimitBreakView.vue'),
      },
      {
        path: '/training/orb',
        name: 'orb',
        component: () => import('@/views/training/OrbView.vue'),
      },
      {
        path: '/training/hoju',
        name: 'hoju',
        component: () => import('@/views/training/HojuView.vue'),
      },
      {
        path: '/training/generalize',
        name: 'generalize',
        component: () => import('@/views/training/GeneralizeView.vue'),
      },
      {
        path: '/training/ex-skill-evo',
        name: 'ex-skill-evo',
        component: () => import('@/views/training/ExSkillEvoView.vue'),
      },
    ],
  },
  {
    path: '/passive-rank',
    name: 'passive-rank',
    component: () => import('@/views/PassiveRankView.vue'),
  }
]
export const routeNames: Record<string | symbol, string> = {
  'index': 'index',
  'ss-styles': 'SSスタイル実装順',
  'stories': 'ストーリー順',
  'training-styles': 'スタイル育成',
  'training-characters': 'キャラクター育成',

  'training': '育成状況',
  'limit-break': '凸別状況',
  'orb': 'オーブ',
  'generalize': 'ジェネライズ',
  'ex-skill-evo': 'EXスキル進化',
  'hoju': '宝珠',
  'daphne': '悠久のダフネ',

  'passive-rank': 'アビリティ優先順位',
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
