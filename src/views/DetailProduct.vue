<script setup>
import { onMounted } from 'vue';
import { ENV } from '@/config/env';
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router'
import axios from 'axios';
import ProductGallery from '@/components/product-detail/ProductGallery.vue';
import ProductInfor from '@/components/product-detail/ProductInfor.vue';
import ProductDescription from '@/components/product-detail/ProductDescription.vue';
import ProductReview from '@/components/product-detail/ProductReview.vue';

const productID = useRoute().params.id

const product = ref({})
const reviews = ref([])
const relatedProducts = ref([])
const loading = ref(true)
const toast = useToast();

const fetchProduct = async () => {
    try {
        const response = await axios.get(`${ENV.API_BASE_URL}/api/v1/product/${productID}`)
        const json = response.data
        if (json.status_code === 200) {
            product.value = json.data
        }
    } catch (error) {
        toast.error('Failed to fetch product: ' + error.message)
    } finally {
        loading.value = false
    }
}

const fetchReviews = async () => {
    try {
        const response = await axios.get(`${ENV.API_BASE_URL}/api/v1/review?product_id=${productID}`)
        const json = response.data
        if (json.status_code === 200) {
            reviews.value = json.data.reviews
        }
    } catch (error) {
        console.error('Error fetching reviews:', error)
        toast.error('Failed to fetch reviews: ' + error.message)
    }
}

onMounted(() => {
    fetchProduct()
    fetchReviews()
})
</script>

<template>
    <div class="sm:px-70 sm:py-20 p-5">
        <div v-if="loading" class="text-center py-8">
            <p>Loading...</p>
        </div>
        <div v-else>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <ProductGallery :product="product" />
                <ProductInfor :product="product" />
            </div>
            <ProductDescription :product="product" />

            <ProductReview :reviews="reviews" :product="product" />
    
        </div>
    </div>
</template>
