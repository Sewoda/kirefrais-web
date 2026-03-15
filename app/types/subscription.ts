export interface Subscription {
    id: number
    user_id: number
    meal_kit_id: number
    address_id: number
    portions: number
    frequency: 'weekly' | 'biweekly' | 'monthly'
    delivery_slot: 'morning' | 'afternoon' | 'evening'
    status: 'active' | 'paused' | 'cancelled'
    next_delivery_date: string
    pause_weeks: number
    created_at: string
    kit?: {
        id: number
        name: string
        images: string[]
    }
}
