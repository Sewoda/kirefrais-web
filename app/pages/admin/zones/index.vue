<!-- pages/admin/zones/index.vue -->
<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-semibold text-xl text-gray-900">Zones de livraison</h2>
      <button
        class="bg-primary hover:bg-primary-dark text-white text-sm font-semibold
               px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        @click="openModal()">
        <Icon name="heroicons:plus" class="w-4 h-4" />
        Nouvelle zone
      </button>
    </div>

    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Zone</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Ville</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Frais livraison</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Délai estimé</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th class="px-5 py-3" />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="zone in zones" :key="zone.id" class="hover:bg-gray-50">
            <td class="px-5 py-4 font-medium text-gray-900">{{ zone.name }}</td>
            <td class="px-5 py-4 text-gray-600">{{ zone.city }}</td>
            <td class="px-5 py-4 font-mono font-semibold text-secondary text-xs">
              {{ format(zone.delivery_fee) }}
            </td>
            <td class="px-5 py-4 text-gray-600">{{ zone.estimated_minutes }} min</td>
            <td class="px-5 py-4">
              <span :class="zone.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                    class="text-xs font-semibold px-2.5 py-1 rounded-full">
                {{ zone.is_active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-2">
                <button @click="openModal(zone)"
                  class="text-gray-400 hover:text-primary transition-colors p-1">
                  <Icon name="heroicons:pencil-square" class="w-4 h-4" />
                </button>
                <button @click="deleteZone(zone.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal zone -->
    <div v-if="showModal"
         class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-md p-6">
        <h3 class="font-display font-semibold text-gray-900 text-lg mb-5">
          {{ editingZone ? 'Modifier la zone' : 'Nouvelle zone' }}
        </h3>
        <form @submit.prevent="saveZone" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nom de la zone</label>
            <input v-model="form.name" type="text" placeholder="ex: Lomé Centre"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Ville</label>
            <input v-model="form.city" type="text" placeholder="ex: Lomé"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Frais (FCFA)</label>
              <input v-model.number="form.delivery_fee" type="number" min="0"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Délai (min)</label>
              <input v-model.number="form.estimated_minutes" type="number" min="1"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button"
              class="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm
                     font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              @click="showModal = false">
              Annuler
            </button>
            <button type="submit" :disabled="saving"
              class="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-300
                     text-white font-semibold py-3 rounded-xl transition-colors text-sm">
              {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }    = useApi()
const { format } = useFormatPrice()

const showModal   = ref(false)
const saving      = ref(false)
const editingZone = ref<any>(null)
const form        = reactive({ name: '', city: 'Lomé', delivery_fee: 1500, estimated_minutes: 45 })

const { data: zones, refresh } = await useAsyncData('admin-zones', () => api<any[]>('/admin/zones'))

function openModal(zone?: any) {
  editingZone.value = zone ?? null
  if (zone) {
    Object.assign(form, { name: zone.name, city: zone.city, delivery_fee: zone.delivery_fee, estimated_minutes: zone.estimated_minutes })
  } else {
    Object.assign(form, { name: '', city: 'Lomé', delivery_fee: 1500, estimated_minutes: 45 })
  }
  showModal.value = true
}

async function saveZone() {
  saving.value = true
  try {
    if (editingZone.value) {
      await api(`/admin/zones/${editingZone.value.id}`, { method: 'PUT', body: form })
    } else {
      await api('/admin/zones', { method: 'POST', body: form })
    }
    toast.success('Zone enregistrée.')
    showModal.value = false
    refresh()
  } finally {
    saving.value = false
  }
}

async function deleteZone(id: number) {
  await api(`/admin/zones/${id}`, { method: 'DELETE' })
  toast.success('Zone supprimée.')
  refresh()
}
</script>
