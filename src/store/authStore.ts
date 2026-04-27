import { create } from 'zustand';
import type { User } from '../types';
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

const getStorageItem = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: getStorageItem('token'),
  isLoading: false,

  user: (() => {
    const userString = getStorageItem('user');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e);
        localStorage.removeItem('user'); 
        return null;
      }
    }
    return null;
  })(),
  isAuthenticated: !!getStorageItem('token'), 

  login: (token: string, user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ user });
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  hasRole: (requiredRoles: string[]) => {
    const { user } = get();
    return user ? requiredRoles.includes(user.role) : false;
  },
  canManageContent: () => {
    const { user } = get();
    return user ? ['owner', 'admin'].includes(user.role) : false;
  },

  isOwner: () => {
    const { user } = get();
    return user?.role === 'owner';
  },

  isAdmin: () => {
    const { user } = get();
    return user?.role === 'admin';
  },
}));