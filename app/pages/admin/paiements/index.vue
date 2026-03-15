<!-- pages/admin/paiements/index.vue -->
<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-semibold text-xl text-gray-900">Paiements</h2>
      <button
        class="border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium
               px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2">
        <Icon name="heroicons:arrow-down-tray" class="w-4 h-4" />
        Exporter CSV
      </button>
    </div>

    <!-- Totaux par méthode -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="method in totaux" :key="method.payment_method"
           class="bg-white rounded-xl border border-gray-100 p-4">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2 capitalize">
          {{ method.payment_method }}
        </p>
        <p class="font-display font-bold text-xl text-gray-900">
          {{ format(method.total) }}
        </p>
        <p class="text-xs text-gray-400 mt-1">{{ method.count }} transactions</p>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3">
      <select v-model="paymentMethod"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-primary/30">
        <option value="">Tous les modes</option>
        <option value="flooz">Flooz</option>
        <option value="tmoney">TMoney</option>
        <option value="card">Carte</option>
        <option value="cash">Cash</option>
      </select>
      <select v-model="paymentStatus"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-primary/30">
        <option value="">Tous statuts</option>
        <option value="paid">Payé</option>
        <option value="failed">Échoué</option>
        <option value="refunded">Remboursé</option>
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
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Réf. commande</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Client</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Montant</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Mode</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="p in paiements?.data" :key="p.id" class="hover:bg-gray-50">
            <td class="px-5 py-4 font-mono text-xs text-gray-600">{{ p.reference }}</td>
            <td class="px-5 py-4 text-gray-700">{{ p.user?.name }}</td>
            <td class="px-5 py-4 font-mono font-semibold text-xs text-gray-900">
              {{ format(p.total_amount) }}
            </td>
            <td class="px-5 py-4">
              <span class="capitalize text-xs font-medium bg-gray-100
                           text-gray-600 px-2 py-1 rounded-full">
                {{ p.payment_method }}
              </span>
            </td>
            <td class="px-5 py-4">
              <span :class="{
                'bg-green-100 text-green-700': p.payment_status === 'paid',
                'bg-red-100 text-red-600':     p.payment_status === 'failed',
                'bg-blue-100 text-blue-600':   p.payment_status === 'refunded',
              }" class="text-xs font-semibold px-2.5 py-1 rounded-full">
                {{ p.payment_status }}
              </span>
            </td>
            <td class="px-5 py-4 text-gray-500 text-xs">
              {{ dayjs(p.created_at).format('DD/MM/YY HH:mm') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }    = useApi()
const { format } = useFormatPrice()

const paymentMethod = ref('')
const paymentStatus = ref('')
const dateFrom      = ref('')
const dateTo        = ref('')

const params = computed(() => ({
  payment_method: paymentMethod.value || undefined,
  payment_status: paymentStatus.value || undefined,
  date_from:      dateFrom.value || undefined,
  date_to:        dateTo.value || undefined,
}))

const { data } = await useAsyncData(
  'admin-paiements',
  () => api<any>('/admin/paiements', { params: params.value }),
  { watch: [params] }
)

const paiements = computed(() => data.value?.paiements)
const totaux    = computed(() => data.value?.totaux ?? [])
</script>
