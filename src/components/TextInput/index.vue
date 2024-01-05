<script setup lang="ts">
import { VTextField } from 'vuetify/components/VTextField'
</script>

<template>
  <v-text-field
    v-bind="$attrs"
    variant="outlined"
    class="text-input"
    density="compact"
  ></v-text-field>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
