<template>
  <div class="flex items-center gap-2">
    <img
      src="~/assets/images/logo.jpeg"
      alt="Kirefrais Logo"
      class="h-10 w-auto rounded-lg"
      :class="props.class"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>
