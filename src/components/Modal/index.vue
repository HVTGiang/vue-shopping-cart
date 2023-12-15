<script setup lang="ts">
defineEmits<{
  (eventName: 'decide', decision: string): void
}>()
</script>
<template>
  <div class="modal__container">
    <Teleport to="#shopping_cart_modal_target">
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <p class="modal__title">
          <slot name="title">Confirm action</slot>
        </p>
        <div class="modal__actions">
          <div class="modal__action modal__action--cancel" @click="() => $emit('decide', 'cancel')">
            Cancel
          </div>
          <div class="modal__action modal__action--accept" @click="() => $emit('decide', 'accept')">
            Accept
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
<style lang="scss" scoped>
@import './style.scss';
</style>
