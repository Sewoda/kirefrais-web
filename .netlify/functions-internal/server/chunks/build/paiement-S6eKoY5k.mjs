import { _ as __nuxt_component_0 } from './StepBar-CTzpbFp5.mjs';
import { v as vueExports, s as serverRenderer_cjs_prodExports, b as __nuxt_component_0$1, _ as __nuxt_component_1$1 } from './server.mjs';
import { u as useCartStore } from './cart-BgxWSgO2.mjs';
import { u as useFormatPrice } from './useFormatPrice-6gTINpYI.mjs';
import { u as useApi } from './useApi-CdIKQgGC.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
    const cartStore = useCartStore();
    const { format } = useFormatPrice();
    useApi();
    const loading = vueExports.ref(false);
    const selectedMethod = vueExports.ref("flooz");
    const phoneNumber = vueExports.ref("");
    const notes = vueExports.ref("");
    const paymentError = vueExports.ref("");
    const paymentMethods = [
      { id: "flooz", label: "Moov Flooz", desc: "Paiement mobile Togo", icon: "heroicons:device-phone-mobile" },
      { id: "tmoney", label: "T-Money", desc: "Simple et ultra-rapide", icon: "heroicons:qr-code" },
      { id: "card", label: "Carte Bancaire", desc: "Visa, Mastercard...", icon: "heroicons:credit-card" },
      { id: "cash", label: "À la livraison", desc: "Payer à réception", icon: "heroicons:banknotes" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CheckoutStepBar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "bg-[#F8FAF9] min-h-screen font-sans pb-24" }, _attrs))} data-v-c7e7b1d8><div class="max-w-7xl mx-auto px-4 py-8 lg:py-12" data-v-c7e7b1d8>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_CheckoutStepBar, { "current-step": 4 }, null, _parent));
      _push(`<div class="max-w-4xl mx-auto px-4" data-v-c7e7b1d8><div class="flex flex-col sm:flex-row gap-4 items-center sm:items-end justify-between mb-8 text-center sm:text-left" data-v-c7e7b1d8><div data-v-c7e7b1d8><h1 class="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight" data-v-c7e7b1d8>Comment souhaitez-vous payer ?</h1><p class="text-gray-400 mt-1 text-sm font-medium" data-v-c7e7b1d8>Finalisez votre commande en toute sécurité.</p></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
        to: "/checkout/creneau",
        class: "text-primary text-xs font-bold hover:underline flex items-center gap-2"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-left",
              class: "w-3 h-3"
            }, null, _parent2, _scopeId));
            _push2(` Modifier le créneau `);
          } else {
            return [
              vueExports.createVNode(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "w-3 h-3"
              }),
              vueExports.createTextVNode(" Modifier le créneau ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-v-c7e7b1d8><div class="lg:col-span-8 space-y-4" data-v-c7e7b1d8><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(paymentMethods, (method) => {
        _push(`<div class="relative" data-v-c7e7b1d8><button class="w-full text-left transition-all duration-300" data-v-c7e7b1d8><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "tunnel-card-active border-primary bg-primary/5": vueExports.unref(selectedMethod) === method.id }, "tunnel-card p-6 flex items-center justify-between group overflow-hidden"])}" data-v-c7e7b1d8><div class="flex items-center gap-5" data-v-c7e7b1d8><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "bg-primary text-white": vueExports.unref(selectedMethod) === method.id }, "w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary"])}" data-v-c7e7b1d8>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: method.icon,
          class: "w-7 h-7"
        }, null, _parent));
        _push(`</div><div data-v-c7e7b1d8><h3 class="font-bold text-gray-900 text-base tracking-tight" data-v-c7e7b1d8>${serverRenderer_cjs_prodExports.ssrInterpolate(method.label)}</h3><p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5" data-v-c7e7b1d8>${serverRenderer_cjs_prodExports.ssrInterpolate(method.desc)}</p></div></div><div class="flex items-center gap-4" data-v-c7e7b1d8>`);
        if (method.id === "flooz" || method.id === "tmoney") {
          _push(`<div class="hidden sm:flex gap-2 grayscale-0 opacity-50" data-v-c7e7b1d8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(selectedMethod) === method.id ? "border-primary bg-primary" : "border-gray-200 bg-white shadow-inner", "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"])}" data-v-c7e7b1d8>`);
        if (vueExports.unref(selectedMethod) === method.id) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
            name: "heroicons:check-small",
            class: "text-white w-5 h-5"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></button>`);
        if (vueExports.unref(selectedMethod) === method.id) {
          _push(`<div class="bg-white border-x border-b border-primary/10 rounded-b-2xl -mt-4 p-8 pt-10 shadow-lg shadow-primary/5" data-v-c7e7b1d8><div class="stagger-item space-y-6" data-v-c7e7b1d8>`);
          if (method.id === "flooz" || method.id === "tmoney") {
            _push(`<!--[--><p class="text-xs font-bold text-gray-400 uppercase tracking-widest" data-v-c7e7b1d8>Entrez votre numéro ${serverRenderer_cjs_prodExports.ssrInterpolate(method.label)}</p><div class="flex gap-2" data-v-c7e7b1d8><div class="bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-black text-gray-400 flex items-center" data-v-c7e7b1d8>+228</div><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(phoneNumber))} type="tel" placeholder="________" class="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-black tracking-widest text-gray-900 focus:outline-none focus:border-primary transition-all" data-v-c7e7b1d8></div><p class="text-[10px] text-gray-400 font-medium italic" data-v-c7e7b1d8>Un code de confirmation vous sera envoyé par SMS pour valider le paiement.</p><!--]-->`);
          } else if (method.id === "card") {
            _push(`<div class="space-y-4" data-v-c7e7b1d8><input type="text" placeholder="Numéro de carte" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold" data-v-c7e7b1d8><div class="grid grid-cols-2 gap-4" data-v-c7e7b1d8><input type="text" placeholder="MM/YY" class="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold" data-v-c7e7b1d8><input type="text" placeholder="CVV" class="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold" data-v-c7e7b1d8></div></div>`);
          } else if (method.id === "cash") {
            _push(`<div class="bg-amber-50 rounded-xl p-4 flex gap-3 border border-amber-100" data-v-c7e7b1d8>`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
              name: "heroicons:information-circle",
              class: "w-5 h-5 text-amber-500 shrink-0"
            }, null, _parent));
            _push(`<p class="text-xs text-amber-700 font-medium leading-relaxed" data-v-c7e7b1d8> Veuillez préparer l&#39;appoint si possible pour faciliter le travail de notre livreur. Merci ! </p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--><div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6" data-v-c7e7b1d8><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 leading-none ml-1" data-v-c7e7b1d8>Notes pour la livraison (Optionnel)</label><textarea rows="3" placeholder="Ex: Code portail, étage, point de repère précis..." class="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-gray-900" data-v-c7e7b1d8>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(notes))}</textarea></div></div><div class="lg:col-span-4 space-y-6 lg:sticky lg:top-8" data-v-c7e7b1d8><div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100" data-v-c7e7b1d8><h3 class="font-display font-bold text-xl text-gray-900 mb-8 tracking-tight" data-v-c7e7b1d8>Récapitulatif final</h3><div class="space-y-4 mb-8 pb-8 border-b border-gray-100" data-v-c7e7b1d8><div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest" data-v-c7e7b1d8><span class="text-gray-400" data-v-c7e7b1d8>Articles</span><span class="text-gray-900 font-sans tracking-tight" data-v-c7e7b1d8>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).subtotal))}</span></div><div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest" data-v-c7e7b1d8><span class="text-gray-400" data-v-c7e7b1d8>Frais Livraison</span><span class="text-gray-900 font-sans tracking-tight" data-v-c7e7b1d8>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).deliveryFee))}</span></div>`);
      if (vueExports.unref(cartStore).discount > 0) {
        _push(`<div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-secondary" data-v-c7e7b1d8><span data-v-c7e7b1d8>Remise Promo</span><span class="font-sans tracking-tight" data-v-c7e7b1d8>- ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).discount))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-primary/5 rounded-[1.5rem] p-5 border border-primary/10 flex justify-between items-center mb-10 shadow-sm relative group" data-v-c7e7b1d8><div class="flex flex-col" data-v-c7e7b1d8><span class="font-display font-black text-gray-900 uppercase tracking-[0.2em] text-[10px] leading-none mb-1 opacity-60" data-v-c7e7b1d8>Total</span></div><div class="text-right" data-v-c7e7b1d8><span class="font-sans text-xl font-black text-primary tracking-tighter leading-none block" data-v-c7e7b1d8>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).total))}</span></div></div>`);
      if (vueExports.unref(paymentError)) {
        _push(`<div class="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-start gap-3 mb-6 animate-shake" data-v-c7e7b1d8>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:information-circle",
          class: "w-5 h-5 shrink-0"
        }, null, _parent));
        _push(`<div class="flex-1" data-v-c7e7b1d8><p class="text-[10px] font-black uppercase tracking-widest mb-1" data-v-c7e7b1d8>Erreur de paiement</p><p class="text-xs font-medium leading-tight" data-v-c7e7b1d8>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(paymentError))}</p></div><button class="text-red-300 hover:text-red-500" data-v-c7e7b1d8>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(loading) || !vueExports.unref(selectedMethod)) ? " disabled" : ""} class="w-full relative bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center active:scale-95 shadow-xl shadow-primary/20 overflow-hidden" data-v-c7e7b1d8><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "opacity-0 translate-y-4": vueExports.unref(loading) }, "flex items-center gap-3 transition-all duration-300"])}" data-v-c7e7b1d8><span data-v-c7e7b1d8>Confirmer </span>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: "heroicons:bolt",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</div>`);
      if (vueExports.unref(loading)) {
        _push(`<div class="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-300" data-v-c7e7b1d8>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-7 h-7 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500" data-v-c7e7b1d8>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: "logos:visa",
        class: "w-10"
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: "logos:mastercard",
        class: "w-10"
      }, null, _parent));
      _push(`<span class="text-[9px] font-bold text-gray-900 uppercase tracking-widest" data-v-c7e7b1d8>Flooz</span><span class="text-[9px] font-bold text-gray-900 uppercase tracking-widest" data-v-c7e7b1d8>TMoney</span></div></div><p class="text-[10px] text-center text-gray-400 font-medium px-4 leading-relaxed italic" data-v-c7e7b1d8> * Une fois confirmé, vous recevrez un récapitulatif par email et pourrez suivre votre livraison en temps réel. </p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/paiement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const paiement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7e7b1d8"]]);

export { paiement as default };
//# sourceMappingURL=paiement-S6eKoY5k.mjs.map
