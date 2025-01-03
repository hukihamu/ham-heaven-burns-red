<script setup lang="ts">
import { RouterView } from 'vue-router'
import {ref} from 'vue'
import DetailStyleDialog from '@/components/DetailStyleDialog.vue'

const tab = ref<string>('')
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title class="select-none">Ham HeavenBurnsRed</v-app-bar-title>
      <v-tabs v-model="tab" color="primary">
        <v-tab value="styles" to="/styles" text="スタイル一覧"/>
        <v-tab value="story" to="/story" text="ストーリー" />
        <v-tab value="owner-styles" to="/owner-styles" text="所持SSスタイル" />
        <v-tab value="training" to="/training" text="育成状況" />
      </v-tabs>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <DetailStyleDialog />
  </v-app>
</template>

<style scoped>
.select-none {
  user-select: none;
}
</style>
