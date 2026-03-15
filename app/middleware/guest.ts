export default defineNuxtRouteMiddleware(() => {
  const store = useAuthStore()
  if (store.isLoggedIn) {
    if (store.isAdmin)   return navigateTo('/admin/dashboard')
    if (store.isLivreur) return navigateTo('/livreur/dashboard')
    return navigateTo('/')
  }
})
