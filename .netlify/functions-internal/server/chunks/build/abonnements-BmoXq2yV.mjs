import { v as vueExports, u as useSeoMeta, s as serverRenderer_cjs_prodExports, _ as __nuxt_component_1$1 } from './server.mjs';
import { P as PricingSection } from './PricingSection-ncPG-0JV.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'tailwindcss/colors';
import 'node:stream';
import 'vue-sonner';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue';
import './NuxtImg-C5Vjpk5l.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './cart-BgxWSgO2.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "abonnements",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Abonnements — Kirefrais",
      description: "Choisissez votre pack hebdomadaire de kits repas frais et locaux à Lomé (Togo)."
    });
    const benefits = [
      { icon: "heroicons:calendar-days", title: "100% Flexible", desc: "Mettez en pause ou annulez votre abonnement en un clic, sans frais cachés." },
      { icon: "heroicons:shopping-bag", title: "Zéro gaspillage", desc: "Des ingrédients pré-dosés pour éviter de jeter de la nourriture et faire des économies." },
      { icon: "heroicons:truck", title: "Livraison gratuite", desc: "Recevez vos kits directement chez vous ou à votre bureau, sans frais supplémentaires." }
    ];
    const simpleFaqs = [
      { q: "Comment ça fonctionne ?", a: "Chaque semaine, vous recevez une box contenant tous les ingrédients frais et les recettes pour cuisiner vos plats préférés en moins de 30 minutes." },
      { q: "Puis-je changer de pack ?", a: "Oui, vous pouvez passer d'un pack à l'autre à tout moment depuis votre espace client." },
      { q: "Quelles sont les méthodes de paiement ?", a: "Nous acceptons TMoney, Flooz et les cartes bancaires via notre plateforme sécurisée." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "bg-white min-h-screen font-sans antialiased text-gray-900 border-t border-gray-100" }, _attrs))}>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(PricingSection, null, null, _parent));
      _push(`<section class="py-24 md:py-32 bg-[#F8FAF9]"><div class="max-w-7xl mx-auto px-4"><div class="grid md:grid-cols-3 gap-12 lg:gap-24"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(benefits, (benefit) => {
        _push(`<div class="text-center"><div class="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-8">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: benefit.icon,
          class: "w-8 h-8 text-hero-orange"
        }, null, _parent));
        _push(`</div><h4 class="font-display font-bold text-xl text-gray-900 mb-4">${serverRenderer_cjs_prodExports.ssrInterpolate(benefit.title)}</h4><p class="text-gray-500 text-sm leading-relaxed font-medium">${serverRenderer_cjs_prodExports.ssrInterpolate(benefit.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-24 max-w-3xl mx-auto px-4"><h2 class="font-display font-bold text-3xl text-center text-gray-900 mb-16 tracking-tight">Questions fréquentes</h2><div class="space-y-8"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(simpleFaqs, (faq) => {
        _push(`<div><h3 class="font-bold text-gray-900 mb-3">${serverRenderer_cjs_prodExports.ssrInterpolate(faq.q)}</h3><p class="text-gray-600 text-sm leading-relaxed font-medium">${serverRenderer_cjs_prodExports.ssrInterpolate(faq.a)}</p></div>`);
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/abonnements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=abonnements-BmoXq2yV.mjs.map
