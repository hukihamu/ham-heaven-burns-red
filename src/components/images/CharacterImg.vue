<script setup lang="ts">
import {computed} from 'vue'
import type {Card} from '@/types/character.ts'

const props = defineProps({
  card: Object as () => Card,
  type: {
    type: String as () => 'select' | 'thumbnail',
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
  if (!props.card) return defaultProp
  switch (props.type) {
    case 'select':
      return {
        src: `https://hbr.quest/hbr/${props.card.image.replace('_Thumbnail.webp', '_Select.webp')}`,
        ...calcSize(356, 144, 89, 36),
        alt: props.card?.name,
      }
    case 'thumbnail':
      return {
        src: `https://hbr.quest/hbr/${props.card.image}`,
        ...calcSize(184, 184, 1, 1),
        alt: props.card?.name,
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
