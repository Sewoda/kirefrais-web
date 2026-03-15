<template>
  <div class="font-sans relative overflow-hidden bg-brand-cream/30 min-h-screen">
    <!-- Floating Background Elements -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute top-1/4 -right-10 opacity-5">
        <Icon name="material-symbols:policy-outline-rounded" class="w-80 h-80" />
      </div>
      <div class="absolute bottom-1/4 -left-10 opacity-5">
        <Icon name="material-symbols:gavel-rounded" class="w-72 h-72" />
      </div>
    </div>
    
    <!-- Hero Header -->
    <section class="relative z-10 pt-24 pb-16 px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6">
        <Icon name="material-symbols:shield-lock-rounded" class="w-5 h-5 text-primary" />
        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Informations Juridiques</span>
      </div>
      <h1 class="font-display font-black text-4xl md:text-6xl text-gray-900 mb-6 tracking-tight">
        Mentions <span class="text-primary">Légales</span>
      </h1>
      <p class="text-gray-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
        Le cadre juridique qui définit l'exploitation de la plateforme Kirefrais au Togo.
      </p>
    </section>

    <!-- Content Stream -->
    <section class="relative z-10 max-w-5xl mx-auto px-6 pb-32">
      <div class="space-y-24">
        
        <!-- Section 1 : Éditeur -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute inset-y-0 left-0 w-1 bg-primary/20 rounded-full"></div>
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:domain-rounded" class="w-6 h-6" />
          </div>
          
          <div class="grid lg:grid-cols-[1fr_2fr] gap-8">
            <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 leading-tight">Éditeur du Service</h2>
            <div class="space-y-6">
              <p class="text-gray-700 font-medium text-lg leading-relaxed">
                Le site Internet et l'application <strong>Kirefrais</strong> sont édités et exploités au Togo. Nous nous engageons à offrir un service transparent et conforme aux règlementations en vigueur.
              </p>
              <div class="grid sm:grid-cols-2 gap-4">
                <div class="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/60">
                  <p class="text-xs font-bold text-gray-400 uppercase mb-2">Siège Social</p>
                  <p class="text-gray-900 font-bold">Lomé, Togo</p>
                </div>
                <div class="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/60">
                  <p class="text-xs font-bold text-gray-400 uppercase mb-2">Contact Direct</p>
                  <p class="text-gray-900 font-bold">contact@kirefrais.tg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2 : Publication -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute inset-y-0 left-0 w-1 bg-secondary/20 rounded-full"></div>
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:person-rounded" class="w-6 h-6" />
          </div>
          
          <div class="grid lg:grid-cols-[1fr_2fr] gap-8">
            <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 leading-tight">Directeur de Publication</h2>
            <div class="space-y-6">
              <p class="text-gray-700 font-medium text-lg leading-relaxed">
                Responsable de la Publication : <strong>L'Équipe Kirefrais</strong>. 
                Toutes les opérations commerciales sont effectuées dans le respect strict des normes de sécurité alimentaire et d'hygiène.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 3 : Hébergement -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute inset-y-0 left-0 w-1 bg-blue-500/20 rounded-full"></div>
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:dns-rounded" class="w-6 h-6" />
          </div>
          
          <div class="grid lg:grid-cols-[1fr_2fr] gap-8">
            <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 leading-tight">Hébergement</h2>
            <div class="space-y-6">
              <p class="text-gray-700 font-medium text-lg leading-relaxed">
                La plateforme Kirefrais est hébergée sur des infrastructures cloud mondiales (AWS / Vercel), garantissant une haute disponibilité et une sécurité maximale pour vos données.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 4 : Propriété -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute inset-y-0 left-0 w-1 bg-green-500/20 rounded-full"></div>
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:copyright-rounded" class="w-6 h-6" />
          </div>
          
          <div class="grid lg:grid-cols-[1fr_2fr] gap-8">
            <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 leading-tight">Propriété Intellectuelle</h2>
            <div class="space-y-6">
              <div class="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-white/60">
                <p class="text-gray-700 font-medium text-lg leading-relaxed m-0">
                  Tous les logos, graphismes, recettes, visuels de kits et fiches étapes sont la propriété exclusive de <strong>Kirefrais</strong>. Toute reproduction même partielle sans autorisation expresse est totalement interdite.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Footer decoration -->
    <div class="text-center pb-20 opacity-20">
      <Icon name="material-symbols:verified-rounded" class="w-16 h-16 mx-auto mb-4" />
      <p class="font-black text-xs uppercase tracking-[0.5em]">Kirefrais Legal Framework</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Mentions Légales — Kirefrais',
  description: 'Éditeur du site et informations juridiques de Kirefrais.'
})
</script>

<style scoped>
.font-display { font-family: 'Outfit', sans-serif; }
</style>
