<template>
  <ProfileLayout>
    <div class="space-y-6">
      <div class="flex items-center gap-4 mb-6">
        <NuxtLink to="/profil" class="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95">
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <div>
          <h1 class="font-display font-bold text-2xl text-gray-900 tracking-tight">Mes commandes</h1>
          <p class="text-gray-500 font-medium text-sm mt-0.5">Historique de vos box</p>
        </div>
      </div>
          <div v-if="pending" class="space-y-4">
            <div v-for="i in 5" :key="i" class="h-28 bg-white rounded-card shadow-sm animate-pulse" />
          </div>

          <div v-else-if="orders && orders.length > 0" class="space-y-4">
            <div 
              v-for="order in orders" 
              :key="order.id" 
              class="bg-white p-6 rounded-card border border-gray-100 shadow-card hover:shadow-hover transition-all relative overflow-hidden group"
            >
              <!-- Status Ribbon -->
              <div 
                class="absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-semibold text-white"
                :class="statusColors[order.status] || 'bg-gray-400'"
              >
                {{ statusLabels[order.status] || order.status }}
              </div>

              <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="flex items-start gap-4 mt-2 md:mt-0">
                  <div class="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0 shadow-inner">
                    <Icon name="heroicons:shopping-bag" class="w-6 h-6" />
                  </div>
                  <div>
                    <h3 class="font-display font-semibold text-lg text-gray-900 mb-1">Commande {{ order.reference }}</h3>
                    <p class="text-sm text-gray-500 mb-3">{{ formatDate(order.created_at) }}</p>
                    <div class="flex items-center gap-2">
                       <span class="px-2 py-1 bg-gray-50 rounded text-xs font-medium text-gray-600 border border-gray-100">
                          {{ order.items_count || order.items?.length || 0 }} Articles
                       </span>
                       <span class="px-2 py-1 bg-gray-50 rounded text-xs font-medium text-gray-600 border border-gray-100">
                          {{ format(order.total_amount) }}
                       </span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center mt-2 md:mt-0">
                  <NuxtLink 
                    :to="`/suivi/${order.id}`"
                    class="w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-btn transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
                  >
                    Suivre
                    <Icon name="heroicons:truck" class="w-4 h-4 ml-1" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-16 bg-white rounded-card border border-gray-100 shadow-sm">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <Icon name="heroicons:inbox" class="w-8 h-8 text-gray-300" />
            </div>
            <h3 class="font-display font-semibold text-xl text-gray-900 mb-2">Aucune commande</h3>
            <p class="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Vous n'avez pas encore passé de commande chez Kirefrais.</p>
            <NuxtLink to="/catalogue" class="inline-flex bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-8 rounded-btn transition-colors shadow-sm text-sm">
              Découvrir le catalogue
            </NuxtLink>
          </div>
    </div>
  </ProfileLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'Mes Commandes — Kirefrais' })

const { api } = useApi()
const { format } = useFormatPrice()

const { data: orders, pending } = await useAsyncData(
  'user-all-orders',
  () => api<any[]>('/orders')
)

const statusLabels: Record<string, string> = {
  pending:    'En attente',
  paid:       'Payée',
  preparing:  'En préparation',
  ready:      'Prête',
  delivering: 'En livraison',
  delivered:  'Livrée',
  cancelled:  'Annulée',
}

const statusColors: Record<string, string> = {
  pending:    'bg-amber-400',
  paid:       'bg-blue-500',
  preparing:  'bg-indigo-500',
  ready:      'bg-purple-500',
  delivering: 'bg-primary',
  delivered:  'bg-green-500',
  cancelled:  'bg-red-500',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
