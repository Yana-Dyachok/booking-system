import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IAuthState } from '../types/auth.types';
import { Role } from '../types';

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      authToken: null,
      refreshToken: null,
      role: null,
      lastVisitedPage: null,
      setAuthToken: (token: string | null) => set({ authToken: token }),
      setRefreshToken: (token: string | null) => set({ refreshToken: token }),
      setRole: (role: Role | null) => set({ role }),
      setLastVisitedPage: (page: string | null) =>
        set({ lastVisitedPage: page }),
      logout: () =>
        set({
          authToken: null,
          refreshToken: null,
          role: null,
          lastVisitedPage: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        authToken: state.authToken,
        refreshToken: state.refreshToken,
        role: state.role,
        lastVisitedPage: state.lastVisitedPage,
      }),
    },
  ),
);
