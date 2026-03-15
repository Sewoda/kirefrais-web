<!-- pages/admin/dashboard.vue -->
<template>
  <div class="space-y-6">

    <!-- KPIs -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <div v-for="kpi in kpis" :key="kpi.label"
           class="bg-white rounded-xl border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-gray-500">{{ kpi.label }}</span>
          <div :class="kpi.bg" class="w-9 h-9 rounded-lg flex items-center justify-center">
            <Icon :name="kpi.icon" :class="kpi.color" class="w-5 h-5" />
          </div>
        </div>
        <p class="font-display font-bold text-2xl text-gray-900">{{ kpi.value }}</p>
        <p v-if="kpi.sub" class="text-xs text-gray-400 mt-1">{{ kpi.sub }}</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">

      <!-- Graphique commandes -->
      <div class="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-display font-semibold text-gray-900">Commandes — 30 derniers jours</h3>
        </div>
        <ClientOnly>
          <apexchart type="area" height="240"
            :options="areaOptions" :series="areaSeries" />
        </ClientOnly>
      </div>

      <!-- Répartition paiements -->
      <div class="bg-white rounded-xl border border-gray-100 p-5">
        <h3 class="font-display font-semibold text-gray-900 mb-5">Modes de paiement</h3>
        <ClientOnly>
          <apexchart type="donut" height="200"
            :options="donutOptions" :series="donutSeries" />
        </ClientOnly>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">

      <!-- Commandes récentes -->
      <div class="lg:col-span-2 bg-white rounded-xl border border-gray-100">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 class="font-display font-semibold text-gray-900">Commandes récentes</h3>
          <NuxtLink to="/admin/commandes"
            class="text-primary text-sm font-medium hover:underline">
            Voir tout
          </NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-50">
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Réf.</th>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Client</th>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Montant</th>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Statut</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="order in recentOrders" :key="order.id"
                  class="hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="navigateTo(`/admin/commandes/${order.id}`)">
                <td class="px-5 py-3.5 font-mono text-xs text-gray-600">{{ order.reference }}</td>
                <td class="px-5 py-3.5 text-gray-700">{{ order.user?.name }}</td>
                <td class="px-5 py-3.5 font-mono font-semibold text-gray-900 text-xs">
                  {{ format(order.total_amount) }}
                </td>
                <td class="px-5 py-3.5">
                  <OrderStatusBadge :status="order.status" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top kits -->
      <div class="bg-white rounded-xl border border-gray-100 p-5">
        <h3 class="font-display font-semibold text-gray-900 mb-4">Top kits</h3>
        <div class="space-y-3">
          <div v-for="(kit, i) in topKits" :key="kit.id"
               class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-primary-light text-primary text-xs
                         font-bold flex items-center justify-center shrink-0">
              {{ i + 1 }}
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ kit.name }}</p>
              <p class="text-xs text-gray-400">{{ kit.order_count }} commandes</p>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="heroicons:star-solid" class="w-3.5 h-3.5 text-secondary" />
              <span class="text-xs font-semibold text-gray-700">
                {{ Number(kit.rating_avg ?? 0).toFixed(1) }}
              </span>
            </div>
          </div>
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

const { data: stats } = await useAsyncData('admin-stats', () => api<any>('/admin/stats'))

const recentOrders = computed(() => stats.value?.recent_orders ?? [])
const topKits      = computed(() => stats.value?.top_kits ?? [])

const kpis = computed(() => [
  {
    label: "CA aujourd'hui",
    value: format(stats.value?.today?.revenue ?? 0),
    icon:  'heroicons:banknotes', bg: 'bg-green-50', color: 'text-green-500',
    sub:   'Paiements confirmés',
  },
  {
    label: "Commandes aujourd'hui",
    value: stats.value?.today?.orders ?? 0,
    icon:  'heroicons:shopping-bag', bg: 'bg-blue-50', color: 'text-blue-500',
  },
  {
    label: 'Nouveaux clients',
    value: stats.value?.today?.new_clients ?? 0,
    icon:  'heroicons:user-plus', bg: 'bg-purple-50', color: 'text-purple-500',
  },
  {
    label: 'Livreurs actifs',
    value: stats.value?.today?.active_livreurs ?? 0,
    icon:  'heroicons:truck', bg: 'bg-orange-50', color: 'text-orange-500',
  },
])

const areaOptions = {
  chart:  { toolbar: { show: false }, zoom: { enabled: false } },
  colors: ['#1B8A4A'],
  fill:   { type: 'gradient', gradient: { opacityFrom: 0.25, opacityTo: 0 } },
  stroke: { curve: 'smooth', width: 2 },
  xaxis:  { categories: stats.value?.orders_chart?.map((d: any) => d.date) ?? [], labels: { style: { fontSize: '11px' } } },
  yaxis:  { labels: { style: { fontSize: '11px' } } },
  grid:   { borderColor: '#f3f4f6' },
  tooltip:{ y: { formatter: (v: number) => `${v} commandes` } },
}
const areaSeries = computed(() => [{
  name: 'Commandes',
  data: stats.value?.orders_chart?.map((d: any) => d.count) ?? [],
}])

const donutOptions = {
  labels:  ['Flooz', 'TMoney', 'Carte', 'Cash'],
  colors:  ['#1B8A4A', '#F4A400', '#3B82F6', '#6B7280'],
  legend:  { position: 'bottom', fontSize: '12px' },
  plotOptions: { pie: { donut: { size: '60%' } } },
  dataLabels: { enabled: false },
}
const donutSeries = computed(() => {
  const methods = stats.value?.payment_methods ?? []
  const map: Record<string, number> = {}
  methods.forEach((m: any) => { map[m.payment_method] = m.count })
  return ['flooz', 'tmoney', 'card', 'cash'].map(k => map[k] ?? 0)
})
</script>
