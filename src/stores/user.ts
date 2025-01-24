import {defineStore} from 'pinia'
import {ref, watch} from 'vue'

export const useUserStore = defineStore('user', () => {
  const lb = ref<{ [styleId: number]: number | undefined}>({})
  const readStory = ref<string[]>([])
  const orbs = ref<{[charLabel: string]: { [orbLabel: string]: number | undefined }}>({})
  const passiveRank = ref<{[key in 1|2|3]: number[]}>({
    1: [], 2: [], 3: [],
  })
  const id = ref<string>() // ユーザID
  const hash = ref<string>() //ユーザ認証情報
  const atLasted = ref<string>('')

  watch([lb, readStory, orbs], () => {
    atLasted.value = new Date().toISOString()
  }, {deep: true})

  function getUserData() {
    return {
      atLasted: atLasted.value,
      lb: lb.value,
      orbs: orbs.value,
      readStory: readStory.value,
      passiveRank: passiveRank.value,
    }
  }
  function setUserData(data: { atLasted: string,passiveRank: {[key in 1|2|3]: number[]}, lb: { [styleId: number]: number | undefined}, readStory: string[], orbs: { [charLabel: string]: { [orbLabel: string]: number | undefined }} }) {
    lb.value = data.lb
    readStory.value = data.readStory
    orbs.value = data.orbs
    passiveRank.value = data.passiveRank
    atLasted.value = data.atLasted
  }
  return { lb, orbs, readStory, getUserData, setUserData, id, hash, atLasted, passiveRank }
}, {persist: true})
