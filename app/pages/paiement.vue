<template>
  <div class="bg-gray-50/50 min-h-screen font-sans pb-24">
    <div class="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      
      <!-- Stepper / Breadcrumbs -->
      <div class="flex items-center justify-center gap-4 mb-16 px-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">
            <Icon name="heroicons:check" class="w-5 h-5" />
          </div>
          <span class="text-[10px] font-bold text-gray-900 uppercase tracking-widest hidden sm:block">Panier</span>
        </div>
        <div class="w-12 h-px bg-primary/30"></div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">2</div>
          <span class="text-[10px] font-bold text-gray-900 uppercase tracking-widest hidden sm:block">Paiement</span>
        </div>
        <div class="w-12 h-px bg-gray-200"></div>
        <div class="flex items-center gap-3 opacity-30">
          <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm">3</div>
          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden sm:block">Confirmation</span>
        </div>
      </div>

      <!-- Success / Confirmation -->
      <section v-if="orderCreated" 
        class="max-w-2xl mx-auto text-center bg-white rounded-3xl p-12 lg:p-20 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
        <div class="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 relative">
          <Icon name="heroicons:check-circle" class="w-16 h-16 text-primary" />
          <div class="absolute -top-1 -right-1 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold animate-bounce shadow-lg shadow-secondary/30">
            !
          </div>
        </div>
        <h1 class="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4 tracking-tight">Commande confirmée !</h1>
        <p class="text-gray-500 mb-12 max-w-sm mx-auto leading-relaxed text-lg">
          Merci pour votre confiance. Votre kit repas sera préparé avec soin pour le 
          <span class="text-primary font-bold">{{ cartStore.deliveryDate }}</span>.
        </p>
        <NuxtLink 
          to="/"
          class="bg-primary text-white font-bold px-12 py-5 rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95"
        >
          <Icon name="heroicons:home" class="w-5 h-5" />
          Retour à l'accueil
        </NuxtLink>
      </section>

      <div v-else>
        <div class="flex flex-col lg:flex-row gap-4 items-end justify-between mb-8">
          <div>
            <h1 class="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight">Paiement</h1>
            <p class="text-gray-400 mt-1 text-sm font-medium">Finalisez votre commande en toute sécurité.</p>
          </div>
          <NuxtLink to="/panier" class="text-primary text-xs font-bold hover:underline flex items-center gap-2">
            <Icon name="heroicons:arrow-left" class="w-3 h-3" />
            Retour au panier
          </NuxtLink>
        </div>

        <div class="grid lg:grid-cols-12 gap-8 items-start">
          
          <div class="lg:col-span-8 space-y-6">
            <!-- Payment Methods -->
            <div>
              <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1 leading-none">Choisir un mode de paiement</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  v-for="method in paymentMethods" 
                  :key="method.id"
                  @click="selectedMethod = method.id"
                  class="flex items-center justify-between p-4 rounded-xl border transition-all group bg-white shadow-sm"
                  :class="selectedMethod === method.id ? 'border-primary ring-1 ring-primary/20 shadow-primary/5' : 'border-gray-100 hover:border-gray-200'"
                >
                  <div class="flex items-center gap-4 text-left">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary"
                         :class="{ 'bg-primary text-white': selectedMethod === method.id }">
                      <Icon :name="method.icon" class="w-5 h-5" />
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 text-sm tracking-tight leading-tight">{{ method.label }}</p>
                      <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{{ method.desc }}</p>
                    </div>
                  </div>
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                       :class="selectedMethod === method.id ? 'border-primary bg-primary' : 'border-gray-200 bg-white'">
                    <Icon name="heroicons:check-small" class="text-white w-4 h-4" v-if="selectedMethod === method.id" />
                  </div>
                </button>
              </div>
            </div>

            <!-- Notes -->
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 leading-none">Instructions de livraison spécial (optionnel)</label>
               <textarea 
                 v-model="notes"
                 rows="3" 
                 placeholder="Ex: Code portail, étage, point de repère précis..."
                 class="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-gray-900"
               />
            </div>

            <!-- Security Info -->
            <div class="bg-primary/5 rounded-2xl p-4 flex gap-4 border border-primary/10">
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-primary/10 shadow-sm">
                <Icon name="heroicons:shield-check" class="w-6 h-6 text-primary" />
              </div>
              <div class="space-y-1">
                <p class="text-[10px] font-bold text-primary uppercase tracking-widest">Paiement 100% Sécurisé</p>
                <p class="text-xs text-primary/70 font-medium leading-relaxed">
                  Vos transactions sont chiffrées et sécurisées par CinetPay. Nous ne stockons aucune coordonnée bancaire.
                </p>
              </div>
            </div>
          </div>

          <!-- Sidebar Summary Recap -->
          <div class="lg:col-span-4 space-y-6">
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-8">
              <h3 class="font-display font-bold text-xl text-gray-900 mb-8 tracking-tight">Récapitulatif</h3>
              
              <div class="space-y-4 mb-8 pb-8 border-b border-gray-100">
                <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span class="text-gray-400">Articles</span>
                  <span class="text-gray-900 font-sans tracking-tight">{{ format(cartStore.subtotal) }}</span>
                </div>
                <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span class="text-gray-400">Livraison</span>
                  <span class="text-gray-900 font-sans tracking-tight">{{ format(cartStore.deliveryFee) }}</span>
                </div>
                <div v-if="cartStore.discount > 0" class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-secondary">
                  <span>Réduction</span>
                  <span class="font-sans tracking-tight">- {{ format(cartStore.discount) }}</span>
                </div>
              </div>

              <div class="flex justify-between items-center mb-8">
                <span class="font-display font-bold text-xl text-gray-900 uppercase tracking-widest text-xs">Total à payer</span>
                <span class="font-sans text-3xl font-black text-primary leading-none">{{ format(cartStore.total) }}</span>
              </div>

              <button 
                @click="confirmOrder"
                :disabled="loading"
                class="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:cursor-not-allowed
                       text-white font-bold py-5 rounded-2xl text-lg transition-all 
                       flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-primary/20"
              >
                <Icon v-if="loading" name="heroicons:arrow-path" class="w-6 h-6 animate-spin" />
                <span v-else>Confirmer et Payer</span>
                <Icon v-if="!loading" name="heroicons:bolt" class="w-5 h-5" />
              </button>

              <div class="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <Icon name="logos:visa" class="w-10" />
                <Icon name="logos:mastercard" class="w-10" />
                <span class="text-[9px] font-bold text-gray-900 uppercase tracking-widest">Flooz</span>
                <span class="text-[9px] font-bold text-gray-900 uppercase tracking-widest">TMoney</span>
              </div>
            </div>

            <p class="text-[10px] text-center text-gray-400 font-medium px-4 leading-relaxed">
              En cliquant sur "Confirmer et Payer", vous acceptez nos CGV et notre politique de confidentialité.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'Paiement sécurisé — Kirefrais Togo' })

const cartStore = useCartStore()
const { format } = useFormatPrice()
const { api } = useApi()

const config = useRuntimeConfig()
const { user } = useCurrentUser()

const loading = ref(false)
const orderCreated = ref(false)
const selectedMethod = ref('all')
const notes = ref('')

const paymentMethods = [
  { id: 'all',    label: 'CinetPay',     desc: 'Mobile & Carte',    icon: 'heroicons:credit-card' },
  { id: 'cash',   label: 'À la livraison', desc: 'Simple et classique', icon: 'heroicons:banknotes' },
]

async function confirmOrder() {
  if (cartStore.isEmpty) return
  if (!selectedMethod.value) {
    toast.error('Veuillez choisir un mode de paiement')
    return
  }

  loading.value = true
  try {
    const items = cartStore.items.map(i => ({
      meal_kit_id: i.kitId,
      portions:    i.portions,
      quantity:    i.quantity
    }))

    // 1. Création de la commande sur l'API
    const response = await api('/orders', {
      method: 'POST',
      body: {
        items,
        delivery_date:  cartStore.deliveryDate,
        delivery_slot:  cartStore.deliverySlot,
        address_id:     1, // À dynamiser plus tard
        payment_method: selectedMethod.value,
        notes:          notes.value,
        promo_code:     cartStore.promoCode
      }
    })

    const order = response.data || response

    // 2. Gestion du paiement selon la méthode
    if (selectedMethod.value === 'cash') {
      orderCreated.value = true
      cartStore.clear()
      toast.success('Commande enregistrée !')
    } else {
      // Intégration CinetPay
      if (!(window as any).CinetPay) {
        toast.error('Erreur de chargement du module de paiement.')
        return
      }

      const cp = (window as any).CinetPay
      
      cp.setConfig({
        apikey: config.public.cinetpayApiKey,
        site_id: config.public.cinetpaySiteId,
        notify_url: config.public.apiBase + '/payments/webhook'
      })

      cp.getCheckout({
        transaction_id: `KFK_${order.id}_${Date.now()}`,
        amount: cartStore.total,
        currency: 'XOF',
        channels: 'ALL',
        description: `Commande FreshKits #${order.id}`,
        customer_name: user.value?.name || 'Client',
        customer_surname: user.value?.name || 'KFK',
        customer_email: user.value?.email || '',
        customer_phone_number: user.value?.phone || '',
        customer_address: "Lomé",
        customer_city: "Lomé",
        customer_country: "TG",
        customer_state: "TG",
        customer_zip_code: "00228"
      })

      cp.waitResponse((data: any) => {
        if (data.status === "ACCEPTED") {
          orderCreated.value = true
          cartStore.clear()
          toast.success('Paiement validé et commande confirmée ! 🎉')
        } else if (data.status === "CANCELLED") {
          toast.info('Paiement annulé.')
        } else {
          toast.error('Le paiement n\'a pas pu être validé.')
        }
      })
    }
  } catch (err: any) {
    console.error(err)
    toast.error(err?.data?.message || 'Erreur lors de la commande. Veuillez réessayer.')
  } finally {
    loading.value = false
  }
}
</script>
