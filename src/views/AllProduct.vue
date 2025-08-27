<script setup>
import BaseInput from '@/components/common/BaseInput.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import { onMounted, ref, watch, computed } from 'vue';
import axios from 'axios';
import { ENV } from '@/config/env';
import { useToast } from "vue-toastification";
import Product from '@/components/Product.vue';
import Skeleton from '@/components/Skeleton.vue';

const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const toast = useToast();

const searchQuery = ref('');
const selectedBrand = ref('');
const minPrice = ref('');
const maxPrice = ref('');
const selectedSize = ref('');
const selectedSurface = ref('');
const selectedRating = ref('');
const sortBy = ref('name');

const sizes = ref(['38', '39', '40', '41', '42', '43']);
const surfaces = ref(['Turf', 'Firm Ground', 'Indoor']);
const ratings = ref(['5', '4', '3', '2', '1']);

const hasActiveFilters = computed(() =>
    !!(searchQuery.value || selectedBrand.value || minPrice.value || maxPrice.value ||
        selectedSize.value || selectedSurface.value || selectedRating.value)
);

let abortController;

function debounce(fn, delay = 500) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

const fetchProduct = async () => {
    try {

        loading.value = true;
        products.value = [];

        if (abortController) abortController.abort();
        abortController = new AbortController();

        const params = {
            name: searchQuery.value || undefined,
            min_price: minPrice.value || undefined,
            max_price: maxPrice.value || undefined,
            category_id: selectedBrand.value || undefined,
            size: selectedSize.value || undefined,
            surface: selectedSurface.value || undefined,
            rating: selectedRating.value || undefined,
            sort: sortBy.value || undefined,
        };

        const response = await axios.get(
            `${ENV.API_BASE_URL}/api/v1/product`,
            { params, signal: abortController.signal }
        );

        const json = response.data;
        if (json.status_code === 200) {
            products.value = Array.isArray(json.data) ? json.data : (json.data ? json.data : [])
        } else {
            products.value = []
        }
    } catch (error) {
        if (error.name !== 'CanceledError' && error.code !== 'ERR_CANCELED') {
            console.error('Failed to fetch products:', error);
            products.value = []
            toast.error("Failed to fetch products: " + error.message);
        }
    } finally {
        loading.value = false;
    }
};

const debouncedFetch = debounce(fetchProduct, 500);

const fetchCategories = async () => {
    try {
        const response = await axios.get(`${ENV.API_BASE_URL}/api/v1/category`);
        const json = response.data;
        if (json.status_code === 200) {
            categories.value = json.data;
        }
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
};

onMounted(() => {
    fetchCategories();
    fetchProduct();
});

watch(
    [searchQuery, selectedBrand, minPrice, maxPrice, selectedSize, selectedSurface, selectedRating, sortBy],
    () => debouncedFetch()
);

// reset filters
const resetFilters = () => {
    searchQuery.value = '';
    selectedBrand.value = '';
    minPrice.value = '';
    maxPrice.value = '';
    selectedSize.value = '';
    selectedSurface.value = '';
    selectedRating.value = '';
    sortBy.value = 'name';
    fetchProduct(); // gọi ngay 1 lần sau reset
};
</script>

<template>
    <div class="container mx-auto p-6">
        <div class="flex flex-col lg:flex-row gap-6">
            <!-- Sidebar filter -->
            <div class="lg:w-1/4 bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">🔍 Filter</h2>

                <div class="mb-6">
                    <BaseInput v-model="searchQuery" label="Search" placeholder="Search..." />
                </div>

                <div class="space-y-4">
                    <h3 class="font-medium text-gray-800 border-b pb-2">Advanced filter</h3>

                    <!-- Brand -> dùng categories (id + category_name) -->
                    <BaseSelect label="Brand" v-model="selectedBrand">
                        <option value="">All brands</option>
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                            {{ cat.category_name }}
                        </option>
                    </BaseSelect>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Price range</label>
                        <div class="flex gap-2">
                            <BaseInput type="number" v-model="minPrice" placeholder="Min price" />
                            <BaseInput type="number" v-model="maxPrice" placeholder="Max price" />
                        </div>
                    </div>

                    <BaseSelect label="Size" v-model="selectedSize">
                        <option value="">All sizes</option>
                        <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
                    </BaseSelect>

                    <BaseSelect label="Surface" v-model="selectedSurface">
                        <option value="">All surfaces</option>
                        <option v-for="s in surfaces" :key="s" :value="s">{{ s }}</option>
                    </BaseSelect>

                    <BaseSelect label="Rating" v-model="selectedRating">
                        <option value="">All ratings</option>
                        <option value="5">(5 stars or above)</option>
                        <option value="4">(4 stars or above)</option>
                        <option value="3">(3 stars or above)</option>
                        <option value="2">(2 stars or above)</option>
                        <option value="1">(1 stars or above)</option>
                    </BaseSelect>

                    <button @click="resetFilters"
                        class="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200">
                        Delete filters
                    </button>
                </div>
            </div>

            <div class="lg:w-3/4">
                <div class="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div class="flex justify-between items-center">
                        <p class="text-gray-600">
                            Showing {{ products.length }} products
                            <span v-if="hasActiveFilters" class="text-green-600">(filtered)</span>
                        </p>
                        <select v-model="sortBy"
                            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="name">Sort by name</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <template v-if="loading">
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <Skeleton v-for="n in 12" :key="n" />
                    </div>
                </template>

                <template v-else-if="products.length === 0">
                    <p class="text-center text-gray-500 py-10">
                        Products not found
                    </p>
                </template>

                <template v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <Product v-for="product in products" :key="product.id" :product="product" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
