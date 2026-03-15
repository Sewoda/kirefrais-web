<!-- pages/admin/clients/[id].vue -->
<template>
  <div class="max-w-5xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <button @click="router.back()"
        class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center
               text-gray-500 hover:bg-gray-50 transition-colors">
        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
      </button>
      <h2 class="font-display font-semibold text-xl text-gray-900">Détails client</h2>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Infos Profil -->
      <div class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <div class="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center
                      mx-auto mb-4 text-primary font-bold text-2xl">
            {{ client?.name.charAt(0) }}
          </div>
          <h3 class="font-display font-bold text-gray-900 text-lg">{{ client?.name }}</h3>
          <p class="text-sm text-gray-400 mb-6">{{ client?.email }}</p>
          
          <div class="grid grid-cols-2 gap-4 text-left">
            <div class="p-4 bg-gray-50 rounded-xl">
              <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Commandes</p>
              <p class="text-lg font-bold text-gray-900">{{ orders.length }}</p>
            </div>
            <div class="p-4 bg-gray-50 rounded-xl">
              <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Total dépensé</p>
              <p class="text-lg font-bold text-primary">{{ format(totalSpent) }}</p>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-50 space-y-3 text-left">
            <div class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:phone" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-700">{{ client?.phone }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:calendar" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-700">Inscrit le {{ formatDate(client?.created_at) }}</span>
            </div>
          </div>

          <button @click="toggleStatus"
            :class="client?.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
            class="w-full mt-6 py-2.5 rounded-xl border border-current font-bold text-sm transition-colors">
            {{ client?.is_active ? 'Suspendre le compte' : 'Activer le compte' }}
          </button>
        </div>
      </div>

      <!-- Historique commandes -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="font-display font-semibold text-gray-900">Dernières commandes</h3>
          </div>
          <div v-if="orders.length === 0" class="p-12 text-center text-gray-400">
            Aucune commande passée.
          </div>
          <table v-else class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100">
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Réf.</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Total</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="order in orders" :key="order.id"
                class="hover:bg-gray-50 cursor-pointer"
                @click="navigateTo(`/admin/commandes/${order.id}`)">
                <td class="px-6 py-4 font-mono text-xs text-gray-600">{{ order.reference }}</td>
                <td class="px-6 py-4 text-gray-600 text-xs">{{ formatDate(order.created_at) }}</td>
                <td class="px-6 py-4 font-bold text-gray-900">{{ format(order.total_amount) }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(order.status)" class="text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                    {{ order.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import dayjs from 'dayjs'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }    = useApi()
const route      = useRoute()
const router     = useRouter()
const { format } = useFormatPrice()

const { data: response, pending, refresh } = await useAsyncData(`admin-client-${route.params.id}`, () =>
  api<any>(`/admin/clients/${route.params.id}`)
)

const client = computed(() => response.value?.client)
const orders = computed(() => response.value?.orders || [])
const totalSpent = computed(() => orders.value.reduce((acc: number, o: any) => acc + (o.payment_status === 'paid' ? Number(o.total_amount) : 0), 0))

async function toggleStatus() {
  await api(`/admin/clients/${route.params.id}/toggle`, { method: 'PUT' })
  toast.success(client.value.is_active ? 'Compte suspendu.' : 'Compte activé.')
  refresh()
}

function formatDate(date: string) {
  return dayjs(date).format('DD/MM/YYYY')
}

function getStatusClass(status: string) {
  const map: any = {
    pending:    'bg-gray-100 text-gray-600',
    paid:       'bg-blue-100 text-blue-600',
    preparing:  'bg-purple-100 text-purple-600',
    ready:      'bg-indigo-100 text-indigo-600',
    delivering: 'bg-orange-100 text-orange-600',
    delivered:  'bg-green-100 text-green-600',
    cancelled:  'bg-red-100 text-red-600',
  }
  return map[status] || 'bg-gray-100 text-gray-600'
}
</script>
