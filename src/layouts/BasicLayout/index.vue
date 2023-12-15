<script setup lang="ts">
import { ref, provide } from 'vue'

import type { IProduct } from '@/core/interfaces/models/product'
import type { ICartItem } from '@/core/interfaces/models/cart'
import type { IPage } from './pageTypes'

import AllProducts from '@/views/AllProducts/index.vue'
import DetailProduct from '@/views/DetailProduct/index.vue'
import Header from '@/components/Header/index.vue'

const productIdToSeeDetail = ref<number>(-1)
const currentView = ref(AllProducts)
const cart = ref<ICartItem[]>([])

const actionsToCart = {
  addToCart: (product: IProduct, payload: number) => {
    const item = cart.value.find((item) => item.item.id === product.id)
    if (item) {
      if (payload > 0) {
        item.quantity += payload
      } else if (payload + item.quantity > 0) {
        item.quantity += payload
      } else {
        cart.value = cart.value.filter((item) => item.item.id !== product.id)
      }
    } else {
      if (payload > 0)
        cart.value.push({
          item: product,
          quantity: payload
        })
    }
  },
  deleteItem: (product: IProduct) => {
    cart.value = cart.value.filter((item) => item.item.id !== product.id)
  }
}

const setProductIdToSeeDetail = (payload: number) => {
  productIdToSeeDetail.value = payload
  console.log(productIdToSeeDetail.value)
  if (productIdToSeeDetail.value !== -1) {
    navigateTo(DetailProduct)
  } else {
    navigateTo(AllProducts)
  }
}

const navigateTo = (page: IPage) => {
  currentView.value = page
}

provide('setProductIdToSeeDetail', setProductIdToSeeDetail)
provide('productIdToSeeDetail', productIdToSeeDetail)
provide('cart', {
  cart: cart,
  actions: actionsToCart
})
provide('navigateTo', navigateTo)

</script>

<template>
  <div class="layout-container">
    <Header></Header>
    <component :is="currentView"></component>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
