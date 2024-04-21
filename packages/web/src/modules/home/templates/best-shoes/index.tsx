import {
  getCategoryByHandle,
  getProductsListWithSort,
  listRegions,
} from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Region } from "@medusajs/medusa"

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
    countryCode: "co",
  })

  return (
    <>
      <section className=" flex w-full flex-row justify-between overflow-scroll">
        <ProductPreview
          productPreview={products[index]}
          region={region}
          isFeatured
        />
      </section>
    </>
  )
}
