<script setup lang="ts">
import {useViewStore} from '@/stores/view.ts'
import {ref, watch} from 'vue'
import StyleImg from '@/components/images/StyleImg.vue'

const viewStore = useViewStore()
const isShowDialog = ref(false)
watch(viewStore, () => {
  isShowDialog.value = !!viewStore.detailStyle
})
</script>

<template>
<v-dialog v-model="isShowDialog" @after-leave="viewStore.detailStyle = undefined">
  <v-card v-if="viewStore.detailStyle" :title="viewStore.detailStyle?.name">
    <StyleImg type="party" :style="viewStore.detailStyle"/>
  </v-card>
</v-dialog>
</template>

<style scoped>

</style>
