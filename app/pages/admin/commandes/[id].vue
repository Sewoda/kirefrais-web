<!-- pages/admin/commandes/[id].vue -->
<template>
  <div class="max-w-5xl mx-auto space-y-6 pb-20">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button @click="router.back()"
          class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center
                 text-gray-500 hover:bg-gray-50 transition-colors">
          <Icon name="heroicons:chevron-left" class="w-5 h-5" />
        </button>
        <div>
          <h2 class="font-display font-semibold text-xl text-gray-900">Commande {{ order?.reference }}</h2>
          <p class="text-xs text-gray-400">Passée le {{ order?.created_at }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button @click="printOrder"
          class="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
          <Icon name="heroicons:printer" class="w-5 h-5" />
        </button>
        <select v-model="orderStatus" @change="updateStatus"
          class="px-4 py-2.5 rounded-xl border-2 border-primary bg-white text-sm font-semibold text-primary focus:outline-none">
          <option value="paid">Payée</option>
          <option value="preparing">En préparation</option>
          <option value="ready">Prête</option>
          <option value="delivering">En livraison</option>
          <option value="delivered">Livrée</option>
          <option value="cancelled">Annulée</option>
        </select>
      </div>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Détails articles -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="font-display font-semibold text-gray-900">Articles</h3>
          </div>
          <table class="w-full text-sm">
            <tbody class="divide-y divide-gray-50">
              <tr v-for="item in order?.items" :key="item.id">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <img :src="item.kit?.images?.[0]" class="w-12 h-12 rounded-lg object-cover bg-gray-50" />
                    <div>
                      <p class="font-medium text-gray-900">{{ item.kit?.name }}</p>
                      <p class="text-xs text-gray-400">{{ item.portions }} portions</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-500">x{{ item.quantity }}</td>
                <td class="px-6 py-4 text-right font-mono font-semibold text-gray-900">
                  {{ format(item.price * item.quantity) }}
                </td>
              </tr>
            </tbody>
            <tfoot class="bg-gray-50 divide-y divide-gray-100">
              <tr>
                <td colspan="2" class="px-6 py-3 text-sm text-gray-500 text-right">Sous-total</td>
                <td class="px-6 py-3 text-sm font-mono font-semibold text-gray-900 text-right">{{ format(order?.subtotal) }}</td>
              </tr>
              <tr>
                <td colspan="2" class="px-6 py-3 text-sm text-gray-500 text-right">Livraison</td>
                <td class="px-6 py-3 text-sm font-mono font-semibold text-gray-900 text-right">{{ format(order?.delivery_fee) }}</td>
              </tr>
              <tr v-if="order?.discount > 0">
                <td colspan="2" class="px-6 py-3 text-sm text-green-600 text-right">Réduction</td>
                <td class="px-6 py-3 text-sm font-mono font-semibold text-green-600 text-right">-{{ format(order?.discount) }}</td>
              </tr>
              <tr class="bg-white">
                <td colspan="2" class="px-6 py-4 text-base font-bold text-gray-900 text-right">Total</td>
                <td class="px-6 py-4 text-lg font-mono font-bold text-primary text-right">{{ format(order?.total_amount) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Assignation Livreur -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-display font-semibold text-gray-900">Livraison</h3>
            <span v-if="order?.deliverer" class="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold">
              Assigné
            </span>
          </div>
          
          <div v-if="order?.deliverer" class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {{ order.deliverer.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ order.deliverer.name }}</p>
                <p class="text-xs text-gray-500">{{ order.deliverer.phone }}</p>
              </div>
            </div>
            <button @click="showLivreurModal = true" class="text-primary text-xs font-bold hover:underline">
              Changer
            </button>
          </div>
          
          <button v-else @click="showLivreurModal = true"
            class="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400
                   hover:border-primary hover:text-primary transition-colors flex flex-col items-center gap-1">
            <Icon name="heroicons:truck" class="w-6 h-6" />
            <span class="text-sm font-semibold">Assigner un livreur</span>
          </button>
        </div>
      </div>

      <!-- Colonne droite : Client & Adresse -->
      <div class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 class="font-display font-semibold text-gray-900 border-b border-gray-50 pb-3">Client</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:user" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-900 font-medium">{{ order?.user?.name }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:phone" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-600">{{ order?.user?.phone }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:envelope" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-600 truncate">{{ order?.user?.email }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 class="font-display font-semibold text-gray-900 border-b border-gray-50 pb-3">Lieu de livraison</h3>
          <div class="space-y-2">
            <p class="text-sm font-semibold text-gray-900">{{ order?.address?.label || 'Adresse' }}</p>
            <p class="text-sm text-gray-600">{{ order?.address?.street }}</p>
            <p class="text-xs text-gray-400">{{ order?.zone?.name }}, {{ order?.zone?.city }}</p>
          </div>
          <div class="pt-2">
            <div class="flex items-center gap-2 text-primary">
              <Icon name="heroicons:calendar" class="w-4 h-4" />
              <span class="text-sm font-semibold">{{ order?.delivery_date }}</span>
            </div>
            <div class="text-xs text-gray-400 pl-6 capitalize">{{ order?.delivery_slot }}</div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 class="font-display font-semibold text-gray-900 border-b border-gray-50 pb-3">Paiement</h3>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Méthode</span>
            <span class="font-bold uppercase text-gray-900">{{ order?.payment_method }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Statut</span>
            <span :class="order?.payment_status === 'paid' ? 'text-green-600' : 'text-orange-500'" class="font-bold">
              {{ order?.payment_status === 'paid' ? 'Payé' : 'En attente' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal assignation livreur -->
    <Teleport to="body">
      <div v-if="showLivreurModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="showLivreurModal = false" />
        <div class="bg-white rounded-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
          <div class="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 class="font-display font-semibold text-gray-900">Assigner un livreur</h3>
            <button @click="showLivreurModal = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div v-for="l in livreurs" :key="l.id"
              @click="assignLivreur(l.id)"
              class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">
              <div class="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
                {{ l.name.charAt(0) }}
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">{{ l.name }}</p>
                <p class="text-xs text-gray-500">{{ l.phone }}</p>
              </div>
              <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }    = useApi()
const route      = useRoute()
const router     = useRouter()
const { format } = useFormatPrice()

const showLivreurModal = ref(false)
const orderStatus      = ref('')

const { data: order, pending, refresh } = await useAsyncData(`admin-order-${route.params.id}`, async () => {
  const data = await api<any>(`/admin/orders/${route.params.id}`)
  orderStatus.value = data.status
  return data
})

const { data: livreurs } = await useAsyncData('active-livreurs', () =>
  api<any>('/admin/livreurs', { params: { is_active: 1 } }).then(r => r.data)
)

async function updateStatus() {
  try {
    await api(`/admin/orders/${route.params.id}/status`, {
      method: 'PUT',
      body:   { status: orderStatus.value }
    })
    toast.success("Statut mis à jour.")
    refresh()
  } catch (err) {
    toast.error("Erreur lors de la mise à jour.")
  }
}

async function assignLivreur(livreurId: number) {
  try {
    await api(`/admin/orders/${route.params.id}/assign-deliverer`, {
      method: 'PUT',
      body:   { deliverer_id: livreurId }
    })
    toast.success("Livreur assigné.")
    showLivreurModal.value = false
    refresh()
  } catch (err) {
    toast.error("Erreur d'assignation.")
  }
}

function printOrder() {
  window.print()
}
</script>

<style scoped>
@media print {
  .lg\:left-64, .fixed, button, select, .max-w-5xl {
    margin: 0 !important;
    padding: 0 !important;
    position: static !important;
    border: none !important;
  }
  .lg\:left-64 { left: 0 !important; }
  aside, header, .fixed, button, select { display: none !important; }
}
</style>
