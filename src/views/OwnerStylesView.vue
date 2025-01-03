<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'
import {computed } from 'vue'
import StyleSelect from '@/components/StyleSelect.vue'
import type {Style} from '@/types/style.ts'
import {useUserStore} from '@/stores/user.ts'

const masterStore = useMasterStore()
const userStore = useUserStore()
masterStore.init('styles')
const allSSStyles = computed<Style[]>(() => masterStore.mStyles.filter(s => s.tier === 'SS'))
const styleLists = computed(() => allSSStyles.value.reduce<{owner: Style[], unowned: Style[]}>((acc, style) => {
  if (userStore.lb[style.id] === undefined) {
    acc.unowned.push(style)
  } else {
    acc.owner.push(style)
  }
  return acc
}, {owner: [], unowned: []}))
</script>

<template>
  <v-container fluid>
    <v-card title="所持スタイル" class="w-100">
      <v-card-text>
        <v-row>
          <v-col v-for="style in styleLists.owner" cols="3" :key="style.id" class="p-2">
            <StyleSelect :style="style" v-model="userStore.lb[style.id]" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card title="未所持スタイル" class="w-100">
      <v-card-text>
        <v-row>
          <v-col v-for="style in styleLists.unowned" cols="3" :key="style.id" class="p-2">
            <StyleSelect :style="style" v-model="userStore.lb[style.id]" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>
