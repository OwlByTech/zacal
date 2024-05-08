import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import ListProducts from "../components/list-products/list-products"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  color,
  minPrice,
  maxPrice,
  size,
  material,
  categories,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  color?: string[]
  size?: string[]
  minPrice: any
  maxPrice: any
  tags?: string[]
  material?: string[]
  categories?: string[]
}) {
  return (
    <>
      <Suspense fallback={<SkeletonProductGrid />}>
        <ListProducts
          sortBy={sortBy || "created_at"}
          page={page}
          countryCode={countryCode}
          color={color}
          size={size}
          material={material}
          minPrice={minPrice}
          maxPrice={maxPrice}
          categories={categories}
          categoryId={categoryId}
        />
      </Suspense>
    </>
  )
}
