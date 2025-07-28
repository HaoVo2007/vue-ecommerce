<script setup>
import SubmitButton from './SubmitButton.vue'

const props = defineProps({
  title: String,
  mode: String,
  form: Object,
  loading: { type: Boolean, default: false }, 
})

const emit = defineEmits(['submit'])

const submitForm = (e) => {
  e.preventDefault()
  emit('submit')
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        Flowbite
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {{ title }}
          </h1>
          <form class="space-y-4 md:space-y-6" @submit="submitForm">
            <div v-if="mode === 'register'" class="flex items-center gap-4 justify-between">
              <div>
                <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                <input v-model="form.firstname" type="text" name="firstname" id="firstname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="">
              </div>
              <div>
                <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                <input v-model="form.lastname" type="text" name="lastname" id="lastname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="">
              </div>
            </div>
            
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input v-model="form.email" type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required="">
            </div>
            
            <div class="flex gap-4">
              <div v-if="mode === 'register'">
              <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input v-model="form.address" type="text" name="address" id="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
            </div>
            
            <div v-if="mode === 'register'">
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
              <input v-model="form.phone" type="tel" name="phone" id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
            </div>
            </div>
            
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="form.password" type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
            </div>
            
            <!-- ✅ Sửa prop name và truyền đúng giá trị -->
            <SubmitButton 
              :loading="loading" 
              :text="mode === 'login' ? 'Sign In' : 'Sign Up'" 
            />
            
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <span v-if="mode === 'login'">
                Don't have an account yet? 
                <router-link to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </router-link>
              </span>
              <span v-else>
                Already have an account? 
                <router-link to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign in
                </router-link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
