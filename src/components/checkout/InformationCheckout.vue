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
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-user mr-3 text-blue-600"></i>
                Delivery information
            </h2>

            <div class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Full name *</label>
                        <input v-model="form.fullName" type="text" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Phone number *</label>
                        <input v-model="form.phone" type="tel" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                    <input v-model="form.email" type="email"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Specific address *</label>
                    <textarea v-model="form.address" required rows="3"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
            </div>
        </div>

        <!-- Phương thức thanh toán -->
        <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-credit-card mr-3 text-green-600"></i>
                Payment method
            </h2>

            <div class="space-y-4">
                <!-- VNPay -->
                <div class="payment-method border-2 rounded-lg p-4 cursor-pointer"
                    :class="form.paymentMethod === 'vnpay' ? 'border-blue-500' : 'border-gray-200'">
                    <div class="flex items-center">
                        <input v-model="form.paymentMethod" type="radio" id="vnpay" name="payment" value="vnpay"
                            class="mr-4 text-blue-600" />
                        <label for="vnpay" class="flex-1 cursor-pointer">
                            <div class="flex items-center">
                                <div class="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold mr-3">VNPay
                                </div>
                                <span class="font-medium">Payment via VNPay</span>
                            </div>
                            <p class="text-sm text-gray-600 ml-16">Secure payment via VNPay</p>
                        </label>
                    </div>
                </div>

                <!-- COD -->
                <div class="payment-method border-2 rounded-lg p-4 cursor-pointer"
                    :class="form.paymentMethod === 'cod' ? 'border-green-500' : 'border-gray-200'">
                    <div class="flex items-center">
                        <input v-model="form.paymentMethod" type="radio" id="cod" name="payment" value="cod"
                            class="mr-4 text-green-600" />
                        <label for="cod" class="flex-1 cursor-pointer">
                            <div class="flex items-center">
                                <div class="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold mr-3">COD
                                </div>
                                <span class="font-medium">Cash on Delivery</span>
                            </div>
                            <p class="text-sm text-gray-600 ml-16">Pay when receiving goods</p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
