<script setup>
import Rating from '../Rating.vue';
import Review from '../Review.vue';

const props = defineProps({
    product: Object,
    reviews: {
        type: Array,  
        default: () => []
    }
})

</script>

<template>
    <div class="bg-white rounded-lg shadow-lg p-6 mb-16">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Product Reviews</h2>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Write a review
            </button>
        </div>

        <!-- Rating Summary -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="text-center">
                <div class="text-4xl font-bold text-yellow-500 mb-2">
                    {{ product?.rating_average || '0' }}
                </div>
                <div class="flex justify-center star-rating text-xl mb-2">
                    <Rating :rating="product?.rating_average || 0" />
                </div>
                <p class="text-gray-600">Based on {{ product?.rating_count || 0 }} reviews</p>
            </div>
            <div class="space-y-2">
                <div class="flex items-center space-x-2">
                    <span class="text-sm w-8">5⭐</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-400 h-2 rounded-full" style="width: 65%"></div>
                    </div>
                    <span class="text-sm text-gray-600 w-8">83</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm w-8">4⭐</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-400 h-2 rounded-full" style="width: 25%"></div>
                    </div>
                    <span class="text-sm text-gray-600 w-8">32</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm w-8">3⭐</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-400 h-2 rounded-full" style="width: 8%"></div>
                    </div>
                    <span class="text-sm text-gray-600 w-8">10</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm w-8">2⭐</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-400 h-2 rounded-full" style="width: 2%"></div>
                    </div>
                    <span class="text-sm text-gray-600 w-8">2</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm w-8">1⭐</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-400 h-2 rounded-full" style="width: 1%"></div>
                    </div>
                    <span class="text-sm text-gray-600 w-8">1</span>
                </div>
            </div>
        </div>

        <!-- Reviews List -->
        <div class="space-y-6">
            <div v-if="!reviews || reviews.length === 0" class="text-center py-8 text-gray-500">
                No reviews yet
            </div>
            <Review 
                v-else
                v-for="review in reviews" 
                :key="review.id" 
                :review="review" 
            />
        </div>

        <div class="text-center mt-6" v-if="reviews && reviews.length > 0">
            <button class="text-blue-600 hover:text-blue-700 font-medium">
                See more reviews
            </button>
        </div>
    </div>
</template>