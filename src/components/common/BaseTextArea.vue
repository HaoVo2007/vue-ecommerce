<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea
      :id="id"
      v-model="model"
      v-bind="$attrs"
      :required="required"
      :class="[
        'w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none',
        $attrs.class
      ]"
    />
  </div>
</template>

<script setup>
const model = defineModel({ type: String, default: '' })

const props = defineProps({
  label: { type: String, default: '' },
  required: { type: Boolean, default: false },
  id: { type: String, default: () => `textarea-${Math.random().toString(36).slice(2, 9)}` },
})
</script>
