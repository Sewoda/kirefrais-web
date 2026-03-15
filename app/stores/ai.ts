import { defineStore } from 'pinia'

export interface AiMessage {
  id?:      number
  role:     'user' | 'assistant'
  content:  string
  type?:    string
  steps?:   string[]
  tips?:    string[]
  kits?:    any[]
  loading?: boolean
}

interface AiConversation {
  id: number
  title: string
  message_count: number
  created_at: string
}

interface AiState {
  messages:       AiMessage[]
  conversationId: number | null
  loading:        boolean
  conversations:  AiConversation[]
}

export const useAiStore = defineStore('ai', {
  state: (): AiState => ({
    messages:       [],
    conversationId: null,
    loading:        false,
    conversations:  [],
  }),

  actions: {
    async sendMessage(message: string) {
      const { api } = useApi()

      this.messages.push({ role: 'user', content: message })

      const loadingMsg: AiMessage = { role: 'assistant', content: '', loading: true }
      this.messages.push(loadingMsg)
      this.loading = true

      try {
        const data = await api<any>('/ai/chat', {
          method: 'POST',
          body:   { message, conversation_id: this.conversationId },
        })

        const idx = this.messages.lastIndexOf(loadingMsg)
        if (idx !== -1) {
          this.messages[idx] = {
            role:    'assistant',
            content: data.reply,
            type:    data.type,
            steps:   data.steps,
            tips:    data.tips,
            kits:    data.kits,
            loading: false,
          }
        }

        this.conversationId = data.conversation_id

      } catch {
        const idx = this.messages.lastIndexOf(loadingMsg)
        if (idx !== -1) {
          this.messages[idx] = {
            role:    'assistant',
            content: 'Désolé, une erreur est survenue. Réessayez.',
            loading: false,
          }
        }
      } finally {
        this.loading = false
      }
    },

    async loadConversations() {
      const { api } = useApi()
      try {
        this.conversations = await api<AiConversation[]>('/ai/conversations')
      } catch {
        this.conversations = []
      }
    },

    async loadConversation(id: number) {
      const { api } = useApi()
      const data = await api<any>(`/ai/conversations/${id}`)
      this.conversationId = id
      this.messages = data.messages.map((m: any) => ({
        role:    m.role,
        content: m.content,
        type:    m.metadata?.type,
        steps:   m.metadata?.steps ?? [],
        tips:    m.metadata?.tips  ?? [],
        kits:    [],
      }))
    },

    async deleteConversation(id: number) {
      const { api } = useApi()
      await api(`/ai/conversations/${id}`, { method: 'DELETE' })
      this.conversations = this.conversations.filter(c => c.id !== id)
      if (this.conversationId === id) {
        this.newConversation()
      }
    },

    newConversation() {
      this.messages       = []
      this.conversationId = null
    },
  },
})
