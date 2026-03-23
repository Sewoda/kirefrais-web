import { v as vueExports, e as useRoute$1, s as serverRenderer_cjs_prodExports, b as __nuxt_component_0$1, _ as __nuxt_component_1$1 } from './server.mjs';
import dayjs from 'dayjs';
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
import './useApi-CdIKQgGC.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    dayjs.locale("fr");
    const { user } = useCurrentUser();
    const route = useRoute$1();
    const adminInitial = vueExports.computed(() => user.value?.name?.charAt(0).toUpperCase() ?? "A");
    const todayDate = vueExports.computed(() => dayjs().format("dddd D MMMM YYYY"));
    const pageTitle = vueExports.computed(() => {
      const path = route.path;
      if (path.includes("/admin/dashboard")) return "Tableau de bord";
      if (path.includes("/admin/kits")) {
        if (path.includes("nouveau")) return "Nouveau kit";
        if (path.includes("modifier")) return "Modifier le kit";
        return "Kits repas";
      }
      if (path.includes("/admin/commandes")) {
        if (route.params.id) return `Commande #${route.params.id}`;
        return "Commandes";
      }
      if (path.includes("/admin/livreurs")) return "Livreurs";
      if (path.includes("/admin/clients")) return "Clients";
      if (path.includes("/admin/paiements")) return "Paiements";
      if (path.includes("/admin/zones")) return "Zones de livraison";
      if (path.includes("/admin/promos")) return "Codes promo";
      if (path.includes("/admin/avis")) return "Avis clients";
      return "Administration";
    });
    const navItems = [
      { to: "/admin/dashboard", icon: "heroicons:squares-2x2", label: "Tableau de bord" },
      { to: "/admin/commandes", icon: "heroicons:shopping-bag", label: "Commandes" },
      { to: "/admin/kits", icon: "heroicons:beaker", label: "Kits repas" },
      { to: "/admin/livreurs", icon: "heroicons:truck", label: "Livreurs" },
      { to: "/admin/clients", icon: "heroicons:users", label: "Clients" },
      { to: "/admin/paiements", icon: "heroicons:credit-card", label: "Paiements" },
      { to: "/admin/zones", icon: "heroicons:map-pin", label: "Zones" },
      { to: "/admin/promos", icon: "heroicons:tag", label: "Codes promo" },
      { to: "/admin/avis", icon: "heroicons:star", label: "Avis" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "min-h-screen bg-gray-50 flex" }, _attrs))}><aside class="hidden lg:flex flex-col w-64 bg-gray-900 fixed h-full z-20"><div class="px-6 py-5 border-b border-gray-800"><div class="flex items-center gap-2"><span class="font-display font-bold text-white text-lg">Kirefrais</span><span class="text-xs bg-secondary text-white px-2 py-0.5 rounded-full font-semibold"> Admin </span></div></div><nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(navItems, (item) => {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors",
          "active-class": "bg-primary text-white"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                name: item.icon,
                class: "w-4 h-4 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<span class="flex-1"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(item.label)}</span>`);
              if (item.badge) {
                _push2(`<span class="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(item.badge)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                vueExports.createVNode(_component_Icon, {
                  name: item.icon,
                  class: "w-4 h-4 shrink-0"
                }, null, 8, ["name"]),
                vueExports.createVNode("span", { class: "flex-1" }, vueExports.toDisplayString(item.label), 1),
                item.badge ? (vueExports.openBlock(), vueExports.createBlock("span", {
                  key: 0,
                  class: "bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"
                }, vueExports.toDisplayString(item.badge), 1)) : vueExports.createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-3 border-t border-gray-800"><div class="flex items-center gap-3 px-3 py-2 mb-1"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"><span class="text-white text-sm font-bold">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(adminInitial))}</span></div><div class="flex-1 min-w-0"><p class="text-white text-sm font-medium truncate">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(user)?.name)}</p><p class="text-gray-500 text-xs">Administrateur</p></div></div><button class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-right-on-rectangle",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Déconnexion </button></div></aside><div class="flex-1 lg:ml-64 flex flex-col min-h-screen"><header class="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 flex items-center justify-between"><h1 class="font-display font-semibold text-gray-900 text-lg">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(pageTitle))}</h1><div class="flex items-center gap-3"><span class="text-sm text-gray-500 hidden sm:block">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(todayDate))}</span>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        target: "_blank",
        class: "text-gray-400 hover:text-primary transition-colors p-2",
        title: "Voir le site"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-top-right-on-square",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_Icon, {
                name: "heroicons:arrow-top-right-on-square",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><main class="flex-1 p-6">`);
      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-YupHvtzO.mjs.map
