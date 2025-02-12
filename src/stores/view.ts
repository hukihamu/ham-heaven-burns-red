import { defineStore } from "pinia";
import {ref} from 'vue'
import type {Style} from '@/types/style.ts'


export const useViewStore = defineStore('view', () => {
  const detailStyle = ref<Style>()
  const getPrevStyle = ref<() => void>()
  const getNextStyle = ref<() => void>()

  return { detailStyle, getPrevStyle, getNextStyle }
})
