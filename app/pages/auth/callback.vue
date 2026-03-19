<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
    <div class="text-center">
      <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Icon name="heroicons:arrow-path" class="w-8 h-8 text-primary animate-spin" />
      </div>
      <h2 class="font-display font-bold text-2xl text-gray-900 mb-2">Authentification...</h2>
      <p class="text-gray-500 text-sm">Veuillez patienter pendant que nous préparons votre session.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const route = useRoute()
const authStore = useAuthStore()
const { api } = useApi()

onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    toast.error('Erreur d\'authentification')
    return navigateTo('/auth/connexion')
  }

  try {
    // Récupérer les infos de l'utilisateur avec le nouveau token
    // On met d'abord le token dans le store pour que useApi puisse l'utiliser
    authStore.token = token
    
    const user = await api<any>('/auth/me')
    
    authStore.setAuth(user, token)
    
    toast.success(`Bienvenue, ${user.name} !`)
    navigateTo('/')
  } catch (err) {
    console.error(err)
    toast.error('Session expirée ou invalide')
    navigateTo('/auth/connexion')
  }
})
</script>
