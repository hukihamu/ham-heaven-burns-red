<script setup lang="ts">
import {useMasterStore} from '@/stores/master.ts'

const master = useMasterStore()
master.init('characters')

</script>

<template>
<v-card title="転生（実装中）">
  <v-card-text>
    <v-slide-group>
      <v-slide-group-item>
<!--        <v-card border>-->
<!--          <v-card-title class="text-center">-->
<!--            +0-->
<!--          </v-card-title>-->
<!--          <v-card-subtitle class="text-center">-->
<!--            ctrl+click で育成済みへ移動-->
<!--          </v-card-subtitle>-->
<!--          <v-card-text class="card-size">-->
<!--            <VueDraggable v-model="skillEvolutionsN" group="skillEvolutions" class="h-100 d-flex flex-wrap align-content-start">-->
<!--              <div v-for="style in skillEvolutionsN" :key="style.id" @click.ctrl="moveTo2(style)">-->
<!--                <SeraphDBImage type="hbr" :hbr="style.image" :width="64"/>-->
<!--              </div>-->
<!--            </VueDraggable>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
      </v-slide-group-item>
    </v-slide-group>
  </v-card-text>
</v-card>
</template>

<style scoped>

</style>
