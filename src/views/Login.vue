<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthForm from '@/components/AuthForm.vue'
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter()
const { login } = useAuth()
const loading = ref(false)
const form = ref({
    email: '',
    password: ''
})

const handleLogin = async () => {
    loading.value = true // ✅ Bắt đầu loading
    
    try {
        const result = await login({
            email: form.value.email,
            password: form.value.password
        })
        
        if (result.success) {
            router.push('/')
        } else {
            toast.error('Login failed: ' + result.message)
        }
    } catch (error) {
        toast.error('Login failed: ' + error.message)
    } finally {
        loading.value = false // ✅ Kết thúc loading
    }
}
</script>

<template>
    <AuthForm 
        title="Login" 
        mode="login" 
        :loading="loading" 
        :form="form" 
        @submit="handleLogin" 
    />
</template>
