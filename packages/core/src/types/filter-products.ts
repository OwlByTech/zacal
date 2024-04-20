export class FilterProducts {
    color?: string[]
    sort?: "price_asc" | "price_desc" | "created_at"
    size?: string[]
    material?: string[]
    category?: string[]
    tags?: string[]
    minPrice?: number
    maxPrice?: number
    take: number
    skip: number
}
