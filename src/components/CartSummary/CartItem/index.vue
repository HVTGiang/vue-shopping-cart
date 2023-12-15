<script setup lang="ts">
import { inject } from 'vue'

import type { ICartItem } from '@/core/interfaces/models/cart'

const setProductIdToSeeDetail = inject<(payload: string) => void>('setProductIdToSeeDetail')

defineProps<{
  cartItem: ICartItem
}>()

</script>

<template>
  <div
    class="product-item"
    @click="() => setProductIdToSeeDetail && setProductIdToSeeDetail(cartItem.item.id + '')"
  >
    <div class="item__image">
      <img :src="cartItem.item.image" alt="Product item" />
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
