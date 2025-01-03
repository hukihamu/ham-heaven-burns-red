<script setup lang="ts">
import type {Style} from '@/types/style.ts'
import {computed} from 'vue'

const props = defineProps({
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
  if (props.width) {
    temp.width = props.width
    if (props.height) {
      temp.height = props.height
    } else {
      temp.height = props.width * ratioY / ratioX
    }
  } else if (props.height) {
    temp.width = props.height * ratioX / ratioY
    temp.height = props.height
  }
  return temp
}
const image = computed<ImgSrc>(() => {
  const defaultProp = { width: 0, height: 0, src: '' }
  if (!props.style) return defaultProp
  // https://hbr.quest/pf/31a/RKayamori.webp?62, https://hbr.quest/pf/angelbeats/CathyC.webp?62
  // https://hbr.quest/hbr/RKayamoriSmallIcon.webp?62
  // https://hbr.quest/g/RKayamoriProfile.webp?62
  switch (props.type) {
    case 'select':
      return {
        src: `https://hbr.quest/hbr/${props.style.bg.replace('.webp', '_Select.webp')}`,
        ...calcSize(356, 144, 89, 36),
        alt: props.style?.name,
      }
    case 'thumbnail':
      return {
        src: `https://hbr.quest/hbr/${props.style.image}`,
          ...calcSize(184, 184, 1, 1),
        alt: props.style?.name,
      }
    case 'weapon':
      return {
        src: `https://hbr.quest/hbr/${props.style.weapon.type}.webp`,
        ...calcSize(180, 180, 1, 1),
        alt: props.style?.weapon.name,
      }
    case 'b':
      return {
        src: `https://hbr.quest/b/${props.style.chara_label}.webp`,
        ...calcSize(174, 172, 87, 86),
        alt: props.style?.chara,
      }
    default:
      return defaultProp
  }
})
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
