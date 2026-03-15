<template>
  <div class="bg-white min-h-screen font-sans pb-24">
    <!-- Hero Editorial -->
    <div class="relative h-[50vh] min-h-[400px] w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <!-- Image d'arrière-plan avec un voile sombre pour l'élégance -->
      <img src="~/assets/images/identite_visuelle.jpeg" class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 class="font-display font-bold text-5xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-lg">Le bien manger,<br>rendu simple.</h1>
        <p class="text-white/95 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
          Nous repensons la façon dont les Togolais cuisinent au quotidien en alliant fraîcheur, praticité et gourmandise.
        </p>
      </div>
    </div>

    <!-- Notre Mission -->
    <div class="max-w-4xl mx-auto px-4 py-24 text-center">
      <h2 class="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6">Notre Mission</h2>
      <p class="font-display text-3xl md:text-5xl text-gray-900 leading-tight">
        "Vous redonner le goût et le temps de cuisiner de bons petits plats maison, sans la charge mentale de l'organisation."
      </p>
    </div>

    <!-- Comment ça marche (Editorial Layout) -->
    <div class="max-w-6xl mx-auto px-4 py-16 border-t border-gray-100">
      <div class="text-center mb-20">
        <h2 class="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">Comment ça marche ?</h2>
        <p class="text-gray-500 text-lg max-w-lg mx-auto">En 3 étapes simples, reprenez le contrôle de votre alimentation.</p>
      </div>

      <div class="space-y-32">
        <!-- Step 1 -->
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="order-2 md:order-1 lg:pr-12">
            <span class="text-secondary font-display text-7xl md:text-8xl font-black opacity-10 block mb-2 leading-none">01</span>
            <h3 class="font-display font-bold text-3xl text-gray-900 mb-6 tracking-tight">Vous choisissez vos recettes</h3>
            <p class="text-gray-500 leading-relaxed text-lg mb-6">
              Chaque semaine, notre équipe de chefs conçoit un nouveau menu varié : plats traditionnels togolais réinventés, découvertes du monde, ou options équilibrées. 
            </p>
            <p class="text-gray-500 leading-relaxed text-lg">
              De 1 à 4 personnes, sélectionnez les recettes qui vous font envie parmi notre catalogue hebdomadaire.
            </p>
          </div>
          <div class="order-1 md:order-2">
            <div class="aspect-[4/3] rounded-[40px] overflow-hidden bg-gray-50 shadow-2xl border border-gray-100 group">
               <img src="~/assets/images/le_plat_fini.jpg" alt="Choix des recettes" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div class="aspect-[4/3] rounded-[40px] overflow-hidden bg-gray-50 shadow-2xl border border-gray-100 group">
               <img src="~/assets/images/carton_et_frais.jpg" alt="Ingrédients frais" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div class="lg:pl-12">
            <span class="text-secondary font-display text-7xl md:text-8xl font-black opacity-10 block mb-2 leading-none">02</span>
            <h3 class="font-display font-bold text-3xl text-gray-900 mb-6 tracking-tight">Nous sourçons et livrons</h3>
            <p class="text-gray-500 leading-relaxed text-lg mb-6">
              Nous travaillons en circuit court avec des producteurs locaux. Tous les ingrédients sont méticuleusement sélectionnés et pré-dosés à la quantité exacte nécessaire pour combattre le gaspillage.
            </p>
            <p class="text-gray-500 leading-relaxed text-lg">
              Votre box est livrée chez vous ou au travail, dans le respect de la qualité et des circuits de fraîcheur.
            </p>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="order-2 md:order-1 lg:pr-12">
            <span class="text-secondary font-display text-7xl md:text-8xl font-black opacity-10 block mb-2 leading-none">03</span>
            <h3 class="font-display font-bold text-3xl text-gray-900 mb-6 tracking-tight">Vous cuisinez un chef-d'œuvre</h3>
            <p class="text-gray-500 leading-relaxed text-lg mb-6">
              Enfilez votre tablier ! Grâce à nos fiches recettes très détaillées et illustrées étape par étape, réussir vos plats n'a jamais été aussi simple.
            </p>
            <p class="text-gray-500 leading-relaxed text-lg">
              En 30 minutes environ, vous servez un repas chaud, cuisiné maison avec fierté, prêt à être dégusté en famille ou entre amis.
            </p>
          </div>
          <div class="order-1 md:order-2">
            <div class="aspect-[4/3] rounded-[40px] overflow-hidden bg-brand-cream/50 shadow-2xl border border-gray-100 flex items-center justify-center relative group">
               <img src="~/assets/images/en_pleine_cuisson.jpg" alt="Cuisson" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700"></div>
               <Icon name="heroicons:fire" class="w-24 h-24 text-white/90 relative z-10 drop-shadow-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nos Engagements -->
    <div class="bg-brand-cream/50 py-24 mt-32 border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-20">
          <h2 class="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4 tracking-tight">Nos engagements</h2>
          <p class="text-gray-500 text-lg">Une démarche responsable à chaque étape.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-12">
          <div class="bg-white p-12 rounded-[40px] border border-gray-100 text-center shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary shadow-inner">
              <Icon name="heroicons:globe-europe-africa" class="w-10 h-10" />
            </div>
            <h4 class="font-display font-bold text-xl text-gray-900 mb-4">Soutien au terroir</h4>
            <p class="text-gray-500 leading-relaxed font-medium">Nous privilégions les agriculteurs et producteurs togolais pour soutenir notre économie et réduire drastiquement l'empreinte carbone.</p>
          </div>
          
          <div class="bg-white p-12 rounded-[40px] border border-gray-100 text-center shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary shadow-inner">
              <Icon name="heroicons:scale" class="w-10 h-10" />
            </div>
            <h4 class="font-display font-bold text-xl text-gray-900 mb-4">Zéro Gaspillage</h4>
            <p class="text-gray-500 leading-relaxed font-medium">Nos ingrédients sont pré-dosés à la gramme près. Vous ne recevez que le nécessaire. Fini les épiceries oubliées au fond du placard.</p>
          </div>
          
          <div class="bg-white p-12 rounded-[40px] border border-gray-100 text-center shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary shadow-inner">
              <Icon name="heroicons:heart" class="w-10 h-10" />
            </div>
            <h4 class="font-display font-bold text-xl text-gray-900 mb-4">Diététique & Saveur</h4>
            <p class="text-gray-500 leading-relaxed font-medium">L'élaboration de nos recettes repose sur un équilibre nutritionnel contrôlé, sans jamais sacrifier la pure gourmandise du repas.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="max-w-4xl mx-auto px-4 pt-32 text-center pb-8">
      <h2 class="font-display font-bold text-4xl text-gray-900 mb-8 tracking-tight">Prêt(e) à passer à table ?</h2>
      <NuxtLink to="/catalogue" class="inline-flex items-center gap-4 bg-primary hover:bg-primary-dark text-white font-black py-6 px-12 rounded-full shadow-2xl shadow-primary/30 transition-all text-sm uppercase tracking-widest hover:-translate-y-1">
        Explorer le menu de la semaine
        <Icon name="heroicons:arrow-right" class="w-6 h-6" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'La promesse Kirefrais — Comment ça marche',
  description: 'Découvrez notre mission, nos valeurs et le fonctionnement éditorial de Kirefrais. Des ingrédients frais et pré-dosés livrés à Lomé.'
})
</script>
