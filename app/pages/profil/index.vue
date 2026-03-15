<template>
  <ProfileLayout>
    <div class="space-y-8">-3 space-y-8">
          <!-- Recent Orders -->
          <div class="space-y-6">
            <div class="flex items-end justify-between border-b border-gray-100 pb-4">
              <div>
                 <h2 class="font-display font-bold text-2xl text-gray-900">Historique récent</h2>
                 <p class="text-gray-500 text-sm mt-1">Vos dernières commandes passées</p>
              </div>
              <NuxtLink to="/profil/commandes" class="text-primary font-bold text-sm hover:text-primary-dark transition-colors flex items-center gap-1 group">
                 <span>Tout voir</span>
                 <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>

            <div v-if="ordersPending" class="grid sm:grid-cols-2 gap-4">
               <div v-for="i in 2" :key="i" class="h-24 bg-white rounded-card animate-pulse shadow-sm" />
            </div>
            <div v-else-if="orders && orders.length > 0" class="grid sm:grid-cols-2 gap-5">
              <div v-for="order in orders" :key="order.id" class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 transition-all duration-300 relative">
                <div class="flex items-start justify-between mb-6">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-primary-light/50 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <Icon name="heroicons:shopping-bag" class="w-6 h-6" />
                    </div>
                    <div>
                      <p class="text-sm font-bold text-gray-900">Cmde {{ order.reference }}</p>
                      <p class="text-xs text-gray-500 font-medium mt-0.5">{{ order.created_at }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-end justify-between pt-5 border-t border-gray-100">
                   <div>
                      <p class="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">Montant total</p>
                      <p class="text-lg font-bold text-gray-900">{{ format(order.total_amount) }}</p>
                   </div>
                   <NuxtLink :to="`/suivi/${order.id}`" class="text-primary font-semibold text-sm bg-primary-light/50 hover:bg-primary hover:text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2">
                      Détails
                   </NuxtLink>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-12 bg-white rounded-card border shadow-sm">
               <Icon name="heroicons:inbox" class="w-10 h-10 mx-auto mb-4 text-gray-300" />
               <p class="text-sm font-medium text-gray-500">Aucune commande récente</p>
            </div>
          </div>

          <!-- Settings Grid -->
          <div class="grid md:grid-cols-2 gap-5 pt-4">
             <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-lg hover:border-secondary/20 transition-all duration-300 cursor-pointer">
                <div class="w-12 h-12 rounded-2xl bg-secondary-light/50 text-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                   <Icon name="heroicons:shield-check" class="w-6 h-6" />
                </div>
                <h3 class="font-display font-bold text-lg text-gray-900 mb-2">Sécurité & Profil</h3>
                <p class="text-gray-500 text-sm mb-5 leading-relaxed">Mettez à jour vos informations personnelles et votre mot de passe.</p>
                <div class="flex items-center text-secondary font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Modifier <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
                </div>
             </div>
             
             <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer">
                <div class="w-12 h-12 rounded-2xl bg-primary-light/50 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                   <Icon name="heroicons:map-pin" class="w-6 h-6" />
                </div>
                <h3 class="font-display font-bold text-lg text-gray-900 mb-2">Carnet d'adresses</h3>
                <p class="text-gray-500 text-sm mb-5 leading-relaxed">Gérez vos lieux de livraison préférés pour recevoir vos commandes.</p>
                <div class="flex items-center text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Gérer les adresses <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
                </div>
             </div>
          </div>
    </div>
  </ProfileLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'Mon Profil — Kirefrais' })

const { format } = useFormatPrice()
const { api } = useApi()

const { data: orders, pending: ordersPending } = await useAsyncData(
  'recent-user-orders',
  () => api<any[]>('/orders').then(r => r.slice(0, 5)).catch(() => []) 
)
</script>
