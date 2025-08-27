<template>
    <div class="bg-white rounded-lg shadow flex flex-col p-4 gap-4 hover:shadow-md transition-all">
        
        <router-link :to="`/product/${product.id}`" class="relative w-full h-56 bg-gray-100 rounded-lg overflow-hidden">
            <img :src="product.main_image" :alt="product.product_name" class="w-full h-full object-cover"
                loading="lazy" />
            <div v-if="Number(product.discount) > 0"
                class="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                -{{ product.discount }}%
            </div>
        </router-link>

        <div class="flex-1">
            <div class="flex flex-col sm:flex-row justify-between gap-2">
                <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-800 mb-1 line-clamp-2">
                        <router-link :to="`/product/${product.id}`" class="hover:underline">
                            {{ product.product_name }}
                        </router-link>
                    </h3>

                    <p class="text-blue-500 font-medium text-sm mb-2">
                        <span v-if="product.brand">{{ product.brand }} • </span>{{ product.category?.category_name }}
                    </p>
                </div>

                <div class="text-right mt-2 sm:mt-0 flex-shrink-0">
                    <div class="mb-2">
                        <span class="text-lg font-bold text-gray-800 block">
                            {{ formatPrice(finalPrice) }}
                        </span>
                        <span v-if="Number(product.discount) > 0" class="text-sm text-gray-400 line-through">
                            {{ formatPrice(product.price) }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex items-center">
                <Rating :rating="product.rating_average" />
                <span class="text-sm text-gray-600 ml-2">
                    ({{ product.reviews_count }} reviews)
                </span>
            </div>
        </div>

        <div v-if="hasSizes" class="flex items-center flex-wrap gap-2">
            <span v-for="s in sizesToShow" :key="s.size"
                class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded border border-gray-200"
                :title="`Còn ${s.stock} sp`">
                Size {{ s.size }}
            </span>

            <span v-if="remainingSizesCount > 0"
                class="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-dashed border-gray-300"
                :title="`Còn ${remainingSizesCount} size khác`">
                +{{ remainingSizesCount }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import Rating from './Rating.vue'
const props = defineProps({
    product: { type: Object, required: true },
})

const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price) || 0)

const finalPrice = computed(() => {
    const price = Number(props.product?.price) || 0
    const discount = Number(props.product?.discount) || 0
    return price - (price * discount) / 100
})

const hasSizes = computed(() => Array.isArray(props.product?.sizes) && props.product.sizes.length > 0)
const sizesToShow = computed(() => (props.product?.sizes || []).slice(0, 3))
const remainingSizesCount = computed(() => Math.max((props.product?.sizes?.length || 0) - 3, 0))
</script>
