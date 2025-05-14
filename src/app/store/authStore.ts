// store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  name: string | null
  username: string
  password: string
  authorized: boolean
  setAuth: (authorized: boolean) => void,
  setName: (name: string) => void,
  setCredentials: (username: string, password: string) => void
  clearCredentials: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: '',
      password: '',
      name: '',
      authorized: false,
      setAuth: (authorized: boolean) => set({ authorized }),
      setName: (name: string) => set({ name }),
      setCredentials: (username, password) => set({ username, password }),
      clearCredentials: () => set({ username: '', password: '', name: null, authorized: false }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (key) => {
          const value = sessionStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          sessionStorage.removeItem(key);
        },
      },
    }
  )
)
