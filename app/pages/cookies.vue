<template>
  <div class="font-sans relative overflow-hidden bg-white min-h-screen">
    <!-- Decorative Corner Backgrounds -->
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-hero-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
    <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-hero-orange/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"></div>
    
    <!-- Hero Header -->
    <section class="relative z-10 pt-24 pb-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-6 tracking-tight">
          Politique des Cookies
        </h1>
        <p class="text-gray-500 font-medium text-lg">Dernière mise à jour : Mars 2026</p>
      </div>
    </section>

    <!-- Content -->
    <section class="relative z-10 page-container pb-24">
      <div class="max-w-3xl mx-auto">
        <div class="prose prose-lg prose-gray max-w-none text-gray-600 font-medium leading-relaxed">
          <p class="mb-8">
            Pour garantir le bon fonctionnement de la plateforme Kirefrais, nous utilisons des "cookies", de petits fichiers texte placés sur l'appareil que vous utilisez pour naviguer sur le site, ou notre application mobile.
          </p>
          
          <h2 class="font-display font-bold text-2xl text-gray-900 mt-12 mb-6">1. Que sont les Cookies ?</h2>
          <p>
            Les cookies nous permettent de vous identifier de manière sécurisée et d'améliorer votre expérience de navigation. Grâce à eux, nous n'avons pas besoin de vous redemander à chaque page votre identité (pour l'authentification).
          </p>
          
          <h2 class="font-display font-bold text-2xl text-gray-900 mt-12 mb-6">2. Cookies Essentiels</h2>
          <p>
            Certains cookies de cette plateforme permettent de :
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Vous maintenir connecté de manière sécurisée et se souvenir du contenu de votre panier en cours.</li>
            <li>Prévenir toute tentative de piratage, type CSRF, de votre espace personnel Kirefrais.</li>
          </ul>
          
          <h2 class="font-display font-bold text-2xl text-gray-900 mt-12 mb-6">3. Cookies de Performance</h2>
          <p>
            Des cookies de suivi anonyme peuvent être utilisés pour nous indiquer quelles sont les sections, recettes, ou pages les plus visionnées de Kirefrais. Ces données (issues d'outils analytiques) nous aident à améliorer constamment le site et mettre en évidence les plats que vous plébiscitez le plus.
          </p>
          
          <h2 class="font-display font-bold text-2xl text-gray-900 mt-12 mb-6">4. Gestion de vos préférences</h2>
          <p>
            Vous avez toujours la possibilité de refuser les cookies ou supprimer l'historique de suivi via les préférences de confidentialité de votre navigateur Web. Toutefois, sans les cookies "essentiels", des éléments cruciaux (comme commander ou s'authentifier) ne fonctionneront pas.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Cookies — Kirefrais',
  description: 'Informations sur l\'utilisation des cookies par la plateforme Kirefrais.'
})
</script>
