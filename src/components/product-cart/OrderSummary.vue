<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/composables/cartStore'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import { ENV } from '@/config/env'
import SubmitButton from '../SubmitButton.vue'

const cartStore = useCartStore()
const couponCode = ref('')
const toast = useToast();
const loading = ref(false)

const props = defineProps({
    cartItems: {
        type: Array,
        required: true
    }
})

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price)
}

const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user')
        return userStr && userStr !== 'null' ? JSON.parse(userStr) : null
    } catch {
        return null
    }
}

const applyCoupon = async () => {
    const user = getCurrentUser()
    if (!user?.id) {
        return
    }
    try {
        loading.value = true
        const response = await axios.post(`${ENV.API_BASE_URL}/api/v1/coupon/can_use_coupon`, {
            "coupon_code": couponCode.value,
            "user_id": user.id,
        })
        const json = response.data
        if (json.status_code == 200) {
            cartStore.coupon = json.data
            cartStore.discount = json.data.discount
            localStorage.setItem('coupon_code', couponCode.value)
            toast.success('Coupon applied successfully')
        }
    } catch (error) {
        cartStore.discount = 0
        cartStore.coupon = null
        localStorage.removeItem('coupon_code')
        toast.error('Coupon is not valid or expired!')
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div
            class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

            <div class="space-y-4">
                <div class="space-y-2">
                    <dl class="flex items-center justify-between gap-4">
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                        <dd class="text-base font-medium text-gray-900 dark:text-white">
                            {{formatPrice(cartItems.reduce((total, item) => total + item.total_price, 0))}}
                        </dd>
                    </dl>

                    <dl class="flex items-center justify-between gap-4" v-if="cartStore.discount > 0">
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Discount</dt>
                        <dd class="text-base font-medium text-green-600">
                            -{{formatPrice((cartItems.reduce((total, item) => total + item.total_price, 0) *
                                cartStore.discount) / 100)}}
                        </dd>
                    </dl>
                </div>

                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd class="text-base font-bold text-gray-900 dark:text-white">
                        {{
                            formatPrice(
                                cartItems.reduce((total, item) => total + item.total_price, 0) -
                                (cartItems.reduce((total, item) => total + item.total_price, 0) * cartStore.discount / 100)
                            )
                        }}
                    </dd>
                </dl>
            </div>
            <router-link to="/checkout">
                <a href="#"
                    class="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Proceed to Checkout
                </a>
            </router-link>
        </div>

        <div
            class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <form class="space-y-4" @submit.prevent="applyCoupon">
                <div>
                    <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Do you have a voucher or gift card?
                    </label>
                    <input v-model="couponCode" type="text" id="voucher"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Enter coupon code" required />
                </div>
                <SubmitButton :loading="loading" text="Apply"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg" />
            </form>
        </div>
    </div>
</template>