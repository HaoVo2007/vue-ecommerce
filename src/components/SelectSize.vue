<script setup>
const props = defineProps({
    size: {
        type: Array,
        default: () => []
    },
    selectedSize: Object
})
const emit = defineEmits(['selectSize'])

</script>

<template>
    <div class="grid grid-cols-6 gap-2">
        <button
            v-for="size in props.size"
            :key="size"
            :class="[
                'border-2 px-3 py-2 rounded text-center font-medium transition-colors',
                props.selectedSize?.size === size.size
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-300 hover:border-blue-500']"
            @click="emit('selectSize', size)"
            >
            {{ size.size }}
        </button>
    </div>
</template>