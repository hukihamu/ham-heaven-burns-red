<script setup lang="ts">
import { RouterView } from 'vue-router'
import {ref} from 'vue'
import DetailStyleDialog from '@/components/DetailStyleDialog.vue'
import {useViewStore} from '@/stores/view.ts'
import {useUserStore} from '@/stores/user.ts'

const viewStore = useViewStore()
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
      credentials: 'include',
      body: JSON.stringify({
        id: id.value,
        pw: password.value,
      })
    }).then(() => {
      viewStore.getCookie()
    })
  }
}
function onClickSave() {
  fetch('https://ham-proxy.vercel.app/api/upstash', {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({
      data: userStore.getUserData(),
    })
  }).then(res => {
    if (res.ok) {
      onShowAlert('保存成功', 'success')
    } else {
      viewStore.getCookie()
      onShowAlert('ログアウトされています', 'warning')
    }
  })
}
function onClickLoad() {
  // TODO 確認
  fetch('https://ham-proxy.vercel.app/api/upstash', {
    method: 'GET',
    credentials: 'include',
  }).then(res => {
    if (res.ok) {
      res.json().then(data => {
        userStore.setUserData(data)
        viewStore.getCookie()
        isUserDialog.value = false
      })
    } else {
      viewStore.getCookie()
      onShowAlert('ログアウトされています', 'warning')
    }
  })
}
function onClickLogout() {
  document.cookie = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
  viewStore.getCookie()
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
        <v-btn :text="viewStore.id ? `${viewStore.id}：` : 'ユーザ情報：'"
               class="h-100"
               @click="isUserDialog = true"/>
        <v-tab value="story" to="/story" text="ストーリー順" />
        <v-tab value="owner-styles" to="/owner-styles" text="所持SSスタイル" />
        <v-tab value="training" to="/training" text="育成状況" />
      </v-tabs>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <DetailStyleDialog />
    <v-dialog v-model="isUserDialog" max-width="400">
      <v-card>
        <v-card-title>
          {{viewStore.id ? undefined : 'サインイン/サインアップ'}}
        </v-card-title>
        <v-card-text>
          <div v-if="viewStore.id" class="d-flex">
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
          <v-btn v-if="viewStore.id"
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
               origin="bottom end"
               :open-on-hover="false"
               content-class="bg-transparent"
               location="end bottom">
      <v-alert :type="alertType" :text="alertMessage" />
    </v-tooltip>
  </v-app>
</template>

<style scoped>
.select-none {
  user-select: none;
}
</style>
