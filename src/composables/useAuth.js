import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { ENV } from '@/config/env'
import { useToast } from "vue-toastification"

const toast = useToast()

const user = ref(null)
const isLoggedIn = ref(false)

// Đồng bộ hóa từ localStorage ngay khi load
const syncFromLocalStorage = () => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    isLoggedIn.value = !!token
    user.value = storedUser ? JSON.parse(storedUser) : null
}

// Gọi ngay khi module được load
syncFromLocalStorage()

// Tự động cập nhật localStorage khi user thay đổi
watch(user, (newVal) => {
    if (newVal) {
        localStorage.setItem('user', JSON.stringify(newVal))
    } else {
        localStorage.removeItem('user')
    }
})

export const useAuth = () => {
    const userInfo = computed(() => user.value)

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${ENV.API_BASE_URL}/api/v1/user/login`, credentials)
            const data = response.data.data

            if (data.token) {
                localStorage.setItem('token', data.token)
                if (data.refresh_token) {
                    localStorage.setItem('refresh_token', data.refresh_token)
                }

                user.value = data
                isLoggedIn.value = true

                return { success: true, data }
            } else {
                return { success: false, message: 'No token received' }
            }
        } catch (error) {
            toast.error(`Login error: ${error.response?.data?.message || error.message || error.toString()}`)
            return {
                success: false,
                message: error.response?.data?.message || error.message
            }
        }
    }

    const register = async (userData) => {
        try {
            const response = await axios.post(`${ENV.API_BASE_URL}/api/v1/user/register`, userData)
            const data = response.data.data

            if (data.token) {
                localStorage.setItem('token', data.token)
                if (data.refresh_token) {
                    localStorage.setItem('refresh_token', data.refresh_token)
                }

                user.value = data.user
                isLoggedIn.value = true

                return { success: true, data }
            } else {
                return { success: false, message: 'No token received' }
            }
        } catch (error) {
            toast.error(`Registration error: ${error.response?.data?.message || error.message || error.toString()}`)
            return {
                success: false,
                message: error.response?.data?.message || error.message
            }
        }
    }

    const logout = async () => {
        const token = localStorage.getItem('token')

        try {
            if (token) {
                await axios.post(`${ENV.API_BASE_URL}/api/v1/user/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
            }
        } catch (error) {
            // Nếu lỗi do token hết hạn cũng cho phép logout
            if (error.response?.status !== 401) {
                toast.error(`Logout failed: ${error.response?.data?.message || error.message || error.toString()}`)
                return {
                    success: false,
                    message: error.response?.data?.message || error.message
                }
            }
        }

        // Dọn dẹp state và localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        localStorage.removeItem('coupon_code')

        user.value = null
        isLoggedIn.value = false

        return { success: true, message: 'Logout successful' }
    }

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
            toast.warning('No refresh token found')
            await logout()
            return null
        }

        try {
            const response = await axios.get(`${ENV.API_BASE_URL}/api/v1/user/refresh?refresh_token=${refreshToken}`)
            const newAccessToken = response.data.data.token

            if (newAccessToken) {
                localStorage.setItem('token', newAccessToken)
                return newAccessToken
            } else {
                toast.error('Failed to refresh token')
                await logout()
                return null
            }
        } catch (error) {
            toast.error(`Refresh token failed: ${error.response?.data?.message || error.message || error.toString()}`)
            await logout()
            return null
        }
    }

    return {
        user,
        isLoggedIn,
        userInfo,
        login,
        register,
        logout,
        refreshAccessToken,
        syncFromLocalStorage,
    }
}
