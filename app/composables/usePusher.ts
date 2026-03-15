import Pusher from 'pusher-js'

export const usePusher = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  let pusherInstance: Pusher | null = null

  const connect = () => {
    if (pusherInstance) return pusherInstance
    if (!config.public.pusherKey) return null

    pusherInstance = new Pusher(config.public.pusherKey as string, {
      cluster: (config.public.pusherCluster as string) || 'eu',
      forceTLS: true,
    })

    return pusherInstance
  }

  const subscribeToOrderUpdates = (
    orderId: number,
    callbacks: {
      onStatusChanged?: (data: { status: string; order_id: number }) => void
      onLocationUpdated?: (data: { latitude: number; longitude: number; order_id: number }) => void
    }
  ) => {
    const pusher = connect()
    if (!pusher) return null

    const channel = pusher.subscribe(`order.${orderId}`)

    if (callbacks.onStatusChanged) {
      channel.bind('OrderStatusChanged', callbacks.onStatusChanged)
    }
    if (callbacks.onLocationUpdated) {
      channel.bind('DelivererLocationUpdated', callbacks.onLocationUpdated)
    }

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(`order.${orderId}`)
    }
  }

  const subscribeToUserNotifications = (
    userId: number,
    onNotification: (data: any) => void
  ) => {
    const pusher = connect()
    if (!pusher) return null

    const channel = pusher.subscribe(`user.${userId}`)
    channel.bind('NewNotification', onNotification)

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(`user.${userId}`)
    }
  }

  const disconnect = () => {
    if (pusherInstance) {
      pusherInstance.disconnect()
      pusherInstance = null
    }
  }

  return {
    connect,
    disconnect,
    subscribeToOrderUpdates,
    subscribeToUserNotifications
  }
}
