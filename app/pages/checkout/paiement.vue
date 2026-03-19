<template>
  <div class="bg-[#F8FAF9] min-h-screen font-sans pb-24">
    <div class="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      
      <!-- Stepper -->
      <CheckoutStepBar :current-step="4" />

      <div class="max-w-4xl mx-auto px-4">
        <div class="flex flex-col sm:flex-row gap-4 items-center sm:items-end justify-between mb-8 text-center sm:text-left">
          <div>
            <h1 class="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight">Comment souhaitez-vous payer ?</h1>
            <p class="text-gray-400 mt-1 text-sm font-medium">Finalisez votre commande en toute sécurité.</p>
          </div>
          <NuxtLink to="/checkout/creneau" class="text-primary text-xs font-bold hover:underline flex items-center gap-2">
            <Icon name="heroicons:arrow-left" class="w-3 h-3" />
            Modifier le créneau
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div class="lg:col-span-8 space-y-4">
            <!-- Payment Methods List -->
            <div v-for="method in paymentMethods" :key="method.id" class="relative">
              <button 
                @click="selectedMethod = method.id"
                class="w-full text-left transition-all duration-300"
              >
                <div 
                  class="tunnel-card p-6 flex items-center justify-between group overflow-hidden"
                  :class="{ 'tunnel-card-active border-primary bg-primary/5': selectedMethod === method.id }"
                >
                  <div class="flex items-center gap-5">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary"
                         :class="{ 'bg-primary text-white': selectedMethod === method.id }">
                      <Icon :name="method.icon" class="w-7 h-7" />
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900 text-base tracking-tight">{{ method.label }}</h3>
                      <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{{ method.desc }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <!-- Logos small icons -->
                    <div v-if="method.id === 'flooz' || method.id === 'tmoney'" class="hidden sm:flex gap-2 grayscale-0 opacity-50">
                       <!-- Small logos placeholders -->
                    </div>
                    <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                         :class="selectedMethod === method.id ? 'border-primary bg-primary' : 'border-gray-200 bg-white shadow-inner'">
                      <Icon name="heroicons:check-small" class="text-white w-5 h-5" v-if="selectedMethod === method.id" />
                    </div>
                  </div>
                </div>
              </button>

              <!-- Expandable Content (Fields/Info) -->
              <Transition name="expand-stagger">
                <div v-if="selectedMethod === method.id" class="bg-white border-x border-b border-primary/10 rounded-b-2xl -mt-4 p-8 pt-10 shadow-lg shadow-primary/5">
                   <div class="stagger-item space-y-6">
                      <template v-if="method.id === 'flooz' || method.id === 'tmoney'">
                        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Entrez votre numéro {{ method.label }}</p>
                        <div class="flex gap-2">
                          <div class="bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-black text-gray-400 flex items-center">+228</div>
                          <input 
                            v-model="phoneNumber"
                            type="tel"
                            placeholder="________"
                            class="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-black tracking-widest text-gray-900 focus:outline-none focus:border-primary transition-all"
                          />
                        </div>
                        <p class="text-[10px] text-gray-400 font-medium italic">Un code de confirmation vous sera envoyé par SMS pour valider le paiement.</p>
                      </template>

                      <template v-else-if="method.id === 'card'">
                        <div class="space-y-4">
                           <input type="text" placeholder="Numéro de carte" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold" />
                           <div class="grid grid-cols-2 gap-4">
                             <input type="text" placeholder="MM/YY" class="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold" />
                             <input type="text" placeholder="CVV" class="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold" />
                           </div>
                        </div>
                      </template>

                      <template v-else-if="method.id === 'cash'">
                        <div class="bg-amber-50 rounded-xl p-4 flex gap-3 border border-amber-100">
                          <Icon name="heroicons:information-circle" class="w-5 h-5 text-amber-500 shrink-0" />
                          <p class="text-xs text-amber-700 font-medium leading-relaxed">
                            Veuillez préparer l'appoint si possible pour faciliter le travail de notre livreur. Merci !
                          </p>
                        </div>
                      </template>
                   </div>
                </div>
              </Transition>
            </div>

            <!-- Notes Section -->
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
               <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 leading-none ml-1">Notes pour la livraison (Optionnel)</label>
               <textarea 
                 v-model="notes"
                 rows="3" 
                 placeholder="Ex: Code portail, étage, point de repère précis..."
                 class="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-gray-900"
               />
            </div>
          </div>

          <!-- Sidebar Summary Recap -->
          <div class="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 class="font-display font-bold text-xl text-gray-900 mb-8 tracking-tight">Récapitulatif final</h3>
              
              <div class="space-y-4 mb-8 pb-8 border-b border-gray-100">
                <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span class="text-gray-400">Articles</span>
                  <span class="text-gray-900 font-sans tracking-tight">{{ format(cartStore.subtotal) }}</span>
                </div>
                <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span class="text-gray-400">Frais Livraison</span>
                  <span class="text-gray-900 font-sans tracking-tight">{{ format(cartStore.deliveryFee) }}</span>
                </div>
                <div v-if="cartStore.discount > 0" class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-secondary">
                  <span>Remise Promo</span>
                  <span class="font-sans tracking-tight">- {{ format(cartStore.discount) }}</span>
                </div>
              </div>

              <!-- Total Box -->
              <div class="bg-primary/5 rounded-[1.5rem] p-5 border border-primary/10 flex justify-between items-center mb-10 shadow-sm relative group">
                <div class="flex flex-col">
                  <span class="font-display font-black text-gray-900 uppercase tracking-[0.2em] text-[10px] leading-none mb-1 opacity-60">Total</span>
                </div>
                <div class="text-right">
                   <span class="font-sans text-xl font-black text-primary tracking-tighter leading-none block">{{ format(cartStore.total) }}</span>
                </div>
              </div>

               <!-- Error Message Alert -->
               <Transition name="expand-stagger">
                 <div v-if="paymentError" class="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-start gap-3 mb-6 animate-shake">
                   <Icon name="heroicons:information-circle" class="w-5 h-5 shrink-0" />
                   <div class="flex-1">
                      <p class="text-[10px] font-black uppercase tracking-widest mb-1">Erreur de paiement</p>
                      <p class="text-xs font-medium leading-tight">{{ paymentError }}</p>
                   </div>
                   <button @click="paymentError = ''" class="text-red-300 hover:text-red-500">
                     <Icon name="heroicons:x-mark" class="w-4 h-4" />
                   </button>
                 </div>
               </Transition>

               <button 
                @click="confirmOrder"
                :disabled="loading || !selectedMethod"
                class="w-full relative bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:cursor-not-allowed
                       text-white font-black py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] transition-all 
                       flex items-center justify-center active:scale-95 shadow-xl shadow-primary/20 overflow-hidden"
              >
                <div 
                  class="flex items-center gap-3 transition-all duration-300"
                  :class="{ 'opacity-0 translate-y-4': loading }"
                >
                  <span>Confirmer </span>
                  <Icon name="heroicons:bolt" class="w-5 h-5" />
                </div>
                
                <!-- Spinner fade-in overlay -->
                <div 
                  v-if="loading"
                  class="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-300"
                >
                   <Icon name="heroicons:arrow-path" class="w-7 h-7 animate-spin" />
                </div>
              </button>

              <div class="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <Icon name="logos:visa" class="w-10" />
                <Icon name="logos:mastercard" class="w-10" />
                <span class="text-[9px] font-bold text-gray-900 uppercase tracking-widest">Flooz</span>
                <span class="text-[9px] font-bold text-gray-900 uppercase tracking-widest">TMoney</span>
              </div>
            </div>

            <p class="text-[10px] text-center text-gray-400 font-medium px-4 leading-relaxed italic">
              * Une fois confirmé, vous recevrez un récapitulatif par email et pourrez suivre votre livraison en temps réel.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  middleware: ['auth'],
  pageTransition: { name: 'tunnel', mode: 'out-in' }
})

const cartStore = useCartStore()
const { format } = useFormatPrice()
const { api } = useApi()

const loading = ref(false)
const selectedMethod = ref('flooz')
const phoneNumber = ref('')
const notes = ref('')
const paymentError = ref('')

const paymentMethods = [
  { id: 'flooz',  label: 'Moov Flooz',   desc: 'Paiement mobile Togo',   icon: 'heroicons:device-phone-mobile' },
  { id: 'tmoney', label: 'T-Money',      desc: 'Simple et ultra-rapide',  icon: 'heroicons:qr-code' },
  { id: 'card',   label: 'Carte Bancaire', desc: 'Visa, Mastercard...',    icon: 'heroicons:credit-card' },
  { id: 'cash',   label: 'À la livraison', desc: 'Payer à réception',      icon: 'heroicons:banknotes' },
]

async function confirmOrder() {
  if (cartStore.isEmpty) return
  paymentError.value = ''
  
  if ((selectedMethod.value === 'flooz' || selectedMethod.value === 'tmoney') && !phoneNumber.value) {
    toast.error('Veuillez entrer votre numéro de téléphone.')
    return
  }

  loading.value = true
  try {
    const items = cartStore.items.map(i => ({
      meal_kit_id: i.kitId,
      portions:    i.portions,
      quantity:    i.quantity
    }))

    const orderData = await api<any>('/orders', {
      method: 'POST',
      body: {
        items,
        delivery_date:  cartStore.deliveryDate,
        delivery_slot:  cartStore.deliverySlot,
        address_id:     cartStore.addressId,
        delivery_zone_id: cartStore.zoneId,
        payment_method: selectedMethod.value,
        phone_number:   phoneNumber.value,
        notes:          notes.value,
        promo_code:     cartStore.promoCode
      }
    })

    const newOrder = orderData.order

    // Handle Online Payment if needed
    if (['flooz', 'tmoney', 'card'].includes(selectedMethod.value)) {
      const { payWithLeekPay } = usePayment()
      await payWithLeekPay(newOrder.id)
      return // Redirecting to LeekPay...
    }

    // Store order info for confirmation page if needed, then clear cart
    cartStore.clear()
    navigateTo({
      path: '/checkout/confirmation',
      query: { order_id: newOrder.id, ref: `FK-2026-${newOrder.id}` }
    })
    
    toast.success('Commande validée !')
  } catch (err: any) {
    console.error('Payment/Order Error:', err)
    paymentError.value = err.data?.message || 'Une erreur est survenue lors du paiement. Veuillez réessayer.'
    toast.error('Échec de la commande.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.expand-stagger-enter-active, .expand-stagger-leave-active {
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 400px;
  overflow: hidden;
}
.expand-stagger-enter-from, .expand-stagger-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.stagger-item > * {
  animation: stagger-fade-in 0.4s both;
}
.stagger-item > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-item > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-item > *:nth-child(3) { animation-delay: 0.3s; }

@keyframes stagger-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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

.animate-in {
  animation: zoom-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes zoom-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
