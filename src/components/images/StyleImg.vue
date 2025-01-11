<script setup lang="ts">
import type {Style} from '@/types/style.ts'
import {computed} from 'vue'

const props = defineProps({
  style: Object as () => Style,
  type: {
    type: String as () => 'select' | 'thumbnail' | 'weapon' | 'b' | 'bg' | 'party',
    required: true,
  },
  width: Number,
  defaultWidth: Boolean,
  height: Number,
  defaultHeight: Boolean,
  cover: Boolean,
})
type ImgSrc = { src: string, aspectRatio: string, width?: number, height?: number, alt?: string }

function calcSize(defaultWidth: number, defaultHeight: number, ratioX: number, ratioY: number) {
  return {
    width: props.defaultWidth ? defaultWidth : props.width ?? (props.height ?? defaultHeight) * ratioX / ratioY,
    height: props.defaultHeight ? defaultHeight : props.height,
    aspectRatio: `${ratioX}/${ratioY}`,
  }
}

const image = computed<ImgSrc>(() => {
  const defaultProp = {src: '', aspectRatio: '1:1'}
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
    case 'bg':
      return {
        src: `https://hbr.quest/hbr/${props.style.bg}`,
        ...calcSize(1920, 1080, 16, 9),
      }
    case 'party':
      return {
        src: `https://hbr.quest/hbr/${props.style.bg.replace('.webp', '_Party.webp')}`,
        ...calcSize(244, 480, 61, 120),
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
         :aspect-ratio="image.aspectRatio"
         :cover="cover"
         :alt="image.alt">
    <v-tooltip :text="image.alt" location="top" :disabled="!image.alt" activator="parent"/>
  </v-img>
</template>

<style scoped>

</style>
