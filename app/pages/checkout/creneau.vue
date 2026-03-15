<template>
  <div class="bg-[#F8FAF9] min-h-screen font-sans pb-24">
    <div class="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      
      <!-- Stepper -->
      <CheckoutStepBar :current-step="3" />

      <div class="max-w-4xl mx-auto px-4">
        <div class="flex flex-col sm:flex-row gap-4 items-center sm:items-end justify-between mb-8 text-center sm:text-left">
          <div>
            <h1 class="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight">Quand souhaitez-vous être livré ?</h1>
            <p class="text-gray-400 mt-1 text-sm font-medium">Choisissez un créneau qui vous convient.</p>
          </div>
          <NuxtLink to="/checkout/adresse" class="text-primary text-xs font-bold hover:underline flex items-center gap-2">
            <Icon name="heroicons:arrow-left" class="w-3 h-3" />
            Changer d'adresse
          </NuxtLink>
        </div>

        <!-- Date Selection (Pills) -->
        <div class="flex gap-3 overflow-x-auto pb-6 scrollbar-hide snap-x px-1">
          <button 
            v-for="day in availableDays" 
            :key="day.date"
            @click="selectDay(day.date)"
            class="shrink-0 w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all snap-center border-2 border-transparent"
            :class="[
              cartStore.deliveryDate === day.date 
                ? 'bg-primary text-white scale-105 shadow-xl shadow-primary/20' 
                : 'bg-white text-gray-900 shadow-sm hover:border-primary/20'
            ]"
          >
            <span class="text-[10px] font-bold uppercase tracking-widest opacity-60">{{ day.dayName }}</span>
            <span class="text-2xl font-black font-sans leading-none">{{ day.dayNum }}</span>
            <span class="text-[9px] font-bold uppercase tracking-[0.2em] mt-1">{{ day.monthName }}</span>
          </button>
        </div>

        <!-- Slots List -->
        <div class="mt-8">
          <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 ml-1 leading-none">Créneaux horaires disponibles</label>
          
          <div class="relative min-h-[300px]">
            <Transition name="slots-slide" mode="out-in">
              <div :key="cartStore.deliveryDate" class="grid sm:grid-cols-2 gap-4">
                <button 
                  v-for="(label, key) in slots" 
                  :key="key"
                  @click="cartStore.deliverySlot = key"
                  class="tunnel-card p-6 flex items-center justify-between group relative"
                  :class="{ 'tunnel-card-active': cartStore.deliverySlot === key }"
                >
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors"
                         :class="{ 'bg-primary text-white': cartStore.deliverySlot === key }">
                      <Icon name="heroicons:clock" class="w-5 h-5" />
                    </div>
                    <div class="text-left">
                      <p class="font-bold text-gray-900 text-sm tracking-tight">{{ label }}</p>
                      <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Livraison garantie</p>
                    </div>
                  </div>
                  <Transition name="scale-bounce">
                    <div v-if="cartStore.deliverySlot === key" class="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white">
                      <Icon name="heroicons:check" class="w-3 h-3" />
                    </div>
                  </Transition>
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <div class="flex justify-center mt-12 pb-12 sm:pb-0">
          <button 
            @click="goToNext"
            :disabled="!cartStore.deliveryDate || !cartStore.deliverySlot"
            class="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-black px-12 py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 disabled:bg-gray-200 disabled:shadow-none uppercase tracking-widest text-xs"
          >
            Continuer vers le paiement
            <Icon name="heroicons:arrow-right" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

definePageMeta({
  middleware: ['auth'],
  pageTransition: { name: 'tunnel', mode: 'out-in' }
})

const cartStore = useCartStore()

const slots = {
  morning:   '08h00 – 12h00',
  afternoon: '12h00 – 17h00',
  evening:   '17h00 – 20h00',
}

const availableDays = computed(() => {
  const days = []
  const today = dayjs().startOf('day')
  
  // Generate next 7 days starting from tomorrow
  for (let i = 1; i <= 7; i++) {
    const d = today.add(i, 'day')
    days.push({
      date:      d.format('YYYY-MM-DD'),
      dayName:   d.format('ddd'),
      dayNum:    d.format('DD'),
      monthName: d.format('MMM')
    })
  }
  return days
})

// Initialize tomorrow if not set
onMounted(() => {
  if (!cartStore.deliveryDate && availableDays.value.length > 0) {
    cartStore.deliveryDate = availableDays.value[0].date
  }
})

function selectDay(date: string) {
  cartStore.deliveryDate = date
}

function goToNext() {
  if (cartStore.deliveryDate && cartStore.deliverySlot) {
    navigateTo('/checkout/paiement')
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Day Change Animation */
.slots-slide-leave-active {
  transition: all 180ms ease-in;
}
.slots-slide-enter-active {
  transition: all 220ms ease-out;
  transition-delay: 80ms;
}
.slots-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slots-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.tunnel-card-active {
  animation: card-jump 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes card-jump {
  0% { transform: scale(1); }
  33% { transform: scale(0.98); }
  66% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.scale-bounce-enter-active {
  animation: scale-bounce 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes scale-bounce {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
</style>
