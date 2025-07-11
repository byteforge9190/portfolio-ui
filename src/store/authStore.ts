// src/store/authStore.ts
// Why: This Zustand store manages the global authentication state
// with role-based access control integration

import { create } from 'zustand';
import type { User } from '../types';

// Why: Define the shape of our authentication state.
interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  hasRole: (requiredRoles: string[]) => boolean;
  canManageContent: () => boolean;
  isOwner: () => boolean;
  isAdmin: () => boolean;
}

// Why: Helper function to safely access localStorage
const getStorageItem = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

// Why: Create the store with role-based access control
export const useAuthStore = create<AuthState>((set, get) => ({
  // Why: Initialize the state with values from localStorage
  token: getStorageItem('token'),

  isLoading: false,

  user: (() => {
    const userString = getStorageItem('user');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e);
        localStorage.removeItem('user'); // Clear corrupted data
        return null;
      }
    }
    return null;
  })(),
  isAuthenticated: !!getStorageItem('token'), // Check if token exists


  // Why: The 'login' function updates the state and stores data in localStorage
  login: (token: string, user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  // Why: The 'logout' function clears the state and localStorage
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  // Why: Update user information (useful for profile updates)
  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ user });
  },

  // Why: Set loading state for authentication operations
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  // Why: Check if user has any of the required roles
  hasRole: (requiredRoles: string[]) => {
    const { user } = get();
    return user ? requiredRoles.includes(user.role) : false;
  },

  // Why: Check if user can manage content (owner or admin)
  canManageContent: () => {
    const { user } = get();
    return user ? ['owner', 'admin'].includes(user.role) : false;
  },

  // Why: Check if user is the portfolio owner
  isOwner: () => {
    const { user } = get();
    return user?.role === 'owner';
  },

  // Why: Check if user is an admin
  isAdmin: () => {
    const { user } = get();
    return user?.role === 'admin';
  },
}));