import {defineStore} from 'pinia'
import {ref, watch} from 'vue'

type UserStyle = {
  [styleId: number]: {
    lb?: number,
    hoju?: number,
    generalize?: number,
    exSkillEvo?: number,
    daphne?: number,
  }
}
type UserCharacter = {
  [charLabel: string]: {
    orbs?: {
      [orbLabel: string]: number | undefined,
    },
    revert?: number, // 1~20
    masterSkill?: number,
  }
}

export const useUserStore = defineStore('user', () => {
  const styles = ref<UserStyle>({})
  const characters = ref<UserCharacter>({})
  const readStory = ref<string[]>([])
  const passiveRank = ref<{[key in 1|2|3]: number[]}>({
    1: [], 2: [], 3: [],
  })
  const id = ref<string>() // ユーザID
  const hash = ref<string>() //ユーザ認証情報
  const atLasted = ref<string>('')
  const isFirstLoad = ref(true)


  watch([readStory, passiveRank, styles, characters], () => {
    if (isFirstLoad.value) {
      isFirstLoad.value = false
      return
    }
    atLasted.value = new Date().toISOString()
  }, {deep: true})

  function initStyle(styleId: number) {
    if (!styles.value[styleId]) styles.value[styleId] = {}
  }
  function initCharacter(charLabel: string) {
    if (!characters.value[charLabel]) characters.value[charLabel] = {}
  }

  function getUserData() {
    return {
      characters: characters.value,
      styles: styles.value,
      atLasted: atLasted.value,
      readStory: readStory.value,
      passiveRank: passiveRank.value,
    }
  }
  function setUserData(data: { atLasted: string, passiveRank: {[key in 1|2|3]: number[]}, styles: UserStyle, readStory: string[], characters: UserCharacter}) {
    readStory.value = data.readStory
    styles.value = data.styles
    characters.value = data.characters
    passiveRank.value = data.passiveRank
    atLasted.value = data.atLasted
  }
  return {
    readStory, passiveRank, styles, characters,
    getUserData, setUserData, initStyle, initCharacter,
    id, hash, atLasted,
  }
}, {persist: true})
