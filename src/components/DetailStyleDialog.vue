<script setup lang="ts">
import {useViewStore} from '@/stores/view.ts'
import {ref, watch} from 'vue'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {useDisplay} from 'vuetify'
import SeraphDBVideo from '@/components/SeraphDBVideo.vue'

const display = useDisplay()
const viewStore = useViewStore()
const isShowDialog = ref(false)
const isBG = ref(false)
watch(viewStore, () => {
  isShowDialog.value = !!viewStore.detailStyle
})
</script>

<template>
<v-dialog v-model="isShowDialog" @after-leave="() => viewStore.detailStyle = undefined" :height="isBG ? '100%' :'70%'">
  <v-card v-if="viewStore.detailStyle" height="100%">
    <v-card-title class="d-flex justify-space-between">
      <div><span v-if="!isBG">{{viewStore.detailStyle.name}}</span></div>
      <v-btn variant="text" icon="mdi-fullscreen" @click="isBG = !isBG"/>
    </v-card-title>
    <v-card-subtitle v-if="!isBG">（開発中）</v-card-subtitle>
    <div v-if="!isBG" class="d-flex align-stretch h-100">
      <div>
        <v-btn block height="100%" variant="text" icon="mdi-chevron-left" disabled/>
      </div>
      <v-card-text>
        <v-radio-group label="凸状況">

        </v-radio-group>
        <v-radio-group label="宝珠">

        </v-radio-group>
        <v-radio-group label="ジェネライズ">

        </v-radio-group>
        <v-radio-group label="EXスキル進化">

        </v-radio-group>
      </v-card-text>
      <div>
        <v-btn block height="100%" variant="text" icon="mdi-chevron-right" disabled/>
      </div>
    </div>
    <template #image>
      <SeraphDBImage type="hbr"
                     :cover="!isBG"
                     :width="1920"
                     :position="isBG ? 'center' : 'top'"
                     :class="{'dark-image': !isBG}"
                     :hbr="display.mobile.value ? viewStore.detailStyle.strip : viewStore.detailStyle.bg"/>
      <SeraphDBVideo v-show="!display.mobile.value"
                     :cover="!isBG"
                     :position="isBG ? 'center' : 'top'"
                     :webm="viewStore.detailStyle.mv ?? undefined"
                     :class="{'dark-image': !isBG}"
                     class="position-absolute"/>
    </template>
  </v-card>
</v-dialog>
</template>

<style scoped>
.dark-image {
  filter: brightness(0.2);
}
</style>
