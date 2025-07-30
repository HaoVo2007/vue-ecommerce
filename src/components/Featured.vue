<script setup>

const props = defineProps({
    title: String,
    label: String,
    type: String
})

</script>

<template>
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{{ title }}</h2>
                <p class="text-gray-600 text-lg max-w-3xl mx-auto">{{ label }}</p>
            </div>

            <div v-if="type == 'business'">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ">
                    <!-- Left Content -->
                    <div class="space-y-8">
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 mb-6">
                                Performance Meets Innovation
                            </h3>
                            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                                Every pair of our soccer shoes is meticulously designed to enhance your game.
                                From professional stadiums to local pitches, our footwear delivers the precision,
                                comfort, and durability that serious players demand.
                            </p>
                        </div>

                        <!-- Features List -->
                        <div class="space-y-4">
                            <div class="flex items-start space-x-4">
                                <div
                                    class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <i class="fas fa-bolt text-blue-600 text-sm"></i>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-800 mb-1">Lightning Speed Technology</h4>
                                    <p class="text-gray-600">Advanced lightweight materials for explosive acceleration
                                        and quick direction changes.</p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-4">
                                <div
                                    class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <i class="fas fa-shield-alt text-green-600 text-sm"></i>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-800 mb-1">Superior Grip & Control</h4>
                                    <p class="text-gray-600">Innovative stud patterns and textured surfaces for optimal
                                        ball control in any condition.</p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-4">
                                <div
                                    class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <i class="fas fa-heart text-purple-600 text-sm"></i>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-800 mb-1">All-Day Comfort</h4>
                                    <p class="text-gray-600">Ergonomic design with premium cushioning for maximum
                                        comfort during extended play.</p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-4">
                                <div
                                    class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <i class="fas fa-award text-orange-600 text-sm"></i>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-800 mb-1">Professional Grade Quality</h4>
                                    <p class="text-gray-600">Trusted by professional athletes and built to withstand the
                                        demands of competitive play.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Content - Main Image -->
                    <div class="relative">
                        <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                            <div class="bg-white bg-opacity-10 rounded-xl p-8 text-center h-84 bg-experience">
                                <h4 class="text-2xl font-bold text-white mb-4">Premium Soccer Cleats</h4>
                                <p class="text-blue-100">Engineered for Excellence</p>
                            </div>
                        </div>
                        <!-- Floating Stats -->
                        <div class="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-600">50K+</div>
                                <div class="text-sm text-gray-600">Happy Players</div>
                            </div>
                        </div>
                        <div class="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600">15+</div>
                                <div class="text-sm text-gray-600">Years Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="type == 'collection'">
                <div class="">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <!-- Image 1 - Large -->
                        <div class="lg:col-span-2 lg:row-span-2">
                            <div
                                class="bg-nike bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl h-full min-h-80 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group">
                                <div class="text-center text-white">
                                    <h4 class="text-xl font-bold">Speed Collection</h4>
                                    <p class="text-red-100">Lightning Fast Performance</p>
                                </div>
                            </div>
                        </div>

                        <!-- Image 2 -->
                        <div class="lg:col-span-1">
                            <div
                                class="bg-adidas bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl h-40 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group">
                                <div class="text-center text-white">
                                    <h5 class="font-bold">Control Series</h5>
                                </div>
                            </div>
                        </div>

                        <!-- Image 3 -->
                        <div class="lg:col-span-1">
                            <div
                                class="bg-image-1 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl h-40 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group">
                                <div class="text-center text-white">
                                    <h5 class="font-bold">Comfort Line</h5>
                                </div>
                            </div>
                        </div>

                        <!-- Image 4 -->
                        <div class="lg:col-span-1">
                            <div
                                class="bg-image-2 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl h-40 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group">
                                <div class="text-center text-white">
                                    <h5 class="font-bold">Pro Edition</h5>
                                </div>
                            </div>
                        </div>

                        <!-- Image 5 -->
                        <div class="lg:col-span-2">
                            <div
                                class="bg-image-3 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl h-40 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group">
                                <div class="text-center text-white">
                                    <h4 class="text-lg font-bold">Youth Collection</h4>
                                    <p class="text-orange-100">Future Champions Start Here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="type == 'contact'">
                <section class="">
                    <div class="container mx-auto px-4">
                        <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                            <!-- Contact Information -->
                            <div class="space-y-8">
                                <div>
                                    <h3 class="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                                    <p class="text-gray-600 mb-8">
                                        Feel free to reach out to us through any of the following methods. We're here to
                                        help!
                                    </p>
                                </div>

                                <!-- Contact Items -->
                                <div class="space-y-6">
                                    <!-- Phone -->
                                    <div class="flex items-start space-x-4">
                                        <div
                                            class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-phone text-blue-600 text-lg"></i>
                                        </div>
                                        <div>
                                            <h4 class="text-lg font-semibold text-gray-800 mb-1">Phone</h4>
                                            <p class="text-gray-600">+1 (555) 123-4567</p>
                                            <p class="text-gray-600">+1 (555) 987-6543</p>
                                        </div>
                                    </div>

                                    <!-- Email -->
                                    <div class="flex items-start space-x-4">
                                        <div
                                            class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-envelope text-green-600 text-lg"></i>
                                        </div>
                                        <div>
                                            <h4 class="text-lg font-semibold text-gray-800 mb-1">Email</h4>
                                            <p class="text-gray-600">info@company.com</p>
                                            <p class="text-gray-600">support@company.com</p>
                                        </div>
                                    </div>

                                    <!-- Address -->
                                    <div class="flex items-start space-x-4">
                                        <div
                                            class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-map-marker-alt text-purple-600 text-lg"></i>
                                        </div>
                                        <div>
                                            <h4 class="text-lg font-semibold text-gray-800 mb-1">Address</h4>
                                            <p class="text-gray-600">123 Business Street</p>
                                            <p class="text-gray-600">Suite 100, City, State 12345</p>
                                        </div>
                                    </div>

                                    <!-- Working Hours -->
                                    <div class="flex items-start space-x-4">
                                        <div
                                            class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-clock text-orange-600 text-lg"></i>
                                        </div>
                                        <div>
                                            <h4 class="text-lg font-semibold text-gray-800 mb-1">Working Hours</h4>
                                            <p class="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                            <p class="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Social Media -->
                                <div class="pt-8">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
                                    <div class="flex space-x-4">
                                        <a href="#"
                                            class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#"
                                            class="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                                            <i class="fab fa-twitter"></i>
                                        </a>
                                        <a href="#"
                                            class="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                                            <i class="fab fa-instagram"></i>
                                        </a>
                                        <a href="#"
                                            class="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                                            <i class="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Contact Form -->
                            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                                <h3 class="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>

                                <form class="space-y-6">
                                    <!-- Name and Email Row -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full
                                                Name</label>
                                            <input type="text" id="name" name="name"
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                placeholder="Your full name">
                                        </div>
                                        <div>
                                            <label for="email"
                                                class="block text-sm font-medium text-gray-700 mb-2">Email
                                                Address</label>
                                            <input type="email" id="email" name="email"
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                placeholder="your.email@example.com">
                                        </div>
                                    </div>

                                    <!-- Phone and Subject Row -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label for="phone"
                                                class="block text-sm font-medium text-gray-700 mb-2">Phone
                                                Number</label>
                                            <input type="tel" id="phone" name="phone"
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                placeholder="+1 (555) 123-4567">
                                        </div>
                                        <div>
                                            <label for="subject"
                                                class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                            <select id="subject" name="subject"
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="support">Technical Support</option>
                                                <option value="sales">Sales Question</option>
                                                <option value="partnership">Partnership</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Message -->
                                    <div>
                                        <label for="message"
                                            class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea id="message" name="message" rows="5"
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Tell us how we can help you..."></textarea>
                                    </div>

                                    <!-- Submit Button -->
                                    <div>
                                        <button type="submit"
                                            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                                            <i class="fas fa-paper-plane mr-2"></i>
                                            Send Message
                                        </button>
                                    </div>

                                    <!-- Privacy Notice -->
                                    <p class="text-sm text-gray-500 text-center">
                                        By submitting this form, you agree to our
                                        <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
                                        and
                                        <a href="#" class="text-blue-600 hover:underline">Terms of Service</a>.
                                    </p>
                                </form>
                            </div>
                        </div>

                        <!-- Map Section (Optional) -->
                        <div class="mt-16">
                            <div class="bg-gray-200 rounded-2xl h-64 lg:h-80 flex items-center justify-center">
                                <div class="text-center text-gray-500">
                                    <i class="fas fa-map-marked-alt text-4xl mb-4"></i>
                                    <p class="text-lg">Interactive Map Placeholder</p>
                                    <p class="text-sm">Integrate with Google Maps or similar service</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>
<style scoped>
.bg-experience {
    background-image: url('/image/sections/background_1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.bg-nike {
    background-image: url('/image/sections/nike.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.bg-adidas {
    background-image: url('/image/sections/adidas.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.bg-image-1 {
    background-image: url('/image/sections/football-1207235_1280.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.bg-image-2 {
    background-image: url('/image/sections/football-boots-4290420_1280.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.bg-image-3 {
    background-image: url('/image/sections/soccer-2394121_1280.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>