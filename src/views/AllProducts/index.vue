<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ListProduct from '@/components/ListProducts/index.vue'
import type { IProduct } from '@/core/interfaces/models/product'
import { getAllProduct } from '@/services/product.service'

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
    </div>
    <div class="section__divider"></div>
    <ListProduct :products="products" />
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
