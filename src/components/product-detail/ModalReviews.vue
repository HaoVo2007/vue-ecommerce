<script setup>
import { ref } from 'vue'
import SubmitButton from '../SubmitButton.vue'
import { ENV } from '@/config/env'
import axios from 'axios'
const props = defineProps({
    show: Boolean,
    product: Object,
    user: Object
})


const emit = defineEmits(['update:show'])
function closeModal() {
    emit('update:show', false)
}

const rating = ref(1)
const review = ref('')
const loading = ref(false)
const setRating = (value) => {
    rating.value = value
}

const submitReview = async () => {
    loading.value = true
    try {
        const response = await axios.post(`${ENV.API_BASE_URL}/api/v1/review`, {
            "product_id": props.product.id,
            "rating": rating.value,
            "user_id": props.user.id,
            "review": review.value,
        })
        const json = response.data
        if (json.status_code === 201) {
            emit('update:show', false)
            emit('review:added')
        }
    } catch (error) {
        console.error('Failed to submit review:', error)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div v-if="show" class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <!-- Modal Content -->
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full modal-content">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 class="text-2xl font-bold text-gray-800">Product Reviews</h2>
                <button @click="closeModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="p-6 space-y-6">
                <!-- Product Info -->
                <div class="flex items-center space-x-4">
                    <div
                        class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-800">iPhone 15 Pro Max</h3>
                        <p class="text-sm text-gray-500">Titan Tự Nhiên - 256GB</p>
                    </div>
                </div>

                <!-- Rating Section -->
                <div class="text-center">
                    <p class="text-lg font-medium text-gray-700 mb-4">Bạn đánh giá sản phẩm này như thế nào?</p>

                    <!-- Stars -->
                    <div class="flex justify-center space-x-2 mb-4">
                        <svg v-for="n in 5" :key="n" @click="setRating(n)"
                            :class="rating >= n ? 'text-yellow-400' : 'empty'" class="w-10 h-10" data-rating="1"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                    </div>

                    <!-- Rating Text -->
                    <p id="ratingText" class="text-sm text-gray-500 rating-text">Select stars to rate</p>
                </div>

                <!-- Comment Section -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Share your experience
                    </label>
                    <textarea v-model="review" rows="4"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                        placeholder="Please share your thoughts about this product..."></textarea>
                    <p class="text-xs text-gray-400 mt-2">Minimum 10 characters</p>
                </div>
            </div>

            <!-- Footer -->
            <form @submit.prevent="submitReview">
                <div class="flex space-x-3 p-6 border-t border-gray-100">
                    <button @click="closeModal()"
                        class="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-colors duration-200">
                        Cancel
                    </button>
                    <SubmitButton class="flex-1" :loading="loading" text="Submit" @click="submitReview" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.star {
    transition: all 0.2s ease;
    cursor: pointer;
}

.star:hover {
    transform: scale(1.1);
}

.filled {
    color: #fbbf24;
}

.empty {
    color: #d1d5db;
}

.modal-content {
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.rating-text {
    transition: all 0.3s ease;
}
</style>
