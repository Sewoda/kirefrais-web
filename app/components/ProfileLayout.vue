<template>
  <div class="bg-brand-cream/50 min-h-screen font-sans">
    <div class="page-container py-8 md:py-12">
      <!-- Profile Header -->
      <div class="bg-linear-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center gap-8 mb-10 relative overflow-hidden">
        <!-- Decorative bg elements -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div class="relative group z-10 shrink-0">
          <div class="w-28 h-28 rounded-full bg-white flex items-center justify-center text-primary text-4xl font-display font-bold shadow-lg ring-4 ring-white/20">
            {{ user?.name?.charAt(0) || 'U' }}
          </div>
          <button class="absolute bottom-0 right-0 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-primary transition-all border border-gray-100 hover:scale-105 active:scale-95">
            <Icon name="heroicons:camera" class="w-4 h-4" />
          </button>
        </div>

        <div class="flex-1 text-center md:text-left z-10 w-full">
          <h1 class="font-display font-bold text-3xl text-white mb-2 tracking-tight">{{ user?.name }}</h1>
          <p class="text-white/80 font-medium flex items-center justify-center md:justify-start gap-2 text-sm mb-6">
            <Icon name="heroicons:envelope" class="w-4 h-4 opacity-70" />
            {{ user?.email }}
          </p>
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
             <div class="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 text-left">
               <span class="text-[11px] text-white/70 uppercase tracking-wider font-bold block mb-0.5">Membre Kirefrais</span>
               <span class="text-sm font-semibold text-white">Actif</span>
             </div>
          </div>
        </div>
        
        <button 
          @click="logout"
          class="bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-red-500 font-semibold px-5 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 text-sm border border-white/20 shadow-lg z-10 hover:shadow-xl hover:-translate-y-0.5"
        >
          <Icon name="heroicons:arrow-left-on-rectangle" class="w-5 h-5 shrink-0" />
          <span>Déconnexion</span>
        </button>
      </div>

      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Navigation Side -->
        <aside class="lg:col-span-1">
          <nav class="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex flex-col gap-1 sticky top-24">
            <NuxtLink 
              v-for="link in profileLinks" 
              :key="link.to"
              :to="link.to"
              class="flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 group relative overflow-hidden"
              :class="route.path === link.to ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-primary-light/50 hover:text-primary'"
            >
              <div class="flex items-center gap-3 relative z-10">
                <Icon 
                  :name="link.icon" 
                  class="w-5 h-5 transition-transform duration-300"
                  :class="route.path === link.to ? 'text-white' : 'text-gray-400 group-hover:text-primary group-hover:scale-110'"
                />
                <span class="font-semibold text-sm">{{ link.label }}</span>
              </div>
              <Icon 
                 name="heroicons:chevron-right" 
                 class="w-4 h-4 transition-all duration-300 relative z-10"
                 :class="route.path === link.to ? 'text-white opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'"
              />
            </NuxtLink>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { user, logout } = useCurrentUser() 

const profileLinks = [
  { label: 'Tableau de bord', to: '/profil', icon: 'heroicons:squares-2x2' },
  { label: 'Mes commandes', to: '/profil/commandes', icon: 'heroicons:shopping-bag' },
  { label: 'Mes abonnements', to: '/profil/abonnements', icon: 'heroicons:arrow-path' },
  { label: 'Mes adresses', to: '/profil/adresses', icon: 'heroicons:map-pin' },
  { label: 'Préférences', to: '/profil/parametres', icon: 'heroicons:cog-6-tooth' },
]
</script>
