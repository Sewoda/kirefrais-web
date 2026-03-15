<template>
  <div class="font-sans relative overflow-hidden bg-brand-cream/30 min-h-screen">
    <!-- Floating Background Elements -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute top-1/4 -right-20 opacity-5">
        <Icon name="material-symbols:security-rounded" class="w-96 h-96" />
      </div>
      <div class="absolute bottom-1/4 -left-20 opacity-5">
        <Icon name="material-symbols:visibility-outline-rounded" class="w-80 h-80" />
      </div>
    </div>

    <!-- Hero Header -->
    <header class="relative z-10 pt-24 pb-20 px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm border border-gray-100 mb-6">
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Protection de la vie privée</span>
      </div>
      <h1 class="font-display font-black text-4xl md:text-6xl text-gray-900 tracking-tighter mb-4">
        Vos données sont <span class="text-primary italic">en sécurité.</span>
      </h1>
      <p class="text-gray-500 font-medium text-lg">Dernière mise à jour : Mars 2026 • Lomé, Togo</p>
    </header>

    <!-- Content Stream -->
    <section class="relative z-10 max-w-4xl mx-auto px-6 pb-32">
      <div class="space-y-24">
        
        <!-- Intro Section -->
        <div class="relative pl-8 md:pl-16">
          <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-transparent rounded-full shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"></div>
          <p class="text-xl md:text-2xl text-gray-700 font-bold leading-relaxed italic">
            "Chez Kirefrais, la protection de vos données personnelles est primordiale. Nous collectons uniquement ce qui nous permet de vous servir le meilleur du Togo, chez vous."
          </p>
        </div>

        <!-- Section 1 : Collecte -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:fingerprint-rounded" class="w-6 h-6" />
          </div>
          <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 mb-6">1. Collecte des données</h2>
          <div class="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-white/60">
            <p class="text-gray-700 font-medium text-lg leading-relaxed">
              Nous collectons votre nom, numéro de téléphone, adresse email et adresse physique exacte lors de la création de votre compte, uniquement dans le but d'assurer la livraison de nos kits recettes jusqu'à votre domicile avec une précision maximale.
            </p>
          </div>
        </div>

        <!-- Section 2 : Utilisation -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:checklist-rounded" class="w-6 h-6" />
          </div>
          <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 mb-6">2. Utilisation de vos informations</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="(item, i) in usages" :key="i" 
                 class="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/60 flex items-start gap-4 hover:bg-white/60 transition-colors">
              <Icon name="material-symbols:check-circle-rounded" class="w-6 h-6 text-green-500 shrink-0" />
              <span class="text-gray-700 font-bold text-sm">{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- Section 3 : Partage -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:share-rounded" class="w-6 h-6" />
          </div>
          <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 mb-6">3. Partage d'informations</h2>
          <div class="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10">
              <Icon name="material-symbols:no-accounts-rounded" class="w-24 h-24" />
            </div>
            <p class="text-lg font-bold mb-6 relative z-10">
              Nous ne vendons et ne vendrons jamais vos informations personnelles.
            </p>
            <div class="flex flex-wrap gap-3 relative z-10">
              <span class="bg-white/10 px-4 py-2 rounded-xl text-sm font-black border border-white/10 uppercase tracking-tighter">Livreurs Partenaires</span>
              <span class="bg-white/10 px-4 py-2 rounded-xl text-sm font-black border border-white/10 uppercase tracking-tighter">TMoney / Flooz</span>
              <span class="bg-white/10 px-4 py-2 rounded-xl text-sm font-black border border-white/10 uppercase tracking-tighter">Mastercard / Visa</span>
            </div>
          </div>
        </div>

        <!-- Section 4 : Vos droits -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:person-edit-rounded" class="w-6 h-6" />
          </div>
          <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 mb-6">4. Vos droits</h2>
          <div class="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-white/60">
            <p class="text-gray-700 font-medium text-lg leading-relaxed">
              Conformément aux lois applicables au Togo, vous avez le droit de consulter, de modifier ou de supprimer vos informations personnelles. Vous pouvez gérer ces informations depuis vos paramètres ou en contactant notre support.
            </p>
          </div>
        </div>

        <!-- Section 5 : Sécurité -->
        <div class="group relative pl-8 md:pl-16">
          <div class="absolute left-0 top-0 w-12 h-12 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
            <Icon name="material-symbols:lock-rounded" class="w-6 h-6" />
          </div>
          <h2 class="font-display font-black text-2xl md:text-3xl text-gray-900 mb-6">5. Sécurité</h2>
          <div class="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-white/60 border-l-8 border-l-purple-500">
            <p class="text-gray-700 font-medium text-lg leading-relaxed">
              Nous mettons en place des protocoles de sécurité avancés et un chiffrement standard de l'industrie pour protéger la plateforme. Les mots de passe sont hachés et nos pare-feux sont opérationnels 24/7.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- Footer decoration -->
    <div class="text-center pb-20 opacity-20">
      <Icon name="material-symbols:verified-user-rounded" class="w-16 h-16 mx-auto mb-4" />
      <p class="font-black text-xs uppercase tracking-[0.5em]">Kirefrais Secure Environment</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Confidentialité — Kirefrais',
  description: 'Politique de confidentialité et protection des données sur Kirefrais.'
})

const usages = [
  "Gestion des commandes et abonnements",
  "Optimisation des itinéraires de livraison",
  "Communication (Email, SMS, WhatsApp)",
  "Recommandations de recettes personnalisées",
  "Support client réactif",
  "Sécurisation des transactions"
]
</script>

<style scoped>
.font-display { font-family: 'Outfit', sans-serif; }
</style>
