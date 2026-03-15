<template>
  <div class="bg-[#F8FAF9] min-h-screen font-sans pb-24">
    <div class="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      
      <!-- Stepper / Breadcrumbs -->
      <CheckoutStepBar :current-step="1" />

      <div class="flex flex-col lg:flex-row gap-4 items-end justify-between mb-8">
        <div>
          <h1 class="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight">Mon Panier</h1>
          <p class="text-gray-400 mt-1 text-sm font-medium">Vous avez {{ cartStore.count }} article(s) dans votre sélection.</p>
        </div>
        <NuxtLink v-if="!cartStore.isEmpty" to="/catalogue" class="text-primary text-xs font-bold hover:underline flex items-center gap-2">
          <Icon name="heroicons:arrow-left" class="w-3 h-3" />
          Continuer mes achats
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-if="cartStore.isEmpty" 
        class="bg-white rounded-3xl p-12 lg:p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
        <div class="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6 relative animate-bounce-slow">
          <Icon name="heroicons:shopping-cart" class="w-12 h-12 text-primary/20" />
          <div class="absolute -top-1 -right-1 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-secondary/30">
            ?
          </div>
        </div>
        <h2 class="text-2xl font-display font-bold text-gray-900 mb-3">Votre panier est bien vide...</h2>
        <p class="text-gray-500 mb-8 max-w-xs leading-relaxed text-sm">
          On dirait que vous n'avez pas encore choisi de délicieux repas pour cette semaine.
        </p>
        <NuxtLink 
          to="/catalogue"
          class="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2 text-sm active:scale-95"
        >
          <Icon name="heroicons:list-bullet" class="w-4 h-4" />
          Découvrir le catalogue
        </NuxtLink>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Products List -->
        <div class="lg:col-span-8 order-1">
          <TransitionGroup 
            name="cart-list" 
            tag="div" 
            class="space-y-4"
          >
            <div v-for="item in cartStore.items" :key="`${item.kitId}-${item.portions}`" 
                 class="tunnel-card p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center sm:items-start group relative overflow-hidden">
              
              <!-- Product Image -->
              <div class="w-full sm:w-24 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100 relative shadow-inner">
                <NuxtImg :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>

              <!-- Details -->
              <div class="flex-1 w-full text-center sm:text-left">
                <div class="flex items-center gap-2 justify-center sm:justify-start mb-2">
                  <span class="bg-secondary/10 text-secondary text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border border-secondary/20">
                    {{ item.portions }} portions
                  </span>
                </div>
                <h3 class="font-display font-black text-lg text-gray-900 group-hover:text-primary transition-colors cursor-pointer leading-tight mb-4" @click="navigateTo(`/catalogue/${item.kitId}`)">
                  {{ item.name }}
                </h3>
                
                <div class="flex items-center justify-between sm:justify-start gap-6 pt-4 border-t border-gray-50 sm:border-0 sm:pt-0">
                  <!-- Quantity Switch -->
                  <div class="flex items-center gap-1.5 bg-gray-50 rounded-xl px-1.5 py-1.5 border border-gray-200/50 shadow-sm">
                    <button @click="updateQty(item, item.quantity - 1)" 
                            class="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-white hover:text-red-500 rounded-lg transition-all active:scale-90">
                      <Icon name="heroicons:minus" class="w-4 h-4" />
                    </button>
                    <div class="relative overflow-hidden w-6 h-6 flex items-center justify-center">
                      <Transition name="count-flip" mode="out-in">
                        <span :key="item.quantity" class="text-sm font-sans font-black text-gray-900 absolute">
                          {{ item.quantity }}
                        </span>
                      </Transition>
                    </div>
                    <button @click="updateQty(item, item.quantity + 1)"
                            class="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-white hover:text-primary rounded-lg transition-all active:scale-90">
                      <Icon name="heroicons:plus" class="w-4 h-4" />
                    </button>
                  </div>

                  <div class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] hidden sm:block">
                    {{ format(item.unitPrice) }} / kit
                  </div>

                   <!-- Mobile Trash -->
                   <button 
                    @click="cartStore.remove(item.kitId, item.portions)"
                    class="sm:hidden w-10 h-10 rounded-xl bg-red-50 text-red-500 transition-all flex items-center justify-center active:scale-90"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- Price & Desktop Trash -->
              <div class="hidden sm:flex flex-col items-end justify-between self-stretch pl-6 border-l border-gray-50">
                <div class="text-right" :class="{ 'animate-price-pulse': pulsingItems.has(`${item.kitId}-${item.portions}`) }">
                  <p class="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Total</p>
                  <p class="text-xl font-sans font-black text-gray-900 leading-none">
                    {{ format(item.unitPrice * item.quantity) }}
                  </p>
                </div>
                
                <button 
                  @click="cartStore.remove(item.kitId, item.portions)"
                  class="w-10 h-10 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center group"
                >
                  <Icon name="heroicons:trash" class="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <!-- Mobile Price Badge -->
              <div class="sm:hidden w-full pt-4 mt-2 border-t border-dashed border-gray-100 flex justify-between items-center">
                 <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Montant</span>
                 <span class="text-lg font-sans font-black text-gray-900">{{ format(item.unitPrice * item.quantity) }}</span>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Summary Sidebar -->
        <div class="lg:col-span-4 lg:sticky lg:top-24 order-2">
          <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 class="font-display font-black text-xl mb-8 text-gray-900 tracking-tight">Résumé de la commande</h3>
            
            <div class="space-y-6">
              <!-- Promo -->
              <div>
                 <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Code Réduction</label>
                 <div class="flex gap-2">
                   <input 
                     type="text" 
                     v-model="promoInput"
                     placeholder="Ex: BIENVENUE"
                     :class="{ 'animate-shake border-red-200 bg-red-50': promoError }"
                     class="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary uppercase text-gray-900 transition-all placeholder:text-gray-300"
                   />
                   <button 
                     @click="applyPromo"
                     class="px-5 bg-primary text-white rounded-xl font-black text-xs hover:bg-primary-dark transition-all active:scale-95 shadow-lg shadow-primary/10"
                   >
                     OK
                   </button>
                 </div>
              </div>
              
              <!-- Totals -->
              <div class="pt-6 border-t border-gray-200 border-dashed space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Articles</span>
                  <span class="font-sans font-black text-gray-900 text-base">{{ format(cartStore.subtotal) }}</span>
                </div>
                
                <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                  <span class="text-gray-400">Livraison</span>
                  <span class="text-primary italic lowercase font-bold tracking-normal">Calculée ensuite</span>
                </div>
                
                <Transition name="slide-down">
                  <div v-if="cartStore.discount > 0" class="flex justify-between items-center bg-secondary/5 p-3 rounded-xl border border-secondary/10">
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Réduction</span>
                    <span class="font-sans font-black text-secondary">- {{ format(cartStore.discount) }}</span>
                  </div>
                </Transition>

                  <span class="font-display font-black text-xl text-gray-900">Total</span>
                  <div class="text-right">
                    <p class="font-sans text-2xl font-black text-primary leading-none">
                      {{ format(cartStore.total) }}
                    </p>
                    <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {{ cartStore.addressId ? 'Tout compris' : 'Hors livraison' }}
                    </p>
                  </div>
              </div>

              <div class="pt-2">
                <button 
                  @click="goToAddress"
                  class="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 group"
                >
                  Valider mon panier
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="mt-8 grid grid-cols-3 gap-4">
             <div class="text-center group">
                <div class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Icon name="heroicons:shield-check" class="w-6 h-6 text-primary" />
                </div>
                <span class="text-[8px] font-black uppercase text-gray-400 tracking-tighter leading-tight block">Paiement<br/>Sécurisé</span>
             </div>
             <div class="text-center group">
                <div class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Icon name="heroicons:truck" class="w-6 h-6 text-primary" />
                </div>
                <span class="text-[8px] font-black uppercase text-gray-400 tracking-tighter leading-tight block">Livraison<br/>Zéro-Contact</span>
             </div>
             <div class="text-center group">
                <div class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Icon name="heroicons:heart" class="w-6 h-6 text-primary" />
                </div>
                <span class="text-[8px] font-black uppercase text-gray-400 tracking-tighter leading-tight block">Produits<br/>Frais Locaux</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  pageTransition: { name: 'tunnel', mode: 'out-in' }
})

const cartStore = useCartStore()
const { format } = useFormatPrice()

const promoInput = ref('')
const promoError = ref(false)
const pulsingItems = ref(new Set<string>())

function applyPromo() {
  if (promoInput.value.toUpperCase() === 'TOGO228') {
    cartStore.applyPromo('TOGO228', 1000)
    toast.success('Réduction de 1 000 FCFA appliquée !')
    promoInput.value = ''
  } else {
    promoError.value = true
    toast.error('Code promo invalide.')
    setTimeout(() => { promoError.value = false }, 400)
  }
}

function updateQty(item: any, newQty: number) {
  const itemKey = `${item.kitId}-${item.portions}`
  pulsingItems.value.add(itemKey)
  cartStore.updateQty(item.kitId, item.portions, newQty)
  setTimeout(() => { pulsingItems.value.delete(itemKey) }, 300)
}

function goToAddress() {
  navigateTo('/checkout/adresse')
}
</script>

<style scoped>
/* Transiton de Liste Items */
.cart-list-enter-active {
  transition: all 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cart-list-leave-active {
  transition: all 320ms ease;
  position: absolute; /* requis pour le slide des autres items */
  width: 100%;
}
.cart-list-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.cart-list-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
.cart-list-move {
  transition: transform 250ms ease;
}

/* Count Flip Animation */
.count-flip-enter-active {
  transition: all 180ms ease-out;
}
.count-flip-leave-active {
  transition: all 180ms ease-in;
}
.count-flip-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.count-flip-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

/* Price Pulse */
.animate-price-pulse {
  animation: price-pulse 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes price-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); color: var(--color-secondary); }
  100% { transform: scale(1); }
}

/* Slide Down (Promo line) */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 250ms ease;
  overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  height: 0;
  transform: translateY(-10px);
}

.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-3deg) rotate(-3deg); }
  75% { transform: translateY(-3deg) rotate(3deg); }
}
</style>
