<template>
  <span :class="config.class" class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full">
    <span :class="config.dot" class="w-1.5 h-1.5 rounded-full" />
    {{ config.label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ status: string }>()

const statusConfig: Record<string, { label: string; class: string; dot: string }> = {
  pending:    { label: 'En attente',     class: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  paid:       { label: 'Payé',           class: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500'   },
  preparing:  { label: 'En préparation', class: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500' },
  ready:      { label: 'Prêt',           class: 'bg-cyan-100 text-cyan-700',     dot: 'bg-cyan-500'   },
  delivering: { label: 'En livraison',   class: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  delivered:  { label: 'Livré ✓',        class: 'bg-green-100 text-green-700',   dot: 'bg-green-500'  },
  cancelled:  { label: 'Annulé',         class: 'bg-red-100 text-red-700',       dot: 'bg-red-500'    },
}

const config = computed(() => statusConfig[props.status] || statusConfig.pending)
</script>
