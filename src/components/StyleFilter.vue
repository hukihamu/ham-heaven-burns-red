<script setup lang="ts">
import type {ElementType, FilterModelType, RoleType, StyleType, TierType, WeaponType} from '@/types/general.ts'
import UiImg from '@/components/images/UiImg.vue'
import {useDisplay} from 'vuetify'
import {roleColor} from '@/utils.ts'

const selectModel = defineModel<FilterModelType>( {default: {}})
const tierList: TierType[] = ['SS', 'S', 'A']
const elementList: ElementType[] = ['Fire', 'Light', 'Thunder', 'Dark', 'Ice', 'Nonelement']
const roleList: RoleType[] = ['Attacker', 'Breaker', 'Debuffer', 'Buffer', 'Blaster', 'Healer', 'Defender', 'Admiral']
const weaponList: WeaponType[] = ['DoubleSword', 'Cannon', 'LargeSword', 'Gun', 'Scythe', 'Sword', 'Shield', 'Claw']
const styleTypeList: StyleType[] = ['Slash', 'Stab', 'Strike', ]
const {mdAndUp} = useDisplay()
</script>

<template>
  <v-card title="フィルター" :class="{ 'desktop': mdAndUp, 'mobile': !mdAndUp }">
    <v-card-text class="overflow-y-auto h-75">
      <v-select density="compact" multiple label="部隊" disabled></v-select>
      <v-select density="compact" multiple label="キャラクター" disabled></v-select>
      <v-select v-model="selectModel.weapon" multiple :items="weaponList" label="武器種" density="compact">
        <template #selection="{index}">
          <UiImg :weapon-type="selectModel.weapon[index]" :height="30"/>
        </template>
        <template #item="{index, props}">
          <v-list-item v-bind="props" :title="weaponList[index]">
            <template #prepend>
              <UiImg :weapon-type="weaponList[index]" :height="30"/>
            </template>
          </v-list-item>
        </template>
      </v-select>
      <v-select v-model="selectModel.tier" multiple :items="tierList" density="compact" label="レアリティ">
        <template #selection="{index}">
          <UiImg :tier="selectModel.tier[index]" :height="30"/>
        </template>
        <template #item="{index, props}">
          <v-list-item v-bind="props" title="">
            <template #prepend>
              <UiImg :tier="tierList[index]" :height="30"/>
            </template>
          </v-list-item>
        </template>
      </v-select>
      <v-select v-model="selectModel.role" multiple label="ロール" density="compact" :items="roleList" chips>
        <template #chip="{index}">
          <v-chip :text="selectModel.role[index]" variant="flat" :color="roleColor[selectModel.role[index]]"/>
        </template>
        <template #item="{index, props}">
          <v-list-item v-bind="props" title="">
            <template #prepend>
              <v-chip :text="roleList[index]" variant="flat" :color="roleColor[roleList[index]]"/>
            </template>
          </v-list-item>
        </template>
      </v-select>
      <v-select v-model="selectModel.styleType" multiple :items="styleTypeList" density="compact" label="属性" >
        <template #selection="{index}">
          <UiImg :style-type="selectModel.styleType[index]" :height="30"/>
        </template>
        <template #item="{index, props}">
          <v-list-item v-bind="props" title="">
            <template #prepend>
              <UiImg :style-type="styleTypeList[index]" :height="30"/>
            </template>
          </v-list-item>
        </template>
      </v-select>
      <v-select v-model="selectModel.element" multiple :items="elementList" density="compact" label="元素属性">
        <template #selection="{index}">
          <UiImg :element="selectModel.element[index]" :height="30"/>
        </template>
        <template #item="{index, props}">
          <v-list-item v-bind="props" title="">
            <template #prepend>
              <UiImg :element="elementList[index]" :height="30"/>
            </template>
          </v-list-item>
        </template>
      </v-select>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.mobile {
  height: 300px;
}

.desktop {
  height: calc(100vh - 100px);
}
</style>
