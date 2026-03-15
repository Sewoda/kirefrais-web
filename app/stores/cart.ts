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

interface CartState {
    items: CartItem[]
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
        subtotal: (s) => s.items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
        total(): number { 
            const fee = this.addressId ? this.deliveryFee : 0
            return this.subtotal + fee - this.discount 
        },
        isEmpty: (s) => s.items.length === 0,
    },

    actions: {
        add(kit: Kit, portions: 1 | 2 | 4) {
            const priceMap = { 1: kit.prices['1p'], 2: kit.prices['2p'], 4: kit.prices['4p'] }
            const existing = this.items.find(i => i.kitId === kit.id && i.portions === portions)

            if (existing) {
                existing.quantity++
            } else {
                let img = '/placeholder.jpg'
                if (Array.isArray(kit.images) && kit.images.length > 0) img = kit.images[0]
                else if (typeof kit.images === 'string') {
                    try {
                        const parsed = JSON.parse(kit.images)
                        if (Array.isArray(parsed) && parsed.length > 0) img = parsed[0]
                    } catch {
                        const cleaned = String(kit.images).replace(/^\[["']|["']\]$/g, '')
                        if (cleaned && cleaned.includes('http')) img = cleaned
                    }
                }
                
                this.items.push({
                    kitId: kit.id,
                    name: kit.name,
                    image: img,
                    portions,
                    quantity: 1,
                    unitPrice: priceMap[portions],
                })
            }
        },

        remove(kitId: number, portions: number) {
            this.items = this.items.filter(i => !(i.kitId === kitId && i.portions === portions))
        },

        updateQty(kitId: number, portions: number, qty: number) {
            const item = this.items.find(i => i.kitId === kitId && i.portions === portions)
            if (item) {
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
