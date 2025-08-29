<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import Footer from "./components/Footer.vue";
onMounted(() => {
  initFlowbite();
})
import OverLoader from '@/components/OverLoader.vue'
import { useOverLoader } from '@/composables/useOverLoader'

const { loaderState, hideLoader } = useOverLoader()
</script>

<template>
  <Header />
  <RouterView />
  <OverLoader :show="loaderState.show" :title="loaderState.title" :message="loaderState.message"
    :sub-message="loaderState.subMessage" :type="loaderState.type" :progress="loaderState.progress"
    :show-progress="loaderState.showProgress" :cancellable="loaderState.cancellable" @cancel="hideLoader" />
  <Footer />
</template>
