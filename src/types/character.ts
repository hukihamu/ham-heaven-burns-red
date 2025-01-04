export interface Character {
  id: number
  image: string
  w_image: string
  label: string
  name: string
  ruby: string
  team: string
  profile: unknown
  cards: Card[]
  restrict: unknown[]
  base_param: unknown
  reincarnation: number
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
