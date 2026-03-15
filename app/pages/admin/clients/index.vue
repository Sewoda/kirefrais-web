<!-- pages/admin/clients/index.vue -->
<template>
  <div class="space-y-5">
    <h2 class="font-display font-semibold text-xl text-gray-900">Clients</h2>

    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-100">
        <input v-model="search" type="text" placeholder="Nom, email ou téléphone..."
          class="w-80 px-4 py-2 rounded-lg border border-gray-200 text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
      </div>

      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Client</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Téléphone</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Commandes</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Total dépensé</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Inscrit le</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="client in clients?.data" :key="client.id"
              class="hover:bg-gray-50 transition-colors cursor-pointer"
              @click="navigateTo(`/admin/clients/${client.id}`)">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center
                            justify-center shrink-0">
                  <span class="text-gray-500 font-bold text-sm">
                    {{ client.name.charAt(0) }}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ client.name }}</p>
                  <p class="text-xs text-gray-400">{{ client.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 text-gray-600">{{ client.phone }}</td>
            <td class="px-5 py-4 text-gray-700 font-semibold">{{ client.orders_count }}</td>
            <td class="px-5 py-4 font-mono font-semibold text-secondary text-xs">
              {{ format(client.total_spent ?? 0) }}
            </td>
            <td class="px-5 py-4 text-gray-500 text-xs">
              {{ dayjs(client.created_at).format('DD/MM/YYYY') }}
            </td>
            <td class="px-5 py-4" @click.stop>
              <button @click="toggleClient(client)"
                :class="client.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                class="text-xs font-semibold px-2.5 py-1 rounded-full transition-colors">
                {{ client.is_active ? 'Actif' : 'Suspendu' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import dayjs     from 'dayjs'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }    = useApi()
const { format } = useFormatPrice()
const search     = ref('')

const { data: clients, refresh } = await useAsyncData(
  'admin-clients',
  () => api<any>('/admin/clients', { params: { search: search.value || undefined } }),
  { watch: [search] }
)

async function toggleClient(client: any) {
  await api(`/admin/clients/${client.id}/toggle`, { method: 'PUT' })
  client.is_active = !client.is_active
  toast.success(client.is_active ? 'Compte activé.' : 'Compte suspendu.')
}
</script>
