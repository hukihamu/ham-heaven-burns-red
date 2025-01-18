<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'
import {computed, ref} from 'vue'
import type {Character} from '@/types/character.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import type {TeamType} from '@/types/general.ts'
import {useUserStore} from '@/stores/user.ts'

const master = useMasterStore()
master.init('characters', 'accessories')
const user = useUserStore()

const tab = ref('31A')
const teams = computed(() => master.mCharacters.reduce<{[key in TeamType]: Character[]}>((pre, cur) => {
  if (cur.team === '司令部') return pre
  if (cur.label === 'Karen') return pre
  if (!pre[cur.team]) pre[cur.team] = []
  pre[cur.team].push(cur)
  return pre
}, {} as {[key in TeamType]: Character[]}))

type Orb = { label: string, name: string, skillName: string, skillDesc: string, image: string, }
const orbs = computed<Orb[]>(() => master.mAccessories
  .filter(it => it.label.match('Acc.Orb'))
  .map(it => ({label: it.label, name: it.name, skillName: it.skill[0]?.name, skillDesc: it.skill[0]?.desc, image: it.image})))
function getOrbTraining(orb: Orb, character: Character): string {
  switch (user.orbs[character.label]?.[orb.label]) {
    case 1:
      return '育成済'
    case 0:
      return '育成中'
    default:
      return '未育成'
  }
}
function getOrbOpacity(orb: Orb, character: Character): {opacity: number} {
  switch (user.orbs[character.label]?.[orb.label]) {
    case 1:
      return {opacity: 1}
    case 0:
      return {opacity: 0.5}
    default:
      return {opacity: 0.2}
  }
}
function countOrb(orb: Orb, character: Character, isUp: boolean) {
  if (!user.orbs[character.label]) user.orbs[character.label] = {}
  if (user.orbs[character.label][orb.label] === undefined) {
    user.orbs[character.label][orb.label] = isUp ? 0 : undefined
  } else if (user.orbs[character.label][orb.label] === 0) {
    user.orbs[character.label][orb.label] = isUp ? 1 : undefined
  } else if (user.orbs[character.label][orb.label] === 1) {
    user.orbs[character.label][orb.label] = isUp ? 1 : 0
  }
}
function getCountOrb(label: string): number {
  return Object.values(user.orbs[label]).filter(it => it === 1).length
}
</script>

<template>
<v-container fluid>
  <v-tabs v-model="tab">
    <v-tab v-for="team in Object.keys(teams) as TeamType[]" :key="team" :text="team" :value="team">
      <template #prepend>
        <SeraphDBImage type="team" :team="team" :width="32" />
      </template>
    </v-tab>
  </v-tabs>
  <v-tabs-window v-model="tab">
    <v-tabs-window-item v-for="team in Object.keys(teams) as TeamType[]" :key="team" :value="team">
      <v-slide-group>
        <v-slide-group-item v-for="character in teams[team]" :key="character.id" :value="character.id">
          <v-card>
            <template #title>
              <div class="d-flex">
                <SeraphDBImage type="character-badges" :character-label="character.label" :width="64" class="flex-grow-0" />
                <div>
                  <v-card-title>
                    {{character.name.match(/.+?(?= —)/)?.[0]}}
                  </v-card-title>
                  <v-card-subtitle>
                    {{getCountOrb(character.label)}}/{{orbs.length}} {{(getCountOrb(character.label)/orbs.length*100).toFixed(2)}}%
                  </v-card-subtitle>
                </div>
              </div>

            </template>
            <v-card-text>
              <v-row>
                <v-data-iterator :items="orbs" items-per-page="-1">
                  <template #default="{items}">
                    <v-list>
                      <v-list-item v-for="orb in items" :key="orb.raw.label">
                        <v-list-item-title class="rem-08">
                          {{orb.raw.skillName}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="subtitle rem-07">
                          {{orb.raw.skillDesc}}
                        </v-list-item-subtitle>
                        <template #append>
                          <div class="d-flex">
                            <v-hover>
                              <template #default="{ props, isHovering }">
                                <SeraphDBImage v-bind="props" type="allow" allow="Down" :style="{ opacity: isHovering ? 1 : 0.5 }" :width="32" @click="countOrb(orb.raw, character, false)" />
                              </template>
                            </v-hover>
                            <v-tooltip location="top" :text="getOrbTraining(orb.raw, character)">
                              <template #activator="{ props }">
                                <SeraphDBImage v-bind="props" type="hbr" :hbr="orb.raw.image" :width="32" :style="getOrbOpacity(orb.raw, character)" />
                              </template>
                            </v-tooltip>
                            <v-hover>
                              <template #default="{ props, isHovering }">
                                <SeraphDBImage v-bind="props" type="allow" allow="Up" :style="{ opacity: isHovering ? 1 : 0.5 }" :width="32" @click="countOrb(orb.raw, character, true)" />
                              </template>
                            </v-hover>
                          </div>
                        </template>
                      </v-list-item>
                    </v-list>
                  </template>
                </v-data-iterator>
              </v-row>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-tabs-window-item>
  </v-tabs-window>
</v-container>
</template>

<style scoped>
.subtitle {
  height: 32px;
  white-space: pre;
  -webkit-line-clamp: 2;
}
.rem-08 {
  font-size: 0.8rem;
}
.rem-07 {
  font-size: 0.7rem;
}
</style>
