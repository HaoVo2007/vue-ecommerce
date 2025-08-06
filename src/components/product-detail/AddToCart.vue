<script setup>
import { ref } from 'vue'
import SubmitButton from '../SubmitButton.vue';
import axios from 'axios';
import { ENV } from '@/config/env';
import { useToast } from "vue-toastification";
const user = JSON.parse(localStorage.getItem('user'))
const toast = useToast();
const props = defineProps({
    product: Object,
    selectedSize: String
})
const loading = ref(false)
const handleAddToCart = async () => {
    loading.value = true
    try {
        const response = await axios.post(`${ENV.API_BASE_URL}/api/v1/cart`, {
            product_id: props.product.id,
            quantity: 1,
            size: props.selectedSize.size,
            user_id: user.id,
        })

        if (response.data?.status_code === 201) {
            toast.success('Added to cart successfully!')
        } else {
            toast.error('Failed to add to cart!')
        }
    } catch (error) {
        console.error('Add to cart error:', error)
        toast.error('Failed to add to cart.')
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <SubmitButton :loading="loading" text="Add to cart" @click="handleAddToCart"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
        <template #default>
            <i class="fas fa-shopping-cart mr-2"></i>
        </template>
    </SubmitButton>
</template>