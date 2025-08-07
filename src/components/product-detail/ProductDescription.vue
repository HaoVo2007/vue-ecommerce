<script setup>
const props = defineProps({
    product: Object
})
const rangeSize = () => {
    const sizes = props.product.sizes
    if (!sizes || sizes.length === 0) {
        return ''
    } else {
        return `${sizes[0].size} - ${sizes[sizes.length - 1].size}`
    }
}

const isInStock = () => {
  return props.product.sizes?.some(item => item.stock > 0)
}
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <!-- Description -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Product Description</h2>
            <div class="prose max-w-none text-gray-700">
                <p class="mb-4">{{ product.product_description }}</p>

                <h3 class="text-lg font-semibold mt-6 mb-3">Featured technology:</h3>
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>Flyknit Upper:</strong> High quality knitted material, light and breathable</li>
                    <li><strong>All Conditions Control (ACC):</strong> Maintains grip in all weather conditions
                    </li>
                    <li><strong>Speed Cage:</strong> Support frame for increased stability</li>
                    <li><strong>Chevron Studs:</strong> Studs help accelerate and stop suddenly</li>
                </ul>

                <h3 class="text-lg font-semibold mt-6 mb-3">Specifications:</h3>
                <div class="bg-gray-50 p-4 rounded">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>Weight:</strong> 196g</div>
                        <div><strong>Material:</strong> Flyknit + TPU</div>
                        <div><strong>Color:</strong> {{ product.color }}</div>
                        <div><strong>Origin:</strong> USA</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Product Specs -->
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">Details</h3>
            <div class="space-y-3 text-sm">
                <div class="flex justify-between border-b pb-2">
                    <span class="text-gray-600">Trademark:</span>
                    <span class="font-medium">{{ product.category.category_name }}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="text-gray-600">Model:</span>
                    <span class="font-medium max-w-[250px]">{{ product.product_name }}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="text-gray-600">Color:</span>
                    <span class="font-medium">{{ product.color }}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="text-gray-600">Size:</span>
                    <span class="font-medium">{{ rangeSize() }}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="text-gray-600">Guarantee:</span>
                    <span class="font-medium">6 months</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Status:</span>
                    <span class="font-medium text-green-600">{{ isInStock() ? 'In stock' : 'Out of stock' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>