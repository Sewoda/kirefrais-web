<template>
  <div class="relative">
    <!-- Bell Button -->
    <button @click="isOpen = !isOpen" class="relative p-3 rounded-2xl hover:bg-gray-100 transition-all">
      <Icon name="heroicons:bell" class="w-6 h-6 text-gray-500" />
      <span v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-50">
        <div class="absolute inset-0" @click="isOpen = false" />
        <div class="absolute top-20 right-4 md:right-12 w-full max-w-md">
          <div class="bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden">
            <!-- Header -->
            <div class="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 class="font-display font-bold text-lg text-gray-900">Notifications</h3>
              <button v-if="unreadCount > 0" @click="markAllRead" class="text-primary font-bold text-xs uppercase tracking-widest hover:underline">
                Tout lire
              </button>
            </div>

            <!-- List -->
            <div class="max-h-96 overflow-y-auto divide-y divide-gray-50">
              <div v-if="!notifications?.length" class="py-16 text-center">
                <Icon name="heroicons:bell-slash" class="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p class="text-xs text-gray-400 font-bold uppercase tracking-widest">Aucune notification</p>
              </div>
              <div
                v-for="notif in notifications"
                :key="notif.id"
                @click="markAsRead(notif)"
                class="p-5 flex items-start gap-4 cursor-pointer transition-colors"
                :class="notif.is_read ? 'bg-white hover:bg-gray-50' : 'bg-primary/5 hover:bg-primary/10'"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  :class="notifStyle(notif.type).bg">
                  <Icon :name="notifStyle(notif.type).icon" class="w-5 h-5" :class="notifStyle(notif.type).text" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-gray-900 truncate">{{ notif.title }}</p>
                  <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ notif.body }}</p>
                  <p class="text-[10px] text-gray-300 font-bold mt-2">{{ notif.created_at }}</p>
                </div>
                <div v-if="!notif.is_read" class="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              </div>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t border-gray-50 text-center">
              <NuxtLink to="/profil/notifications" @click="isOpen = false" class="text-primary font-bold text-xs uppercase tracking-widest hover:underline">
                Voir toutes les notifications
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const { api } = useApi()
import { useNotificationsStore } from '~/stores/notifications'

const isOpen = ref(false)

const { data: notifications, refresh } = await useAsyncData(
  'user-notifications-dropdown',
  () => api<any[]>('/notifications').catch(() => [])
)

const unreadCount = computed(() =>
  notifications.value?.filter((n: any) => !n.is_read).length || 0
)

function notifStyle(type: string) {
  switch (type) {
    case 'order_confirmed':
      return { icon: 'heroicons:check-circle', bg: 'bg-green-100', text: 'text-green-600' }
    case 'delivery_started':
      return { icon: 'heroicons:truck', bg: 'bg-blue-100', text: 'text-blue-600' }
    case 'delivery_complete':
      return { icon: 'heroicons:home', bg: 'bg-purple-100', text: 'text-purple-600' }
    default:
      return { icon: 'heroicons:bell', bg: 'bg-gray-100', text: 'text-gray-500' }
  }
}

async function markAsRead(notif: any) {
  if (notif.is_read) return
  try {
    await api(`/notifications/${notif.id}/read`, { method: 'PATCH' })
    notif.is_read = true
  } catch { /* silent */ }
}

async function markAllRead() {
  try {
    await api('/notifications/read-all', { method: 'PUT' })
    notifications.value?.forEach((n: any) => n.is_read = true)
    toast.success('Toutes les notifications lues.')
  } catch { /* silent */ }
}
</script>
