import { _ as __nuxt_component_0 } from './StepBar-CTzpbFp5.mjs';
import { v as vueExports, a as useAsyncData, s as serverRenderer_cjs_prodExports, b as __nuxt_component_0$1, _ as __nuxt_component_1$1 } from './server.mjs';
import { u as useCartStore } from './cart-BgxWSgO2.mjs';
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
  __name: "adresse",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const cartStore = useCartStore();
    const { api } = useApi();
    const { format } = useFormatPrice();
    const { data: addresses, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      "checkout-addresses",
      () => api("/addresses")
    )), __temp = await __temp, __restore(), __temp);
    const { data: zones } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      "delivery-zones",
      () => api("/zones")
    )), __temp = await __temp, __restore(), __temp);
    const showNewAddressForm = vueExports.ref(false);
    const saving = vueExports.ref(false);
    const mapReady = vueExports.ref(false);
    const mapContainer = vueExports.ref(null);
    let map = null;
    let marker = null;
    const form = vueExports.reactive({
      label: "",
      address_text: "",
      delivery_zone_id: "",
      latitude: null,
      longitude: null,
      is_default: false
    });
    vueExports.watch(showNewAddressForm, (val) => {
      if (val) {
        setTimeout(initMap, 100);
      }
    });
    function initMap() {
      if (!mapContainer.value || typeof google === "undefined") return;
      const defaultPos = { lat: 6.1256, lng: 1.2254 };
      map = new google.maps.Map(mapContainer.value, {
        center: defaultPos,
        zoom: 13,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "weight": "2.00" }]
          },
          {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#9c9c9c" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "on" }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{ "color": "#f2f2f2" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true
      });
      marker = new google.maps.Marker({
        position: defaultPos,
        map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        }
      });
      google.maps.event.addListener(marker, "dragend", () => {
        const pos = marker?.getPosition();
        if (pos) {
          form.latitude = pos.lat();
          form.longitude = pos.lng();
          reverseGeocode(pos.lat(), pos.lng());
        }
      });
      mapReady.value = true;
    }
    function reverseGeocode(lat, lng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          form.address_text = results[0].formatted_address;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CheckoutStepBar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "bg-[#F8FAF9] min-h-screen font-sans pb-24" }, _attrs))} data-v-9eb9226a><div class="max-w-7xl mx-auto py-8 lg:py-12" data-v-9eb9226a>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_CheckoutStepBar, { "current-step": 2 }, null, _parent));
      _push(`<div class="max-w-4xl mx-auto px-4" data-v-9eb9226a><div class="flex flex-col sm:flex-row gap-4 items-center sm:items-end justify-between mb-8 text-center sm:text-left" data-v-9eb9226a><div data-v-9eb9226a><h1 class="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight" data-v-9eb9226a>Où livrer votre commande ?</h1><p class="text-gray-400 mt-1 text-sm font-medium" data-v-9eb9226a>Sélectionnez une adresse pour la livraison.</p></div>`);
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
            _push2(` Modifier mon panier `);
          } else {
            return [
              vueExports.createVNode(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "w-3 h-3"
              }),
              vueExports.createTextVNode(" Modifier mon panier ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-v-9eb9226a><div class="lg:col-span-8 space-y-4" data-v-9eb9226a><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(addresses), (address) => {
        _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "tunnel-card-active": vueExports.unref(cartStore).addressId === address.id }, "tunnel-card p-6 cursor-pointer relative group"])}" data-v-9eb9226a><div class="flex items-start gap-4" data-v-9eb9226a><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "bg-primary text-white": vueExports.unref(cartStore).addressId === address.id }, "w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 transition-colors group-hover:bg-primary/5 group-hover:text-primary"])}" data-v-9eb9226a>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: address.label?.toLowerCase() === "bureau" ? "heroicons:building-office" : "heroicons:home",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</div><div class="flex-1" data-v-9eb9226a><div class="flex items-center justify-between" data-v-9eb9226a><h3 class="font-display font-bold text-lg text-gray-900" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(address.label)}</h3>`);
        if (vueExports.unref(cartStore).addressId === address.id) {
          _push(`<div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white" data-v-9eb9226a>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
            name: "heroicons:check",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-gray-500 text-sm mt-1" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(address.address_text)}</p><div class="flex items-center gap-2 mt-2" data-v-9eb9226a><span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(address.city)}</span>`);
        if (address.delivery_zone) {
          _push(`<span class="w-1 h-1 bg-gray-200 rounded-full" data-v-9eb9226a></span>`);
        } else {
          _push(`<!---->`);
        }
        if (address.delivery_zone) {
          _push(`<span class="text-[10px] text-primary font-bold uppercase tracking-widest" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(address.delivery_zone.name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--><button class="w-full py-6 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-all text-sm font-bold group" data-v-9eb9226a>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: vueExports.unref(showNewAddressForm) ? "heroicons:minus" : "heroicons:plus",
        class: "w-5 h-5 group-hover:rotate-90 transition-transform"
      }, null, _parent));
      _push(` ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(showNewAddressForm) ? "Annuler" : "Ajouter une nouvelle adresse")}</button>`);
      if (vueExports.unref(showNewAddressForm)) {
        _push(`<div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm overflow-hidden" data-v-9eb9226a><h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8" data-v-9eb9226a>Nouvelle adresse de livraison</h3><form class="grid sm:grid-cols-2 gap-6" data-v-9eb9226a><div class="relative group" data-v-9eb9226a><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(form).label)} required type="text" id="label" class="peer w-full bg-gray-50 border-b-2 border-primary/20 rounded-t-lg px-4 py-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary transition-all" placeholder=" " data-v-9eb9226a><label for="label" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gray-400" data-v-9eb9226a> TITRE (MAISON, BUREAU...) </label></div><div class="relative group" data-v-9eb9226a><select required id="zone" class="peer w-full bg-gray-50 border-b-2 border-primary/20 rounded-t-lg px-4 py-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary transition-all appearance-none" data-v-9eb9226a><option value="" disabled selected data-v-9eb9226a>Choisir une zone</option><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(zones), (zone) => {
          _push(`<option${serverRenderer_cjs_prodExports.ssrRenderAttr("value", zone.id)} data-v-9eb9226a${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(vueExports.unref(form).delivery_zone_id) ? serverRenderer_cjs_prodExports.ssrLooseContain(vueExports.unref(form).delivery_zone_id, zone.id) : serverRenderer_cjs_prodExports.ssrLooseEqual(vueExports.unref(form).delivery_zone_id, zone.id)) ? " selected" : ""}>${serverRenderer_cjs_prodExports.ssrInterpolate(zone.name)} (${serverRenderer_cjs_prodExports.ssrInterpolate(zone.delivery_fee)} FCFA) </option>`);
        });
        _push(`<!--]--></select><label for="zone" class="absolute left-4 -top-2 text-[10px] text-primary font-bold pointer-events-none transition-all" data-v-9eb9226a> ZONE DE LIVRAISON </label>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-down",
          class: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
        }, null, _parent));
        _push(`</div><div class="sm:col-span-2 relative group" data-v-9eb9226a><textarea minlength="3" required id="address" rows="3" class="peer w-full bg-gray-50 border-b-2 border-primary/20 rounded-t-lg px-4 py-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary transition-all resize-none" placeholder=" " data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(form).address_text)}</textarea><label for="address" class="absolute left-4 top-6 text-gray-400 text-sm font-bold pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-primary" data-v-9eb9226a> ADRESSE EXACTE </label></div><div class="sm:col-span-2 space-y-4" data-v-9eb9226a><div class="flex items-center justify-between" data-v-9eb9226a><h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest" data-v-9eb9226a>Ma position précise</h4><button type="button" class="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline" data-v-9eb9226a>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
          name: "heroicons:map-pin",
          class: "w-3 h-3"
        }, null, _parent));
        _push(` ME GÉOLOCALISER </button></div><div class="relative h-64 w-full rounded-2xl overflow-hidden border-2 border-primary/10 shadow-inner group" data-v-9eb9226a><div class="absolute inset-0 bg-gray-100" data-v-9eb9226a></div><div class="absolute inset-0 pointer-events-none border-2 border-transparent group-focus-within:border-primary transition-colors rounded-2xl" data-v-9eb9226a></div>`);
        if (!vueExports.unref(mapReady)) {
          _push(`<div class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10" data-v-9eb9226a><div class="flex flex-col items-center gap-2" data-v-9eb9226a><div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" data-v-9eb9226a></div><span class="text-[10px] font-bold text-gray-400 tracking-widest" data-v-9eb9226a>CHARGEMENT DE LA CARTE...</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-2 gap-4" data-v-9eb9226a><div class="bg-gray-50 rounded-xl p-3 border border-primary/5" data-v-9eb9226a><span class="block text-[8px] font-bold text-gray-400 uppercase tracking-tighter mb-1" data-v-9eb9226a>LATITUDE</span><code class="text-xs font-mono text-gray-600" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(form).latitude || "0.00000000")}</code></div><div class="bg-gray-50 rounded-xl p-3 border border-primary/5" data-v-9eb9226a><span class="block text-[8px] font-bold text-gray-400 uppercase tracking-tighter mb-1" data-v-9eb9226a>LONGITUDE</span><code class="text-xs font-mono text-gray-600" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(form).longitude || "0.00000000")}</code></div></div></div><div class="sm:col-span-2" data-v-9eb9226a><button type="submit"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(saving)) ? " disabled" : ""} class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 text-sm uppercase tracking-widest" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(saving) ? "Enregistrement..." : "Enregistrer cette adresse")}</button></div></form></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lg:col-span-4 lg:sticky lg:top-8 space-y-4" data-v-9eb9226a><div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" data-v-9eb9226a><h3 class="font-display font-bold text-lg mb-6 text-gray-900 tracking-tight" data-v-9eb9226a>Résumé</h3><div class="space-y-4" data-v-9eb9226a><div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest" data-v-9eb9226a><span class="text-gray-400" data-v-9eb9226a>Articles</span><span class="text-gray-900 font-sans" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).subtotal))}</span></div><div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest" data-v-9eb9226a><span class="text-gray-400" data-v-9eb9226a>Livraison</span>`);
      if (!vueExports.unref(cartStore).addressId) {
        _push(`<span class="text-primary italic lowercase font-medium tracking-normal" data-v-9eb9226a>Choisir une adresse</span>`);
      } else {
        _push(`<span class="text-gray-900 font-sans" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).deliveryFee))}</span>`);
      }
      _push(`</div><div class="pt-4 border-t border-gray-50 flex justify-between items-center" data-v-9eb9226a><span class="font-display font-bold text-lg text-gray-900" data-v-9eb9226a>Total</span><span class="font-sans text-xl font-black text-primary" data-v-9eb9226a>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(format)(vueExports.unref(cartStore).total))}</span></div><button${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(!vueExports.unref(cartStore).addressId) ? " disabled" : ""} class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-sm transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 disabled:bg-gray-200 disabled:shadow-none" data-v-9eb9226a> Continuer `);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-right",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/adresse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const adresse = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9eb9226a"]]);

export { adresse as default };
//# sourceMappingURL=adresse-CtQdRBeB.mjs.map
