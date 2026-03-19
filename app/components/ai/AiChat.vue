<template>
  <div class="flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

    <!-- Header -->
    <div class="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-primary-light">
      <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
        <Icon name="heroicons:sparkles" class="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 class="font-display font-semibold text-gray-900 text-sm">KirefraisBot</h3>
        <p class="text-xs text-primary flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          En ligne · Assistant Culinaire IA
        </p>
      </div>
      <button
        class="ml-auto text-gray-400 hover:text-primary transition-colors"
        title="Nouvelle conversation"
        @click="aiStore.newConversation()"
      >
        <Icon name="heroicons:plus-circle" class="w-5 h-5" />
      </button>
    </div>

    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">

      <!-- Bienvenue -->
      <div v-if="!aiStore.messages.length" class="py-8 text-center">
        <div class="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:sparkles" class="w-8 h-8 text-primary" />
        </div>
        <h4 class="font-display font-semibold text-gray-900 mb-2">Bonjour ! Je suis KirefraisBot 👋</h4>
        <p class="text-gray-500 text-sm max-w-xs mx-auto mb-6">
          Posez-moi une question sur la cuisine, la nutrition ou la perte de poids.
          Je vous propose aussi les kits parfaits.
        </p>
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="s in suggestions" :key="s"
            class="bg-primary-light text-primary text-xs font-medium px-3 py-1.5
                   rounded-full hover:bg-primary hover:text-white transition-all duration-200"
            @click="sendSuggestion(s)"
          >
            {{ s }}
          </button>
        </div>
      </div>

      <!-- Boucle messages -->
      <template v-for="(msg, idx) in aiStore.messages" :key="idx">

        <!-- Client -->
        <div v-if="msg.role === 'user'" class="flex justify-end">
          <div class="max-w-xs lg:max-w-md bg-primary text-white
                      px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm">
            {{ msg.content }}
          </div>
        </div>

        <!-- Assistant -->
        <div v-else class="flex gap-3 items-start">
          <div class="w-8 h-8 rounded-full bg-primary-light flex items-center
                      justify-center shrink-0 mt-1">
            <Icon name="heroicons:sparkles" class="w-4 h-4 text-primary" />
          </div>
          <div class="flex-1 max-w-lg space-y-3">

            <!-- Loading -->
            <div v-if="msg.loading" class="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay:0ms" />
                <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay:150ms" />
                <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay:300ms" />
              </div>
            </div>

            <!-- Texte -->
            <div
              v-else
              class="bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-gray-700 leading-relaxed"
              v-html="renderMarkdown(msg.content)"
            />

            <!-- Étapes -->
            <div v-if="msg.steps?.length" class="bg-white border border-gray-100 rounded-xl p-4">
              <p class="font-semibold text-gray-900 text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
                <Icon name="heroicons:list-bullet" class="w-4 h-4 text-primary" />
                Étapes de préparation
              </p>
              <ol class="space-y-2">
                <li v-for="(step, i) in msg.steps" :key="i" class="flex gap-3 text-sm text-gray-700">
                  <span class="w-5 h-5 bg-primary text-white rounded-full flex items-center
                               justify-center text-xs font-bold shrink-0 mt-0.5">
                    {{ i + 1 }}
                  </span>
                  {{ step.replace(/^Étape \d+ : /, '') }}
                </li>
              </ol>
            </div>

            <!-- Conseils -->
            <div v-if="msg.tips?.length" class="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
              <p class="font-semibold text-yellow-700 text-xs uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Icon name="heroicons:light-bulb" class="w-3.5 h-3.5" />
                Conseils
              </p>
              <ul class="space-y-1">
                <li v-for="(tip, i) in msg.tips" :key="i" class="text-xs text-gray-700 flex gap-2">
                  <span class="text-yellow-500">•</span>{{ tip }}
                </li>
              </ul>
            </div>

            <!-- Kits recommandés -->
            <div v-if="msg.kits?.length">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Icon name="heroicons:shopping-bag" class="w-3.5 h-3.5" />
                Kits recommandés pour vous
              </p>
              <div class="space-y-2">
                <AiKitCard
                  v-for="kit in msg.kits" :key="kit.id"
                  :kit="kit"
                  @add-to-cart="onAddToCart(kit)"
                />
              </div>
            </div>

          </div>
        </div>
      </template>
    </div>

    <!-- Saisie -->
    <div class="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <input
          v-model="inputMessage"
          type="text"
          :disabled="aiStore.loading"
          placeholder="Posez votre question culinaire..."
          class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white
                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                 disabled:bg-gray-50 disabled:text-gray-400 transition-all"
        />
        <button
          type="submit"
          :disabled="!inputMessage.trim() || aiStore.loading"
          class="w-10 h-10 bg-primary hover:bg-primary-dark disabled:bg-gray-200
                 text-white rounded-xl transition-all duration-200 flex items-center
                 justify-center shrink-0 active:scale-95"
        >
          <Icon
            :name="aiStore.loading ? 'heroicons:arrow-path' : 'heroicons:paper-airplane'"
            class="w-4 h-4"
            :class="{ 'animate-spin': aiStore.loading }"
          />
        </button>
      </form>
      <!-- <p class="text-xs text-gray-400 mt-2 text-center">
        KirefraisBot peut faire des erreurs. Consultez un professionnel pour des conseils médicaux.
      </p> -->
      <p class="text-xs text-primary/70 mt-2 text-center font-medium">
        KirefraisBot est votre allié expert pour une alimentation équilibrée et savoureuse au quotidien.
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import AiKitCard from '~/components/ai/AiKitCard.vue'

const aiStore   = useAiStore()
const cartStore = useCartStore()

const inputMessage      = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const suggestions = [
  '🥗 Comment faire une salade fraîche ?',
  '⚖️ Je veux perdre du poids',
  '💪 Aliments riches en protéines',
  '🍽️ Menu équilibré pour la semaine',
  '🤰 Alimentation pendant la grossesse',
  '🥦 Légumes à privilégier',
]

const messageCount = ref(0)
const MAX_GUEST_MESSAGES = 5

async function sendMessage() {
  const { status } = useAuth()
  
  // Limite pour les invités
  if (status.value !== 'authenticated' && messageCount.value >= MAX_GUEST_MESSAGES) {
    toast.error('Limite de messages atteinte. Connectez-vous pour continuer à discuter !')
    return
  }

  const msg = inputMessage.value.trim()
  if (!msg || aiStore.loading) return
  inputMessage.value = ''
  await aiStore.sendMessage(msg)

  if (status.value !== 'authenticated') {
    messageCount.value++
  }

  scrollToBottom()
}

function sendSuggestion(s: string) {
  inputMessage.value = s.replace(/^[^\s]+ /, '')
  sendMessage()
}

function onAddToCart(kit: any) {
  cartStore.add(kit, 2)
  toast.success(`${kit.name} ajouté au panier !`)
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value)
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}

function renderMarkdown(text: string): string {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

watch(() => aiStore.messages.length, scrollToBottom)
</script>
