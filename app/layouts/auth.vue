<template>
  <div class="min-h-screen bg-brand-cream/50 flex items-center justify-center px-4 py-12 font-sans">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <NuxtLink to="/" class="inline-flex items-center gap-3">
          <AppLogo class="h-12 w-auto" />
          <span class="text-2xl font-display font-black text-primary uppercase tracking-widest">Kirefrais</span>
        </NuxtLink>
      </div>
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 lg:p-12">
        <slot />
      </div>
      
      <div class="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
        &copy; {{ new Date().getFullYear() }} Kirefrais — Togo
      </div>
    </div>
  </div>
</template>
