export type TierType = 'A' | 'S' | 'SS' | 'SSR'
export type ElementType = 'Fire' | 'Light' | 'Thunder' | 'Dark' | 'Ice' | 'Nonelement'
export type StyleType = 'Strike' | 'Stab' | 'Slash'
export type RoleType = 'Attacker' | 'Breaker' | 'Debuffer' | 'Buffer' | 'Blaster' | 'Healer' | 'Defender' | 'Admiral'
export type SkillType = 'AttackUp' | string
export type GrowthAbiType = 'AttackUp' | 'DebuffUp' | 'BuffUp' | 'HealUp' | 'Passive'
export type WeaponType = 'DoubleSword' | 'Cannon' | 'LargeSword' | 'Gun' | 'Scythe' | 'Sword' | 'Shield' | 'Claw'
export type TeamType = '31A' | '31B' | '31C' | '30G' | '31D' | '31E' | '31F' | '31X' | 'Angel Beats' | '司令部'

export type FilterModelType = {
  tier: TierType[]
  element: ElementType[]
  role: RoleType[]
  weapon: WeaponType[]
  styleType: StyleType[]
}
