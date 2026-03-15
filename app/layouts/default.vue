<template>
  <div class="min-h-screen bg-white flex flex-col font-sans">
    <AppHeader />
    <!-- Spacer for fixed header -->
    <div class="h-20 lg:h-24"></div>
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <CartDrawer />
  </div>
</template>

<script setup lang="ts">
// Les composants seront auto-importés par Nuxt s'ils sont dans app/components
</script>
