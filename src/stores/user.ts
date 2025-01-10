import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
  const lb = ref<{ [styleId: number]: number | undefined}>({})
  const readStory = ref<string[]>([])

  function getUserData() {
    return {
      lb: lb.value,
      readStory: readStory.value,
    }
  }
  function setUserData(data: { lb: { [styleId: number]: number | undefined}, readStory: string[] }) {
    lb.value = data.lb
    readStory.value = data.readStory
  }
  return { lb, readStory, getUserData, setUserData }
}, {persist: true})
