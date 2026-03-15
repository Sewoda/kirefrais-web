<template>
  <div class="px-6 py-8 font-sans">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <h1 class="font-display font-bold text-4xl text-gray-900 mb-2">
          Salut, {{ user?.name }} ! 👋
        </h1>
        <p class="text-gray-500 font-medium">Voici vos livraisons pour aujourd'hui.</p>
      </div>
      <div class="flex items-center gap-4 bg-white px-6 py-4 rounded-[32px] border border-gray-100 shadow-sm">
        <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
          <div class="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>
        <div class="pr-4 border-r border-gray-100">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut</p>
          <p class="text-sm font-bold text-gray-900">En ligne</p>
        </div>
        <div class="pl-2">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Position</p>
          <p class="text-sm font-bold text-primary">Activée</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div v-for="kpi in kpis" :key="kpi.label" 
           class="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
        <div :class="kpi.bg" class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
          <Icon :name="kpi.icon" :class="kpi.color" class="w-7 h-7" />
        </div>
        <p class="text-3xl font-display font-bold text-gray-900 mb-1">{{ kpi.value }}</p>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ kpi.label }}</p>
      </div>
    </div>

    <!-- View Toggle -->
    <div class="flex items-center justify-between mb-8 px-2">
      <h3 class="font-display font-bold text-2xl text-gray-900">Livraisons à effectuer</h3>
      <div class="flex items-center bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
        <button 
          @click="viewMode = 'list'"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          :class="viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'"
        >
          <Icon name="heroicons:list-bullet" class="w-4 h-4" />
          LISTE
        </button>
        <button 
          @click="viewMode = 'map'"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          :class="viewMode === 'map' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'"
        >
          <Icon name="heroicons:map" class="w-4 h-4" />
          CARTE
        </button>
      </div>
    </div>

    <!-- Map View -->
    <Transition name="fade">
      <div v-if="viewMode === 'map'" class="mb-12">
        <div class="relative h-[600px] w-full rounded-[40px] overflow-hidden border-4 border-white shadow-2xl group">
          <div ref="mapContainer" class="absolute inset-0 bg-gray-50"></div>
          
          <!-- Map Overlay Controls -->
          <div class="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button @click="recenterMap" class="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-600 hover:text-primary transition-colors">
              <Icon name="heroicons:home-modern" class="w-6 h-6" />
            </button>
          </div>

          <!-- Selected Delivery Info (Popup design) -->
          <Transition name="slide-up">
            <div v-if="selectedOrder" class="absolute bottom-6 left-6 right-6 lg:left-12 lg:right-auto lg:w-[400px] z-20">
              <div class="bg-white/90 backdrop-blur-xl p-6 rounded-[32px] border border-white/50 shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 bg-primary h-full"></div>
                <button @click="selectedOrder = null" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <Icon name="heroicons:x-mark" class="w-5 h-5" />
                </button>
                
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="heroicons:user" class="w-6 h-6" />
                  </div>
                  <div>
                    <h4 class="font-display font-bold text-gray-900">{{ selectedOrder.user?.name }}</h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ selectedOrder.address?.label || 'Destination' }}</p>
                  </div>
                </div>

                <div class="bg-gray-50/50 rounded-2xl p-4 mb-6">
                  <p class="text-sm text-gray-600 leading-relaxed">{{ selectedOrder.address?.address_text }}</p>
                </div>

                <div class="flex gap-3">
                  <a :href="`tel:${selectedOrder.user?.phone}`" class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <Icon name="heroicons:phone" class="w-5 h-5" />
                  </a>
                  <button 
                    @click="startDelivery(selectedOrder)"
                    class="flex-1 bg-primary text-white font-bold rounded-2xl py-3 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Icon name="heroicons:navigation-arrow" class="w-5 h-5 rotate-45" />
                    Y ALLER
                  </button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Instructions Overlay -->
          <div v-if="!mapReady" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-30">
            <div class="flex flex-col items-center gap-4">
              <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p class="font-display font-bold text-gray-400 uppercase tracking-widest text-xs">Préparation de votre itinéraire...</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Delivery List View -->
    <div v-if="viewMode === 'list'" class="space-y-6">
      <div v-if="deliveries && deliveries.length > 0" class="space-y-4">
        <DeliveryItem 
          v-for="d in deliveries.filter(o => o.status !== 'delivered')" 
          :key="d.id" 
          :order="d" 
          @status-updated="refresh"
        />
      </div>
      <div v-else class="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-gray-100">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="heroicons:check-badge" class="w-10 h-10 text-primary opacity-20" />
        </div>
        <p class="text-gray-500 font-bold uppercase text-xs tracking-widest mb-2">Tout est fini !</p>
        <p class="text-sm text-gray-400">Aucune nouvelle livraison assignée pour le moment.</p>
      </div>

      <!-- History Shortcut -->
      <div class="pt-12">
        <h3 class="font-display font-bold text-2xl text-gray-900 mb-8 px-2">Dernières livraisons terminées</h3>
        <div v-if="deliveries && deliveries.filter(o => o.status === 'delivered').length > 0" class="space-y-4">
           <DeliveryItem 
            v-for="d in deliveries.filter(o => o.status === 'delivered')" 
            :key="d.id" 
            :order="d" 
            @status-updated="refresh"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DeliveryItem from '~/components/livreur/DeliveryItem.vue'

definePageMeta({ middleware: ['auth', 'role-livreur'], layout: 'livreur' })
useSeoMeta({ title: 'Dashboard Livreur — Kirefrais Togo' })

const { api } = useApi()
const { user } = useCurrentUser()
const { format } = useFormatPrice()

const { data: deliveries, pending, refresh } = await useAsyncData(
  'livreur-deliveries',
  () => api<any[]>('/livreur/deliveries')
)

// View & Map State
const viewMode = ref<'list' | 'map'>('list')
const mapReady = ref(false)
const selectedOrder = ref<any>(null)
const mapContainer = ref<HTMLElement | null>(null)
let map: google.maps.Map | null = null
let markers: google.maps.Marker[] = []
let myMarker: google.maps.Marker | null = null

// KPI logic
const kpis = computed(() => [
  { 
    label: 'Assignées', 
    value: deliveries.value?.length || 0, 
    icon: 'heroicons:clipboard-document-list', 
    bg: 'bg-blue-50', 
    color: 'text-blue-500' 
  },
  { 
    label: 'En cours', 
    value: deliveries.value?.filter(d => d.status === 'delivering').length || 0, 
    icon: 'heroicons:truck', 
    bg: 'bg-purple-50', 
    color: 'text-purple-500' 
  },
  { 
    label: 'Livrées', 
    value: deliveries.value?.filter(d => d.status === 'delivered').length || 0, 
    icon: 'heroicons:check-circle', 
    bg: 'bg-green-50', 
    color: 'text-green-500' 
  },
  { 
    label: 'Zone', 
    value: 'Lomé', 
    icon: 'heroicons:banknotes', 
    bg: 'bg-secondary/10', 
    color: 'text-secondary' 
  },
])

// Watch for mode change to init map
watch(viewMode, (newMode) => {
  if (newMode === 'map') {
    setTimeout(initMap, 100)
  }
})

function initMap() {
  if (!mapContainer.value || typeof google === 'undefined') return

  const center = { lat: 6.1256, lng: 1.2254 } // Lomé

  map = new google.maps.Map(mapContainer.value, {
    center,
    zoom: 13,
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#1F2937" }] },
      { "featureType": "water", "stylers": [{ "color": "#e9e9e9" }] }
    ]
  })

  // Create markers for each delivery
  addMarkers()
  
  // Track my position
  trackMyPosition()
}

function addMarkers() {
  if (!map || !deliveries.value) return
  
  // Clear existing
  markers.forEach(m => m.setMap(null))
  markers = []

  deliveries.value.forEach(order => {
    if (!order.address?.latitude || !order.address?.longitude) return
    if (order.status === 'delivered') return

    const marker = new google.maps.Marker({
      position: { lat: parseFloat(order.address.latitude), lng: parseFloat(order.address.longitude) },
      map: map,
      icon: {
        url: order.status === 'delivering' ? 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40)
      }
    })

    marker.addListener('click', () => {
      selectedOrder.value = order
      map?.panTo(marker.getPosition()!)
    })

    markers.push(marker)
  })

  mapReady.value = true
}

function trackMyPosition() {
  if (navigator.geolocation && map) {
    navigator.geolocation.watchPosition((pos) => {
      const myPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      
      if (!myMarker) {
        myMarker = new google.maps.Marker({
          position: myPos,
          map,
          title: 'Moi',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#1B8A4A',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          }
        })
      } else {
        myMarker.setPosition(myPos)
      }
    })
  }
}

function recenterMap() {
  if (map && markers.length > 0) {
    const bounds = new google.maps.LatLngBounds()
    markers.forEach(m => bounds.extend(m.getPosition()!))
    if (myMarker) bounds.extend(myMarker.getPosition()!)
    map.fitBounds(bounds)
  }
}

async function startDelivery(order: any) {
  try {
    await api(`/livreur/orders/${order.id}/status`, {
      method: 'PUT',
      body: { status: 'delivering' }
    })
    toast.success('Course démarrée !')
    refresh()
    selectedOrder.value = null
    viewMode.value = 'list'
  } catch (err) {
    toast.error('Erreur technique')
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); opacity: 0; }
</style>
