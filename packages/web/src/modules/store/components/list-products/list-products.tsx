import { getProductsListFilter, getRegion } from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 20

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category?: string[]
  color?: string[]
  material?: string[]
  size?: string[]
  id?: string[]
  minPrice?: number
  maxPrice?: number
  sort?: SortOptions
}

export default async function ListProducts({
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
  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
    category: [],
    color: [],
    size: [],
    material: [],
  }
  if (sortBy) {
    queryParams["sort"] = sortBy
  }
  if (categoryId) {
    queryParams["category"] = [categoryId]
  }
  if (categories) {
    queryParams["category"] = categories
  }
  if (color) {
    queryParams["color"] = color
  }
  if (material) {
    queryParams["material"] = material
  }
  if (size) {
    queryParams["size"] = size
  }
  if (minPrice) {
    queryParams["minPrice"] = minPrice
  }
  if (maxPrice) {
    queryParams["maxPrice"] = maxPrice
  }

  const { products, count } = await getProductsListFilter(queryParams)
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul className="grid justify-center sm:grid-cols-2 w-full small:grid-cols-4 gap-x-6 gap-y-8">
        {products?.map((p: any) => {
          return (
            <li key={p.id} className="">
              <ProductPreview productPreview={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </>
  )
}
