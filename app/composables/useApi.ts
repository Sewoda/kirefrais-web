export const useApi = () => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    async onRequest({ options }) {
      const authStore = useAuthStore()
      const headers = new Headers(options.headers)
      headers.set('Accept', 'application/json')
      headers.set('Content-Type', 'application/json')
      if (authStore.token) {
        headers.set('Authorization', `Bearer ${authStore.token}`)
      }
      options.headers = headers
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        const authStore = useAuthStore()
        authStore.clearAuth()
        await navigateTo('/auth/connexion')
      }
    }
  })

  return { api }
}
