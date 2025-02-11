<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'
import {useUserStore} from '@/stores/user.ts'
import {computed} from 'vue'
import {getCharacterName} from '@/utils.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {VueDraggable} from 'vue-draggable-plus'

const master = useMasterStore()
master.init('characters')
const user = useUserStore()

const reverts = computed(() => master.mCharacters.reduce<string[][]>((acc, cur) => {
  if (cur.team === '司令部' && cur.label !== 'NNanase') return acc
  if (cur.label === 'Karen') return acc
  user.initCharacter(cur.label)
  acc[user.characters[cur.label]?.revert ?? 0].push(cur.label)
  return acc
}, [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ]))
function onChangeUserRevert(charaLabels: string[], revert: number) {
  charaLabels.forEach(charaLabel => {
    user.initCharacter(charaLabel)
    if (revert === 0) {
      user.characters[charaLabel].revert = undefined
    } else {
      user.characters[charaLabel].revert = revert
    }
  })
}
</script>

<template>
<v-card title="転生">
  <v-card-text>
    <v-slide-group>
      <v-slide-group-item v-for="(revert, index) in reverts" :key="index">
        <v-card border>
          <v-card-title class="text-center">
            <span v-if="index > 0">＋{{index}}</span>
            <span v-else>未転生</span>
          </v-card-title>
          <v-card-text class="card-size">
            <VueDraggable :model-value="revert"
                          group="revert"
                          class="h-100 d-flex flex-wrap align-content-start"
                          @update:model-value="onChangeUserRevert($event, index)">
              <div v-for="charaLabel in revert" :key="charaLabel">
                <SeraphDBImage type="character-badges" :character-label="charaLabel" :width="64" :tooltip="getCharacterName(charaLabel, master.mCharacters)"/>
              </div>
            </VueDraggable>
          </v-card-text>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-card-text>
</v-card>
</template>

<style scoped>
.card-size {
  max-width: calc(64px * 4);
  height: calc(100vh - 350px);
  overflow-y: auto;
}
</style>
