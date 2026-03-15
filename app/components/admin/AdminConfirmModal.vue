<!-- components/admin/AdminConfirmModal.vue -->
<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" @click="$emit('cancel')" />
    <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 overflow-hidden animate-in fade-in zoom-in duration-200">
      <div class="flex items-start gap-4 mb-4">
        <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h3 class="font-display font-bold text-gray-900 text-lg">{{ title }}</h3>
          <p class="text-gray-500 text-sm mt-1 leading-relaxed">{{ description }}</p>
        </div>
      </div>
      <div class="flex gap-3 mt-8">
        <button
          class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold
                 text-gray-700 hover:bg-gray-50 transition-colors"
          @click="$emit('cancel')"
        >
          Annuler
        </button>
        <button
          class="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold
                 hover:bg-red-600 transition-colors shadow-sm"
          @click="$emit('confirm')"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  confirmLabel?: string
}>()

defineEmits(['confirm', 'cancel'])
</script>
