<script setup lang="ts">
import type { ICartItem } from '@/core/interfaces/models/cart'
import routeEndpoints from '@/router/route.endpoints'
import { useRouter } from 'vue-router'

defineProps<{
  cartItem: ICartItem
}>()

const router = useRouter()
</script>

<template>
  <div
    class="product-item"
    @click="
      () =>
        router.push({
          name: routeEndpoints.productDetail.name,
          params: { id: $props.cartItem.item.id }
        })
    "
  >
    <div class="item__image">
      <img :src="cartItem.item.image" :alt="cartItem.item.title" />
    </div>
    <div class="item__info">
      <p class="item__title">{{ cartItem.item.title }}</p>
      <div class="item__price">
        <p class="item__price-detail">
          <span class="price__basic">${{ cartItem.item.price }}</span>
          <span class="price__items-count">x{{ cartItem.quantity }}</span>
        </p>
        <p class="item__price-total">${{ (cartItem.item.price * cartItem.quantity).toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
