<script setup>
import Rating from '../components/Rating.vue';

const props = defineProps({
    review: {
        type: Object,
        required: true
    }
})

// Format date helper
const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
}
</script>

<template>
    <div class="border-b pb-6">
        <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {{ review.user_info?.full_name?.charAt(0) || review.user_name?.charAt(0) || '?' }}
            </div>
            <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                    <h4 class="font-semibold">
                        {{ review.user_info?.full_name || review.user_name || 'Anonymous' }}
                    </h4>
                    <div class="flex star-rating text-sm">
                        <Rating :rating="review.rating || 0" />
                    </div>
                    <span class="text-gray-500 text-sm">
                        {{ formatDate(review.created_at) }}
                    </span>
                </div>
                <p class="text-gray-700 mb-2">{{ review.review || review.comment || 'No comment' }}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <button class="hover:text-blue-600">
                        <i class="far fa-thumbs-up mr-1"></i>
                        Useful ({{ review.helpful_count || 0 }})
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>