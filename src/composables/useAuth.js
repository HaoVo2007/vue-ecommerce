import { ref, computed } from 'vue'
import axios from 'axios'
import { ENV } from '@/config/env'
import { useToast } from "vue-toastification";

const toast = useToast();

const isLoggedIn = ref(!!localStorage.getItem("token"));
const user = ref(null);

export const useAuth = () => {
    const userInfo = computed(() => {
        if (user.value) {
            return user.value
        }
    })

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${ENV.API_BASE_URL}/api/v1/user/login`, credentials)
            const data = response.data.data

            if (data.token) {
                // Lưu token
                localStorage.setItem('token', data.token)

                // Lưu refresh token nếu có
                if (data.refresh_token) {
                    localStorage.setItem('refresh_token', data.refresh_token)
                }

                // Lưu thông tin user
                if (data) {
                    localStorage.setItem('user', JSON.stringify(data))
                    user.value = data
                }

                // Cập nhật state
                isLoggedIn.value = true

                return { success: true, data }
            } else {
                return { success: false, message: 'No token received' }
            }
        } catch (error) {
            toast.error('Login error:', error)
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
                // Lưu token
                localStorage.setItem('token', data.token)

                // Lưu refresh token nếu có
                if (data.refresh_token) {
                    localStorage.setItem('refresh_token', data.refresh_token)
                }

                // Lưu thông tin user
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    user.value = data.user
                }

                // Cập nhật state
                isLoggedIn.value = true

                return { success: true, data }
            } else {
                return { success: false, message: 'No token received' }
            }
        } catch (error) {
            toast.error('Registration error:', error)
            return {
                success: false,
                message: error.response?.data?.message || error.message
            }
        }
    }

    const logout = async () => {
        let token = localStorage.getItem('token')
        if (!token) {
            return { success: false, message: 'You are not logged in' }
        }

        try {
            await axios.post(`${ENV.API_BASE_URL}/api/v1/user/logout`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })

            // Clear localStorage
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')

            // Update state
            isLoggedIn.value = false
            user.value = null

            return { success: true, message: 'Logout successful' }

        } catch (error) {
            if (error.response?.status === 401) {
                // Token expired, just clear localStorage
                localStorage.removeItem('token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('user')

                isLoggedIn.value = false
                user.value = null

                return { success: true, message: 'Logout successful' }
            } else {
                return {
                    success: false,
                    message: error.response?.data?.message || error.message
                }
            }
        }
    }

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
            toast.warn('No refresh token found')
            logout()
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
                logout()
                return null
            }
        } catch (error) {
            toast.error('Refresh token failed:', error.response?.data || error.message)
            logout()
            return null
        }
    }

    return {
        isLoggedIn,
        user,
        userInfo,
        login,
        register,
        logout,
        refreshAccessToken
    }
}