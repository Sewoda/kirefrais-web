<!-- pages/admin/avis/index.vue -->
<template>
  <div class="space-y-5">
    <h2 class="font-display font-semibold text-xl text-gray-900">Avis clients</h2>

    <!-- Filtres -->
    <div class="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3">
      <select v-model="approvedFilter"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-primary/30">
        <option value="">Tous les avis</option>
        <option value="0">En attente</option>
        <option value="1">Approuvés</option>
      </select>
      <select v-model="ratingFilter"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-primary/30">
        <option value="">Toutes les notes</option>
        <option v-for="i in 5" :key="i" :value="i">{{ i }} étoile{{ i > 1 ? 's' : '' }}</option>
      </select>
    </div>

    <!-- Liste des avis -->
    <div class="space-y-3">
      <div v-for="avis in reviews?.data" :key="avis.id"
           class="bg-white rounded-xl border border-gray-100 p-5">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <span class="text-gray-500 font-bold text-sm">
                  {{ avis.user?.name?.charAt(0) }}
                </span>
              </div>
              <div>
                <p class="font-medium text-gray-900 text-sm">{{ avis.user?.name }}</p>
                <p class="text-xs text-gray-400">{{ avis.kit?.name }}</p>
              </div>
              <div class="flex items-center gap-0.5 ml-2">
                <Icon
                  v-for="i in 5" :key="i"
                  name="heroicons:star-solid"
                  :class="i <= avis.rating ? 'text-secondary' : 'text-gray-200'"
                  class="w-3.5 h-3.5"
                />
              </div>
            </div>
            <p v-if="avis.comment" class="text-sm text-gray-700 leading-relaxed">
              {{ avis.comment }}
            </p>
            <p class="text-xs text-gray-400 mt-2">
              {{ dayjs(avis.created_at).format('DD/MM/YYYY à HH:mm') }}
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span
              :class="avis.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
              class="text-xs font-semibold px-2.5 py-1 rounded-full">
              {{ avis.is_approved ? 'Approuvé' : 'En attente' }}
            </span>
            <button v-if="!avis.is_approved"
              @click="approveReview(avis)"
              class="text-xs font-medium text-green-600 hover:bg-green-50
                     px-3 py-1.5 rounded-lg transition-colors border border-green-200">
              Approuver
            </button>
            <button v-else
              @click="rejectReview(avis)"
              class="text-xs font-medium text-gray-500 hover:bg-gray-50
                     px-3 py-1.5 rounded-lg transition-colors border border-gray-200">
              Rejeter
            </button>
            <button @click="deleteReview(avis.id)"
              class="text-gray-400 hover:text-red-500 transition-colors p-1.5">
              <Icon name="heroicons:trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <p v-if="!reviews?.data?.length" class="text-center text-gray-400 py-12">
        Aucun avis trouvé.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import dayjs     from 'dayjs'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }        = useApi()
const approvedFilter = ref('')
const ratingFilter   = ref('')

const params = computed(() => ({
  is_approved: approvedFilter.value !== '' ? approvedFilter.value : undefined,
  rating:      ratingFilter.value || undefined,
}))

const { data: reviews, refresh } = await useAsyncData(
  'admin-avis',
  () => api<any>('/admin/avis', { params: params.value }),
  { watch: [params] }
)

async function approveReview(avis: any) {
  await api(`/admin/avis/${avis.id}/approve`, { method: 'PUT' })
  avis.is_approved = true
  toast.success('Avis approuvé.')
}

async function rejectReview(avis: any) {
  await api(`/admin/avis/${avis.id}/reject`, { method: 'PUT' })
  avis.is_approved = false
  toast.success('Avis rejeté.')
}

async function deleteReview(id: number) {
  await api(`/admin/avis/${id}`, { method: 'DELETE' })
  toast.success('Avis supprimé.')
  refresh()
}
</script>
