<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import {useMasterStore} from '@/stores/master.ts'
import {useUserStore} from '@/stores/user.ts'
import {computed} from 'vue'
import type {Style} from '@/types/style.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

const master = useMasterStore()
master.init('styles')
const user = useUserStore()
const lb = computed(() => master.mStyles.filter(it => it.tier === 'SS').reduce<{[id: number]: Style[]}>((pre, cur) => {
  const lbCount = user.lb[cur.id]
  if (!pre[lbCount ?? 10]) pre[lbCount ?? 10] = []
  pre[lbCount ?? 10].push(cur)
  return pre
}, {}))

const lbN = computed({
  get: () => lb.value[10],
  set: newValue => {newValue.forEach(it => user.lb[it.id] = undefined)}
})
const lb0 = computed({
  get: () => lb.value[0],
  set: newValue => {newValue.forEach(it => user.lb[it.id] = 0)}
})
const lb1 = computed({
  get: () => lb.value[1],
  set: newValue => {newValue.forEach(it => user.lb[it.id] = 1)}
})
const lb2 = computed({
  get: () => lb.value[2],
  set: newValue => {newValue.forEach(it => user.lb[it.id] = 2)}
})
const lb3 = computed({
  get: () => lb.value[3],
  set: newValue => {newValue.forEach(it => user.lb[it.id] = 3)}
})
const lb4 = computed({
  get: () => lb.value[4],
  set: newValue => {newValue.forEach(it => user.lb[it.id] = 4)}
})
const lb5 = computed({
  get: () => lb.value[5],
  set: newValue => {newValue.forEach(it => user.lb[it.id] = 5)}
})
const lb6 = computed({
  get: () => lb.value[6],
  set: newValue => {newValue.forEach(it => user.lb[it.id] = 6)}
})
</script>

<template>
<v-container fluid>
  <v-slide-group>
    <v-slide-group-item>
      <v-card title="未取得">
        <v-card-text>
          <VueDraggable v-model="lbN" group="lb">
            <v-list-item v-for="style in lbN" :key="style.id">
              <template #prepend>
                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-card title="0凸">
        <v-card-text>
          <VueDraggable v-model="lb0" group="lb">
            <v-list-item v-for="style in lb0" :key="style.id">
              <template #prepend>
                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-card title="1凸">
        <v-card-text>
          <VueDraggable v-model="lb1" group="lb">
            <v-list-item v-for="style in lb1" :key="style.id">
              <template #prepend>
                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-card title="2凸">
        <v-card-text>
          <VueDraggable v-model="lb2" group="lb">
            <v-list-item v-for="style in lb2" :key="style.id">
              <template #prepend>
                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-card title="2.5凸">
        <v-card-text>
          <VueDraggable v-model="lb3" group="lb">
            <v-list-item v-for="style in lb3" :key="style.id">
              <template #prepend>
                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-card title="3凸">
        <v-card-text>
          <VueDraggable v-model="lb4" group="lb">
            <v-list-item v-for="style in lb4" :key="style.id">
              <template #prepend>
                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-card title="3.5凸">
        <v-card-text>
          <VueDraggable v-model="lb5" group="lb">
            <v-list-item v-for="style in lb5" :key="style.id">
              <template #prepend>
                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-card title="4凸">
        <v-card-text>
          <VueDraggable v-model="lb6" group="lb">
            <v-list-item v-for="style in lb6" :key="style.id">
              <template #prepend>
                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>
</v-container>
</template>

<style scoped>

</style>
