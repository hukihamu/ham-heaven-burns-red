import { defineStore } from "pinia";
import {ref} from 'vue'
import type {Style} from '@/types/style.ts'


export const useViewStore = defineStore('view', () => {
  const detailStyle = ref<Style>()
  function setDetailStyle(style: Style) {
    detailStyle.value = style
  }

  return { detailStyle, setDetailStyle }
})
