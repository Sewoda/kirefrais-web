<!-- pages/admin/commandes/index.vue -->
<template>
  <div class="space-y-5">
    <h2 class="font-display font-semibold text-xl text-gray-900">Commandes</h2>

    <!-- Filtres -->
    <div class="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3">
      <input v-model="search" type="text" placeholder="Référence..."
        class="w-48 px-4 py-2 rounded-lg border border-gray-200 text-sm
               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
      <select v-model="statusFilter"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-primary/30">
        <option value="">Tous les statuts</option>
        <option value="pending">En attente</option>
        <option value="paid">Payé</option>
        <option value="preparing">En préparation</option>
        <option value="ready">Prêt</option>
        <option value="delivering">En livraison</option>
        <option value="delivered">Livré</option>
        <option value="cancelled">Annulé</option>
      </select>
      <select v-model="paymentFilter"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-primary/30">
        <option value="">Tous paiements</option>
        <option value="flooz">Flooz</option>
        <option value="tmoney">TMoney</option>
        <option value="card">Carte</option>
        <option value="cash">Cash</option>
      </select>
      <input v-model="dateFrom" type="date"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm
               focus:outline-none focus:ring-2 focus:ring-primary/30" />
      <input v-model="dateTo" type="date"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm
               focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Réf.</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Client</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Montant</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Paiement</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Livraison</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th class="px-5 py-3" />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="order in orders?.data" :key="order.id"
              class="hover:bg-gray-50 transition-colors">
            <td class="px-5 py-4 font-mono text-xs text-gray-600">{{ order.reference }}</td>
            <td class="px-5 py-4">
              <p class="font-medium text-gray-900">{{ order.user?.name }}</p>
              <p class="text-xs text-gray-400">{{ order.user?.phone }}</p>
            </td>
            <td class="px-5 py-4 font-mono font-semibold text-xs text-gray-900">
              {{ format(order.total_amount) }}
            </td>
            <td class="px-5 py-4">
              <span class="capitalize text-gray-600 text-xs font-medium bg-gray-100
                           px-2 py-1 rounded-full">
                {{ order.payment_method }}
              </span>
            </td>
            <td class="px-5 py-4">
              <p class="text-gray-700 text-xs">{{ order.delivery_date }}</p>
              <p class="text-gray-400 text-xs capitalize">{{ order.delivery_slot }}</p>
            </td>
            <td class="px-5 py-4">
              <OrderStatusBadge :status="order.status" />
            </td>
            <td class="px-5 py-4">
              <NuxtLink :to="`/admin/commandes/${order.id}`"
                class="text-gray-400 hover:text-primary transition-colors p-1">
                <Icon name="heroicons:eye" class="w-4 h-4" />
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="orders?.last_page > 1"
           class="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <p class="text-sm text-gray-500">{{ orders?.total }} commandes</p>
        <div class="flex gap-1">
          <button v-for="page in orders?.last_page" :key="page"
            :class="page === currentPage ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
            class="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
            @click="currentPage = page">
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderStatusBadge from '~/components/order/OrderStatusBadge.vue'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }    = useApi()
const { format } = useFormatPrice()

const search        = ref('')
const statusFilter  = ref('')
const paymentFilter = ref('')
const dateFrom      = ref('')
const dateTo        = ref('')
const currentPage   = ref(1)

const params = computed(() => ({
  search:         search.value || undefined,
  status:         statusFilter.value || undefined,
  payment_method: paymentFilter.value || undefined,
  date_from:      dateFrom.value || undefined,
  date_to:        dateTo.value || undefined,
  page:           currentPage.value,
}))

const { data: orders } = await useAsyncData(
  'admin-orders',
  () => api<any>('/admin/orders', { params: params.value }),
  { watch: [params] }
)
</script>
