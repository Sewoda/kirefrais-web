<template>
  <footer class="bg-[#110524] text-indigo-100/70 pt-16 pb-8 font-sans border-t border-white/5">
    <div class="page-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
      <!-- Brand -->
      <div class="space-y-6">
        <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo class="h-8 w-auto text-white" />
          <span class="font-display font-medium text-xl text-white tracking-tight">Kirefrais</span>
        </NuxtLink>
        <p class="text-xs leading-relaxed max-w-xs text-indigo-100/60 font-medium">
          Le premier service de kits repas au Togo. Des ingrédients frais, locaux, et des recettes gourmandes livrés directement chez vous.
        </p>
        <div class="flex items-center gap-3">
          <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all shadow-sm">
            <Icon name="simple-icons:facebook" class="w-5 h-5" />
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all shadow-sm">
            <Icon name="simple-icons:instagram" class="w-5 h-5" />
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all shadow-sm">
            <Icon name="simple-icons:whatsapp" class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="text-white font-medium mb-6 text-sm">Navigation</h4>
        <ul class="space-y-3 text-sm text-indigo-100/70">
          <li><NuxtLink to="/catalogue" class="hover:text-white transition-colors">Nos kits repas</NuxtLink></li>
          <li><NuxtLink to="/a-propos" class="hover:text-white transition-colors">Comment ça marche</NuxtLink></li>
          <li><NuxtLink to="/abonnements" class="hover:text-white transition-colors">Abonnements</NuxtLink></li>
          <li><NuxtLink to="/faq" class="hover:text-white transition-colors">FAQ</NuxtLink></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h4 class="text-white font-medium mb-6 text-sm">Légal</h4>
        <ul class="space-y-3 text-sm text-indigo-100/70">
          <li><NuxtLink to="/cgu" class="hover:text-white transition-colors">Conditions générales</NuxtLink></li>
          <li><NuxtLink to="/confidentialite" class="hover:text-white transition-colors">Confidentialité</NuxtLink></li>
          <li><NuxtLink to="/cookies" class="hover:text-white transition-colors">Cookies</NuxtLink></li>
          <li><NuxtLink to="/mentions-legales" class="hover:text-white transition-colors">Mentions légales</NuxtLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-white font-medium mb-6 text-sm">Contact</h4>
        <ul class="space-y-4 text-sm text-indigo-100/70">
          <li class="flex items-start gap-3">
            <Icon name="heroicons:map-pin" class="w-5 h-5 text-secondary shrink-0" />
            <span>Lomé, Quartier Adidoadin, Togo</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon name="heroicons:phone" class="w-5 h-5 text-secondary" />
            <span>+228 90 00 00 00</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon name="heroicons:envelope" class="w-5 h-5 text-secondary" />
            <a href="mailto:contact@kirefrais.tg" class="hover:text-white transition-colors">contact@kirefrais.tg</a>
          </li>
        </ul>
      </div>
      <!-- Applications Mobiles -->
      <div>
        <h4 class="text-white font-medium mb-6 text-sm">Téléchargez notre app</h4>
        <div class="flex flex-col gap-3">
          <a href="#" class="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all shadow-sm">
            <Icon name="simple-icons:apple" class="w-6 h-6 text-white" />
            <div class="text-left">
              <div class="text-[9px] text-white/60 leading-none mb-1 uppercase tracking-wider">Télécharger dans l'</div>
              <div class="text-sm font-semibold text-white leading-none">App Store</div>
            </div>
          </a>
          <a href="#" class="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all shadow-sm">
            <Icon name="simple-icons:googleplay" class="w-6 h-6 text-white" />
            <div class="text-left">
              <div class="text-[9px] text-white/60 leading-none mb-1 uppercase tracking-wider">Disponible sur</div>
              <div class="text-sm font-semibold text-white leading-none">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="page-container pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium text-indigo-100/50">
      <p>© {{ new Date().getFullYear() }} Kirefrais. Tous droits réservés.</p>
      
      <!-- Paiements -->
      <div class="flex items-center flex-wrap justify-center gap-3 opacity-90">
        <!-- TMoney / Mixx -->
        <span class="bg-[#FFCC00] text-black font-extrabold px-3 py-1.5 rounded-md text-[10px] tracking-wider shadow-sm">MIXX</span>
        <!-- Flooz (Moov) -->
        <span class="bg-[#0055A5] text-white font-extrabold px-3 py-1.5 rounded-md text-[10px] tracking-wider italic shadow-sm">FLOOZ</span>
        <!-- Cartes Bancaires -->
        <div class="h-6 w-px bg-white/10 mx-1"></div>
        <Icon name="logos:visa" class="w-10 h-6" />
        <Icon name="logos:mastercard" class="w-10 h-6" />
      </div>
    </div>
  </footer>
</template>
