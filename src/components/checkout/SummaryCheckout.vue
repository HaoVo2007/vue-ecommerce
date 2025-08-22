<script setup>
import { computed } from 'vue'
const props = defineProps({
    cartItems: {
        type: Array,
        required: true,
    },
    coupon: {
        type: Object,
        default: null, // ✅ mặc định là null nếu không có coupon
    },
})

const emit = defineEmits(['orderNow'])

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price || 0)
}

// ✅ tính tổng tiền gốc
const subtotal = computed(() =>
    props.cartItems.reduce((total, item) => total + item.total_price, 0)
)

// ✅ tính discount nếu có coupon
const discountAmount = computed(() => {
    if (props.coupon && props.coupon.discount) {
        return (subtotal.value * props.coupon.discount) / 100
    }
    return 0
})

// ✅ tính tổng sau giảm
const total = computed(() => subtotal.value - discountAmount.value)
</script>

<template>
    <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-shopping-cart mr-3 text-orange-600"></i>
                Your order
            </h2>

            <!-- Danh sách sản phẩm -->
            <div class="space-y-4 mb-6">
                <div v-for="item in cartItems" :key="item.product_id"
                    class="flex items-center justify-between py-3 border-b border-gray-100">
                    <div class="flex items-center">
                        <div class="w-20 h-20 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                            <img :src="item.image_url" :alt="item.product_name" class="w-15 h-15" />
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">{{ item.product_name }}</p>
                            <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                        </div>
                    </div>
                    <span class="font-semibold text-gray-800">{{
                        formatPrice(item.price * item.quantity)
                    }}</span>
                </div>
            </div>

            <!-- Mã giảm giá -->
            <div class="mb-6" v-if="coupon && coupon.discount">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="font-semibold text-gray-800 flex items-center">
                        <i class="fas fa-tags mr-2 text-red-500"></i>
                        Discount code
                    </h3>
                </div>

                <div id="appliedCoupons" class="space-y-2">
                    <div
                        class="coupon-item bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-percent text-white text-xs"></i>
                            </div>
                            <div>
                                <p class="font-semibold text-green-700 text-sm">
                                    {{ coupon.name }}
                                </p>
                                <p class="text-xs text-green-600">
                                    Discount {{ coupon.discount }}% for all products
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <span class="text-green-700 font-semibold text-sm mr-2">- {{ formatPrice(discountAmount)
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tổng tiền -->
            <div class="space-y-3 mb-6">
                <div class="flex justify-between text-gray-600">
                    <span>Temporary calculation:</span>
                    <span id="subtotal">{{ formatPrice(subtotal) }}</span>
                </div>

                <div v-if="coupon && coupon.discount" class="flex justify-between text-green-600">
                    <span>Product discount:</span>
                    <span id="productDiscount">- {{ formatPrice(discountAmount) }}</span>
                </div>

                <div class="flex justify-between text-gray-600">
                    <span>Shipping fee:</span>
                    <span id="shippingFee" class="line-through">30.000₫</span>
                </div>
                <div class="flex justify-between text-blue-600">
                    <span>Free shipping:</span>
                    <span id="shippingDiscount">- 30.000₫</span>
                </div>

                <div class="border-t pt-3">
                    <div class="flex justify-between text-lg font-bold text-gray-800">
                        <span>Total:</span>
                        <span id="totalAmount" class="text-red-600">{{
                            formatPrice(total)
                        }}</span>
                    </div>
                    <p v-if="discountAmount > 0" class="text-xs text-green-600 text-right mt-1">
                        Save: {{ formatPrice(discountAmount) }}
                    </p>
                </div>
            </div>

            <!-- Nút đặt hàng -->
            <button id="placeOrder" @click="emit('orderNow')" 
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold
                text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                shadow-lg"
                >
                <i class="fas fa-check-circle mr-2"></i>
                Order now
            </button>

            <p class="text-xs text-gray-500 text-center mt-4">
                By placing an order, you agree to
                <a href="#" class="text-blue-600 hover:underline">Terms of use</a>
            </p>
        </div>
    </div>
</template>
