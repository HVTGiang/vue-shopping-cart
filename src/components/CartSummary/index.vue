<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { RiShoppingCartLine } from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import CartItem from './CartItem/index.vue'
import routeEndpoints from '@/router/route.endpoints'
import { useCart } from '@/core/store'

addIcons(RiShoppingCartLine)

const router = useRouter()
const cart = useCart()

const shouldShowCartSummary = ref<boolean>(false)

const renderCountText = computed(() => {
  const count = cart.listItems.length
  if (!count) {
    return undefined
  } else return count > 99 ? '99+' : count
})
const totalPrice = computed(() => {
  const total = cart.listItems.reduce((acc, item) => {
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
    <OhVueIcon
      :name="RiShoppingCartLine.name"
      class="cart-summary__icon"
      @click="() => router.push({ path: routeEndpoints.cart.path })"
    />
    <div class="cart-summary__count-badge" v-if="renderCountText">{{ renderCountText }}</div>
    <div class="cart-summary__outlet" v-if="shouldShowCartSummary">
      <div class="cart__modal"></div>
      <div class="cart__container">
        <div class="cart__header">
          <p class="cart__title">Your cart</p>
          <p
            class="cart__see-detail-btn"
            @click="() => router.push({ path: routeEndpoints.cart.path })"
          >
            See detail
          </p>
        </div>
        <div class="cart__body">
          <CartItem
            v-for="(item, index) in  cart.listItems.slice(0, 5)"
            :key="index"
            :cart-item="item"
            @click="() => router.push({ path: routeEndpoints.cart.path })"
          />
          <div class="cart__body-more" v-if="cart &&  cart.listItems.length > 5">See all</div>
          <div class="cart__body-placeholder" v-if=" cart.listItems.length === 0">
            Your cart is empty
          </div>
        </div>
        <div class="cart__footer">
          <div class="cart__total">
            <p>
              Total <strong>{{ cart.listItems.length }}</strong> items
            </p>
            <p class="cart__total-price">${{ totalPrice }}</p>
          </div>
          <div
            class="cart__checkout-btn"
            @click="() => router.push({ path: routeEndpoints.cart.path })"
          >
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
