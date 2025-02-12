<script setup lang="ts">
import {useViewStore} from '@/stores/view.ts'
import {computed, ref, watch} from 'vue'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {useDisplay} from 'vuetify'
import SeraphDBVideo from '@/components/SeraphDBVideo.vue'
import {useUserStore} from '@/stores/user.ts'

const display = useDisplay()
const user =useUserStore()
const view = useViewStore()
const isShowDialog = ref(false)
const isBG = ref(false)

const lb = computed({
  get: () => view.detailStyle ? user.styles[view.detailStyle.id].lb ?? 10 : undefined,
  set: newValue => {
    if (view.detailStyle) user.styles[view.detailStyle.id].lb = newValue === 10 ? undefined : newValue
  }
})
const hoju = computed({
  get: () => view.detailStyle ? user.styles[view.detailStyle.id].hoju ?? 10 : undefined,
  set: newValue => {
    if (view.detailStyle) user.styles[view.detailStyle.id].hoju = newValue === 10 ? undefined : newValue
  }
})
const generalize = computed({
  get: () => view.detailStyle ? user.styles[view.detailStyle.id].generalize ?? 10 : undefined,
  set: newValue => {
    if (view.detailStyle) user.styles[view.detailStyle.id].generalize = newValue === 10 ? undefined : newValue
  }
})
const exSkillEvo = computed({
  get: () => view.detailStyle ? user.styles[view.detailStyle.id].exSkillEvo ?? 10 : undefined,
  set: newValue => {
    if (view.detailStyle) user.styles[view.detailStyle.id].exSkillEvo = newValue === 10 ? undefined : newValue
  }
})

watch(view, () => {
  isShowDialog.value = !!view.detailStyle
  if (view.detailStyle) {
    user.initStyle(view.detailStyle.id)
  }
})
function onAfterLeave() {
  view.detailStyle = undefined
  view.getPrevStyle = undefined
  view.getNextStyle = undefined
}

</script>

<template>
<v-dialog v-model="isShowDialog" @after-leave="onAfterLeave" :height="isBG ? '100%' :'70%'">
  <v-card v-if="view.detailStyle" height="100%">
    <v-card-title class="d-flex justify-space-between">
      <div><span v-if="!isBG">{{ view.detailStyle.name }}</span></div>
      <v-btn variant="text" prepend-icon="mdi-fullscreen" @click="isBG = !isBG"/>
    </v-card-title>
    <v-card-subtitle v-if="!isBG">（開発中）</v-card-subtitle>
    <div v-if="!isBG" class="d-flex align-stretch h-100">
      <div>
        <v-btn :disabled="!view.getPrevStyle"
               block
               height="100%"
               variant="text"
               icon="mdi-chevron-left"
               rounded="0"
               @click="view.getPrevStyle"/>
      </div>
      <v-card-text>
        <v-radio-group label="凸状況" inline v-model="lb" width="100%" color="secondary">
          <v-radio label="未所持" :value="10"/>
          <v-radio label="  0凸" :value="0"/>
          <v-radio label="  1凸" :value="1"/>
          <v-radio label="  2凸" :value="2"/>
          <v-radio label="2.5凸" :value="3"/>
          <v-radio label="  3凸" :value="4"/>
          <v-radio label="3.5凸" :value="5"/>
          <v-radio label="  4凸" :value="6"/>
        </v-radio-group>
        <v-radio-group label="宝珠" inline v-model="hoju" width="100%" color="secondary">
          <v-radio label="未育成" :value="10" />
          <v-radio label="育成中" :value="1"/>
          <v-radio label="育成済" :value="2"/>
        </v-radio-group>
        <v-radio-group v-show="view.detailStyle.generalize" label="ジェネライズ" inline v-model="generalize" width="100%" color="secondary">
          <v-radio label="未育成" :value="10" />
          <v-radio label="育成中" :value="1"/>
          <v-radio label="育成済" :value="2"/>
        </v-radio-group>
        <v-radio-group v-show="!!view.detailStyle.ability_tree.find(t => !!t.ability_list.find(l => l.type === 'SkillEvolution'))"
                       label="EXスキル進化" inline v-model="exSkillEvo" width="100%" color="secondary">
          <v-radio label="未育成" :value="10" />
          <v-radio label="育成中" :value="1"/>
          <v-radio label="育成済" :value="2"/>
        </v-radio-group>
      </v-card-text>
      <div>
        <v-btn :disabled="!view.getNextStyle"
               rounded="0"
               block
               height="100%"
               variant="text"
               icon="mdi-chevron-right"
               @click="view.getNextStyle"/>
      </div>
    </div>
    <template #image>
      <SeraphDBImage type="hbr"
                     :cover="!isBG"
                     :width="1920"
                     :position="isBG ? 'center' : 'top'"
                     :class="{'dark-image': !isBG}"
                     :hbr="display.mobile.value ? view.detailStyle.strip : view.detailStyle.bg"/>
      <SeraphDBVideo v-show="!display.mobile.value"
                     :cover="!isBG"
                     :position="isBG ? 'center' : 'top'"
                     :webm="view.detailStyle.mv ?? undefined"
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
