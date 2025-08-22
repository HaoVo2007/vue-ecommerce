<!-- src/pages/PaymentResult.vue -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const status = route.meta.status // 'success' | 'failed' | 'cancelled'
const txnRef = route.query.txn_ref
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="w-full max-w-md rounded-2xl shadow p-8 bg-white text-center">
            <h1 class="text-2xl font-bold mb-2">
                {{ status === 'success' ? 'Thanh toán thành công' : status === 'cancelled' ? 'Đã hủy thanh toán' :
                'Thanh toán thất bại' }}
            </h1>
            <p class="text-gray-600 mb-6">Mã tham chiếu: <span class="font-mono">{{ txnRef }}</span></p>
            <router-link to="/" class="inline-block px-4 py-2 rounded-xl border hover:bg-gray-100">Về trang
                chủ</router-link>
        </div>
    </div>
</template>
