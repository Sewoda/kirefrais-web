import { v as vueExports, e as useRoute$1, a as useAsyncData, s as serverRenderer_cjs_prodExports, _ as __nuxt_component_1$1, b as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-C5Vjpk5l.mjs';
import { u as useApi } from './useApi-CdIKQgGC.mjs';
import { u as useCartStore } from './cart-BgxWSgO2.mjs';
import { u as useFormatPrice } from './useFormatPrice-6gTINpYI.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute$1();
    const { api } = useApi();
    useCartStore();
    const { format } = useFormatPrice();
    const { data: kit, pending } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      `kit-${route.params.slug}`,
      () => api(`/kits/${route.params.slug}`).then((r) => r.data)
    )), __temp = await __temp, __restore(), __temp);
    const activeImage = vueExports.ref("");
    const portions = vueExports.ref(2);
    const quantity = vueExports.ref(1);
    const difficultyLabel = vueExports.computed(() => {
      if (!kit.value) return "";
      return { easy: "Facile", medium: "Intermédiaire", hard: "Expert" }[kit.value.difficulty];
    });
    vueExports.watch(kit, (newKit) => {
      if (newKit) activeImage.value = safeImages.value[0] || "";
    }, { immediate: true });
    const safeImages = vueExports.computed(() => {
      if (!kit.value || !kit.value.images) return [];
      if (Array.isArray(kit.value.images)) return kit.value.images;
      if (typeof kit.value.images === "string") {
        try {
          const parsed = JSON.parse(kit.value.images);
          if (Array.isArray(parsed)) return parsed;
        } catch {
        }
        const cleaned = String(kit.value.images).replace(/^\[["']|["']\]$/g, "");
        if (cleaned && cleaned.includes("http")) return [cleaned];
      }
      return [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_2;
      const _component_RecipeSteps = vueExports.resolveComponent("RecipeSteps");
      const _component_KitReviews = vueExports.resolveComponent("KitReviews");
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "bg-brand-cream/10 min-h-screen font-sans" }, _attrs))}>`);
      if (vueExports.unref(pending)) {
        _push(`<div class="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-12 h-12 text-primary animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (vueExports.unref(kit)) {
        _push(`<div class="max-w-7xl mx-auto px-4 py-8 lg:py-16"><nav class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "hover:text-primary transition-colors"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Accueil`);
            } else {
              return [
                vueExports.createTextVNode("Accueil")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-3 h-3"
        }, null, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "hover:text-primary transition-colors"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Catalogue`);
            } else {
              return [
                vueExports.createTextVNode("Catalogue")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-3 h-3"
        }, null, _parent));
        _push(`<span class="text-gray-900">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(kit).name)}</span></nav><div class="grid lg:grid-cols-2 gap-16 lg:gap-24"><div class="space-y-6 sm:space-y-8"><div class="aspect-square sm:aspect-3/2 rounded-3xl overflow-hidden shadow-sm bg-white border border-gray-100">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtImg, {
          src: vueExports.unref(activeImage) || vueExports.unref(safeImages)[0],
          alt: vueExports.unref(kit).name,
          class: "w-full h-full object-cover"
        }, null, _parent));
        _push(`</div><div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(safeImages), (img) => {
          _push(`<button class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(activeImage) === img ? "border-primary shadow-md scale-105" : "border-transparent hover:border-gray-200", "w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border transition-all"])}">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtImg, {
            src: img,
            class: "w-full h-full object-cover"
          }, null, _parent));
          _push(`</button>`);
        });
        _push(`<!--]--></div></div><div class="flex flex-col"><div class="mb-8 lg:mb-10 text-center lg:text-left"><div class="flex items-center gap-3 mb-6 justify-center lg:justify-start"><span class="bg-primary/5 text-primary text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest border border-primary/10">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(kit).category?.name || "Recette locale")}</span><div class="flex items-center gap-1.5 bg-secondary/5 px-3 py-1.5 rounded-md border border-secondary/10">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:star-solid",
          class: "w-3.5 h-3.5 text-secondary"
        }, null, _parent));
        _push(`<span class="text-[9px] sm:text-[10px] font-bold text-secondary uppercase tracking-widest">${serverRenderer_cjs_prodExports.ssrInterpolate(Number(vueExports.unref(kit).rating_avg || 0).toFixed(1))} (${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(kit).rating_count)})</span></div></div><h1 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6 lg:mb-8 leading-tight tracking-tight px-4 lg:px-0">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(kit).name)}</h1><p class="text-gray-500 text-base sm:text-lg leading-relaxed px-4 lg:px-0">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(kit).description)}</p></div><div class="grid grid-cols-3 gap-4 sm:gap-6 mb-10 lg:mb-12"><div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm text-center">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:clock",
          class: "w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2 sm:mb-3"
        }, null, _parent));
        _push(`<p class="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Temps</p><p class="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(kit).prep_time)} MIN</p></div><div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm text-center">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:fire",
          class: "w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2 sm:mb-3"
        }, null, _parent));
        _push(`<p class="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Difficulté</p><p class="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(difficultyLabel))}</p></div><div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm text-center">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:heart",
          class: "w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2 sm:mb-3"
        }, null, _parent));
        _push(`<p class="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Diète</p><p class="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(kit).is_vegetarian ? "Végé" : "Normal")}</p></div></div><div class="mb-10 lg:mb-12 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm"><p class="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 sm:mb-8">Nombre de portions</p><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList([1, 2, 4], (p) => {
          _push(`<button class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(portions) === p ? "border-primary bg-primary/5" : "border-gray-50 hover:border-gray-100 bg-gray-50/30", "flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 p-4 sm:p-5 rounded-2xl border transition-all"])}"><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(portions) === p ? "text-primary" : "text-gray-400", "text-[9px] sm:text-[10px] font-bold tracking-widest uppercase"])}">${serverRenderer_cjs_prodExports.ssrInterpolate(p)} PORTION(S)</span><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(portions) === p ? "text-gray-900" : "text-gray-400", "text-base sm:text-lg font-sans font-black"])}">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(kit).prices[`${p}p`]))}</span></button>`);
        });
        _push(`<!--]--></div><div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"><div class="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 w-full sm:w-auto justify-between sm:justify-start"><button class="text-gray-400 hover:text-primary transition-colors active:scale-90">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:minus-circle",
          class: "w-7 h-7 sm:w-8 sm:h-8"
        }, null, _parent));
        _push(`</button><span class="text-lg sm:text-xl font-black font-sans min-w-[30px] text-center text-gray-900">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(quantity))}</span><button class="text-gray-400 hover:text-primary transition-colors active:scale-90">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:plus-circle",
          class: "w-7 h-7 sm:w-8 sm:h-8"
        }, null, _parent));
        _push(`</button></div><button class="w-full sm:flex-1 bg-secondary hover:bg-secondary-dark text-white font-black py-4 sm:py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-secondary/10 active:scale-95 uppercase text-[10px] sm:text-xs tracking-widest"> Ajouter au panier <span class="hidden sm:inline w-1 h-1 rounded-full bg-white/40"></span><span class="font-sans text-base sm:text-lg">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(kit).prices[`${vueExports.unref(portions)}p`] * vueExports.unref(quantity)))}</span></button></div></div><div><h3 class="font-display font-bold text-xl text-gray-900 mb-6">Ingrédients inclus</h3>`);
        if (Array.isArray(vueExports.unref(kit).ingredients)) {
          _push(`<div class="grid grid-cols-2 gap-y-3 gap-x-6"><!--[-->`);
          serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(kit).ingredients, (ing) => {
            _push(`<div class="flex items-center gap-3 group"><div class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div><span class="text-gray-600 text-sm leading-tight transition-colors group-hover:text-gray-900">${serverRenderer_cjs_prodExports.ssrInterpolate(ing)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-gray-500 text-sm leading-relaxed">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(kit).ingredients)}</p>`);
        }
        _push(`</div></div></div><section class="mt-16 sm:mt-24 pt-16 sm:pt-24 border-t border-gray-100 px-4 lg:px-0"><div class="grid lg:grid-cols-3 gap-12 text-center lg:text-left"><div class="lg:col-span-1"><h2 class="font-display font-black text-2xl sm:text-3xl text-gray-900 mb-4 tracking-tight">Valeurs nutritionnelles</h2><p class="text-gray-500 text-sm leading-relaxed max-w-md mx-auto lg:mx-0"> Toutes nos recettes sont élaborées avec le soutien de nutritionnistes pour garantir un équilibre parfait entre goût et santé. </p></div><div class="lg:col-span-2 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(kit).nutrition, (val, key) => {
          _push(`<div class="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 text-center shadow-sm"><p class="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">${serverRenderer_cjs_prodExports.ssrInterpolate(key)}</p><p class="text-lg sm:text-xl font-display font-black text-gray-900 leading-none">${serverRenderer_cjs_prodExports.ssrInterpolate(val)}<span class="text-[10px] ml-0.5 text-gray-400 font-bold uppercase">${serverRenderer_cjs_prodExports.ssrInterpolate(key === "calories" ? "kcal" : "g")}</span></p></div>`);
        });
        _push(`<!--]--></div></div></section>`);
        if (vueExports.unref(kit).recipe_steps?.length) {
          _push(`<section class="mt-24 pt-24 border-t border-gray-100">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_RecipeSteps, {
            steps: vueExports.unref(kit).recipe_steps
          }, null, _parent));
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<section class="mt-24 pt-24 border-t border-gray-100 pb-24">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_KitReviews, {
          "kit-id": vueExports.unref(kit).id
        }, null, _parent));
        _push(`</section></div>`);
      } else {
        _push(`<div class="max-w-7xl mx-auto px-4 py-24 text-center"><h2 class="text-2xl font-bold">Produit introuvable.</h2>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "text-primary hover:underline mt-4 block"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Retour au catalogue`);
            } else {
              return [
                vueExports.createTextVNode("Retour au catalogue")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalogue/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-BY-rB6Lu.mjs.map
