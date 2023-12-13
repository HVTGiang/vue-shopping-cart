<script setup lang="ts">
import ProductItem from './ProductItem/index.vue'
import SortOptionsBox from './SortOptionsBox/index.vue'
import type { IProduct } from '@/core/interfaces/models/product'

defineProps<{
  products: IProduct[]
}>()
</script>

<template>
  <div class="list-products-container">
    <div class="list-products__header">
      <p class="list-products__title">Products</p>
      <div class="list-products__options">
        <SortOptionsBox />
      </div>
    </div>
    <div class="list-products">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
