<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

const master = useMasterStore()
master.init('styles')

const threeMonthAgo = new Date()
threeMonthAgo.setDate(-110)
threeMonthAgo.setHours(23, 59, 59, 0)
</script>

<template>
<v-container fluid>
  <v-data-iterator :items="master.mStyles" items-per-page="-1" filter-keys="tier" search="SS" :sort-by="[{ key: 'in_date', order: 'desc'}]">
    <template #default="{items}">
      <v-list>
        <v-list-item v-for="style in items" :key="style.raw.id" :title="style.raw.name">
          <template #prepend>
            <SeraphDBImage type="select" :bg="style.raw.bg" :height="80"/>
          </template>
          <template #append>
            <span :class="{'text-secondary': new Date(style.raw.in_date).getTime() > threeMonthAgo.getTime() }">
            {{ new Date(style.raw.in_date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
          </span>
          </template>
        </v-list-item>
      </v-list>
    </template>
  </v-data-iterator>
</v-container>
</template>

<style scoped>

</style>
