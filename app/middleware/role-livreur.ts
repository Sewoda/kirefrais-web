export default defineNuxtRouteMiddleware(() => {
    const store = useAuthStore()
    if (!store.isLivreur) return navigateTo('/')
})
