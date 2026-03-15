<!-- components/admin/AdminCategoryModal.vue -->
<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')" />
      
      <div class="bg-white rounded-2xl w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-display font-semibold text-gray-900">Gérer les catégories</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <div class="p-6 space-y-6">
          <!-- Formulaire Ajout -->
          <form @submit.prevent="save" class="flex gap-2">
            <input v-model="form.name" type="text" required placeholder="Nom de la catégorie..."
              class="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button type="submit" :disabled="loading"
              class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50">
              {{ editingId ? 'Modifier' : 'Ajouter' }}
            </button>
            <button v-if="editingId" type="button" @click="resetForm"
              class="px-3 py-2 bg-gray-100 text-gray-500 rounded-xl text-sm hover:bg-gray-200">
              <Icon name="heroicons:x-mark" class="w-4 h-4" />
            </button>
          </form>

          <!-- Liste des catégories -->
          <div class="max-h-60 overflow-y-auto space-y-2 pr-1">
            <div v-if="pending" class="py-4 text-center">
              <Icon name="heroicons:arrow-path" class="w-6 h-6 animate-spin text-gray-300" />
            </div>
            <div v-else v-for="cat in categories" :key="cat.id"
              class="flex items-center justify-between p-3 rounded-xl bg-gray-50 group">
              <div class="flex items-center gap-3">
                <Icon :name="cat.icon || 'heroicons:tag'" class="w-4 h-4 text-primary" />
                <span class="text-sm font-medium text-gray-700">{{ cat.name }}</span>
                <span class="text-[10px] text-gray-400">({{ cat.kits_count }} kits)</span>
              </div>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="edit(cat)" class="p-1.5 text-gray-400 hover:text-primary">
                  <Icon name="heroicons:pencil-square" class="w-4 h-4" />
                </button>
                <button @click="confirmDelete(cat)" class="p-1.5 text-gray-400 hover:text-red-500" :disabled="cat.kits_count > 0">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal confirmation suppression interne -->
    <div v-if="catToDelete" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40">
      <div class="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl">
        <h4 class="font-bold text-gray-900 mb-2">Supprimer "{{ catToDelete.name }}" ?</h4>
        <p class="text-xs text-gray-500 mb-6">Cette action est irréversible.</p>
        <div class="flex gap-3">
          <button @click="catToDelete = null" class="flex-1 py-2 rounded-xl bg-gray-100 text-sm font-bold">Annuler</button>
          <button @click="remove" class="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-bold">Supprimer</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const emit = defineEmits(['close', 'updated'])
const { api } = useApi()

const loading = ref(false)
const editingId = ref<number | null>(null)
const catToDelete = ref<any>(null)

const form = reactive({
  name: '',
  icon: 'heroicons:tag',
})

const { data: categories, pending, refresh } = await useAsyncData('admin-categories-list', () =>
  api<any>('/admin/categories')
)

function edit(cat: any) {
  editingId.value = cat.id
  form.name = cat.name
  form.icon = cat.icon
}

function resetForm() {
  editingId.value = null
  form.name = ''
  form.icon = 'heroicons:tag'
}

async function save() {
  loading.value = true
  try {
    if (editingId.value) {
      await api(`/admin/categories/${editingId.value}`, { method: 'PUT', body: form })
      toast.success("Catégorie mise à jour.")
    } else {
      await api('/admin/categories', { method: 'POST', body: form })
      toast.success("Catégorie ajoutée.")
    }
    resetForm()
    refresh()
    emit('updated')
  } catch (err: any) {
    toast.error(err.data?.message || "Une erreur est survenue.")
  } finally {
    loading.value = false
  }
}

function confirmDelete(cat: any) {
  if (cat.kits_count > 0) return
  catToDelete.value = cat
}

async function remove() {
  try {
    await api(`/admin/categories/${catToDelete.value.id}`, { method: 'DELETE' })
    toast.success("Catégorie supprimée.")
    catToDelete.value = null
    refresh()
    emit('updated')
  } catch (err: any) {
    toast.error(err.data?.message || "Erreur lors de la suppression.")
  }
}
</script>
