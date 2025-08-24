
<script setup>
const props = defineProps({
  status: { type: String, required: true }
})

const MAP = {
  pending: { cls: 'bg-yellow-100 text-yellow-800 border border-yellow-200', icon: 'fas fa-clock' },
  success: { cls: 'bg-green-100 text-green-800 border border-green-200', icon: 'fas fa-check' },
  fail:    { cls: 'bg-red-100 text-red-800 border border-red-200', icon: 'fas fa-times' },
  failed:  { cls: 'bg-red-100 text-red-800 border border-red-200', icon: 'fas fa-times' },
}
const ui = MAP[props.status] || { cls: 'bg-gray-100 text-gray-700 border border-gray-200', icon: 'fas fa-question-circle' }
const pretty = (s='') => s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
</script>

<template>
  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="ui.cls">
    <i :class="[ui.icon, 'mr-1']"></i>
    {{ pretty(status) }}
  </span>
</template>
