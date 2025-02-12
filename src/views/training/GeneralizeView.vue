<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import {computed} from 'vue'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {useUserStore} from '@/stores/user.ts'
import type {Style} from '@/types/style.ts'
import {VueDraggable} from 'vue-draggable-plus'

const master = useMasterStore()
master.init('styles')
const user = useUserStore()

const allGeneralize = computed(() => master.mStyles.filter(s => s.generalize && user.styles[s.id].lb !== undefined))
const generalize = computed(() => allGeneralize.value.reduce<{[id: number]: Style[]}>((pre, cur) => {
  user.initStyle(cur.id)
  const generalizeCount = user.styles[cur.id].generalize
  if (!pre[generalizeCount ?? 10]) pre[generalizeCount ?? 10] = []
  pre[generalizeCount ?? 10].push(cur)
  return pre
}, {}))
const generalizeN = computed({
  get: () => generalize.value[10] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].generalize = undefined)},
})
const generalize1 = computed({
  get: () => generalize.value[1] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].generalize = 1)},
})
const generalize2 = computed({
  get: () => generalize.value[2] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].generalize = 2)},
})

function moveTo2(style: Style) {
  user.styles[style.id].generalize = 2
}
</script>

<template>
  <v-container fluid>
    <v-card title="ジェネライズ">
      <v-card-text>
        <v-slide-group>
          <v-slide-group-item>
            <v-card border>
              <v-card-title class="text-center">
                未育成
              </v-card-title>
              <v-card-subtitle class="text-center">
                ctrl+click で育成済みへ移動
              </v-card-subtitle>
              <v-card-text class="card-size">
                <VueDraggable v-model="generalizeN" group="generalize" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="style in generalizeN" :key="style.id" @click.ctrl="moveTo2(style)">
                    <SeraphDBImage type="hbr" :hbr="style.image" :width="64" :tooltip="style.name"/>
                  </div>
                </VueDraggable>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-card border>
              <v-card-title class="text-center">
                育成中
              </v-card-title>
              <v-card-subtitle></v-card-subtitle>
              <v-card-text class="card-size">
                <VueDraggable v-model="generalize1" group="generalize" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="style in generalize1" :key="style.id">
                    <SeraphDBImage type="hbr" :hbr="style.image" :width="64" :tooltip="style.name"/>
                  </div>
                </VueDraggable>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-card border>
              <v-card-title class="text-center">
                育成済
              </v-card-title>
              <v-card-subtitle></v-card-subtitle>
              <v-card-text class="card-size">
                <VueDraggable v-model="generalize2" group="generalize" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="style in generalize2" :key="style.id">
                    <SeraphDBImage type="hbr" :hbr="style.image" :width="64" :tooltip="style.name"/>
                  </div>
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
.card-size {
  min-width: 120px;
  width: calc((100vw - 500px) / 3);
  height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
