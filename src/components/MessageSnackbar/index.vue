<script setup lang="ts">
defineProps<{
  variant: 'success' | 'error' | 'warning' | 'info'
}>()
</script>

<template>
  <div class="snackbar__container">
    <Teleport to="#shopping_cart_snackbar_target">
      <div class="snackbar__overlay"></div>
      <div :class="['snackbar__content', variant]">
        <p class="snackbar__title">
          <slot name="title">Snackbar message</slot>
        </p>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
