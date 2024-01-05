<script setup lang="ts">
import SystemLoading from '@/components/SystemLoading/index.vue'
</script>

<template>
  <div id="shopping_cart_modal_target"></div>
  <div id="shopping_cart_snackbar_target"></div>
  <RouterView></RouterView>
  <SystemLoading></SystemLoading>
</template>
