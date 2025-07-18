<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-300 via-blue-200 to-blue-100 flex items-center justify-center p-4 mt-1">
    <div class="flex items-center justify-center w-full max-w-6xl gap-8 p-4">
      <div class="relative w-1/2">
        <div class="absolute z-10"
        :style="{
          left: '-350px',
          top: mode === 'register' ? '120px' : '-20px'
        }"
        >
          <img style="width: 550px; height: 450px" src="https://colorlib.com/etc/regform/colorlib-regform-26/images/image-1.png"
            alt="Character illustration" class="w-80 h-auto object-contain" />
        </div>
        <!-- Right side - Form -->
        <div class="flex-1 w-full">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-800 tracking-wider">{{ title }}</h2>
            </div>

            <form @submit="submitForm" class="space-y-6">
              <!-- Phone Number field (for register mode) -->
              <div v-if="mode === 'register'" class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                    </path>
                  </svg>
                </div>
                <input v-model="form.phone" type="text" placeholder="Phone Number"
                  class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>

              <!-- Email field -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                    </path>
                  </svg>
                </div>
                <input v-model="form.email" type="email" placeholder="Mail"
                  class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>

              <!-- Password field -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                    </path>
                  </svg>
                </div>
                <input v-model="form.password" type="password" placeholder="Password"
                  class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>

              <!-- Confirm Password field (for register mode) -->
              <div v-if="mode === 'register'" class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                    </path>
                  </svg>
                </div>
                <input v-model="form.confirmPassword" type="password" placeholder="Confirm Password"
                  class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>

              <!-- Submit Button -->
              <button type="submit"
                class="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {{ mode === 'register' ? 'REGISTER' : 'LOGIN' }}
              </button>
            </form>
          </div>
        </div>
        <div class="absolute"
        :style="{
          right: '-80px',
          bottom: mode === 'register' ? '-20px' : '-20px'
        }"
        >
          <img src="https://colorlib.com/etc/regform/colorlib-regform-26/images/image-2.png" alt="Decorative plant"
            class="w-32 h-auto object-contain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'mode', 'form'])
const emit = defineEmits(['submit'])

const submitForm = (e) => {
  e.preventDefault()
  emit('submit')
}
</script>