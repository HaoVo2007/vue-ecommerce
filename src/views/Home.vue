<script setup>
import HeroSections from '../components/HeroSections.vue';
import Featured from "../components/Featured.vue";
import FeaturedProduct from "../components/FeaturedProduct.vue";
</script>

<template>
    <div class="p-10">
        <HeroSections />
    <FeaturedProduct title="Featured Products" label="Discover our top-rated soccer shoes trusted by professionals" type="product" />
    <Featured title="Why Choose Our Soccer Shoes?" label="Engineered for champions, crafted for comfort. Our soccer shoes combine cutting-edge technology with premium materials to deliver unmatched performance on the field." type="business" />
    <Featured title="Our Soccer Shoe Collection" label="Explore our curated selection of high-performance soccer shoes designed for speed, comfort, and total control on the field." type="collection" />
    <Featured title="Get In Touch" label="We'd love to hear from you. Send us a message and we'll respond as soon as possible." type="contact" />
    </div>
</template>