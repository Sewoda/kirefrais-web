<template>
  <div class="relative">
    <div class="relative group">
      <Icon name="heroicons:map-pin" class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors z-10" />
      <input
        ref="inputRef"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full bg-gray-50 border border-transparent rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
      />
    </div>

    <!-- Selected address preview -->
    <div v-if="selectedPlace" class="mt-3 bg-primary/5 rounded-xl p-4 flex items-start gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <p class="text-sm font-bold text-gray-900">{{ selectedPlace.address }}</p>
        <p class="text-[10px] text-gray-400 font-mono mt-1">{{ selectedPlace.lat.toFixed(6) }}, {{ selectedPlace.lng.toFixed(6) }} — {{ selectedPlace.city }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'place-selected': [place: { address: string; lat: number; lng: number; city: string }]
}>()

const inputRef = ref<HTMLInputElement>()
const selectedPlace = ref<{ address: string; lat: number; lng: number; city: string } | null>(null)
const { initAutocomplete } = useGoogleMaps()

onMounted(() => {
  if (!inputRef.value) return

  // Small delay to wait for maps script
  setTimeout(() => {
    initAutocomplete(inputRef.value!, (place) => {
      selectedPlace.value = place
      emit('update:modelValue', place.address)
      emit('place-selected', place)
    })
  }, 500)
})
</script>
