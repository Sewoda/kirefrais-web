<template>
  <article class="bg-white rounded-2xl shadow-card hover:shadow-hover
                  transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
    <NuxtLink :to="`/catalogue/${kit.slug}`">
      <div class="relative aspect-[4/3] overflow-hidden">
        <NuxtImg
          :src="coverImage"
          :alt="kit.name"
          width="400" height="300"
          format="webp"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute top-3 left-3 flex gap-1.5">
          <span v-if="kit.is_new"
                class="bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Nouveau
          </span>
          <span v-if="kit.is_vegetarian"
                class="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Végé 🌿
          </span>
        </div>
        <div class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm
                    text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <Icon name="heroicons:clock" class="w-3 h-3" />
          {{ kit.prep_time }} min
        </div>
      </div>
    </NuxtLink>

    <div class="p-4">
      <div class="flex items-start justify-between gap-2 mb-1.5">
        <NuxtLink :to="`/catalogue/${kit.slug}`">
          <h3 class="font-display font-semibold text-gray-900 text-base leading-snug
                     hover:text-primary transition-colors">
            {{ kit.name }}
          </h3>
        </NuxtLink>
        <div class="flex items-center gap-1 shrink-0">
          <Icon name="heroicons:star-solid" class="w-3.5 h-3.5 text-secondary" />
          <span class="text-sm font-semibold text-gray-700">{{ Number(kit.rating_avg || 0).toFixed(1) }}</span>
        </div>
      </div>

      <div class="flex items-center gap-2 mb-4">
        <div class="flex gap-0.5">
          <span
            v-for="i in 3"
            :key="i"
            :class="i <= difficultyLevel ? 'bg-primary' : 'bg-gray-200'"
            class="h-1.5 w-4 rounded-full"
          />
        </div>
        <span class="text-xs text-gray-400">{{ difficultyLabel }}</span>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-400">À partir de</p>
          <p class="font-mono font-semibold text-secondary text-lg">{{ format(kit.prices['1p']) }}</p>
        </div>
        <button
          class="bg-primary hover:bg-primary-dark text-white font-semibold text-sm
                 px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95
                 flex items-center gap-1.5"
          @click.prevent="$emit('add-to-cart', kit)"
        >
          <Icon name="heroicons:plus" class="w-4 h-4" />
          Ajouter
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Kit } from '~/types/kit'

const props = defineProps<{ kit: Kit }>()
defineEmits<{ 'add-to-cart': [kit: Kit] }>()

const { format } = useFormatPrice()

const coverImage = computed(() => {
  if (Array.isArray(props.kit.images) && props.kit.images.length > 0) return props.kit.images[0]
  if (typeof props.kit.images === 'string') {
    try {
      const parsed = JSON.parse(props.kit.images)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0]
    } catch {}
    // Remove brackets/quotes just in case and use it
    const cleaned = String(props.kit.images).replace(/^\[["']|["']\]$/g, '')
    if (cleaned && cleaned.includes('http')) return cleaned
  }
  return '/placeholder.jpg'
})

const difficultyLevel = computed(() =>
  ({ easy: 1, medium: 2, hard: 3 }[props.kit.difficulty] ?? 1)
)
const difficultyLabel = computed(() =>
  ({ easy: 'Facile', medium: 'Moyen', hard: 'Difficile' }[props.kit.difficulty])
)
</script>
