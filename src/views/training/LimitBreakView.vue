<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import {useMasterStore} from '@/stores/master.ts'
import {useUserStore} from '@/stores/user.ts'
import {computed, ref} from 'vue'
import type {Style} from '@/types/style.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

const master = useMasterStore()
master.init('styles')
const user = useUserStore()
const allSSStyle = computed(() => master.mStyles.filter(it => it.tier === 'SS'))
const isPassive = ref(false)
const passiveOrder = computed(() => allSSStyle.value.reduce<{[styleId: number]: number}>((acc, cur) => {
  let order = 0
  // 初期アビリティ
  cur.passives.forEach(p => {
    if (user.passiveRank['1'].includes(p.id)) {
      order += 1
    } else if (user.passiveRank['2'].includes(p.id)) {
      order += 2
    } else if (user.passiveRank['3'].includes(p.id)) {
      order += 3
    }
  })
  // 凸アビリティ
  cur.limit_break.bonus_per_level.forEach(l => {
    l.bonus.forEach(p => {
      if (p.category === 'Passive') {
        if (user.passiveRank['1'].includes(p.id)) {
          order += 1 * l.step
        } else if (user.passiveRank['2'].includes(p.id)) {
          order += 2 * l.step
        } else if (user.passiveRank['3'].includes(p.id)) {
          order += 3 * l.step
        }
      }
    })
  })
  acc[cur.id] = order
  return acc
}, {}))
const lb = computed(() => allSSStyle.value.reduce<{[id: number]: Style[]}>((pre, cur) => {
  user.initStyle(cur.id)
  const lbCount = user.styles[cur.id].lb
  if (!pre[lbCount ?? 10]) pre[lbCount ?? 10] = []
  pre[lbCount ?? 10].push(cur)
  return pre
}, {}))
const lbN = computed({
  get: () => isPassive.value ? [...(lb.value[10] ?? [])].sort((a, b) => passiveOrder.value[a.id] < passiveOrder.value[b.id] ? 1 : -1) : (lb.value[10] ?? []),
  set: newValue => {newValue.forEach(it => user.styles[it.id].lb = undefined)},
})
const lb0 = computed({
  get: () => isPassive.value ? [...(lb.value[0] ?? [])].sort((a, b) => passiveOrder.value[a.id] < passiveOrder.value[b.id] ? 1 : -1) : (lb.value[0] ?? []),
  set: newValue => {newValue.forEach(it => user.styles[it.id].lb = 0)},
})
const lb1 = computed({
  get: () => isPassive.value ? [...(lb.value[1] ?? [])].sort((a, b) => passiveOrder.value[a.id] < passiveOrder.value[b.id] ? 1 : -1) : (lb.value[1] ?? []),
  set: newValue => {newValue.forEach(it => user.styles[it.id].lb = 1)},
})
const lb2 = computed({
  get: () => isPassive.value ? [...(lb.value[2] ?? [])].sort((a, b) => passiveOrder.value[a.id] < passiveOrder.value[b.id] ? 1 : -1) : (lb.value[2] ?? []),
  set: newValue => {newValue.forEach(it => user.styles[it.id].lb = 2)},
})
const lb3 = computed({
  get: () => isPassive.value ? [...(lb.value[3] ?? [])].sort((a, b) => passiveOrder.value[a.id] < passiveOrder.value[b.id] ? 1 : -1) : (lb.value[3] ?? []),
  set: newValue => {newValue.forEach(it => user.styles[it.id].lb = 3)},
})
const lb4 = computed({
  get: () => lb.value[4] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].lb = 4)},
})
const lb5 = computed({
  get: () => lb.value[5] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].lb = 5)},
})
const lb6 = computed({
  get: () => lb.value[6] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].lb = 6)},
})
</script>

<template>
<v-container fluid>
  <v-card title="凸別状況">
    <v-card-subtitle>
      <v-switch v-model="isPassive" label="3凸優先順位" hide-details density="compact" color="primary"/>
    </v-card-subtitle>
    <v-card-text>
      <v-slide-group>
        <v-slide-group-item>
          <v-card border>
            <v-card-title class="text-center">
              未所持
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{lbN.length}}/{{allSSStyle.length}}<br />
              {{(lbN.length/allSSStyle.length*100).toFixed(2)}}%
            </v-card-subtitle>
            <v-card-text class="card-text">
              <VueDraggable v-model="lbN" group="lb" class="h-100">
                <v-list-item v-for="style in lbN" :key="style.id">
                  <template #prepend>
                    <div class="position-relative">
                      <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
                      <span v-if="isPassive" class="position-absolute bottom-0 right-0 bg-black font-weight-bold">
                    {{passiveOrder[style.id]}}
                  </span>
                    </div>
                  </template>
                </v-list-item>
              </VueDraggable>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
        <v-slide-group-item>
          <v-card border>
            <v-card-title class="text-center">
              0凸
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{lb0.length}}/{{allSSStyle.length}}<br />
              {{(lb0.length/allSSStyle.length*100).toFixed(2)}}%
            </v-card-subtitle>
            <v-card-text class="card-text">
              <VueDraggable v-model="lb0" group="lb" class="h-100">
                <v-list-item v-for="style in lb0" :key="style.id">
                  <template #prepend>
                    <div class="position-relative">
                      <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
                      <span v-if="isPassive" class="position-absolute bottom-0 right-0 bg-black font-weight-bold">
                    {{passiveOrder[style.id]}}
                  </span>
                    </div>
                  </template>
                </v-list-item>
              </VueDraggable>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
        <v-slide-group-item>
          <v-card border>
            <v-card-title class="text-center">
              1凸
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{lb1.length}}/{{allSSStyle.length}}<br />
              {{(lb1.length/allSSStyle.length*100).toFixed(2)}}%
            </v-card-subtitle>
            <v-card-text class="card-text">
              <VueDraggable v-model="lb1" group="lb" class="h-100">
                <v-list-item v-for="style in lb1" :key="style.id">
                  <template #prepend>
                    <div class="position-relative">
                      <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
                      <span v-if="isPassive" class="position-absolute bottom-0 right-0 bg-black font-weight-bold">
                    {{passiveOrder[style.id]}}
                  </span>
                    </div>
                  </template>
                </v-list-item>
              </VueDraggable>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
        <v-slide-group-item>
          <v-card border>
            <v-card-title class="text-center">
              2凸
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{lb2.length}}/{{allSSStyle.length}}<br />
              {{(lb2.length/allSSStyle.length*100).toFixed(2)}}%
            </v-card-subtitle>
            <v-card-text class="card-text">
              <VueDraggable v-model="lb2" group="lb" class="h-100">
                <v-list-item v-for="style in lb2" :key="style.id">
                  <template #prepend>
                    <div class="position-relative">
                      <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
                      <span v-if="isPassive" class="position-absolute bottom-0 right-0 bg-black font-weight-bold">
                    {{passiveOrder[style.id]}}
                  </span>
                    </div>
                  </template>
                </v-list-item>
              </VueDraggable>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
        <v-slide-group-item>
          <v-card border>
            <v-card-title class="text-center">
              2.5凸
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{lb3.length}}/{{allSSStyle.length}}<br />
              {{(lb3.length/allSSStyle.length*100).toFixed(2)}}%
            </v-card-subtitle>
            <v-card-text class="card-text">
              <VueDraggable v-model="lb3" group="lb" class="h-100">
                <v-list-item v-for="style in lb3" :key="style.id">
                  <template #prepend>
                    <div class="position-relative">
                      <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
                      <span v-if="isPassive" class="position-absolute bottom-0 right-0 bg-black font-weight-bold">
                    {{passiveOrder[style.id]}}
                  </span>
                    </div>
                  </template>
                </v-list-item>
              </VueDraggable>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
        <v-slide-group-item>
          <v-card border>
            <v-card-title class="text-center">
              3凸
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{lb4.length}}/{{allSSStyle.length}}<br />
              {{(lb4.length/allSSStyle.length*100).toFixed(2)}}%
            </v-card-subtitle>
            <v-card-text class="card-text">
              <VueDraggable v-model="lb4" group="lb" class="h-100">
                <v-list-item v-for="style in lb4" :key="style.id">
                  <template #prepend>
                    <div class="position-relative">
                      <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
                    </div>
                  </template>
                </v-list-item>
              </VueDraggable>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
        <v-slide-group-item>
          <v-card border>
            <v-card-title class="text-center">
              3.5凸
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{lb5.length}}/{{allSSStyle.length}}<br />
              {{(lb5.length/allSSStyle.length*100).toFixed(2)}}%
            </v-card-subtitle>
            <v-card-text class="card-text">
              <VueDraggable v-model="lb5" group="lb" class="h-100">
                <v-list-item v-for="style in lb5" :key="style.id">
                  <template #prepend>
                    <div class="position-relative">
                      <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
                    </div>
                  </template>
                </v-list-item>
              </VueDraggable>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
        <v-slide-group-item>
          <v-card border>
            <v-card-title class="text-center">
              4凸
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{lb6.length}}/{{allSSStyle.length}}<br />
              {{(lb6.length/allSSStyle.length*100).toFixed(2)}}%
            </v-card-subtitle>
            <v-card-text class="card-text">
              <VueDraggable v-model="lb6" group="lb" class="h-100">
                <v-list-item v-for="style in lb6" :key="style.id">
                  <template #prepend>
                    <div class="position-relative">
                      <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
                    </div>
                  </template>
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
  height: calc(100vh - 230px);
}
</style>
