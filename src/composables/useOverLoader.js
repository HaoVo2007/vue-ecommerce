
import { ref, reactive } from 'vue'

const loaderState = reactive({
    show: false,
    title: 'Loading...',
    message: 'Please wait while we process your request',
    subMessage: '',
    type: 'spinner',
    progress: 0,
    showProgress: false,
    cancellable: false,
    backdropClosable: false
})

export function useOverLoader() {
    const showLoader = (options = {}) => {
        Object.assign(loaderState, {
            show: true,
            title: options.title || 'Loading...',
            message: options.message || 'Please wait while we process your request',
            subMessage: options.subMessage || '',
            type: options.type || 'spinner',
            progress: options.progress || 0,
            showProgress: options.showProgress || false,
            cancellable: options.cancellable || false,
            backdropClosable: options.backdropClosable || false
        })
    }

    const hideLoader = () => {
        loaderState.show = false
    }

    const updateProgress = (progress, subMessage = '') => {
        loaderState.progress = progress
        if (subMessage) {
            loaderState.subMessage = subMessage
        }
    }

    const updateMessage = (message, subMessage = '') => {
        loaderState.message = message
        if (subMessage) {
            loaderState.subMessage = subMessage
        }
    }

    const showPageLoader = (title = 'Loading Page...') => {
        showLoader({
            title,
            message: 'Please wait while the page loads',
            type: 'gradient'
        })
    }

    const showApiLoader = (message = 'Processing your request...') => {
        showLoader({
            title: 'Please Wait',
            message,
            type: 'spinner'
        })
    }

    const showProgressLoader = (title = 'Upload in Progress', message = 'Uploading files...') => {
        showLoader({
            title,
            message,
            type: 'circle',
            showProgress: true,
            progress: 0
        })
    }

    const showDataLoader = (message = 'Loading data...') => {
        showLoader({
            title: 'Loading',
            message,
            type: 'wave'
        })
    }

    return {
        loaderState,

        showLoader,
        hideLoader,
        updateProgress,
        updateMessage,

        showPageLoader,
        showApiLoader,
        showProgressLoader,
        showDataLoader
    }
}