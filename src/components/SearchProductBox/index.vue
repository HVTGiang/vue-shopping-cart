<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { RiSearch2Line } from 'oh-vue-icons/icons'

addIcons(RiSearch2Line)
</script>

<template>
  <div class="search-box">
    <OhVueIcon :name="RiSearch2Line.name" class="search-icon" />
    <input class="input-field" type="text" placeholder="Search here" />
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
