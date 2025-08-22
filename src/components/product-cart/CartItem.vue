<script setup>
const props = defineProps({
    cartItems: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['removeItem', 'decrementItem', 'incrementItem'])
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price)
}
</script>

<template>
    <div
        class="mx-auto w-full flex-none p-5 border border-gray-200 bg-gray-50 h-auto dark:border-gray-700 dark:bg-gray-800 lg:max-w-2xl xl:max-w-4xl">
        <div class="space-y-6 mb-2" v-for="item in cartItems" :key="item.id">
            <div
                class="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <button type="button"
                    @click="emit('removeItem', item)"
                    class="absolute bottom-4 right-8 inline-flex items-center justify-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                </button>
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="" class="shrink-0 md:order-1">
                        <img class="h-20 w-20 dark:hidden" :src="item.image_url" alt="imac image" />
                        <img class="hidden h-20 w-20 dark:block"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                            alt="imac image" />
                    </a>

                    <label for="counter-input" class="sr-only">Choose quantity:</label>
                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                        <div class="flex items-center">
                            <button type="button" @click="emit('decrementItem', item)" data-input-counter-decrement="counter-input"
                                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input type="text" id="counter-input" data-input-counter
                                class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                placeholder="" :value="item.quantity" required />
                            <button type="button" @click="emit('incrementItem', item)" data-input-counter-increment="counter-input"
                                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                        <div class="text-end md:order-4 md:w-32">
                            <p class="text-base font-bold text-gray-900 dark:text-white">{{ formatPrice(item.total_price) }}
                            </p>
                        </div>
                    </div>

                    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">PC
                            {{ item.product_name }}</a>

                        <div class="flex items-center gap-4 mt-1">
                            <div class="flex items-center justify-center gap-1">
                                <strong class="text-gray-900 dark:text-white">Size:</strong>
                                <label for="size" class="block text-sm font-medium text-gray-900 dark:text-white">{{
                                    item.size }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>