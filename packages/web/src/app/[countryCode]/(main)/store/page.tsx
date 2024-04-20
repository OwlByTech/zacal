import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
    category?: string
    color?: string
    size?: string
    minPrice?: string
    maxPrice?: string
    tags?: string
    material?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const {
    sortBy,
    page,
    tags,
    minPrice,
    maxPrice,
    material,
    size,
    color,
    category,
  } = searchParams
  try {
    return (
      <StoreTemplate
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
        color={color && JSON.parse(color)}
        size={size && JSON.parse(size)}
        material={material && JSON.parse(material)}
        minPrice={minPrice && JSON.parse(minPrice)}
        maxPrice={maxPrice && JSON.parse(maxPrice)}
        categories={category && JSON.parse(category)}
      />
    )
  } catch (e) {
    return <StoreTemplate countryCode={params.countryCode} />
  }
}
