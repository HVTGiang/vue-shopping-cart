<script setup lang="ts">
import { inject, computed } from 'vue'

import type { ICartItem } from '@/core/interfaces/models/cart'
import type { IProduct } from '@/core/interfaces/models/product'
import type { IPage } from '@/layouts/BasicLayout/pageTypes'

import AllProducts from '@/views/AllProducts/index.vue'
import Item from './Item/index.vue'

const cart = inject<{
  cart: { value: ICartItem[] }
  actions: {
    addToCart: (product: IProduct, payload: number) => void
    deleteItem: (product: IProduct) => void
  }
}>('cart')
const navigateTo = inject<(page: IPage) => void>('navigateTo')

const totalPrice = computed(() => {
  const total = cart?.cart.value.reduce((acc, item) => {
    return acc + item.item.price * item.quantity
  }, 0)

  return total?.toFixed(2)
})
</script>

<template>
  <div class="checkout-section">
    <div class="section__header">
      <p class="section__title">Your shopping cart</p>
      <div class="section__back-to-shop-btn" @click="navigateTo && navigateTo(AllProducts)">
        Continue shopping
      </div>
    </div>
    <div class="cart-items" v-if="cart && cart.cart.value && cart.cart.value.length > 0">
      <div class="cart__row cart__row--header">
        <div class="header__cell header__cell--left">Item</div>
        <div class="header__cell header__cell--left">Category</div>
        <div class="header__cell header__cell--right">Price</div>
        <div class="header__cell header__cell--center">Quantity</div>
        <div class="header__cell header__cell--right">Subtotal</div>
        <div class="header__cell"></div>
      </div>
      <div class="cart__body">
        <Item v-for="(item, index) in cart.cart.value" :key="index" :cart-item="item" />
      </div>
    </div>
    <div class="cart-items--placeholder" v-else>Your cart is empty1</div>
    <div class="section__footer">
      <div class="footer__inner">
        <p class="footer__count">Total {{ cart?.cart.value.length || 0 }} items</p>
        <div class="footer__total-price">${{ totalPrice }}</div>
        <div class="footer__checkout-btn">Checkout</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
