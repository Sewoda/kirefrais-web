<template>
  <Teleport to="body">
    <div v-if="cartStore.open" class="fixed inset-0 z-[60] overflow-hidden font-sans">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        @click="cartStore.open = false" 
      />
      
      <!-- Drawer -->
      <div class="absolute inset-y-0 right-0 max-w-full flex">
        <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col pointer-events-auto">
          <!-- Header -->
          <div class="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <h2 class="text-base font-display font-bold text-gray-900 flex items-center gap-2 uppercase tracking-widest">
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-primary" />
              Panier
              <span class="text-xs font-bold text-gray-400">({{ cartStore.count }})</span>
            </h2>
            <button 
              @click="cartStore.open = false"
              class="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar bg-brand-cream/10">
            <div v-if="cartStore.isEmpty" class="h-full flex flex-col items-center justify-center text-center py-12">
              <div class="w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Icon name="heroicons:shopping-cart" class="w-8 h-8 text-gray-300" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Votre panier est vide</h3>
              <p class="text-xs text-gray-500 max-w-[200px] mb-10 leading-relaxed font-medium">
                Découvrez nos kits repas et commencez à cuisiner comme un chef !
              </p>
              <NuxtLink 
                to="/catalogue" 
                @click="cartStore.open = false"
                class="bg-primary text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md hover:bg-primary-dark transition-all"
              >
                Voir le catalogue
              </NuxtLink>
            </div>

            <div v-else class="space-y-8">
              <!-- Pack Header (Subscription) -->
              <div v-if="cartStore.selectedPack" class="bg-primary/10 p-5 rounded-2xl border border-primary/20 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                   <button @click="cartStore.clearPack()" class="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Annuler le pack</button>
                </div>
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                    <Icon name="heroicons:star-solid" class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 leading-none mb-1">{{ cartStore.selectedPack.name }}</h3>
                    <p class="text-[10px] font-black uppercase tracking-widest text-primary">{{ cartStore.selectedPack.portions }} portions · {{ cartStore.selectedPack.kits }} kits</p>
                  </div>
                </div>
                
                <!-- Progress Bar -->
                <div class="space-y-2">
                  <div class="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                    <span :class="cartStore.isPackLimitReached ? 'text-green-600' : 'text-gray-500'">
                      {{ cartStore.isPackLimitReached ? 'Box complète !' : 'Remplissez votre box' }}
                    </span>
                    <span class="text-gray-900">{{ cartStore.count }} / {{ cartStore.selectedPack.kits }}</span>
                  </div>
                  <div class="h-2 bg-white rounded-full overflow-hidden border border-gray-100">
                    <div 
                      class="h-full bg-primary transition-all duration-500"
                      :style="{ width: `${(cartStore.count / cartStore.selectedPack.kits) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Cart Items -->
              <div 
                v-for="item in cartStore.items" 
                :key="`${item.kitId}-${item.portions}`"
                class="flex gap-4 group bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
              >
                <!-- Image -->
                <div class="w-24 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                  <NuxtImg 
                    :src="item.image" 
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <!-- Details -->
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start mb-1">
                    <h4 class="font-bold text-gray-900 text-sm truncate pr-2 tracking-tight">{{ item.name }}</h4>
                    <button 
                      @click="cartStore.remove(item.kitId, item.portions)"
                      class="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Icon name="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{{ item.portions }} portions</p>
                  
                  <div class="flex items-center justify-between mt-auto">
                    <!-- Qty -->
                    <div class="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                      <button 
                        @click="cartStore.updateQty(item.kitId, item.portions, item.quantity - 1)"
                        class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                      >
                        <Icon name="heroicons:minus" class="w-3 h-3" />
                      </button>
                      <span class="text-xs font-bold text-gray-900 min-w-[16px] text-center">
                        {{ item.quantity }}
                      </span>
                      <button 
                        @click="cartStore.updateQty(item.kitId, item.portions, item.quantity + 1)"
                        :disabled="cartStore.selectedPack && cartStore.isPackLimitReached"
                        class="w-6 h-6 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        :class="cartStore.selectedPack && cartStore.isPackLimitReached ? 'text-gray-300' : 'text-gray-400 hover:text-primary'"
                      >
                        <Icon name="heroicons:plus" class="w-3 h-3" />
                      </button>
                    </div>
                    <span class="font-sans font-extrabold text-gray-900 text-sm">
                      {{ cartStore.selectedPack ? 'Inclus' : format(item.unitPrice * item.quantity) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div v-if="!cartStore.isEmpty" class="px-6 py-8 border-t border-gray-100 space-y-6 bg-white">
            <div class="flex flex-col gap-3">
              <div class="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>{{ cartStore.selectedPack ? 'Prix du Pack' : 'Sous-total' }}</span>
                <span class="text-gray-900 font-sans tracking-normal font-extrabold text-sm">{{ format(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Livraison</span>
                <span v-if="!cartStore.addressId" class="text-primary italic lowercase font-medium tracking-normal">À calculer</span>
                <span class="text-primary font-sans tracking-normal font-extrabold text-sm" v-else-if="cartStore.deliveryFee === 0">Gratuit</span>
                <span class="text-gray-900 font-sans tracking-normal font-extrabold text-sm" v-else>{{ format(cartStore.deliveryFee) }}</span>
              </div>
              <div v-if="cartStore.discount > 0" class="flex justify-between text-xs font-bold text-secondary uppercase tracking-widest">
                <span>Remise</span>
                <span class="font-sans tracking-normal font-extrabold text-sm">- {{ format(cartStore.discount) }}</span>
              </div>
              <div class="flex justify-between items-center pt-4 border-t border-gray-50">
                <span class="text-sm font-display font-bold text-gray-900 uppercase tracking-[0.2em]">Total</span>
                <span class="font-sans font-black text-2xl text-gray-900">{{ format(cartStore.total) }}</span>
              </div>
            </div>

            <button 
              @click="goToCheckout"
              :disabled="cartStore.selectedPack && !cartStore.isPackLimitReached"
              class="w-full bg-secondary hover:bg-secondary-dark text-white py-4.5 rounded-xl text-base font-bold transition-all
                     flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
            >
              {{ cartStore.selectedPack && !cartStore.isPackLimitReached ? 'Complétez votre box' : 'Continuer' }}
              <Icon name="heroicons:arrow-right" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { format } = useFormatPrice()

const goToCheckout = () => {
  cartStore.open = false
  navigateTo('/panier')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}
</style>
