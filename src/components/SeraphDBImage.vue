<script setup lang="ts">
import {computed} from 'vue'
import type {TeamType} from '@/types/general.ts'
import {HAM_DOMAIN, HBR_DOMAIN} from '@/utils.ts'
type ImageType = 'select' | 'allow' | 'new' | 'team' | 'character-badges' | 'hbr'
const props = defineProps({
  type: {
    type: String as () => ImageType,
    required: true,
  },
  tooltip: String,
  width: Number,
  height: Number,
  cover: Boolean,
  position: String,

  bg: String,
  thumbnail: String,
  allow: String as () => 'Up' | 'Down',
  team: String as () => TeamType,
  characterLabel: String,
  hbr: String,
})
function calcWidth(defaultWidth: number, defaultHeight: number) {
  if (props.width) return props.width
  if (props.height) return props.height * defaultWidth / defaultHeight
  return defaultWidth
}
type ImageAttr = {src: string, width?: number, cover: boolean, position: string}
const imageAttr = computed<ImageAttr>(() => {
  const attr: ImageAttr = {src: HAM_DOMAIN, width: undefined, cover: props.cover ?? false, position: props.position ?? 'center center'}
  switch (props.type) {
    case 'select':
      attr.src += `/hbr/${props.bg?.replace('.webp', '_Select.webp') ?? props.thumbnail?.replace('_Thumbnail.webp', '_Select.webp')}`
      attr.width = calcWidth(356, 144)
      break
    case 'allow':
      attr.src += `/al/Icon${props.allow}.webp`
      attr.width = calcWidth(32, 32)
      break
    case 'new':
      attr.src += `/ui/LabelNew.webp`
      attr.width = calcWidth(108, 57)
      break
    case 'team':
      attr.src += `/ui/${props.team?.toLowerCase().replace(' ', '')}.webp`
      attr.width = calcWidth(160, 132)
      break
    case 'character-badges':
      attr.src += `/b/${props.characterLabel}.webp`
      attr.width = calcWidth(174, 172)
      break
    case 'hbr':
      attr.src += `/hbr/${props.hbr}`
      attr.width = calcWidth(184, 184) // Orb基準
      break
  }
  return attr
})
function onErrorImage(el: Element, src: string) {
  const img = el.querySelector('img')
  if (!img || img.src === src.replace(HAM_DOMAIN, HBR_DOMAIN)) return
  img.src = src.replace(HAM_DOMAIN, HBR_DOMAIN)
}
</script>

<template>
<v-img v-bind="imageAttr" @error="onErrorImage($el, imageAttr.src)">
  <v-tooltip activator="parent" location="top" :disabled="!tooltip" :text="tooltip" content-class="bg-info"/>
  <slot />
</v-img>
</template>

<style scoped>

</style>
