<template>
  <div class="bg-[#F8FAF9] min-h-screen font-sans pb-24">
    <div class="max-w-7xl mx-auto py-8 lg:py-12">
      
      <!-- Stepper -->
      <CheckoutStepBar :current-step="2" />

      <div class="max-w-4xl mx-auto px-4">
        <div class="flex flex-col sm:flex-row gap-4 items-center sm:items-end justify-between mb-8 text-center sm:text-left">
          <div>
            <h1 class="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight">Où livrer votre commande ?</h1>
            <p class="text-gray-400 mt-1 text-sm font-medium">Sélectionnez une adresse pour la livraison.</p>
          </div>
          <NuxtLink to="/panier" class="text-primary text-xs font-bold hover:underline flex items-center gap-2">
            <Icon name="heroicons:arrow-left" class="w-3 h-3" />
            Modifier mon panier
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-8 space-y-4">
              <div 
                v-for="address in addresses" 
                :key="address.id"
                @click="selectAddress(address)"
                class="tunnel-card p-6 cursor-pointer relative group"
                :class="{ 'tunnel-card-active': cartStore.addressId === address.id }"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 transition-colors group-hover:bg-primary/5 group-hover:text-primary"
                       :class="{ 'bg-primary text-white': cartStore.addressId === address.id }">
                    <Icon :name="address.label?.toLowerCase() === 'bureau' ? 'heroicons:building-office' : 'heroicons:home'" class="w-6 h-6" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h3 class="font-display font-bold text-lg text-gray-900">{{ address.label }}</h3>
                      <Transition name="scale-bounce">
                        <div v-if="cartStore.addressId === address.id" class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                          <Icon name="heroicons:check" class="w-4 h-4" />
                        </div>
                      </Transition>
                    </div>
                    <p class="text-gray-500 text-sm mt-1">{{ address.address_text }}</p>
                    <div class="flex items-center gap-2 mt-2">
                       <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ address.city }}</span>
                       <span v-if="address.delivery_zone" class="w-1 h-1 bg-gray-200 rounded-full"></span>
                       <span v-if="address.delivery_zone" class="text-[10px] text-primary font-bold uppercase tracking-widest">{{ address.delivery_zone.name }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add Address Button -->
              <button 
                @click="showNewAddressForm = !showNewAddressForm"
                class="w-full py-6 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-all text-sm font-bold group"
              >
                <Icon :name="showNewAddressForm ? 'heroicons:minus' : 'heroicons:plus'" class="w-5 h-5 group-hover:rotate-90 transition-transform" />
                {{ showNewAddressForm ? 'Annuler' : 'Ajouter une nouvelle adresse' }}
              </button>

              <!-- New Address Form -->
              <Transition name="expand">
                <div v-if="showNewAddressForm" class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm overflow-hidden">
                   <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Nouvelle adresse de livraison</h3>
                   <form @submit.prevent="saveAddress" class="grid sm:grid-cols-2 gap-6">
                     <!-- Label -->
                     <div class="relative group">
                       <input v-model="form.label" required type="text" id="label" class="peer w-full bg-gray-50 border-b-2 border-primary/20 rounded-t-lg px-4 py-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary transition-all" placeholder=" " />
                       <label for="label" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gray-400">
                         TITRE (MAISON, BUREAU...)
                       </label>
                     </div>

                     <!-- Zone Selection -->
                     <div class="relative group">
                        <select v-model="form.delivery_zone_id" required id="zone" class="peer w-full bg-gray-50 border-b-2 border-primary/20 rounded-t-lg px-4 py-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary transition-all appearance-none">
                          <option value="" disabled selected>Choisir une zone</option>
                          <option v-for="zone in zones" :key="zone.id" :value="zone.id">
                            {{ zone.name }} ({{ zone.delivery_fee }} FCFA)
                          </option>
                        </select>
                        <label for="zone" class="absolute left-4 -top-2 text-[10px] text-primary font-bold pointer-events-none transition-all">
                          ZONE DE LIVRAISON
                        </label>
                        <Icon name="heroicons:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                     </div>

                     <!-- Address Text -->
                     <div class="sm:col-span-2 relative group">
                       <textarea v-model="form.address_text" required id="address" rows="3" class="peer w-full bg-gray-50 border-b-2 border-primary/20 rounded-t-lg px-4 py-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary transition-all resize-none" placeholder=" "></textarea>
                       <label for="address" class="absolute left-4 top-6 text-gray-400 text-sm font-bold pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-primary">
                         ADRESSE EXACTE
                       </label>
                     </div>

                     <!-- Location Selector (Map) -->
                     <div class="sm:col-span-2 space-y-4">
                       <div class="flex items-center justify-between">
                         <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ma position précise</h4>
                         <button type="button" @click="detectCurrentLocation" class="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
                           <Icon name="heroicons:map-pin" class="w-3 h-3" />
                           ME GÉOLOCALISER
                         </button>
                       </div>
                       
                       <div class="relative h-64 w-full rounded-2xl overflow-hidden border-2 border-primary/10 shadow-inner group">
                         <div ref="mapContainer" class="absolute inset-0 bg-gray-100"></div>
                         <div class="absolute inset-0 pointer-events-none border-2 border-transparent group-focus-within:border-primary transition-colors rounded-2xl"></div>
                         
                         <!-- Map Info Overlay -->
                         <div v-if="!mapReady" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                            <div class="flex flex-col items-center gap-2">
                               <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                               <span class="text-[10px] font-bold text-gray-400 tracking-widest">CHARGEMENT DE LA CARTE...</span>
                            </div>
                         </div>
                       </div>
                       
                       <div class="grid grid-cols-2 gap-4">
                         <div class="bg-gray-50 rounded-xl p-3 border border-primary/5">
                            <span class="block text-[8px] font-bold text-gray-400 uppercase tracking-tighter mb-1">LATITUDE</span>
                            <code class="text-xs font-mono text-gray-600">{{ form.latitude || '0.00000000' }}</code>
                         </div>
                         <div class="bg-gray-50 rounded-xl p-3 border border-primary/5">
                            <span class="block text-[8px] font-bold text-gray-400 uppercase tracking-tighter mb-1">LONGITUDE</span>
                            <code class="text-xs font-mono text-gray-600">{{ form.longitude || '0.00000000' }}</code>
                         </div>
                       </div>
                     </div>

                     <div class="sm:col-span-2">
                       <button type="submit" :disabled="saving" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 text-sm uppercase tracking-widest">
                         {{ saving ? 'Enregistrement...' : 'Enregistrer cette adresse' }}
                       </button>
                     </div>
                   </form>
                </div>
              </Transition>
            </div>

          <!-- Summary Sidebar -->
          <div class="lg:col-span-4 lg:sticky lg:top-8 space-y-4">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 class="font-display font-bold text-lg mb-6 text-gray-900 tracking-tight">Résumé</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span class="text-gray-400">Articles</span>
                  <span class="text-gray-900 font-sans">{{ format(cartStore.subtotal) }}</span>
                </div>
                <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span class="text-gray-400">Livraison</span>
                  <span v-if="!cartStore.addressId" class="text-primary italic lowercase font-medium tracking-normal">Choisir une adresse</span>
                  <span v-else class="text-gray-900 font-sans">{{ format(cartStore.deliveryFee) }}</span>
                </div>
                <div class="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span class="font-display font-bold text-lg text-gray-900">Total</span>
                  <span class="font-sans text-xl font-black text-primary">{{ format(cartStore.total) }}</span>
                </div>

                <button 
                  @click="goToNext"
                  :disabled="!cartStore.addressId"
                  class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-sm transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 disabled:bg-gray-200 disabled:shadow-none"
                >
                  Continuer
                  <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                </button>
              </div>
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
  middleware: ['auth'],
  pageTransition: { name: 'tunnel', mode: 'out-in' }
})

const cartStore = useCartStore()
const { api } = useApi()
const { format } = useFormatPrice()

const { data: addresses, pending, refresh } = await useAsyncData(
  'checkout-addresses',
  () => api<any[]>('/addresses')
)

const { data: zones } = await useAsyncData(
  'delivery-zones',
  () => api<any[]>('/zones')
)

const showNewAddressForm = ref(false)
const saving = ref(false)
const mapReady = ref(false)
const mapContainer = ref<HTMLElement | null>(null)
let map: google.maps.Map | null = null
let marker: google.maps.Marker | null = null

const form = reactive({
  label: '',
  address_text: '',
  delivery_zone_id: '',
  latitude: null as number | null,
  longitude: null as number | null,
  is_default: false
})

// Initialize Map
watch(showNewAddressForm, (val) => {
  if (val) {
    setTimeout(initMap, 100)
  }
})

function initMap() {
  if (!mapContainer.value || typeof google === 'undefined') return

  const defaultPos = { lat: 6.1256, lng: 1.2254 } // Lomé default
  
  map = new google.maps.Map(mapContainer.value, {
    center: defaultPos,
    zoom: 13,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [{ "weight": "2.00" }]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#9c9c9c" }]
      },
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [{ "visibility": "on" }]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{ "color": "#f2f2f2" }]
      }
    ],
    disableDefaultUI: true,
    zoomControl: true
  })

  marker = new google.maps.Marker({
    position: defaultPos,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
    }
  })

  google.maps.event.addListener(marker, 'dragend', () => {
    const pos = marker?.getPosition()
    if (pos) {
      form.latitude = pos.lat()
      form.longitude = pos.lng()
      reverseGeocode(pos.lat(), pos.lng())
    }
  })

  mapReady.value = true
}

function detectCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      form.latitude = pos.lat
      form.longitude = pos.lng
      
      if (map && marker) {
        map.setCenter(pos)
        map.setZoom(17)
        marker.setPosition(pos)
        reverseGeocode(pos.lat, pos.lng)
      }
    }, () => {
      toast.error('Géo-localisation refusée ou impossible.')
    })
  }
}

function reverseGeocode(lat: number, lng: number) {
  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === 'OK' && results?.[0]) {
      form.address_text = results[0].formatted_address
    }
  })
}

function selectAddress(address: any) {
  cartStore.addressId = address.id
  // The API might return deliveryZone (camelCase) or delivery_zone (snake_case)
  const zone = address.deliveryZone || address.delivery_zone
  if (zone) {
    cartStore.deliveryFee = zone.delivery_fee
    cartStore.zoneId = zone.id
  }
}

async function saveAddress() {
  if (!form.delivery_zone_id) {
    toast.error('Veuillez sélectionner une zone de livraison.')
    return
  }
  
  saving.value = true
  try {
    const newAddress = await api<any>('/addresses', { method: 'POST', body: form })
    toast.success('Adresse ajoutée !')
    
    // Refresh the list before selecting
    await refresh()
    
    // Try to find the new address in the refreshed list or use the returned one
    selectAddress(newAddress)
    showNewAddressForm.value = false
    
    // Reset form
    form.label = ''
    form.address_text = ''
    form.delivery_zone_id = ''
    form.latitude = null
    form.longitude = null
    form.is_default = false
  } catch (err: any) {
    console.error('Save Address Error:', err)
    const msg = err.data?.message || 'Erreur lors de l’ajout. Vérifiez les champs.'
    toast.error(msg)
  } finally {
    saving.value = false
  }
}

function goToNext() {
  if (cartStore.addressId) {
    navigateTo('/checkout/creneau')
  }
}
</script>

<style scoped>
.expand-enter-active, .expand-leave-active {
  transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 800px;
}
.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
}

.scale-bounce-enter-active {
  animation: scale-bounce 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes scale-bounce {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
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

/* Floating labels adjustments */
input:focus + label,
input:not(:placeholder-shown) + label,
textarea:focus + label,
textarea:not(:placeholder-shown) + label {
  transform: translateY(-22px) scale(0.85);
  left: 1rem;
}
</style>
