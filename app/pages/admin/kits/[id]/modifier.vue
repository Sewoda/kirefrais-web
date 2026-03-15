<!-- pages/admin/kits/[id]/modifier.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <button @click="router.back()"
        class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center
               text-gray-500 hover:bg-gray-50 transition-colors">
        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
      </button>
      <h2 class="font-display font-semibold text-xl text-gray-900">Modifier le kit repas</h2>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-primary" />
    </div>

    <form v-else @submit.prevent="save" class="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
      
      <!-- Colonne centrale : Détails -->
      <div class="md:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 class="font-display font-semibold text-gray-900">Informations générales</h3>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nom du kit</label>
            <input v-model="form.name" type="text" required placeholder="ex: Poulet Yassa Traditionnel"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea v-model="form.description" rows="4" required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <!-- Ingrédients -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="block text-sm font-medium text-gray-700">Ingrédients fournis</label>
              <button type="button" @click="addIngredient" 
                class="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 uppercase tracking-wider">
                <Icon name="heroicons:plus-circle" class="w-4 h-4" />
                Ajouter
              </button>
            </div>
            
            <div class="space-y-2">
              <div v-for="(ing, idx) in form.ingredients" :key="idx" class="flex gap-2">
                <input v-model="form.ingredients[idx]" type="text" 
                  placeholder="ex: 200g de poulet"
                  class="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/30" />
                <button type="button" @click="form.ingredients.splice(idx, 1)"
                  class="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Icon name="heroicons:trash" class="w-5 h-5" />
                </button>
              </div>
              <div v-if="form.ingredients.length === 0" class="text-center py-4 border-2 border-dashed border-gray-100 rounded-xl">
                <p class="text-xs text-gray-400 uppercase font-semibold">Aucun ingrédient ajouté</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Valeurs nutritionnelles -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 class="font-display font-semibold text-gray-900 mb-4">Valeurs nutritionnelles (pour 100g)</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Calories</label>
              <input v-model.number="form.calories" type="number" required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Protéines (g)</label>
              <input v-model.number="form.proteins" type="number" step="0.1" required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Glucides (g)</label>
              <input v-model.number="form.carbs" type="number" step="0.1" required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Lipides (g)</label>
              <input v-model.number="form.fats" type="number" step="0.1" required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Fibres (g)</label>
              <input v-model.number="form.fiber" type="number" step="0.1" required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
          </div>
        </div>

        <!-- Section Étapes de préparation -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-semibold text-gray-900">Étapes de préparation</h3>
            <button type="button" @click="addStep"
              class="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors flex items-center gap-2 uppercase tracking-widest">
              <Icon name="heroicons:plus" class="w-4 h-4" />
              Ajouter une étape
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="(step, idx) in form.recipe_steps" :key="idx" 
              class="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-4 relative group">
              <div class="absolute -left-3 top-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg">
                {{ idx + 1 }}
              </div>
              
              <button type="button" @click="form.recipe_steps.splice(idx, 1)"
                class="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                <Icon name="heroicons:trash" class="w-5 h-5" />
              </button>

              <div class="pl-6 space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Titre de l'étape</label>
                  <input v-model="step.title" type="text" placeholder="ex: Préparation de la marinade"
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Instructions détaillées</label>
                  <textarea v-model="step.content" rows="3" placeholder="Expliquez comment réaliser cette étape..."
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/30" />
                  <p class="text-[10px] text-gray-400 mt-1 italic">Vous pouvez inclure des liens ou du texte formaté.</p>
                </div>
                
                <div class="flex gap-4 items-end">
                  <div class="flex-1">
                    <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Image de l'étape (optionnelle)</label>
                    <div class="flex gap-2">
                      <input v-model="step.image" type="text" placeholder="URL de l'image ou upload..."
                        class="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/30" />
                      <label class="cursor-pointer px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 flex items-center gap-2">
                        <Icon name="heroicons:cloud-arrow-up" class="w-4 h-4" />
                        <input type="file" @change="(e) => uploadStepImage(e, idx)" class="hidden" accept="image/*" />
                        Upload
                      </label>
                    </div>
                  </div>
                  <div v-if="step.image" class="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white">
                    <img :src="step.image" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="form.recipe_steps.length === 0" class="text-center py-12 border-2 border-dashed border-gray-100 rounded-3xl">
              <Icon name="heroicons:academic-cap" class="w-12 h-12 text-gray-200 mx-auto mb-2" />
              <p class="text-gray-400 font-medium">Commencez par ajouter la première étape de votre recette.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne droite : Paramètres -->
      <div class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Catégorie</label>
            <select v-model="form.category_id" required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white">
              <option value="">Sélectionner...</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Temps (min)</label>
              <input v-model.number="form.prep_time" type="number" required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Difficulté</label>
              <select v-model="form.difficulty" required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                <option value="easy">Facile</option>
                <option value="medium">Moyen</option>
                <option value="hard">Difficile</option>
              </select>
            </div>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span class="text-sm font-medium text-gray-700">Végétarien ?</span>
            <button type="button" @click="form.is_vegetarian = !form.is_vegetarian"
              :class="form.is_vegetarian ? 'bg-primary' : 'bg-gray-300'"
              class="w-10 h-6 rounded-full relative transition-colors duration-200">
              <span :class="form.is_vegetarian ? 'translate-x-5' : 'translate-x-1'"
                class="absolute top-1 left-0 w-4 h-4 bg-white rounded-full transition-transform duration-200" />
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 class="font-display font-semibold text-gray-900">Prix (FCFA)</h3>
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Prix 1 Personne</label>
            <input v-model.number="form.price_1p" type="number" required
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Prix 2 Personnes</label>
            <input v-model.number="form.price_2p" type="number" required
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-1">Prix 4 Personnes</label>
            <input v-model.number="form.price_4p" type="number" required
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-semibold text-gray-900">Images du kit</h3>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ form.images.length }} / 4</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="(img, i) in form.images" :key="i" 
              class="relative group aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <img :src="img" class="w-full h-full object-cover cursor-zoom-in" @click="zoomedImage = img" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button type="button" @click="zoomedImage = img" class="p-2 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform">
                  <Icon name="heroicons:magnifying-glass-plus" class="w-4 h-4" />
                </button>
                <button type="button" @click="form.images.splice(i, 1)" class="p-2 bg-red-500 rounded-full text-white hover:scale-110 transition-transform">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Previews d'upload en cours -->
            <div v-for="up in activeUploads" :key="up.id" class="relative aspect-square rounded-2xl overflow-hidden border border-primary/20 bg-primary/5 p-1">
              <img :src="up.preview" class="w-full h-full object-cover rounded-xl opacity-50 blur-[2px]" />
              <div class="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Icon name="heroicons:arrow-path" class="w-6 h-6 text-primary animate-spin" />
                <span class="text-[8px] font-bold text-primary uppercase tracking-widest">Envoi...</span>
              </div>
            </div>

            <label v-if="form.images.length + activeUploads.length < 4" 
              class="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
              <input type="file" @change="uploadImage" class="hidden" accept="image/*" />
              <Icon name="heroicons:photo" class="w-8 h-8 mb-2 opacity-50" />
              <span class="text-[10px] font-bold uppercase tracking-widest">Ajouter</span>
            </label>
          </div>
          <p class="text-[10px] text-gray-400 text-center italic">Cliquez sur une image pour l'agrandir.</p>
        </div>

        <!-- Lightbox minimalist -->
        <div v-if="zoomedImage" class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12" @click="zoomedImage = ''">
          <button class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
          <img :src="zoomedImage" class="max-w-full max-h-full rounded-2xl shadow-2xl transition-all duration-300 scale-100" @click.stop />
        </div>
      </div>

      <!-- Action fixe en bas -->
      <div class="fixed bottom-0 left-0 lg:left-64 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-20">
        <div class="max-w-4xl mx-auto flex items-center justify-end gap-3">
          <button type="button" @click="router.back()"
            class="px-6 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button type="submit" :disabled="loading"
            class="px-8 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 disabled:opacity-50">
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 animate-spin mr-2 inline" />
            Mettre à jour
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ middleware: ['auth', 'role-admin'], layout: 'admin' })

const { api } = useApi()
const router  = useRouter()
const route   = useRoute()
const loading = ref(false)
const zoomedImage = ref('')
const activeUploads = ref<any[]>([])

const { data: categories } = await useAsyncData('categories', () => 
  api<any>('/categories')
)

const form = reactive({
  category_id:   '',
  name:          '',
  description:   '',
  ingredients:   [] as string[],
  recipe_steps:  [] as any[],
  prep_time:     30,
  difficulty:    'medium',
  calories:      0,
  proteins:      0,
  carbs:         0,
  fats:          0,
  fiber:         0,
  price_1p:      0,
  price_2p:      0,
  price_4p:      0,
  is_vegetarian: false,
  images:        [] as string[],
})

const { data: kit, pending } = await useAsyncData(`admin-kit-${route.params.id}`, async () => {
  const data = await api<any>(`/admin/kits/${route.params.id}`)
  
  // Rétrocompatibilité ingrédients
  if (data.ingredients && typeof data.ingredients === 'string') {
    data.ingredients = data.ingredients.split(',').map((i: string) => i.trim()).filter((i: string) => i)
  }
  if (!data.ingredients) data.ingredients = []
  if (!data.recipe_steps) data.recipe_steps = []
  
  Object.assign(form, data)
  return data
})

async function uploadImage(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  // Aperçu instantané local
  const uploadId = Date.now()
  const preview = URL.createObjectURL(file)
  activeUploads.value.push({ id: uploadId, preview })

  const formData = new FormData()
  formData.append('image', file)

  try {
    const { url } = await api<any>('/admin/kits/upload-image', {
      method: 'POST',
      body: formData,
    })
    form.images.push(url)
  } catch (err) {
    toast.error("Erreur lors de l'upload.")
  } finally {
    // Nettoyer l'upload actif et l'URL locale
    activeUploads.value = activeUploads.value.filter(u => u.id !== uploadId)
    URL.revokeObjectURL(preview)
  }
}

async function uploadStepImage(e: Event, index: number) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)

  try {
    const { url } = await api<any>('/admin/kits/upload-image', {
      method: 'POST',
      body: formData,
    })
    form.recipe_steps[index].image = url
  } catch (err) {
    toast.error("Erreur lors de l'upload.")
  }
}

function addIngredient() {
  form.ingredients.push('')
}

function addStep() {
  form.recipe_steps.push({
    title: '',
    content: '',
    image: '',
  })
}

async function save() {
  if (form.images.length === 0) {
    return toast.error("Veuillez ajouter au moins une image.")
  }
  
  loading.value = true
  try {
    await api(`/admin/kits/${route.params.id}`, {
      method: 'PUT',
      body:   form,
    })
    toast.success("Kit mis à jour.")
    router.push('/admin/kits')
  } catch (err: any) {
    toast.error(err.data?.message || "Une erreur est survenue.")
  } finally {
    loading.value = false
  }
}
</script>
