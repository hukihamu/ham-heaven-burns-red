<script setup lang="ts">

import {useUserStore} from '@/stores/user.ts'
import {computed, ref} from 'vue'
import {type SubmitEventPromise, useDisplay} from 'vuetify'
import {useRouter} from 'vue-router'
import {routeNames, routes} from '@/router'


const modelValue = defineModel<boolean>()
const {mobile} = useDisplay()
const {currentRoute} = useRouter()
const user = useUserStore()
function getRouteTitle(route?: string | symbol): string {
  return routeNames[route ?? '']
}

const isSnackbar = ref(false)
const snackbarType = ref<'error' | 'success' | 'warning' | 'info'>('success')
const snackbarText = ref<string>()

const isLogin = ref(false)
const id = ref('')
const pw = ref('')
const idRules = [(v: string) => !!v || 'idを入力してください']
const passwordRules = [(v: string) => !!v || 'passwordを入力してください']

const isConfirm = ref(false)
const confirmText = ref('')
const confirmOK = ref(() => {})
const atLasted = computed(() => user.atLasted ? new Date(user.atLasted).toLocaleString() : '未保存')

function onLogin(event: SubmitEventPromise) {
  event.then((e) => {
    if (e.valid) fetch('https://ham-proxy.vercel.app/api/upstash', {
      method: 'POST',
      body: JSON.stringify({
        id: id.value,
        pw: pw.value
      })
    }).then(it => it.json()).then(data => {
      user.id = data.id
      user.hash = data.hash
      isLogin.value = false
      snackbarType.value = 'success'
      snackbarText.value = 'ログインしました'
      isSnackbar.value = true
    })
  })
}
function onConfirm(text: string, ok: () => void) {
  confirmText.value = text
  confirmOK.value = () => {
    isConfirm.value = false
    ok()
  }
  isConfirm.value = true
}
function onLoad() {
  fetch(`https://ham-proxy.vercel.app/api/upstash?hash=${user.hash}`, {
    method: 'GET',
  }).then(res => {
    if (res.ok) {
      res.json().then(data => {
        onConfirm(`読込を実行します。\nlocal\t\t: ${atLasted.value}\nserver\t: ${data.atLasted ? new Date(data.atLasted).toLocaleString() : '未保存'}`, () => {
          user.setUserData(data)
          snackbarType.value = 'success'
          snackbarText.value = '読込が完了しました'
          isSnackbar.value = true
        })
      })
    } else {
      user.id = undefined
      user.hash = undefined
      snackbarType.value = 'warning'
      snackbarText.value = 'ログアウトされています'
      isSnackbar.value = true
    }
  })
}
function onSave() {
  fetch('https://ham-proxy.vercel.app/api/upstash', {
    method: 'PUT',
    body: JSON.stringify({
      hash: user.hash,
      data: user.getUserData(),
    })
  }).then(res => {
    if (res.ok) {
      snackbarType.value = 'success'
      snackbarText.value = '保存が完了しました'
      isSnackbar.value = true
    } else {
      user.id = undefined
      user.hash = undefined
      snackbarType.value = 'warning'
      snackbarText.value = 'ログアウトされています'
      isSnackbar.value = true
    }
  })
}
function onLogout() {
  user.id = undefined
  user.hash = undefined
  snackbarType.value = 'success'
  snackbarText.value = 'ログアウトしました'
  isSnackbar.value = true
}
</script>

<template>
  <v-navigation-drawer v-model="modelValue" :mobile="mobile && currentRoute.path !== '/'" :style="{width: currentRoute.path === '/' ? '100%' : '300px'}" width="300">
    <v-list>
      <v-list-item v-if="user.id" :title="user.id" :subtitle="atLasted">
        <div class="d-flex justify-space-evenly">
          <v-btn text="保存" color="success" variant="outlined" @click="onConfirm('保存を実行します。', onSave)" />
          <v-btn text="読込" color="info" variant="outlined" @click="onLoad" />
          <v-btn text="logout" color="warning" variant="outlined" @click="onConfirm('ログアウト', onLogout)" />
        </div>
      </v-list-item>
      <v-list-item v-else>
        <template #title>
          <v-btn text="ユーザ情報" variant="flat" @click="isLogin = !isLogin" />
        </template>
        <v-form v-show="isLogin" validate-on="submit" @submit.prevent="onLogin">
          <v-card subtitle="データ共有（仮機能）">
            <v-card-text>
              <v-text-field v-model="id" :rules="idRules" density="compact" label="id" type="string" nama="id" />
              <v-text-field v-model="pw" :rules="passwordRules" density="compact" label="password" type="password" nama="password" />
              <v-btn text="ログイン" type="submit" block/>
            </v-card-text>
          </v-card>
        </v-form>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list color="primary">
      <div v-for="route in routes" :key="route.name">
        <v-list-group v-if="route.children">
          <template #activator="{props}">
            <v-list-item
              v-bind="props"
              :key="route.name"
              :title="getRouteTitle(route.name)" />
          </template>
          <v-list-item v-for="child in route.children"
                       :key="child.name"
                       :to="child.path"
                       :title="getRouteTitle(child.name)" />
        </v-list-group>
        <v-list-item
          v-else
          :key="route.name"
          :to="route.path"
          :title="getRouteTitle(route.name)" />
      </div>
    </v-list>
  </v-navigation-drawer>
  <v-snackbar v-model="isSnackbar" :timeout="3000" color="transparent" variant="flat">
    <v-alert :type="snackbarType" :text="snackbarText" />
  </v-snackbar>
  <v-dialog v-model="isConfirm" width="300">
    <v-card title="確認">
      <v-card-text class="whitespace-pre">{{ confirmText }}</v-card-text>
      <v-card-actions>
        <v-btn text="OK" color="info" @click="confirmOK" />
        <v-btn text="Cancel" @click="isConfirm = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.whitespace-pre {
  white-space: pre;
  -webkit-line-clamp: 2;
}
</style>
