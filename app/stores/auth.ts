import { defineStore } from 'pinia'
import type { User } from '~/types/user'

interface AuthState {
    user: User | null
    token: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
    }),

    getters: {
        isLoggedIn: (s) => !!s.token && !!s.user,
        isAdmin: (s) => s.user?.role === 'admin',
        isLivreur: (s) => s.user?.role === 'livreur',
        isClient: (s) => s.user?.role === 'client',
    },

    actions: {
        setAuth(user: User, token: string) {
            this.user = user
            this.token = token
        },

        clearAuth() {
            this.user = null
            this.token = null
        },

        async fetchMe() {
            const { api } = useApi()
            try {
                const data = await api<{ data: User }>('/auth/me')
                this.user = data.data
            } catch {
                this.clearAuth()
            }
        },
    },

    persist: true,
})
