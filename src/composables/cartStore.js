import { defineStore } from "pinia";
import axios from "axios";
import { ENV } from "@/config/env";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0,
    totalQuantity: 0
  }),
  
  actions: {
    async getCartItems(userID) {
      try {
        const response = await axios.get(`${ENV.API_BASE_URL}/api/v1/cart/${userID}`);
        this.items = response.data.data.cart_items;
        this.total = response.data.data.total_price;
        this.updateTotalQuantity();
      } catch (error) {
        toast.error("❌ Failed to fetch cart items");
      }
    },
    async updateCartItem(userID, productId, size, quantity, type) {
      try {
        const response = await axios.put(`${ENV.API_BASE_URL}/api/v1/cart`, {
          user_id: userID,
          product_id: productId,
          size: size,
          quantity: quantity,
          types: type
        });
        
        if (response.data.status_code === 200) {
          await this.getCartItems(userID);
          return { success: true };
        }
      } catch (error) {
        console.error("❌ Failed to update cart:", error);
        toast.error("❌ Failed to update cart item");
        return { success: false, error };
      }
    },
    async removeFromCart(userID, productId) {
      try {
        const response = await axios.delete(`${ENV.API_BASE_URL}/api/v1/cart`, {
          data: {
            user_id: userID,
            product_id: productId
          }
        });
        
        if (response.data.status_code === 200) {
          await this.getCartItems(userID);
          toast.success("✅ Product removed from cart");
          return { success: true };
        }
      } catch (error) {
        toast.error("❌ Failed to remove product from cart");
        return { success: false, error };
      }
    },
    updateTotalQuantity() {
      this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    incrementQuantity(item, userID) {
      const newQuantity = 1;
      this.updateCartItem(userID, item.product_id, item.size, newQuantity, "add");
    },
    decrementQuantity(item, userID) {
      if (item.quantity > 1) {
        const newQuantity = 1;
        this.updateCartItem(userID, item.product_id, item.size, newQuantity, "remove");
      }
    },
    async fetchCartQuantity(userID) {
      try {
        const response = await axios.get(`${ENV.API_BASE_URL}/api/v1/cart/${userID}`);
        this.totalQuantity = response.data.data.cart_items.reduce((sum, item) => sum + item.quantity, 0);
      } catch (error) {
        console.error("❌ Failed to fetch cart quantity:", error);
        this.totalQuantity = 0;
      }
    },
    clearCart() {
      this.items = [];
      this.total = 0;
      this.totalQuantity = 0;
    }
  }
});