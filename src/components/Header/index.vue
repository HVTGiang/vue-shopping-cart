<script setup lang="ts">
import { useRouter } from 'vue-router'
import routeEndpoints from '@/router/route.endpoints'
import CartSummary from '@/components/CartSummary/index.vue'

const router = useRouter()
</script>

<template>
  <div class="header-container">
    <p class="header__logo" @click="() => router.push(routeEndpoints.home.path)">GiangHVT</p>
    <ul class="header__menu">
      <li class="header__menu-item">New & featured</li>
      <li class="header__menu-item">Men</li>
      <li class="header__menu-item">Women</li>
      <li class="header__menu-item">Accessories</li>
    </ul>
    <SearchProductBox />
    <div class="header__user-info">
      <CartSummary />
      <div class="user-avatar">
        <img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          alt="User avatar"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
