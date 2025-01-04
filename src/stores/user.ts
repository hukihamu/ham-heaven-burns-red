import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
  const lb = ref<{ [styleId: number]: number | undefined}>({})
  const readStory = ref<string[]>([])

  return { lb, readStory }
}, {persist: true})
