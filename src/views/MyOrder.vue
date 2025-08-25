<!-- src/views/Orders.vue -->
<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { ENV } from '@/config/env'
import { useToast } from 'vue-toastification'
import StatusBadge from '@/components/common/StatusBadge.vue'

const toast = useToast()

const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user')
    return userStr && userStr !== 'null' ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleString('vi-VN')
}

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(price || 0)

const getPaymentMethod = (order) => {
  const type = (order.type || '').toLowerCase()
  if (type === 'cod') return 'COD'
  if (type === 'vnpay') return 'VNPay'
  return order.payment?.payment_method || 'Unknown'
}

const user = getCurrentUser()
const myOrder = ref([])

const isModalOpen = ref(false)
const isLoadingDetail = ref(false)
const orderDetail = ref(null)

const stats = computed(() => {
  const total = {
    order: myOrder.value.length,
    success: 0,
    pending: 0,
    cancel: 0,
  }
  for (const o of myOrder.value) {
    const s = String(o.status || '').toLowerCase()
    if (s === 'success') total.success++
    else if (s === 'pending' || s === 'processing') total.pending++
    else if (s === 'cancelled' || s === 'failed' || s === 'fail') total.cancel++
  }
  return total
})

const canReorder = computed(() => {
  if (!orderDetail.value) return false
  const status = (orderDetail.value.status || '').toLowerCase()
  const payStatus = (orderDetail.value.payment?.status || '').toLowerCase()
  const method = (orderDetail.value.type || '').toLowerCase()
  
  // Nếu có payment và payment bị failed hoặc cancelled
  if (orderDetail.value.payment && (payStatus === 'failed' || payStatus === 'cancelled')) {
    return true
  }

  // Nếu là COD, không có payment và order bị cancelled
  if (method === 'cod' && !orderDetail.value.payment && status === 'cancelled') {
    return true
  }

  return false
})

onMounted(async () => {
  if (!user?.id) return
  try {
    const res = await axios.get(`${ENV.API_BASE_URL}/api/v1/order?user_id=${user.id}`)
    myOrder.value = res.data?.data || []
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
})

async function fetchOrderDetail(id) {
  isLoadingDetail.value = true
  orderDetail.value = null
  try {
    const { data } = await axios.get(`${ENV.API_BASE_URL}/api/v1/order/${id}`)
    orderDetail.value = data?.data || null
  } catch (e) {
    toast.error(e?.response?.data?.message || e.message)
  } finally {
    isLoadingDetail.value = false
  }
}

async function openModal(id) {
  await fetchOrderDetail(id)
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  orderDetail.value = null
}

async function orderAgain(orderId) {
  try {
    const response = await axios.post(`${ENV.API_BASE_URL}/api/v1/payment/repurchase`, {
      order_id: orderId,
    })

    if (response.data?.status_code === 200) {
      if (response.data.data.type === 'cod') {
        toast.success('Đặt lại đơn COD thành công!')
      } else if (response.data.data.type === 'vnpay') {
        window.location.href = response.data.data.link 
      }
      // Refresh danh sách
      const res = await axios.get(`${ENV.API_BASE_URL}/api/v1/order?user_id=${user.id}`)
      myOrder.value = res.data?.data || []
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Không thể đặt hàng lại')
  }
}

const orderItems = computed(() => orderDetail.value?.order_items || [])
const shipping = computed(() => orderDetail.value?.shipping_address || null)
const payment = computed(() => orderDetail.value?.payment || null)

</script>

<template>
  <main class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
    <!-- Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div class="bg-white rounded-xl shadow-md p-3 sm:p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 sm:p-3 bg-blue-100 rounded-lg">
            <i class="fas fa-shopping-cart text-blue-600 text-sm sm:text-xl"></i>
          </div>
          <div class="ml-2 sm:ml-4">
            <p class="text-xs sm:text-sm text-gray-600">Total Orders</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-900">{{ stats.order }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-3 sm:p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 sm:p-3 bg-green-100 rounded-lg">
            <i class="fas fa-check-circle text-green-600 text-sm sm:text-xl"></i>
          </div>
          <div class="ml-2 sm:ml-4">
            <p class="text-xs sm:text-sm text-gray-600">Delivered</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-900">{{ stats.success }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-3 sm:p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 sm:p-3 bg-yellow-100 rounded-lg">
            <i class="fas fa-clock text-yellow-600 text-sm sm:text-xl"></i>
          </div>
          <div class="ml-2 sm:ml-4">
            <p class="text-xs sm:text-sm text-gray-600">Pending</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-3 sm:p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 sm:p-3 bg-red-100 rounded-lg">
            <i class="fas fa-times-circle text-red-600 text-sm sm:text-xl"></i>
          </div>
          <div class="ml-2 sm:ml-4">
            <p class="text-xs sm:text-sm text-gray-600">Cancelled</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-900">{{ stats.cancel }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders list -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900">Orders List</h2>
      </div>
      <div class="divide-y divide-gray-200" id="ordersList">
        <div v-for="order in myOrder" :key="order.id"
          class="order-card p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-all duration-200"
          @click="openModal(order.id)">
          <div class="flex items-start sm:items-center justify-between">
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-3">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900">#{{ order.id }}</h3>
                <div class="flex items-center space-x-2">
                  <StatusBadge :status="order.status" />
                  <!-- Badge phương thức thanh toán -->
                  <span class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="{
                          'bg-orange-100 text-orange-700': getPaymentMethod(order) === 'COD',
                          'bg-blue-100 text-blue-700': getPaymentMethod(order) === 'VNPay',
                          'bg-purple-100 text-purple-700': getPaymentMethod(order) === 'Stripe',
                          'bg-gray-100 text-gray-700': !['COD', 'VNPay', 'Stripe'].includes(getPaymentMethod(order))
                        }">
                    {{ getPaymentMethod(order) }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600">
                <span class="flex items-center">
                  <i class="far fa-calendar mr-1 sm:mr-2"></i>
                  <span class="truncate">{{ formatDate(order.created_at) }}</span>
                </span>
                <span class="flex items-center">
                  <i class="fas fa-box mr-1 sm:mr-2"></i>
                  {{ order.order_items?.length || 0 }} items
                </span>
                <span class="text-sm sm:text-lg font-bold text-indigo-600">{{ formatPrice(order.total_price) }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-4 ml-2">
              <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
            </div>
          </div>
        </div>
        <div v-if="!myOrder.length" class="p-6 text-center text-gray-500">No orders</div>
      </div>
    </div>
  </main>

  <!-- Modal -->
  <div v-if="isModalOpen" class="fixed inset-0 z-50">
    <div class="fixed inset-0 bg-black/50" @click="closeModal"></div>
    <div class="relative z-10 flex items-center justify-center min-h-full p-2 sm:p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div class="flex items-center justify-between">
            <h3 class="text-lg sm:text-xl font-bold text-white">Order Detail</h3>
            <button @click="closeModal" class="text-white hover:text-gray-200 transition-colors">
              <i class="fas fa-times text-lg sm:text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-70px)] sm:max-h-[calc(90vh-120px)]">
          <!-- Loading -->
          <div v-if="isLoadingDetail" class="py-16 text-center text-gray-500">
            <i class="fas fa-circle-notch fa-spin mr-2"></i> Loading...
          </div>

          <!-- Detail -->
          <div v-else-if="orderDetail" class="space-y-4 sm:space-y-6">
            <!-- Order Info -->
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <p class="text-xs sm:text-sm text-gray-600 mb-1">Order code</p>
                  <p class="font-semibold text-gray-900 break-all text-sm sm:text-base">
                    {{ orderDetail.order_code || `#${orderDetail.id}` }}
                  </p>
                </div>
                <div>
                  <p class="text-xs sm:text-sm text-gray-600 mb-1">Order date</p>
                  <p class="font-semibold text-gray-900 text-sm sm:text-base">{{ formatDate(orderDetail.created_at) }}</p>
                </div>
                <div>
                  <p class="text-xs sm:text-sm text-gray-600 mb-1">Status</p>
                  <StatusBadge :status="orderDetail.status" />
                </div>
                <!-- Phương thức thanh toán -->
                <div>
                  <p class="text-xs sm:text-sm text-gray-600 mb-1">Payment Method</p>
                  <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                        :class="{
                          'bg-orange-100 text-orange-700': getPaymentMethod(orderDetail) === 'COD',
                          'bg-blue-100 text-blue-700': getPaymentMethod(orderDetail) === 'VNPay',
                          'bg-purple-100 text-purple-700': getPaymentMethod(orderDetail) === 'Stripe',
                          'bg-gray-100 text-gray-700': !['COD', 'VNPay', 'Stripe'].includes(getPaymentMethod(orderDetail))
                        }">
                    {{ getPaymentMethod(orderDetail) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Shipping -->
            <div class="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <h4 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Delivery information</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p class="text-gray-600">Name</p>
                  <p class="font-semibold text-gray-900 break-words">{{ shipping?.name || '—' }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Email</p>
                  <p class="font-semibold text-gray-900 break-all">{{ shipping?.email || '—' }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Phone number</p>
                  <p class="font-semibold text-gray-900">{{ shipping?.phone || '—' }}</p>
                </div>
                <div class="sm:col-span-2">
                  <p class="text-gray-600">Address</p>
                  <p class="font-semibold text-gray-900 break-words">{{ shipping?.address || '—' }}</p>
                </div>
              </div>
            </div>

            <!-- Products -->
            <div>
              <h4 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Products ordered</h4>
              <div class="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 overflow-y-auto">
                <div v-for="it in orderItems" :key="`${it.product_id}-${it.size ?? ''}`"
                  class="flex items-start sm:items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-xl">
                  <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500 flex-shrink-0">
                    <img :src="it.product_image" alt="" class="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-lg">
                  </div>
                  <div class="flex-1 min-w-0">
                    <h5 class="font-semibold text-gray-900 text-sm sm:text-base break-words">{{ it.product_name }}</h5>
                    <p class="text-xs sm:text-sm text-gray-600">
                      Size: <strong>{{ it.size || '—' }}</strong>
                    </p>
                    <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-x-6 sm:gap-y-1 mt-1 sm:mt-2 text-xs sm:text-sm">
                      <span class="text-gray-600">Quantity: <strong>{{ it.quantity }}</strong></span>
                      <span class="text-gray-600">Price: <strong>{{ formatPrice(it.price) }}</strong></span>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <p class="text-sm sm:text-lg font-bold text-indigo-600">
                      {{ formatPrice((it.price || 0) * (it.quantity || 0)) }}
                    </p>
                  </div>
                </div>

                <div v-if="!orderItems.length" class="text-center text-gray-500 py-8">
                  No products
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <div class="flex items-center justify-between mb-3 sm:mb-4">
                <h4 class="text-base sm:text-lg font-semibold text-gray-900">Payment</h4>
                <StatusBadge :status="payment?.status" />
              </div>
              <div v-if="payment" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p class="text-gray-600">Method</p>
                  <p class="font-semibold text-gray-900 capitalize">{{ payment.payment_method || '—' }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Price</p>
                  <p class="font-semibold text-gray-900">{{ formatPrice(payment.amount) }}</p>
                </div>
                <div class="sm:col-span-2 lg:col-span-1">
                  <p class="text-gray-600">Transaction code</p>
                  <p class="font-semibold text-gray-900 break-all">
                    {{ payment.vn_pay_transaction_no || payment.stripe_payment_id || '—' }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-600">Bank</p>
                  <p class="font-semibold text-gray-900">{{ payment.vn_pay_bank_code || '—' }}</p>
                </div>
                <div class="sm:col-span-2">
                  <p class="text-gray-600">Information</p>
                  <p class="font-semibold text-gray-900 break-words">
                    {{ payment.vn_pay_transaction_info || '—' }}
                  </p>
                </div>
              </div>
              <div v-else class="text-xs sm:text-sm text-gray-500">No payment</div>
            </div>

            <!-- Order Summary với nút Order Again -->
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-indigo-200">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <span class="text-base sm:text-lg font-semibold text-gray-900">Total price:</span>
                <span class="text-xl sm:text-2xl font-bold text-indigo-600">
                  {{ formatPrice(orderDetail.total_price) }}
                </span>
              </div>
              
              <!-- Nút Order Again -->
              <div v-if="canReorder" class="mt-4 sm:mt-6 flex justify-end">
                <button @click="orderAgain(orderDetail.id)"
                  class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors text-sm sm:text-base">
                  <i class="fas fa-redo mr-2"></i>Order Again
                </button>
              </div>
            </div>
          </div>

          <!-- No detail -->
          <div v-else class="py-12 text-center text-gray-500">Không tải được chi tiết đơn hàng</div>
        </div>
      </div>
    </div>
  </div>
</template>