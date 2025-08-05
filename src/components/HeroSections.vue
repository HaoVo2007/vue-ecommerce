<script setup>
// Hiện chưa cần gì trong script
</script>

<template>
    <div class="w-full p-8 md:p-20">
        <div class="relative w-full h-80 md:h-120 bg-cover bg-center bg-no-repeat bg-football mb-4">
            <div class="absolute inset-0 bg-opacity-50"></div>

            <div class="relative z-10 flex flex-col justify-center h-full px-6 md:px-12">
                <h1 class="text-white text-3xl md:text-5xl font-bold leading-tight mb-6 md:mb-8 max-w-xl">
                    Latest soccer shoes collection<br>
                    Style & Class
                </h1>

                <button
                    class="border border-white text-white px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-colors duration-300 w-fit">
                    See now
                </button>
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
            <div class="relative w-full md:w-1/2 h-80 md:h-96 bg-cover bg-center bg-no-repeat bg-stadium">
                <div class="absolute inset-0 bg-opacity-50"></div>
                <div class="relative z-10 flex flex-col justify-center h-full px-6 md:px-12">
                    <h2 class="text-white text-2xl md:text-4xl font-bold leading-tight mb-6 md:mb-8 max-w-md">
                        Top quality<br>
                        Shoes for all pitches
                    </h2>

                    <button
                        class="border border-white text-white px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-colors duration-300 w-fit">
                        Explore more
                    </button>
                </div>
            </div>

            <div class="relative w-full md:w-1/2 h-80 md:h-96 bg-cover bg-center bg-no-repeat bg-grass">
                <div class="absolute inset-0 bg-opacity-50"></div>
                <div class="relative z-10 flex flex-col justify-center h-full px-6 md:px-12">
                    <h2 class="text-white text-2xl md:text-4xl font-bold leading-tight mb-6 md:mb-8 max-w-md">
                        Maximum comfort<br>
                        Design to suit every style
                    </h2>

                    <button
                        class="border border-white text-white px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-colors duration-300 w-fit">
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-stadium {
    background-image: url('/image/sections/indoor-soccer-4813883_1280.jpg');
}

.bg-football {
    background-image: url('/image/sections/football-3024154_1280.jpg');
}

.bg-grass {
    background-image: url('/image/sections/soccer-1331838_1280.jpg');
}
</style>
