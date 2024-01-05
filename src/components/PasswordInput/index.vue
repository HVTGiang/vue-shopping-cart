<script setup lang="ts">
import { ref } from 'vue'

const show = ref<boolean>(false)
</script>

<template>
  <v-text-field
    v-bind="$attrs"
    variant="outlined"
    class="text-input"
    :type="show ? 'text' : 'password'"
    :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
    @click:append-inner="() => (show = !show)"
    density="compact"
  ></v-text-field>
</template>
