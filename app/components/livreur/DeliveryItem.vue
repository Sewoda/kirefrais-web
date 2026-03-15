<template>
  <div class="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow group font-sans">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <!-- Info Client -->
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center text-primary shadow-inner">
          <Icon name="heroicons:user-circle" class="w-10 h-10" />
        </div>
        <div>
          <h4 class="font-display font-bold text-gray-900">{{ order.user?.name }}</h4>
          <p class="text-xs font-bold text-primary flex items-center gap-1.5 mt-1 uppercase tracking-widest">
             <Icon name="heroicons:map-pin" class="w-3.5 h-3.5" />
             Atikoumé, Lomé
          </p>
        </div>
      </div>

      <!-- Détails Commande -->
      <div class="flex flex-wrap items-center gap-6">
        <div class="text-center md:text-left px-6 border-x border-gray-50">
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Articles</p>
          <p class="text-sm font-bold text-gray-900">{{ order.items_count || 3 }} kits</p>
        </div>
        <div class="text-center md:text-left">
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Montant</p>
          <p class="text-sm font-mono font-bold text-secondary">{{ format(order.total_amount) }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <a 
          :href="`tel:${order.user?.phone || '+228'}`"
          class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors shadow-sm"
        >
          <Icon name="heroicons:phone" class="w-5 h-5" />
        </a>
        <button 
          v-if="order.status === 'ready'"
          @click="updateStatus('delivering')"
          class="flex-1 md:flex-none bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2"
        >
          <Icon name="heroicons:truck" class="w-5 h-5" />
          <span>Démarrer</span>
        </button>
        <button 
          v-else-if="order.status === 'delivering'"
          @click="updateStatus('delivered')"
          class="flex-1 md:flex-none bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-secondary/20 active:scale-95 flex items-center gap-2"
        >
          <Icon name="heroicons:check-circle" class="w-5 h-5" />
          <span>Livré ✅</span>
        </button>
        <div v-else class="px-6 py-3 bg-gray-50 text-gray-400 rounded-2xl text-sm font-bold uppercase tracking-widest">
           {{ order.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{ order: any }>()
const emit = defineEmits(['status-updated'])
const { format } = useFormatPrice()
const { api } = useApi()

async function updateStatus(newStatus: string) {
  try {
    await api(`/livreur/orders/${props.order.id}/status`, {
      method: 'PUT',
      body: { status: newStatus }
    })
    toast.success('Statut mis à jour avec succès.')
    emit('status-updated')
  } catch (err: any) {
    toast.error('Impossible de mettre à jour le statut.')
  }
}
</script>
