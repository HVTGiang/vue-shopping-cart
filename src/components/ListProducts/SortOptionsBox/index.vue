<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  chosenOption: string
  optionsList: { label: string; value: string }[]
}>()

const emit = defineEmits<{
  (eventName: 'changeOption', payload: string): void
}>()

const isOpenOptionsMenu = ref(false)

const closeOptionsMenu = () => {
  isOpenOptionsMenu.value = false
}
const toggleOptionsMenu = () => {
  isOpenOptionsMenu.value = !isOpenOptionsMenu.value
}

const handleChooseOption = (payload: string) => {
  emit('changeOption', payload)
  closeOptionsMenu()
}
</script>

<template>
  <div class="sort-box">
    <p class="sort__title">Sort by</p>
    <div class="sort__chosen-item" @click="toggleOptionsMenu">
      {{ optionsList.find((option) => option.value === chosenOption)?.label }}
    </div>
    <div class="sort__modal" @click="closeOptionsMenu" v-if="isOpenOptionsMenu"></div>
    <div class="sort__options" v-if="isOpenOptionsMenu">
      <div
        class="sort__option"
        v-for="(item, index) in optionsList"
        :key="index"
        @click="() => handleChooseOption(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
