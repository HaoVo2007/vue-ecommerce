<script setup>
import Rating from '@/components/Rating.vue'
import SelectSize from '@/components/SelectSize.vue'
import { ref } from 'vue'
import AddToCart from './AddToCart.vue'
const props = defineProps({
    product: Object
})
const selectSize = ref(null)
const handleSelectSize = (size) => {
    selectSize.value = size
}
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(price)
}
</script>

<template>
    <div class="space-y-6">
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.product_name }}</h1>
            <p class="text-gray-600">CATEGORY - {{ product.category.category_name }}</p>
        </div>

        <div class="flex items-center space-x-2">
            <Rating :rating="product.rating_average" />
            <span class="text-sm text-gray-500">({{ product.reviews_count }} reviews)</span>
        </div>

        <!-- Price -->
        <div class="space-y-2">
            <div class="flex items-center space-x-3">
                <span class="text-3xl font-bold text-red-600">{{ formatPrice(product.price - (product.price * product.discount) / 100) }}</span>
                <span class="text-xl text-gray-500 line-through">{{ formatPrice(product.price) }}</span>
                <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">{{ product.discount }}%
                    OFF</span>
            </div>
            <p class="text-green-600 font-medium">✓ Free shipping nationwide</p>
        </div>

        <!-- Size Selection -->
        <div>
            <h3 class="text-lg font-semibold mb-3">Select size:</h3>
            <SelectSize :size="product.sizes" :selectedSize="selectSize" @selectSize="handleSelectSize" />
        </div>

        <!-- Hiển thị số lượng còn lại -->
        <div v-if="selectSize" class="text-gray-700">
            Remaining quantity: <strong>{{ selectSize.stock }}</strong>
        </div>

        <!-- Product Features -->
        <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-3">Highlights:</h3>
            <ul class="space-y-2 text-gray-700">
                <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Ultra-light Flyknit technology</li>
                <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> AG studs suitable for natural grass pitches</li>
                <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Aerodynamic design increases speed</li>
                <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> IPX4 waterproof</li>
            </ul>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
            <AddToCart :product="product" :user="user" :selectedSize="selectSize" />
            <button
                class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Buy now
            </button>
            <button
                class="w-full border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-500 font-semibold py-3 px-6 rounded-lg transition-colors">
                <i class="far fa-heart mr-2"></i>Favourite
            </button>
        </div>
    </div>
</template>