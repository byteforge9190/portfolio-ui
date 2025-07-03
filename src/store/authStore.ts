// src/store/authStore.ts
// Why: This Zustand store manages the global authentication state
// (user data, token, authentication status).

import { create } from 'zustand';

// Why: Define the shape of our authentication state.
interface AuthState {
  token: string | null;
  user: { email: string } | null;
  isAuthenticated: boolean;
  login: (token: string, user: { email: string }) => void;
  logout: () => void;
}

// Why: Create the store. Zustand is simple and uses a hook-like API.
export const useAuthStore = create<AuthState>((set) => ({
  // Why: Initialize the state with values from localStorage.
  // This allows the user to stay logged in across page reloads.
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  isAuthenticated: !!localStorage.getItem('token'), // Check if token exists

  // Why: The 'login' function updates the state and stores data in localStorage.
  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  // Why: The 'logout' function clears the state and localStorage.
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));