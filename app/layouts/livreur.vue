<template>
  <div class="min-h-screen bg-gray-50 flex font-sans">
    <!-- Sidebar (desktop) -->
    <aside class="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed h-full z-10">
      <div class="p-6 border-b border-gray-100">
        <span class="font-bold text-xl text-green-600">Kirefrais</span>
        <p class="text-xs text-gray-500 mt-1">Espace Livreur</p>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600
                 hover:bg-green-50 hover:text-green-600 transition-colors"
          active-class="bg-green-50 text-green-600 font-semibold"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-gray-100">
        <button
          @click="logout"
          class="flex items-center gap-3 px-4 py-3 w-full rounded-xl
                 text-red-500 hover:bg-red-50 transition-colors"
        >
          <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Contenu principal -->
    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">
      <!-- Header mobile -->
      <header class="lg:hidden bg-white border-b border-gray-100 px-4 py-3
                     flex items-center justify-between sticky top-0 z-10">
        <span class="font-bold text-green-600">Kirefrais Livreur</span>
        <button @click="mobileMenuOpen = !mobileMenuOpen">
          <Icon name="heroicons:bars-3" class="w-6 h-6 text-gray-600" />
        </button>
      </header>

      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { logout } = useCurrentUser()
const mobileMenuOpen = ref(false)

const navItems = [
  { to: '/livreur/dashboard',  icon: 'heroicons:squares-2x2',     label: 'Tableau de bord' },
  { to: '/livreur/livraisons', icon: 'heroicons:truck',            label: 'Mes livraisons'  },
  { to: '/livreur/historique', icon: 'heroicons:clock',            label: 'Historique'      },
  { to: '/livreur/profil',     icon: 'heroicons:user-circle',      label: 'Mon profil'      },
]
</script>
