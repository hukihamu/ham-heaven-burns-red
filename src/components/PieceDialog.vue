<script setup lang="ts">
import {computed, ref} from 'vue'
import type {Style} from '@/types/style.ts'
import {useMasterStore} from '@/stores/master.ts'
import {useUserStore} from '@/stores/user.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

const isShowDialog = ref(false)
const master = useMasterStore()
master.init('styles')
const user = useUserStore()
const allSSStyle = computed(() => master.mStyles.filter(it => it.tier === 'SS'))


const lb = computed(() => allSSStyle.value.reduce<Style[]>((pre, cur) => {
  user.initStyle(cur.id)
  const pieceLB = [3, 5]
  if (pieceLB.includes(user.styles[cur.id].lb ?? 0)) {
    pre.push(cur)
  }
  return pre
}, []))
</script>

<template>
<v-dialog v-model="isShowDialog" max-width="370">
  <v-card title="余剰ピース">
    <v-card-text>
      <div class="d-flex flex-wrap">
        <div v-for="style in lb" :key="style.id">
          <SeraphDBImage type="hbr" :hbr="style.piece.image" :width="64" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</v-dialog>
</template>

<style scoped>

</style>
