<script setup lang="ts">
import { signin } from '@/services/auth.service'
import { ref } from 'vue'
import type { SubmitEventPromise } from 'vuetify'
import { useRouter, useRoute } from 'vue-router'
import routeEndpoints from '@/router/route.endpoints'

const isLoading = ref<boolean>(false)
const username = ref<string>('')
const password = ref<string>('')

const router = useRouter()
const route = useRoute()

import * as store from '@/core/store'

const system = store.useSystem()

const rules = {
  username: [
    (v: string) => !!v || 'Username is required',
    (v: string) => (v && v.length <= 20) || 'Username must be less than 20 characters'
  ],
  password: [
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 4) || 'Password must be at least 8 characters'
  ]
}

const handleSubmit = async (event: SubmitEventPromise) => {
  try {
    const valid = (await event).valid
    if (valid) {
      system.setSystemLoading(true)
      const res = await signin({ password: password.value, username: username.value })
      if (res) {
        system.setToken(res.token)
        router.replace((route.query.redirect as string) || routeEndpoints.home.path)
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    system.setSystemLoading(false)
  }
}
</script>

<template>
  <div class="sign-in-container">
    <VForm class="form" @submit.prevent="handleSubmit" validate-on="blur">
      <div class="form__title">
        <p>Sign in</p>
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <v-icon icon="mdi-help-circle-outline" size="25px" v-bind="props" />
          </template>
          <span> All users in https://fakestoreapi.com/users is accessible </span>
        </v-tooltip>
      </div>
      <div class="form__sub-title">Enjoy shopping with GiangHVT</div>
      <div class="input-group">
        <label for="username" class="input__label">Username</label>
        <TextInput
          name="username"
          id="username"
          class="username"
          density="compact"
          :rules="rules.username"
          rounded="lg"
          v-model="username"
        ></TextInput>
      </div>
      <div class="input-group">
        <label for="username" class="input__label">Password</label>
        <PasswordInput
          name="password"
          id="username"
          class="username"
          density="compact"
          :rules="rules.password"
          rounded="lg"
          v-model="password"
        ></PasswordInput>
      </div>
      <p class="forgot-password">Forgot password?</p>
      <v-btn
        type="submit"
        block
        rounded="lg"
        elevation="0"
        variant="flat"
        color="primary"
        :loading="isLoading"
        class="form__submit-btn"
      >
        <template #default>
          <span class="form__submit-btn-content"> Sign in </span>
        </template>
      </v-btn>
      <div class="button-divider">or</div>
      <div class="social-accounts">
        <div class="account-item">
          <img src="@/assets/images/facebook.png" alt="Facebook logo" />
          <img src="@/assets/images/facebook.png" alt="Facebook logo" class="account-item__shadow" />
        </div>
        <div class="account-item">
          <img src="@/assets/images/google.png" alt="Google logo" />
          <img src="@/assets/images/google.png" alt="Google logo" class="account-item__shadow" />
        </div>
      </div>
    </VForm>
    <div class="create-account">
      <p>Haven't had an account yet?</p>
      <p
        class="create-account__btn"
        @click="() => router.push({ name: routeEndpoints.signUp.name })"
      >
        Sign up now
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
.form__submit-btn-content {
  text-transform: none;
}
</style>
