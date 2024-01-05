<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const password = ref<string>('')
const repeatPassword = ref<string>('')

const router = useRouter()
import routeEndpoints from '@/router/route.endpoints'

const rules = {
  username: [
    (v: string) => !!v || 'Username is required',
    (v: string) => (v && v.length <= 20) || 'Username must be less than 20 characters'
  ],
  password: [
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 4) || 'Password must be at least 4 characters'
  ],
  repeatPassword: [
    (v: string) => !!v || 'Repeat password is required',
    (v: string) => (v && v.length >= 4) || 'Repeat password must be at least 4 characters',
    (v: string) => v === password.value || "Repeat password isn't match"
  ]
}

</script>

<template>
  <div class="sign-up-container">
    <VForm class="form" validate-on="blur">
      <div class="form__title">Sign up</div>
      <div class="form__sub-title">Create an account and sign in</div>
      <div class="input-group">
        <label for="username" class="input__label">Username</label>
        <TextInput
          name="username"
          id="username"
          clearable
          :rules="rules.username"
          rounded="lg"
          v-model="username"
        ></TextInput>
      </div>
      <div class="input-group">
        <label for="username" class="input__label">Password</label>
        <PasswordInput
          name="password"
          id="password"
          :rules="rules.password"
          rounded="lg"
          v-model="password"
          hint="At least 8 characters"
        ></PasswordInput>
      </div>
      <div class="input-group">
        <label for="username" class="input__label">Repeat password</label>
        <PasswordInput
          name="repeatPassword"
          id="repeatPassword"
          :rules="rules.repeatPassword"
          rounded="lg"
          v-model="repeatPassword"
          hint="At least 8 characters"
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
        class="form__submit-btn"
        text="Sign up"
      >
        <template #default>
          <span class="form__submit-btn-content"> Sign up </span>
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
      <p>Already have an account?</p>
      <p
        class="create-account__btn"
        @click="() => router.push({ name: routeEndpoints.signIn.name })"
      >
        Sign in now
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
