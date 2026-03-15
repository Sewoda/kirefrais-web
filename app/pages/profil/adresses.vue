<template>
  <ProfileLayout>
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div class="flex items-center gap-4">
          <NuxtLink to="/profil" class="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 shrink-0">
            <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          </NuxtLink>
          <div>
            <h1 class="font-display font-bold text-2xl text-gray-900 tracking-tight">Mes adresses</h1>
            <p class="text-gray-500 font-medium text-sm mt-0.5">Gérez vos lieux de livraison</p>
          </div>
        </div>
        <button @click="showModal = true" class="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm w-full md:w-auto">
          <Icon name="heroicons:plus" class="w-5 h-5" />
          Ajouter une adresse
        </button>
      </div>

      <div v-if="pending" class="grid sm:grid-cols-2 gap-5">
        <div v-for="i in 2" :key="i" class="h-40 bg-white rounded-3xl animate-pulse border border-gray-100" />
      </div>

      <div v-else-if="!addresses?.length" class="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div class="w-16 h-16 bg-primary-light/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
          <Icon name="heroicons:map-pin" class="w-8 h-8 text-primary" />
        </div>
        <h3 class="font-display font-bold text-xl text-gray-900 mb-2">Aucune adresse</h3>
        <p class="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Vous n'avez pas encore enregistré d'adresse de livraison.</p>
        <button @click="showModal = true" class="inline-flex bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-sm text-sm">
          Ajouter ma première adresse
        </button>
      </div>

      <div v-else class="grid sm:grid-cols-2 gap-5">
        <div 
          v-for="address in addresses" 
          :key="address.id"
          class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 transition-all duration-300 relative"
        >
          <div v-if="address.is_default" class="absolute top-4 right-4 bg-secondary-light text-secondary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-secondary/20">
            Par défaut
          </div>

          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 rounded-2xl bg-primary-light/50 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
              <Icon :name="address.label?.toLowerCase() === 'bureau' ? 'heroicons:building-office' : 'heroicons:home'" class="w-6 h-6" />
            </div>
            <div class="mt-1">
              <h3 class="font-display font-bold text-lg text-gray-900 mb-1">{{ address.label || 'Mon adresse' }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ address.address_text || address.address || address.line1 }}</p>
              <p class="text-gray-400 text-sm mt-1" v-if="address.city">{{ address.city }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2 pt-5 border-t border-gray-100 justify-end">
             <button 
               @click="deleteAddress(address.id)"
               class="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
               title="Supprimer"
             >
                <Icon name="heroicons:trash" class="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
      
      <!-- Modal Ajouter Adresse -->
      <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showModal = false" />
          <div class="relative bg-white rounded-3xl w-full max-w-md p-8 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
            <button @click="showModal = false" class="absolute top-6 right-6 p-1 rounded-lg text-gray-300 hover:text-gray-900 transition-colors">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>

            <h2 class="font-display font-bold text-2xl text-gray-900 mb-8 tracking-tight">Nouvelle adresse</h2>

            <form @submit.prevent="saveAddress" class="space-y-6">
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Titre (ex: Maison)</label>
                <input v-model="form.label" required type="text" placeholder="Domicile, Bureau..." class="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner" />
              </div>
              
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Adresse</label>
                <textarea v-model="form.address_text" required rows="3" placeholder="Quartier, rue, indications..." class="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner resize-none"></textarea>
              </div>
              
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Ville</label>
                <input v-model="form.city" required type="text" placeholder="Lomé" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner" />
              </div>

              <div class="flex items-center gap-3 pt-2">
                <input type="checkbox" id="is_default" v-model="form.is_default" class="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300" />
                <label for="is_default" class="text-sm font-medium text-gray-700 cursor-pointer">Définir comme adresse par défaut</label>
              </div>

              <div class="pt-4">
                <button type="submit" :disabled="saving" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 text-sm">
                  {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
              </div>
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
useSeoMeta({ title: 'Mes Adresses — Kirefrais' })

const { api } = useApi()

const showModal = ref(false)
const saving = ref(false)

const { data: addresses, pending, refresh } = await useAsyncData(
  'user-addresses-page',
  () => api<any[]>('/addresses')
)

const form = reactive({
  label: '',
  address_text: '',
  city: 'Lomé',
  is_default: false
})

async function saveAddress() {
  if (!form.label || !form.address_text) return
  
  saving.value = true
  try {
    // Adapter selon votre API
    await api('/addresses', { method: 'POST', body: form })
    toast.success('Adresse enregistrée avec succès !')
    showModal.value = false
    
    // reset form
    form.label = ''
    form.address_text = ''
    form.is_default = false
    
    refresh()
  } catch (err: any) {
    toast.error(err?.data?.message || 'Erreur lors de l\'enregistrement')
  } finally {
    saving.value = false
  }
}

async function deleteAddress(id: number) {
  if(!confirm("Supprimer cette adresse ?")) return
  try {
    await api(`/addresses/${id}`, { method: 'DELETE' })
    toast.success('Adresse supprimée')
    refresh()
  } catch(e) {
    toast.error('Erreur lors de la suppression')
  }
}
</script>
