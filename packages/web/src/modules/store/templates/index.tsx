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
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
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
          <FilterMenu />
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
