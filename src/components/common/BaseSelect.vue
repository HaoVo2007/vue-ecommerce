<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="id"
      v-model="model"
      v-bind="$attrs"
      :required="required"
      :class="[
        'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500',
        $attrs.class
      ]"
    >
      <slot />
    </select>
  </div>
</template>

<script setup>
const model = defineModel({ type: [String, Number], default: '' })

const props = defineProps({
  label: { type: String, default: '' },
  required: { type: Boolean, default: false },
  id: { type: String, default: () => `select-${Math.random().toString(36).slice(2, 9)}` },
})
</script>
