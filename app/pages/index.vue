<template>
  <div class="font-sans">
    <!-- Hero -->
    <section class="bg-hero-cream overflow-hidden">
      <div class="page-container py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="z-10 text-left">
          <h1 class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6 mt-4 md:mt-0">
            Cuisinez comme un chef avec des
            <span class="text-hero-green relative inline-block">
              ingrédients frais
              <svg class="absolute -bottom-1 sm:-bottom-2 left-0 w-full block" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="height: 6px; sm:height: auto;">
                <path d="M1 9.5C65.5 3.5 194.5 -2.5 299 9.5" stroke="#1B8A4A" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </span>
            <br>togolais avec <span class="text-hero-orange">Kirefrais</span>
          </h1>
          <p class="text-gray-600 text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
            Recevez vos kits repas avec tous les ingrédients pré-dosés et les recettes illustrées.
            Cuisinez maison en 30 minutes, sans gaspillage.
          </p>
          <div class="flex flex-col sm:flex-row flex-wrap justify-start gap-4">
            <NuxtLink
              to="/catalogue"
              class="w-full sm:w-auto bg-hero-green hover:bg-hero-green-dark text-white font-bold
                     px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-hero-green/20 hover:-translate-y-1 active:scale-95 text-center"
            >
              Découvrir nos kits
            </NuxtLink>
            <NuxtLink
              to="#"
              class="w-full sm:w-auto bg-white border-2 border-hero-green/20 text-hero-green hover:border-hero-green
                     font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-hero-green/5 text-center"
            >
              Comment ça marche ?
            </NuxtLink>
          </div>
          
          <div class="flex items-center justify-start gap-6 mt-10 pt-8 border-t border-hero-green/10">
            <div class="flex -space-x-3 shrink-0">
              <div v-for="avatar in heroAvatars" :key="avatar" class="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                <NuxtImg :src="avatar" width="40" height="40" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="text-left">
              <div class="flex items-center gap-1 mb-1">
                <Icon v-for="i in 5" :key="i" name="heroicons:star-solid" class="w-4 h-4 text-hero-orange" />
                <span class="ml-2 font-bold text-gray-900">+427 avis</span>
              </div>
              <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Moyenne de 4.9/5 par nos clients</p>
            </div>
          </div>
        </div>
        
        <div class="relative hidden sm:block lg:block">
          <!-- Floating elements -->
          <div class="absolute -top-10 -right-10 w-64 h-64 bg-hero-orange/10 rounded-full blur-3xl" />
          <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-hero-green/10 rounded-full blur-3xl" />
          
          <div class="relative z-10 grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <div class="space-y-4">
              <img
                src="~/assets/images/hero_food.png"
                alt="Plat traditionnel Kirefrais"
                class="rounded-3xl object-cover w-full aspect-[4/5] shadow-2xl"
              />
              <div class="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
                <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:bolt" class="w-5 h-5 text-hero-green" />
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-900 uppercase">Pré-dosé</p>
                  <p class="text-[10px] text-gray-500">Zéro gaspillage</p>
                </div>
              </div>
            </div>
            <div class="space-y-4 pt-12">
               <div class="bg-hero-orange p-4 rounded-2xl shadow-xl text-white flex items-center gap-4">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:fire" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-xs font-bold text-white uppercase">Rapide</p>
                  <p class="text-[10px] text-white/80">30 min chrono</p>
                </div>
              </div>
              <img
                src="~/assets/images/hero_ingredients.png"
                alt="Ingrédients frais du marché"
                class="rounded-3xl object-cover w-full aspect-[4/5] shadow-2xl border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pourquoi Kirefrais -->
    <section class="page-container py-16">
      <div class="text-center max-w-2xl mx-auto mb-12 px-4">
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-6 tracking-tight">
          Pourquoi des milliers de foyers adorent Kirefrais
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="benefit in benefits" :key="benefit.title" class="text-center group p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-50">
          <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-hero-cream flex items-center justify-center mb-6 group-hover:bg-hero-green/10 transition-colors duration-300 transform group-hover:-rotate-6">
             <Icon :name="benefit.icon" class="w-8 h-8 sm:w-10 sm:h-10 text-hero-green group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 class="font-bold text-lg sm:text-xl text-gray-900 mb-3">{{ benefit.title }}</h3>
          <p class="text-gray-500 text-sm font-medium leading-relaxed">{{ benefit.desc }}</p>
        </div>
      </div>
      <div class="mt-12 text-center">
        <NuxtLink to="/catalogue" class="inline-block bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
          Commencer maintenant
        </NuxtLink>
      </div>
    </section>

    <!-- Le Dîner facile -->
    <section class="bg-white py-16 md:py-24 relative overflow-hidden">
      <!-- Decor background -->
      <div class="absolute inset-0 z-0 opacity-5 pointer-events-none">
         <img src="~/assets/images/epice_et_saveur.jpg" class="w-full h-full object-cover mix-blend-multiply" />
      </div>
      
      <div class="page-container relative z-10 px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-hero-orange font-bold tracking-widest uppercase text-[10px] mb-2 block">Comment ça marche</span>
          <h2 class="font-display font-bold text-3xl md:text-5xl text-gray-900 mb-6 tracking-tight">Le dîner, c'est facile comme bonjour !</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Step 1 -->
          <div class="group relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
            <div class="h-56 relative overflow-hidden">
              <img src="~/assets/images/application_et_technologie.jpg" alt="Application Kirefrais" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-4 left-6 text-white font-display text-5xl font-black opacity-40">01</div>
            </div>
            <div class="p-8 relative -mt-8 bg-white rounded-t-3xl text-center">
              <div class="w-16 h-16 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 -mt-16 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                <Icon name="heroicons:cursor-arrow-rays" class="w-8 h-8 text-hero-orange" />
              </div>
              <h3 class="font-display font-bold text-xl text-gray-900 mb-3">Personnalisez votre plan</h3>
              <p class="text-gray-500 text-sm leading-relaxed">Choisissez les plats locaux ou internationaux qui vous font envie parmi notre large menu hebdomadaire.</p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="group relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 md:translate-y-8">
            <div class="h-56 relative overflow-hidden">
              <img src="~/assets/images/laspect_livraison.jpg" alt="Livraison Kirefrais" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-4 left-6 text-white font-display text-5xl font-black opacity-40">02</div>
            </div>
            <div class="p-8 relative -mt-8 bg-white rounded-t-3xl text-center">
              <div class="w-16 h-16 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 -mt-16 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                <Icon name="heroicons:cube" class="w-8 h-8 text-hero-green" />
              </div>
              <h3 class="font-display font-bold text-xl text-gray-900 mb-3">Recevez votre box</h3>
              <p class="text-gray-500 text-sm leading-relaxed">Vos ingrédients frais et pré-dosés arrivent chez vous, bien emballés dans notre carton écolo et prêts à l'emploi.</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="group relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
            <div class="h-56 relative overflow-hidden">
              <img src="~/assets/images/en_pleine_cuisson.jpg" alt="Cuisine Kirefrais" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-4 left-6 text-white font-display text-5xl font-black opacity-40">03</div>
            </div>
            <div class="p-8 relative -mt-8 bg-white rounded-t-3xl text-center">
              <div class="w-16 h-16 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 -mt-16 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                <Icon name="heroicons:fire" class="w-8 h-8 text-red-500" />
              </div>
              <h3 class="font-display font-bold text-xl text-gray-900 mb-3">Cuisinez et savourez</h3>
              <p class="text-gray-500 text-sm leading-relaxed">Suivez nos fiches recettes interactives ou imprimées et préparez un délicieux dîner fait maison en 30 minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu / Variety -->
    <section class="py-16 page-container px-4">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4 tracking-tight">Personnalisez selon vos goûts</h2>
        <p class="text-gray-500 text-base md:text-lg">Maintenant avec plus de 20 recettes locales et d'ailleurs chaque mois.</p>
      </div>
      
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="i in 4" :key="i" class="bg-gray-100 rounded-3xl h-96 animate-pulse border border-gray-50" />
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <KitCard
          v-for="kit in featuredKits"
          :key="kit.id"
          :kit="kit"
          @add-to-cart="onAddToCart"
        />
      </div>
      <div class="mt-12 text-center">
        <NuxtLink to="/catalogue" class="inline-flex bg-hero-green hover:bg-hero-green-dark text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all active:scale-95">
          Voir toutes nos recettes
        </NuxtLink>
      </div>
    </section>

    <!-- Visual / Value (Delicious, Healthy, Ready) -->
    <section class="bg-[#FAF8F5] relative overflow-hidden">
      <div class="relative flex items-center justify-center min-h-[480px] md:min-h-[600px] py-16">
        <!-- Visual Decor plates - Hidden on smallest phones to prevent messy layouts -->
        <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[40%] sm:-translate-x-[25%] lg:-translate-x-[15%] w-[240px] sm:w-[400px] lg:w-[500px] aspect-square pointer-events-none transition-transform duration-500">
          <div class="w-full h-full rounded-full border-[8px] sm:border-[12px] border-white shadow-2xl overflow-hidden">
            <img src="~/assets/images/nutrition_et_sante.jpg" alt="Repas équilibré viande" class="w-full h-full object-cover scale-110" />
          </div>
        </div>

        <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] sm:translate-x-[25%] lg:translate-x-[15%] w-[240px] sm:w-[400px] lg:w-[500px] aspect-square pointer-events-none transition-transform duration-500">
          <div class="w-full h-full rounded-full border-[8px] sm:border-[12px] border-white shadow-2xl overflow-hidden">
            <img src="~/assets/images/le_plat_fini.jpg" alt="Repas sain salade" class="w-full h-full object-cover scale-110" />
          </div>
        </div>

        <!-- Centre Content -->
        <div class="relative z-10 w-full max-w-xl px-6 text-center">
          <h2 class="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#1D1D1D] mb-6 leading-tight tracking-tight">
            DÉLICIEUX. SAIN.<br>PRÊT POUR VOTRE CUISINE.
          </h2>
          <p class="text-[#555] text-sm sm:text-base mb-10 mx-auto max-w-sm leading-relaxed">
            Des repas savoureux et faciles à préparer, pour adopter de bonnes habitudes alimentaires au quotidien.
          </p>

          <NuxtLink
            to="/catalogue"
            class="inline-flex items-center justify-center bg-[#1D1D1D] text-white font-bold text-sm sm:text-base px-8 py-4 sm:px-12 sm:py-5 rounded-full hover:bg-[#333] transition-all duration-300 shadow-xl active:scale-95"
          >
            Découvrir le menu complet
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-24 relative overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="~/assets/images/pet_a_table.jpg" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gray-900/70 backdrop-blur-[2px]"></div>
      </div>
      
      <div class="page-container relative z-10">
        <div class="text-center mb-16">
          <h2 class="font-display font-bold text-4xl md:text-5xl text-white mb-4">La famille Kirefrais adore</h2>
          <div class="flex items-center justify-center gap-1 mb-2">
            <Icon v-for="i in 5" :key="i" name="heroicons:star-solid" class="w-6 h-6 text-yellow-400" />
          </div>
          <p class="text-white/80 text-lg">Rejoignez des milliers de foyers qui cuisinent avec bonheur.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="review in reviews" :key="review.name" class="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 relative group hover:bg-white/15 hover:-translate-y-2 transition-all duration-300">
             <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden shrink-0">
                  <NuxtImg :src="review.avatar" width="48" height="48" class="w-full h-full object-cover" />
                </div>
                <div>
                  <p class="font-bold text-white leading-none mb-1">{{ review.name }}</p>
                  <p class="text-xs text-white/60">Client(e) vérifié(e) • Lomé</p>
                </div>
             </div>
             <p class="text-white font-medium italic mb-6 leading-relaxed">"{{ review.text }}"</p>
             <div class="flex items-center gap-1">
               <Icon v-for="i in 5" :key="i" name="heroicons:star-solid" class="w-4 h-4 text-yellow-400" />
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 page-container">
      <div class="max-w-3xl mx-auto">
        <h2 class="font-display font-bold text-3xl md:text-4xl text-center text-gray-900 mb-12">Questions fréquentes</h2>
        <div class="space-y-4">
          <details v-for="(faq, i) in faqs" :key="i" class="group bg-white rounded-2xl border border-gray-100 shadow-sm [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between p-6 cursor-pointer font-bold text-gray-900">
              {{ faq.q }}
              <span class="transition group-open:rotate-180">
                <Icon name="heroicons:chevron-down" class="w-5 h-5 text-gray-500" />
              </span>
            </summary>
            <div class="px-6 pb-6 text-gray-600 font-medium leading-relaxed">
              {{ faq.a }}
            </div>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import KitCard   from '~/components/catalog/KitCard.vue'
import type { Kit } from '~/types/kit'

useSeoMeta({
  title:       'Kirefrais — Kits Repas Frais Livrés à Domicile à Lomé',
  description: 'Gagnez du temps en cuisine avec Kirefrais. Ingrédients locaux, recettes traditionnelles togolaises et exotiques.',
})

const { api }   = useApi()
const cartStore = useCartStore()

const { data: featuredKits, pending } = await useAsyncData(
  'featured-kits',
  () => api<{ data: Kit[] }>('/kits?sort=order_count&limit=4').then(r => r.data)
)

const heroAvatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Koffi&skinColor=6d4c41&top=shortCurly',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Afi&skinColor=3d1e10&top=longButNotTooLong',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Edem&skinColor=ac7053&top=shortFlat',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Yao&skinColor=3b2219&top=turban'
]

const benefits = [
  { icon: 'heroicons:no-symbol', title: 'Fini le gaspillage', desc: 'Des ingrédients pré-dosés à la virgule près pour ne rien jeter.' },
  { icon: 'heroicons:sparkles', title: 'Cuisine simplifiée', desc: 'Des fiches recettes 100% visuelles. Devenez un chef en 30 minutes.' },
  { icon: 'heroicons:shopping-bag', title: 'Zéro course', desc: 'Évitez les marchés bondés. On vous livre tout au pas de la porte.' },
  { icon: 'heroicons:check-badge', title: 'Qualité garantie', desc: 'Des produits locaux et frais préparés scrupuleusement tous les matins.' }
]

const reviews = [
  { 
    name: 'Koffi', 
    text: 'Depuis que j\'ai découvert Kirefrais, je ne me casse plus la tête le soir. Les plats sont excellents et les portions très généreuses !',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Koffi&skinColor=6d4c41&top=shortCurly'
  },
  { 
    name: 'Afi', 
    text: 'Les produits sont d\'une fraîcheur incroyable. Pouvoir manger du vrai foufou ou un bon djenkoumé fait maison sans aller au marché, c\'est magique.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Afi&skinColor=3d1e10&top=longButNotTooLong'
  },
  { 
    name: 'Edem', 
    text: 'Je n\'ai jamais été un grand cuisinier, mais avec leurs fiches étape par étape, j\'arrive à impressionner mes amis le week-end !',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Edem&skinColor=ac7053&top=shortFlat'
  }
]

const faqs = [
  { q: "Comment fonctionne l'abonnement Kirefrais ?", a: "Vous choisissez vos repas chaque semaine parmi notre menu. Nous faisons les courses et vous livrons les ingrédients frais et pré-dosés avec les recettes. L'abonnement est 100% sans engagement : mettez en pause ou annulez quand vous le souhaitez." },
  { q: "Peut-on cuisiner des plats locaux ?", a: "Absolument ! Notre concept est de mettre en valeur la gastronomie togolaise tout en la simplifiant. Vous trouverez chaque semaine des classiques locaux (foufou, ayimolou, djenkoumé) ainsi que des plats internationaux." },
  { q: "Quelles sont vos zones de livraison ?", a: "Nous livrons pour le moment sur l'ensemble du Grand Lomé. Sélectionnez votre quartier lors de la commande pour voir vos créneaux de livraison." },
  { q: "Les ingrédients restent-ils vraiment frais ?", a: "Oui, nous sourçons nos produits localement le jour même de la préparation de votre box et assurons une livraison optimale pour préserver toute la fraîcheur et les saveurs jusqu'à votre cuisine." }
]

function onAddToCart(kit: Kit) {
  cartStore.add(kit, 2)
  toast.success(`${kit.name} ajouté au panier !`)
}
</script>
