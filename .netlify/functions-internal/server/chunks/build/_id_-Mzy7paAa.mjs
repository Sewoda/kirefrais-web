import { v as vueExports, e as useRoute$1, j as useRouter, a as useAsyncData, s as serverRenderer_cjs_prodExports, _ as __nuxt_component_1$1 } from './server.mjs';
import { u as useApi } from './useApi-CdIKQgGC.mjs';
import { u as useFormatPrice } from './useFormatPrice-6gTINpYI.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { api } = useApi();
    const route = useRoute$1();
    useRouter();
    const { format } = useFormatPrice();
    const showLivreurModal = vueExports.ref(false);
    const orderStatus = vueExports.ref("");
    const { data: order, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData(`admin-order-${route.params.id}`, async () => {
      const data = await api(`/admin/orders/${route.params.id}`);
      orderStatus.value = data.status;
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const { data: livreurs } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      "active-livreurs",
      () => api("/admin/livreurs", { params: { is_active: 1 } }).then((r) => r.data)
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "max-w-5xl mx-auto space-y-6 pb-20" }, _attrs))} data-v-92b07884><div class="flex items-center justify-between" data-v-92b07884><div class="flex items-center gap-4" data-v-92b07884><button class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors" data-v-92b07884>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: "heroicons:chevron-left",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button><div data-v-92b07884><h2 class="font-display font-semibold text-xl text-gray-900" data-v-92b07884>Commande ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.reference)}</h2><p class="text-xs text-gray-400" data-v-92b07884>Passée le ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.created_at)}</p></div></div><div class="flex items-center gap-2" data-v-92b07884><button class="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors" data-v-92b07884>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: "heroicons:printer",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button><select class="px-4 py-2.5 rounded-xl border-2 border-primary bg-white text-sm font-semibold text-primary focus:outline-none" data-v-92b07884><option value="paid" data-v-92b07884${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(orderStatus)) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(orderStatus), "paid") : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(orderStatus), "paid")) ? " selected" : ""}>Payée</option><option value="preparing" data-v-92b07884${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(orderStatus)) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(orderStatus), "preparing") : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(orderStatus), "preparing")) ? " selected" : ""}>En préparation</option><option value="ready" data-v-92b07884${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(orderStatus)) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(orderStatus), "ready") : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(orderStatus), "ready")) ? " selected" : ""}>Prête</option><option value="delivering" data-v-92b07884${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(orderStatus)) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(orderStatus), "delivering") : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(orderStatus), "delivering")) ? " selected" : ""}>En livraison</option><option value="delivered" data-v-92b07884${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(orderStatus)) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(orderStatus), "delivered") : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(orderStatus), "delivered")) ? " selected" : ""}>Livrée</option><option value="cancelled" data-v-92b07884${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(orderStatus)) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(orderStatus), "cancelled") : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(orderStatus), "cancelled")) ? " selected" : ""}>Annulée</option></select></div></div>`);
      if (vueExports.unref(pending)) {
        _push(`<div class="flex items-center justify-center py-20" data-v-92b07884>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-8 h-8 animate-spin text-primary"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-92b07884><div class="lg:col-span-2 space-y-6" data-v-92b07884><div class="bg-white rounded-2xl border border-gray-100 overflow-hidden" data-v-92b07884><div class="px-6 py-4 border-b border-gray-100" data-v-92b07884><h3 class="font-display font-semibold text-gray-900" data-v-92b07884>Articles</h3></div><table class="w-full text-sm" data-v-92b07884><tbody class="divide-y divide-gray-50" data-v-92b07884><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(order)?.items, (item) => {
          _push(`<tr data-v-92b07884><td class="px-6 py-4" data-v-92b07884><div class="flex items-center gap-4" data-v-92b07884><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", item.kit?.images?.[0])} class="w-12 h-12 rounded-lg object-cover bg-gray-50" data-v-92b07884><div data-v-92b07884><p class="font-medium text-gray-900" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(item.kit?.name)}</p><p class="text-xs text-gray-400" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(item.portions)} portions</p></div></div></td><td class="px-6 py-4 text-gray-500" data-v-92b07884>x${serverRenderer_cjs_prodExports.ssrInterpolate(item.quantity)}</td><td class="px-6 py-4 text-right font-mono font-semibold text-gray-900" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(item.price * item.quantity))}</td></tr>`);
        });
        _push(`<!--]--></tbody><tfoot class="bg-gray-50 divide-y divide-gray-100" data-v-92b07884><tr data-v-92b07884><td colspan="2" class="px-6 py-3 text-sm text-gray-500 text-right" data-v-92b07884>Sous-total</td><td class="px-6 py-3 text-sm font-mono font-semibold text-gray-900 text-right" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(order)?.subtotal))}</td></tr><tr data-v-92b07884><td colspan="2" class="px-6 py-3 text-sm text-gray-500 text-right" data-v-92b07884>Livraison</td><td class="px-6 py-3 text-sm font-mono font-semibold text-gray-900 text-right" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(order)?.delivery_fee))}</td></tr>`);
        if (vueExports.unref(order)?.discount > 0) {
          _push(`<tr data-v-92b07884><td colspan="2" class="px-6 py-3 text-sm text-green-600 text-right" data-v-92b07884>Réduction</td><td class="px-6 py-3 text-sm font-mono font-semibold text-green-600 text-right" data-v-92b07884>-${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(order)?.discount))}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<tr class="bg-white" data-v-92b07884><td colspan="2" class="px-6 py-4 text-base font-bold text-gray-900 text-right" data-v-92b07884>Total</td><td class="px-6 py-4 text-lg font-mono font-bold text-primary text-right" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(order)?.total_amount))}</td></tr></tfoot></table></div><div class="bg-white rounded-2xl border border-gray-100 p-6" data-v-92b07884><div class="flex items-center justify-between mb-4" data-v-92b07884><h3 class="font-display font-semibold text-gray-900" data-v-92b07884>Livraison</h3>`);
        if (vueExports.unref(order)?.deliverer) {
          _push(`<span class="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold" data-v-92b07884> Assigné </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (vueExports.unref(order)?.deliverer) {
          _push(`<div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl" data-v-92b07884><div class="flex items-center gap-3" data-v-92b07884><div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order).deliverer.name.charAt(0))}</div><div data-v-92b07884><p class="text-sm font-semibold text-gray-900" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order).deliverer.name)}</p><p class="text-xs text-gray-500" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order).deliverer.phone)}</p></div></div><button class="text-primary text-xs font-bold hover:underline" data-v-92b07884> Changer </button></div>`);
        } else {
          _push(`<button class="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-primary hover:text-primary transition-colors flex flex-col items-center gap-1" data-v-92b07884>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
            name: "heroicons:truck",
            class: "w-6 h-6"
          }, null, _parent));
          _push(`<span class="text-sm font-semibold" data-v-92b07884>Assigner un livreur</span></button>`);
        }
        _push(`</div></div><div class="space-y-6" data-v-92b07884><div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4" data-v-92b07884><h3 class="font-display font-semibold text-gray-900 border-b border-gray-50 pb-3" data-v-92b07884>Client</h3><div class="space-y-3" data-v-92b07884><div class="flex items-center gap-3 text-sm" data-v-92b07884>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:user",
          class: "w-4 h-4 text-gray-400"
        }, null, _parent));
        _push(`<span class="text-gray-900 font-medium" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.user?.name)}</span></div><div class="flex items-center gap-3 text-sm" data-v-92b07884>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:phone",
          class: "w-4 h-4 text-gray-400"
        }, null, _parent));
        _push(`<span class="text-gray-600" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.user?.phone)}</span></div><div class="flex items-center gap-3 text-sm" data-v-92b07884>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:envelope",
          class: "w-4 h-4 text-gray-400"
        }, null, _parent));
        _push(`<span class="text-gray-600 truncate" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.user?.email)}</span></div></div></div><div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4" data-v-92b07884><h3 class="font-display font-semibold text-gray-900 border-b border-gray-50 pb-3" data-v-92b07884>Lieu de livraison</h3><div class="space-y-2" data-v-92b07884><p class="text-sm font-semibold text-gray-900" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.address?.label || "Adresse")}</p><p class="text-sm text-gray-600" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.address?.street)}</p><p class="text-xs text-gray-400" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.zone?.name)}, ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.zone?.city)}</p></div><div class="pt-2" data-v-92b07884><div class="flex items-center gap-2 text-primary" data-v-92b07884>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:calendar",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span class="text-sm font-semibold" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.delivery_date)}</span></div><div class="text-xs text-gray-400 pl-6 capitalize" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.delivery_slot)}</div></div></div><div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4" data-v-92b07884><h3 class="font-display font-semibold text-gray-900 border-b border-gray-50 pb-3" data-v-92b07884>Paiement</h3><div class="flex items-center justify-between text-sm" data-v-92b07884><span class="text-gray-500" data-v-92b07884>Méthode</span><span class="font-bold uppercase text-gray-900" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.payment_method)}</span></div><div class="flex items-center justify-between text-sm" data-v-92b07884><span class="text-gray-500" data-v-92b07884>Statut</span><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(order)?.payment_status === "paid" ? "text-green-600" : "text-orange-500", "font-bold"])}" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(order)?.payment_status === "paid" ? "Payé" : "En attente")}</span></div></div></div></div>`);
      }
      serverRenderer_cjs_prodExports.ssrRenderTeleport(_push, (_push2) => {
        if (vueExports.unref(showLivreurModal)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" data-v-92b07884><div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" data-v-92b07884></div><div class="bg-white rounded-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200" data-v-92b07884><div class="p-6 border-b border-gray-100 flex items-center justify-between" data-v-92b07884><h3 class="font-display font-semibold text-gray-900" data-v-92b07884>Assigner un livreur</h3><button class="text-gray-400 hover:text-gray-600" data-v-92b07884>`);
          _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-5 h-5"
          }, null, _parent));
          _push2(`</button></div><div class="p-6 space-y-4" data-v-92b07884><!--[-->`);
          serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(livreurs), (l) => {
            _push2(`<div class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all" data-v-92b07884><div class="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(l.name.charAt(0))}</div><div class="flex-1" data-v-92b07884><p class="text-sm font-semibold text-gray-900" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(l.name)}</p><p class="text-xs text-gray-500" data-v-92b07884>${serverRenderer_cjs_prodExports.ssrInterpolate(l.phone)}</p></div>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
              name: "heroicons:chevron-right",
              class: "w-4 h-4 text-gray-300"
            }, null, _parent));
            _push2(`</div>`);
          });
          _push2(`<!--]--></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/commandes/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-92b07884"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Mzy7paAa.mjs.map
