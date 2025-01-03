<script setup lang="ts">
import {computed} from 'vue'
import type {ElementType, GrowthAbiType, SkillType, StyleType, TierType} from '@/types/general.ts'

const {tier, styleType, skillType, growthAbiType, element, width, height, alt} = defineProps({
  tier: String as () => TierType,
  element: String as () => ElementType,
  styleType: String as () => StyleType,
  growthAbiType: String as () => GrowthAbiType,
  skillType: String as () => SkillType,
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
      .replace('HealUp', 'ReviveDp') // TODO より良いiconに
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
  <v-tooltip :text="image.alt" location="top" :disabled="!image.alt">
    <template #activator="{props}">
      <v-img v-bind="props"
             :src="image.src"
             :width="image.width"
             :height="image.height"
             :alt="image.alt" />
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>
