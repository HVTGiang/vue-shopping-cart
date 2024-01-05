<script setup lang="ts">
import { useSystem } from '@/core/store'
const system = useSystem()
</script>

<template>
  <v-overlay
    v-model="system.loading"
    location-strategy="static"
    activator="parent"
    scroll-strategy="block"
    class="align-center justify-center"
    :disabled="true"
  >
    <v-progress-circular indeterminate :color="'#ffea00'"></v-progress-circular>
  </v-overlay>
</template>
