/**
 * Authentication store (Zustand)
 */

import { create } from 'zustand'
import { authAPI, UserData } from '@/lib/auth-api'

interface AuthState {
  user: UserData | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  register: (email: string, password: string, passwordConfirm: string, firstName?: string, lastName?: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  getCurrentUser: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  register: async (email, password, passwordConfirm, firstName, lastName) => {
    set({ isLoading: true, error: null })
    try {
      const user = await authAPI.register({
        email,
        password,
        password_confirm: passwordConfirm,
        first_name: firstName,
        last_name: lastName,
      })
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || 'Registration failed',
        isLoading: false,
      })
      throw error
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      await authAPI.login({ email, password })
      const user = await authAPI.getCurrentUser()
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || 'Login failed',
        isLoading: false,
      })
      throw error
    }
  },

  logout: () => {
    authAPI.logout()
    set({ user: null, isAuthenticated: false, error: null })
  },

  getCurrentUser: async () => {
    set({ isLoading: true })
    try {
      if (authAPI.isAuthenticated()) {
        const user = await authAPI.getCurrentUser()
        set({ user, isAuthenticated: true, isLoading: false })
      } else {
        set({ isAuthenticated: false, isLoading: false })
      }
    } catch (error: any) {
      set({ isAuthenticated: false, isLoading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
