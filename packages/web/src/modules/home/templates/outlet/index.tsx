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
import Outlet from "@modules/home/outlet"

type Props = {
  region: Region
}

export default async function OutletCategory({ region }: Props) {
  const product_categories = await getCategoryByHandle(["exclucive"]).then(
    (product_categories) => {
      return product_categories.product_categories.filter(function (element) {
        return element !== undefined
      })
    }
  )

  const product_categories_news = await getCategoryByHandle(["news"]).then(
    (product_categories) => {
      return product_categories.product_categories.filter(function (element) {
        return element !== undefined
      })
    }
  )
  const product_categories_colection = await getCategoryByHandle([
    "colection",
  ]).then((product_categories) => {
    return product_categories.product_categories.filter(function (element) {
      return element !== undefined
    })
  })

  const header = getMedusaHeaders(["products"])
  const {
    response: { products: exclusive_products, count },
  } = await getProductsListWithSort({
    queryParams: { category_id: [product_categories[0].id] },
    countryCode: "co",
    page: 1,
  })
  const {
    response: { products: new_products },
  } = await getProductsListWithSort({
    queryParams: { category_id: [product_categories_news[0].id] },
    countryCode: "co",
    page: 1,
  })
  const {
    response: { products: colection_products },
  } = await getProductsListWithSort({
    queryParams: { category_id: [product_categories_colection[0].id] },
    countryCode: "co",
    page: 1,
  })

  return (
    <>
      <Outlet
        region={region}
        header={header}
        exclusive_products={exclusive_products}
        colection_products={colection_products}
        new_products={new_products}
      />
    </>
  )
}
