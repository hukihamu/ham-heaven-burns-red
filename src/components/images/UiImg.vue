<script setup lang="ts">
import {computed} from 'vue'
import type {ElementType, GrowthAbiType, RoleType, SkillType, StyleType, TierType} from '@/types/general.ts'

const {allow, newLabel, tier, styleType, skillType, growthAbiType, element, role, width, height, alt} = defineProps({
  tier: String as () => TierType,
  element: String as () => ElementType,
  styleType: String as () => StyleType,
  growthAbiType: String as () => GrowthAbiType,
  skillType: String as () => SkillType,
  role: String as () => RoleType,
  allow: String as () => 'Up' | 'Down',
  newLabel: Boolean,
  alt: String,
  width: Number,
  height: Number,
})
type ImgSrc = { src: string, width: number, height: number, alt?: string }
const image = computed<ImgSrc>(() => {
  if (tier) return {
    src: `https://hbr.quest/ui/IconRarity${tier}.webp`,
    ...calcSize(88, 88, 1, 1),
    alt,
  }
  if (styleType) return {
    src: `https://hbr.quest/at/${styleType}.webp`,
    ...calcSize(100, 100, 1, 1),
    alt,
  }
  if (growthAbiType) {
    // 同じ効果のskillTypeに置き換え
    const replaceName = growthAbiType
      .replace('DebuffUp', 'GiveDebuffUp')
      .replace('BuffUp', 'GiveAttackBuffUp')
      .replace('HealUp', 'GiveHealUp')
      .replace('Passive.DefenceUpFromProvoke', 'DefenseUp') // TODO より良いiconに
    return {
      src: `https://hbr.quest/al/${replaceName}.webp`,
      ...calcSize(59, 59, 1, 1),
      alt,
    }
  }
  if (skillType) return {
    src: `https://hbr.quest/al/${skillType}.webp`,
    ...calcSize(59, 59, 1, 1),
    alt,
  }
  if (element) return {
    src: `https://hbr.quest/ui/${element}.webp`,
    ...calcSize(48, 48, 1, 1),
    alt,
  }
  if (role) return {
    src: `/ham-heaven-burns-red/${role}.png`,
    ...calcSize(430, 86, 5, 1),
    alt,
  }
  if (allow) return {
    src: `https://hbr.quest/al/Icon${allow}.webp`,
    ...calcSize(32, 30, 16, 15),
    alt,
  }
  if (newLabel) return {
    src: `https://hbr.quest/ui/LabelNew.webp`,
    ...calcSize(108, 57, 36, 19),
    alt,
  }
  return {
    src: '',
    width: 0,
    height: 0,
  }
})
function calcSize(defaultWidth: number, defaultHeight: number, ratioX: number, ratioY: number) {
  const temp = {
    width: defaultWidth,
    height: defaultHeight,
  }
  if (width) {
    temp.width = width
    if (height) {
      temp.height = height
    } else {
      temp.height = width * ratioY / ratioX
    }
  } else if (height) {
    temp.width = height * ratioX / ratioY
    temp.height = height
  }
  return temp
}
</script>

<template>
  <v-img :src="image.src"
         :width="image.width"
         :height="image.height"
         :alt="image.alt" >
    <v-tooltip :text="image.alt" location="top" :disabled="!image.alt" activator="parent"/>
  </v-img>
</template>

<style scoped>

</style>
