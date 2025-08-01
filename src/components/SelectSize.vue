<script setup>
const props = defineProps({
    size: [],
})
const emit = defineEmits(['selectSize'])
</script>

<template>
    <div class="grid grid-cols-6 gap-2">
        <button
            v-for="size in props.size"
            :key="size"
            class="border-2 border-gray-300 hover:border-blue-500 px-3 py-2 rounded text-center font-medium transition-colors"
            @click="emit('selectSize', size.size)">{{ size.size }}</button>
    </div>
</template>