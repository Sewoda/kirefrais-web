export const useCurrentUser = () => {
    const store = useAuthStore()
    const { api } = useApi()

    const logout = async () => {
        try { await api('/auth/logout', { method: 'POST' }) } catch { }
        store.clearAuth()
        navigateTo('/')
    }

    return {
        user: computed(() => store.user),
        isLoggedIn: computed(() => store.isLoggedIn),
        isAdmin: computed(() => store.isAdmin),
        isLivreur: computed(() => store.isLivreur),
        isClient: computed(() => store.isClient),
        logout,
    }
}
