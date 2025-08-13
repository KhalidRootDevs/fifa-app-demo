// Global auth store
// You can replace this stub with real auth logic (Supabase, NextAuth, etc.)
import { create } from "zustand"

type User = {
  id: string
  name: string
  email: string
} | null

interface AuthState {
  user: User
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
