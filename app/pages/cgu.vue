<template>
  <div class="font-sans relative overflow-hidden bg-white min-h-screen">
    <!-- Decorative Corner Backgrounds -->
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-hero-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
    <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-hero-orange/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"></div>
    
    <!-- Hero Header -->
    <section class="relative z-10 pt-24 pb-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-6 tracking-tight">
          Conditions Générales d'Utilisation
        </h1>
        <p class="text-gray-500 font-medium text-lg">Dernière mise à jour : Mars 2026</p>
      </div>
    </section>

    <!-- Content -->
    <section class="relative z-10 page-container pb-24">
      <div class="max-w-3xl mx-auto">
        <div class="prose prose-lg prose-gray max-w-none text-gray-600 font-medium leading-relaxed">
          <h2 class="font-display font-bold text-2xl text-gray-900 mt-0 mb-6">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation et de Vente régissent l'utilisation de la plateforme Kirefrais et la vente de kits de repas à domicile au Togo. En utilisant notre site ou notre application, vous acceptez pleinement ces règles de fonctionnement et de vente.
          </p>
          
          <h2 class="font-display font-bold text-2xl text-gray-900 mt-12 mb-6">2. Inscription et Commandes</h2>
          <p>
            Pour commander, vous devez créer un compte sur notre plateforme avec des informations exactes et votre numéro de contact actif. Les prix de nos kits, indiqués en francs CFA (XOF), incluent ou excluent les frais de livraison selon la zone et l'heure de livraison choisie.
          </p>
          
          <h2 class="font-display font-bold text-2xl text-gray-900 mt-12 mb-6">3. Livraisons et Qualité</h2>
          <p>
            Nous nous engageons à livrer dans les créneaux horaires stipulés. En cas d’impossibilité de livrer du fait d’informations de contact ou de lieu erronées de votre part, aucune garantie de remboursement n'est appliquée en raison de la nature périssable des aliments frais.
          </p>
          
          <h2 class="font-display font-bold text-2xl text-gray-900 mt-12 mb-6">4. Tarifs et Paiements</h2>
          <p>
            Les prix de nos abonnements et de nos kits à l'unité sont clairement affichés lors de la sélection. Les paiements s'effectuent par Mobile Money (Tmoney, Flooz) ou par carte bancaire. Les abonnements sont facturés de manière récurrente jusqu'à leur annulation.
          </p>

          <h2 class="font-display font-bold text-2xl text-gray-900 mt-12 mb-6">5. Rétractation et Annulation</h2>
          <p>
            De par leur nature très vite périssable, les produits alimentaires frais ne sont soumis à aucun droit de rétractation après validation et expédition de votre commande. Toutefois, l'abonnement Kirefrais reste 100% flexible : vous pouvez l'annuler ou le suspendre à tout moment avant la date butoir définie chaque semaine.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Conditions Générales — Kirefrais',
  description: 'Conditions générales d\'utilisation et de vente de Kirefrais.'
})
</script>
