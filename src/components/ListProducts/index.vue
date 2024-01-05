<script setup lang="ts">
const SORT_OPTIONS = {
  nameASC: 'nameASC',
  nameDESC: 'nameDESC',
  priceASC: 'priceASC',
  priceDESC: 'priceDESC',
  rateASC: 'rateASC',
  rateDESC: 'rateDESC'
}
import { ref, computed } from 'vue'
import { cloneDeep, sortBy } from 'lodash'
import SearchProductBox from '@/components/SearchProductBox/index.vue'
import type { IProduct } from '@/core/interfaces/models/product'
import { useCart } from '@/core/store/cart'
import ProductItem from './ProductItem/index.vue'
import SortOptionsBox from './SortOptionsBox/index.vue'

const props = defineProps<{
  products: IProduct[]
}>()

const sortOptions = [
  {
    label: 'Name A - Z',
    value: SORT_OPTIONS.nameASC
  },
  {
    label: 'Name Z - A',
    value: SORT_OPTIONS.nameDESC
  },
  {
    label: 'Price ASC',
    value: SORT_OPTIONS.priceASC
  },
  {
    label: 'Price DESC',
    value: SORT_OPTIONS.priceDESC
  },
  {
    label: 'Rate ASC',
    value: SORT_OPTIONS.rateASC
  },
  {
    label: 'Rate DESC',
    value: SORT_OPTIONS.rateDESC
  }
]

const currentSortOption = ref<string>(sortOptions[0].value)
const searchString = ref<string>('')

const cart = useCart()

const showProducts = computed(() => {
  let newProductsList = cloneDeep(props.products)
  switch (currentSortOption.value) {
    case SORT_OPTIONS.nameASC:
      newProductsList = sortBy(newProductsList, ['title'])
      break
    case SORT_OPTIONS.nameDESC:
      newProductsList = sortBy(newProductsList, ['title']).reverse()
      break
    case SORT_OPTIONS.priceASC:
      newProductsList = sortBy(newProductsList, ['price'])
      break
    case SORT_OPTIONS.priceDESC:
      newProductsList = sortBy(newProductsList, ['price']).reverse()
      break
    case SORT_OPTIONS.rateASC:
      newProductsList = sortBy(newProductsList, ['rating.rate'])
      break
    case SORT_OPTIONS.rateDESC:
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
  cart.addToCart(product, 1)
}

const handleSearch = (payload: string) => {
  searchString.value = payload
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
