<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthForm from '@/components/AuthForm.vue'
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter()
const { register } = useAuth()
const loading = ref(false)
const form = ref({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
})

const handleRegister = async () => {
    try {
        loading.value = true // ✅ Bắt đầu loading
        const result = await register({
            email: form.value.email,
            password: form.value.password,
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            phone: form.value.phone,
            address: form.value.address
        })
        
        if (result.success) {
            toast.success('Registration successful')
            router.push('/')
        } else {
            toast.error('Registration failed: ' + result.message)
        }
    } catch (error) {
        toast.error('Registration failed: ' + error.message)
    } finally {
        loading.value = false // ✅ Kết thúc loading
    }
}
</script>

<template>
    <AuthForm title="Register" mode="register" :loading="loading" :form="form" @submit="handleRegister" />
</template>