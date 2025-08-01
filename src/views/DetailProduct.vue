<script setup>
import { onMounted } from 'vue';
import { ENV } from '@/config/env';
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router'
import axios from 'axios';
import ProductGallery from '@/components/ProductGallery.vue';
import ProductInfor from '@/components/ProductInfor.vue';
const productID = useRoute().params.id

const product = ref({})
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
        toast.error('Failed to fetch products:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchProduct()
})

</script>

<template>
    <div class="sm:p-20 p-5 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <ProductGallery :product="product" />
        <ProductInfor :product="product" />
    </div>
</template>