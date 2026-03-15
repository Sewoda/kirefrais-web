import type { Kit } from './kit'

export type OrderStatus =
    | 'pending' | 'paid' | 'preparing'
    | 'ready' | 'delivering' | 'delivered' | 'cancelled'

export interface OrderItem {
    id: number
    meal_kit_id: number
    portions: number
    quantity: number
    unit_price: number
    total_price: number
    kit?: Kit
}

export interface Order {
    id: number
    reference: string
    status: OrderStatus
    subtotal: number
    delivery_fee: number
    discount: number
    total_amount: number
    payment_method: 'flooz' | 'tmoney' | 'card' | 'cash'
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
    delivery_date: string
    delivery_slot: 'morning' | 'afternoon' | 'evening'
    is_subscription: boolean
    notes: string | null
    created_at: string
    items?: OrderItem[]
    deliverer?: {
        name: string
        phone: string
    }
}
