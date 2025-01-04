<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import {computed, ref} from 'vue'
import UiImg from '@/components/images/UiImg.vue'
import CharacterImg from '@/components/images/CharacterImg.vue'
import type {Card} from '@/types/character.ts'
import {useUserStore} from '@/stores/user.ts'

const masterStore = useMasterStore()
masterStore.init('events', 'accessories', 'characters', 'chapters')
const userStore = useUserStore()
const souls = computed(() => masterStore.mAccessories.filter(a => a.image === 'Soul.webp' && !a.location.match('ショップ')).map(s => {
  let card: Card | undefined
  masterStore.mCharacters.find(c => {
    const f = c.cards.find(card => card.label === s.label.replace('Acc.Soul.', ''))
    if (f) card = f
    return f
  })
  return {label: s.label, in_date: s.in_date, title: s.name, image: s.image, card}
}).reverse())
const events = computed(() => masterStore.mEvents.filter(e =>
  // 復刻イベは非表示
  !e.label.match('revival')
  // PRは非表示
  && !e.label.match('PR')
).map(e => ({label: e.label, in_date: e.in_date, title: e.name, logo: e.logo})))
const stories = computed(() => masterStore.mChapters.map(s => ({label: s.label, in_date: s.in_date, title: s.name, story: s.image})).reverse())
const showSouls = ref(true)
const showEvents = ref(true)
const showStories = ref(true)
const items = computed<{title: string, label: string, in_date: string, story?: string, logo?: string, image?: string, card?: Card}[]>(() => [
  ...(showSouls.value ? souls.value : []),
  ...(showEvents.value ? events.value : []),
  ...(showStories.value ? stories.value : []),
].sort((a, b) => new Date(b.in_date).getTime() - new Date(a.in_date).getTime()))

const isRead = ref(false)
const filterItem = computed(() => items.value.filter(it => !isRead.value || !userStore.readStory.includes(it.label) ))
function onClickItem(event: MouseEvent | KeyboardEvent, index: number) {
  if (event.ctrlKey) {
    const isChecked = userStore.readStory.includes(filterItem.value[index].label)
    // 選択
    for (let i = index + 1; i < filterItem.value.length; i++) {
      const label = filterItem.value[i].label
      if (isChecked) {
        const storerIndex = userStore.readStory.indexOf(label)
        userStore.readStory.splice(storerIndex, 1)
      } else {
        if (!label || userStore.readStory.includes(label)) continue
        userStore.readStory.push(label)
      }
    }
  }
}
</script>

<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-switch v-model="isRead" label="既読を非表示" color="primary" />
            <v-card-subtitle>ctrl + clickで選択より古いストーリーを既読</v-card-subtitle>
          </v-col>
          <v-col>
            <v-checkbox-btn v-model="showStories" label="メインストーリー" color="primary" />
            <v-checkbox-btn v-model="showEvents" label="サイドストーリー" color="primary" />
            <v-checkbox-btn v-model="showSouls" label="メモリーストーリー" color="primary" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-list v-model:selected="userStore.readStory" selectable select-strategy="leaf" color="secondary">
      <v-list-item v-for="(item, index) in filterItem" :key="item.label" :title="item.title" :value="item.label" @click="onClickItem($event, index)">
        <template #prepend="{select, isSelected}">
          <v-checkbox-btn :model-value="isSelected" @update:model-value="select(!!$event)" />
          <div v-if="item.logo" class="pre-image">
            <UiImg :event-logo="item.logo" :width="178"/>
          </div>
          <div v-else-if="item.image" class="pre-image">
            <CharacterImg type="select" :card="item.card" :width="178" class="position-absolute left-0"/>
            <UiImg :accessory="item.image" :height="72" class="position-absolute left-0"/>
          </div>
          <div v-else-if="item.story" class="pre-image justify-item-center">
            <UiImg :story="item.story" :width="178" :height="72" cover class="object-position-top" />
          </div>
        </template>
        <template #subtitle>
          {{new Date(item.in_date).toLocaleDateString('ja-jp', {year: 'numeric', month: '2-digit', day: '2-digit' })}}
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<style scoped>
.pre-image {
  width: 178px;
  height: 72px;
  position: relative;
  margin-right: 16px;
}
.justify-item-center {
  justify-items: center;
}

::v-deep(.object-position-top img) {
  object-position: 0 -40px;
}
</style>
