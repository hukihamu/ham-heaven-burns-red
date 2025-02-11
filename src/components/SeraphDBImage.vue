<script setup lang="ts">
import {computed} from 'vue'
import type {TeamType} from '@/types/general.ts'
type ImageType = 'select' | 'allow' | 'new' | 'team' | 'character-badges' | 'hbr'
const props = defineProps({
  type: {
    type: String as () => ImageType,
    required: true,
  },
  tooltip: String,
  width: Number,
  height: Number,

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
const HAM_DOMAIN = '/ham-heaven-burns-red/img'
const HBR_DOMAIN = 'https://hbr.quest'
const imageAttr = computed<{src: string, width: number}>(() => {
  const attr = {src: HAM_DOMAIN, width: 0}
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
function onError(el: HTMLDivElement, src: string) {
  const img = el.querySelector('img')
  if (!img) return
  img.src = src.replace(HAM_DOMAIN, HBR_DOMAIN)
}
</script>

<template>
<v-img v-bind="imageAttr" @error="onError($el, imageAttr.src)">
  <v-tooltip activator="parent" location="top" :disabled="!tooltip" :text="tooltip" content-class="bg-info"/>
  <slot />
</v-img>
</template>

<style scoped>

</style>
