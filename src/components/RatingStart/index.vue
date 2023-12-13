<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { RiStarSFill, RiStarSLine, RiStarHalfSLine } from 'oh-vue-icons/icons'

addIcons(RiStarSFill, RiStarSLine, RiStarHalfSLine)

const props = defineProps<{
  rate: number
}>()

const startType = (index: number) => {
  const rate = props.rate
  const flooredRate = Math.floor(rate)
  const ceiledRate = Math.ceil(rate)

  if (index <= flooredRate) return RiStarSFill.name

  if (Math.abs(rate - flooredRate) <= 0.25) {
    return index <= flooredRate ? RiStarSFill.name : RiStarSLine.name
  }
  if (Math.abs(rate - ceiledRate) <= 0.25) {
    return index <= ceiledRate ? RiStarSFill.name : RiStarSLine.name
  }
  return RiStarHalfSLine.name
}
</script>

<template>
  <div class="rating-starts">
    <OhVueIcon
      v-for="i in Array.from({ length: 5 }, (_, i: number) => i + 1)"
      :name="startType(i as number)"
      class="rating-starts__star"
      :key="(i as number)"
      fill="#ffcc02"
    />
  </div>
</template>

<style lang="scss" scoped>
.rating-starts {
  display: flex;
  align-items: center;
}
</style>
