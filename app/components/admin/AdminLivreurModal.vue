<!-- components/admin/AdminLivreurModal.vue -->
<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" @click="$emit('close')" />
    <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-display font-bold text-gray-900 text-xl">
          {{ livreur ? 'Modifier le livreur' : 'Nouveau livreur' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 p-1">
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="save" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <input v-model="form.name" type="text" required
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" required
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input v-model="form.phone" type="tel" required
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div v-if="!livreur">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input v-model="form.password" type="password" required
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30" />
        </div>

        <div class="flex gap-3 mt-8">
          <button type="button" @click="$emit('close')"
            class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button type="submit" :disabled="loading"
            class="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50">
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 animate-spin inline mr-2" />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{ livreur?: any }>()
const emit  = defineEmits(['saved', 'close'])

const { api } = useApi()
const loading = ref(false)

const form = reactive({
  name:     props.livreur?.name || '',
  email:    props.livreur?.email || '',
  phone:    props.livreur?.phone || '',
  password: '',
})

async function save() {
  loading.value = true
  try {
    const method = props.livreur ? 'PUT' : 'POST'
    const url    = props.livreur ? `/admin/livreurs/${props.livreur.id}` : '/admin/livreurs'
    
    await api(url, { method, body: form })
    
    toast.success(props.livreur ? 'Livreur mis à jour.' : 'Livreur créé.')
    emit('saved')
    emit('close')
  } catch (e: any) {
    toast.error(e.data?.message || 'Une erreur est survenue.')
  } finally {
    loading.value = false
  }
}
</script>
