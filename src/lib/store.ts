// ==========================================
// HomeTutor AI - Auth Store (Zustand)
// Demo mode authentication for hackathon
// ==========================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserRole } from './types'
import { getUsers, saveUser, initStorage } from './storage'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true })
        initStorage()
        
        // Find user by email in LocalStorage
        const users = getUsers()
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase())
        
        if (found) {
          set({ user: found, isAuthenticated: true, isLoading: false })
          return { success: true }
        }

        set({ isLoading: false })
        return { success: false, error: 'User not found. Try one of the demo quick-login buttons below.' }
      },

      register: async (email: string, _password: string, name: string, role: UserRole) => {
        set({ isLoading: true })
        initStorage()
        
        const users = getUsers()
        const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase())
        if (existing) {
          set({ isLoading: false })
          return { success: false, error: 'Email already registered' }
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          role,
          full_name: name,
          is_verified: true,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        // Save new user into LocalStorage database
        saveUser(newUser)

        set({ user: newUser, isAuthenticated: true, isLoading: false })
        return { success: true }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },

      updateUser: (updates) => {
        const current = get().user
        if (current) {
          set({ user: { ...current, ...updates } })
        }
      },
    }),
    {
      name: 'hometutor-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
