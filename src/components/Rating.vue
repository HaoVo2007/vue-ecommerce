<script setup>
const props = defineProps({
    rating: { type: Number, default: 0 }
})

const fullStars = Math.floor(props.rating)
const halfStar = props.rating % 1 !== 0
const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
</script>

<template>
  <div class="flex items-center space-x-2">
    <div class="flex items-center">
      <i
        v-for="n in fullStars"
        :key="'full-' + n"
        class="fas fa-star text-yellow-400 text-sm"
      ></i>

      <i
        v-if="hasHalfStar"
        class="fas fa-star-half-alt text-yellow-400 text-sm"
      ></i>

      <i
        v-for="n in emptyStars"
        :key="'empty-' + n"
        class="far fa-star text-yellow-400 text-sm"
      ></i>
    </div>

    <span class="text-sm font-medium text-gray-700">{{ rating.toFixed(1) }}</span>
  </div>
</template>