<script setup lang="ts">
import { RouterView } from 'vue-router'
import {ref} from 'vue'
import DetailStyleDialog from '@/components/DetailStyleDialog.vue'
import {useUserStore} from '@/stores/user.ts'

const userStore = useUserStore()
const tab = ref<string>('')
const isUserDialog = ref(false)
const id = ref('')
const password = ref('')
const form = ref()
const isShowAlert = ref(false)
const alertType = ref<"error" | "success" | "warning" | "info" | undefined>()
const alertMessage = ref('')
const idRules = [
  (v: string) => !!v || 'idを入力してください'
]
const passwordRules = [
  (v: string) => !!v || 'passwordを入力してください'
]

function onClickLogin() {
  if (form.value?.validate()) {
    fetch('https://ham-proxy.vercel.app/api/upstash', {
      method: 'POST',
      body: JSON.stringify({
        id: id.value,
        pw: password.value,
      })
    }).then(resp => resp.json()).then(data => {
      userStore.id = data.id
      userStore.hash = data.hash
      isUserDialog.value = false
    })
  }
}
function onClickSave() {
  fetch('https://ham-proxy.vercel.app/api/upstash', {
    method: 'PUT',
    body: JSON.stringify({
      hash: userStore.hash,
      data: userStore.getUserData(),
    })
  }).then(res => {
    if (res.ok) {
      onShowAlert('保存成功', 'success')
    } else {
      userStore.id = undefined
      userStore.hash = undefined
      onShowAlert('ログアウトされています', 'warning')
    }
    isUserDialog.value = false
  })
}
function onClickLoad() {
  // TODO 確認
  fetch(`https://ham-proxy.vercel.app/api/upstash?hash=${userStore.hash}`, {
    method: 'GET',
  }).then(res => {
    if (res.ok) {
      res.json().then(data => {
        userStore.setUserData(data)
      })
    } else {
      userStore.id = undefined
      userStore.hash = undefined
      onShowAlert('ログアウトされています', 'warning')
    }
    isUserDialog.value = false
  })
}
function onClickLogout() {
  document.cookie = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
  userStore.id = undefined
  userStore.hash = undefined
}
function onShowAlert(message: string, type: "error" | "success" | "warning" | "info" | undefined) {
  alertMessage.value = message
  alertType.value = type
  isShowAlert.value = true
  setTimeout(() => {
    isShowAlert.value = false
  }, 5000)
}
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title class="select-none">Ham HeavenBurnsRed</v-app-bar-title>
      <v-tabs v-model="tab" color="primary">
        <v-tab value="styles" to="/styles" text="スタイル一覧" />
        <v-divider vertical />
        <v-btn :text="userStore.id ? `${userStore.id}：` : 'ユーザ情報：'"
               class="h-100"
               color="secondary"
               @click="isUserDialog = true"/>
        <v-tab value="story" to="/story" text="ストーリー順" />
        <v-tab value="owner-styles" to="/owner-styles" text="所持SSスタイル" />
        <v-tab value="training" to="/training" text="育成状況" disabled/>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <DetailStyleDialog />
    <v-dialog v-model="isUserDialog" max-width="400">
      <v-card>
        <v-card-title>簡易保存機能</v-card-title>
        <v-card-subtitle>簡易的に他端末でもユーザデータを共有できます</v-card-subtitle>
        <v-card-text>
          <div v-if="userStore.id" class="d-flex">
            <v-btn  text="保存" class="flex-1-1" color="primary" @click="onClickSave" />
            <v-spacer />
            <v-btn text="読込" class="flex-1-1" color="success" @click="onClickLoad" />
          </div>
          <v-form v-else ref="form" validate-on="submit">
            <v-text-field v-model="id" :rules="idRules" label="id" type="string" nama="id" />
            <v-text-field v-model="password" :rules="passwordRules" label="password" type="password" nama="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="userStore.id"
                 text="ログアウト"
                 color="error"
                 variant="elevated"
                 @click="onClickLogout"/>
          <v-btn v-else
                 text="ログイン"
                 color="primary"
                 variant="elevated"
                 @click="onClickLogin"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tooltip :model-value="isShowAlert"
               activator="parent"
               origin="bottom center"
               :open-on-hover="false"
               content-class="bg-transparent"
               location="bottom">
      <v-alert :type="alertType" :text="alertMessage" width="80vw" />
    </v-tooltip>
  </v-app>
</template>

<style scoped>
.select-none {
  user-select: none;
}
</style>
