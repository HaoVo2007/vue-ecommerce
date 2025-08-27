import CartUser from '@/views/CartUser.vue'
import Checkout from '@/views/Checkout.vue'
import DetailProduct from '@/views/DetailProduct.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import PaymentResult from '@/views/PaymentResult.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MyOrder from '@/views/MyOrder.vue'
import AllProduct from '@/views/AllProduct.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: DetailProduct,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartUser,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
    { 
      path: '/payment/success',
      meta: { status: 'success' },
      component: PaymentResult, 
    },
    { 
      path: '/payment/failed',
      component: PaymentResult,
      meta: { status: 'failed' },
    },
    { 
      path: '/payment/cancelled', 
      component: PaymentResult, 
      meta: { status: 'cancelled' }, 
    },
    {
      path: '/my-orders',
      name: 'my-orders',
      component: MyOrder,
    },
    {
      path: '/all-products',
      name: 'all-products',
      component: AllProduct,
    }
  ],
})

export default router
