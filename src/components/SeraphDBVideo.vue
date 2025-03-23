<script setup lang="ts">
import {computed} from 'vue'
import {HAM_DOMAIN, HBR_ASSETS_DOMAIN_OLD} from '@/utils.ts'

const props = defineProps({
  tooltip: String,
  width: Number,
  height: Number,
  cover: Boolean,
  position: String,

  webm: String,
})
const videoAttr = computed<{src: string, cover: boolean, position: string}>(() => {
  return {src: HAM_DOMAIN + `/webm/${props.webm}`, cover: props.cover ?? false, position: props.position ?? 'center center'}
})
function onErrorWebm(el: HTMLVideoElement, src: string) {
  const temp = src.replace(HAM_DOMAIN, HBR_ASSETS_DOMAIN_OLD)
  if (el.src === temp) return
  el.src = temp
}
</script>

<template>
  <video v-if="webm"
         :src="videoAttr.src"
         autoplay
         loop
         class="video"
         :style="{objectPosition: videoAttr.position, objectFit: cover ? 'cover' : 'contain'}"
         @error="onErrorWebm($el, videoAttr.src)" />
</template>

<style scoped>
.video {
  width: 100%;
  height: 100%;
}
</style>
