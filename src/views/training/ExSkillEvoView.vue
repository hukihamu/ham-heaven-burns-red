<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import {computed} from 'vue'
import type {Style} from '@/types/style.ts'
import {useUserStore} from '@/stores/user.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {VueDraggable} from 'vue-draggable-plus'
const master = useMasterStore()
master.init('styles')
const user = useUserStore()

const items = computed(() => master.mStyles
  .filter(s => !!s.ability_tree.find(t => !!t.ability_list.find(l => l.type === 'SkillEvolution'))))

const skillEvolutions = computed(() => items.value.reduce<{[id: number]: Style[]}>((pre, cur) => {
  user.initStyle(cur.id)
  const exSkillEvoCount = user.styles[cur.id].exSkillEvo
  if (!pre[exSkillEvoCount ?? 10]) pre[exSkillEvoCount ?? 10] = []
  pre[exSkillEvoCount ?? 10].push(cur)
  return pre
},{}))

const skillEvolutionsN = computed({
  get: () => skillEvolutions.value[10] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].exSkillEvo = undefined)},
})
const skillEvolutions1 = computed({
  get: () => skillEvolutions.value[1] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].exSkillEvo = 1)},
})
const skillEvolutions2 = computed({
  get: () => skillEvolutions.value[2] ?? [],
  set: newValue => {newValue.forEach(it => user.styles[it.id].exSkillEvo = 2)},
})

function moveTo2(style: Style) {
  user.styles[style.id].exSkillEvo = 2
}
</script>

<template>
  <v-container fluid>
    <v-card title="EXスキル進化">
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
                <VueDraggable v-model="skillEvolutionsN" group="skillEvolutions" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="style in skillEvolutionsN" :key="style.id" @click.ctrl="moveTo2(style)">
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
              <v-card-text class="card-size">
                <VueDraggable v-model="skillEvolutions1" group="skillEvolutions" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="style in skillEvolutions1" :key="style.id">
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
              <v-card-text class="card-size">
                <VueDraggable v-model="skillEvolutions2" group="skillEvolutions" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="style in skillEvolutions2" :key="style.id">
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
  height: calc(100vh - 240px);
  overflow-y: auto;
}
</style>
