<script setup lang="ts">
import { computed, ref } from 'vue'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { RiShoppingCartLine } from 'oh-vue-icons/icons'

addIcons(RiShoppingCartLine)

const count = ref<number | undefined>(15)
const renderCountText = computed(() => {
  if (!count.value) {
    return undefined
  } else return count.value > 99 ? '99+' : count.value
})
</script>

<template>
  <div class="cart-summary">
    <OhVueIcon :name="RiShoppingCartLine.name" class="cart-summary__icon" />
    <div class="cart-summary__count-badge" v-if="renderCountText">{{ renderCountText }}</div>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
