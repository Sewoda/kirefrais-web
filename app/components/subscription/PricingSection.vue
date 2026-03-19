<template>
  <section class="py-12 md:py-24 px-4 max-w-7xl mx-auto">
    <div class="text-center mb-16 md:mb-20">
      <span class="text-hero-green font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Nos formules</span>
      <h2 class="font-display font-bold text-3xl md:text-5xl text-gray-900 tracking-tight">Choisissez le pack qui vous ressemble</h2>
      <p class="mt-4 text-gray-500 max-w-2xl mx-auto font-medium">Un abonnement flexible, sans engagement, pour simplifier votre vie en cuisine.</p>
    </div>

    <!-- 1. Global Configurateur (Portions uniquement)
    <div class="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-hero-green/5 border border-gray-100 mb-16 max-w-md mx-auto">
       <div class="space-y-6 text-center">
          <label class="text-[10px] font-black uppercase tracking-[0.2em] text-hero-green mb-2 block">Nombre de personnes / kit</label>
          <div class="flex gap-3 justify-center">
            <button 
              v-for="p in [1, 2, 4]" 
              :key="p"
              @click="config.portions = p as (1|2|4)"
              class="flex-1 py-4 border-2 rounded-2xl font-bold transition-all text-center max-w-[120px]"
              :class="config.portions === p ? 'border-hero-green bg-hero-green text-white shadow-lg' : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-hero-green/20'"
            >
              {{ p }} pers.
            </button>
          </div>
       </div>
    </div> -->

    <!-- 2. Plans Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div 
        v-for="plan in basePlans" 
        :key="plan.id"
        class="relative flex flex-col rounded-[2.5rem] p-8 border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
        :class="plan.popular 
          ? 'bg-gray-900 text-white lg:scale-105 z-10 border-gray-800' 
          : 'bg-white text-gray-900 shadow-sm'"
      >
        <!-- Premium Badge -->
        <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-hero-orange text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg z-20 whitespace-nowrap border border-white/10">
          Recommandé
        </div>

        <!-- Icon & Name -->
        <div class="mb-5 text-center">
          <div class="w-full h-40 flex items-center justify-center mb-6">
            <PackIcon :type="plan.id as any" class="scale-125" />
          </div>
          <h3 class="font-display font-bold text-2xl mb-1 leading-tight" :class="plan.popular ? 'text-white' : 'text-gray-900'">{{ plan.name }}</h3>
          <p class="text-[10px] font-black uppercase tracking-widest opacity-60">{{ plan.kits }} kit{{ plan.kits > 1 ? 's' : '' }} / semaine</p>
        </div>

        <!-- Price -->
        <div class="mb-8 text-center">
          <div class="inline-flex items-baseline gap-1.5">
            <span class="text-4xl font-sans font-black tracking-tight" :class="plan.popular ? 'text-white' : 'text-gray-900'">{{ formatPrice(getCalculatedPrice(plan)) }}</span>
          </div>
        </div>

        <!-- Features -->
        <div class="flex-1 mb-10">
          <ul class="space-y-4">
            <li v-for="feat in plan.features" :key="feat" class="flex items-start gap-3 text-[13px] font-medium" :class="plan.popular ? 'text-gray-400' : 'text-gray-600'">
              <Icon name="heroicons:check-circle" class="w-5 h-5 shrink-0" :class="plan.popular ? 'text-hero-orange' : 'text-hero-green'" />
              <span>{{ feat }}</span>
            </li>
          </ul>
        </div>

        <!-- Action -->
        <button 
          @click="selectPlan(plan)"
          class="w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.1em] transition-all text-center border-2 border-transparent active:scale-95"
          :class="plan.popular 
            ? 'bg-hero-orange text-white hover:bg-white hover:text-gray-900 shadow-xl shadow-hero-orange/20' 
            : 'bg-gray-800 text-white hover:bg-hero-green'"
        >
          Choisir ce pack
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import PackIcon from './PackIcon.vue'
const { status } = useAuth()
const cartStore = useCartStore()

const config = reactive({
  portions: 2 as (1 | 2 | 4)
})

const basePlans = [
  { id: 'bronze', name: 'Pack Bronze', kits: 1, basePrice: 21000, features: ['1 Kit Repas complet /sem', 'Ingrédients locaux frais', 'Fiches recettes illustrées', 'Livraison incluse'] },
  { id: 'silver', name: 'Pack Silver', kits: 2, basePrice: 36000, features: ['2 Kits Repas variés / sem', 'Priorité recettes', 'Support prioritaire', 'Livraison flexible'] },
  { id: 'gold', name: 'Pack Gold', kits: 4, basePrice: 67000, popular: true, features: ['4 Kits Repas familiaux / sem', 'Économie maximale', 'Aide IA personnalisée', 'Pause facile'] },
  { id: 'diamond', name: 'Pack Diamond', kits: 6, basePrice: 92000, features: ['6 Kits Repas gastronomiques', 'La liberté totale', 'Conciergerie WhatsApp'] }
]

function formatPrice(p: number) {
  return new Intl.NumberFormat('fr-TG', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(p)
}

function getCalculatedPrice(plan: any) {
  let total = plan.basePrice

  if (config.portions === 1) total = total * 0.7
  if (config.portions === 4) total = total * 1.8
  
  return total
}

function selectPlan(plan: any) {
  const totalPrice = getCalculatedPrice(plan)
  
  cartStore.setPack({
    id:       plan.id,
    name:     plan.name,
    kits:     plan.kits, // Fixed by plan
    portions: config.portions,
    price:    totalPrice
  })

  navigateTo('/catalogue')
}

onMounted(() => {
})
</script>

