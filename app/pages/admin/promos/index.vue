<!-- pages/admin/promos/index.vue -->
<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-semibold text-xl text-gray-900">Codes promo</h2>
      <button
        class="bg-primary hover:bg-primary-dark text-white text-sm font-semibold
               px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        @click="openModal()">
        <Icon name="heroicons:plus" class="w-4 h-4" />
        Nouveau code
      </button>
    </div>

    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Code</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Réduction</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Min. commande</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Utilisations</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Expiration</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th class="px-5 py-3" />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="promo in promos" :key="promo.id" class="hover:bg-gray-50">
            <td class="px-5 py-4">
              <span class="font-mono font-bold text-gray-900 bg-gray-100
                           px-2 py-1 rounded text-xs">
                {{ promo.code }}
              </span>
            </td>
            <td class="px-5 py-4 font-semibold text-gray-900">
              {{ promo.type === 'fixed' ? format(promo.value) : `${promo.value}%` }}
            </td>
            <td class="px-5 py-4 text-gray-600 text-xs">
              {{ promo.min_order > 0 ? format(promo.min_order) : '—' }}
            </td>
            <td class="px-5 py-4 text-gray-700">
              {{ promo.used_count }}
              <span v-if="promo.max_uses" class="text-gray-400">/ {{ promo.max_uses }}</span>
            </td>
            <td class="px-5 py-4 text-gray-500 text-xs">
              {{ promo.expires_at ? dayjs(promo.expires_at).format('DD/MM/YYYY') : 'Illimité' }}
            </td>
            <td class="px-5 py-4">
              <button @click="togglePromo(promo)"
                :class="promo.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                class="text-xs font-semibold px-2.5 py-1 rounded-full transition-colors">
                {{ promo.is_active ? 'Actif' : 'Inactif' }}
              </button>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-2">
                <button @click="openModal(promo)"
                  class="text-gray-400 hover:text-primary transition-colors p-1">
                  <Icon name="heroicons:pencil-square" class="w-4 h-4" />
                </button>
                <button @click="deletePromo(promo.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal promo -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-md p-6">
        <h3 class="font-display font-semibold text-gray-900 text-lg mb-5">
          {{ editingPromo ? 'Modifier le code' : 'Nouveau code promo' }}
        </h3>
        <form @submit.prevent="savePromo" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Code</label>
            <input v-model="form.code" type="text" placeholder="ex: BIENVENUE20"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm uppercase
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
              <select v-model="form.type"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white
                       focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="fixed">Montant fixe (FCFA)</option>
                <option value="percent">Pourcentage (%)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Valeur</label>
              <input v-model.number="form.value" type="number" min="1"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Commande min. (FCFA)</label>
              <input v-model.number="form.min_order" type="number" min="0"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Utilisations max</label>
              <input v-model.number="form.max_uses" type="number" min="1" placeholder="Illimité"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Expiration</label>
            <input v-model="form.expires_at" type="date"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
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
import dayjs     from 'dayjs'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }    = useApi()
const { format } = useFormatPrice()

const showModal   = ref(false)
const saving      = ref(false)
const editingPromo = ref<any>(null)
const form = reactive({ code: '', type: 'fixed', value: 0, min_order: 0, max_uses: null as number | null, expires_at: '' })

const { data: promos, refresh } = await useAsyncData('admin-promos', () => api<any[]>('/admin/promos'))

function openModal(promo?: any) {
  editingPromo.value = promo ?? null
  if (promo) {
    Object.assign(form, { code: promo.code, type: promo.type, value: promo.value, min_order: promo.min_order, max_uses: promo.max_uses, expires_at: promo.expires_at?.split('T')[0] ?? '' })
  } else {
    Object.assign(form, { code: '', type: 'fixed', value: 0, min_order: 0, max_uses: null, expires_at: '' })
  }
  showModal.value = true
}

async function savePromo() {
  saving.value = true
  try {
    if (editingPromo.value) {
      await api(`/admin/promos/${editingPromo.value.id}`, { method: 'PUT', body: form })
    } else {
      await api('/admin/promos', { method: 'POST', body: form })
    }
    toast.success('Code promo enregistré.')
    showModal.value = false
    refresh()
  } finally {
    saving.value = false
  }
}

async function togglePromo(promo: any) {
  await api(`/admin/promos/${promo.id}/toggle`, { method: 'PUT' })
  promo.is_active = !promo.is_active
}

async function deletePromo(id: number) {
  await api(`/admin/promos/${id}`, { method: 'DELETE' })
  toast.success('Code promo supprimé.')
  refresh()
}
</script>
