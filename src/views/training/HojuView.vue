<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'
import {useUserStore} from '@/stores/user.ts'
import {computed} from 'vue'
import type {Style} from '@/types/style.ts'
import {VueDraggable} from 'vue-draggable-plus'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

const master = useMasterStore()
master.init('styles')
const user = useUserStore()
const allSSStyle = computed(() => master.mStyles.filter(it => (it.tier === 'SS' && user.styles[it.id]?.lb !== undefined) || it.tier === 'S'))
const hoju = computed(() => allSSStyle.value.reduce<{[id: number]: Style[]}>((pre, cur) => {
  user.initStyle(cur.id)
  const hojuCount = user.styles[cur.id].hoju
  if (!pre[hojuCount ?? 10]) pre[hojuCount ?? 10] = []
  pre[hojuCount ?? 10].push(cur)
  return pre
}, {}))
const hojuN = computed({
  get: () => hoju.value[10] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].hoju = undefined)},
})
const hoju1 = computed({
  get: () => hoju.value[1] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].hoju = 1)},
})
const hoju2 = computed({
  get: () => hoju.value[2] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].hoju = 2)},
})
function moveTo2(style: Style) {
  user.styles[style.id].hoju = 2
}
</script>

<template>
<v-container fluid>
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
          <VueDraggable v-model="hojuN" group="hoju" class="h-100 d-flex flex-wrap align-content-start">
            <div v-for="style in hojuN" :key="style.id" @click.ctrl="moveTo2(style)">
              <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
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
        <v-card-text class="card-size">
          <VueDraggable v-model="hoju1" group="hoju" class="h-100 d-flex flex-wrap align-content-start">
            <div v-for="style in hoju1" :key="style.id">
              <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
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
        <v-card-text class="card-size">
          <VueDraggable v-model="hoju2" group="hoju" class="h-100 d-flex flex-wrap align-content-start">
            <div v-for="style in hoju2" :key="style.id">
              <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>
            </div>
          </VueDraggable>
        </v-card-text>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>
</v-container>
</template>

<style scoped>
.card-size {
  max-width: calc(64px * 10);
  height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
