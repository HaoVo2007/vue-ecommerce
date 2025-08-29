<template>
    <Teleport to="body">
        <Transition enter-active-class="transition-opacity duration-300 ease-out"
            leave-active-class="transition-opacity duration-300 ease-in" enter-from-class="opacity-0"
            leave-to-class="opacity-0">
            <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                @click="handleBackdropClick">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full">
                    <!-- Header -->
                    <div class="text-center mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {{ title }}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ message }}
                        </p>
                    </div>

                    <!-- Loading Animation Based on Type -->
                    <div class="mb-6 flex justify-center">
                        <!-- Spinner Type -->
                        <div v-if="type === 'spinner'" class="relative">
                            <div
                                class="w-16 h-16 border-4 border-gray-200 dark:border-gray-600 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400">
                            </div>
                        </div>

                        <!-- Pulse Type -->
                        <div v-else-if="type === 'pulse'" class="flex space-x-2">
                            <div class="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                            <div class="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style="animation-delay: 0.2s">
                            </div>
                            <div class="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style="animation-delay: 0.4s">
                            </div>
                        </div>

                        <!-- Bouncing Dots -->
                        <div v-else-if="type === 'dots'" class="flex space-x-2">
                            <div
                                class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce">
                            </div>
                            <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
                                style="animation-delay: 0.1s"></div>
                            <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
                                style="animation-delay: 0.2s"></div>
                        </div>

                        <!-- Circle Progress -->
                        <div v-else-if="type === 'circle'" class="relative w-16 h-16">
                            <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="none"
                                    class="text-gray-200 dark:text-gray-600" />
                                <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="none"
                                    stroke-linecap="round" class="text-blue-600 dark:text-blue-400"
                                    :stroke-dasharray="`${progress * 2.51} 251.2`"
                                    style="transition: stroke-dasharray 0.3s ease" />
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                    {{ Math.round(progress) }}%
                                </span>
                            </div>
                        </div>

                        <!-- Wave Type -->
                        <div v-else-if="type === 'wave'" class="flex items-end space-x-1">
                            <div
                                class="w-2 h-8 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse">
                            </div>
                            <div class="w-2 h-6 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse"
                                style="animation-delay: 0.1s"></div>
                            <div class="w-2 h-10 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse"
                                style="animation-delay: 0.2s"></div>
                            <div class="w-2 h-4 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse"
                                style="animation-delay: 0.3s"></div>
                            <div class="w-2 h-7 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse"
                                style="animation-delay: 0.4s"></div>
                        </div>

                        <!-- Default Gradient Spinner -->
                        <div v-else class="relative">
                            <div
                                class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin">
                                <div class="absolute inset-2 bg-white dark:bg-gray-800 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Progress Bar (if showProgress is true) -->
                    <div v-if="showProgress" class="mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                            <span class="text-sm text-gray-600 dark:text-gray-400">{{ Math.round(progress) }}%</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                                :style="{ width: progress + '%' }"></div>
                        </div>
                    </div>

                    <!-- Sub Message -->
                    <div v-if="subMessage" class="text-center">
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ subMessage }}
                        </p>
                    </div>

                    <!-- Cancel Button (if cancellable) -->
                    <div v-if="cancellable" class="mt-6 flex justify-center">
                        <button @click="$emit('cancel')"
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'Loading...'
    },
    message: {
        type: String,
        default: 'Please wait while we process your request'
    },
    subMessage: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'spinner',
        validator: (value) => ['spinner', 'pulse', 'dots', 'circle', 'wave', 'gradient'].includes(value)
    },
    progress: {
        type: Number,
        default: 0,
        validator: (value) => value >= 0 && value <= 100
    },
    showProgress: {
        type: Boolean,
        default: false
    },
    cancellable: {
        type: Boolean,
        default: false
    },
    backdropClosable: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['cancel', 'backdrop-click'])

const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
        if (props.backdropClosable) {
            emit('backdrop-click')
        }
    }
}
</script>

<style scoped>
/* Custom animations for better effects */
@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.fade-in-scale {
    animation: fadeInScale 0.3s ease-out;
}

/* Custom bounce animation with delays */
@keyframes bounceDelay {

    0%,
    80%,
    100% {
        transform: scale(0.8);
        opacity: 0.5;
    }

    40% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-bounce-delay {
    animation: bounceDelay 1.4s infinite ease-in-out both;
}

/* Gradient spinner animation */
@keyframes gradientSpin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>