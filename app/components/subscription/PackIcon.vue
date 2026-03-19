<template>
  <div class="relative w-full h-full flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
    <div class="relative w-full h-full flex items-center justify-center">
      <!-- Public URL paths are more reliable for dynamic static assets in NuxtImg -->
      <NuxtImg 
        :src="iconSrc" 
        class="w-full h-full object-contain"
        :class="animationClass"
        loading="lazy"
        format="webp"
        quality="80"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'bronze' | 'silver' | 'gold' | 'diamond'
}>()

const iconSrc = computed(() => {
  // Direct public URLs for assets located in public/images/abonnements/
  switch (props.type) {
    case 'bronze': return '/images/abonnements/Bronze.png'
    case 'silver': return '/images/abonnements/Silver.png'
    case 'gold':   return '/images/abonnements/gold.png'
    case 'diamond': return '/images/abonnements/diamond.png'
    default: return ''
  }
})

const animationClass = computed(() => {
  switch (props.type) {
    case 'bronze': return 'animate-float-subtle'
    case 'silver': return 'animate-silver-pulse'
    case 'gold':   return 'animate-gold-wave'
    case 'diamond': return 'animate-diamond-sparkle'
    default: return ''
  }
})
</script>

<style scoped>
@keyframes float-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.animate-float-subtle {
  animation: float-subtle 4s infinite ease-in-out;
}

@keyframes silver-pulse {
  0%, 100% { filter: brightness(1); transform: scale(1); }
  50% { filter: brightness(1.1); transform: scale(1.03); }
}
.animate-silver-pulse {
  animation: silver-pulse 3s infinite ease-in-out;
}

@keyframes gold-wave {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(244, 164, 0, 0.2)); transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  75% { transform: rotate(-1deg); }
  50% { filter: drop-shadow(0 0 15px rgba(244, 164, 0, 0.4)); }
}
.animate-gold-wave {
  animation: gold-wave 5s infinite ease-in-out;
}

@keyframes diamond-sparkle {
  0%, 100% { filter: saturate(1) contrast(1); }
  50% { filter: saturate(1.2) contrast(1.1) brightness(1.1); transform: scale(1.04); }
}
.animate-diamond-sparkle {
  animation: diamond-sparkle 3s infinite ease-in-out;
}
</style>
