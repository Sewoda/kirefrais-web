import { v as vueExports, u as useSeoMeta, s as serverRenderer_cjs_prodExports, _ as __nuxt_component_1$1, b as __nuxt_component_0$1 } from './server.mjs';
import { u as useCartStore } from './cart-BgxWSgO2.mjs';
import { u as useFormatPrice } from './useFormatPrice-6gTINpYI.mjs';
import { u as useApi } from './useApi-CdIKQgGC.mjs';
import { u as useCurrentUser } from './useCurrentUser-DvSG2TCC.mjs';
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

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "paiement",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "Paiement sécurisé — Kirefrais Togo" });
    const cartStore = useCartStore();
    const { format } = useFormatPrice();
    useApi();
    useCurrentUser();
    const loading = vueExports.ref(false);
    const orderCreated = vueExports.ref(false);
    const selectedMethod = vueExports.ref("all");
    const notes = vueExports.ref("");
    const paymentMethods = [
      { id: "all", label: "CinetPay", desc: "Mobile & Carte", icon: "heroicons:credit-card" },
      { id: "cash", label: "À la livraison", desc: "Simple et classique", icon: "heroicons:banknotes" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "bg-gray-50/50 min-h-screen font-sans pb-24" }, _attrs))}><div class="max-w-7xl mx-auto px-4 py-8 lg:py-12"><div class="flex items-center justify-center gap-4 mb-16 px-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: "heroicons:check",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</div><span class="text-[10px] font-bold text-gray-900 uppercase tracking-widest hidden sm:block">Panier</span></div><div class="w-12 h-px bg-primary/30"></div><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">2</div><span class="text-[10px] font-bold text-gray-900 uppercase tracking-widest hidden sm:block">Paiement</span></div><div class="w-12 h-px bg-gray-200"></div><div class="flex items-center gap-3 opacity-30"><div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm">3</div><span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden sm:block">Confirmation</span></div></div>`);
      if (vueExports.unref(orderCreated)) {
        _push(`<section class="max-w-2xl mx-auto text-center bg-white rounded-3xl p-12 lg:p-20 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[500px]"><div class="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 relative">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-circle",
          class: "w-16 h-16 text-primary"
        }, null, _parent));
        _push(`<div class="absolute -top-1 -right-1 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold animate-bounce shadow-lg shadow-secondary/30"> ! </div></div><h1 class="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4 tracking-tight">Commande confirmée !</h1><p class="text-gray-500 mb-12 max-w-sm mx-auto leading-relaxed text-lg"> Merci pour votre confiance. Votre kit repas sera préparé avec soin pour le <span class="text-primary font-bold">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(cartStore).deliveryDate)}</span>. </p>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "bg-primary text-white font-bold px-12 py-5 rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                name: "heroicons:home",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(` Retour à l&#39;accueil `);
            } else {
              return [
                vueExports.createVNode(_component_Icon, {
                  name: "heroicons:home",
                  class: "w-5 h-5"
                }),
                vueExports.createTextVNode(" Retour à l'accueil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section>`);
      } else {
        _push(`<div><div class="flex flex-col lg:flex-row gap-4 items-end justify-between mb-8"><div><h1 class="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight">Paiement</h1><p class="text-gray-400 mt-1 text-sm font-medium">Finalisez votre commande en toute sécurité.</p></div>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
          to: "/panier",
          class: "text-primary text-xs font-bold hover:underline flex items-center gap-2"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "w-3 h-3"
              }, null, _parent2, _scopeId));
              _push2(` Retour au panier `);
            } else {
              return [
                vueExports.createVNode(_component_Icon, {
                  name: "heroicons:arrow-left",
                  class: "w-3 h-3"
                }),
                vueExports.createTextVNode(" Retour au panier ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-8 space-y-6"><div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1 leading-none">Choisir un mode de paiement</label><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(paymentMethods, (method) => {
          _push(`<button class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(selectedMethod) === method.id ? "border-primary ring-1 ring-primary/20 shadow-primary/5" : "border-gray-100 hover:border-gray-200", "flex items-center justify-between p-4 rounded-xl border transition-all group bg-white shadow-sm"])}"><div class="flex items-center gap-4 text-left"><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "bg-primary text-white": vueExports.unref(selectedMethod) === method.id }, "w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary"])}">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
            name: method.icon,
            class: "w-5 h-5"
          }, null, _parent));
          _push(`</div><div><p class="font-bold text-gray-900 text-sm tracking-tight leading-tight">${serverRenderer_cjs_prodExports.ssrInterpolate(method.label)}</p><p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">${serverRenderer_cjs_prodExports.ssrInterpolate(method.desc)}</p></div></div><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(selectedMethod) === method.id ? "border-primary bg-primary" : "border-gray-200 bg-white", "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"])}">`);
          if (vueExports.unref(selectedMethod) === method.id) {
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
              name: "heroicons:check-small",
              class: "text-white w-4 h-4"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></button>`);
        });
        _push(`<!--]--></div></div><div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 leading-none">Instructions de livraison spécial (optionnel)</label><textarea rows="3" placeholder="Ex: Code portail, étage, point de repère précis..." class="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-gray-900">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(notes))}</textarea></div><div class="bg-primary/5 rounded-2xl p-4 flex gap-4 border border-primary/10"><div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-primary/10 shadow-sm">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:shield-check",
          class: "w-6 h-6 text-primary"
        }, null, _parent));
        _push(`</div><div class="space-y-1"><p class="text-[10px] font-bold text-primary uppercase tracking-widest">Paiement 100% Sécurisé</p><p class="text-xs text-primary/70 font-medium leading-relaxed"> Vos transactions sont chiffrées et sécurisées par CinetPay. Nous ne stockons aucune coordonnée bancaire. </p></div></div></div><div class="lg:col-span-4 space-y-6"><div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-8"><h3 class="font-display font-bold text-xl text-gray-900 mb-8 tracking-tight">Récapitulatif</h3><div class="space-y-4 mb-8 pb-8 border-b border-gray-100"><div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest"><span class="text-gray-400">Articles</span><span class="text-gray-900 font-sans tracking-tight">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).subtotal))}</span></div><div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest"><span class="text-gray-400">Livraison</span><span class="text-gray-900 font-sans tracking-tight">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).deliveryFee))}</span></div>`);
        if (vueExports.unref(cartStore).discount > 0) {
          _push(`<div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-secondary"><span>Réduction</span><span class="font-sans tracking-tight">- ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).discount))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex justify-between items-center mb-8"><span class="font-display font-bold text-xl text-gray-900 uppercase tracking-widest text-xs">Total à payer</span><span class="font-sans text-3xl font-black text-primary leading-none">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).total))}</span></div><button${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(loading)) ? " disabled" : ""} class="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl text-lg transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-primary/20">`);
        if (vueExports.unref(loading)) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
            name: "heroicons:arrow-path",
            class: "w-6 h-6 animate-spin"
          }, null, _parent));
        } else {
          _push(`<span>Confirmer et Payer</span>`);
        }
        if (!vueExports.unref(loading)) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
            name: "heroicons:bolt",
            class: "w-5 h-5"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</button><div class="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "logos:visa",
          class: "w-10"
        }, null, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "logos:mastercard",
          class: "w-10"
        }, null, _parent));
        _push(`<span class="text-[9px] font-bold text-gray-900 uppercase tracking-widest">Flooz</span><span class="text-[9px] font-bold text-gray-900 uppercase tracking-widest">TMoney</span></div></div><p class="text-[10px] text-center text-gray-400 font-medium px-4 leading-relaxed"> En cliquant sur &quot;Confirmer et Payer&quot;, vous acceptez nos CGV et notre politique de confidentialité. </p></div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/paiement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=paiement-Q__Swhgv.mjs.map
