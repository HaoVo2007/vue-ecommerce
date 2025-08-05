<script setup>
import Rating from './Rating.vue'
const props = defineProps({
    product: Object
})
</script>

<template>
    <div
        class="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div class="relative group">
            <img :src="product.main_image" :alt="product.product_name" class="h-64 w-full object-cover" />

            <div
                class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <router-link :to="`/product/${product.id}`">
                    <button
                        class="bg-white text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                        View Details
                    </button>
                </router-link>
            </div>
        </div>

        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">

            </h3>

            <p class="text-sm text-gray-500 mb-3 uppercase tracking-wide">
                {{ product.product_name }}
            </p>

            <div class="flex items-center space-x-2 mb-4">
                <span class="text-2xl font-bold text-red-600">
                    {{ product.price - (product.price * product.discount) / 100 }}
                </span>

                <span class="text-lg text-gray-400 line-through">
                    {{ product.price }}
                </span>

                <span class="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {{ product.discount }}% OFF
                </span>
            </div>


            <div class="flex items-center space-x-2">
                <Rating :rating="product.rating_average" />
                <span class="text-sm text-gray-500">({{ product.reviews_count }} reviews)</span>
            </div>
        </div>
    </div>
</template>