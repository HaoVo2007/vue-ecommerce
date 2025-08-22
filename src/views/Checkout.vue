<script setup>
import InformationCheckout from '@/components/checkout/InformationCheckout.vue';
import SummaryCheckout from '@/components/checkout/SummaryCheckout.vue';
import { useCartStore } from '@/composables/cartStore'
import { ENV } from '@/config/env'
import axios from 'axios'
import { ref } from 'vue'

const cartStore = useCartStore()
const formData = ref({})

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
        alert("You need to login first")
        return
    }

    const { fullName, phone, email, address, paymentMethod } = formData.value
    if (!fullName || !phone || !address) {
        alert("Please fill all required fields")
        return
    }

    const payload = {
        user_id: user.id,
        name: fullName,
        phone,
        email,
        address,
        coupon_code: cartStore.coupon ? cartStore.coupon.name : null,
    }
    console.log(payload)
    try {
        if (paymentMethod === "cod") {
            const res = await axios.post(`${ENV.API_BASE_URL}/api/v1/order`, payload)
            alert("Order created successfully: " + res.data.data.order_id)
            window.location.href = "/payment/success"
        } else if (paymentMethod === "vnpay") {
            const resOrder = await axios.post(`${ENV.API_BASE_URL}/api/v1/order`, payload)
            const resPayment = await axios.post(`${ENV.API_BASE_URL}/api/v1/payment/vnpay`, {
                "order_id": resOrder.data.data,
                "return_url": `${ENV.API_BASE_URL}/api/v1/payment/vnpay/callback`,
                "bank_code": "",
                "locale": "vn",
                "order_info": "Test payment",

            })
            window.location.href = resPayment.data.data
        }
    } catch (e) {
        console.error(e)
        alert("Order failed!")
    }
}
</script>

<template>

    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-8">
        <div class="p-10">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Order payment</h1>
                <p class="text-gray-600">Please fill in the information to complete the order</p>
            </div>

            <div class="grid lg:grid-cols-3 gap-8 ml-20 mr-20">
                <InformationCheckout @updateForm="formData = $event" />
                <SummaryCheckout :cartItems="cartStore.items" :coupon="cartStore.coupon" @orderNow="orderNow" />
            </div>
        </div>
    </body>
</template>
