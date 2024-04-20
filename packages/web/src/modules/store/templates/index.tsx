import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import FilterMenu from "../components/filter"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  color,
  categories,
  minPrice,
  maxPrice,
  material,
  size,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  color?: any
  size?: any
  material?: any
  maxPrice?: any
  minPrice?: any
  categories?: any
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="flex small:px-20 flex-col small:flex-row small:items-start py-6 content-container">
      <div className="flex-1 basis-0 h-full flex items-center">
        <div className="h-full"></div>
      </div>

      <div className="w-full">
        <div className="flex-1 mb-4 small:mb-8 basis-0 h-full flex flex-row  items-center justify-between">
          <div className=" text-lg font-bold small:text-xl-semi">
            <h1>Todos los productos</h1>
          </div>
          <FilterMenu
            sortBy={sortBy || "created_at"}
            colors={color}
            size={size}
            material={material}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
            color={color}
            size={size}
            material={material}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categories={categories}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
