<template>
  <div class="space-y-8">
    <!-- Section Header -->
    <div class="flex items-center justify-between">
      <h2 class="font-display font-bold text-2xl text-gray-900">Avis des cuisiniers</h2>
      <div class="flex items-center gap-2">
        <div class="flex">
          <Icon v-for="i in 5" :key="i" name="heroicons:star-solid"
            class="w-5 h-5"
            :class="i <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-200'"
          />
        </div>
        <span class="text-sm font-bold text-gray-900">{{ averageRating.toFixed(1) }}</span>
        <span class="text-xs text-gray-400">({{ reviews.length }} avis)</span>
      </div>
    </div>

    <!-- Write Review Button -->
    <button
      v-if="canReview && !showForm"
      @click="showForm = true"
      class="w-full py-5 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold text-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
    >
      <Icon name="heroicons:pencil-square" class="w-5 h-5" />
      Donner votre avis sur ce kit
    </button>

    <!-- Review Form -->
    <div v-if="showForm" class="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="font-display font-bold text-lg text-gray-900">Votre avis</h3>
        <button @click="showForm = false" class="p-2 rounded-xl hover:bg-gray-50 text-gray-400">
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>

      <!-- Star Rating -->
      <div>
        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Note</label>
        <div class="flex gap-2">
          <button v-for="i in 5" :key="i" @click="reviewForm.rating = i" type="button"
            class="p-2 rounded-xl transition-all"
            :class="i <= reviewForm.rating ? 'text-yellow-400 scale-110' : 'text-gray-200 hover:text-yellow-300'"
          >
            <Icon name="heroicons:star-solid" class="w-8 h-8" />
          </button>
        </div>
      </div>

      <!-- Comment -->
      <div>
        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Commentaire</label>
        <textarea
          v-model="reviewForm.comment"
          rows="4"
          placeholder="Partagez votre expérience de cuisine avec ce kit..."
          class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:bg-white focus:border-primary/20 resize-none transition-all"
        />
      </div>

      <button @click="submitReview" :disabled="submitting || reviewForm.rating === 0"
        class="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50">
        {{ submitting ? 'Envoi...' : 'Publier mon avis' }}
      </button>
    </div>

    <!-- Reviews List -->
    <div v-if="reviews.length > 0" class="space-y-4">
      <div v-for="review in reviews" :key="review.id" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {{ review.user?.name?.charAt(0) || '?' }}
            </div>
            <div>
              <p class="text-sm font-bold text-gray-900">{{ review.user?.name }}</p>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ review.created_at }}</p>
            </div>
          </div>
          <div class="flex gap-0.5">
            <Icon v-for="i in 5" :key="i" name="heroicons:star-solid"
              class="w-4 h-4"
              :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-200'"
            />
          </div>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed">{{ review.comment }}</p>
      </div>
    </div>
    <div v-else class="text-center py-12 bg-white rounded-3xl border border-gray-100 border-dashed">
      <Icon name="heroicons:chat-bubble-bottom-center-text" class="w-10 h-10 text-gray-200 mx-auto mb-3" />
      <p class="text-sm text-gray-400 font-bold uppercase tracking-widest">Aucun avis pour le moment</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{
  kitId: number
  orderId?: number
}>()

const { api } = useApi()
const authStore = useAuthStore()

const showForm = ref(false)
const submitting = ref(false)
const reviewForm = reactive({ rating: 0, comment: '' })

const canReview = computed(() => !!authStore.token && !!props.orderId)

const { data: reviews, refresh } = await useAsyncData(
  `reviews-kit-${props.kitId}`,
  () => api<any[]>(`/reviews?meal_kit_id=${props.kitId}`).catch(() => [])
)

const averageRating = computed(() => {
  if (!reviews.value?.length) return 0
  const sum = reviews.value.reduce((acc: number, r: any) => acc + r.rating, 0)
  return sum / reviews.value.length
})

async function submitReview() {
  if (reviewForm.rating === 0) {
    toast.error('Veuillez donner une note.')
    return
  }
  submitting.value = true
  try {
    await api('/reviews', {
      method: 'POST',
      body: {
        meal_kit_id: props.kitId,
        order_id: props.orderId,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      }
    })
    toast.success('Merci pour votre avis ! Il sera visible après modération.')
    showForm.value = false
    reviewForm.rating = 0
    reviewForm.comment = ''
    refresh()
  } catch (err: any) {
    toast.error(err?.data?.message || 'Erreur lors de l\'envoi.')
  } finally {
    submitting.value = false
  }
}
</script>
