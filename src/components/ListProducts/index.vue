<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { cloneDeep, sortBy } from 'lodash'

import SearchProductBox from '@/components/SearchProductBox/index.vue'

import type { IProduct } from '@/core/interfaces/models/product'
import type { ICartItem } from '@/core/interfaces/models/cart'

import ProductItem from './ProductItem/index.vue'
import SortOptionsBox from './SortOptionsBox/index.vue'

const props = defineProps<{
  products: IProduct[]
}>()

const sortOptions = [
  {
    label: 'Name A - Z',
    value: 'nameASC'
  },
  {
    label: 'Name Z - A',
    value: 'nameDESC'
  },
  {
    label: 'Price ASC',
    value: 'priceASC'
  },
  {
    label: 'Price DESC',
    value: 'priceDESC'
  },
  {
    label: 'Rate ASC',
    value: 'rateASC'
  },
  {
    label: 'Rate DESC',
    value: 'rateDESC'
  }
]

const currentSortOption = ref(sortOptions[0].value)
const searchString = ref<string>('')

const cart = inject<{
  cart: { value: ICartItem[] }
  actions: {
    addToCart: (product: IProduct, payload: number) => void
    deleteItem: (product: IProduct) => void
  }
}>('cart')

const showProducts = computed(() => {
  let newProductsList = cloneDeep(props.products)
  switch (currentSortOption.value) {
    case 'nameASC':
      newProductsList = sortBy(newProductsList, ['title'])
      break
    case 'nameDESC':
      newProductsList = sortBy(newProductsList, ['title']).reverse()
      break
    case 'priceASC':
      newProductsList = sortBy(newProductsList, ['price'])
      break
    case 'priceDESC':
      newProductsList = sortBy(newProductsList, ['price']).reverse()
      break
    case 'rateASC':
      newProductsList = sortBy(newProductsList, ['rating.rate'])
      break
    case 'rateDESC':
      newProductsList = sortBy(newProductsList, ['rating.rate']).reverse()
      break
    default:
      break
  }
  if (searchString.value !== '') {
    newProductsList = newProductsList.filter((product: IProduct) => {
      return product.title.toLowerCase().includes(searchString.value.toLowerCase())
    })
  }

  return newProductsList
})

const handleAddToCart = (product: IProduct) => {
  cart?.actions.addToCart(product, 1)
}

const handleSearch = (payload: string) => {
  searchString.value = payload
  console.log(payload);
}
</script>

<template>
  <div class="list-products-container">
    <div class="list-products__header">
      <p class="list-products__title">Products</p>
      <div class="list-products__options">
        <SearchProductBox @search="handleSearch" />
        <SortOptionsBox
          :options-list="sortOptions"
          v-model:chosen-option="currentSortOption"
          @change-option="currentSortOption = $event"
        />
      </div>
    </div>
    <div class="list-products">
      <ProductItem
        v-for="product in showProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
