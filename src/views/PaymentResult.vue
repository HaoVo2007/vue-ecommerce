<!-- src/views/PaymentResult.vue -->
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const status = computed(() => route.meta.status || 'cancelled')
// VNPAY thường trả về vnp_TxnRef
const txnRef = computed(() => route.query.vnp_TxnRef || route.query.txn_ref || '')

const goHome = () => router.push({ name: 'home' })
const retryPayment = () => router.push({ name: 'checkout' })
const viewOrder = () => router.push({ name: 'cart' })
</script>

<template>

    <body class="min-h-screen flex items-center justify-center gradient-bg">
        <div class="w-full max-w-md mx-4">
            <!-- Success Status -->
            <div id="successResult" v-if="status === 'success'" class="rounded-2xl shadow-xl p-8 bg-white text-center">
                <div class="w-24 h-24 success-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-check text-white text-4xl"></i>
                </div>
                <h1 class="text-3xl font-bold mb-3 text-gray-800">
                    Payment successful!
                </h1>
                <p class="text-gray-600 mb-6">Thank you for trusting and using our services.</p>

                <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-6 text-left">
                    <div class="flex items-center">
                        <i class="fas fa-info-circle text-green-400 mr-3"></i>
                        <div>
                            <p class="text-sm font-medium text-green-800">Reference code</p>
                            <p class="font-mono text-lg font-bold text-green-900" id="successTxnRef">{{ txnRef }}</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <button @click="goHome()"
                        class="w-full success-gradient text-white py-3 px-6 rounded-xl font-semibold">
                        <i class="fas fa-home mr-2"></i>Back to home page
                    </button>
                    <button @click="viewOrder()"
                        class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold">
                        <i class="fas fa-receipt mr-2"></i>View orders
                    </button>
                </div>
            </div>

            <!-- Error Status -->
            <div id="errorResult" v-if="status === 'failed'" class="rounded-2xl shadow-xl p-8 bg-white text-center">
                <div class="w-24 h-24 error-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-times text-white text-4xl"></i>
                </div>
                <h1 class="text-3xl font-bold mb-3 text-gray-800">
                    Payment failed!
                </h1>
                <p class="text-gray-600 mb-6">An error occurred during payment. Please try again.</p>

                <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6 text-left">
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-red-400 mr-3"></i>
                        <div>
                            <p class="text-sm font-medium text-red-800">Reference code</p>
                            <p class="font-mono text-lg font-bold text-red-900" id="errorTxnRef">{{ txnRef }}</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <button @click="retryPayment()"
                        class="w-full error-gradient text-white py-3 px-6 rounded-xl font-semibold">
                        <i class="fas fa-redo mr-2"></i>Retry payment
                    </button>
                    <button @click="goHome()"
                        class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold">
                        <i class="fas fa-home mr-2"></i>Back to home page
                    </button>
                </div>
            </div>

            <!-- Cancelled Status -->
            <div id="cancelledResult" v-if="status === 'cancelled'"
                class="rounded-2xl shadow-xl p-8 bg-white text-center">
                <div class="w-24 h-24 cancelled-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-ban text-white text-4xl"></i>
                </div>
                <h1 class="text-3xl font-bold mb-3 text-gray-800">
                    Payment canceled
                </h1>
                <p class="text-gray-600 mb-6">You have canceled your payment. You can try again at any time.</p>

                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
                    <div class="flex items-center">
                        <i class="fas fa-clock text-yellow-400 mr-3"></i>
                        <div>
                            <p class="text-sm font-medium text-yellow-800">Reference code</p>
                            <p class="font-mono text-lg font-bold text-yellow-900" id="cancelledTxnRef">{{ txnRef }}</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <button @click="retryPayment()"
                        class="w-full cancelled-gradient text-white py-3 px-6 rounded-xl font-semibold">
                        <i class="fas fa-credit-card mr-2"></i>Payment again
                    </button>
                    <button @click="goHome()"
                        class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold">
                        <i class="fas fa-home mr-2"></i>Back to home page
                    </button>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
    .gradient-bg {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .success-gradient {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .error-gradient {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .cancelled-gradient {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }
</style>