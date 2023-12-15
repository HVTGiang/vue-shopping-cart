<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { LaCartPlusSolid } from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

import type { ICartItem } from '@/core/interfaces/models/cart'
import type { IProduct } from '@/core/interfaces/models/product'

import { getProductById } from '@/services/product.service'

import RatingStar from '@/components/RatingStart/index.vue'

addIcons(LaCartPlusSolid)

const product = ref<IProduct>()
const currentQuantity = ref<number>(1)

const productId = inject<{ value: string }>('productIdToSeeDetail')
const setProductIdToSeeDetail = inject<(payload: number) => void>('setProductIdToSeeDetail')
const cart = inject<{
  cart: { value: ICartItem[] }
  actions: {
    addToCart: (product: IProduct, payload: number) => void
    deleteItem: (product: IProduct) => void
  }
}>('cart')

onMounted(async () => {
  try {
    const res = await getProductById(productId?.value as string)

    product.value = res
  } catch (error) {
    // handle error (alert)
    console.log(error)
  }
})

const navigateToHome = () => {
  setProductIdToSeeDetail && setProductIdToSeeDetail(-1)
}

const filterNonNumberic = (event: Event) => {
  const key = (event as KeyboardEvent).key
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
  const isAllowedKey = allowedKeys.includes(key)
  const isNumeric = /^\d$/.test(key)

  if (!isAllowedKey && !isNumeric) {
    event.preventDefault()
  }
}

const handleSubOne = () => {
  if (currentQuantity.value > 1) {
    currentQuantity.value--
  }
}
const handleAddOne = () => {
  currentQuantity.value++
}

const handleAddToCart = () => {
  cart?.actions.addToCart(product.value as IProduct, currentQuantity.value)
}
</script>
<template>
  <div class="detail-product-section">
    <p class="section__title">
      <span class="section__break-item" @click="navigateToHome">Products</span>
      <span class="section__break-item section__break-item--current">{{ product?.title }}</span>
    </p>
    <div class="product" v-if="product">
      <div class="product__image">
        <img :src="product?.image" alt="Product image" />
      </div>
      <div class="product__info">
        <p class="product__category">{{ product?.category }}</p>
        <p class="product__title">{{ product?.title }}</p>
        <div class="product__rating">
          <RatingStar :rate="(product && product.rating.rate) || 0" :scale="1.3" />
          <p class="product__rating-count">{{ product?.rating.count }} reviews</p>
        </div>
        <div class="product__desc">
          {{ product?.description }}
        </div>
        <div class="product__pricing">
          <p class="product__price product__price-new">${{ product?.price }}</p>
          <p class="product__price product__price-old">
            ${{ product && (product.price * 1.2).toFixed(2) }}
          </p>
        </div>
        <div class="product__action">
          <div class="product__quantity">
            <p class="quantity__sub quantity__button" @click="handleSubOne">-</p>
            <input
              type="number"
              class="quantity__input"
              min="0"
              v-model="currentQuantity"
              @keydown="filterNonNumberic"
            />
            <p class="quantity__add quantity__button" @click="handleAddOne">+</p>
          </div>
          <div class="product__add-button">
            <OhVueIcon :name="LaCartPlusSolid.name"></OhVueIcon>
            <p class="product__add-title" @click="handleAddToCart">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
    <div class="product--placeholder" v-if="!product">
      <div class="product__image"></div>
      <div class="product__info">
        <div class="product__title"></div>
        <div class="product__desc"></div>
        <div class="product__button"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
