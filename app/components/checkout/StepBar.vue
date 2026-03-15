<template>
  <div class="w-full py-4 md:py-8">
    <div class="max-w-3xl mx-auto px-2 sm:px-4">
      <div class="relative flex items-center justify-between">
        <!-- Progress Line Background -->
        <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
          <div 
            class="h-full bg-primary transition-all duration-500 ease-out"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>

        <!-- Steps -->
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="relative flex flex-col items-center gap-1.5 sm:gap-3 z-10"
        >
          <!-- Step Circle -->
          <div 
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300"
            :class="[
              currentStep > index + 1 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : currentStep === index + 1 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 animate-step-pulse' 
                  : 'bg-gray-100 text-gray-400'
            ]"
          >
            <Icon 
              v-if="currentStep > index + 1" 
              name="heroicons:check" 
              class="w-4 h-4 sm:w-5 sm:h-5 animate-in zoom-in duration-300" 
            />
            <span v-else>{{ index + 1 }}</span>
          </div>

          <!-- Step Label -->
          <span 
            class="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 whitespace-nowrap"
            :class="[
              currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-400'
            ]"
          >
            {{ step.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  id: string
  label: string
}

const props = defineProps<{
  currentStep: number // 1 to 4
}>()

const steps: Step[] = [
  { id: 'panier', label: 'Panier' },
  { id: 'adresse', label: 'Adresse' },
  { id: 'creneau', label: 'Créneau' },
  { id: 'paiement', label: 'Paiement' }
]

const progress = computed(() => {
  if (props.currentStep <= 1) return 0
  if (props.currentStep >= 4) return 100
  return ((props.currentStep - 1) / (steps.length - 1)) * 100
})
</script>

<style scoped>
.animate-in {
  animation: zoom-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes zoom-in {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
</style>
