<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { RiArrowLeftSLine } from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import Item from './Item/index.vue'

import { useCart } from '@/core/store'
import routeEndpoints from '@/router/route.endpoints'

addIcons(RiArrowLeftSLine)

const cart = useCart()
const router = useRouter()

const totalPrice = computed(() => {
  const total = cart.listItems.reduce((acc, item) => {
    return acc + item.item.price * item.quantity
  }, 0)

  return total?.toFixed(2)
})
</script>

<template>
  <div class="checkout-section">
    <div class="section__header">
      <div class="section__title">
        <OhVueIcon
          :name="RiArrowLeftSLine.name"
          class="section__back-btn---icon"
          @click="() => router.push(routeEndpoints.home.path)"
        />
        <p>Your shopping cart</p>
      </div>
      <div class="section__back-to-shop-btn" @click="() => router.push(routeEndpoints.home.path)">
        Continue shopping
      </div>
    </div>
    <div class="cart-items" v-if="cart && cart.listItems && cart.listItems.length > 0">
      <div class="cart__row cart__row--header">
        <div class="header__cell header__cell--left">Item</div>
        <div class="header__cell header__cell--left">Category</div>
        <div class="header__cell header__cell--right">Price</div>
        <div class="header__cell header__cell--center">Quantity</div>
        <div class="header__cell header__cell--right">Subtotal</div>
        <div class="header__cell"></div>
      </div>
      <div class="cart__body">
        <Item v-for="(item, index) in cart.listItems" :key="index" :cart-item="item" />
      </div>
    </div>
    <div class="cart-items--placeholder" v-else>Your cart is empty</div>
    <div class="section__footer">
      <div class="footer__inner">
        <p class="footer__count">Total {{ cart.listItems.length || 0 }} items</p>
        <div class="footer__total-price">${{ totalPrice }}</div>
        <div class="footer__checkout-btn">Checkout</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
