<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

const master = useMasterStore()
master.init('styles')

// 初出ガチャ終了日+92日後の翌月1日 開始日+18でおおよそ終了日
function dateToClassName(dateString: string): string {
  const date = new Date(dateString)
  date.setDate(date.getDate() + 110)
  date.setHours(0, 0, 0, 0)
  const nowMonth = new Date()
  nowMonth.setDate(1)
  nowMonth.setHours(0, 0, 0, 0)
  const nextMonth = new Date()
  nextMonth.setDate(1)
  nextMonth.setHours(0, 0, 0, 0)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  if (date.getTime() < nowMonth.getTime()) {
    return ''
  } else if (date.getTime() < nextMonth.getTime()) {
    return 'text-warning'
  } else {
    return 'text-secondary'
  }
}
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
            <span :class="dateToClassName(style.raw.in_date)">
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
