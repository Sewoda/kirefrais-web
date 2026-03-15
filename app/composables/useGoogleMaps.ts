export const useGoogleMaps = () => {
  const config = useRuntimeConfig()

  const isLoaded = ref(false)

  const initAutocomplete = (
    inputElement: HTMLInputElement,
    onPlaceSelected: (place: {
      address: string
      lat: number
      lng: number
      city: string
    }) => void
  ) => {
    if (typeof google === 'undefined' || !google.maps?.places) {
      console.warn('Google Maps not loaded yet')
      return
    }

    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      componentRestrictions: { country: 'tg' },
      fields: ['formatted_address', 'geometry', 'address_components'],
      types: ['address']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.geometry?.location) return

      const city = place.address_components?.find(c =>
        c.types.includes('locality')
      )?.long_name || 'Lomé'

      onPlaceSelected({
        address: place.formatted_address || '',
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        city
      })
    })

    return autocomplete
  }

  const createMap = (
    container: HTMLElement,
    options?: {
      center?: { lat: number; lng: number }
      zoom?: number
    }
  ) => {
    if (typeof google === 'undefined') return null

    return new google.maps.Map(container, {
      center: options?.center || { lat: 6.1725, lng: 1.2314 }, // Lomé
      zoom: options?.zoom || 13,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      styles: [
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      ]
    })
  }

  const addMarker = (
    map: any,
    position: { lat: number; lng: number },
    options?: { title?: string; icon?: string }
  ) => {
    if (typeof google === 'undefined') return null

    return new google.maps.Marker({
      map,
      position,
      title: options?.title,
      animation: google.maps.Animation.DROP,
    })
  }

  return {
    isLoaded,
    initAutocomplete,
    createMap,
    addMarker
  }
}
