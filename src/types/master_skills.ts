import type {StyleSkill} from '@/types/style.ts'

export interface MasterSkill {
  id: number
  label: string
  chara: string
  chara_label: string
  chara_icon: string
  skill: StyleSkill
  desc: string
  in_date: string
  missions: Mission[]
}

interface Mission {
  id: number
  label: string
  category: string
  event: {
    i: string
    t: string
    a: string
  }
  type: string
  desc: string
  reward: unknown[]
  conditions: {
    label: string
    value: number
  }[]
  in_date: string
  out_date: string
}
