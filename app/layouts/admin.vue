<!-- layouts/admin.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex">

    <!-- Sidebar desktop -->
    <aside class="hidden lg:flex flex-col w-64 bg-gray-900 fixed h-full z-20">
      <div class="px-6 py-5 border-b border-gray-800">
        <div class="flex items-center gap-2">
          <span class="font-display font-bold text-white text-lg">Kirefrais</span>
          <span class="text-xs bg-secondary text-white px-2 py-0.5 rounded-full font-semibold">
            Admin
          </span>
        </div>
      </div>

      <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400
                 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-primary text-white"
        >
          <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
          <span class="flex-1">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>
      </nav>

      <div class="p-3 border-t border-gray-800">
        <div class="flex items-center gap-3 px-3 py-2 mb-1">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span class="text-white text-sm font-bold">{{ adminInitial }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-sm font-medium truncate">{{ user?.name }}</p>
            <p class="text-gray-500 text-xs">Administrateur</p>
          </div>
        </div>
        <button
          class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm
                 text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
          @click="logout"
        >
          <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>

    <!-- Contenu -->
    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">
      <header class="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10
                     flex items-center justify-between">
        <h1 class="font-display font-semibold text-gray-900 text-lg">{{ pageTitle }}</h1>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500 hidden sm:block">{{ todayDate }}</span>
          <NuxtLink to="/" target="_blank"
            class="text-gray-400 hover:text-primary transition-colors p-2"
            title="Voir le site">
            <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </header>

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
dayjs.locale('fr')

const { user, logout } = useCurrentUser()
const route = useRoute()

const adminInitial = computed(() => user.value?.name?.charAt(0).toUpperCase() ?? 'A')
const todayDate    = computed(() => dayjs().format('dddd D MMMM YYYY'))

const pageTitle = computed(() => {
  const path = route.path
  if (path.includes('/admin/dashboard')) return 'Tableau de bord'
  if (path.includes('/admin/kits')) {
    if (path.includes('nouveau')) return 'Nouveau kit'
    if (path.includes('modifier')) return 'Modifier le kit'
    return 'Kits repas'
  }
  if (path.includes('/admin/commandes')) {
    if (route.params.id) return `Commande #${route.params.id}`
    return 'Commandes'
  }
  if (path.includes('/admin/livreurs')) return 'Livreurs'
  if (path.includes('/admin/clients'))  return 'Clients'
  if (path.includes('/admin/paiements')) return 'Paiements'
  if (path.includes('/admin/zones'))     return 'Zones de livraison'
  if (path.includes('/admin/promos'))    return 'Codes promo'
  if (path.includes('/admin/avis'))      return 'Avis clients'
  return 'Administration'
})

const navItems = [
  { to: '/admin/dashboard', icon: 'heroicons:squares-2x2',    label: 'Tableau de bord' },
  { to: '/admin/commandes', icon: 'heroicons:shopping-bag',   label: 'Commandes'       },
  { to: '/admin/kits',      icon: 'heroicons:beaker',         label: 'Kits repas'      },
  { to: '/admin/livreurs',  icon: 'heroicons:truck',          label: 'Livreurs'        },
  { to: '/admin/clients',   icon: 'heroicons:users',          label: 'Clients'         },
  { to: '/admin/paiements', icon: 'heroicons:credit-card',    label: 'Paiements'       },
  { to: '/admin/zones',     icon: 'heroicons:map-pin',        label: 'Zones'           },
  { to: '/admin/promos',    icon: 'heroicons:tag',            label: 'Codes promo'     },
  { to: '/admin/avis',      icon: 'heroicons:star',           label: 'Avis'            },
]
</script>
