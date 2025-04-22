import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IAuthState } from '../types/auth.types';

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      authToken: null,
      refreshToken: null,
      role: null,
      setAuthToken: (token: string | null) => set({ authToken: token }),
      setRefreshToken: (token: string | null) => set({ refreshToken: token }),
      setRole: (role: string | null) => set({ role }),
      logout: () => set({ authToken: null, refreshToken: null, role: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        authToken: state.authToken,
        refreshToken: state.refreshToken,
        role: state.role,
      }),
    },
  ),
);
