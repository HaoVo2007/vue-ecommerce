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

const orderItems = computed(() => orderDetail.value?.order_items || [])
const shipping = computed(() => orderDetail.value?.shipping_address || null)
const payment = computed(() => orderDetail.value?.payment || null)

</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <i class="fas fa-shopping-cart text-blue-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.order }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <i class="fas fa-check-circle text-green-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600">Delivered</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.success }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <i class="fas fa-clock text-yellow-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-lg">
            <i class="fas fa-times-circle text-red-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600">Cancelled</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.cancel }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders list -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 class="text-lg font-semibold text-gray-900">Orders List</h2>
      </div>
      <div class="divide-y divide-gray-200" id="ordersList">
        <div
          v-for="order in myOrder"
          :key="order.id"
          class="order-card p-6 cursor-pointer hover:bg-gray-50 transition-all duration-200"
          @click="openModal(order.id)"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-4 mb-3">
                <h3 class="text-lg font-semibold text-gray-900">#{{ order.id }}</h3>
                <StatusBadge :status="order.status" />
              </div>
              <div class="flex items-center space-x-6 text-sm text-gray-600">
                <span><i class="far fa-calendar mr-2"></i>{{ formatDate(order.created_at) }}</span>
                <span><i class="fas fa-box mr-2"></i>{{ order.order_items?.length || 0 }} items</span>
                <span class="text-lg font-bold text-indigo-600">{{ formatPrice(order.total_price) }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <i class="fas fa-chevron-right text-gray-400"></i>
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
    <div class="relative z-10 flex items-center justify-center min-h-full p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-white">Order Detail</h3>
            <button @click="closeModal" class="text-white hover:text-gray-200 transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <!-- Loading -->
          <div v-if="isLoadingDetail" class="py-16 text-center text-gray-500">
            <i class="fas fa-circle-notch fa-spin mr-2"></i> Loading...
          </div>

          <!-- Detail -->
          <div v-else-if="orderDetail" class="space-y-6">
            <!-- Order Info -->
            <div class="bg-gray-50 rounded-xl p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p class="text-sm text-gray-600 mb-1">Order code</p>
                  <p class="font-semibold text-gray-900 break-all">
                    {{ orderDetail.order_code || `#${orderDetail.id}` }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Order date</p>
                  <p class="font-semibold text-gray-900">{{ formatDate(orderDetail.created_at) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Status</p>
                  <StatusBadge :status="orderDetail.status" />
                </div>
              </div>
            </div>

            <!-- Shipping -->
            <div class="bg-white rounded-xl p-6 border border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Delivery information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-gray-600">Name</p>
                  <p class="font-semibold text-gray-900">{{ shipping?.name || '—' }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Email</p>
                  <p class="font-semibold text-gray-900 break-all">{{ shipping?.email || '—' }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Phone number</p>
                  <p class="font-semibold text-gray-900">{{ shipping?.phone || '—' }}</p>
                </div>
                <div class="md:col-span-2">
                  <p class="text-gray-600">Address</p>
                  <p class="font-semibold text-gray-900 break-words">{{ shipping?.address || '—' }}</p>
                </div>
              </div>
            </div>

            <!-- Products -->
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Products ordered</h4>
              <div class="space-y-4">
                <div
                  v-for="it in orderItems"
                  :key="`${it.product_id}-${it.size ?? ''}`"
                  class="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-xl"
                >
                  <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
                    <img :src="it.product_image" alt="">
                  </div>
                  <div class="flex-1 min-w-0">
                    <h5 class="font-semibold text-gray-900 truncate">{{ it.product_name }}</h5>
                    <p class="text-sm text-gray-600">
                      Size: <strong>{{ it.size || '—' }}</strong>
                    </p>
                    <div class="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2 text-sm">
                      <span class="text-gray-600">Quantity: <strong>{{ it.quantity }}</strong></span>
                      <span class="text-gray-600">Price: <strong>{{ formatPrice(it.price) }}</strong></span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-indigo-600">
                      {{ formatPrice((it.price || 0) * (it.quantity || 0)) }}
                    </p>
                  </div>
                </div>

                <div v-if="!orderItems.length" class="text-center text-gray-500 py-8">
                  No products
                </div>
              </div>
            </div>

            <!-- Payment (optional) -->
            <div class="bg-white rounded-xl p-6 border border-gray-200">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-900">Payment</h4>
                <StatusBadge :status="payment?.status" />
              </div>
              <div v-if="payment" class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p class="text-gray-600">Method</p>
                  <p class="font-semibold text-gray-900 capitalize">{{ payment.payment_method || '—' }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Price</p>
                  <p class="font-semibold text-gray-900">{{ formatPrice(payment.amount) }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Transaction code</p>
                  <p class="font-semibold text-gray-900 break-all">
                    {{ payment.vn_pay_transaction_no || payment.stripe_payment_id || '—' }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-600">Bank</p>
                  <p class="font-semibold text-gray-900">{{ payment.vn_pay_bank_code || '—' }}</p>
                </div>
                <div class="md:col-span-2">
                  <p class="text-gray-600">Information</p>
                  <p class="font-semibold text-gray-900 break-words">
                    {{ payment.vn_pay_transaction_info || '—' }}
                  </p>
                </div>
              </div>
              <div v-else class="text-sm text-gray-500">No payment</div>
            </div>

            <!-- Order Summary -->
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-900">Total price:</span>
                <span class="text-2xl font-bold text-indigo-600">
                  {{ formatPrice(orderDetail.total_price) }}
                </span>
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
