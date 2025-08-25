<script setup>
import { reactive } from 'vue'
import { watch } from 'vue'

const props = defineProps({
    modelValue: Object
})

const emit = defineEmits(['update:modelValue'])

const form = reactive({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cod',
    ...props.modelValue,
})

watch(form, () => {
    emit('update:modelValue', { ...form })
}, { deep: true })

</script>

<template>
    <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <i class="fas fa-user mr-2 sm:mr-3 text-blue-600 text-sm sm:text-base"></i>
                <span class="text-sm sm:text-base">Delivery information</span>
            </h2>

            <div class="space-y-3 sm:space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Full name
                            *</label>
                        <input v-model="form.fullName" type="text" required
                            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" />
                    </div>
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone number
                            *</label>
                        <input v-model="form.phone" type="tel" required
                            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" />
                    </div>
                </div>

                <div>
                    <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">E-mail *</label>
                    <input v-model="form.email" type="email"
                        class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" />
                </div>

                <div>
                    <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Specific address
                        *</label>
                    <textarea v-model="form.address" required rows="3"
                        class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none"></textarea>
                </div>
            </div>
        </div>

        <!-- Phương thức thanh toán -->
        <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <i class="fas fa-credit-card mr-2 sm:mr-3 text-green-600 text-sm sm:text-base"></i>
                <span class="text-sm sm:text-base">Payment method</span>
            </h2>

            <div class="space-y-3 sm:space-y-4">
                <!-- VNPay -->
                <div class="payment-method border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200"
                    :class="form.paymentMethod === 'vnpay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'">
                    <div class="flex items-start sm:items-center">
                        <input v-model="form.paymentMethod" type="radio" id="vnpay" name="payment" value="vnpay"
                            class="mr-3 sm:mr-4 text-blue-600 mt-1 sm:mt-0 flex-shrink-0" />
                        <label for="vnpay" class="flex-1 cursor-pointer">
                            <div class="flex items-start sm:items-center flex-col sm:flex-row">
                                <div
                                    class="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold mb-2 sm:mb-0 sm:mr-3">
                                    VNPay
                                </div>
                                <span class="font-medium text-sm sm:text-base">Payment via VNPay</span>
                            </div>
                            <p class="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-0 sm:ml-0">Secure payment via VNPay
                            </p>
                        </label>
                    </div>
                </div>

                <!-- COD -->
                <div class="payment-method border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200"
                    :class="form.paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'">
                    <div class="flex items-start sm:items-center">
                        <input v-model="form.paymentMethod" type="radio" id="cod" name="payment" value="cod"
                            class="mr-3 sm:mr-4 text-green-600 mt-1 sm:mt-0 flex-shrink-0" />
                        <label for="cod" class="flex-1 cursor-pointer">
                            <div class="flex items-start sm:items-center flex-col sm:flex-row">
                                <div
                                    class="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold mb-2 sm:mb-0 sm:mr-3">
                                    COD
                                </div>
                                <span class="font-medium text-sm sm:text-base">Cash on Delivery</span>
                            </div>
                            <p class="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-0 sm:ml-0">Pay when receiving goods
                            </p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
