import type {Skill} from '@/types/style.ts'

export interface Accessory {
  id: number
  in_date: string
  label: string
  rarity: number
  image: string
  name: string
  text: string
  max_lv: number
  location: string
  condition: string
  effects: unknown[]
  rng_eff: unknown[]
  skill: Skill[]
}
