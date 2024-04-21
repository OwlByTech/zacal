import { notFound } from "next/navigation"
import { Suspense } from "react"

import { ProductCategoryWithChildren } from "types/global"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FilterMenu from "@modules/store/components/filter"

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
  minPrice,
  maxPrice,
  material,
  size,
  color,
}: {
  categories: ProductCategoryWithChildren[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
  color?: string[]
  size?: string[]
  minPrice?: number
  maxPrice?: number
  tags?: string[]
  material?: string[]
}) {
  const pageNumber = page ? parseInt(page) : 1

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div className="flex flex-row flex-grow gap-6">
        <section className="">
          <div className="flex flex-row mb-8 text-2xl-semi gap-4">
            {parents &&
              parents.map((parent) => (
                <span key={parent.id} className="text-ui-fg-subtle">
                  <LocalizedClientLink
                    className="mr-4 hover:text-black"
                    href={`/categories/${parent.handle}`}
                  >
                    {parent.name}
                  </LocalizedClientLink>
                  /
                </span>
              ))}
            <h1>{category.name}</h1>
          </div>
          {category.description && (
            <div className="mb-8 text-base-regular">
              <p>{category.description}</p>
            </div>
          )}
          {category.category_children && (
            <div className="mb-8 text-base-large">
              <ul className="grid grid-cols-1 gap-2">
                {category.category_children?.map((c) => (
                  <li key={c.id}>
                    <InteractiveLink href={`/categories/${c.handle}`}>
                      {c.name}
                    </InteractiveLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <section className="flex flex-col gap-4 flex-grow">
          <div className="flex justify-end">
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
              categoryId={category.id}
            />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
