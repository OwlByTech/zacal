import { Suspense, useState } from "react"

import {
  getCategoryByHandle,
  getMedusaHeaders,
  getProductsListWithSort,
  listRegions,
} from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Region } from "@medusajs/medusa"
import { json } from "stream/consumers"
import Arrow from "@modules/common/components/arrow"
import BestDeals from "@modules/home/components/best-deals"
import CategoryView from "@modules/home/components/categories-view"

type Props = {
  region: Region
}

export default async function BestDealsCategory({ region }: Props) {
  const product_categories = await getCategoryByHandle(["best-deal"]).then(
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

  const header = getMedusaHeaders(["products"])
  const {
    response: { products, count },
  } = await getProductsListWithSort({
    queryParams: { category_id: [product_categories[0].id] },
    countryCode: "co",
    page: 1,
  })

  return (
    <>
      <CategoryView header={header} region={region} products={products}>
        <p className="text-4xl">MEJORES ZAPATOS</p>
        <p className="text-base">Lo debes tener hoy</p>
      </CategoryView>
    </>
  )
}
