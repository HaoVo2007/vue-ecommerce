<script setup>
import axios from 'axios';
import Product from './Product.vue'
import { onMounted } from 'vue';
import { ENV } from '@/config/env';
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import Skeleton from './Skeleton.vue';
const props = defineProps({
    title: String,
    label: String,
    type: String
})
const products = ref([])
const loading = ref(true)
const toast = useToast();
const fetchProduct = async () => {
    try {
        const response = await axios.get(`${ENV.API_BASE_URL}/api/v1/product`)
        const json = response.data
        if (json.status_code === 200) {
            const allProducts = json.data
            const shuffled = allProducts.sort(() => 0.5 - Math.random())
            products.value = shuffled.slice(0, 4)
        }
    } catch (error) {
        console.error('Failed to fetch products:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchProduct()
})
</script>

<template>
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{{ title }}</h2>
                <p class="text-gray-600 text-lg max-w-3xl mx-auto">{{ label }}</p>
            </div>

            <div v-if="type == 'product'" class="flex items-center justify-center">
                <Skeleton v-if="loading" />
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" v-else>
                    <Product v-for="product in products" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
    </section>
</template>
