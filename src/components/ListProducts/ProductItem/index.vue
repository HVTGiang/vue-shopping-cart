<script setup lang="ts">
import { inject } from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { RiStarSFill, LaCartPlusSolid } from 'oh-vue-icons/icons'

import type { IProduct } from '@/core/interfaces/models/product'

import RatingStart from '@/components/RatingStart/index.vue'

addIcons(RiStarSFill, LaCartPlusSolid)

defineProps<{
  product: IProduct
}>()

defineEmits<{
  (eventName: 'addToCart', product: IProduct): void
}>()

const setProductIdToSeeDetail = inject<(payload: string) => void>('setProductIdToSeeDetail')

</script>

<template>
  <div
    class="product"
    @click="
      () => setProductIdToSeeDetail && setProductIdToSeeDetail(product.id as unknown as string)
    "
  >
    <div class="product__image">
      <img :src="product.image" :alt="product.title" />
    </div>
    <p class="product__title">
      {{ product.title }}
    </p>
    <div class="product__rate">
      <RatingStart :rate="product.rating.rate" />
      <p class="product__rate-count">({{ product.rating.count }})</p>
    </div>
    <div class="product__price">
      <p class="product__price-true">${{ product.price }}</p>
      <p class="product__price-origin">${{ (product.price * 1.2).toFixed(2) }}</p>
    </div>
    <div class="product__add-button">
      <OhVueIcon :name="LaCartPlusSolid.name"></OhVueIcon>
      <p
        class="product__add-title"
        @click="
          (event) => {
            event.stopPropagation()
            $emit('addToCart', product)
          }
        "
      >
        Add to cart
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
