<script setup lang="ts">
import {computed} from 'vue'
import type {ElementType, GrowthAbiType, RoleType, SkillType, StyleType, TierType} from '@/types/general.ts'

const props = defineProps({
  tier: String as () => TierType,
  element: String as () => ElementType,
  styleType: String as () => StyleType,
  growthAbiType: String as () => GrowthAbiType,
  skillType: String as () => SkillType,
  role: String as () => RoleType,
  allow: String as () => 'Up' | 'Down',
  story: String,
  accessory: String,
  eventLogo: String,
  newLabel: Boolean,

  alt: String,
  width: Number,
  defaultWidth: Boolean,
  height: Number,
  defaultHeight: Boolean,
  cover: Boolean,
})
type ImgSrc = { src: string, aspectRatio: string, width?: number, height?: number, alt?: string }
const image = computed<ImgSrc>(() => {
  if (props.tier) return {
    src: `https://hbr.quest/ui/IconRarity${props.tier}.webp`,
    ...calcSize(88, 88, 1, 1),
    alt: props.alt,
  }
  if (props.styleType) return {
    src: `https://hbr.quest/at/${props.styleType}.webp`,
    ...calcSize(100, 100, 1, 1),
    alt: props.alt,
  }
  if (props.growthAbiType) {
    // 同じ効果のskillTypeに置き換え
    const replaceName = props.growthAbiType
      .replace('DebuffUp', 'GiveDebuffUp')
      .replace('BuffUp', 'GiveAttackBuffUp')
      .replace('HealUp', 'GiveHealUp')
      .replace('Passive.DefenceUpFromProvoke', 'DefenseUp') // TODO より良いiconに
    return {
      src: `https://hbr.quest/al/${replaceName}.webp`,
      ...calcSize(59, 59, 1, 1),
      alt: props.alt,
    }
  }
  if (props.skillType) return {
    src: `https://hbr.quest/al/${props.skillType}.webp`,
    ...calcSize(59, 59, 1, 1),
    alt: props.alt,
  }
  if (props.element) return {
    src: `https://hbr.quest/ui/${props.element}.webp`,
    ...calcSize(48, 48, 1, 1),
    alt: props.alt,
  }
  if (props.role) return {
    src: `/ham-heaven-burns-red/${props.role}.png`,
    ...calcSize(430, 86, 5, 1),
    alt: props.alt,
  }
  if (props.allow) return {
    src: `https://hbr.quest/al/Icon${props.allow}.webp`,
    ...calcSize(32, 30, 16, 15),
    alt: props.alt,
  }
  if (props.newLabel) return {
    src: `https://hbr.quest/ui/LabelNew.webp`,
    ...calcSize(108, 57, 36, 19),
    alt: props.alt,
  }
  if (props.story) return {
    src: `https://hbr.quest/hbr/${props.story}.webp`,
    ...calcSize(1404, 1404, 1, 1),
    alt: props.alt,
  }
  if (props.accessory) return {
    src: `https://hbr.quest/hbr/${props.accessory}`,
    ...calcSize(184, 184, 1, 1),
  }
  if (props.eventLogo) return {
    src: `https://hbr.quest/hbr/${props.eventLogo}`,
    ...calcSize(184, 184, 1, 1),
    alt: props.alt,
  }
  return {
    src: '',
    aspectRatio: '1/1',
  }
})
function calcSize(defaultWidth: number, defaultHeight: number, ratioX: number, ratioY: number) {
  return {
    width: props.defaultWidth ? defaultWidth : props.width ?? (props.height ?? defaultHeight) * ratioX / ratioY,
    height: props.defaultHeight ? defaultHeight : props.height,
    aspectRatio: `${ratioX}/${ratioY}`,
  }
}
</script>

<template>
  <v-img :src="image.src"
         :width="image.width"
         :height="image.height"
         :aspect-ratio="image.aspectRatio"
         :cover="cover"
         :alt="image.alt" >
    <v-tooltip :text="image.alt" location="top" :disabled="!image.alt" activator="parent"/>
  </v-img>
</template>

<style scoped>

</style>
