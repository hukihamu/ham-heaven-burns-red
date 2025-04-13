import type {StyleSkill} from '@/types/style.ts'

export interface Skill extends StyleSkill{
  image: string //Thumbnail
  style: string //name
  team: string //name
  chara: string //name
}
