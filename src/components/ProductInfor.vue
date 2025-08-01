<script setup>
import Rating from './Rating.vue'
import { ref } from 'vue'
import SelectSize from './SelectSize.vue';
const props = defineProps({
    product: Object
})
const selectSize = ref(null)
const handleSelectSize = (size) => {
    selectSize.value = size
    console.log(selectSize.value)
}
</script>

<template>
    <div class="space-y-6">
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.product_name }}</h1>
            <p class="text-gray-600">{{ product.product_name }}</p>
        </div>

        <div class="flex items-center space-x-2">
            <Rating :rating="product.rating" />
            <span class="text-sm text-gray-500">({{ product.reviews_count }} reviews)</span>
        </div>

        <!-- Price -->
        <div class="space-y-2">
            <div class="flex items-center space-x-3">
                <span class="text-3xl font-bold text-red-600">{{ product.price - (product.price * product.discount) /
                    100 }}</span>
                <span class="text-xl text-gray-500 line-through">{{ product.price }}</span>
                <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">{{ product.discount }}%
                    OFF</span>
            </div>
            <p class="text-green-600 font-medium">✓ Free shipping nationwide</p>
        </div>

        <!-- Size Selection -->
        <div>
            <h3 class="text-lg font-semibold mb-3">Select size:</h3>
            <SelectSize :size="product.sizes" @selectSize="handleSelectSize" />
        </div>

        <!-- Hiển thị số lượng còn lại -->
        <div v-if="selectedSize" class="text-gray-700">
            Số lượng còn lại: <strong>{{ selectedSize.quantity }}</strong>
        </div>

        <!-- Product Features -->
        <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-3">Đặc điểm nổi bật:</h3>
            <ul class="space-y-2 text-gray-700">
                <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Công nghệ Flyknit
                    siêu nhẹ</li>
                <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Đế đinh AG phù hợp
                    sân cỏ tự nhiên</li>
                <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Thiết kế aerodynamic
                    tăng tốc độ</li>
                <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Chống thấm nước IPX4
                </li>
            </ul>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
            <button
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                <i class="fas fa-shopping-cart mr-2"></i>Thêm vào giỏ hàng
            </button>
            <button
                class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Mua ngay
            </button>
            <button
                class="w-full border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-500 font-semibold py-3 px-6 rounded-lg transition-colors">
                <i class="far fa-heart mr-2"></i>Yêu thích
            </button>
        </div>
    </div>
</template>