<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useToast } from "vue-toastification";
import ConfirmModal from './ConfirmModal.vue';
import { ref, computed, watch } from 'vue'
import { useCartStore } from '@/composables/cartStore'
import { onMounted } from 'vue'

const cartStore = useCartStore()

const showModal = ref(false)
const loading = ref(false)
const toast = useToast();
const router = useRouter()
const { isLoggedIn, userInfo, logout } = useAuth()

const cartQuantity = computed(() => {
    return cartStore.totalQuantity || 0
})

const cartTotal = computed(() => {
    return cartStore.total || 0
})

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price)
}

const openModal = () => {
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const closeCartDropdown = () => {
    document.getElementById('myCartDropdown1').classList.remove('block')
    document.getElementById('myCartDropdown1').classList.add('hidden')
}

const removeCartItem = async (item) => {
    if (userInfo.value?.id) {
        await cartStore.removeFromCart(userInfo.value.id, item.product_id)
    }
}

const increaseQuantity = async (item) => {
    console.log(userInfo.value)
    if (userInfo.value?.id) {
        await cartStore.incrementQuantity(item, userInfo.value.id)
    }
}

const decreaseQuantity = async (item) => {
    if (userInfo.value?.id) {
        await cartStore.decrementQuantity(item, userInfo.value.id)
    }
}

const handleLogout = async () => {
    loading.value = true
    const result = await logout()
    loading.value = false
    closeModal()
    if (result.success) {
        toast.success('Logout successful')
        cartStore.clearCart()
        setTimeout(() => {
            router.push('/login')
        }, 1000)
    } else {
        toast.error(result.message)
    }
}

const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user')
        return userStr && userStr !== 'null' ? JSON.parse(userStr) : null
    } catch {
        return null
    }
}

const loadCartData = async () => {
    const user = getCurrentUser()

    if (user?.id) {
        await cartStore.fetchCartQuantity(user.id)
        await cartStore.getCartItems(user.id)
    } else {
        cartStore.clearCart()
    }
}

onMounted(async () => {
    await loadCartData()
})

watch(() => isLoggedIn.value, async (newIsLoggedIn) => {
    if (newIsLoggedIn) {
        setTimeout(async () => {
            await loadCartData()
        }, 100)
    } else {
        cartStore.clearCart()
    }
})

</script>

<template>
    <nav class="bg-white dark:bg-gray-800 antialiased shadow">
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
            <div class="flex items-center justify-between">

                <div class="flex items-center space-x-8">
                    <router-link to="/">
                        <div class="flex items-center space-x-3">
                            <div
                                class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <i class="fas fa-futbol text-white text-xl"></i>
                            </div>
                        </div>
                    </router-link>

                    <ul class="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                        <li>
                            <router-link to="/"
                                class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                Home
                            </router-link>
                        </li>
                        <li class="shrink-0">
                            <a href="#" title=""
                                class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                Best Sellers
                            </a>
                        </li>
                        <li class="shrink-0">
                            <a href="#" title=""
                                class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                Gift Ideas
                            </a>
                        </li>
                        <li class="shrink-0">
                            <a href="#" title=""
                                class="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                Today's Deals
                            </a>
                        </li>
                        <li class="shrink-0">
                            <a href="#" title=""
                                class="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                Sell
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="flex items-center lg:space-x-2">
                    <!-- Cart Button -->
                    <div class="relative">

                        <button id="myCartDropdownButton1" data-dropdown-toggle="myCartDropdown1" type="button"
                            class="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white">
                            <span class="sr-only">Cart</span>
                            <svg class="w-5 h-5 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                            </svg>
                            <span class="hidden sm:flex">My Cart</span>
                            <svg class="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button>


                        <!-- Cart Quantity Badge -->
                        <span v-if="cartQuantity > 0"
                            class="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {{ cartQuantity }}
                        </span>
                    </div>

                    <!-- Cart Dropdown -->
                    <div id="myCartDropdown1"
                        class="hidden z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800">

                        <!-- Cart Items -->
                        <div v-if="cartStore.items.length > 0" class="space-y-4">
                            <div v-for="item in cartStore.items" :key="`${item.product_id}-${item.size}`"
                                class="grid grid-cols-1 gap-4 border-b border-gray-200 dark:border-gray-600 pb-4">

                                <div class="flex items-center space-x-4">
                                    <!-- Product Image -->
                                    <img :src="item.image_url" :alt="item.product_name"
                                        class="w-16 h-16 object-cover rounded-lg">

                                    <!-- Product Details -->
                                    <div class="flex-1 min-w-0">
                                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                            {{ item.product_name }}
                                        </h3>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">
                                            Size: {{ item.size }}
                                        </p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                                            {{ formatPrice(item.price) }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Quantity Controls and Remove Button -->
                                <div class="flex items-center justify-between">
                                    <!-- Quantity Controls -->
                                    <div class="flex items-center space-x-2">
                                        <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1"
                                            class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M20 12H4"></path>
                                            </svg>
                                        </button>

                                        <span
                                            class="text-sm font-medium text-gray-900 dark:text-white min-w-[1.5rem] text-center">
                                            {{ item.quantity }}
                                        </span>

                                        <button @click="increaseQuantity(item)"
                                            class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 4v16m8-8H4"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    <!-- Remove Button -->
                                    <button @click="removeCartItem(item)" type="button"
                                        class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                                        <span class="sr-only">Remove</span>
                                        <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <!-- Subtotal -->
                                <div class="text-right">
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                                        Subtotal: {{ formatPrice(item.total_price) }}
                                    </span>
                                </div>
                            </div>

                            <!-- Cart Total -->
                            <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
                                <div class="flex justify-between items-center">
                                    <span class="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                                    <span class="text-lg font-semibold text-gray-900 dark:text-white">
                                        {{ formatPrice(cartTotal) }}
                                    </span>
                                </div>
                            </div>

                            <!-- Checkout Button -->
                            <router-link to="/cart" @click="closeCartDropdown"
                                class="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Proceed to Checkout
                            </router-link>
                        </div>

                        <!-- Empty Cart Message -->
                        <div v-else class="text-center py-4">
                            <img class="mx-auto mb-4 w-1/2" src="/image/sections/empty-cart.png" alt="">
                            <router-link to="/cart" @click="closeCartDropdown"
                                class="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Your Cart
                            </router-link>
                        </div>
                    </div>

                    <!-- User Dropdown Button -->
                    <button id="userDropdownButton1" data-dropdown-toggle="userDropdown1" type="button"
                        class="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white">
                        <svg class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2"
                                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span>
                            {{ userInfo && (userInfo.last_name || userInfo.first_name)
                                ? userInfo.last_name + ' ' + userInfo.first_name
                                : 'Account'
                            }}
                        </span>
                        <svg class="w-4 h-4 text-gray-900 dark:text-white ms-1" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 9-7 7-7-7" />
                        </svg>
                    </button>

                    <!-- User Dropdown -->
                    <div id="userDropdown1"
                        class="hidden z-20 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700">
                        <template v-if="isLoggedIn">
                            <ul class="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                                <li><a href="#" title=""
                                        class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                        My Account </a></li>
                                <li><router-link to="/my-orders" title=""
                                        class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                        My Orders </router-link></li>
                                <li><a href="#" title=""
                                        class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                        Settings </a></li>
                                <li><a href="#" title=""
                                        class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                        Favourites </a></li>
                                <li><a href="#" title=""
                                        class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                        Delivery Addresses </a></li>
                                <li><a href="#" title=""
                                        class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                        Billing Data </a></li>
                            </ul>
                        </template>

                        <div v-if="isLoggedIn" class="p-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span @click="openModal" title=""
                                class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                                Sign Out </span>
                        </div>
                        <div v-else class="p-2 text-sm font-medium text-gray-900 dark:text-white">
                            <router-link to="/login"
                                class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                Sign in
                            </router-link>

                            <router-link to="/register"
                                class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                Sign up
                            </router-link>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button type="button" data-collapse-toggle="ecommerce-navbar-menu-1"
                        aria-controls="ecommerce-navbar-menu-1" aria-expanded="false"
                        class="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white">
                        <span class="sr-only">Open Menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                d="M5 7h14M5 12h14M5 17h14" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="ecommerce-navbar-menu-1"
                class="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 hidden px-4 mt-4">
                <ul class="text-gray-900 dark:text-white text-sm font-medium space-y-3">
                    <li>
                        <router-link to="/"
                            class="hover:text-primary-700 dark:hover:text-primary-500">Home</router-link>
                    </li>
                    <li>
                        <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Best Sellers</a>
                    </li>
                    <li>
                        <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Gift Ideas</a>
                    </li>
                    <li>
                        <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Games</a>
                    </li>
                    <li>
                        <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Electronics</a>
                    </li>
                    <li>
                        <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Home & Garden</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Confirm Modal -->
    <ConfirmModal :show="showModal" :loading="loading" title="Confirm Logout" message="Are you sure you want to logout?"
        confirmText="Logout" cancelText="Cancel" @confirm="handleLogout" @cancel="closeModal" />
</template>