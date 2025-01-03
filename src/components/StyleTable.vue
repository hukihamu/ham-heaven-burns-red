<script setup lang="ts">
import type {Style} from '@/types/style.ts'
import StyleImg from '@/components/images/StyleImg.vue'
import {computed, ref} from 'vue'
import UiImg from '@/components/images/UiImg.vue'
import {roleColor} from '@/utils.ts'
import {useViewStore} from '@/stores/view.ts'
import {useDisplay} from 'vuetify'
import type {FilterModelType} from '@/types/general.ts'

const {styles, filters} = defineProps<{
  styles: Style[]
  filters: FilterModelType
}>()
const store = useViewStore()
const headers = [
  { title: '', key: 'image', sortable: false },
  { title: 'キャラ', key: 'id', align: 'center' },
  { title: '武器', key: 'weapon', align: 'center' },
  { title: 'レア', key: 'tier', align: 'center' },
  { title: 'ロール', key: 'role', align: 'center' },
  { title: '属性', key: 'type', align: 'center' },
  { title: '元素', key: 'elements', align: 'center' },
  { title: '宝珠', key: 'growth_abi', align: 'center' },
  { title: '実装日', key: 'in_date' },
]
const sortBy = ref<{key: string, order?: 'asc' | 'desc'}[]>([])
const page = ref(1)
const {mdAndUp} = useDisplay()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onFilter(_1: string, _2: string, item: any): boolean {
  const style = item.raw as Style
  let flag = true
  flag = filters.tier.length > 0 ? flag && filters.tier.includes(style.tier) : flag
  flag = filters.element.length > 0 ? flag && (style.elements.length === 0 && filters.element.includes('Nonelement') || style.elements.some(element => filters.element.includes(element))) : flag
  flag = filters.role.length > 0 ? flag && filters.role.includes(style.role) : flag

  return flag
}
const threeMonthAgo = new Date()
threeMonthAgo.setDate(-110)
threeMonthAgo.setHours(23, 59, 59, 0)
</script>

<template>
  <v-data-table v-model:sort-by="sortBy"
                v-model:page="page"
                :class="{ 'desktop': mdAndUp, 'mobile': !mdAndUp }"
                :items="styles"
                :headers="headers as any"
                :loading="!styles.length"
                fixed-header
                fixed-footer
                hover
                mobile-breakpoint="md"
                items-per-page="30"
                select-strategy="single"
                hide-default-footer
                :search="JSON.stringify(filters)"
                :custom-filter="onFilter"
                filter-keys="id"
                multi-sort>
    <template #item="{props, item}">
      <v-data-table-row v-bind="props" class="styles-table-row" @click="store.detailStyle = item">
        <template #[`item.image`]>
          <StyleImg type="select" :style="item" :height="50"/>
        </template>
        <template #[`item.id`]>
          <StyleImg type="b" :style="item" :height="50"/>
        </template>
        <template #[`item.weapon`]>
          <StyleImg type="weapon" :style="item" :height="50"/>
        </template>
        <template #[`item.tier`]>
          <UiImg :tier="item.tier" :height="50"/>
        </template>
        <template #[`item.role`]>
          <v-chip :text="item.role" :color="roleColor[item.role]" variant="flat"/>
        </template>
        <template #[`item.type`]>
          <UiImg :styleType="item.type" :height="50"/>
        </template>
        <template #[`item.elements`]>
          <div class="d-flex flex-row" v-if="item.elements.length > 0">
            <UiImg v-for="(element, index) in item.elements" :element="element" :height="50" :key="index"/>
          </div>
          <div v-else class="d-flex">
            <UiImg element="Nonelement" :height="50"/>
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #[`item.type`]>
          <UiImg :styleType="item.type" :height="50"/>
        </template>
        <template #[`item.growth_abi`]>
          <UiImg :growth-abi-type="item.growth_abi?.l" :alt="item.growth_abi?.n" :height="50"/>
        </template>
        <template #[`item.in_date`]>
          <span :class="{'text-primary': new Date(item.in_date).getTime() > threeMonthAgo.getTime() }">
            {{ new Date(item.in_date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
          </span>
        </template>
      </v-data-table-row>
    </template>
    <template #bottom="{pageCount}">
      <v-pagination v-model="page" :length="pageCount" />
    </template>
  </v-data-table>
</template>

<style scoped>

.desktop {
  height: calc(100vh - 100px);
}
.mobile {
  height: calc(100vh - 400px);
}
</style>
