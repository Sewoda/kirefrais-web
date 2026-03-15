<template>
  <div class="bg-white min-h-screen font-sans overflow-hidden relative">
    
    <!-- Step 1: Ripple Effect -->
    <Transition name="ripple">
      <div v-if="animateRipple" class="fixed inset-0 z-50 bg-primary rounded-full origin-center"></div>
    </Transition>

    <div class="max-w-3xl mx-auto px-4 py-16 relative z-10 flex flex-col items-center">
      
      <!-- Step 2 & 3: Circle & Checkmark -->
      <div class="relative mb-12">
        <div 
          v-if="showSuccessCircle"
          class="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_0_0_8px_rgba(27,138,74,0.15)] animate-success-bounce"
        >
          <svg class="w-16 h-16 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline class="check-draw" points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <!-- CSS Confetti Container -->
        <div v-if="showCards" class="confetti-container">
          <div v-for="n in 20" :key="n" class="confetti-piece" :style="confettiStyle(n)"></div>
        </div>
      </div>

      <!-- Step 4: Confirm Title -->
      <Transition name="fade-up">
        <div v-if="showTitle" class="text-center">
          <h1 class="font-display font-bold text-4xl text-gray-900 mb-2 tracking-tight">Commande confirmée ! 🎉</h1>
          <!-- Step 5: Typewriter Reference -->
          <p class="text-primary font-mono font-bold text-lg tracking-widest h-7">
            {{ typedRef }}
          </p>
        </div>
      </Transition>

      <!-- Step 6: Staggered Cards -->
      <div class="w-full mt-12 space-y-6">
        <Transition name="stagger-card-1">
          <div v-if="showCards" class="bg-[#F8FAF9] rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 class="font-display font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-primary" />
              Récapitulatif de votre commande
            </h3>
            <div class="space-y-4 text-sm font-bold text-gray-500">
               <div v-for="item in orderItems" :key="item.id" class="flex justify-between items-center">
                 <span>{{ item.name }} · {{ item.portions }} pers.</span>
                 <span class="text-gray-900 font-sans tracking-tight">x {{ item.quantity }}</span>
               </div>
               <div class="flex justify-between items-center pt-4 border-t border-gray-200/50">
                 <span class="uppercase tracking-widest text-[10px]">Livraison</span>
                 <span class="text-gray-900 font-sans tracking-tight">1 500 FCFA</span>
               </div>
               <div class="flex justify-between items-center pt-4 text-xl font-display font-bold text-gray-900">
                 <span>Total payé</span>
                 <span class="text-primary font-sans font-black">{{ orderTotal }} FCFA</span>
               </div>
            </div>
          </div>
        </Transition>

        <Transition name="stagger-card-2">
          <div v-if="showCards" class="grid sm:grid-cols-2 gap-4">
            <!-- Delivery Info -->
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary animate-bounce-soft">
                <Icon name="heroicons:map-pin" class="w-5 h-5" />
              </div>
              <div>
                <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Livraison à</p>
                <p class="text-sm font-bold text-gray-900 leading-tight">Lomé, Adékossidji</p>
              </div>
            </div>

            <!-- Date Info -->
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary animate-bounce-soft delay-150">
                <Icon name="heroicons:calendar" class="w-5 h-5" />
              </div>
              <div>
                <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Prévue le</p>
                <p class="text-sm font-bold text-gray-900 leading-tight">Prochainement</p>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Footer Buttons -->
      <Transition name="fade-up-long">
        <div v-if="showCards" class="mt-16 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <NuxtLink 
            to="/"
            class="bg-white border border-gray-200 text-gray-900 font-bold px-10 py-5 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
           <Icon name="heroicons:home" class="w-5 h-5 opacity-50" />
           Retour à l'accueil
          </NuxtLink>
           <NuxtLink 
            to="/profil/commandes"
            class="bg-primary text-white font-bold px-10 py-5 rounded-2xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-primary/20"
          >
           <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
           Suivre ma commande
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const orderRef = route.query.ref as string || 'FK-2026-00000'
const typedRef = ref('')

// Animation States
const animateRipple = ref(false)
const showSuccessCircle = ref(false)
const showTitle = ref(false)
const showCards = ref(false)

onMounted(() => {
  animateRipple.value = true
  setTimeout(() => { animateRipple.value = false }, 800)
  setTimeout(() => { showSuccessCircle.value = true }, 300)
  setTimeout(() => { showTitle.value = true }, 800)

  setTimeout(() => {
    let i = 0
    const interval = setInterval(() => {
      typedRef.value += orderRef[i]
      i++
      if (i === orderRef.length) clearInterval(interval)
    }, 50)
  }, 1000)

  setTimeout(() => { showCards.value = true }, 1300)
})

function confettiStyle(n: number) {
  const left = Math.random() * 100
  const duration = 2 + Math.random() * 2
  const delay = Math.random() * 2
  const colors = ['#1B8A4A', '#F4A400', '#ffffff']
  const bg = colors[Math.floor(Math.random() * colors.length)]
  return {
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    backgroundColor: bg
  }
}

const orderItems = [
  { id: 1, name: 'Votre kit sélectionné', portions: 2, quantity: 1 }
]
const orderTotal = '15 000'
</script>

<style scoped>
/* High Impact Ripple */
.ripple-enter-active {
  transition: all 800ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: scale(0);
}
.ripple-enter-to {
  transform: scale(3);
  opacity: 0;
}

/* Success Bounce */
.animate-success-bounce {
  animation: success-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes success-bounce {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

/* Checkmark Drawing */
.check-draw {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 0.6s ease-out forwards;
  animation-delay: 0.5s;
}
@keyframes draw {
  to { stroke-dashoffset: 0; }
}

/* Transitions */
.fade-up-enter-active {
  transition: all 0.5s ease-out;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-long-enter-active {
  transition: all 0.8s ease-out;
}
.fade-up-long-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.stagger-card-1-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.stagger-card-1-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.stagger-card-2-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 150ms;
}
.stagger-card-2-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.animate-bounce-soft {
  animation: bounce-soft 3s infinite ease-in-out;
}
@keyframes bounce-soft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* CSS Confetti */
.confetti-container {
  position: absolute;
  top: -50px;
  left: -100px;
  right: -100px;
  height: 200px;
  pointer-events: none;
  z-index: -1;
}
.confetti-piece {
  position: absolute;
  width: 8px;
  height: 8px;
  top: 0;
  opacity: 0;
  animation: confetti-fall linear infinite;
}
@keyframes confetti-fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
}
</style>
