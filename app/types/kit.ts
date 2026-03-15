export interface Kit {
    id: number
    name: string
    slug: string
    description: string
    ingredients: string
    images: string[]
    prep_time: number
    difficulty: 'easy' | 'medium' | 'hard'
    nutrition: {
        calories: number
        proteins: number
        carbs: number
        fats: number
        fiber: number
    }
    prices: {
        '1p': number
        '2p': number
        '4p': number
    }
    is_vegetarian: boolean
    is_new: boolean
    rating_avg: number
    rating_count: number
    category_id?: number
    recipe_steps?: {
        title: string
        content: string
        image?: string
    }[]
    category?: {
        id: number
        name: string
        icon: string
    }
}

export interface PaginatedKits {
    data: Kit[]
    links: {
        first: string
        last: string
        prev: string | null
        next: string | null
    }
    meta: {
        current_page: number
        from: number
        last_page: number
        links: any[]
        path: string
        per_page: number
        to: number
        total: number
    }
}
