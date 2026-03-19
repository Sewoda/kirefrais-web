<template>
  <header 
    class="fixed top-0 inset-x-0 z-[60] transition-all duration-300 font-sans"
    :class="[
      isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm py-2' : 'bg-white border-b border-gray-100 py-4'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Left: Logo & Menu Button (Mobile) -->
      <div class="flex items-center gap-2 sm:gap-4 shrink-0">
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-primary transition-all md:hidden shrink-0"
          aria-expanded="false"
        >
          <span class="sr-only">Ouvrir le menu</span>
          <Icon :name="isMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3-bottom-left'" class="w-6 h-6" />
        </button>

        <NuxtLink to="/" class="flex items-center gap-2 group shrink-0">
          <div class="relative shrink-0">
            <AppLogo class="h-8 md:h-9 w-auto transform group-hover:scale-110 transition-transform duration-300" />
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          </div>
          <span class="font-display font-black text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark shrink-0">
            Kirefrais
          </span>
        </NuxtLink>
      </div>

      <!-- Center: Desktop Nav -->
      <nav class="hidden md:flex items-center  ">
        <NuxtLink
          v-for="link in navigationLinks"
          :key="link.to"
          :to="link.to"
          class="px-4 py-2 text-sm font-bold text-gray-500 hover:text-primary rounded-xl transition-all relative group"
          active-class="!text-primary bg-white shadow-sm ring-1 ring-gray-100"
        >
          <span class="relative z-10 flex items-center gap-2">
            <Icon v-if="link.icon" :name="link.icon" class="w-4 h-4" />
            {{ link.label }}
          </span>
          <span v-if="link.label === 'Assistant IA'" class="absolute -top-1 -right-1 flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
        </NuxtLink>
      </nav>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 sm:gap-4 ml-auto shrink-0">


        <!-- Cart -->
        <button
          @click="cartStore.open = true"
          class="relative group p-2 text-gray-600 hover:text-primary transition-all rounded-xl hover:bg-primary/5 shrink-0"
        >
          <Icon name="heroicons:shopping-bag" class="w-6 h-6" />
          <Transition name="scale-bounce">
            <span
              v-if="cartStore.count > 0"
              class="absolute -top-1 -right-1 min-w-[20px] h-5 bg-secondary text-white
                     text-[10px] rounded-full flex items-center justify-center font-black border-2 border-white shadow-sm"
            >
              {{ cartStore.count }}
            </span>
          </Transition>
        </button>

        <div class="w-px h-6 bg-gray-100 hidden sm:block"></div>

        <!-- Auth -->
        <template v-if="isLoggedIn">
          <NuxtLink
            to="/profil"
            class="flex items-center gap-3 p-1 pl-1 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-100 transition-all group shrink-0"
          >
            <div class="w-8 h-8 md:w-8 md:h-8 w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
              {{ userInitial }}
            </div>
            <span class="hidden lg:block text-xs font-bold text-gray-700 pr-3">{{ user?.name?.split(' ')[0] }}</span>
          </NuxtLink>
        </template>

        <template v-else>
          <NuxtLink
            to="/auth/connexion"
            class="hidden sm:block text-gray-500 hover:text-primary text-sm font-bold px-4 py-2 transition-colors shrink-0"
          >
            Connexion
          </NuxtLink>
          <NuxtLink
            to="/auth/inscription"
            class="bg-primary hover:bg-primary-dark text-white text-[10px] sm:text-xs font-black uppercase tracking-widest
                   px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 shrink-0"
          >
            S'inscrire
          </NuxtLink>
        </template>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" class="fixed inset-0 z-50 md:hidden pt-20">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="isMenuOpen = false"></div>
        
        <!-- Content -->
        <div class="relative bg-white border-t border-gray-100 shadow-2xl rounded-b-[40px] overflow-hidden">
          <div class="px-6 py-8 space-y-2">
            <NuxtLink
              v-for="link in navigationLinks"
              :key="link.to"
              :to="link.to"
              @click="isMenuOpen = false"
              class="flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all"
              :class="[
                $route.path === link.to ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-900 hover:bg-gray-50'
              ]"
            >
              <div class="flex items-center gap-3 relative z-10">
                <Icon v-if="link.icon" :name="link.icon" class="w-5 h-5 opacity-70" />
                <span class="font-semibold text-sm">{{ link.label }}</span>
              </div>
            </NuxtLink>
            
            <div class="pt-8 border-t border-gray-100 mt-8">
               <div class="grid grid-cols-2 gap-4">
                   <NuxtLink 
                    to="/profil" 
                    @click="isMenuOpen = false"
                    class="flex flex-col items-center justify-center p-6 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-all gap-2"
                  >
                    <span class="text-xs font-bold text-gray-900">Mon Profil</span>
                  </NuxtLink>
                  <button 
                    @click="isMenuOpen = false; navigateTo('/catalogue')"
                    class="flex flex-col items-center justify-center p-6 rounded-3xl bg-secondary/5 hover:bg-secondary/10 transition-all gap-2"
                  >
                    <span class="text-xs font-bold text-gray-900">Promos</span>
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { user, isLoggedIn } = useCurrentUser()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const userInitial = computed(() => user.value?.name?.charAt(0).toUpperCase() ?? '')

const navigationLinks = [
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Abonnements', to: '/abonnements' },
  { label: 'Comment ça marche', to: '/a-propos' },
  { label: 'Assistant IA', to: '/assistant', icon: 'heroicons:sparkles' }
]

// Handle Scroll for glassmorphism
if (process.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
}

// Close menu on route change
const route = useRoute()
watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<style scoped>
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.scale-bounce-enter-active {
  animation: scale-bounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes scale-bounce {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

nav a.router-link-active {
  color: var(--color-primary);
}
</style>
