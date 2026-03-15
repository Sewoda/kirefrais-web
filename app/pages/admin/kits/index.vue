<!-- pages/admin/kits/index.vue -->
<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-semibold text-xl text-gray-900">Kits repas</h2>
      <div class="flex items-center gap-3">
        <button @click="showCategoryModal = true"
          class="px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600
                 hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Icon name="heroicons:tag" class="w-4 h-4" />
          Catégories
        </button>
        <NuxtLink to="/admin/kits/nouveau"
          class="bg-primary hover:bg-primary-dark text-white text-sm font-semibold
                 px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2">
          <Icon name="heroicons:plus" class="w-4 h-4" />
          Nouveau kit
        </NuxtLink>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3">
      <input v-model="search" type="text" placeholder="Rechercher un kit..."
        class="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-gray-200 text-sm
               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
      <select v-model="categoryFilter"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-primary/30">
        <option value="">Toutes catégories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <select v-model="statusFilter"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-primary/30">
        <option value="">Tous les statuts</option>
        <option value="1">Actifs</option>
        <option value="0">Inactifs</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div v-if="pending" class="p-8 text-center text-gray-400">
        <Icon name="heroicons:arrow-path" class="w-6 h-6 animate-spin mx-auto mb-2" />
        Chargement...
      </div>
      <table v-else class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kit</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Catégorie</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Prix 1P</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Commandes</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Note</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th class="px-5 py-3" />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="kit in kits?.data" :key="kit.id"
              class="hover:bg-gray-50 transition-colors">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <img :src="getCoverImage(kit)" :alt="kit.name"
                     class="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100" />
                <div>
                  <p class="font-medium text-gray-900">{{ kit.name }}</p>
                  <p class="text-xs text-gray-400">{{ kit.prep_time }} min · {{ kit.difficulty }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 text-gray-600">{{ kit.category?.name }}</td>
            <td class="px-5 py-4 font-mono font-semibold text-secondary text-xs">
              {{ format(kit.price_1p) }}
            </td>
            <td class="px-5 py-4 text-gray-700">{{ kit.order_count }}</td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-1">
                <Icon name="heroicons:star-solid" class="w-3.5 h-3.5 text-secondary" />
                <span class="text-gray-700">{{ kit.rating_avg ? Number(kit.rating_avg).toFixed(1) : '—' }}</span>
              </div>
            </td>
            <td class="px-5 py-4">
              <button @click="toggleKit(kit)"
                :class="kit.is_active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'"
                class="text-xs font-semibold px-2.5 py-1 rounded-full transition-colors">
                {{ kit.is_active ? 'Actif' : 'Inactif' }}
              </button>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-2">
                <NuxtLink :to="`/admin/kits/${kit.id}/modifier`"
                  class="text-gray-400 hover:text-primary transition-colors p-1">
                  <Icon name="heroicons:pencil-square" class="w-4 h-4" />
                </NuxtLink>
                <button @click="confirmDelete(kit)"
                  class="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="kits?.last_page > 1"
           class="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <p class="text-sm text-gray-500">{{ kits?.total }} kits au total</p>
        <div class="flex gap-1">
          <button v-for="page in kits?.last_page" :key="page"
            :class="page === currentPage
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'"
            class="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
            @click="currentPage = page">
            {{ page }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal confirmation suppression -->
    <AdminConfirmModal
      v-if="kitToDelete"
      title="Supprimer ce kit ?"
      :description="`Le kit &quot;${kitToDelete.name}&quot; sera définitivement supprimé.`"
      confirm-label="Supprimer"
      @confirm="deleteKit"
      @cancel="kitToDelete = null"
    />

    <!-- Modal Catégories -->
    <AdminCategoryModal
      v-if="showCategoryModal"
      @updated="refreshCategories"
      @close="showCategoryModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { toast }            from 'vue-sonner'
import AdminConfirmModal    from '~/components/admin/AdminConfirmModal.vue'
import AdminCategoryModal   from '~/components/admin/AdminCategoryModal.vue'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api }    = useApi()
const { format } = useFormatPrice()

const search             = ref('')
const categoryFilter     = ref('')
const statusFilter       = ref('')
const currentPage        = ref(1)
const kitToDelete        = ref<any>(null)
const showCategoryModal  = ref(false)

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

const params = computed(() => ({
  search:      search.value || undefined,
  category_id: categoryFilter.value || undefined,
  is_active:   statusFilter.value !== '' ? statusFilter.value : undefined,
  page:        currentPage.value,
}))

const { data: kits, pending, refresh } = await useAsyncData(
  'admin-kits',
  () => api<any>('/admin/kits', { params: params.value }),
  { watch: [params] }
)

const { data: categories, refresh: refreshCategories } = await useAsyncData(
  'categories',
  () => api<any>('/categories')
)

async function toggleKit(kit: any) {
  await api(`/admin/kits/${kit.id}/toggle`, { method: 'PUT' })
  kit.is_active = !kit.is_active
  toast.success(kit.is_active ? 'Kit activé.' : 'Kit désactivé.')
}

function confirmDelete(kit: any) {
  kitToDelete.value = kit
}

async function deleteKit() {
  await api(`/admin/kits/${kitToDelete.value.id}`, { method: 'DELETE' })
  toast.success('Kit supprimé.')
  kitToDelete.value = null
  refresh()
}
</script>
