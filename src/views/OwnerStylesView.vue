<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'
import {computed} from 'vue'
import StyleSelect from '@/components/StyleSelect.vue'
import type {Style} from '@/types/style.ts'
import {useUserStore} from '@/stores/user.ts'

const masterStore = useMasterStore()
const userStore = useUserStore()
masterStore.init('styles')
const allSSStyles = computed<Style[]>(() => masterStore.mStyles.filter(s => s.tier === 'SS'))
const styleLists = computed(() => allSSStyles.value.reduce<{ owner: Style[], unowned: Style[] }>((acc, style) => {
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
        <v-data-iterator :items="styleLists.owner" items-per-page="-1">
          <template #default="{items}">
            <v-row no-gutters>
              <v-col v-for="style in items" cols="6" md="3" :key="style.raw.id" class="pa-1 min-height">
                <StyleSelect :style="style.raw" v-model="userStore.lb[style.raw.id]"/>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-card-text>
    </v-card>
    <v-divider class="my-2"/>
    <v-card title="未所持スタイル" class="w-100">
      <v-card-text>
        <v-data-iterator :items="styleLists.unowned" items-per-page="-1">
          <template #default="{items}">
            <v-row no-gutters class="p-1">
              <v-col v-for="style in items" cols="6" md="3" :key="style.raw.id" class="pa-1 min-height">
                <StyleSelect :style="style.raw" v-model="userStore.lb[style.raw.id]"/>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.min-height {
  min-height: 80px;
}
</style>
