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

    <input
      :id="id"
      v-model="model"
      v-bind="$attrs"
      :required="required"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script setup>
const model = defineModel({ type: [String, Number], default: '' })

const props = defineProps({
  label: { type: String, default: '' },
  required: { type: Boolean, default: false },
  id: { type: String, default: () => `input-${Math.random().toString(36).slice(2, 9)}` },
})

</script>
