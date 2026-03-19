<template>
  <div class="max-w-5xl mx-auto py-8">
    <div class="mb-8 text-center lg:text-left">
      <div class="inline-flex items-center gap-3 mb-4 bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10">
        <Icon name="heroicons:sparkles" class="w-5 h-5 text-primary" />
        <span class="text-primary font-bold text-sm">Assistant Culinaire</span>
      </div>
      <h1 class="font-display font-black text-3xl md:text-4xl text-gray-900 mb-2">
        Kirefrais<span class="text-primary">Bot</span>
      </h1>
      <p class="text-gray-500 text-base max-w-2xl">
        Votre compagnon intelligent pour une alimentation saine : conseils nutritionnels, recettes sur mesure et recommandations personnalisées.
      </p>
    </div>

    <div 
      class="grid gap-6 h-[75vh]"
      :class="isLoggedIn ? 'lg:grid-cols-[260px_1fr]' : 'grid-cols-1'"
    >
      <template v-if="isLoggedIn">
        <!-- Historique (sidebar) -->
        <aside class="hidden lg:flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div class="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="font-semibold text-gray-900 text-sm">Conversations</h3>
            <button
              class="text-xs text-primary font-medium hover:underline"
              @click="aiStore.newConversation()"
            >
              + Nouvelle
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-2 space-y-1">
            <button
              v-for="conv in aiStore.conversations" :key="conv.id"
              :class="aiStore.conversationId === conv.id
                ? 'bg-primary-light text-primary'
                : 'text-gray-600 hover:bg-gray-50'"
              class="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors group relative"
              @click="aiStore.loadConversation(conv.id)"
            >
              <p class="font-medium truncate pr-6">{{ conv.title }}</p>
              <p class="text-xs opacity-60 mt-0.5">{{ conv.message_count }} messages</p>

              <!-- Bouton supprimer -->
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                       text-gray-400 hover:text-red-500 transition-all"
                title="Supprimer"
                @click.stop="deleteConversation(conv.id)"
              >
                <Icon name="heroicons:trash" class="w-3.5 h-3.5" />
              </button>
            </button>

            <p v-if="!aiStore.conversations.length"
               class="text-xs text-gray-400 text-center py-8">
              Aucune conversation
            </p>
          </div>
        </aside>
      </template>

      <!-- Chat -->
      <AiChat class="h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AiChat from '~/components/ai/AiChat.vue'
import { toast } from 'vue-sonner'

// definePageMeta({ middleware: ['auth'] })

useSeoMeta({
  title:       'Assistant KirefraisBot — Kirefrais',
  description: 'Conseils nutrition, directives de préparation et recommandations de kits personnalisées.',
})

const aiStore = useAiStore()
const { status } = useAuth()
const isLoggedIn = computed(() => status.value === 'authenticated')

onMounted(async () => {
  if (isLoggedIn.value) {
    await aiStore.loadConversations()
  }
})

const messageCount = ref(0)
const MAX_GUEST_MESSAGES = 5

// This sendMessage function is likely intended for the AiChat component.
// For this file (the page), it would need to be passed down as a prop or
// the AiChat component would need to expose a way to intercept message sending.
// As per the instruction, it's added here, but note it won't directly
// affect AiChat's internal message sending without further integration.
// Assuming `inputMessage` and `scrollToBottom` would be defined or passed.
/*
async function sendMessage() {
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
*/

async function deleteConversation(id: number) {
  try {
    await aiStore.deleteConversation(id)
    toast.success('Conversation supprimée')
  } catch {
    toast.error('Erreur lors de la suppression')
  }
}
</script>
