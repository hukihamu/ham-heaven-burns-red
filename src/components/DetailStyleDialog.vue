<script setup lang="ts">
import {useViewStore} from '@/stores/view.ts'
import {ref, watch} from 'vue'

const store = useViewStore()
const isShowDialog = ref(false)
watch(store, () => {
  isShowDialog.value = !!store.detailStyle
})
</script>

<template>
<v-dialog v-model="isShowDialog" @close="store.detailStyle = undefined">
  <v-card v-if="store.detailStyle" :title="store.detailStyle.name">

  </v-card>
</v-dialog>
</template>

<style scoped>

</style>
