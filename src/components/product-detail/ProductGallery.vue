<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    product: Object
})

const selectedImage = ref('')

watch(
    () => props.product,
    (newProduct) => {
        if (newProduct?.main_image) {
            selectedImage.value = newProduct.main_image
        }
    },
    { immediate: true }
)
const handleImageClick = (image) => {
    selectedImage.value = image
}

</script>

<template>
    <div class="space-y-4">
        <!-- Main Image -->
        <div class="p-8 rounded-t-lg shadow">
            <img id="mainImage" :src="selectedImage" :alt="product.product_name" class="w-full h-125 object-cover">
        </div>

        <!-- Thumbnail Images -->
        <div class="flex space-x-3">
            <div class="border-1 hover:border-blue-500 thumbnail-active rounded-lg overflow-hidden cursor-pointer">
                <img :src="product.main_image" :alt="product.product_name" @click="handleImageClick(product.main_image)"
                    class="w-30 h-30 object-cover">
            </div>
            <div v-for="image in product.sub_image" :key="image"
                class="border-1 hover:border-blue-500 thumbnail-active rounded-lg overflow-hidden cursor-pointer">
                <img :src="image.url" :alt="product.product_name" @click="handleImageClick(image.url)"
                    class="w-30 h-30 object-cover">
            </div>
        </div>
    </div>
</template>