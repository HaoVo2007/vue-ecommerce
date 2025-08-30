<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/api'
import { ENV } from '@/config/env'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseTextArea from '@/components/common/BaseTextArea.vue'

const userData = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    user_type: 'user',
    profile: {
        full_name: '',
        avatar: '',
        gender: 'Nam',
        birthday: '',
        address: '',
        bio: ''
    }
})

const error = ref('')
const passwordError = ref('')

// Edit mode states
const editMode = ref({
    personal: false,
    password: false
})

// Password data
const passwordData = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})

// Password visibility states
const showPassword = ref({
    current: false,
    new: false,
    confirm: false
})

// Computed for formatted birthday with safe access
const formattedBirthday = computed({
    get() {
        if (!userData.value?.profile?.birthday) return ''
        try {
            const date = new Date(userData.value.profile.birthday)
            return date.toISOString().split('T')[0]
        } catch {
            return ''
        }
    },
    set(value) {
        if (userData.value?.profile) {
            userData.value.profile.birthday = value
        }
    }
})

const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user')
        return userStr && userStr !== 'null' ? JSON.parse(userStr) : null
    } catch {
        return null
    }
}

const changeAvatar = () => {
    console.log('change avatar clicked')
}

const toggleEdit = (section) => {
    console.log('toggle edit for section:', section)
    
    if (section === 'personal') {
        if (editMode.value.personal) {
            // Save personal info
            savePersonalInfo()
        } else {
            editMode.value.personal = true
        }
    } else if (section === 'password') {
        if (editMode.value.password) {
            // Save password
            savePassword()
        } else {
            editMode.value.password = true
            // Reset password form
            passwordData.value = {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
            passwordError.value = ''
        }
    }
}

const savePersonalInfo = async () => {
    console.log('saving personal info:', userData.value)
    
    try {
        const user = getCurrentUser()
        const token = localStorage.getItem('token')
        
        if (!user || !token) {
            window.location.href = '/login'
            return
        }

        // TODO: Implement API call to save personal info
        // const response = await api.put(`${ENV.API_BASE_URL}/api/v1/user/${user.id}`, userData.value, {
        //     headers: { Authorization: `Bearer ${token}` }
        // })
        
        console.log('Personal info saved successfully')
        editMode.value.personal = false
        
    } catch (e) {
        console.error('Error saving personal info:', e)
        error.value = 'Không thể lưu thông tin cá nhân.'
    }
}

const savePassword = async () => {
    console.log('saving password')
    
    // Validate passwords
    if (!passwordData.value.currentPassword) {
        passwordError.value = 'Vui lòng nhập mật khẩu hiện tại'
        return
    }
    
    if (!passwordData.value.newPassword) {
        passwordError.value = 'Vui lòng nhập mật khẩu mới'
        return
    }
    
    if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
        passwordError.value = 'Mật khẩu xác nhận không khớp'
        return
    }
    
    if (passwordData.value.newPassword.length < 8) {
        passwordError.value = 'Mật khẩu phải có ít nhất 8 ký tự'
        return
    }
    
    try {
        const user = getCurrentUser()
        const token = localStorage.getItem('token')
        
        if (!user || !token) {
            window.location.href = '/login'
            return
        }

        // TODO: Implement API call to change password
        // const response = await api.put(`${ENV.API_BASE_URL}/api/v1/user/change-password`, {
        //     currentPassword: passwordData.value.currentPassword,
        //     newPassword: passwordData.value.newPassword
        // }, {
        //     headers: { Authorization: `Bearer ${token}` }
        // })
        
        console.log('Password changed successfully')
        editMode.value.password = false
        passwordError.value = ''
        
        // Reset password form
        passwordData.value = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
        
    } catch (e) {
        console.error('Error changing password:', e)
        passwordError.value = 'Không thể đổi mật khẩu. Vui lòng kiểm tra lại mật khẩu hiện tại.'
    }
}

const togglePasswordVisibility = (field) => {
    console.log('toggle password visibility for:', field)
    showPassword.value[field] = !showPassword.value[field]
}

onMounted(async () => {
    const user = getCurrentUser()
    if (!user) {
        window.location.href = '/login'
        return
    }

    const token = localStorage.getItem('token')
    if (!token) {
        window.location.href = '/login'
        return
    }

    try {
        const res = await api.get(`${ENV.API_BASE_URL}/api/v1/user/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })

        const data = res?.data?.data
        if (!data) {
            window.location.href = '/login'
            return
        }

        // Merge API data with default structure
        userData.value = {
            ...userData.value,
            ...data,
            profile: {
                ...userData.value.profile,
                ...data.profile
            }
        }
        
        localStorage.setItem('profile', JSON.stringify(data.profile ?? {}))
    } catch (e) {
        console.error(e)
        error.value = 'Không tải được thông tin người dùng.'
    }
})
</script>

<template>
    <div class="container mx-auto px-6 py-8 max-w-6xl">
        <div class="content-bg rounded-3xl shadow-2xl overflow-hidden">
            <div class="bg-black px-8 py-12">
                <div class="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">

                    <!-- Avatar -->
                    <div class="relative">
                        <img :src="userData?.profile?.avatar || './image/default/user-default.jpg'"
                            :alt="userData?.profile?.full_name || ((userData?.first_name || '') + ' ' + (userData?.last_name || ''))"
                            class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl" />
                        <button @click="changeAvatar"
                            class="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                            <i class="fas fa-camera text-sm"></i>
                        </button>
                    </div>

                    <div class="text-center lg:text-left text-white flex-1">
                        <h2 class="text-3xl font-bold mb-2">
                            {{ userData?.profile?.full_name || ((userData?.first_name || '') + ' ' +
                                (userData?.last_name || '')) }}
                        </h2>
                        <p class="text-white/80 text-lg mb-4">{{ userData?.email }}</p>

                        <div class="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
                            <span class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                                <i class="fas fa-crown mr-2 text-yellow-300"></i>
                                {{ userData?.user_type === 'user' ? 'Thành viên' : (userData?.user_type || 'Thành viên')
                                }}
                            </span>
                            <span class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                                <i class="fas fa-map-marker-alt mr-2 text-red-300"></i>
                                {{ userData?.profile?.address || 'No address provided' }}
                            </span>
                            <span class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                                <i class="fas fa-phone mr-2 text-green-300"></i>
                                {{ userData?.phone || 'No phone number' }}
                            </span>
                        </div>

                        <p class="text-white/90 max-w-2xl">
                            {{ userData?.profile?.bio || 'No bio available' }}
                        </p>
                    </div>

                </div>
            </div>

            <div class="px-8 py-8 bg-white">
                <!-- Personal Information Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <i class="fas fa-user text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800">Personal information</h3>
                            <p class="text-gray-600">Update your details</p>
                        </div>
                    </div>
                    <button @click="toggleEdit('personal')"
                        :class="editMode.personal ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'"
                        class="text-white px-6 py-3 rounded-xl transition-all btn-hover flex items-center font-medium">
                        <i :class="editMode.personal ? 'fas fa-save' : 'fas fa-edit'" class="mr-2"></i>
                        {{ editMode.personal ? 'Save changes' : 'Edit information' }}
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <BaseInput 
                        v-model="userData.first_name"
                        label="Surname"
                        :disabled="!editMode.personal"
                        class="disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    
                    <BaseInput 
                        v-model="userData.last_name"
                        label="Name"
                        :disabled="!editMode.personal"
                        class="disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    
                    <BaseInput 
                        v-model="userData.profile.full_name"
                        label="Full name"
                        :disabled="!editMode.personal"
                        class="disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    
                    <BaseInput 
                        v-model="userData.phone"
                        label="Phone number"
                        :disabled="!editMode.personal"
                        class="disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    
                    <BaseSelect
                        v-model="userData.profile.gender"
                        label="My gender"
                        :disabled="!editMode.personal"
                        class="disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </BaseSelect>
                    
                    <BaseInput 
                        v-model="formattedBirthday"
                        type="date"
                        label="Birthday"
                        :disabled="!editMode.personal"
                        class="disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    
                    <div class="md:col-span-2 lg:col-span-3">
                        <BaseInput 
                            v-model="userData.profile.address"
                            label="Address"
                            :disabled="!editMode.personal"
                            class="disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>
                    
                    <div class="md:col-span-2 lg:col-span-3">
                        <BaseTextArea 
                            v-model="userData.profile.bio"
                            label="Biography"
                            :disabled="!editMode.personal"
                            rows="4"
                            placeholder="Tell us about yourself..."
                            class="disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>
                </div>

                <div class="section-divider mb-12"></div>

                <!-- Security Section -->
                <div class="mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-shield-alt text-red-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-gray-800">Secure account</h3>
                                <p class="text-gray-600">Manage passwords and security settings</p>
                            </div>
                        </div>
                        <button @click="toggleEdit('password')"
                            :class="editMode.password ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'"
                            class="text-white px-6 py-3 rounded-xl transition-all btn-hover flex items-center font-medium">
                            <i :class="editMode.password ? 'fas fa-save' : 'fas fa-key'" class="mr-2"></i>
                            {{ editMode.password ? 'Update password' : 'Change password' }}
                        </button>
                    </div>

                    <div v-if="editMode.password" class="space-y-6">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <i class="fas fa-lock mr-2 text-gray-500"></i>
                                    Current password
                                </label>
                                <div class="relative">
                                    <input v-model="passwordData.currentPassword"
                                        :type="showPassword.current ? 'text' : 'password'"
                                        class="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all input-focus"
                                        placeholder="Enter current password">
                                    <button @click="togglePasswordVisibility('current')" type="button"
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <i :class="showPassword.current ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <i class="fas fa-key mr-2 text-green-500"></i>
                                    New password
                                </label>
                                <div class="relative">
                                    <input v-model="passwordData.newPassword"
                                        :type="showPassword.new ? 'text' : 'password'"
                                        class="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all input-focus"
                                        placeholder="Enter new password">
                                    <button @click="togglePasswordVisibility('new')" type="button"
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <i :class="showPassword.new ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <i class="fas fa-check-circle mr-2 text-green-500"></i>
                                    Confirm password
                                </label>
                                <div class="relative">
                                    <input v-model="passwordData.confirmPassword"
                                        :type="showPassword.confirm ? 'text' : 'password'"
                                        class="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all input-focus"
                                        placeholder="Re-enter new password">
                                    <button @click="togglePasswordVisibility('confirm')" type="button"
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <i :class="showPassword.confirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-if="passwordError" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-exclamation-triangle text-red-400 mr-3"></i>
                                <p class="text-red-700 font-medium">{{ passwordError }}</p>
                            </div>
                        </div>

                        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                            <div class="flex items-start">
                                <i class="fas fa-info-circle text-blue-400 mr-3 mt-1"></i>
                                <div>
                                    <p class="text-blue-700 font-medium mb-2">Strong password requirement:</p>
                                    <div class="grid grid-cols-2 gap-2 text-blue-600 text-sm">
                                        <span>• At least 8 characters</span>
                                        <span>• Has uppercase and lowercase letters</span>
                                        <span>• There is at least 1 number</span>
                                        <span>• Contains at least 1 special character</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-center py-12 bg-gray-50 rounded-2xl">
                        <div
                            class="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-shield-alt text-3xl text-red-500"></i>
                        </div>
                        <h4 class="text-xl font-semibold text-gray-800 mb-2">Account is secure</h4>
                        <p class="text-gray-600 mb-6">Your password is encrypted and securely protected.</p>
                        <div class="flex justify-center space-x-6 text-sm text-gray-500">
                            <span class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                Strong password
                            </span>
                            <span class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                Encrypted
                            </span>
                            <span class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                High security
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mt-6">
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-red-400 mr-3"></i>
                        <p class="text-red-700 font-medium">{{ error }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-hover {
    transition: all 0.3s ease;
}

.btn-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.input-focus {
    transition: all 0.3s ease;
}

.input-focus:focus {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.section-divider {
    height: 2px;
    background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
}
</style>