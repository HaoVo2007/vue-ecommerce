<script setup>
import CartItem from '@/components/product-cart/CartItem.vue';
import OrderSummary from '@/components/product-cart/OrderSummary.vue';
import { useCartStore } from '@/composables/cartStore'
import { onMounted } from 'vue'
const cartStore = useCartStore()
const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user')
        return userStr && userStr !== 'null' ? JSON.parse(userStr) : null
    } catch {
        return null
    }
}

const removeCartItem = async (item) => {
    const user = getCurrentUser()
    if (user?.id) {
        await cartStore.removeFromCart(user.id, item.product_id)
    }
}

const increaseQuantity = async (item) => {
    const user = getCurrentUser()
    if (user?.id) {
        await cartStore.incrementQuantity(item, user.id)
    }
}

const decreaseQuantity = async (item) => {
    const user = getCurrentUser()
    if (user?.id) {
        await cartStore.decrementQuantity(item, user.id)
    }
}


</script>

<template>
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

            <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-stretch xl:gap-8">
                <CartItem 
                :cartItems="cartStore.items"
                @removeItem="removeCartItem"
                @decrementItem="decreaseQuantity"
                @incrementItem="increaseQuantity"
                />
                <OrderSummary />
            </div>
        </div>
    </section>
</template>