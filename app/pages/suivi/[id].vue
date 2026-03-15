<template>
  <div class="bg-brand-cream/50 min-h-screen font-sans pb-24">
    <div v-if="pending" class="flex flex-col items-center justify-center min-h-[60vh]">
      <Icon name="heroicons:arrow-path" class="w-12 h-12 text-primary animate-spin" />
      <p class="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[10px]">Chargement du suivi...</p>
    </div>

    <div v-else-if="order" class="max-w-7xl mx-auto px-4 py-16">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div class="flex items-center gap-6">
          <NuxtLink to="/profil" class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all shadow-sm">
            <Icon name="heroicons:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <div>
            <h1 class="font-display font-bold text-4xl text-gray-900 tracking-tight">Suivi de commande</h1>
            <p class="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Réf: {{ order.reference }}</p>
          </div>
        </div>
        <div class="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
           <div class="w-2 h-2 rounded-full bg-primary animate-pulse" />
           <span class="text-xs font-black text-gray-900 uppercase tracking-widest">{{ order.status === 'delivered' ? 'Livrée' : 'En cours' }}</span>
        </div>
      </div>

      <div class="grid lg:grid-cols-12 gap-16 items-start">
        <!-- Status Tracker -->
        <div class="lg:col-span-12 xl:col-span-4 space-y-10">
          <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="font-display font-bold text-2xl text-gray-900 mb-12 tracking-tight">État de la box</h3>
            
            <div class="space-y-10 relative">
               <!-- Vertical Line -->
               <div class="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-50" />

               <div v-for="(step, index) in trackingSteps" :key="step.status" class="flex items-start gap-8 relative group">
                  <div class="z-10 w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500 shadow-sm"
                       :class="isStepActive(step.status) ? 'bg-primary border-primary text-white scale-110' : 'bg-white border-gray-50 text-gray-300'">
                    <Icon :name="step.icon" class="w-5 h-5" />
                  </div>
                  <div>
                    <h4 class="font-bold text-xs uppercase tracking-widest mb-1" :class="isStepActive(step.status) ? 'text-gray-900' : 'text-gray-300'">{{ step.label }}</h4>
                    <p class="text-[10px] font-medium leading-relaxed max-w-[200px]" :class="isStepActive(step.status) ? 'text-gray-500' : 'text-gray-200'">{{ step.desc }}</p>
                    <p v-if="order.status === step.status" class="text-[10px] bg-secondary text-white font-black px-2 py-0.5 rounded-md mt-3 inline-block uppercase tracking-widest">Maintenant</p>
                  </div>
               </div>
            </div>
          </div>

          <!-- Deliverer Info -->
          <div v-if="order.status === 'delivering' || order.status === 'delivered'" class="bg-gray-900 p-10 rounded-3xl shadow-xl flex flex-col gap-10">
            <div>
              <p class="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-8 leading-none">Votre livreur</p>
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                  <Icon name="heroicons:user" class="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p class="font-display font-bold text-xl text-white">{{ order.deliverer?.name || 'Mani K.' }}</p>
                  <p class="text-[10px] text-secondary font-black uppercase tracking-widest mt-1">En route 🛵</p>
                </div>
              </div>
            </div>
            <a 
              :href="`tel:${order.deliverer?.phone || '+228'}`"
              class="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4.5 rounded-xl transition-all flex items-center justify-center gap-3 border border-white/5 text-xs uppercase tracking-widest"
            >
              <Icon name="heroicons:phone" class="w-4 h-4" />
              Appeler
            </a>
          </div>
        </div>

        <!-- Map / Visual Tracking -->
        <div class="lg:col-span-12 xl:col-span-8 space-y-10">
           <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 aspect-video relative group">
              <!-- Google Map Container -->
              <div ref="mapContainer" class="absolute inset-0" />

              <!-- Fallback if no Google Maps -->
              <div v-if="!mapReady" class="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center">
                 <Icon name="heroicons:map" class="w-20 h-20 text-gray-200 mb-6 opacity-30 group-hover:scale-110 transition-transform duration-700" />
                 <p class="text-gray-300 font-bold uppercase text-[10px] tracking-[0.4em]">Carte Interactive</p>
                 <div class="absolute bottom-8 px-8 w-full">
                    <div class="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 max-w-sm mx-auto flex items-center gap-6">
                       <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                          <Icon name="heroicons:home" class="w-6 h-6 text-white" />
                       </div>
                       <div>
                          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Destination</p>
                          <p class="text-xs font-black text-gray-900 tracking-tight">{{ order.address?.address_text || 'Lomé, Togo' }}</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              <!-- Real-time pulse -->
              <div v-if="order.status === 'delivering'" class="absolute top-8 right-8 bg-black/50 backdrop-blur-md text-white px-5 py-2.5 rounded-full flex items-center gap-3 z-10 border border-white/10">
                 <div class="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                 <span class="text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">Live Delivery</span>
              </div>
           </div>

           <!-- Order Items Recap -->
           <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 font-sans">
              <h3 class="font-display font-bold text-2xl text-gray-900 mb-10 tracking-tight">Contenu de la box</h3>
              <div class="divide-y divide-gray-50">
                <div v-for="item in order.items" :key="item.id" class="py-8 flex justify-between items-center group first:pt-0">
                  <div class="flex items-center gap-6">
                    <div class="w-12 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-black text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      {{ item.quantity }}x
                    </div>
                    <div>
                      <p class="text-sm font-bold text-gray-900 tracking-tight">{{ item.kit?.name || 'Kit Repas' }}</p>
                      <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">{{ item.portions }} portions</p>
                    </div>
                  </div>
                  <p class="text-sm font-sans font-black text-gray-900">{{ format(item.total_price) }}</p>
                </div>
              </div>
              <div class="pt-10 mt-6 border-t border-gray-50 flex justify-between items-center">
                 <span class="font-display font-bold text-sm text-gray-400 uppercase tracking-widest">Total payé</span>
                 <span class="font-sans text-3xl font-black text-gray-900">{{ format(order.total_amount) }}</span>
              </div>
           </div>
        </div>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 py-24 text-center">
      <h2 class="text-2xl font-bold">Commande introuvable.</h2>
      <NuxtLink to="/profil/commandes" class="text-primary hover:underline mt-4 block font-bold font-sans">Mes commandes</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { Order } from '~/types/order'

const route = useRoute()
const { api } = useApi()
const { format } = useFormatPrice()
const { createMap, addMarker } = useGoogleMaps()
const { subscribeToOrderUpdates } = usePusher()

const mapContainer = ref<HTMLElement>()
const mapReady = ref(false)
let delivererMarker: any = null

const { data: order, pending } = await useAsyncData(
  `order-tracking-${route.params.id}`,
  () => api<{ data: Order }>(`/orders/${route.params.id}`).then(r => r.data)
)

const trackingSteps = [
  { status: 'paid',       icon: 'heroicons:credit-card', label: 'Confirmée',   desc: 'Paiement reçu, commande validée.' },
  { status: 'preparing',  icon: 'heroicons:fire',        label: 'Préparation', desc: 'Vos ingrédients sont emballés.' },
  { status: 'ready',      icon: 'heroicons:archive-box', label: 'Prête',       desc: 'Box scellée et prête au départ.' },
  { status: 'delivering', icon: 'heroicons:truck',       label: 'En route',    desc: 'Le livreur se rapproche de vous.' },
  { status: 'delivered',  icon: 'heroicons:home',        label: 'Livrée',      desc: 'Bon appétit !' },
]

function isStepActive(status: string) {
  if (!order.value) return false
  const statusOrder = ['pending', 'paid', 'preparing', 'ready', 'delivering', 'delivered']
  const currentIdx = statusOrder.indexOf(order.value.status)
  const stepIdx    = statusOrder.indexOf(status)
  return stepIdx <= currentIdx
}

// Initialize real-time tracking
onMounted(() => {
  if (!order.value) return

  // Init Google Map
  if (mapContainer.value && typeof google !== 'undefined') {
    const map = createMap(mapContainer.value, {
      center: { lat: 6.1725, lng: 1.2314 },
      zoom: 14
    })
    if (map) {
      mapReady.value = true
      // Add delivery point marker
      addMarker(map, { lat: 6.1725, lng: 1.2314 }, { title: 'Destination' })
    }
  }

  // Subscribe to real-time updates
  const unsubscribe = subscribeToOrderUpdates(order.value.id, {
    onStatusChanged: (data) => {
      if (order.value) {
        order.value.status = data.status as any
        toast.success(`Statut mis à jour : ${data.status}`)
      }
    },
    onLocationUpdated: (data) => {
      if (mapReady.value && mapContainer.value) {
        // Update marker position on map
        toast.info('Position du livreur mise à jour 📍')
      }
    }
  })

  onUnmounted(() => {
    unsubscribe?.()
  })
})
</script>

