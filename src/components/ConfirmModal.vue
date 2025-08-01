  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import SubmitButton from './SubmitButton.vue'

  const props = defineProps({
    show: { type: Boolean, required: true },
    title: { type: String, default: 'Are you sure?' },
    message: { type: String, default: 'Do you want to continue?' },
    confirmText: { type: String, default: 'Yes' },
    cancelText: { type: String, default: 'Cancel' },
    loading: { type: Boolean, default: false },
  })

  const emit = defineEmits(['confirm', 'cancel'])
  const onConfirm = () => emit('confirm')
  const onCancel = () => emit('cancel')
</script>

  <template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Close button -->
          <button @click="onCancel" type="button"
            class="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 rounded-lg p-1 dark:hover:bg-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>

          <div class="p-6 text-center">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {{ title }}
            </h3>
            <p class="mb-5 text-sm text-gray-700 dark:text-gray-300">{{ message }}</p>
            <div class="flex justify-center items-center gap-4 w-full">
              <SubmitButton class="flex-1 bg-red-600" :loading="loading" @click="onConfirm" :text="confirmText" />
              <button :disabled="loading" @click="onCancel" type="button"
                class="flex-1 ml-3 py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                {{ cancelText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
