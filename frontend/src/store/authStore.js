// authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = "http://localhost:3000/api/auth";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      message: null,

      signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password, name }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Signup failed");

          set({ isLoading: false, isAuthenticated: true, user: data.user });
        } catch (error) {
          set({ isLoading: false, error: error.message });
          console.error("Signup error:", error);
          throw error;
        }
      },

      verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/verify-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ code }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Verification failed");

          set({ isLoading: false, isAuthenticated: true, user: data.user });
          return true;
        } catch (error) {
          set({ isLoading: false, error: error.message });
          console.error("Verify email error:", error);
          return false;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Login failed");

          set({ isLoading: false, isAuthenticated: true, user: data.user });
        } catch (error) {
          set({ isLoading: false, error: error.message });
          console.error("Login error:", error);
          throw error;
        }
      },

      checkAuth: async () => {
        try {
          const response = await fetch(`${API_URL}/check-auth`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const data = await response.json();
          if (!response.ok || !data.user) {
            set({ isAuthenticated: false, user: null, isCheckingAuth: false });
          } else {
            set({ isAuthenticated: true, user: data.user, isCheckingAuth: false });
          }
        } catch (error) {
          console.error("Check auth error:", error);
          set({ isAuthenticated: false, user: null, isCheckingAuth: false });
        }
      },

      logout: async () => {
        try {
          await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
        } catch (error) {
          console.error("Logout error:", error);
          set({ error: error.message });
        }

        // Clear all auth state
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          message: null,
        });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
