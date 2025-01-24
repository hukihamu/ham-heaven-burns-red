<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import {computed} from 'vue'
import type {Passive} from '@/types/style.ts'
import {VueDraggable} from 'vue-draggable-plus'
import {useUserStore} from '@/stores/user.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

type passive = { [id: number]: Passive & { styles: string[] } }

const master = useMasterStore()
master.init('styles')
const user = useUserStore()
const allPassives = computed(() => master.mStyles
  .filter(s => s.tier === 'SS')
  .reduce<passive>((acc, cur) => {
    // 初期アビリティ
    cur.passives.forEach(p => {
      if (p.name !== '[Auto] 追撃' && p.name !== '[Overdrive]') {
        if (!acc[p.id]) {
          acc[p.id] = {...p, styles: [cur.image], name: p.name.replace('[Auto] ', '[0凸] ')}
        } else {
          acc[p.id].styles.push(cur.image)
        }
      }
    })
    // 凸アビリティ
    cur.limit_break.bonus_per_level.forEach(l => {
      l.bonus.forEach(p => {
        if (p.category === 'Passive') {
          if (!acc[p.id]) {
            acc[p.id] = {...p, styles: [cur.image], name: p.name.replace('[Auto] ', '[3凸] ')}
          } else {
            acc[p.id].styles.push(cur.image)
          }
        }
      })
    })
    return acc
  }, {}))
const p = computed(() => Object.keys(allPassives.value).map(it => parseInt(it)).sort((a, b) => allPassives.value[a].info.localeCompare(allPassives.value[b].info)))
const pN = computed({
  get: () => p.value.filter(id => !user.passiveRank['1'].includes(id) && !user.passiveRank['2'].includes(id) && !user.passiveRank['3'].includes(id)),
  set: () => {},
})
const p1 = computed({
  get: () => p.value.filter(id => user.passiveRank['1'].includes(id)),
  set: (newValue: number[]) => {user.passiveRank['1'] = newValue},
})
const p2 = computed({
  get: () => p.value.filter(id => user.passiveRank['2'].includes(id)),
  set: (newValue: number[]) => {user.passiveRank['2'] = newValue},
})
const p3 = computed({
  get: () => p.value.filter(id => user.passiveRank['3'].includes(id)),
  set: (newValue: number[]) => {user.passiveRank['3'] = newValue},
})

</script>

<template>
  <v-container fluid>
    <v-card title="アビリティの強さ" subtitle="アビリティに強さの順位を付与することで、凸優先順位の参考にできます。">
      <v-card-text>
        <v-slide-group>
          <v-slide-group-item>
            <v-card border>
              <v-card-title class="text-center">
                未設定
              </v-card-title>
              <v-card-text class="card-text">
                <VueDraggable v-model="pN" group="passive" class="h-100">
                  <v-list-item v-for="passive in pN" :key="passive" :title="allPassives[passive].name">
                    <v-list-item-subtitle class="whitespace-pre">
                      {{allPassives[passive].desc}}
                    </v-list-item-subtitle>
                    <v-tooltip activator="parent" location="top">
                      <v-row no-gutters>
                        <v-col v-for="image in allPassives[passive].styles" :key="image">
                          <SeraphDBImage  type="hbr" :hbr="image" :width="48" />
                        </v-col>
                      </v-row>
                    </v-tooltip>
                  </v-list-item>
                </VueDraggable>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-card border>
              <v-card-title class="text-center">
                低
              </v-card-title>
              <v-card-text class="card-text">
                <VueDraggable v-model="p1" group="passive"  class="h-100">
                  <v-list-item v-for="passive in p1" :key="passive" :title="allPassives[passive].name">
                    <v-list-item-subtitle class="whitespace-pre">
                      {{allPassives[passive].desc}}
                    </v-list-item-subtitle>
                    <v-tooltip activator="parent" location="top">
                      <v-row no-gutters>
                        <v-col v-for="image in allPassives[passive].styles" :key="image">
                          <SeraphDBImage  type="hbr" :hbr="image" :width="48" />
                        </v-col>
                      </v-row>
                    </v-tooltip>
                  </v-list-item>
                </VueDraggable>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-card border>
              <v-card-title class="text-center">
                中
              </v-card-title>
              <v-card-text class="card-text">
                <VueDraggable v-model="p2" group="passive" class="h-100">
                  <v-list-item v-for="passive in p2" :key="passive" :title="allPassives[passive].name">
                    <v-list-item-subtitle class="whitespace-pre">
                      {{allPassives[passive].desc}}
                    </v-list-item-subtitle>
                    <v-tooltip activator="parent" location="top">
                      <v-row no-gutters>
                        <v-col v-for="image in allPassives[passive].styles" :key="image">
                          <SeraphDBImage  type="hbr" :hbr="image" :width="48" />
                        </v-col>
                      </v-row>
                    </v-tooltip>
                  </v-list-item>
                </VueDraggable>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-card border>
              <v-card-title class="text-center">
                高
              </v-card-title>
              <v-card-text class="card-text">
                <VueDraggable v-model="p3" group="passive" class="h-100">
                  <v-list-item v-for="passive in p3" :key="passive" :title="allPassives[passive].name">
                    <v-list-item-subtitle class="whitespace-pre">
                      {{allPassives[passive].desc}}
                    </v-list-item-subtitle>
                    <v-tooltip activator="parent" location="top">
                      <v-row no-gutters>
                        <v-col v-for="image in allPassives[passive].styles" :key="image">
                          <SeraphDBImage  type="hbr" :hbr="image" :width="48" />
                        </v-col>
                      </v-row>
                    </v-tooltip>
                  </v-list-item>
                </VueDraggable>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.card-text {
  overflow-y: auto;
  height: calc(100vh - 240px);
}
.whitespace-pre {
  white-space: pre;
  -webkit-line-clamp: 2;
}
</style>
