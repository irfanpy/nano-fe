// Zustand store for authentication state
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user:  null,
      token: null,
      setUser:  (user)  => set({ user }),
      setToken: (token) => set({ token }),
      clearAuth: ()     => set({ user: null, token: null }),
    }),
    { name: 'thh-auth' }
  )
)

export default useAuthStore
