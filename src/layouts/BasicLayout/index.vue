<script setup lang="ts">
import Header from '@/components/Header/index.vue'
</script>

<template>
  <div class="layout-container">
    <Header></Header>
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
