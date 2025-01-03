<script setup lang="ts">
import type {Style} from '@/types/style.ts'
import StyleImg from '@/components/images/StyleImg.vue'
import { ref } from 'vue'
import UiImg from '@/components/images/UiImg.vue'

const {style, minWidth} = defineProps({
  style: Object as () => Style,
  minWidth: Number,
})
const lb = defineModel<number|undefined>({required: true})
const selectImg = ref()
const clientWidth = ref(selectImg.value?.clientWidth ?? minWidth ?? 0)
function onResize() {
  clientWidth.value = selectImg.value?.clientWidth ?? minWidth
}
const lbList = ['0　', '1　', '2　', '2.5', '3　', '3.5', '4　']
</script>

<template>
  <div ref="selectImg" v-resize="onResize" :style="[minWidth ? `min-width:${minWidth}px` : '']" class="position-relative select-none">
    <StyleImg type="select" :style="style" :width="clientWidth" />
    <div class="position-absolute top-0 right-0 mt-1 mr-1 d-flex">
      <UiImg v-for="element in style?.elements ?? []" :width="clientWidth / 10" :element="element" :key="element" />
      <UiImg :width="clientWidth / 10" :style-type="style?.type" />
    </div>
    <div class="position-absolute top-0 left-0 mt-1 ml-1">
      <UiImg :width="clientWidth / 2" :role="style?.role" />
    </div>
    <div v-if="lb !== undefined" class="position-absolute bottom-0 left-0 mb-1 mr-1 ml-1 d-flex justify-space-between">
      <v-hover>
        <template #default="{ props, isHovering }">
          <div v-bind="props" :style="{ opacity: isHovering ? 1 : 0.5 }" @click="lb + 1 < lbList.length ? lb++ : ''">
            <UiImg :width="clientWidth / 6" allow="Up" />
          </div>
        </template>
        </v-hover>
      <span class="text-start align-self-end text-outline" :style="[`font-size:${clientWidth / 11}px`]">Lv {{lbList[lb]}}</span>
      <v-hover>
        <template #default="{ props, isHovering }">
          <div v-bind="props" :style="{ opacity: isHovering ? 1 : 0.5 }" @click="lb > 0 ? lb-- : lb = undefined">
            <UiImg :width="clientWidth / 6" allow="Down" />
          </div>
        </template>
      </v-hover>
    </div>
    <div v-else class="position-absolute bottom-0 left-0 mb-1 ml-1 mr-1 w-50 justify-items-center">
      <v-hover>
        <template #default="{ props, isHovering }">
          <div v-bind="props" :style="{ opacity: isHovering ? 1 : 0.5 }" @click="lb = 0">
            <UiImg :width="clientWidth / 3" new-label />
          </div>
        </template>
      </v-hover>
    </div>
  </div>
</template>

<style scoped>
.text-outline {
  text-shadow:
    -1px -1px 3px black, /* 左上 */
    1px -1px 3px black,  /* 右上 */
    -1px 1px 3px black,  /* 左下 */
    1px 1px 3px black;   /* 右下 */
}
.select-none {
  user-select: none;
}
.justify-items-center {
  justify-items: center;
}
</style>
