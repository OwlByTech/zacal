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
  const product_categories = await getCategoryByHandle(["best-shoes"]).then(
    (product_categories) => {
      return product_categories.product_categories.filter(function (element) {
        return element !== undefined
      })
    }
  )

  console.log(product_categories)

  if (product_categories.length == 0) {
    return (
      <section>
        <h1>No existe</h1>
      </section>
    )
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    queryParams: { category_id: [product_categories[0].id] },
    countryCode: "es",
    page: 1,
  })

  return (
    <section className=" flex w-full flex-row justify-between overflow-scroll">
      {" "}
      <ul className="flex flex-grow  flex-row gap-x-6 gap-y-24 small:gap-y-36 ">
        {products?.map((product) => (
          <li key={product.id} className="small:w-1/3 ">
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
