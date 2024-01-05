<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllProduct } from '@/services/product.service'
import mockData from '@/core/constants/mockData.json'
import type { IProduct } from '@/core/interfaces/models/product'
import ListProduct from '@/components/ListProducts/index.vue'
import LoadingSpinner from '@/components/LoadingSpinner/index.vue'

const products = ref<IProduct[] | undefined>()

onMounted(async () => {
  try {
    const response = await getAllProduct()

    products.value = response
  } catch (error) {
    // handle error (alert)
    console.log(error)
  }
})
</script>

<template>
  <div class="list-product-container">
    <div class="filter-section">
      <p class="section__title">Filter</p>
      <p class="section__desc">Updating...</p>
    </div>
    <div class="section__divider"></div>
    <ListProduct :products="(products as IProduct[]) || mockData" v-if="products" />
    <LoadingSpinner v-else />
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
