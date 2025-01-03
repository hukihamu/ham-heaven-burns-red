import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Style} from '@/types/style.ts'
import {api} from '@/utils.ts'

type StyleType = 'styles'

export const useMasterStore =  defineStore('master', () => {
  const isInit = ref({
    styles: false,
  })
  const mStyles = ref<Style[]>([])
  async function init(...t: StyleType[]) {
    if (t.includes('styles') && !isInit.value.styles) {
      mStyles.value = await api('https://master.hbr.quest/styles.json').then(res => res.json())
      isInit.value.styles = true
    }
  }

  return { mStyles, init }
})
