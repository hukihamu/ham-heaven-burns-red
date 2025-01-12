<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'
import {computed, ref} from 'vue'
import type {Character} from '@/types/character.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import type {TeamType} from '@/types/general.ts'

const master = useMasterStore()
master.init('characters')

const tab = ref('31A')
const teams = computed(() => master.mCharacters.reduce<{[key in TeamType]: Character[]}>((pre, cur) => {
  if (cur.team === '司令部') return pre
  if (cur.label === 'Karen') return pre
  if (!pre[cur.team]) pre[cur.team] = []
  pre[cur.team].push(cur)
  return pre
}, {} as {[key in TeamType]: Character[]}))
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
            <v-card-title class="d-flex">
              <SeraphDBImage type="character-badges" :character-label="character.label" :width="32" />
              {{character.name.match(/.+?(?= —)/)?.[0]}}
            </v-card-title>
            <v-card-text>
              オーブ
            </v-card-text>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-tabs-window-item>
  </v-tabs-window>
</v-container>
</template>

<style scoped>

</style>
