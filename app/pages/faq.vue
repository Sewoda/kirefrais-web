<template>
  <div class="font-sans relative min-h-screen bg-[#f8f5f2] overflow-hidden pb-20">
    <!-- Texture Background (Table) -->
    <div class="absolute inset-0 z-0 opacity-40 pointer-events-none" 
         style="background-image: url('https://www.transparenttextures.com/patterns/granite.png');"></div>

      <!-- Floating Decorations -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div v-for="i in 8" :key="i" 
           class="absolute animate-float-around opacity-10"
           :style="getRandomFoodStyle(i)">
        <Icon :name="foodIcons[i % foodIcons.length]" class="w-12 h-12" />
      </div>
    </div>

    <!-- Header -->
    <header class="relative z-10 pt-16 pb-8 text-center">
      <div class="inline-block mb-4 px-6 py-2 bg-white rounded-full shadow-sm border border-orange-100">
        <span class="text-primary font-black uppercase tracking-[0.2em] text-xs">Service à Table • FAQ</span>
      </div>
      <h1 class="font-display font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tighter">
        Des questions ?<br/>
        <span class="text-primary italic">On vous sert les réponses !</span>
      </h1>
    </header>

    <!-- Main Scene -->
    <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr_2.5fr_1fr] gap-4 lg:gap-8 items-start relative z-10 mt-12">
      
      <!-- Questions Left -->
      <div class="space-y-4 order-2 lg:order-1">
        <div v-for="(item, idx) in leftFaqs" :key="idx" class="relative">
          <button 
            @click="serveFaq(item)"
            class="w-full text-right p-5 bg-white rounded-2xl shadow-sm border-2 border-transparent transition-all hover:border-primary hover:-translate-x-2 group flex flex-row-reverse items-center gap-4"
            :class="{ 'border-primary ring-4 ring-primary/10': currentFaq?.q === item.q }"
          >
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
               <Icon :name="item.icon" class="w-6 h-6 text-primary" />
            </div>
            <span class="font-bold text-gray-800 text-sm md:text-base leading-tight">{{ item.q }}</span>
          </button>
        </div>
      </div>

      <!-- Center Stage (The Plate) -->
      <div class="flex flex-col items-center justify-center min-h-[450px] lg:min-h-[600px] order-1 lg:order-2 sticky top-24">
        
        <!-- The Plate Animation -->
        <transition 
          name="plate-drop"
          @after-enter="showAnswer = true"
          @before-leave="showAnswer = false"
        >
          <div v-if="serving" class="relative group">
            <!-- Plate Shadow -->
            <div class="absolute inset-x-8 -bottom-4 h-8 bg-black/10 blur-xl rounded-full scale-y-50"></div>
            
            <!-- Plate Container -->
            <div class="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] bg-white rounded-full shadow-2xl border-[16px] border-gray-50 flex items-center justify-center overflow-hidden">
               <!-- Decorative Inner Rim -->
               <div class="absolute inset-8 border-[1px] border-gray-100 rounded-full"></div>
               <div class="absolute inset-10 border-[1px] border-gray-100 rounded-full"></div>

               <!-- The Answer Content -->
               <transition name="fade-up">
                 <div v-if="showAnswer && currentFaq" class="p-8 md:p-16 text-center relative z-10">
                   <div class="mb-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity flex justify-center">
                     <Icon name="material-symbols:restaurant-menu-rounded" class="w-12 h-12" />
                   </div>
                   <h3 class="font-display font-black text-primary text-sm md:text-lg mb-4 uppercase tracking-widest">Réponse du Chef</h3>
                   <p class="text-gray-700 font-medium text-base md:text-xl lg:text-2xl leading-relaxed italic">
                     " {{ currentFaq.a }} "
                   </p>
                 </div>
               </transition>

               <!-- Empty Plate Pattern -->
               <div v-if="!showAnswer" class="opacity-10">
                 <Icon name="material-symbols:auto-awesome-rounded" class="w-32 h-32 text-primary animate-spin-slow" />
               </div>
            </div>

            <!-- Cloche Decoration -->
            <div class="absolute -top-12 -right-8 animate-bounce-subtle">
              <div class="bg-secondary text-white px-4 py-2 rounded-2xl font-black text-xs shadow-lg uppercase tracking-wider rotate-12 flex items-center gap-2">
                <Icon name="material-symbols:energy-program-rounded" class="w-4 h-4" />
                Tout frais !
              </div>
            </div>
          </div>

          <!-- Empty Seat / Initial State -->
          <div v-else class="text-center p-12 bg-white/50 backdrop-blur rounded-[40px] border-2 border-dashed border-gray-300">
             <div class="w-24 h-24 bg-gray-200/50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Icon name="material-symbols:orders-rounded" class="w-12 h-12 text-gray-400" />
             </div>
             <p class="font-display font-bold text-gray-400 text-xl leading-snug">Choisissez une question<br/>pour être servi !</p>
          </div>
        </transition>

        <!-- Table Decoration -->
        <div class="mt-12 flex gap-8 items-center opacity-30">
          <Icon name="material-symbols:restaurant" class="w-8 h-8" />
          <div class="w-32 h-1 bg-gray-400 rounded-full"></div>
          <Icon name="material-symbols:local-bar-rounded" class="w-8 h-8" />
        </div>
      </div>

      <!-- Questions Right -->
      <div class="space-y-4 order-3 lg:order-3">
        <div v-for="(item, idx) in rightFaqs" :key="idx" class="relative">
          <button 
            @click="serveFaq(item)"
            class="w-full text-left p-5 bg-white rounded-2xl shadow-sm border-2 border-transparent transition-all hover:border-primary hover:translate-x-2 group flex items-center gap-4"
            :class="{ 'border-primary ring-4 ring-primary/10': currentFaq?.q === item.q }"
          >
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
               <Icon :name="item.icon" class="w-6 h-6 text-primary" />
            </div>
            <span class="font-bold text-gray-800 text-sm md:text-base leading-tight">{{ item.q }}</span>
          </button>
        </div>
      </div>

    </div>

    <!-- Bottom Contact -->
    <div class="max-w-2xl mx-auto mt-32 px-4 relative z-20">
      <div class="bg-gray-900 rounded-[32px] p-8 md:p-12 text-center shadow-2xl overflow-hidden relative group">
        <div class="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
           <Icon name="material-symbols:skillet-outline-rounded" class="w-48 h-48 text-white" />
        </div>
        <h3 class="font-display font-black text-2xl text-white mb-6">Encore une petite faim d'infos ?</h3>
        <a href="mailto:contact@Kirefrais.tg" class="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30">
          <Icon name="material-symbols:send-rounded" class="w-5 h-5" />
          Envoyer un message au Chef
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'FAQ Royale — Kirefrais',
  description: 'Posez vos questions, nous vous servons les réponses sur un plateau.'
})

interface FaqItem {
  q: string
  a: string
  icon: string
}

const currentFaq = ref<FaqItem | null>(null)
const serving = ref(false)
const showAnswer = ref(false)

const allFaqs: FaqItem[] = [
  { q: "Comment fonctionne Kirefrais ?", a: "On fait tout ! De la sélection des meilleurs produits locaux au Togo jusqu'au dosage précis de vos ingrédients. Vous n'avez plus qu'à cuisiner avec nos fiches recettes simples.", icon: "heroicons:rocket-launch" },
  { q: "Suis-je engagé dans la durée ?", a: "Liberté totale ! Mettez en pause, reprenez ou arrêtez quand vous voulez. Zéro stress, que du goût.", icon: "heroicons:no-symbol" },
  { q: "Quels sont les modes de paiement ?", a: "Totalement flexible : Tmoney, Flooz, Visa ou Mastercard. Le paiement est 100% sécurisé pour votre tranquillité.", icon: "heroicons:credit-card" },
  { q: "Où livrez-vous vos box ?", a: "Actuellement sur tout le Grand Lomé. Nos livreurs sont équipés de sacs isothermes pour garantir une fraîcheur absolue jusqu'à votre porte.", icon: "heroicons:truck" },
  { q: "Puis-je choisir mes recettes ?", a: "Oui, chaque semaine vous découvrez un nouveau menu. À vous de choisir les kits qui vous font de l'œil parmi nos créations togolaises et internationales.", icon: "heroicons:clipboard-document-list" },
  { q: "Est-ce sain pour ma famille ?", a: "Absolument. On privilégie le frais, le local et le brut. Pas d'additifs bizarres, juste de vrais bons produits cuisinés par VOUS.", icon: "heroicons:heart" },
  { q: "Fournissez-vous l'huile & sel ?", a: "On fournit tout le reste ! On compte sur vous pour avoir le sel, le poivre et l'huile de base dans vos placards.", icon: "heroicons:beaker" },
  { q: "Les portions sont généreuses ?", a: "On ne blague pas avec l'appétit au Togo ! Les portions sont calculées pour être rassasiantes et gourmandes.", icon: "heroicons:sparkles" }
]

const leftFaqs = computed(() => allFaqs.slice(0, 4))
const rightFaqs = computed(() => allFaqs.slice(4))

const serveFaq = async (item: FaqItem) => {
  if (currentFaq.value?.q === item.q) return
  
  serving.value = false // Withdraw current plate
  await nextTick()
  
  currentFaq.value = item
  serving.value = true // Drop new plate
}

const foodIcons = [
  'material-symbols:avg-pace-rounded',
  'material-symbols:bakery-dining-rounded',
  'material-symbols:breakfast-dining-rounded',
  'material-symbols:icecream-rounded',
  'material-symbols:local-pizza-rounded',
  'material-symbols:lunch-dining-rounded',
  'material-symbols:egg-alt-rounded',
  'material-symbols:nutrition-rounded'
]

const getRandomFoodStyle = (i: number) => {
  const top = Math.random() * 80 + 10
  const left = Math.random() * 80 + 10
  const delay = Math.random() * 5
  return {
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${delay}s`
  }
}
</script>

<style scoped>
/* Plate Drop Animation */
.plate-drop-enter-active {
  animation: drop-and-bounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.plate-drop-leave-active {
  animation: plate-withdraw 0.4s ease-in forwards;
}

@keyframes drop-and-bounce {
  0% {
    transform: translateY(-800px) scale(0.5);
    opacity: 0;
  }
  60% {
    transform: translateY(0) scale(1.1);
    opacity: 1;
  }
  80% {
    transform: translateY(-20px) scale(1.02);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes plate-withdraw {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5) translateY(200px); opacity: 0; }
}

/* Transitions */
.fade-up-enter-active {
  transition: all 0.5s ease-out 0.3s;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float-around {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -50px) rotate(10deg); }
  66% { transform: translate(-20px, 30px) rotate(-10deg); }
}

.animate-float-around {
  animation: float-around 15s ease-in-out infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite ease-in-out;
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-10px) rotate(15deg); }
}

.font-display { font-family: 'Outfit', sans-serif; }
</style>
