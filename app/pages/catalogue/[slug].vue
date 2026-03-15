<template>
  <div class="bg-brand-cream/10 min-h-screen font-sans">
    <div v-if="pending" class="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
      <Icon name="heroicons:arrow-path" class="w-12 h-12 text-primary animate-spin" />
    </div>

    <div v-else-if="kit" class="max-w-7xl mx-auto px-4 py-8 lg:py-16">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">
        <NuxtLink to="/" class="hover:text-primary transition-colors">Accueil</NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <NuxtLink to="/catalogue" class="hover:text-primary transition-colors">Catalogue</NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <span class="text-gray-900">{{ kit.name }}</span>
      </nav>

      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24">
        <!-- Gallery -->
        <div class="space-y-6 sm:space-y-8">
          <div class="aspect-square sm:aspect-3/2 rounded-3xl overflow-hidden shadow-sm bg-white border border-gray-100">
            <NuxtImg 
              :src="activeImage || safeImages[0]" 
              :alt="kit.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              v-for="img in safeImages" 
              :key="img"
              @click="activeImage = img"
              class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border transition-all"
              :class="activeImage === img ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-gray-200'"
            >
              <NuxtImg :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="flex flex-col">
          <div class="mb-8 lg:mb-10 text-center lg:text-left">
            <div class="flex items-center gap-3 mb-6 justify-center lg:justify-start">
              <span class="bg-primary/5 text-primary text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest border border-primary/10">
                {{ kit.category?.name || 'Recette locale' }}
              </span>
              <div class="flex items-center gap-1.5 bg-secondary/5 px-3 py-1.5 rounded-md border border-secondary/10">
                <Icon name="heroicons:star-solid" class="w-3.5 h-3.5 text-secondary" />
                <span class="text-[9px] sm:text-[10px] font-bold text-secondary uppercase tracking-widest">{{ Number(kit.rating_avg || 0).toFixed(1) }} ({{ kit.rating_count }})</span>
              </div>
            </div>
            <h1 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6 lg:mb-8 leading-tight tracking-tight px-4 lg:px-0">{{ kit.name }}</h1>
            <p class="text-gray-500 text-base sm:text-lg leading-relaxed px-4 lg:px-0">{{ kit.description }}</p>
          </div>

          <!-- Attributes -->
          <div class="grid grid-cols-3 gap-4 sm:gap-6 mb-10 lg:mb-12">
            <div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Icon name="heroicons:clock" class="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2 sm:mb-3" />
              <p class="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Temps</p>
              <p class="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">{{ kit.prep_time }} MIN</p>
            </div>
            <div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Icon name="heroicons:fire" class="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2 sm:mb-3" />
              <p class="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Difficulté</p>
              <p class="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">{{ difficultyLabel }}</p>
            </div>
            <div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Icon name="heroicons:heart" class="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2 sm:mb-3" />
              <p class="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Diète</p>
              <p class="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">{{ kit.is_vegetarian ? 'Végé' : 'Normal' }}</p>
            </div>
          </div>

          <!-- Portions Selector -->
          <div class="mb-10 lg:mb-12 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <p class="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 sm:mb-8">Nombre de portions</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10">
              <button 
                v-for="p in ([1, 2, 4] as const)" 
                :key="p"
                @click="portions = p"
                class="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 p-4 sm:p-5 rounded-2xl border transition-all"
                :class="portions === p ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-100 bg-gray-50/30'"
              >
                <span class="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase" :class="portions === p ? 'text-primary' : 'text-gray-400'">{{ p }} PORTION(S)</span>
                <span class="text-base sm:text-lg font-sans font-black" :class="portions === p ? 'text-gray-900' : 'text-gray-400'">{{ format(kit.prices[`${p}p` as keyof typeof kit.prices]) }}</span>
              </button>
            </div>

            <!-- Add to Cart -->
            <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div class="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 w-full sm:w-auto justify-between sm:justify-start">
                <button @click="quantity > 1 && quantity--" class="text-gray-400 hover:text-primary transition-colors active:scale-90">
                  <Icon name="heroicons:minus-circle" class="w-7 h-7 sm:w-8 sm:h-8" />
                </button>
                <span class="text-lg sm:text-xl font-black font-sans min-w-[30px] text-center text-gray-900">{{ quantity }}</span>
                <button @click="quantity++" class="text-gray-400 hover:text-primary transition-colors active:scale-90">
                  <Icon name="heroicons:plus-circle" class="w-7 h-7 sm:w-8 sm:h-8" />
                </button>
              </div>
              <button 
                @click="addToCart"
                class="w-full sm:flex-1 bg-secondary hover:bg-secondary-dark text-white font-black py-4 sm:py-5 rounded-2xl transition-all
                       flex items-center justify-center gap-3 shadow-lg shadow-secondary/10 active:scale-95 uppercase text-[10px] sm:text-xs tracking-widest"
              >
                Ajouter au panier 
                <span class="hidden sm:inline w-1 h-1 rounded-full bg-white/40"></span>
                <span class="font-sans text-base sm:text-lg">{{ format(kit.prices[`${portions}p` as keyof typeof kit.prices] * quantity) }}</span>
              </button>
            </div>
          </div>

          <!-- Ingredients preview -->
          <div>
            <h3 class="font-display font-bold text-xl text-gray-900 mb-6">Ingrédients inclus</h3>
            <div v-if="Array.isArray(kit.ingredients)" class="grid grid-cols-2 gap-y-3 gap-x-6">
              <div v-for="ing in kit.ingredients" :key="ing" class="flex items-center gap-3 group">
                <div class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                <span class="text-gray-600 text-sm leading-tight transition-colors group-hover:text-gray-900">{{ ing }}</span>
              </div>
            </div>
            <p v-else class="text-gray-500 text-sm leading-relaxed">{{ kit.ingredients }}</p>
          </div>
        </div>
      </div>

      <!-- Nutritional Info -->
      <section class="mt-16 sm:mt-24 pt-16 sm:pt-24 border-t border-gray-100 px-4 lg:px-0">
        <div class="grid lg:grid-cols-3 gap-12 text-center lg:text-left">
          <div class="lg:col-span-1">
            <h2 class="font-display font-black text-2xl sm:text-3xl text-gray-900 mb-4 tracking-tight">Valeurs nutritionnelles</h2>
            <p class="text-gray-500 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              Toutes nos recettes sont élaborées avec le soutien de nutritionnistes pour garantir un équilibre parfait entre goût et santé.
            </p>
          </div>
          <div class="lg:col-span-2 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            <div v-for="(val, key) in kit.nutrition" :key="key" class="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 text-center shadow-sm">
              <p class="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{{ key }}</p>
              <p class="text-lg sm:text-xl font-display font-black text-gray-900 leading-none">
                {{ val }}<span class="text-[10px] ml-0.5 text-gray-400 font-bold uppercase">{{ key === 'calories' ? 'kcal' : 'g' }}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Recipe Steps -->
      <section v-if="kit.recipe_steps?.length" class="mt-24 pt-24 border-t border-gray-100">
        <RecipeSteps :steps="kit.recipe_steps" />
      </section>

      <!-- Reviews Section -->
      <section class="mt-24 pt-24 border-t border-gray-100 pb-24">
        <KitReviews :kit-id="kit.id" />
      </section>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 py-24 text-center">
      <h2 class="text-2xl font-bold">Produit introuvable.</h2>
      <NuxtLink to="/catalogue" class="text-primary hover:underline mt-4 block">Retour au catalogue</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { Kit } from '~/types/kit'

const route = useRoute()
const { api } = useApi()
const cartStore = useCartStore()
const { format } = useFormatPrice()

const { data: kit, pending } = await useAsyncData(
  `kit-${route.params.slug}`,
  () => api<{ data: Kit }>(`/kits/${route.params.slug}`).then(r => r.data)
)

const activeImage = ref('')
const portions = ref<1 | 2 | 4>(2)
const quantity = ref(1)

const difficultyLabel = computed(() => {
  if (!kit.value) return ''
  return { easy: 'Facile', medium: 'Intermédiaire', hard: 'Expert' }[kit.value.difficulty]
})

function addToCart() {
  if (!kit.value) return
  // We use the store's add which increments if exists, 
  // but here we might want to add plural quantity if possible.
  // The store add(kit, portions) adds +1. Let's repeat it or adjust store.
  for (let i = 0; i < quantity.value; i++) {
    cartStore.add(kit.value, portions.value)
  }
  toast.success(`${kit.value.name} ajouté au panier !`)
  cartStore.open = true
}

watch(kit, (newKit) => {
  if (newKit) activeImage.value = safeImages.value[0] || ''
}, { immediate: true })

const safeImages = computed(() => {
  if (!kit.value || !kit.value.images) return []
  if (Array.isArray(kit.value.images)) return kit.value.images
  if (typeof kit.value.images === 'string') {
    try {
      const parsed = JSON.parse(kit.value.images)
      if (Array.isArray(parsed)) return parsed
    } catch {}
    const cleaned = String(kit.value.images).replace(/^\[["']|["']\]$/g, '')
    if (cleaned && cleaned.includes('http')) return [cleaned]
  }
  return []
})

onMounted(() => {
  if (kit.value) activeImage.value = safeImages.value[0] || ''
})
</script>
