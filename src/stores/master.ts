import {defineStore} from 'pinia'
import {ref} from 'vue'
import chapters from '@/assets/chapters.json'
import type {Style} from '@/types/style.ts'
import type {Event} from '@/types/event.ts'
import type {Chapter} from '@/types/chapter.ts'
import type {Accessory} from '@/types/accessory.ts'
import type {Character} from '@/types/character.ts'
import type {Latest} from '@/types/latest.ts'

type StyleType = 'styles' | 'events' | 'chapters' | 'accessories' | 'characters' | 'latest'

export const useMasterStore =  defineStore('master', () => {
  const isInit = ref({
    styles: false,
    events: false,
    chapters: false,
    accessories: false,
    characters: false,
    latest: false,
  })
  const m = {
    styles: ref<Style[]>([]),
    events: ref<Event[]>([]),
    chapters: ref<Chapter[]>(chapters as Chapter[]),
    accessories: ref<Accessory[]>([]),
    characters: ref<Character[]>([]),
    latest: ref<Latest>({mSkills: {ls: []}})
  }
  async function init(...tList: StyleType[]) {
    for (const t of tList) {
      if (isInit.value[t] || t === 'chapters') continue
      m[t].value = await fetch(`/ham-heaven-burns-red/master/${t}.json`).then(res => res.json())
      isInit.value[t] = true
    }
  }

  return {
    mStyles: m.styles,
    mEvents: m.events,
    mChapters: m.chapters,
    mAccessories: m.accessories,
    mCharacters: m.characters,
    mLatest: m.latest,
    init
  }
})
