import { defineStore } from 'pinia'

interface AppNotif {
    id: number
    title: string
    body: string
    type: string
    is_read: boolean
    data: Record<string, unknown> | null
    created_at: string
}

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        items: [] as AppNotif[],
        unread: 0,
        loading: false,
    }),

    actions: {
        async fetch() {
            const { api } = useApi()
            this.loading = true
            try {
                const data = await api<{ data: AppNotif[], unread: number }>('/notifications')
                this.items = data.data
                this.unread = data.unread
            } finally {
                this.loading = false
            }
        },

        async markRead(id: number) {
            const { api } = useApi()
            await api(`/notifications/${id}/read`, { method: 'PUT' })
            const notif = this.items.find(n => n.id === id)
            if (notif) { notif.is_read = true; this.unread-- }
        },
    },
})
