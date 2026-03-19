<template>
  <div class="bg-white min-h-screen font-sans antialiased text-gray-900 border-t border-gray-100">
    <PricingSection />

    <!-- Value Props (Informations complémentaires) -->
    <section class="py-24 md:py-32 bg-[#F8FAF9]">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-12 lg:gap-24">
          <div v-for="benefit in benefits" :key="benefit.title" class="text-center">
            <div class="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-8">
              <Icon :name="benefit.icon" class="w-8 h-8 text-hero-orange" />
            </div>
            <h4 class="font-display font-bold text-xl text-gray-900 mb-4">{{ benefit.title }}</h4>
            <p class="text-gray-500 text-sm leading-relaxed font-medium">
              {{ benefit.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ (Informations complémentaires) -->
    <section class="py-24 max-w-3xl mx-auto px-4">
      <h2 class="font-display font-bold text-3xl text-center text-gray-900 mb-16 tracking-tight">Questions fréquentes</h2>
      <div class="space-y-8">
        <div v-for="faq in simpleFaqs" :key="faq.q">
          <h3 class="font-bold text-gray-900 mb-3">{{ faq.q }}</h3>
          <p class="text-gray-600 text-sm leading-relaxed font-medium">{{ faq.a }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PricingSection from '~/components/subscription/PricingSection.vue'

definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Abonnements — Kirefrais',
  description: 'Choisissez votre pack hebdomadaire de kits repas frais et locaux à Lomé (Togo).',
})

const benefits = [
  { icon: 'heroicons:calendar-days', title: '100% Flexible', desc: 'Mettez en pause ou annulez votre abonnement en un clic, sans frais cachés.' },
  { icon: 'heroicons:shopping-bag', title: 'Zéro gaspillage', desc: 'Des ingrédients pré-dosés pour éviter de jeter de la nourriture et faire des économies.' },
  { icon: 'heroicons:truck', title: 'Livraison gratuite', desc: 'Recevez vos kits directement chez vous ou à votre bureau, sans frais supplémentaires.' }
]

const simpleFaqs = [
  { q: "Comment ça fonctionne ?", a: "Chaque semaine, vous recevez une box contenant tous les ingrédients frais et les recettes pour cuisiner vos plats préférés en moins de 30 minutes." },
  { q: "Puis-je changer de pack ?", a: "Oui, vous pouvez passer d'un pack à l'autre à tout moment depuis votre espace client." },
  { q: "Quelles sont les méthodes de paiement ?", a: "Nous acceptons TMoney, Flooz et les cartes bancaires via notre plateforme sécurisée." }
]
</script>
