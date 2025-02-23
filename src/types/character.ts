import type {TeamType} from '@/types/general.ts'
import type {Skill} from "@/types/style.ts";

export interface Character {
  id: number
  image: string
  w_image: string
  label: string
  name: string
  ruby: string
  team: TeamType
  profile: unknown
  cards: Card[]
  restrict: unknown[]
  base_param: unknown
  reincarnation: number
  masterly: Masterly | null
  in_date: string
}

export interface Card {
  id: number
  image: string
  label: string
  name: string
  role: string
  tier: string
  type: string
  ele: unknown[]
  stats: unknown
  gabi: unknown | null
  skills: unknown[]
  passives: unknown[]
}

interface Masterly {
  id: number
  label: string
  skill: Skill
  hits: unknown[]
  in_date: string
  missions: Mission[]
}

interface Mission {
  id: number
  label: string
  category: string
  event: Event
  type: string
  desc: string
  reward: unknown[]
  conditions: Condition[]
  in_date: string
  out_date: string
}

interface Event {
  i: string
  t: string
  a: string
}
interface Condition {
  label: string
  value: number
}
