// Global UI store – handles opening / closing the auth modal from anywhere
import { create } from "zustand"

export type AuthModalMode = "login" | "register"

interface UIState {
  authModalOpen: boolean
  authModalMode: AuthModalMode
  openAuthModal: (mode?: AuthModalMode) => void
  closeAuthModal: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  authModalOpen: false,
  authModalMode: "login",
  openAuthModal: (mode = "login") => set({ authModalOpen: true, authModalMode: mode }),
  closeAuthModal: () => set({ authModalOpen: false }),
}))
