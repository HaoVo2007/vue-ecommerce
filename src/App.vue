<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import Footer from "./components/Footer.vue";
onMounted(() => {
    initFlowbite();
})
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>



