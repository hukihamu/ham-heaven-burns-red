import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
  const lb = ref<{ [styleId: number]: number | undefined}>({})
  const readStory = ref<string[]>([])
  const orbs = ref<{[charLabel: string]: { [orbLabel: string]: number | undefined }}>({})
  const id = ref<string>()
  const hash = ref<string>()

  function getUserData() {
    return {
      lb: lb.value,
      orbs: orbs.value,
      readStory: readStory.value,
    }
  }
  function setUserData(data: { lb: { [styleId: number]: number | undefined}, readStory: string[], orbs: { [charLabel: string]: { [orbLabel: string]: number | undefined }} }) {
    lb.value = data.lb
    readStory.value = data.readStory
    orbs.value = data.orbs
  }
  return { lb, orbs, readStory, getUserData, setUserData, id, hash }
}, {persist: true})
