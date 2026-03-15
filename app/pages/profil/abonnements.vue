<template>
  <ProfileLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div class="flex items-center gap-4">
          <NuxtLink to="/profil" class="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 shrink-0">
            <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          </NuxtLink>
          <div>
            <h1 class="font-display font-bold text-2xl text-gray-900 tracking-tight mb-1">Mes Abonnements</h1>
            <p class="text-gray-500 font-medium text-xs leading-relaxed">Gérez vos livraisons automatiques</p>
          </div>
        </div>
        <button @click="showCreateModal = true" class="bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm w-full md:w-auto">
          <Icon name="heroicons:plus" class="w-5 h-5" />
          Nouvel abonnement
        </button>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="space-y-6">
        <div v-for="i in 3" :key="i" class="h-32 bg-white rounded-2xl animate-pulse border border-gray-100" />
      </div>

      <!-- Empty State -->
      <div v-else-if="!subscriptions?.length" class="bg-white rounded-3xl border border-gray-100 py-32 text-center shadow-sm">
        <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-100">
          <Icon name="heroicons:arrow-path" class="w-10 h-10 text-gray-200" />
        </div>
        <h2 class="font-display font-bold text-2xl text-gray-900 mb-4 tracking-tight">Aucun abonnement actif</h2>
        <p class="text-gray-400 max-w-sm mx-auto mb-10 leading-relaxed font-medium">Abonnez-vous à vos kits favoris et recevez-les automatiquement sans passer commande.</p>
        <button @click="showCreateModal = true" class="bg-secondary text-white font-bold px-10 py-4 rounded-xl shadow-md transition-all hover:bg-secondary-dark active:scale-95">
          Commencer un abonnement
        </button>
      </div>

      <!-- Subscription List -->
      <div v-else class="space-y-6">
        <div v-for="sub in subscriptions" :key="sub.id" class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-all">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div class="flex items-center gap-8">
              <!-- Kit Image -->
              <div class="w-24 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-100">
                <NuxtImg v-if="getCoverImage(sub.kit)" :src="getCoverImage(sub.kit)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div v-else class="w-full h-full bg-gray-50 flex items-center justify-center">
                  <Icon name="heroicons:beaker" class="w-8 h-8 text-gray-200" />
                </div>
              </div>
              <div class="min-w-0">
                <h3 class="font-display font-bold text-xl text-gray-900 mb-3 tracking-tight truncate">{{ sub.kit?.name || 'Kit Repas' }}</h3>
                <div class="flex flex-wrap items-center gap-2">
                  <span class="bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                    {{ sub.portions }}P
                  </span>
                  <span class="bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                    {{ frequencyLabel(sub.frequency) }}
                  </span>
                  <span class="bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                    {{ slotLabel(sub.delivery_slot) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-6 justify-between md:justify-end">
              <!-- Status Badge -->
              <div class="flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm"
                :class="{
                  'bg-green-50 border-green-100 text-green-700': sub.status === 'active',
                  'bg-yellow-50 border-yellow-100 text-yellow-700': sub.status === 'paused',
                  'bg-red-50 border-red-100 text-red-700': sub.status === 'cancelled'
                }">
                <span class="w-1.5 h-1.5 rounded-full" :class="sub.status === 'active' ? 'bg-green-500' : 'bg-current'"></span>
                {{ sub.status === 'active' ? 'Actif' : sub.status === 'paused' ? 'En pause' : 'Annulé' }}
              </div>

              <!-- Next Delivery -->
              <div v-if="sub.status === 'active'" class="text-right hidden xl:block">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Prochaine</p>
                <p class="text-xs font-black text-gray-900 tracking-tight">{{ sub.next_delivery_date }}</p>
              </div>

              <!-- Actions -->
              <div class="flex gap-2">
                <button
                  v-if="sub.status === 'active'"
                  @click="pauseSubscription(sub.id)"
                  class="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-yellow-50 hover:text-yellow-600 border border-transparent hover:border-yellow-100 transition-all"
                  title="Mettre en pause"
                >
                  <Icon name="heroicons:pause" class="w-5 h-5" />
                </button>
                <button
                  v-if="sub.status === 'paused'"
                  @click="resumeSubscription(sub.id)"
                  class="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-green-50 hover:text-green-600 border border-transparent hover:border-green-100 transition-all"
                  title="Reprendre"
                >
                  <Icon name="heroicons:play" class="w-5 h-5" />
                </button>
                <button
                  v-if="sub.status !== 'cancelled'"
                  @click="cancelSubscription(sub.id)"
                  class="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-100 transition-all"
                  title="Annuler"
                >
                  <Icon name="heroicons:x-mark" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Modal -->
      <Teleport to="body">
        <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showCreateModal = false" />
          <div class="relative bg-white rounded-3xl w-full max-w-lg p-10 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
            <button @click="showCreateModal = false" class="absolute top-8 right-8 p-1 rounded-lg text-gray-300 hover:text-gray-900 transition-colors">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>

            <h2 class="font-display font-bold text-2xl text-gray-900 mb-10 tracking-tight">Nouvel abonnement</h2>

            <form @submit.prevent="createSubscription" class="space-y-8">
              <!-- Kit -->
              <div>
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Sélectionner un kit</label>
                <select v-model="form.meal_kit_id" required class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all">
                  <option value="">Choisissez une recette...</option>
                  <option v-for="kit in allKits" :key="kit.id" :value="kit.id">{{ kit.name }}</option>
                </select>
              </div>

              <!-- Portions -->
              <div>
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Nombre de portions</label>
                <div class="grid grid-cols-3 gap-3">
                  <button type="button" v-for="p in [1, 2, 4]" :key="p"
                    @click="form.portions = p"
                    class="py-4 rounded-xl text-center font-bold text-sm border transition-all"
                    :class="form.portions === p ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100'"
                  >
                    {{ p }} pers.
                  </button>
                </div>
              </div>

              <!-- Frequency -->
              <div>
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Fréquence</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button type="button" v-for="f in frequencies" :key="f.value"
                    @click="form.frequency = f.value"
                    class="py-4 rounded-xl text-center font-bold text-[10px] uppercase tracking-widest border transition-all"
                    :class="form.frequency === f.value ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100'"
                  >
                    {{ f.label }}
                  </button>
                </div>
              </div>

              <!-- Slot -->
              <div>
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Créneau de livraison</label>
                <div class="grid grid-cols-3 gap-3">
                  <button type="button" v-for="s in slots" :key="s.value"
                    @click="form.delivery_slot = s.value"
                    class="py-4 rounded-xl text-center font-bold text-xs border transition-all"
                    :class="form.delivery_slot === s.value ? 'border-secondary bg-secondary/5 text-secondary shadow-sm' : 'border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100'"
                  >
                    {{ s.label }}
                  </button>
                </div>
              </div>

              <!-- Address -->
              <div>
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Lieu de livraison</label>
                <select v-model="form.address_id" required class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all">
                  <option value="">Sélectionnez une adresse...</option>
                  <option v-for="addr in addresses" :key="addr.id" :value="addr.id">{{ addr.label }}</option>
                </select>
              </div>

              <!-- First date -->
              <div>
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Date de début</label>
                <div class="relative">
                  <input v-model="form.next_delivery_date" type="date" required class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner" />
                </div>
              </div>

              <button type="submit" :disabled="creating" class="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 mt-4">
                {{ creating ? 'Création...' : 'Valider mon abonnement' }}
              </button>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </ProfileLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'Mes Abonnements — Kirefrais' })

const { api } = useApi()

const showCreateModal = ref(false)
const creating = ref(false)

function getCoverImage(kit: any) {
  if (!kit || !kit.images) return null
  if (Array.isArray(kit.images) && kit.images.length > 0) return kit.images[0]
  if (typeof kit.images === 'string') {
    try {
      const parsed = JSON.parse(kit.images)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0]
    } catch {}
    const cleaned = String(kit.images).replace(/^\[["']|["']\]$/g, '')
    if (cleaned && cleaned.includes('http')) return cleaned
  }
  return null
}

const form = reactive({
  meal_kit_id: '',
  address_id: '',
  portions: 2,
  frequency: 'weekly',
  delivery_slot: 'morning',
  next_delivery_date: ''
})

const frequencies = [
  { value: 'weekly', label: 'Chaque semaine' },
  { value: 'biweekly', label: 'Toutes les 2 sem.' },
  { value: 'monthly', label: 'Chaque mois' },
]

const slots = [
  { value: 'morning', label: '🌅 Matin' },
  { value: 'afternoon', label: '☀️ Midi' },
  { value: 'evening', label: '🌙 Soir' },
]

const frequencyLabel = (f: string) => frequencies.find(x => x.value === f)?.label || f
const slotLabel = (s: string) => slots.find(x => x.value === s)?.label || s

const { data: subscriptions, pending, refresh } = await useAsyncData(
  'user-subscriptions',
  () => api<any[]>('/subscriptions')
)

const { data: allKits } = await useAsyncData(
  'all-kits-for-sub',
  () => api<any>('/kits').then((r: any) => r.data || r)
)

const { data: addresses } = await useAsyncData(
  'user-addresses',
  () => api<any[]>('/addresses')
)

async function createSubscription() {
  if (!form.meal_kit_id || !form.address_id || !form.next_delivery_date) {
    toast.error('Veuillez remplir tous les champs.')
    return
  }
  creating.value = true
  try {
    await api('/subscriptions', { method: 'POST', body: form })
    toast.success('Abonnement créé ! 🎉')
    showCreateModal.value = false
    refresh()
  } catch (err: any) {
    toast.error(err?.data?.message || 'Erreur lors de la création.')
  } finally {
    creating.value = false
  }
}

async function pauseSubscription(id: number) {
  try {
    await api(`/subscriptions/${id}/pause`, { method: 'PUT', body: { weeks: 1 } })
    toast.success('Abonnement mis en pause.')
    refresh()
  } catch { toast.error('Erreur.') }
}

async function resumeSubscription(id: number) {
  try {
    await api(`/subscriptions/${id}`, { method: 'PUT', body: { status: 'active' } })
    toast.success('Abonnement repris !')
    refresh()
  } catch { toast.error('Erreur.') }
}

async function cancelSubscription(id: number) {
  if (!confirm('Êtes-vous sûr(e) de vouloir annuler cet abonnement ?')) return
  try {
    await api(`/subscriptions/${id}`, { method: 'DELETE' })
    toast.success('Abonnement annulé.')
    refresh()
  } catch { toast.error('Erreur.') }
}
</script>
