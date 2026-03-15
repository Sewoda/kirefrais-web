<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-center">
    <div class="max-w-md w-full">
      <div class="mb-12 relative flex justify-center">
        <div class="w-48 h-48 bg-primary/10 rounded-[60px] flex items-center justify-center animate-pulse">
          <Icon :name="error.statusCode === 404 ? 'heroicons:magnifying-glass' : 'heroicons:exclamation-triangle'" class="w-24 h-24 text-primary opacity-20" />
        </div>
        <div class="absolute -bottom-4 bg-white px-8 py-3 rounded-2xl shadow-xl border border-gray-100">
           <span class="font-display font-bold text-5xl text-gray-900">{{ error.statusCode }}</span>
        </div>
      </div>

      <h1 class="font-display font-bold text-3xl text-gray-900 mb-6">
        {{ error.statusCode === 404 ? 'Oups ! Page introuvable' : 'Une erreur est survenue' }}
      </h1>
      
      <p class="text-gray-500 mb-12 leading-relaxed">
        {{ error.message || 'Il semble que le kit repas que vous cherchez a déjà été dégusté. Ou peut-être qu\'un piment trop fort a fait sauter nos serveurs !' }}
      </p>

      <div class="flex flex-col gap-4">
        <button 
          @click="handleClearError"
          class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
        >
          Retourner à l'accueil
        </button>
        <NuxtLink 
          to="/catalogue"
          class="text-primary font-bold text-sm hover:underline"
        >
          Voir le catalogue
        </NuxtLink>
      </div>
    </div>

    <div class="mt-24">
       <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo class="h-8 w-auto" />
          <span class="font-display font-bold text-xl text-primary">Kirefrais</span>
       </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object as any
})

const handleClearError = () => clearError({ redirect: '/' })
</script>
