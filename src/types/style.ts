import type {TierType, ElementType, RoleType, StyleType, GrowthAbiType} from '@/types/general.ts'

export interface Style {
  id: number // スタイルID
  image: string // サムネイル画像
  strip: string // パーティ画像
  bg: string // 全画面画像
  mv: string | null // Live2D動画
  lmv: string | null // Live2D動画?
  lvl: string | null // 取得映像?
  lvt: string | null // 取得時台詞?
  team: Team // 所属部隊
  chara: string // キャラ名(ローマ字表記あり)
  chara_label: string // キャラの一意ラベル
  chara_icon: string // キャラアイコン画像
  name: string // スタイル名
  desc: string // スタイル説明文
  desc_evo: string // TODO
  in_date: string // 実装日
  label: string // スタイルの一意ラベル
  tier: TierType // レアリティ
  piece: Piece // ピース情報
  role: RoleType // ロール
  type: StyleType // 武器属性
  elements: ElementType[] // スタイル属性
  weapon: Weapon // 武器情報
  pair_weapon: string // ユニゾンの相方武器ID (Weapon.YIzumi01b)
  base_param: BaseParam // 初期パラメータ
  skills: Skill[] // スキル情報
  growth_abi: GrowthAbi | null // 宝珠強化
  limit_break: LimitBreak // 凸情報
  ability_tree: AbilityTree[] // 強化ツリー
  passives: Passive[] // 初期パッシブ情報
  generalize: boolean // ジェネライズ有無
}
interface Passive {
  category: 'Passive'
  id: number
  label: string
  name: string
  desc: string
  info: string
  timing: string
  condition: string
  activ_rate: number
  effect: string
  auto_type: string
  parts?: Part[]
  skills?: Skill[]
  in_date: string
}
interface RequireItem {
  item: string
  num: number
}
interface Requires {
  sc_num: number
  ci_num: number
  level: number
  items: RequireItem[]
}
interface Ability {
  category: string
  type: string
  value_type: string
  value: number[]
  skill: number
  is_exclusive: boolean
  requires: Requires
}
interface AbilityTree {
  label: string
  name: string
  conditions: string[] | null
  ability_list: Ability[]
}
interface GrowthAbi {
  "l": GrowthAbiType // BuffUp
  "n": string // 説明
}
interface SkillPassive {
  timing: string
  condition: string
  activ_rate: number
  effect: string
  auto_type: string
}
interface Skill {
  id: number
  label: string
  name: string
  desc: string
  hit_count: number
  target_type: string // AllySingleWithoutSelf
  is_restricted: number
  auto_priority: number
  is_adv: boolean
  use_count: number | number[]
  sp_cost: number
  max_level: number
  overwrite: number
  effect: string // NormalBuff_Up
  cond: string
  passive: SkillPassive | null
  parts: Part[]
  hits: Hit[]
  in_date: string
  is_strval?: boolean
}
interface Parameter {
  str: number
  wis: number
  dex: number
  spr: number
  luk: number
  con: number
}
interface BaseParam {
  dp: number
  hp: number
  sp: number
  str: number
  wis: number
  dex: number
  spr: number
  luk: number
  con: number
}
interface Weapon {
  name: string // 武器名
  type: WeaponType // 武器タイプ
}
interface LimitBreak {
  stat_up_per_level: number
  bonus_per_level: BonusPerLevel[]
}
interface BonusPerLevel {
  step: number
  piece_num: number
  level_cap: number
  bonus: (AbilityBonus | PassiveBonus)[]
}
interface PassiveBonus {
  category: 'Passive'
  id: number
  label: string
  name: string
  desc: string
  info: string
  timing: string
  condition: string
  activ_rate: number
  effect: string
  auto_type: string
  parts: Part[]
  in_date: string
  ct: string
}
interface AbilityBonus {
  category: 'Ability'
  type: string
  value_type: string
  value: number[]
  skill: null
}
interface Part {
  skill_type: string // AttackUp CriticalDamageUp
  target_type: string // AllySingleWithoutSelf
  type: StyleType | null
  elements: ElementType[]
  power: number[]
  value: number[]
  strval: number[] | Skill[]
  cond: string
  sstl: string[] | null
  dv: number
  multipliers: Multipliers
  diff_for_max: number
  parameters: Parameter
  growth: number[]
  hits: Hit[]
  hit_condition: string
  effect: Effect
}
interface Effect {
  category: string // AttackUp_Count CriticalDamageUp_Count
  limitType: string // Default
  exitCond: string // Count
  exitVal: number[]
}
interface Hit {
  id: number
  type: string // After
  power_ratio: number
}
interface Multipliers {
  dp: number
  hp: number
  dr: number
}
interface Piece {
  id: number
  is_item: boolean
  category: string // "Piece"
  rarity: number
  image: string
  label: string
  name: string
  text: string
  value: number
  limit: number
  price: number
  price_alt: number
  sale: number
  currency: string
  location: string
  almightyRate: number
}

type Team = 'Angel Beats' | '31A' | '31B' | '31C' | '31D' | '31E' | '31F' | '31X' | '30G'


type WeaponType = 'DoubleSword' | 'Shield' | string
