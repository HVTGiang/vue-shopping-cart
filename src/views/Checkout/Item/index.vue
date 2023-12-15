<script setup lang="ts">
import { inject, ref } from 'vue'

import type { ICartItem } from '@/core/interfaces/models/cart'
import type { IProduct } from '@/core/interfaces/models/product'

import Modal from '@/components/Modal/index.vue'

const props = defineProps<{
  cartItem: ICartItem
}>()

const shouldShowModal = ref<boolean>(false)
const newQuantity = ref<number>(0)
const timer = ref<number>()
const modalTitle = ref<string>('')

const cart = inject<{
  cart: { value: ICartItem[] }
  actions: {
    addToCart: (product: IProduct, payload: number) => void
    deleteItem: (product: IProduct) => void
  }
}>('cart')
const setProductIdToSeeDetail = inject<(payload: string) => void>('setProductIdToSeeDetail')

const handleDecide = (decision: string) => {
  if (modalTitle.value === 'DELETE') {
    if (decision === 'accept') {
      cart?.actions.deleteItem(props.cartItem.item)
      return
    }
  } else {
    if (decision === 'accept') {
      changeQuantity(newQuantity.value - props.cartItem.quantity)
    }
  }

  shouldShowModal.value = false
  newQuantity.value = 0
}

const handleSubQuantityOne = () => {
  if (props.cartItem.quantity > 1) {
    cart?.actions.addToCart(props.cartItem.item, -1)
  } else {
    shouldShowModal.value = true
  }
}
const handleAddQuantity = () => {
  cart?.actions.addToCart(props.cartItem.item, 1)
}

const handleChangeQuantity = (payload: number) => {
  // Clear previous timer (if any)
  clearTimeout(timer.value)

  newQuantity.value = payload
  // Set a new timer for 500 milliseconds

  timer.value = window.setTimeout(() => {
    shouldShowModal.value = true
    modalTitle.value = 'UPDATE'
  }, 1000)
}

const changeQuantity = (payload: number) => {
  cart?.actions.addToCart(props.cartItem.item, payload)
}

const handleChangeInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  const numericValue = Number(value)

  if (numericValue < 0) {
    return
  }

  handleChangeQuantity(numericValue)
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
</script>

<template>
  <div
    class="cart__row cart__item"
    @click="() => setProductIdToSeeDetail && setProductIdToSeeDetail(cartItem.item.id + '')"
  >
    <div class="item__info">
      <div class="item__image">
        <img :src="props.cartItem.item.image" :alt="props.cartItem.item.title" />
      </div>
      <div class="item__text">
        <p class="item__title">{{ props.cartItem.item.title }}</p>
      </div>
    </div>
    <div class="item__category">{{ props.cartItem.item.category }}</div>
    <div class="item__price">{{ props.cartItem.item.price }}</div>
    <div class="item__quantity" @click="(event) => event.stopPropagation()">
      <p class="quantity__sub quantity__button" @click="handleSubQuantityOne">-</p>
      <input
        type="number"
        :value="cartItem.quantity"
        class="quantity__input"
        min="0"
        @input="handleChangeInput"
        @keydown="filterNonNumberic"
      />
      <p class="quantity__add quantity__button" @click="handleAddQuantity">+</p>
    </div>
    <div class="item__subtotal">
      {{ (props.cartItem.quantity * props.cartItem.item.price).toFixed(2) }}
    </div>
    <div class="item__actions">
      <p
        class="item__delete-btn"
        @click="
          (event) => {
            event.stopPropagation()
            shouldShowModal = true
            modalTitle = 'DELETE'
          }
        "
      >
        Delete
      </p>
    </div>
  </div>
  <Modal v-if="shouldShowModal" @decide="handleDecide">
    <template #title>{{
      modalTitle === 'DELETE'
        ? 'Are you sure you want to delete this item?'
        : `Update ${cartItem.item.title} to ${newQuantity} item?`
    }}</template>
  </Modal>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
