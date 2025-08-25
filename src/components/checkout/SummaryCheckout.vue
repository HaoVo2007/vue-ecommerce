<script setup>
import { computed } from 'vue'
import SubmitButton from '../SubmitButton.vue'
const props = defineProps({
    cartItems: {
        type: Array,
        required: true,
    },
    coupon: {
        type: Object,
        default: null, // ✅ mặc định là null nếu không có coupon
    },
    loading: {
        type: Boolean,
        default: false,
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
        <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <i class="fas fa-shopping-cart mr-2 sm:mr-3 text-orange-600 text-sm sm:text-base"></i>
                <span class="text-sm sm:text-base">Your order</span>
            </h2>

            <!-- Danh sách sản phẩm -->
            <div class="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-64 sm:max-h-80 overflow-y-auto">
                <div v-for="item in cartItems" :key="item.product_id"
                    class="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                    <div class="flex items-center flex-1 min-w-0">
                        <div
                            class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0">
                            <img :src="item.image_url" :alt="item.product_name"
                                class="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-lg" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <p class="font-medium text-gray-800 text-xs sm:text-sm truncate">{{ item.product_name }}</p>
                            <p class="text-xs text-gray-600">Qty: {{ item.quantity }}</p>
                        </div>
                    </div>
                    <span class="font-semibold text-gray-800 text-xs sm:text-sm ml-2 flex-shrink-0">{{
                        formatPrice(item.price * item.quantity)
                        }}</span>
                </div>
            </div>

            <!-- Mã giảm giá -->
            <div class="mb-4 sm:mb-6" v-if="coupon && coupon.discount">
                <div class="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 class="font-semibold text-gray-800 flex items-center text-sm sm:text-base">
                        <i class="fas fa-tags mr-1 sm:mr-2 text-red-500 text-xs sm:text-sm"></i>
                        <span class="text-xs sm:text-sm">Discount code</span>
                    </h3>
                </div>

                <div id="appliedCoupons" class="space-y-2">
                    <div
                        class="coupon-item bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 flex items-center justify-between">
                        <div class="flex items-center flex-1 min-w-0">
                            <div
                                class="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                                <i class="fas fa-percent text-white text-xs"></i>
                            </div>
                            <div class="min-w-0">
                                <p class="font-semibold text-green-700 text-xs sm:text-sm truncate">
                                    {{ coupon.name }}
                                </p>
                                <p class="text-xs text-green-600">
                                    Discount {{ coupon.discount }}%
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center ml-2">
                            <span class="text-green-700 font-semibold text-xs sm:text-sm">- {{
                                formatPrice(discountAmount) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tổng tiền -->
            <div class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div class="flex justify-between text-gray-600 text-xs sm:text-sm">
                    <span>Temporary calculation:</span>
                    <span id="subtotal">{{ formatPrice(subtotal) }}</span>
                </div>

                <div v-if="coupon && coupon.discount" class="flex justify-between text-green-600 text-xs sm:text-sm">
                    <span>Product discount:</span>
                    <span id="productDiscount">- {{ formatPrice(discountAmount) }}</span>
                </div>

                <div class="flex justify-between text-gray-600 text-xs sm:text-sm">
                    <span>Shipping fee:</span>
                    <span id="shippingFee" class="line-through">30.000₫</span>
                </div>
                <div class="flex justify-between text-blue-600 text-xs sm:text-sm">
                    <span>Free shipping:</span>
                    <span id="shippingDiscount">- 30.000₫</span>
                </div>

                <div class="border-t pt-2 sm:pt-3">
                    <div class="flex justify-between text-base sm:text-lg font-bold text-gray-800">
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

            <SubmitButton :loading="loading" text="Order now" @click="emit('orderNow')"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-lg font-semibold
                text-sm sm:text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                shadow-lg active:scale-95">
                <template #default>
                    <i class="fas fa-check-circle mr-1 sm:mr-2"></i>
                </template>
            </SubmitButton>

            <p class="text-xs text-gray-500 text-center mt-3 sm:mt-4">
                By placing an order, you agree to
                <a href="#" class="text-blue-600 hover:underline">Terms of use</a>
            </p>
        </div>
    </div>
</template>