import { Suspense } from "react"

import {
  getCategoryByHandle,
  getProductsListWithSort,
  listRegions,
} from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Region } from "@medusajs/medusa"
import { json } from "stream/consumers"

type Props = {
  region: Region
}

export default async function BestDealsCategory({ region }: Props) {
  const { product_categories } = await getCategoryByHandle(["best-deal"]).then(
    (product_categories) => product_categories
  )
  const {
    response: { products, count },
  } = await getProductsListWithSort({
    queryParams: { category_id: [product_categories[0].id] },
    countryCode: "es",
    page: 1,
  })

  return (
    <section className="mx-10 flex flex-row justify-between">
      {" "}
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {products?.map((product) => (
          <li key={product.id}>
            <ProductPreview
              productPreview={product}
              region={region}
              isFeatured
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
