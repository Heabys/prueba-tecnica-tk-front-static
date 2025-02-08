import { defineStore } from "pinia";
import { authService } from "../services/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("authToken") || null,
  }),

  actions: {
    async login(credentials) {
      try {
        const user = await authService.login(credentials);
        this.user = user;
        this.token = localStorage.getItem("authToken");
        return true;
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    logout() {
      authService.logout();
      this.user = null;
      this.token = null;
    },
  },
});
