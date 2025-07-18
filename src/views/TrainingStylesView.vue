<script setup lang="ts">
import {useUserStore} from '@/stores/user.ts'
import {useMasterStore} from '@/stores/master.ts'
import {computed, ref} from 'vue'
import type {Style} from '@/types/style.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {useViewStore} from '@/stores/view.ts'
import PieceDialog from '@/components/PieceDialog.vue'

const user = useUserStore()
const master = useMasterStore()
const view = useViewStore()
const isPieceDialog = ref(false)

master.init('styles')
const allSSStyles = computed<Style[]>(() => master.mStyles.filter(s => s.tier === 'SS' || s.tier === 'SSR'))
const styleLists = computed(() => allSSStyles.value.reduce<{ owner: Style[], unowned: Style[] }>((acc, style) => {
  if (user.styles[style.id]?.lb === undefined) {
    acc.unowned.push(style)
  } else {
    acc.owner.push(style)
  }
  return acc
}, {owner: [], unowned: []}))
const lbTexts = ['0', '1', '2', '2.5', '3', '3.5', '4']
function countLB(id: number, isUp: boolean) {
  user.initStyle(id)
  if (user.styles[id].lb === undefined) {
    user.styles[id].lb = 0
  } else if (user.styles[id].lb === 0 && !isUp) {
    user.styles[id].lb = undefined
  } else if (user.styles[id].lb < 6 && isUp) {
    user.styles[id].lb++
  } else if (!isUp){
    user.styles[id].lb--
  }
}
function setOwnerDetailStyle(index: number) {
  view.detailStyle = styleLists.value.owner[index]
  view.getPrevStyle = index > 0 ? () => {
    setOwnerDetailStyle(index - 1)
  } : undefined
  view.getNextStyle = index < styleLists.value.owner.length - 1 ? () => {setOwnerDetailStyle(index + 1)} : undefined
}
function setUnownedDetailStyle(index: number) {
  view.detailStyle = styleLists.value.unowned[index]
  view.getPrevStyle = index > 0 ? () => {
    setUnownedDetailStyle(index - 1)
  } : undefined
  view.getNextStyle = index < styleLists.value.unowned.length - 1 ? () => {setUnownedDetailStyle(index + 1)} : undefined
}
</script>

<template>
  <v-container fluid>
    <v-card>
      <v-card-title />
      <v-card-subtitle>
        <v-btn text="絞り込み" disabled class="me-2"/>
        <v-btn text="並び替え" disabled/>
        <v-btn text="余剰ピース" @click="isPieceDialog = true"/>
      </v-card-subtitle>
      <v-card-text>
        <v-card title="所持スタイル" :subtitle="`${styleLists.owner.length}/${allSSStyles.length} ${(styleLists.owner.length/allSSStyles.length*100).toFixed(2)}%`">
          <v-card-text>
            <v-data-iterator :items="styleLists.owner" items-per-page="-1">
              <template #default="{items}">
                <v-row no-gutters>
                  <v-col cols="6" md="3" v-for="(style, index) in items" :key="style.raw.id">
                    <v-sheet class="pa-1 select-none" position="relative">
                      <SeraphDBImage type="select" :bg="style.raw.bg" :tooltip="style.raw.name" @click="setOwnerDetailStyle(index)"/>
                      <v-sheet position="absolute" location="left center" color="transparent" class="ms-3 d-flex flex-column justify-space-around h-100">
                        <v-hover>
                          <template #default="{ props, isHovering }">
                            <SeraphDBImage v-bind="props" type="allow" allow="Up" :style="{ opacity: isHovering ? 1 : 0.5 }" @click="countLB(style.raw.id, true)" />
                          </template>
                        </v-hover>
                        <v-hover>
                          <template #default="{ props, isHovering }">
                            <SeraphDBImage v-bind="props" type="allow" allow="Down" :style="{ opacity: isHovering ? 1 : 0.5 }" @click="countLB(style.raw.id, false)" />
                          </template>
                        </v-hover>
                      </v-sheet>
                      <v-sheet position="absolute" location="left center" color="transparent" class="ms-11 text-outline">
                        Lv.{{lbTexts[user.styles[style.raw.id].lb ?? 0]}}
                      </v-sheet>
                    </v-sheet>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
        <v-card title="未所持スタイル">
          <v-card-text>
            <v-data-iterator :items="styleLists.unowned" items-per-page="-1">
              <template #default="{items}">
                <v-row no-gutters>
                  <v-col cols="6" md="3" v-for="(style, index) in items" :key="style.raw.id">
                    <v-sheet class="pa-1 select-none" position="relative">
                      <SeraphDBImage type="select" :bg="style.raw.bg" :tooltip="style.raw.name" @click="setUnownedDetailStyle(index)" />
                      <v-sheet position="absolute" location="left center" color="transparent" class="ms-3 d-flex flex-column justify-space-around h-100">
                        <v-hover>
                          <template #default="{ props, isHovering }">
                            <SeraphDBImage v-bind="props" type="new" :style="{ opacity: isHovering ? 1 : 0.5 }" @click="countLB(style.raw.id, true)" />
                          </template>
                        </v-hover>
                      </v-sheet>
                    </v-sheet>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <PieceDialog v-model="isPieceDialog" />
  </v-container>
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
</style>
