<script setup lang="ts">
import {computed} from 'vue'
import type {TeamType} from '@/types/general.ts'
import {HAM_DOMAIN, HBR_ASSETS_DOMAIN} from '@/utils.ts'
type ImageType = 'select' | 'allow' | 'new' | 'team' | 'character-badges' | 'hbr' | 'g' | 'team-character-label'
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
  g: String,
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
    case 'g':
      attr.src += `/g/${props.g}`
      attr.width = calcWidth(260, 508) // プロフィール基準
      break
    case 'team-character-label':
      attr.src += `/pf/${props.team?.toLowerCase().replace(' ', '')}/${props.characterLabel}.webp`
      attr.width = calcWidth(392, 1716)
      break
  }
  return attr
})
function onErrorImage(el: Element, src: string) {
  const img = el.querySelector('img')
  const temp = src.replace(HAM_DOMAIN, HBR_ASSETS_DOMAIN)
  if (!img || img.src === temp) return
  img.src = temp
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
