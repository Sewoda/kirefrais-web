<template>
  <div class="flex items-center gap-3 bg-white border border-gray-100
              rounded-xl p-3 hover:border-primary/30 transition-all duration-200 group">
    <NuxtImg
      v-if="coverImage"
      :src="coverImage" :alt="kit.name"
      width="56" height="56"
      class="w-14 h-14 rounded-lg object-cover shrink-0"
    />
    <div v-else class="w-14 h-14 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
      <Icon name="heroicons:cake" class="w-6 h-6 text-primary" />
    </div>

    <div class="flex-1 min-w-0">
      <NuxtLink
        :to="`/catalogue/${kit.slug}`"
        class="font-semibold text-gray-900 text-sm hover:text-primary truncate block transition-colors"
      >
        {{ kit.name }}
      </NuxtLink>
      <div class="flex items-center gap-2 mt-0.5">
        <span class="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">2P</span>
        <span class="text-xs text-gray-300">•</span>
        <Icon name="heroicons:clock" class="w-3 h-3 text-gray-400" />
        <span class="text-xs text-gray-500">{{ kit.prep_time }} min</span>
      </div>
      <p class="font-mono font-semibold text-secondary text-sm mt-1">
        {{ format(kit.prices?.['2p'] || kit.price_2p || kit.price_1p) }}
      </p>
    </div>

    <button
      class="shrink-0 bg-primary hover:bg-primary-dark text-white text-xs
             font-semibold px-3 py-1.5 rounded-lg transition-all duration-200
             active:scale-95 opacity-80 group-hover:opacity-100"
      @click="$emit('add-to-cart')"
    >
      <Icon name="heroicons:plus" class="w-3.5 h-3.5 inline mr-0.5" />
      Panier
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ kit: any }>()
defineEmits<{ 'add-to-cart': [] }>()
const { format } = useFormatPrice()

const coverImage = computed(() => {
  if (props.kit.image) return props.kit.image
  if (Array.isArray(props.kit.images) && props.kit.images.length > 0) return props.kit.images[0]
  if (typeof props.kit.images === 'string') {
    try {
      const parsed = JSON.parse(props.kit.images)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0]
    } catch {}
    const cleaned = String(props.kit.images).replace(/^\[["']|["']\]$/g, '')
    if (cleaned && cleaned.includes('http')) return cleaned
  }
  return false
})
</script>
