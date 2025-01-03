<script setup lang="ts">
import type {Style} from '@/types/style.ts'
import {computed} from 'vue'

const {style, type, width, height} = defineProps({
  style: Object as () => Style,
  type: {
    type: String as () => 'select' | 'thumbnail' | 'weapon' | 'b',
    required: true,
  },
  width: Number,
  height: Number,
})
type ImgSrc = { src: string, width: number, height: number, alt?: string }
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
const image = computed<ImgSrc>(() => {
  const defaultProp = { width: 0, height: 0, src: '' }
  if (!style) return defaultProp
  // https://hbr.quest/pf/31a/RKayamori.webp?62, https://hbr.quest/pf/angelbeats/CathyC.webp?62
  // https://hbr.quest/hbr/RKayamoriSmallIcon.webp?62
  // https://hbr.quest/g/RKayamoriProfile.webp?62
  switch (type) {
    case 'select':
      return {
        src: `https://hbr.quest/hbr/${style.bg.replace('.webp', '_Select.webp')}`,
        ...calcSize(356, 144, 89, 36),
        alt: style?.name,
      }
    case 'thumbnail':
      return {
        src: `https://hbr.quest/hbr/${style.image}`,
          ...calcSize(184, 184, 1, 1),
        alt: style?.name,
      }
    case 'weapon':
      return {
        src: `https://hbr.quest/hbr/${style.weapon.type}.webp`,
        ...calcSize(180, 180, 1, 1),
        alt: style?.weapon.name,
      }
    case 'b':
      return {
        src: `https://hbr.quest/b/${style.chara_label}.webp`,
        ...calcSize(174, 172, 87, 86),
        alt: style?.chara,
      }
    default:
      return defaultProp
  }
})
</script>

<template>
  <v-tooltip :text="image.alt" location="top">
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
