export default defineNuxtRouteMiddleware(() => {
    const store = useAuthStore()
    if (!store.isAdmin) return navigateTo('/')
})
