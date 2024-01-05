<script setup lang="ts">
import SignIn from '@/views/SignIn/index.vue'
</script>

<template>
  <div class="container">
    <div class="page__cover">
      <img
        src="@/assets/images/luis-felipe-lins-LG88A2XgIXY-unsplash.jpg"
        alt="branch cover image"
      />
      <p class="page__cover-source">
        Image is from
        <a
          target="_blank"
          href="https://unsplash.com/photos/white-and-red-nike-athletic-shoe-LG88A2XgIXY"
          class="link"
          >here</a
        >
      </p>
    </div>
    <div class="outlet-container">
      <RouterView> <SignIn /></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
