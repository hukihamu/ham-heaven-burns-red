<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import {computed} from 'vue'
import {useUserStore} from '@/stores/user.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {VueDraggable} from 'vue-draggable-plus'
import {getCharacterName} from '@/utils.ts'
const master = useMasterStore()
master.init('latest', 'characters')
const user = useUserStore()

const masterSkills = computed(() => [...master.mLatest.mSkills.ls]
  .sort((a, b) => (master.mCharacters.find(it => it.label === a.label)?.id ?? 0) > (master.mCharacters.find(it => it.label === b.label)?.id ?? 0) ? 1 : -1)
  .reduce<{[id: number]: string[]}>((pre, cur) => {
    user.initCharacter(cur.label)
    const masterSkillCount = user.characters[cur.label].masterSkill
    if (!pre[masterSkillCount ?? 10]) pre[masterSkillCount ?? 10] = []
    pre[masterSkillCount ?? 10].push(cur.label)
    return pre
},{}))

const masterSkillsN = computed({
  get: () => masterSkills.value[10] ?? [],
  set: newValue => {newValue.forEach(it => user.characters[it].masterSkill = undefined)},
})
const masterSkills1 = computed({
  get: () => masterSkills.value[1] ?? [],
  set: newValue => {newValue.forEach(it => user.characters[it].masterSkill = 1)},
})
const masterSkills2 = computed({
  get: () => masterSkills.value[2] ?? [],
  set: newValue => {newValue.forEach(it => user.characters[it].masterSkill = 2)},
})

function moveTo2(label: string) {
  user.characters[label].masterSkill = 2
}
</script>

<template>
  <v-container fluid>
    <v-card title="マスタースキル">
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
                <VueDraggable v-model="masterSkillsN" group="skillEvolutions" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="c in masterSkillsN" :key="c" @click.ctrl="moveTo2(c)">
                    <SeraphDBImage type="character-badges" :character-label="c" :width="64" :tooltip="getCharacterName(c, master.mCharacters)"/>
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
                <VueDraggable v-model="masterSkills1" group="skillEvolutions" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="c in masterSkills1" :key="c">
                    <SeraphDBImage type="character-badges" :character-label="c" :width="64" :tooltip="getCharacterName(c, master.mCharacters)"/>
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
                <VueDraggable v-model="masterSkills2" group="skillEvolutions" class="h-100 d-flex flex-wrap align-content-start">
                  <div v-for="c in masterSkills2" :key="c">
                    <SeraphDBImage type="character-badges" :character-label="c" :width="64" :tooltip="getCharacterName(c, master.mCharacters)"/>
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
