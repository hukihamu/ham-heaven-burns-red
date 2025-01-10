import { defineStore } from "pinia";
import {ref} from 'vue'
import type {Style} from '@/types/style.ts'


export const useViewStore = defineStore('view', () => {
  const detailStyle = ref<Style>()
  const id = ref<string | undefined>()
  const hash = ref<string | undefined>()
  function setDetailStyle(style: Style) {
    detailStyle.value = style
  }

  function getCookie() {
    id.value = document.cookie.match(/(?<=id=).+?(?=;)/)?.[0]
    hash.value = document.cookie.match(/(?<=hash=).+?(?=;)/)?.[0]
  }

  return { detailStyle, setDetailStyle, id, hash, getCookie }
})
