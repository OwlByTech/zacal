import {
  getCategoryByHandle,
  getMedusaHeaders,
  getProductsListWithSort,
} from "@lib/data"
import { Region } from "@medusajs/medusa"
import CategoryView from "@modules/home/components/categories-view"

type Props = {
  region: Region
}

export default async function OnSaleCategory({ region }: Props) {
  const product_categories = await getCategoryByHandle(["on-sale"]).then(
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
      <CategoryView
        header={header}
        region={region}
        products={products}
        identificator="best"
      >
        <p></p>
      </CategoryView>
    </>
  )
}
