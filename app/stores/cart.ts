import { defineStore } from 'pinia'
import type { Kit } from '~/types/kit'

export interface CartItem {
    kitId: number
    name: string
    image: string
    portions: 1 | 2 | 4
    quantity: number
    unitPrice: number
}

interface SelectedPack {
    id: string
    name: string
    kits: number
    portions: 1 | 2 | 4
    price: number
}

interface CartState {
    items: CartItem[]
    selectedPack: SelectedPack | null
    deliveryDate: string | null
    deliverySlot: 'morning' | 'afternoon' | 'evening' | null
    addressId: number | null
    zoneId: number | null
    deliveryFee: number
    promoCode: string | null
    discount: number
    open: boolean
}

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({
        items: [],
        selectedPack: null,
        deliveryDate: null,
        deliverySlot: null,
        addressId: null,
        zoneId: null,
        deliveryFee: 0,
        promoCode: null,
        discount: 0,
        open: false,
    }),

    getters: {
        count: (s) => s.items.reduce((acc, i) => acc + i.quantity, 0),
        subtotal: (s) => {
            if (s.selectedPack) return s.selectedPack.price
            return s.items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0)
        },
        total(): number { 
            const fee = this.addressId ? Number(this.deliveryFee) : 0
            return Number(this.subtotal) + fee - Number(this.discount) 
        },
        isEmpty: (s) => s.items.length === 0 && !s.selectedPack,
        isPackLimitReached: (s) => s.selectedPack ? s.items.reduce((acc, i) => acc + (i.quantity || 0), 0) >= s.selectedPack.kits : false,
        remainingSlots: (s) => s.selectedPack ? Math.max(0, s.selectedPack.kits - s.items.reduce((acc, i) => acc + (i.quantity || 0), 0)) : 0
    },

    actions: {
        setPack(pack: SelectedPack) {
            this.selectedPack = pack
            this.items = [] // Reset items when choosing a new pack
        },
        clearPack() { this.selectedPack = null },

        add(kit: Kit, portionsInput: 1 | 2 | 4) {
            // If a pack is selected, we override portions to the pack setting
            const portions = this.selectedPack ? this.selectedPack.portions : portionsInput

            // If a pack is selected, strictly check limit
            if (this.selectedPack && this.isPackLimitReached) {
                return 
            }

            // Extract price from the standard interface
            const unitPrice = kit.prices[portions === 1 ? '1p' : portions === 2 ? '2p' : '4p'] || 0
            const existing = this.items.find(i => i.kitId === kit.id && i.portions === portions)

            if (existing) {
                existing.quantity++
            } else {
                const img = kit.images && kit.images[0] ? kit.images[0] : '/placeholder.jpg'
                this.items.push({
                    kitId: kit.id,
                    name: kit.name,
                    image: img as string,
                    portions,
                    quantity: 1,
                    unitPrice,
                })
            }
        },

        remove(kitId: number, portions: number) {
            this.items = this.items.filter(i => !(i.kitId === kitId && i.portions === portions))
        },

        updateQty(kitId: number, portions: number, qty: number) {
            const item = this.items.find(i => i.kitId === kitId && i.portions === portions)
            if (item) {
                // If quantity is increasing, check if we still have sots
                if (qty > item.quantity && this.selectedPack && this.isPackLimitReached) {
                    return // Block increase
                }
                
                if (qty <= 0) this.remove(kitId, portions)
                else item.quantity = qty
            }
        },

        applyPromo(code: string, discount: number) {
            this.promoCode = code
            this.discount = discount
        },

        clear() { this.$reset() },
    },

    persist: true,
})
