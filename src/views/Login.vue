<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthForm from '@/components/AuthForm.vue'
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter()
const { login } = useAuth()

const form = ref({
    email: '',
    password: ''
})

const handleLogin = async () => {
    const result = await login({
        email: form.value.email,
        password: form.value.password
    })
    
    if (result.success) {
        router.push('/')
    } else {
        toast.error('Login failed: ' + result.message)
    }
}
</script>

<template>
    <AuthForm title="Login" mode="login" :form="form" @submit="handleLogin" />
</template>