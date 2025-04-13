import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import chapters from '@/assets/chapters.json'
import type {Style} from '@/types/style.ts'
import type {Event} from '@/types/event.ts'
import type {Chapter} from '@/types/chapter.ts'
import type {Accessory} from '@/types/accessory.ts'
import type {Character} from '@/types/character.ts'
import type {Skill} from '@/types/skill.ts'
import type {SkillType} from '@/types/skill_types.ts'
import type {MasterSkill} from '@/types/master_skills.ts'

type StyleType = 'styles' | 'events' | 'chapters' | 'accessories' | 'characters' | 'skills' | 'skill_types' | 'masterSkills'

export const useMasterStore =  defineStore('master', () => {
  const isInit = ref({
    styles: false,
    events: false,
    chapters: false,
    accessories: false,
    characters: false,
    skills: false,
    skill_types: false,
    masterSkills: false,
  })
  const m = {
    styles: ref<Style[]>([]),
    events: ref<Event[]>([]),
    chapters: ref<Chapter[]>(chapters as Chapter[]),
    accessories: ref<Accessory[]>([]),
    characters: ref<Character[]>([]),
    skills: ref<Skill[]>([]),
    skill_types: ref<SkillType[]>([]),
    masterSkills: ref<MasterSkill[]>([]),
  }
  async function init(...tList: StyleType[]) {
    for (const t of tList) {
      if (isInit.value[t] || t === 'chapters') continue
      m[t].value = await fetch(`/ham-heaven-burns-red/master/${t}.json`).then(res => res.json())
      isInit.value[t] = true
    }
  }
  const sortTeam = {
    '31A': 0,
    '31B': 10,
    '31C': 20,
    '31D': 30,
    '31E': 40,
    '31F': 50,
    '31X': 60,
    '30G': 70,
    '司令部': 80,
    'Angel Beats': 90,
  }
  const useCharacters = computed(() => m.characters.value
    .filter(c => (c.team !== '司令部' || c.label === 'NNanase') && c.label !== 'Karen')
    .sort((a, b) => (sortTeam[a.team] ?? 0) >= (sortTeam[b.team] ?? 0) ? 1 : -1))

  return {
    mStyles: m.styles,
    mEvents: m.events,
    mChapters: m.chapters,
    mAccessories: m.accessories,
    mCharacters: useCharacters,
    mSkills: m.skills,
    mSkillTypes: m.skill_types,
    mMasterSkills: m.masterSkills,
    init
  }
})
