import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import {
  getCollectionsList,
  getCustomer,
  getProductsList,
  getRegion,
} from "@lib/data"
import FeaturedProducts from "@modules/home/featured-products"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import AdShoesEver from "@modules/home/components/ad-shoes-ever"
import BestShoes from "@modules/home/components/best-shoes"
import Outlet from "@modules/home/outlet"
import BestDealsCategory from "@modules/home/templates/best-deals"
import OutletCategory from "@modules/home/templates/outlet"

export const metadata: Metadata = {
  title: "Zacal",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const customer = await getCustomer()
  if (!collections || !region) {
    return null
  }

  return (
    <>
      <div className="flex flex-col gap-6 sm:gap-20">
        <BestShoes />
        <div className="flex flex-col gap-5 sm:gap-20 sm:mx-10">
          <BestDealsCategory region={region} />
        </div>
        <AdShoesEver customer={customer} />
        <div className="flex flex-col gap-5 sm:gap-20 sm:mx-10">
          <OutletCategory region={region} />
        </div>
      </div>
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
