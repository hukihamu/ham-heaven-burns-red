<script setup lang="ts">
import {useUserStore} from '@/stores/user.ts'
import {useMasterStore} from '@/stores/master.ts'
import {computed} from 'vue'
import type {Style} from '@/types/style.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

const user = useUserStore()
const master = useMasterStore()

master.init('styles')
const allSSStyles = computed<Style[]>(() => master.mStyles.filter(s => s.tier === 'SS'))
const styleLists = computed(() => allSSStyles.value.reduce<{ owner: Style[], unowned: Style[] }>((acc, style) => {
  if (user.lb[style.id] === undefined) {
    acc.unowned.push(style)
  } else {
    acc.owner.push(style)
  }
  return acc
}, {owner: [], unowned: []}))
const lbTexts = ['0', '1', '2', '2.5', '3', '3.5', '4']
function countLB(id: number, isUp: boolean) {
  if (user.lb[id] === undefined) {
    user.lb[id] = 0
  } else if (user.lb[id] === 0 && !isUp) {
    user.lb[id] = undefined
  } else if (user.lb[id] < 6 && isUp) {
    user.lb[id]++
  } else if (!isUp){
    user.lb[id]--
  }
}
</script>

<template>
  <v-container fluid>
    <v-card>
      <v-card-title />
      <v-card-subtitle>
        フィルター
        <!--TODO-->
      </v-card-subtitle>
      <v-card-text>
        <v-card title="所持スタイル" :subtitle="`${styleLists.owner.length}/${allSSStyles.length} ${(styleLists.owner.length/allSSStyles.length*100).toFixed(2)}%`">
          <v-card-text>
            <v-data-iterator :items="styleLists.owner" items-per-page="-1">
              <template #default="{items}">
                <v-row no-gutters>
                  <v-col cols="6" md="3" v-for="style in items" :key="style.raw.id">
                    <v-sheet class="pa-1 select-none" position="relative">
                      <SeraphDBImage type="select" :bg="style.raw.bg" />
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
                        Lv.{{lbTexts[user.lb[style.raw.id] ?? 0]}}
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
                  <v-col cols="6" md="3" v-for="style in items" :key="style.raw.id">
                    <v-sheet class="pa-1 select-none" position="relative">
                      <SeraphDBImage type="select" :bg="style.raw.bg" />
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
