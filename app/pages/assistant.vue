<template>
  <div class="max-w-5xl mx-auto py-8">
    <!-- Header -->
    <!-- <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
          <Icon name="heroicons:sparkles" class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="font-display font-bold text-2xl md:text-3xl text-gray-900">
            Assistant <span class="text-primary">KirefraisBot</span>
          </h1>
          <p class="text-gray-500 text-sm">
            Conseils nutrition, recettes étape par étape, recommandations de kits.
          </p>
        </div>
      </div>
    </div> -->

    <div class="grid lg:grid-cols-[260px_1fr] gap-6 h-[75vh]">

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

      <!-- Chat -->
      <AiChat class="h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AiChat from '~/components/ai/AiChat.vue'
import { toast } from 'vue-sonner'

definePageMeta({ middleware: ['auth'] })

useSeoMeta({
  title:       'Assistant KirefraisBot — Kirefrais',
  description: 'Conseils nutrition, directives de préparation et recommandations de kits personnalisées.',
})

const aiStore = useAiStore()

onMounted(async () => {
  await aiStore.loadConversations()
})

async function deleteConversation(id: number) {
  try {
    await aiStore.deleteConversation(id)
    toast.success('Conversation supprimée')
  } catch {
    toast.error('Erreur lors de la suppression')
  }
}
</script>
