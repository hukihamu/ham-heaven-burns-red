<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import {ref} from 'vue'
import StyleFilter from '@/components/StyleFilter.vue'
import StyleTable from '@/components/StyleTable.vue'
import type {FilterModelType} from '@/types/general.ts'

const masterStore = useMasterStore()
const filters = ref<FilterModelType>({element: [], tier: [], role: []})
masterStore.init('styles')

</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3">
        <StyleFilter v-model="filters" :styles="masterStore.mStyles"/>
      </v-col>
      <v-col cols="12" md="9" class="position-relative">
        <StyleTable :styles="masterStore.mStyles" :filters="filters" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
