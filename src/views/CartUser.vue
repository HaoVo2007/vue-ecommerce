<script setup>

</script>

<template>

    <body class="bg-gray-50 min-h-screen">
        <!-- Header -->
        <div class="p-20">
            <header class="bg-white">
                <div class="max-w-7xl mx-auto ">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center">
                            <i class="fas fa-shopping-bag text-2xl text-indigo-600 mr-3"></i>
                            <h1 class="text-xl font-bold text-gray-900">Giỏ Hàng Của Bạn</h1>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="text-sm text-gray-500">3 sản phẩm</span>

                        </div>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="lg:grid lg:grid-cols-12 lg:gap-8">
                    <!-- Cart Items -->
                    <div class="lg:col-span-8">
                        <div class="bg-white rounded-xl shadow-sm border p-6 mb-6">
                            <h2 class="text-lg font-semibold text-gray-900 mb-6">Sản phẩm trong giỏ</h2>

                            <!-- Cart Item 1 -->
                            <div class="cart-item bg-gray-50 rounded-lg p-4 mb-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <div
                                            class="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                                            <i class="fas fa-laptop text-white text-2xl"></i>
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <h3 class="text-lg font-medium text-gray-900">MacBook Pro 14"</h3>
                                        <p class="text-sm text-gray-500">Apple M2 Pro, 16GB RAM, 512GB SSD</p>
                                        <p class="text-sm text-green-600 font-medium mt-1">Còn hàng</p>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <div class="flex items-center border rounded-lg">
                                            <button class="quantity-btn px-3 py-1 text-gray-500 hover:text-gray-700"
                                                data-action="decrease" data-item="1">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                            <span class="px-4 py-1 text-gray-900 font-medium quantity-display"
                                                data-item="1">1</span>
                                            <button class="quantity-btn px-3 py-1 text-gray-500 hover:text-gray-700"
                                                data-action="increase" data-item="1">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-lg font-bold text-gray-900 item-price" data-price="52000000"
                                                data-item="1">52.000.000₫</p>
                                        </div>
                                        <button class="text-red-500 hover:text-red-700 p-2 remove-item" data-item="1">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Cart Item 2 -->
                            <div class="cart-item bg-gray-50 rounded-lg p-4 mb-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <div
                                            class="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                                            <i class="fas fa-headphones text-white text-2xl"></i>
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <h3 class="text-lg font-medium text-gray-900">AirPods Pro</h3>
                                        <p class="text-sm text-gray-500">Chống ồn chủ động, Spatial Audio</p>
                                        <p class="text-sm text-green-600 font-medium mt-1">Còn hàng</p>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <div class="flex items-center border rounded-lg">
                                            <button class="quantity-btn px-3 py-1 text-gray-500 hover:text-gray-700"
                                                data-action="decrease" data-item="2">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                            <span class="px-4 py-1 text-gray-900 font-medium quantity-display"
                                                data-item="2">2</span>
                                            <button class="quantity-btn px-3 py-1 text-gray-500 hover:text-gray-700"
                                                data-action="increase" data-item="2">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-lg font-bold text-gray-900 item-price" data-price="6000000"
                                                data-item="2">12.000.000₫</p>
                                        </div>
                                        <button class="text-red-500 hover:text-red-700 p-2 remove-item" data-item="2">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Cart Item 3 -->
                            <div class="cart-item bg-gray-50 rounded-lg p-4 mb-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <div
                                            class="w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg flex items-center justify-center">
                                            <i class="fas fa-mobile-alt text-white text-2xl"></i>
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <h3 class="text-lg font-medium text-gray-900">iPhone 15 Pro</h3>
                                        <p class="text-sm text-gray-500">256GB, Titanium Natural</p>
                                        <p class="text-sm text-green-600 font-medium mt-1">Còn hàng</p>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <div class="flex items-center border rounded-lg">
                                            <button class="quantity-btn px-3 py-1 text-gray-500 hover:text-gray-700"
                                                data-action="decrease" data-item="3">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                            <span class="px-4 py-1 text-gray-900 font-medium quantity-display"
                                                data-item="3">1</span>
                                            <button class="quantity-btn px-3 py-1 text-gray-500 hover:text-gray-700"
                                                data-action="increase" data-item="3">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-lg font-bold text-gray-900 item-price" data-price="28000000"
                                                data-item="3">28.000.000₫</p>
                                        </div>
                                        <button class="text-red-500 hover:text-red-700 p-2 remove-item" data-item="3">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Continue Shopping -->
                        <div class="flex items-center justify-between">
                            <button class="flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                                <i class="fas fa-arrow-left mr-2"></i>
                                Tiếp tục mua sắm
                            </button>
                            <button class="text-red-500 hover:text-red-700 font-medium clear-cart">
                                <i class="fas fa-trash mr-2"></i>
                                Xóa tất cả
                            </button>
                        </div>
                    </div>

                    <!-- Order Summary -->
                    <div class="lg:col-span-4 mt-8 lg:mt-0">
                        <div class="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
                            <h2 class="text-lg font-semibold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

                            <div class="space-y-4 mb-6">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Tạm tính</span>
                                    <span class="font-medium subtotal">92.000.000₫</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Phí vận chuyển</span>
                                    <span class="font-medium text-green-600">Miễn phí</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Giảm giá</span>
                                    <span class="font-medium text-red-500">-2.000.000₫</span>
                                </div>
                                <hr class="border-gray-200">
                                <div class="flex justify-between text-lg font-bold">
                                    <span>Tổng cộng</span>
                                    <span class="total">90.000.000₫</span>
                                </div>
                            </div>

                            <!-- Promo Code -->
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Mã giảm giá</label>
                                <div class="flex">
                                    <input type="text" placeholder="Nhập mã giảm giá"
                                        class="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <button
                                        class="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>

                            <!-- Checkout Button -->
                            <button
                                class="checkout-btn w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mb-4">
                                <i class="fas fa-lock mr-2"></i>
                                Thanh toán an toàn
                            </button>

                            <!-- Payment Methods -->
                            <div class="text-center">
                                <p class="text-xs text-gray-500 mb-3">Chúng tôi chấp nhận</p>
                                <div class="flex justify-center space-x-3">
                                    <div class="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                                        <span class="text-white text-xs font-bold">V</span>
                                    </div>
                                    <div class="w-8 h-6 bg-red-500 rounded flex items-center justify-center">
                                        <span class="text-white text-xs font-bold">M</span>
                                    </div>
                                    <div class="w-8 h-6 bg-yellow-400 rounded flex items-center justify-center">
                                        <span class="text-white text-xs font-bold">₿</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>