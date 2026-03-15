export const useGeolocation = () => {
  const { api }   = useApi()
  let watchId: number | null = null

  const startTracking = (orderId: number) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return

    watchId = navigator.geolocation.watchPosition(
      async ({ coords }) => {
        await api('/livreur/deliveries/update-location', {
          method: 'POST',
          body:   { order_id: orderId, latitude: coords.latitude, longitude: coords.longitude },
        })
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 15_000 }
    )
  }

  const stopTracking = () => {
    if (typeof navigator !== 'undefined' && watchId !== null) navigator.geolocation.clearWatch(watchId)
  }

  return { startTracking, stopTracking }
}
