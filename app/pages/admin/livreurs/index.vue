<!-- pages/admin/livreurs/index.vue -->
<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-semibold text-xl text-gray-900">Livreurs</h2>
      <button
        class="bg-primary hover:bg-primary-dark text-white text-sm font-semibold
               px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        @click="showCreateModal = true">
        <Icon name="heroicons:plus" class="w-4 h-4" />
        Nouveau livreur
      </button>
    </div>

    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-100">
        <input v-model="search" type="text" placeholder="Rechercher un livreur..."
          class="w-72 px-4 py-2 rounded-lg border border-gray-200 text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
      </div>

      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Livreur</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Téléphone</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Total livraisons</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Complétées</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th class="px-5 py-3" />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="livreur in livreurs?.data" :key="livreur.id"
              class="hover:bg-gray-50 transition-colors">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-primary-light flex items-center
                            justify-center shrink-0">
                  <span class="text-primary font-bold text-sm">
                    {{ livreur.name.charAt(0) }}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ livreur.name }}</p>
                  <p class="text-xs text-gray-400">{{ livreur.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 text-gray-600">{{ livreur.phone }}</td>
            <td class="px-5 py-4 text-gray-700 font-semibold">
              {{ livreur.total_deliveries }}
            </td>
            <td class="px-5 py-4">
              <span class="text-green-600 font-semibold">
                {{ livreur.completed_deliveries }}
              </span>
            </td>
            <td class="px-5 py-4">
              <button @click="toggleLivreur(livreur)"
                :class="livreur.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                class="text-xs font-semibold px-2.5 py-1 rounded-full transition-colors">
                {{ livreur.is_active ? 'Actif' : 'Inactif' }}
              </button>
            </td>
            <td class="px-5 py-4">
              <button @click="editLivreur(livreur)"
                class="text-gray-400 hover:text-primary transition-colors p-1">
                <Icon name="heroicons:pencil-square" class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal création livreur -->
    <AdminLivreurModal
      v-if="showCreateModal"
      :livreur="selectedLivreur"
      @saved="refresh"
      @close="showCreateModal = false; selectedLivreur = null"
    />
  </div>
</template>

<script setup lang="ts">
import { toast }           from 'vue-sonner'
import AdminLivreurModal   from '~/components/admin/AdminLivreurModal.vue'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api } = useApi()
const search           = ref('')
const showCreateModal  = ref(false)
const selectedLivreur  = ref<any>(null)

const { data: livreurs, refresh } = await useAsyncData(
  'admin-livreurs',
  () => api<any>('/admin/livreurs', { params: { search: search.value || undefined } }),
  { watch: [search] }
)

async function toggleLivreur(livreur: any) {
  await api(`/admin/livreurs/${livreur.id}/toggle`, { method: 'PUT' })
  livreur.is_active = !livreur.is_active
  toast.success(livreur.is_active ? 'Livreur activé.' : 'Livreur désactivé.')
}

function editLivreur(livreur: any) {
  selectedLivreur.value = livreur
  showCreateModal.value = true
}
</script>
