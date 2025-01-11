export type TierType = 'A' | 'S' | 'SS'
export type ElementType = 'Fire' | 'Light' | 'Thunder' | 'Dark' | 'Ice' | 'Nonelement'
export type StyleType = 'Strike' | 'Stab' | 'Slash'
export type RoleType = 'Attacker' | 'Breaker' | 'Debuffer' | 'Buffer' | 'Blaster' | 'Healer' | 'Defender' | 'Admiral'
export type SkillType = 'AttackUp' | string
export type GrowthAbiType = 'AttackUp' | 'DebuffUp' | 'BuffUp' | 'HealUp' | 'Passive'
export type WeaponType = 'DoubleSword' | 'Cannon' | 'LargeSword' | 'Gun' | 'Scythe' | 'Sword' | 'Shield' | 'Claw'
export type FilterModelType = {
  tier: TierType[]
  element: ElementType[]
  role: RoleType[]
  weapon: WeaponType[]
  styleType: StyleType[]
}
