<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'
import {useUserStore} from '@/stores/user.ts'
import {computed, ref} from 'vue'
import type {Accessory} from '@/types/accessory.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {VueDraggable} from 'vue-draggable-plus'

const master = useMasterStore()
master.init('characters', 'accessories')
const user = useUserStore()
const tab1 = ref(0)
const tab2 = ref(0)

const orbs = computed(() => master.mAccessories
  .filter(it => it.label.match('Acc.Orb')).reduce<{[location: string]: Accessory[]}>((acc, cur) => {
    if (!acc[cur.location]) acc[cur.location] = []
    acc[cur.location].push(cur)
    return acc
  }, {}))
const userOrbs = computed(() =>
  master.mCharacters.reduce<{ [orbLabel: string]: string[][]}>((acc, cur) => {
    if (cur.team === '司令部' && cur.label !== 'NNanase') return acc
    if (cur.label === 'Karen') return acc
    user.initCharacter(cur.label)
    if (!user.characters[cur.label].orbs) user.characters[cur.label].orbs = {}
    const character = user.characters[cur.label]
    Object.values(orbs.value).forEach(locations => {
      locations.forEach(orb => {
        if (!acc[orb.label]) acc[orb.label] = []
        if (!acc[orb.label][10]) acc[orb.label][10] = []
        if (!acc[orb.label][0]) acc[orb.label][0] = []
        if (!acc[orb.label][1]) acc[orb.label][1] = []
        acc[orb.label][character.orbs?.[orb.label] ?? 10].push(cur.label)
      })
    })
    return acc
  }, {}))
function onChangeUserOrb(charaLabels: string[], orbLabel: string, orbLevel: number) {
  charaLabels.forEach(charaLabel => {
    user.initCharacter(charaLabel)
    const temp = user.characters[charaLabel].orbs ?? {}
    temp[orbLabel] = orbLevel
    user.characters[charaLabel].orbs = temp
  })
}
</script>

<template>
  <v-container fluid>
    <v-tabs v-model="tab1">
      <v-tab v-for="location in Object.keys(orbs)" :key="location" :text="location" />
    </v-tabs>
    <v-tabs-window v-model="tab1">
      <v-tabs-window-item v-for="location in Object.keys(orbs)" :key="location" :value="location">
        <v-tabs v-model="tab2">
          <v-tab v-for="orb in orbs[location]" :key="orb.id" :text="orb.name">
            <template #prepend>
              <SeraphDBImage type="hbr" :hbr="orb.image" :width="32" />
            </template>
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab2">
          <v-tabs-window-item v-for="orb in orbs[location]" :key="orb.id" :value="orb.id">
            <v-card :title="orb.skill[0].name" :subtitle="orb.skill[0].desc">
              <v-card-text>
                <v-slide-group>
                  <v-slide-group-item>
                    <v-card border>
                      <v-card-title class="text-center">未育成</v-card-title>
                      <v-card-text class="card-size">
                        <VueDraggable :model-value="userOrbs[orb.label][10]"
                                      :group="orb.label"
                                      class="h-100 d-flex flex-wrap align-content-start"
                                      @update:model-value="onChangeUserOrb($event, orb.label, 10)">
                          <div v-for="(charaLabel) in userOrbs[orb.label][10]" :key="charaLabel">
                            <SeraphDBImage type="character-badges" :character-label="charaLabel" :width="64" />
                          </div>
                        </VueDraggable>
                      </v-card-text>
                    </v-card>
                  </v-slide-group-item>
                  <v-slide-group-item>
                    <v-card border>
                      <v-card-title class="text-center">育成中</v-card-title>
                      <v-card-text class="card-size">
                        <VueDraggable :model-value="userOrbs[orb.label][0]" :group="orb.label" class="h-100 d-flex flex-wrap align-content-start" @update:model-value="onChangeUserOrb($event, orb.label, 0)">
                          <div v-for="(charaLabel) in userOrbs[orb.label][0]" :key="charaLabel">
                            <SeraphDBImage type="character-badges" :character-label="charaLabel" :width="64" />
                          </div>
                        </VueDraggable>
                      </v-card-text>
                    </v-card>
                  </v-slide-group-item>
                  <v-slide-group-item>
                    <v-card border>
                      <v-card-title class="text-center">育成済</v-card-title>
                      <v-card-text class="card-size">
                        <VueDraggable :model-value="userOrbs[orb.label][1]" :group="orb.label" class="h-100 d-flex flex-wrap align-content-start" @update:model-value="onChangeUserOrb($event, orb.label, 1)">
                          <div v-for="(charaLabel) in userOrbs[orb.label][1]" :key="charaLabel">
                            <SeraphDBImage type="character-badges" :character-label="charaLabel" :width="64" />
                          </div>
                        </VueDraggable>
                      </v-card-text>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<style scoped>
.card-size {
  max-width: calc(64px * 10);
  height: calc(100vh - 350px);
  overflow-y: auto;
}
</style>
