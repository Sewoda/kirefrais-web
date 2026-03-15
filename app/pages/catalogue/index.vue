<template>
  <div class="bg-brand-cream/50 min-h-screen font-sans">
    <div class="page-container py-4 lg:py-8">
      
      <!-- Mobile Filter Toggle Button -->
      <div class="lg:hidden sticky top-20 z-40 mb-4 px-1">
        <button 
          @click="showMobileFilters = true"
          class="w-full bg-white border border-gray-100 shadow-lg rounded-2xl p-4 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Icon name="heroicons:adjustments-horizontal" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm font-black text-gray-900 leading-none">Filtrer & Trier</p>
              <p class="text-[10px] text-gray-400 font-bold uppercase mt-1">Personnalisez votre recherche</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="hasActiveFilters" class="flex h-2 w-2 rounded-full bg-secondary"></span>
            <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
          </div>
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar (Desktop) -->
        <aside class="hidden lg:block lg:w-72 shrink-0">
          <div class="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-display font-bold text-xl text-gray-900 border-l-4 border-primary pl-3 tracking-tight">Filtres</h3>
              <button 
                @click="resetFilters"
                class="text-[10px] font-black text-primary hover:text-primary-dark transition-colors uppercase tracking-widest"
                v-if="hasActiveFilters"
              >
                Tout effacer
              </button>
            </div>

            <!-- Categories -->
            <div class="mb-8">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Catégories</p>
              <div class="space-y-1.5">
                <button
                  class="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all border border-transparent group"
                  :class="!filters.category_id ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' : 'text-gray-600 hover:bg-primary/5 hover:text-primary'"
                  @click="filters.category_id = null"
                >
                  <div class="flex items-center gap-3 text-xs">
                    <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
                    <span>Toutes les catégories</span>
                  </div>
                  <Icon v-if="!filters.category_id" name="heroicons:check-circle-solid" class="w-4 h-4" />
                </button>
                
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  class="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all border border-transparent group"
                  :class="filters.category_id === cat.id ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' : 'text-gray-600 hover:bg-primary/5 hover:text-primary'"
                  @click="filters.category_id = cat.id"
                >
                  <div class="flex items-center gap-3 text-xs">
                    <Icon :name="cat.icon || 'heroicons:tag'" class="w-4 h-4" />
                    <span>{{ cat.name }}</span>
                  </div>
                  <Icon v-if="filters.category_id === cat.id" name="heroicons:check-circle-solid" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Difficulty -->
            <div class="mb-8">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Difficulté</p>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="diff in difficulties" 
                  :key="diff.value"
                  @click="filters.difficulty = filters.difficulty === diff.value ? null : diff.value"
                  class="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all"
                  :class="filters.difficulty === diff.value ? 'bg-secondary text-white border-secondary shadow-sm' : 'bg-white text-gray-500 border-gray-100 hover:border-secondary/50'"
                >
                  {{ diff.label }}
                </button>
              </div>
            </div>

            <!-- Preptime -->
            <div class="mb-8">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Temps max ({{ filters.max_time }} min)</p>
              <input 
                type="range" 
                v-model="filters.max_time" 
                min="10" 
                max="60" 
                step="5"
                class="w-full accent-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div class="flex justify-between mt-2 text-[9px] font-black text-gray-300">
                <span>10 MIN</span>
                <span>60 MIN</span>
              </div>
            </div>

            <!-- Features -->
            <div class="mb-6">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Préférences</p>
              <div class="space-y-3">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <div class="relative flex items-center">
                    <input type="checkbox" v-model="filters.vegetarian" class="peer hidden" />
                    <div class="w-5 h-5 rounded-lg border-2 border-gray-200 peer-checked:bg-primary peer-checked:border-primary transition-all shadow-sm" />
                    <Icon name="heroicons:check-small" class="absolute inset-0 w-5 h-5 text-white scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-gray-700 group-hover:text-primary transition-colors">Végétarien uniquement</span>
                    <span class="text-[9px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">VEGE</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Grid -->
        <div class="flex-1">
          <!-- Search & Sorting (Desktop) -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <div class="flex-1 relative group">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-all duration-300">
                <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
              </div>
              <input
                v-model.lazy="filters.search"
                type="text"
                placeholder="Quel repas vous ferait plaisir ?"
                class="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100
                       focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm text-sm"
              />
            </div>
            
            <div class="relative min-w-[200px] hidden sm:block">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <Icon name="heroicons:arrows-up-down" class="w-4 h-4" />
              </div>
              <select
                v-model="filters.sort"
                class="w-full pl-10 pr-4 py-4 rounded-2xl bg-white border border-gray-100
                       focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer
                       text-xs font-black uppercase tracking-widest text-gray-900 shadow-sm"
              >
                <option value="order_count">Les plus populaires</option>
                <option value="created_at">Nouveautés</option>
                <option value="rating_avg">Mieux notés</option>
                <option value="price_1p">Prix croissant</option>
              </select>
            </div>
          </div>

          <!-- Results Count -->
          <div class="mb-4 flex items-center justify-between" v-if="kits && !pending">
            <h2 class="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <span class="text-gray-900 text-sm tracking-normal">{{ kits.meta.total }}</span>
              repas trouvés
            </h2>
          </div>

          <!-- Active Badges -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-8 items-center">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Filtres actifs:</span>
            <span v-if="filters.search" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
              "{{ filters.search }}"
              <button @click="filters.search = ''" class="hover:text-red-500 transition-colors"><Icon name="heroicons:x-mark" class="w-3.5 h-3.5" /></button>
            </span>
            <span v-if="selectedCategoryName" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
              {{ selectedCategoryName }}
              <button @click="filters.category_id = null" class="hover:text-red-500 transition-colors"><Icon name="heroicons:x-mark" class="w-3.5 h-3.5" /></button>
            </span>
            <span v-if="filters.difficulty" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary text-xs font-bold rounded-full border border-secondary/20 uppercase">
              {{ filters.difficulty }}
              <button @click="filters.difficulty = null" class="hover:text-red-500 transition-colors"><Icon name="heroicons:x-mark" class="w-3.5 h-3.5" /></button>
            </span>
            <span v-if="filters.max_time < 60" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
              Max {{ filters.max_time }} min
              <button @click="filters.max_time = 60" class="hover:text-red-500 transition-colors"><Icon name="heroicons:x-mark" class="w-3.5 h-3.5" /></button>
            </span>
            <span v-if="filters.vegetarian" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
              Végé
              <button @click="filters.vegetarian = false" class="hover:text-red-500 transition-colors"><Icon name="heroicons:x-mark" class="w-3.5 h-3.5" /></button>
            </span>
          </div>

          <!-- Kits Grid -->
          <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="i" class="bg-white rounded-2xl h-[380px] border border-gray-100 p-4 space-y-4">
              <div class="w-full aspect-video bg-gray-100 animate-pulse rounded-xl" />
              <div class="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
              <div class="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
              <div class="h-10 bg-gray-100 animate-pulse rounded-xl mt-4" />
            </div>
          </div>

          <div v-else-if="kits && kits.data.length > 0">
            <div class="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <KitCard
                v-for="kit in kits.data"
                :key="kit.id"
                :kit="kit"
                @add-to-cart="onAddToCart"
              />
            </div>
            
            <!-- Pagination -->
            <div v-if="kits.meta && kits.meta.last_page > 1" class="mt-20 flex justify-center gap-2">
               <button 
                 v-for="p in kits.meta.last_page" 
                 :key="p"
                 class="w-12 h-12 rounded-2xl font-bold transition-all border shadow-sm text-sm"
                 :class="filters.page === p ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-110' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:border-primary/30'"
                 @click="filters.page = p"
               >
                 {{ p }}
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Mobile Filters Drawer -->
    <Transition name="mobile-filters">
      <div v-if="showMobileFilters" class="fixed inset-0 z-[100] lg:hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="showMobileFilters = false"></div>
        
        <!-- Content -->
        <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div>
              <h3 class="font-display font-black text-xl text-gray-900 leading-none">Filtres</h3>
              <p class="text-[10px] text-gray-400 font-bold uppercase mt-2 mr-12">Affinez votre sélection pour trouver le repas parfait</p>
            </div>
            <button 
              @click="showMobileFilters = false"
              class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="p-6 overflow-y-auto flex-1 space-y-8 pb-24">
            <!-- Sort (Mobile specific inside filters) -->
            <div>
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Trier par</p>
              <div class="grid grid-cols-2 gap-2">
                <button 
                  v-for="opt in [{l:'Populaires', v:'order_count'}, {l:'Nouveautés', v:'created_at'}, {l:'Prix', v:'price_1p'}]"
                  :key="opt.v"
                  @click="filters.sort = opt.v"
                  class="px-4 py-3 rounded-xl text-[10px] font-black uppercase border transition-all"
                  :class="filters.sort === opt.v ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-500 border-gray-100'"
                >
                  {{ opt.l }}
                </button>
              </div>
            </div>

            <!-- Categories (Reuse layout from desktop but more touch friendly) -->
            <div>
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Catégories</p>
              <div class="grid grid-cols-2 gap-2">
                <button
                  class="flex items-center gap-2 p-3 rounded-xl text-[10px] font-black uppercase transition-all border"
                  :class="!filters.category_id ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-500 border-gray-100'"
                  @click="filters.category_id = null"
                >
                  <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
                  Tout
                </button>
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  class="flex items-center gap-2 p-3 rounded-xl text-[10px] font-black uppercase transition-all border shrink-0 overflow-hidden"
                  :class="filters.category_id === cat.id ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-500 border-gray-100'"
                  @click="filters.category_id = cat.id"
                >
                  <Icon :name="cat.icon || 'heroicons:tag'" class="w-4 h-4" />
                  <span class="truncate">{{ cat.name }}</span>
                </button>
              </div>
            </div>

             <!-- Difficulty -->
             <div>
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Difficulté</p>
              <div class="flex gap-2">
                <button 
                  v-for="diff in difficulties" 
                  :key="diff.value"
                  @click="filters.difficulty = filters.difficulty === diff.value ? null : diff.value"
                  class="flex-1 px-4 py-3 rounded-xl text-[10px] font-black uppercase border transition-all"
                  :class="filters.difficulty === diff.value ? 'bg-secondary text-white border-secondary' : 'bg-gray-50 text-gray-500 border-gray-100'"
                >
                  {{ diff.label }}
                </button>
              </div>
            </div>

            <!-- Preptime -->
            <div>
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Temps max ({{ filters.max_time }} min)</p>
              <input type="range" v-model="filters.max_time" min="10" max="60" step="5" class="w-full accent-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer" />
            </div>

            <!-- Prefeences -->
            <div>
              <label class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer active:bg-gray-100 transition-colors">
                <div class="flex items-center gap-3">
                  <Icon name="heroicons:sparkles" class="w-5 h-5 text-green-600" />
                  <span class="text-xs font-bold text-gray-700">Végétarien uniquement</span>
                </div>
                <div class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="filters.vegetarian" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-6 bg-white border-t border-gray-100 shrink-0 grid grid-cols-2 gap-4">
             <button 
              @click="resetFilters(); showMobileFilters = false"
              class="py-4 rounded-2xl border border-gray-100 text-xs font-black uppercase text-gray-500 active:bg-gray-50 transition-colors"
             >
               Effacer
             </button>
             <button 
              @click="showMobileFilters = false"
              class="py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase shadow-lg shadow-primary/20 active:scale-95 transition-all"
             >
               Voir les résultats
             </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import KitCard from '~/components/catalog/KitCard.vue'
import type { Kit, PaginatedKits } from '~/types/kit'

useSeoMeta({ 
  title: 'Catalogue de Kits Repas — Kirefrais',
  description: 'Découvrez notre large sélection de kits repas sains et équilibrés.'
})

const { api } = useApi()
const cartStore = useCartStore()

// State
const showMobileFilters = ref(false)
const filters = reactive({
  search: '',
  sort: 'order_count',
  category_id: null as number | null,
  vegetarian: false,
  difficulty: null as string | null,
  max_time: 60,
  page: 1,
})

const difficulties = [
  { label: 'Facile', value: 'easy' },
  { label: 'Moyen', value: 'medium' },
  { label: 'Difficile', value: 'hard' },
]

// Data Fetching
const { data: categories } = await useAsyncData('categories', () => api<any[]>('/categories'))

const { data: kits, pending, refresh } = await useAsyncData(
  'catalogue-kits',
  () => {
    const params: any = { ...filters }
    // API expects true/null for boolean filters usually or 1/0
    if (!params.vegetarian) delete params.vegetarian
    if (!params.difficulty) delete params.difficulty
    if (params.max_time === 60) delete params.max_time
    if (!params.search) delete params.search
    
    return api<PaginatedKits>('/kits', { params })
  },
  { watch: [filters], immediate: true }
)

// Computed
const hasActiveFilters = computed(() => {
  return filters.search || filters.category_id || filters.vegetarian || filters.difficulty || filters.max_time < 60
})

const selectedCategoryName = computed(() => {
  if (!filters.category_id || !categories.value) return null
  return categories.value.find(c => c.id === filters.category_id)?.name
})

// Methods
function resetFilters() {
  filters.search = ''
  filters.sort = 'order_count'
  filters.category_id = null
  filters.vegetarian = false
  filters.difficulty = null
  filters.max_time = 60
  filters.page = 1
}

function onAddToCart(kit: Kit) {
  cartStore.add(kit, 2)
  toast.success(`${kit.name} ajouté au panier !`, {
    description: 'Vous pouvez modifier les quantités dans votre panier.',
    action: {
      label: 'Voir Panier',
      onClick: () => navigateTo('/panier')
    }
  })
}

// Watch filters to reset page when any filter except page changes
watch(
  () => [filters.search, filters.sort, filters.category_id, filters.vegetarian, filters.difficulty, filters.max_time],
  () => {
    filters.page = 1
  }
)
</script>

<style scoped>
/* Mobile Drawer Transition */
.mobile-filters-enter-active, .mobile-filters-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-filters-enter-from, .mobile-filters-leave-to {
  opacity: 0;
}
.mobile-filters-enter-from .absolute.bottom-0, .mobile-filters-leave-to .absolute.bottom-0 {
  transform: translateY(100%);
}
.mobile-filters-enter-active .absolute.bottom-0, .mobile-filters-leave-active .absolute.bottom-0 {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom range thumb styling */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;
  border: 4px solid var(--color-primary, #1B8A4A);
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin-top: -7px;
}

input[type=range]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;
  border: 4px solid var(--color-primary, #1B8A4A);
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
</style>
