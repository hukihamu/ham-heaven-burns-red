<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'
import {ref, watch} from 'vue'
import DetailStyleDialog from '@/components/DetailStyleDialog.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import {useDisplay} from 'vuetify'

const {mobile} = useDisplay()
const {currentRoute} = useRouter()
const isDrawer = ref(true)
watch(currentRoute, () => {
  if (currentRoute.value.path === '/') isDrawer.value = true
}, {deep: true, immediate: true})
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon v-show="mobile && currentRoute.path !== '/'" @click="isDrawer = !isDrawer" />
      <v-app-bar-title class="select-none" text="Ham HeavenBurnsRed" />
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <NavigationDrawer v-model="isDrawer"/>
    <DetailStyleDialog />
  </v-app>
</template>

<style scoped>
.select-none {
  user-select: none;
}
</style>
