<script setup>
import InformationCheckout from '@/components/checkout/InformationCheckout.vue';
import SummaryCheckout from '@/components/checkout/SummaryCheckout.vue';
import { useCartStore } from '@/composables/cartStore'
import { useToast } from 'vue-toastification'
import { ENV } from '@/config/env'
import axios from 'axios'
import { ref } from 'vue'

const cartStore = useCartStore()

const toast = useToast();

const formData = ref({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cod'
})

const loading = ref(false)

const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user')
        return userStr && userStr !== 'null' ? JSON.parse(userStr) : null
    } catch {
        return null
    }
}

const orderNow = async () => {
    const user = getCurrentUser()
    if (!user) {
        toast.error("You need to login first")
        return
    }

    const { fullName, phone, email, address, paymentMethod } = formData.value
    if (!fullName || !phone || !address) {
        toast.error("Please fill all required fields")
        return
    }

    const payload = {
        user_id: user.id,
        name: fullName,
        type: paymentMethod,
        phone: phone,
        email: email,
        address: address,
        coupon_code: cartStore.coupon ? cartStore.coupon.code_coupon : null,
    }
    loading.value = true
    try {
        if (paymentMethod === "cod") {
            const res = await axios.post(`${ENV.API_BASE_URL}/api/v1/order`, payload)
            toast.success("Order created successfully: " + res.data.data.order_id)
            window.location.href = "/payment/success"
        } else if (paymentMethod === "vnpay") {
            const resOrder = await axios.post(`${ENV.API_BASE_URL}/api/v1/order`, payload)
            const resPayment = await axios.post(`${ENV.API_BASE_URL}/api/v1/payment/vnpay`, {
                "order_id": resOrder.data.data,
                "return_url": `${ENV.API_BASE_URL}/api/v1/payment/vnpay/callback/aaaa/`,
                "bank_code": "",
                "locale": "vn",
                "order_info": "Test payment",

            })
            window.location.href = resPayment.data.data
        }
    } catch (e) {
        console.error(e)
        toast.error("Order failed!")
    } finally {
        loading.value = false
    }
}
</script>

<template>

    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-4 sm:py-8">
        <div class="px-4 sm:px-6 lg:px-10">
            <div class="text-center mb-4 sm:mb-8">
                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Order payment</h1>
                <p class="text-sm sm:text-base text-gray-600">Please fill in the information to complete the order</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                <InformationCheckout v-model="formData" />
                <SummaryCheckout :cartItems="cartStore.items" :loading="loading" :coupon="cartStore.coupon" @orderNow="orderNow" />
            </div>
        </div>
    </body>
</template>