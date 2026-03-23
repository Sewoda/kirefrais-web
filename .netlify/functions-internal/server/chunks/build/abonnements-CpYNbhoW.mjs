import { _ as __nuxt_component_0 } from './ProfileLayout-Cnx5ZkL5.mjs';
import { v as vueExports, u as useSeoMeta, a as useAsyncData, s as serverRenderer_cjs_prodExports, b as __nuxt_component_0$1, _ as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-C5Vjpk5l.mjs';
import { toast } from 'vue-sonner';
import { u as useApi } from './useApi-CdIKQgGC.mjs';
import './useCurrentUser-DvSG2TCC.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "abonnements",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({ title: "Mes Abonnements — Kirefrais" });
    const { api } = useApi();
    const showCreateModal = vueExports.ref(false);
    const creating = vueExports.ref(false);
    function getCoverImage(kit) {
      if (!kit || !kit.images) return null;
      if (Array.isArray(kit.images) && kit.images.length > 0) return kit.images[0];
      if (typeof kit.images === "string") {
        try {
          const parsed = JSON.parse(kit.images);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
        } catch {
        }
        const cleaned = String(kit.images).replace(/^\[["']|["']\]$/g, "");
        if (cleaned && cleaned.includes("http")) return cleaned;
      }
      return null;
    }
    const form = vueExports.reactive({
      meal_kit_id: "",
      address_id: "",
      portions: 2,
      frequency: "weekly",
      delivery_slot: "morning",
      next_delivery_date: ""
    });
    const frequencies = [
      { value: "weekly", label: "Chaque semaine" },
      { value: "biweekly", label: "Toutes les 2 sem." },
      { value: "monthly", label: "Chaque mois" }
    ];
    const slots = [
      { value: "morning", label: "🌅 Matin" },
      { value: "afternoon", label: "☀️ Midi" },
      { value: "evening", label: "🌙 Soir" }
    ];
    const frequencyLabel = (f) => frequencies.find((x) => x.value === f)?.label || f;
    const slotLabel = (s) => slots.find((x) => x.value === s)?.label || s;
    const { data: subscriptions, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      "user-subscriptions",
      () => api("/subscriptions")
    )), __temp = await __temp, __restore(), __temp);
    const { data: allKits } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      "all-kits-for-sub",
      () => api("/kits").then((r) => r.data || r)
    )), __temp = await __temp, __restore(), __temp);
    const { data: addresses } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      "user-addresses",
      () => api("/addresses")
    )), __temp = await __temp, __restore(), __temp);
    async function createSubscription() {
      if (!form.meal_kit_id || !form.address_id || !form.next_delivery_date) {
        toast.error("Veuillez remplir tous les champs.");
        return;
      }
      creating.value = true;
      try {
        await api("/subscriptions", { method: "POST", body: form });
        toast.success("Abonnement créé ! 🎉");
        showCreateModal.value = false;
        refresh();
      } catch (err) {
        toast.error(err?.data?.message || "Erreur lors de la création.");
      } finally {
        creating.value = false;
      }
    }
    async function pauseSubscription(id) {
      try {
        await api(`/subscriptions/${id}/pause`, { method: "PUT", body: { weeks: 1 } });
        toast.success("Abonnement mis en pause.");
        refresh();
      } catch {
        toast.error("Erreur.");
      }
    }
    async function resumeSubscription(id) {
      try {
        await api(`/subscriptions/${id}`, { method: "PUT", body: { status: "active" } });
        toast.success("Abonnement repris !");
        refresh();
      } catch {
        toast.error("Erreur.");
      }
    }
    async function cancelSubscription(id) {
      if (!confirm("Êtes-vous sûr(e) de vouloir annuler cet abonnement ?")) return;
      try {
        await api(`/subscriptions/${id}`, { method: "DELETE" });
        toast.success("Abonnement annulé.");
        refresh();
      } catch {
        toast.error("Erreur.");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProfileLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtImg = __nuxt_component_2;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ProfileLayout, _attrs, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
              to: "/profil",
              class: "w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 shrink-0"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                    name: "heroicons:arrow-left",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_Icon, {
                      name: "heroicons:arrow-left",
                      class: "w-5 h-5"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="font-display font-bold text-2xl text-gray-900 tracking-tight mb-1"${_scopeId}>Mes Abonnements</h1><p class="text-gray-500 font-medium text-xs leading-relaxed"${_scopeId}>Gérez vos livraisons automatiques</p></div></div><button class="bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm w-full md:w-auto"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
              name: "heroicons:plus",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(` Nouvel abonnement </button></div>`);
            if (vueExports.unref(pending)) {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              serverRenderer_cjs_prodExports.ssrRenderList(3, (i) => {
                _push2(`<div class="h-32 bg-white rounded-2xl animate-pulse border border-gray-100"${_scopeId}></div>`);
              });
              _push2(`<!--]--></div>`);
            } else if (!vueExports.unref(subscriptions)?.length) {
              _push2(`<div class="bg-white rounded-3xl border border-gray-100 py-32 text-center shadow-sm"${_scopeId}><div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-100"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-path",
                class: "w-10 h-10 text-gray-200"
              }, null, _parent2, _scopeId));
              _push2(`</div><h2 class="font-display font-bold text-2xl text-gray-900 mb-4 tracking-tight"${_scopeId}>Aucun abonnement actif</h2><p class="text-gray-400 max-w-sm mx-auto mb-10 leading-relaxed font-medium"${_scopeId}>Abonnez-vous à vos kits favoris et recevez-les automatiquement sans passer commande.</p><button class="bg-secondary text-white font-bold px-10 py-4 rounded-xl shadow-md transition-all hover:bg-secondary-dark active:scale-95"${_scopeId}> Commencer un abonnement </button></div>`);
            } else {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(subscriptions), (sub) => {
                _push2(`<div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-all"${_scopeId}><div class="flex flex-col md:flex-row md:items-center justify-between gap-8"${_scopeId}><div class="flex items-center gap-8"${_scopeId}><div class="w-24 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-100"${_scopeId}>`);
                if (getCoverImage(sub.kit)) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtImg, {
                    src: getCoverImage(sub.kit),
                    class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<div class="w-full h-full bg-gray-50 flex items-center justify-center"${_scopeId}>`);
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                    name: "heroicons:beaker",
                    class: "w-8 h-8 text-gray-200"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><div class="min-w-0"${_scopeId}><h3 class="font-display font-bold text-xl text-gray-900 mb-3 tracking-tight truncate"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(sub.kit?.name || "Kit Repas")}</h3><div class="flex flex-wrap items-center gap-2"${_scopeId}><span class="bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(sub.portions)}P </span><span class="bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(frequencyLabel(sub.frequency))}</span><span class="bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(slotLabel(sub.delivery_slot))}</span></div></div></div><div class="flex items-center gap-6 justify-between md:justify-end"${_scopeId}><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{
                  "bg-green-50 border-green-100 text-green-700": sub.status === "active",
                  "bg-yellow-50 border-yellow-100 text-yellow-700": sub.status === "paused",
                  "bg-red-50 border-red-100 text-red-700": sub.status === "cancelled"
                }, "flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm"])}"${_scopeId}><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([sub.status === "active" ? "bg-green-500" : "bg-current", "w-1.5 h-1.5 rounded-full"])}"${_scopeId}></span> ${serverRenderer_cjs_prodExports.ssrInterpolate(sub.status === "active" ? "Actif" : sub.status === "paused" ? "En pause" : "Annulé")}</div>`);
                if (sub.status === "active") {
                  _push2(`<div class="text-right hidden xl:block"${_scopeId}><p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none"${_scopeId}>Prochaine</p><p class="text-xs font-black text-gray-900 tracking-tight"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(sub.next_delivery_date)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex gap-2"${_scopeId}>`);
                if (sub.status === "active") {
                  _push2(`<button class="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-yellow-50 hover:text-yellow-600 border border-transparent hover:border-yellow-100 transition-all" title="Mettre en pause"${_scopeId}>`);
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                    name: "heroicons:pause",
                    class: "w-5 h-5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (sub.status === "paused") {
                  _push2(`<button class="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-green-50 hover:text-green-600 border border-transparent hover:border-green-100 transition-all" title="Reprendre"${_scopeId}>`);
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                    name: "heroicons:play",
                    class: "w-5 h-5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (sub.status !== "cancelled") {
                  _push2(`<button class="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-100 transition-all" title="Annuler"${_scopeId}>`);
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                    name: "heroicons:x-mark",
                    class: "w-5 h-5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            serverRenderer_cjs_prodExports.ssrRenderTeleport(_push2, (_push3) => {
              if (vueExports.unref(showCreateModal)) {
                _push3(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"${_scopeId}><div class="absolute inset-0 bg-black/40 backdrop-blur-sm"${_scopeId}></div><div class="relative bg-white rounded-3xl w-full max-w-lg p-10 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100"${_scopeId}><button class="absolute top-8 right-8 p-1 rounded-lg text-gray-300 hover:text-gray-900 transition-colors"${_scopeId}>`);
                _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
                  name: "heroicons:x-mark",
                  class: "w-6 h-6"
                }, null, _parent2, _scopeId));
                _push3(`</button><h2 class="font-display font-bold text-2xl text-gray-900 mb-10 tracking-tight"${_scopeId}>Nouvel abonnement</h2><form class="space-y-8"${_scopeId}><div${_scopeId}><label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3"${_scopeId}>Sélectionner un kit</label><select required class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all"${_scopeId}><option value=""${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(form).meal_kit_id) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(form).meal_kit_id, "") : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(form).meal_kit_id, "")) ? " selected" : ""}${_scopeId}>Choisissez une recette...</option><!--[-->`);
                serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(allKits), (kit) => {
                  _push3(`<option${serverRenderer_cjs_prodExports.ssrRenderAttr("value", kit.id)}${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(form).meal_kit_id) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(form).meal_kit_id, kit.id) : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(form).meal_kit_id, kit.id)) ? " selected" : ""}${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(kit.name)}</option>`);
                });
                _push3(`<!--]--></select></div><div${_scopeId}><label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3"${_scopeId}>Nombre de portions</label><div class="grid grid-cols-3 gap-3"${_scopeId}><!--[-->`);
                serverRenderer_cjs_prodExports.ssrRenderList([1, 2, 4], (p) => {
                  _push3(`<button type="button" class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(form).portions === p ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100", "py-4 rounded-xl text-center font-bold text-sm border transition-all"])}"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(p)} pers. </button>`);
                });
                _push3(`<!--]--></div></div><div${_scopeId}><label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3"${_scopeId}>Fréquence</label><div class="grid grid-cols-1 md:grid-cols-3 gap-3"${_scopeId}><!--[-->`);
                serverRenderer_cjs_prodExports.ssrRenderList(frequencies, (f) => {
                  _push3(`<button type="button" class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(form).frequency === f.value ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100", "py-4 rounded-xl text-center font-bold text-[10px] uppercase tracking-widest border transition-all"])}"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(f.label)}</button>`);
                });
                _push3(`<!--]--></div></div><div${_scopeId}><label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3"${_scopeId}>Créneau de livraison</label><div class="grid grid-cols-3 gap-3"${_scopeId}><!--[-->`);
                serverRenderer_cjs_prodExports.ssrRenderList(slots, (s) => {
                  _push3(`<button type="button" class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(form).delivery_slot === s.value ? "border-secondary bg-secondary/5 text-secondary shadow-sm" : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100", "py-4 rounded-xl text-center font-bold text-xs border transition-all"])}"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(s.label)}</button>`);
                });
                _push3(`<!--]--></div></div><div${_scopeId}><label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3"${_scopeId}>Lieu de livraison</label><select required class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all"${_scopeId}><option value=""${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(form).address_id) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(form).address_id, "") : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(form).address_id, "")) ? " selected" : ""}${_scopeId}>Sélectionnez une adresse...</option><!--[-->`);
                serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(addresses), (addr) => {
                  _push3(`<option${serverRenderer_cjs_prodExports.ssrRenderAttr("value", addr.id)}${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(form).address_id) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(form).address_id, addr.id) : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(form).address_id, addr.id)) ? " selected" : ""}${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(addr.label)}</option>`);
                });
                _push3(`<!--]--></select></div><div${_scopeId}><label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3"${_scopeId}>Date de début</label><div class="relative"${_scopeId}><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(form).next_delivery_date)} type="date" required class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner"${_scopeId}></div></div><button type="submit"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(creating)) ? " disabled" : ""} class="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 mt-4"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(creating) ? "Création..." : "Valider mon abonnement")}</button></form></div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-6" }, [
                vueExports.createVNode("div", { class: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8" }, [
                  vueExports.createVNode("div", { class: "flex items-center gap-4" }, [
                    vueExports.createVNode(_component_NuxtLink, {
                      to: "/profil",
                      class: "w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 shrink-0"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_Icon, {
                          name: "heroicons:arrow-left",
                          class: "w-5 h-5"
                        })
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode("div", null, [
                      vueExports.createVNode("h1", { class: "font-display font-bold text-2xl text-gray-900 tracking-tight mb-1" }, "Mes Abonnements"),
                      vueExports.createVNode("p", { class: "text-gray-500 font-medium text-xs leading-relaxed" }, "Gérez vos livraisons automatiques")
                    ])
                  ]),
                  vueExports.createVNode("button", {
                    onClick: ($event) => showCreateModal.value = true,
                    class: "bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm w-full md:w-auto"
                  }, [
                    vueExports.createVNode(_component_Icon, {
                      name: "heroicons:plus",
                      class: "w-5 h-5"
                    }),
                    vueExports.createTextVNode(" Nouvel abonnement ")
                  ], 8, ["onClick"])
                ]),
                vueExports.unref(pending) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "space-y-6"
                }, [
                  (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(3, (i) => {
                    return vueExports.createVNode("div", {
                      key: i,
                      class: "h-32 bg-white rounded-2xl animate-pulse border border-gray-100"
                    });
                  }), 64))
                ])) : !vueExports.unref(subscriptions)?.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  class: "bg-white rounded-3xl border border-gray-100 py-32 text-center shadow-sm"
                }, [
                  vueExports.createVNode("div", { class: "w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-100" }, [
                    vueExports.createVNode(_component_Icon, {
                      name: "heroicons:arrow-path",
                      class: "w-10 h-10 text-gray-200"
                    })
                  ]),
                  vueExports.createVNode("h2", { class: "font-display font-bold text-2xl text-gray-900 mb-4 tracking-tight" }, "Aucun abonnement actif"),
                  vueExports.createVNode("p", { class: "text-gray-400 max-w-sm mx-auto mb-10 leading-relaxed font-medium" }, "Abonnez-vous à vos kits favoris et recevez-les automatiquement sans passer commande."),
                  vueExports.createVNode("button", {
                    onClick: ($event) => showCreateModal.value = true,
                    class: "bg-secondary text-white font-bold px-10 py-4 rounded-xl shadow-md transition-all hover:bg-secondary-dark active:scale-95"
                  }, " Commencer un abonnement ", 8, ["onClick"])
                ])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 2,
                  class: "space-y-6"
                }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(subscriptions), (sub) => {
                    return vueExports.openBlock(), vueExports.createBlock("div", {
                      key: sub.id,
                      class: "bg-white p-8 rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-all"
                    }, [
                      vueExports.createVNode("div", { class: "flex flex-col md:flex-row md:items-center justify-between gap-8" }, [
                        vueExports.createVNode("div", { class: "flex items-center gap-8" }, [
                          vueExports.createVNode("div", { class: "w-24 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-100" }, [
                            getCoverImage(sub.kit) ? (vueExports.openBlock(), vueExports.createBlock(_component_NuxtImg, {
                              key: 0,
                              src: getCoverImage(sub.kit),
                              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            }, null, 8, ["src"])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 1,
                              class: "w-full h-full bg-gray-50 flex items-center justify-center"
                            }, [
                              vueExports.createVNode(_component_Icon, {
                                name: "heroicons:beaker",
                                class: "w-8 h-8 text-gray-200"
                              })
                            ]))
                          ]),
                          vueExports.createVNode("div", { class: "min-w-0" }, [
                            vueExports.createVNode("h3", { class: "font-display font-bold text-xl text-gray-900 mb-3 tracking-tight truncate" }, vueExports.toDisplayString(sub.kit?.name || "Kit Repas"), 1),
                            vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                              vueExports.createVNode("span", { class: "bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100" }, vueExports.toDisplayString(sub.portions) + "P ", 1),
                              vueExports.createVNode("span", { class: "bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100" }, vueExports.toDisplayString(frequencyLabel(sub.frequency)), 1),
                              vueExports.createVNode("span", { class: "bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100" }, vueExports.toDisplayString(slotLabel(sub.delivery_slot)), 1)
                            ])
                          ])
                        ]),
                        vueExports.createVNode("div", { class: "flex items-center gap-6 justify-between md:justify-end" }, [
                          vueExports.createVNode("div", {
                            class: ["flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm", {
                              "bg-green-50 border-green-100 text-green-700": sub.status === "active",
                              "bg-yellow-50 border-yellow-100 text-yellow-700": sub.status === "paused",
                              "bg-red-50 border-red-100 text-red-700": sub.status === "cancelled"
                            }]
                          }, [
                            vueExports.createVNode("span", {
                              class: ["w-1.5 h-1.5 rounded-full", sub.status === "active" ? "bg-green-500" : "bg-current"]
                            }, null, 2),
                            vueExports.createTextVNode(" " + vueExports.toDisplayString(sub.status === "active" ? "Actif" : sub.status === "paused" ? "En pause" : "Annulé"), 1)
                          ], 2),
                          sub.status === "active" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            class: "text-right hidden xl:block"
                          }, [
                            vueExports.createVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none" }, "Prochaine"),
                            vueExports.createVNode("p", { class: "text-xs font-black text-gray-900 tracking-tight" }, vueExports.toDisplayString(sub.next_delivery_date), 1)
                          ])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode("div", { class: "flex gap-2" }, [
                            sub.status === "active" ? (vueExports.openBlock(), vueExports.createBlock("button", {
                              key: 0,
                              onClick: ($event) => pauseSubscription(sub.id),
                              class: "p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-yellow-50 hover:text-yellow-600 border border-transparent hover:border-yellow-100 transition-all",
                              title: "Mettre en pause"
                            }, [
                              vueExports.createVNode(_component_Icon, {
                                name: "heroicons:pause",
                                class: "w-5 h-5"
                              })
                            ], 8, ["onClick"])) : vueExports.createCommentVNode("", true),
                            sub.status === "paused" ? (vueExports.openBlock(), vueExports.createBlock("button", {
                              key: 1,
                              onClick: ($event) => resumeSubscription(sub.id),
                              class: "p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-green-50 hover:text-green-600 border border-transparent hover:border-green-100 transition-all",
                              title: "Reprendre"
                            }, [
                              vueExports.createVNode(_component_Icon, {
                                name: "heroicons:play",
                                class: "w-5 h-5"
                              })
                            ], 8, ["onClick"])) : vueExports.createCommentVNode("", true),
                            sub.status !== "cancelled" ? (vueExports.openBlock(), vueExports.createBlock("button", {
                              key: 2,
                              onClick: ($event) => cancelSubscription(sub.id),
                              class: "p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-100 transition-all",
                              title: "Annuler"
                            }, [
                              vueExports.createVNode(_component_Icon, {
                                name: "heroicons:x-mark",
                                class: "w-5 h-5"
                              })
                            ], 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
                ])),
                (vueExports.openBlock(), vueExports.createBlock(vueExports.Teleport, { to: "body" }, [
                  vueExports.unref(showCreateModal) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 z-50 flex items-center justify-center p-4"
                  }, [
                    vueExports.createVNode("div", {
                      class: "absolute inset-0 bg-black/40 backdrop-blur-sm",
                      onClick: ($event) => showCreateModal.value = false
                    }, null, 8, ["onClick"]),
                    vueExports.createVNode("div", { class: "relative bg-white rounded-3xl w-full max-w-lg p-10 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100" }, [
                      vueExports.createVNode("button", {
                        onClick: ($event) => showCreateModal.value = false,
                        class: "absolute top-8 right-8 p-1 rounded-lg text-gray-300 hover:text-gray-900 transition-colors"
                      }, [
                        vueExports.createVNode(_component_Icon, {
                          name: "heroicons:x-mark",
                          class: "w-6 h-6"
                        })
                      ], 8, ["onClick"]),
                      vueExports.createVNode("h2", { class: "font-display font-bold text-2xl text-gray-900 mb-10 tracking-tight" }, "Nouvel abonnement"),
                      vueExports.createVNode("form", {
                        onSubmit: vueExports.withModifiers(createSubscription, ["prevent"]),
                        class: "space-y-8"
                      }, [
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("label", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3" }, "Sélectionner un kit"),
                          vueExports.withDirectives(vueExports.createVNode("select", {
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).meal_kit_id = $event,
                            required: "",
                            class: "w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all"
                          }, [
                            vueExports.createVNode("option", { value: "" }, "Choisissez une recette..."),
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(allKits), (kit) => {
                              return vueExports.openBlock(), vueExports.createBlock("option", {
                                key: kit.id,
                                value: kit.id
                              }, vueExports.toDisplayString(kit.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vueExports.vModelSelect, vueExports.unref(form).meal_kit_id]
                          ])
                        ]),
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("label", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3" }, "Nombre de portions"),
                          vueExports.createVNode("div", { class: "grid grid-cols-3 gap-3" }, [
                            (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([1, 2, 4], (p) => {
                              return vueExports.createVNode("button", {
                                type: "button",
                                key: p,
                                onClick: ($event) => vueExports.unref(form).portions = p,
                                class: ["py-4 rounded-xl text-center font-bold text-sm border transition-all", vueExports.unref(form).portions === p ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100"]
                              }, vueExports.toDisplayString(p) + " pers. ", 11, ["onClick"]);
                            }), 64))
                          ])
                        ]),
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("label", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3" }, "Fréquence"),
                          vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-3" }, [
                            (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(frequencies, (f) => {
                              return vueExports.createVNode("button", {
                                type: "button",
                                key: f.value,
                                onClick: ($event) => vueExports.unref(form).frequency = f.value,
                                class: ["py-4 rounded-xl text-center font-bold text-[10px] uppercase tracking-widest border transition-all", vueExports.unref(form).frequency === f.value ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100"]
                              }, vueExports.toDisplayString(f.label), 11, ["onClick"]);
                            }), 64))
                          ])
                        ]),
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("label", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3" }, "Créneau de livraison"),
                          vueExports.createVNode("div", { class: "grid grid-cols-3 gap-3" }, [
                            (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(slots, (s) => {
                              return vueExports.createVNode("button", {
                                type: "button",
                                key: s.value,
                                onClick: ($event) => vueExports.unref(form).delivery_slot = s.value,
                                class: ["py-4 rounded-xl text-center font-bold text-xs border transition-all", vueExports.unref(form).delivery_slot === s.value ? "border-secondary bg-secondary/5 text-secondary shadow-sm" : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100"]
                              }, vueExports.toDisplayString(s.label), 11, ["onClick"]);
                            }), 64))
                          ])
                        ]),
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("label", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3" }, "Lieu de livraison"),
                          vueExports.withDirectives(vueExports.createVNode("select", {
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).address_id = $event,
                            required: "",
                            class: "w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all"
                          }, [
                            vueExports.createVNode("option", { value: "" }, "Sélectionnez une adresse..."),
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(addresses), (addr) => {
                              return vueExports.openBlock(), vueExports.createBlock("option", {
                                key: addr.id,
                                value: addr.id
                              }, vueExports.toDisplayString(addr.label), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vueExports.vModelSelect, vueExports.unref(form).address_id]
                          ])
                        ]),
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("label", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3" }, "Date de début"),
                          vueExports.createVNode("div", { class: "relative" }, [
                            vueExports.withDirectives(vueExports.createVNode("input", {
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).next_delivery_date = $event,
                              type: "date",
                              required: "",
                              class: "w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vueExports.vModelText, vueExports.unref(form).next_delivery_date]
                            ])
                          ])
                        ]),
                        vueExports.createVNode("button", {
                          type: "submit",
                          disabled: vueExports.unref(creating),
                          class: "w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 mt-4"
                        }, vueExports.toDisplayString(vueExports.unref(creating) ? "Création..." : "Valider mon abonnement"), 9, ["disabled"])
                      ], 32)
                    ])
                  ])) : vueExports.createCommentVNode("", true)
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profil/abonnements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=abonnements-CpYNbhoW.mjs.map
