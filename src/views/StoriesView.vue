<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import {computed, ref} from 'vue'
import type {Card} from '@/types/character.ts'
import {useUserStore} from '@/stores/user.ts'
import SeraphDBImage from '@/components/SeraphDBImage.vue'

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
  return {label: s.label, in_date: s.in_date, title: s.name, image: s.image, card, storyType: 'soul'}
}).reverse())
const events = computed(() => masterStore.mEvents.filter(e =>
  // 復刻イベは非表示
  !e.label.match('revival')
  // PRは非表示
  && !e.label.match('PR')
).map(e => ({label: e.label, in_date: e.in_date, title: e.name, logo: e.logo, storyType: 'event'})))
const stories = computed(() => masterStore.mChapters
  .map(s => ({label: s.label, in_date: s.in_date, title: s.name, story: s.image, storyType: 'chapter'})).reverse())
const showSouls = ref(true)
const showEvents = ref(true)
const showStories = ref(true)
const items = computed<{title: string, label: string, in_date: string, story?: string, logo?: string, image?: string, card?: Card, storyType: string}[]>(() => [
  ...souls.value,
  ...events.value,
  ...stories.value,
].sort((a, b) => new Date(b.in_date).getTime() - new Date(a.in_date).getTime()))

const isRead = ref(false)
const filterItem = computed(() => items.value.filter(it => !isRead.value || !userStore.readStory.includes(it.label) ))
function onClickItem(event: MouseEvent | KeyboardEvent, index: number) {
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
</script>

<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-switch v-model="isRead" label="既読を非表示" color="info" />
            <v-card-subtitle>ctrl + clickで選択より古いストーリーを既読</v-card-subtitle>
          </v-col>
          <v-col>
            <v-switch v-model="showStories" label="メインストーリー" color="info" hide-details />
            <v-switch v-model="showEvents" label="サイドストーリー" color="info" hide-details />
            <v-switch v-model="showSouls" label="メモリーストーリー" color="info" hide-details />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-data-iterator :items="filterItem" items-per-page="-1" select-strategy="page"
                     :search="'' + showStories + showEvents + showSouls"
                     :custom-filter="(_1, _2, item) => (showStories && item?.raw.storyType === 'chapter') || (showEvents && item?.raw.storyType === 'event') || (showSouls && item?.raw.storyType === 'soul')">
      <template #default="{items}">
        <v-list v-model:selected="userStore.readStory" selectable select-strategy="leaf" color="secondary">
          <v-list-item v-for="(item, index) in items" :key="item.raw.label" :title="item.raw.title" :value="item.raw.label"
                       @click.ctrl="onClickItem($event, index)">
            <template #prepend="{select, isSelected}">
              <v-checkbox-btn :model-value="isSelected" @update:model-value="select(!!$event)"/>
              <div v-if="item.raw.logo" class="pre-image">
                <SeraphDBImage type="hbr" :hbr="item.raw.logo" :width="178"/>
              </div>
              <div v-else-if="item.raw.image" class="pre-image">
                <SeraphDBImage type="select" :thumbnail="item.raw.card?.image" :width="178" class="position-absolute left-0"/>
                <SeraphDBImage type="hbr" :hbr="item.raw.image" :height="72" class="position-absolute left-0"/>
              </div>
              <div v-else-if="item.raw.story" class="pre-image justify-item-center">
                <SeraphDBImage type="hbr" :hbr="item.raw.story + '.webp'" :width="178" :height="72" cover class="object-position-top"/>
              </div>
            </template>
            <template #subtitle>
              {{new Date(item.raw.in_date).toLocaleDateString('ja-jp', {year: 'numeric', month: '2-digit', day: '2-digit'})}}
            </template>
          </v-list-item>
        </v-list>
      </template>
    </v-data-iterator>
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
