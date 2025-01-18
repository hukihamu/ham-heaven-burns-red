<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'
import {useUserStore} from '@/stores/user.ts'

const master = useMasterStore()
master.init('characters')
const user = useUserStore()
</script>

<template>
  <v-container fluid>
    開発中
  </v-container>
</template>

<style scoped>

</style>
