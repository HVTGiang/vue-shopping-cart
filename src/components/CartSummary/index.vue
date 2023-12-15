<script setup lang="ts">
import { computed, ref, inject } from 'vue'

import { RiShoppingCartLine } from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

import type { IProduct } from '@/core/interfaces/models/product'
import type { ICartItem } from '@/core/interfaces/models/cart'
import type { IPage } from '@/layouts/BasicLayout/pageTypes'

import Checkout from '@/views/Checkout/index.vue'
import CartItem from './CartItem/index.vue'

addIcons(RiShoppingCartLine)

const cart = inject<{
  cart: { value: ICartItem[] }
  actions: {
    addToCart: (product: IProduct, payload: number) => void
    deleteItem: (product: IProduct) => void
  }
}>('cart')
const navigateTo = inject<(page: IPage) => void>('navigateTo')

const shouldShowCartSummary = ref<boolean>(false)

const renderCountText = computed(() => {
  const count = cart?.cart.value.length
  if (!count) {
    return undefined
  } else return count > 99 ? '99+' : count
})

const totalPrice = computed(() => {
  const total = cart?.cart.value.reduce((acc, item) => {
    return acc + item.item.price * item.quantity
  }, 0)
  return total?.toFixed(2)
})

const closeCartSummary = () => {
  shouldShowCartSummary.value = false
}

const openCartSummary = () => {
  shouldShowCartSummary.value = true
}
</script>

<template>
  <div class="cart-summary" @mouseleave="closeCartSummary" @mouseover="openCartSummary">
    <OhVueIcon :name="RiShoppingCartLine.name" class="cart-summary__icon" />
    <div class="cart-summary__count-badge" v-if="renderCountText">{{ renderCountText }}</div>
    <div class="cart-summary__outlet" v-if="shouldShowCartSummary">
      <div class="cart__modal"></div>
      <div class="cart__container">
        <div class="cart__header">
          <p class="cart__title">Your cart</p>
          <p class="cart__see-detail-btn" @click="() => navigateTo && navigateTo(Checkout)">
            See detail
          </p>
        </div>
        <div class="cart__body">
          <CartItem
            v-for="(item, index) in cart?.cart.value.slice(0, 5)"
            :key="index"
            :cart-item="item"
          />
          <div
            class="cart__body-more"
            v-if="cart && cart?.cart.value.length > 5"
            @click="() => navigateTo && navigateTo(Checkout)"
          >
            See all
          </div>
          <div class="cart__body-placeholder" v-if="cart?.cart.value.length === 0">
            Your cart is empty
          </div>
        </div>
        <div class="cart__footer">
          <div class="cart__total">
            <p>
              Total <strong>{{ cart?.cart.value.length }}</strong> items
            </p>
            <p class="cart__total-price">${{ totalPrice }}</p>
          </div>
          <div class="cart__checkout-btn" @click="() => navigateTo && navigateTo(Checkout)">
            Checkout
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
